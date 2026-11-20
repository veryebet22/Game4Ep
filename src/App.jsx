import React, { useState, useEffect, useCallback, useRef } from 'react';
import StarBackground from './components/StarBackground';
import LoadingScene from './components/LoadingScene';
import NameModal from './components/NameModal';
import IntroScene from './components/IntroScene';
import MainRoom from './components/MainRoom';
import NightMap from './components/NightMap';
import StarCatchGame from './components/StarCatchGame';
import MessageRoom from './components/MessageRoom';
import PlaylistRoom from './components/PlaylistRoom';
import ComplimentCorner from './components/ComplimentCorner';
import SecretRoom from './components/SecretRoom';
import GoodbyeScene from './components/GoodbyeScene';
import CharacterInteraction from './components/CharacterInteraction';
import Notification from './components/Notification';
import MiniPlayer from './components/MiniPlayer';
import { sounds } from './soundEffects';
import { BADGES } from './gameConfig';
import { musicPlayer } from './musicPlayer';

function App() {
  // Load saved discoveries from localStorage safely
  function loadDiscoveries() {
    try {
      const saved = localStorage.getItem('little-universe-discoveries');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  }

  function saveDiscoveries(discoveries) {
    try {
      localStorage.setItem('little-universe-discoveries', JSON.stringify(discoveries));
    } catch {
      // localStorage not available; continue with in-memory state
    }
  }

  function loadSavedName() {
    try {
      return sessionStorage.getItem('little-universe-player-name') || '';
    } catch {
      return '';
    }
  }

  function savePlayerName(name) {
    try {
      sessionStorage.setItem('little-universe-player-name', name);
    } catch {
      // ignore
    }
  }

  // State
  const [scene, setScene] = useState('loading');
  const [playerName, setPlayerName] = useState(loadSavedName);
  const [showNameModal, setShowNameModal] = useState(false);
  const [discoveries, setDiscoveries] = useState(loadDiscoveries);
  const [moonClicks, setMoonClicks] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [notifMessage, setNotifMessage] = useState('');

  // Persistent audio player state - one global <audio> lives at the App root
  // and keeps playing across every scene change. We subscribe to the
  // musicPlayer singleton so the UI always reflects the real audio element.
  const [playerState, setPlayerState] = useState(() => musicPlayer.getState());
  const audioRef = useRef(null);

  useEffect(() => {
    // Attach the singleton to the <audio> element rendered below.
    if (audioRef.current) {
      musicPlayer.attach(audioRef.current);
    }
    // Keep React state in sync with the audio element.
    const unsub = musicPlayer.subscribe(setPlayerState);
    return unsub;
  }, []);

  const showNav = !['loading', 'intro'].includes(scene) && !showNameModal;

  // Show notification
  const showNotifFn = useCallback((message) => {
    setNotifMessage(message);
    setShowNotif(true);
    setTimeout(() => setShowNotif(false), 5000);
  }, []);

  // Earn a badge and update discoveries
  const earnBadge = useCallback((badgeId) => {
    setDiscoveries(prev => {
      if (!prev[badgeId]) {
        const next = { ...prev, [badgeId]: true };
        saveDiscoveries(next);
        const badgeName = BADGES.find(b => b.id === badgeId)?.name || badgeId;
        showNotifFn(`badge terbuka: ${badgeName}!`);
        return next;
      }
      return prev;
    });
  }, [showNotifFn]);

  // Navigate function
  const navigate = useCallback((target) => {
    sounds.playBleep();
    
    // Earn badge based on target
    if (target === 'map') earnBadge('explorer');
    if (target === 'playlist') earnBadge('music_lover');
    if (target === 'messages') earnBadge('message_finder');
    
    setScene(target);
  }, [earnBadge]);

  // Handle entering world from loading screen
  const handleEnterWorld = useCallback(() => {
    setShowNameModal(true);
  }, []);

  // Handle name submit from NameModal
  const handleNameSubmit = useCallback((name) => {
    setPlayerName(name);
    savePlayerName(name);
    setShowNameModal(false);
    if (scene === 'loading') {
      setScene('intro');
    }
  }, [scene]);

  // Toggle sound
  const toggleSound = useCallback(() => {
    setIsMuted(prev => {
      const next = !prev;
      sounds.muted = next;
      return next;
    });
  }, []);

  // Moon click handler
  const handleMoonClick = useCallback(() => {
    sounds.playStarCatch();
    setMoonClicks(prev => {
      const next = prev + 1;
      if (next >= 5) {
        earnBadge('moon_gazer');
        showNotifFn('🌙 bulannya ngedip ke kamu, bby! badge terbuka: si pemuja bulan!');
      }
      return next;
    });
  }, [earnBadge, showNotifFn]);

  const handleSecretUnlock = useCallback(() => {
    sounds.playSuccess();
    earnBadge('secret_finder');
    setScene('secret');
    showNotifFn('✨ kamu nemuin taman rahasia kita, sayang! badge terbuka');
  }, [earnBadge, showNotifFn]);

  const handleStarWin = useCallback(() => {
    sounds.playSuccess();
    earnBadge('star_collector');
    showNotifFn('⭐ keren banget bby! badge kolektor bintang berhasil dibuka!');
  }, [earnBadge, showNotifFn]);

  const handlePlantClick = useCallback(() => {
    sounds.playBleep();
    earnBadge('plant_whisperer');
  }, [earnBadge]);

  const handleSelfie = useCallback(() => {
    sounds.playCameraClick();
    earnBadge('selfie_taker');
  }, [earnBadge]);

  const handleComplimentsRead = useCallback(() => {
    sounds.playSuccess();
    earnBadge('compliment_reader');
    showNotifFn('💝 kamu udah baca semua kata manis! jangan salting mulu ya, bby ♡');
  }, [earnBadge, showNotifFn]);

  const handleResetDiscoveries = useCallback(() => {
    sounds.playBleep();
    setDiscoveries({});
    saveDiscoveries({});
    setMoonClicks(0);
    showNotifFn('pencapaian udah di-reset ya sayang. petualangan kecil kita mulai dari awal lagi!');
  }, [showNotifFn]);

  return (
    <>
      <StarBackground />
      
      {/* Top Bar for Sound & Status */}
      {showNav && (
        <header
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 40,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 14px',
            background: 'linear-gradient(180deg, rgba(23,27,53,0.9) 0%, rgba(23,27,53,0) 100%)',
            pointerEvents: 'none',
          }}
        >
          <div
            className="pixel-font"
            style={{
              fontSize: '0.45rem',
              color: '#FFF4DE',
              textShadow: '0 2px 4px rgba(0,0,0,0.8)',
              pointerEvents: 'auto',
            }}
          >
            {playerName ? `player: ${playerName} 📸` : 'semesta kecil kita... ♡'}
          </div>

          <button
            onClick={toggleSound}
            aria-label={isMuted ? 'Nyalakan suara' : 'Bisukan suara'}
            style={{
              background: 'rgba(32, 36, 64, 0.75)',
              border: '1.5px solid #7776A8',
              color: '#FFF4DE',
              borderRadius: '4px',
              padding: '4px 8px',
              fontSize: '0.65rem',
              cursor: 'pointer',
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontFamily: 'var(--body-font)',
            }}
          >
            {isMuted ? '🔇 Bisu' : '🔊 Suara'}
          </button>
        </header>
      )}

      {showNotif && <Notification text={notifMessage} />}

      {showNameModal && (
        <NameModal onSubmit={handleNameSubmit} defaultName={playerName} />
      )}

      {/* Persistent global audio element - mounted once at the App root,
          outside every scene component, so playback never resets. */}
      <audio
        ref={audioRef}
        preload="none"
        style={{ display: 'none' }}
        aria-hidden="true"
      />

      {/* Mini player - visible on every scene, keeps controls available */}
      {showNav && (
        <MiniPlayer
          playerState={playerState}
          onToggle={() => musicPlayer.toggle()}
          onNext={() => musicPlayer.next()}
          onPrev={() => musicPlayer.prev()}
          onSelect={(i) => musicPlayer.select(i)}
        />
      )}

      <div className={showNav ? 'has-nav' : ''} style={{ paddingTop: showNav ? '2rem' : 0 }}>
        {scene === 'loading' && (
          <LoadingScene onEnter={handleEnterWorld} />
        )}

        {scene === 'intro' && (
          <IntroScene
            playerName={playerName}
            onContinue={() => navigate('main')}
          />
        )}

        {scene === 'main' && (
          <MainRoom
            playerName={playerName}
            onNavigate={navigate}
            onMoonClick={handleMoonClick}
            moonClicks={moonClicks}
            onPlantClick={handlePlantClick}
            onSelfie={handleSelfie}
            onSecretUnlock={handleSecretUnlock}
            showNotif={showNotifFn}
          />
        )}

        {scene === 'map' && (
          <NightMap
            discoveries={discoveries}
            onNavigate={navigate}
            onChangeName={() => setShowNameModal(true)}
            onResetDiscoveries={handleResetDiscoveries}
          />
        )}

        {scene === 'game' && (
          <StarCatchGame
            onBack={() => navigate('main')}
            onWin={handleStarWin}
          />
        )}

        {scene === 'messages' && (
          <MessageRoom onBack={() => navigate('main')} />
        )}

        {scene === 'playlist' && (
          <PlaylistRoom
            onBack={() => navigate('main')}
            playerState={playerState}
            onToggle={() => musicPlayer.toggle()}
            onNext={() => musicPlayer.next()}
            onPrev={() => musicPlayer.prev()}
            onSelect={(i) => musicPlayer.select(i)}
          />
        )}

        {scene === 'compliments' && (
          <ComplimentCorner
            onBack={() => navigate('main')}
            onAllRead={handleComplimentsRead}
          />
        )}

        {scene === 'characters' && (
          <CharacterInteraction
            playerName={playerName}
            onBack={() => navigate('main')}
            onSelfie={handleSelfie}
            showNotif={showNotifFn}
          />
        )}

        {scene === 'secret' && (
          <SecretRoom onBack={() => navigate('main')} />
        )}

        {scene === 'goodbye' && (
          <GoodbyeScene onBack={() => navigate('loading')} />
        )}
      </div>

      {showNav && (
        <nav className="nav-bar" role="navigation" aria-label="Game navigation">
          <button
            className={`nav-btn ${scene === 'main' ? 'active' : ''}`}
            onClick={() => navigate('main')}
          >
            🏠 kamar
          </button>
          <button
            className={`nav-btn ${scene === 'map' ? 'active' : ''}`}
            onClick={() => navigate('map')}
          >
            🗺️ peta
          </button>
          <button
            className={`nav-btn ${scene === 'characters' ? 'active' : ''}`}
            onClick={() => navigate('characters')}
          >
            👥 kita
          </button>
          <button
            className={`nav-btn ${scene === 'goodbye' ? 'active' : ''}`}
            onClick={() => navigate('goodbye')}
          >
            👋 keluar
          </button>
        </nav>
      )}
    </>
  );
}

export default App;