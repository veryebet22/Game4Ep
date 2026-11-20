import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GAME_CONFIG } from '../gameConfig';
import { sounds } from '../soundEffects';

const { targetScore, timeLimit, starInterval, starSpeed } = GAME_CONFIG.starGame;

export default function StarCatchGame({ onBack, onWin }) {
  const [gameState, setGameState] = useState('idle'); // idle | playing | won | lost
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [catcherX, setCatcherX] = useState(50);
  const [stars, setStars] = useState([]);
  const arenaRef = useRef(null);
  const keysRef = useRef({});
  const isDraggingRef = useRef(false);
  const animRef = useRef(null);
  const starIdRef = useRef(0);
  const scoreRef = useRef(0);

  const startGame = useCallback(() => {
    setGameState('playing');
    setScore(0);
    setTimeLeft(timeLimit);
    setStars([]);
    setCatcherX(50);
    scoreRef.current = 0;
  }, []);

  // Update catcher position from pointer/touchpad X coordinate
  const moveCatcherToClientX = useCallback((clientX) => {
    if (!arenaRef.current) return;
    const rect = arenaRef.current.getBoundingClientRect();
    const rawPct = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.max(7, Math.min(93, rawPct));
    setCatcherX(clamped);
  }, []);

  // Pointer / Touchpad drag handling on arena
  const handlePointerDown = useCallback((e) => {
    if (gameState !== 'playing') return;
    isDraggingRef.current = true;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    moveCatcherToClientX(e.clientX);
  }, [gameState, moveCatcherToClientX]);

  const handlePointerMove = useCallback((e) => {
    if (gameState !== 'playing') return;
    // Follow movement when dragging or moving across arena
    if (isDraggingRef.current || e.buttons > 0 || e.pointerType === 'mouse') {
      moveCatcherToClientX(e.clientX);
    }
  }, [gameState, moveCatcherToClientX]);

  const handlePointerUp = useCallback((e) => {
    isDraggingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  }, []);

  // Support Touchpad horizontal scroll / swipe
  const handleWheel = useCallback((e) => {
    if (gameState !== 'playing') return;
    const delta = e.deltaX !== 0 ? e.deltaX : (e.shiftKey ? e.deltaY : 0);
    if (delta !== 0) {
      e.preventDefault();
      setCatcherX(prev => Math.max(7, Math.min(93, prev + (delta > 0 ? 3.5 : -3.5))));
    }
  }, [gameState]);

  // Keyboard controls
  useEffect(() => {
    if (gameState !== 'playing') return;

    const handleKeyDown = (e) => {
      if (['ArrowLeft', 'ArrowRight', 'a', 'd', 'A', 'D'].includes(e.key)) {
        e.preventDefault();
        keysRef.current[e.key.toLowerCase()] = true;
      }
    };

    const handleKeyUp = (e) => {
      keysRef.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState]);

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    // Timer
    const timerInterval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameState('lost');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Star spawner
    const starSpawner = setInterval(() => {
      starIdRef.current += 1;
      const newStar = {
        id: starIdRef.current,
        x: Math.random() * 84 + 8,
        y: -5,
        speed: starSpeed + Math.random() * 1.8,
        caught: false,
      };
      setStars(prev => [...prev, newStar]);
    }, starInterval);

    // Animation loop for catcher movement and star falling
    let lastTime = performance.now();

    const loop = (time) => {
      const delta = (time - lastTime) / 16.67;
      lastTime = time;

      // Keyboard movement
      setCatcherX(prev => {
        let next = prev;
        if (keysRef.current['arrowleft'] || keysRef.current['a']) next -= 3.5 * delta;
        if (keysRef.current['arrowright'] || keysRef.current['d']) next += 3.5 * delta;
        return Math.max(7, Math.min(93, next));
      });

      // Move stars and check collisions
      setStars(prev => {
        const updated = [];
        for (const star of prev) {
          if (star.caught) continue;
          const newY = star.y + star.speed * delta * 0.52;
          
          // Collision check at bottom of arena
          if (newY > 83 && newY < 98 && Math.abs(star.x - catcherX) < 9.5) {
            scoreRef.current += 1;
            sounds.playStarCatch();
            setScore(scoreRef.current);
            star.caught = true;
            if (scoreRef.current >= targetScore) {
              setGameState('won');
              onWin();
            }
          }
          
          if (newY > 108) continue;
          if (!star.caught) {
            updated.push({ ...star, y: newY });
          }
        }
        return updated;
      });

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);

    return () => {
      clearInterval(timerInterval);
      clearInterval(starSpawner);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [gameState, onWin, catcherX]);

  return (
    <div className="game-container scene-enter">
      <h1 className="pixel-font" style={{ fontSize: 'clamp(0.55rem, 2vw, 0.75rem)', color: '#FFF4DE', marginBottom: '1rem', lineHeight: '1.8' }}>
        ⭐ tangkap bintang
      </h1>

      {gameState === 'idle' && (
        <div style={{ textAlign: 'center' }}>
          <div className="dialog-box" style={{ marginBottom: '1.5rem' }}>
            <div className="dialog-speaker">🌙 Sebastian Everett · pemandu kamu</div>
            <div className="dialog-text">
              "hati-hati ya sayang, kamu yang nangkep bintang... tapi kok hatiku yang ikut ketangkep?"
              <div style={{ color: '#FFB3D6', fontSize: '0.92rem', marginTop: '6px' }}>
                tangkap {targetScore} bintang dalam {timeLimit} detik. buktiin seberapa lincah kamu ya, bby!
              </div>
            </div>
          </div>
          <button className="pixel-btn pixel-btn--pink" onClick={startGame}>
            tangkap bintang buat aku ⭐
          </button>
        </div>
      )}

      {gameState === 'playing' && (
        <>
          <div className="game-header">
            <span className="game-score">bintang: {score}/{targetScore}</span>
            <span className="game-timer">waktu: {timeLeft}s</span>
          </div>

          {/* Arena with full Touchpad, Mouse Drag & Wheel Support */}
          <div
            className="game-arena"
            ref={arenaRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onWheel={handleWheel}
            style={{
              touchAction: 'none',
              cursor: 'ew-resize',
              userSelect: 'none',
            }}
            title="Geser touchpad, kursor, atau jari kamu ke kiri & kanan"
          >
            {/* Falling Stars */}
            {stars.map(star => (
              <div
                key={star.id}
                className="game-star"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  animation: 'none',
                  position: 'absolute',
                  pointerEvents: 'none',
                }}
              >
                ⭐
              </div>
            ))}

            {/* Catcher Basket */}
            <div
              className="game-catcher"
              style={{
                left: `calc(${catcherX}% - 25px)`,
                pointerEvents: 'none',
                transition: 'none',
              }}
            >
              <div className="catcher-body">
                <div className="catcher-handle" />
                <div className="catcher-basket" />
              </div>
            </div>
          </div>

          {/* Touchpad / Drag Guide Track */}
          <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            style={{
              marginTop: '12px',
              padding: '10px 14px',
              background: 'rgba(23, 27, 53, 0.85)',
              border: '2px solid #7776A8',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'ew-resize',
              touchAction: 'none',
              userSelect: 'none',
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>⇄</span>
            <span className="pixel-font" style={{ fontSize: '0.52rem', color: '#FFB3D6', letterSpacing: '0.5px' }}>
              geser touchpad / kursor / jari kamu di sini
            </span>
            <span style={{ fontSize: '1.1rem' }}>⇄</span>
          </div>
        </>
      )}

      {gameState === 'won' && (
        <div className="dialog-box" style={{ maxWidth: '460px', textAlign: 'center', marginTop: '1.5rem' }}>
          <div className="dialog-speaker" style={{ color: '#FFB3D6', justifyContent: 'center' }}>
            ★ KEREN BANGET, BBY! ★
          </div>
          <div className="dialog-text" style={{ marginBottom: '1.2rem' }}>
            "Keren banget, sayang! Semua bintang berhasil kamu tangkap. Kamu dan senyum manismu beneran jadi hal paling indah di semesta ini."
          </div>
          <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="pixel-btn pixel-btn--pink" onClick={startGame}>
              main lagi yuk ⭐
            </button>
            <button className="pixel-btn" onClick={onBack}>
              ← balik ke kamar
            </button>
          </div>
        </div>
      )}

      {gameState === 'lost' && (
        <div className="dialog-box" style={{ maxWidth: '460px', textAlign: 'center', marginTop: '1.5rem' }}>
          <div className="dialog-speaker" style={{ justifyContent: 'center' }}>
            🌙 WAKTU HABIS, SAYANG
          </div>
          <div className="dialog-text" style={{ marginBottom: '1.2rem' }}>
            bintang-bintangnya lincah banget ya bby! kamu dapet {score}/{targetScore} bintang. coba lagi sekali lagi buat aku yuk, ganteng?
          </div>
          <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="pixel-btn pixel-btn--pink" onClick={startGame}>
              coba lagi, bby ⭐
            </button>
            <button className="pixel-btn" onClick={onBack}>
              ← balik ke kamar
            </button>
          </div>
        </div>
      )}

      {gameState === 'idle' && (
        <div style={{ marginTop: '1rem' }}>
          <button className="pixel-btn pixel-btn--small" onClick={onBack}>
            ← balik ke kamar
          </button>
        </div>
      )}
    </div>
  );
}
