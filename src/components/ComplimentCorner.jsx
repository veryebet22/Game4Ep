import React, { useState } from 'react';
import { COMPLIMENTS } from '../gameConfig';
import { sounds } from '../soundEffects';

const CARD_ICONS = ['✧', '♡', '☆', '✦', '❋', '♢', '✿', '❀'];

export default function ComplimentCorner({ onBack, onAllRead }) {
  const [flippedCards, setFlippedCards] = useState(new Set());
  const [showExtra, setShowExtra] = useState(false);
  const [bonusCompliment, setBonusCompliment] = useState(null);
  const [sparkles, setSparkles] = useState([]);

  const handleFlip = (index) => {
    setFlippedCards(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
        sounds.playCardFlip();
        addSparkle();
      }
      
      if (next.size >= COMPLIMENTS.length) {
        onAllRead();
        setShowExtra(true);
      }
      
      return next;
    });
  };

  const addSparkle = () => {
    const id = Date.now() + Math.random();
    const sparkle = {
      id,
      left: Math.random() * 80 + 10,
      top: Math.random() * 60 + 20,
    };
    setSparkles(prev => [...prev, sparkle]);
    setTimeout(() => {
      setSparkles(prev => prev.filter(s => s.id !== id));
    }, 800);
  };

  const handleOneMore = () => {
    const unflipped = COMPLIMENTS.map((_, i) => i).filter(i => !flippedCards.has(i));
    if (unflipped.length > 0) {
      const randomIndex = unflipped[Math.floor(Math.random() * unflipped.length)];
      handleFlip(randomIndex);
    } else {
      const bonus = COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)];
      setBonusCompliment(bonus);
    }
  };

  return (
    <div className="compliment-room scene-enter">
      {/* Sparkle effects */}
      {sparkles.map(s => (
        <div
          key={s.id}
          className="compliment-sparkle"
          style={{ left: `${s.left}%`, top: `${s.top}%`, fontSize: '1.5rem' }}
        >
          ✨
        </div>
      ))}

      <h1 className="compliment-title">💝 alasan kenapa kamu spesial</h1>
      <p className="compliment-subtitle">beberapa hal manis tentang kamu yang selalu kuperhatiin, ganteng ♡</p>
      <p className="compliment-intro">jangan geer dulu ya sayang, tapi...</p>

      <div className="compliment-grid">
        {COMPLIMENTS.map((compliment, i) => (
          <div
            key={i}
            className={`compliment-card ${flippedCards.has(i) ? 'flipped' : ''}`}
            onClick={() => handleFlip(i)}
            role="button"
            aria-label={flippedCards.has(i) ? compliment : `Kartu ${i + 1} - buka kartu`}
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleFlip(i); } }}
          >
            <div className="compliment-card-inner">
              <div className="compliment-front">
                <div className="compliment-front-icon">
                  {CARD_ICONS[i % CARD_ICONS.length]}
                </div>
                <div className="compliment-front-text">buka kartu ♡</div>
              </div>
              <div className="compliment-back">
                <p className="compliment-back-text">{compliment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showExtra && (
        <div className="dialog-box" style={{ marginBottom: '1rem', textAlign: 'center' }}>
          <div className="dialog-speaker">🌙 Sebastian Everett · pemandu kamu</div>
          <div className="dialog-text">
            ciee... udah dibaca semua ya bby? pipi kamu nggak merah kan? (sebenarnya aku cuma pengen tahu tentang kamu, sayang.)
          </div>
        </div>
      )}

      {bonusCompliment && (
        <div className="dialog-box" style={{ marginBottom: '1rem', textAlign: 'center', borderColor: '#FFB3D6' }}>
          <div className="dialog-speaker" style={{ color: '#FFB3D6' }}>bonus kata manis buat si ganteng 💝</div>
          <div className="dialog-text" style={{ fontStyle: 'italic' }}>{bonusCompliment}</div>
        </div>
      )}

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button className="pixel-btn pixel-btn--pink" onClick={handleOneMore}>
          minta satu lagi dong ♡
        </button>
        <button className="pixel-btn pixel-btn--small" onClick={onBack}>
          ← balik ke kamar
        </button>
      </div>
    </div>
  );
}
