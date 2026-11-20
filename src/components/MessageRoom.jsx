import React, { useState, useRef } from 'react';
import { RANDOM_MESSAGES } from '../gameConfig';
import { sounds } from '../soundEffects';

export default function MessageRoom({ onBack }) {
  const [currentMessage, setCurrentMessage] = useState(null);
  const lastIndexRef = useRef(-1);

  const getRandomMessage = () => {
    sounds.playBleep();
    let idx;
    do {
      idx = Math.floor(Math.random() * RANDOM_MESSAGES.length);
    } while (idx === lastIndexRef.current && RANDOM_MESSAGES.length > 1);
    lastIndexRef.current = idx;
    setCurrentMessage(RANDOM_MESSAGES[idx]);
  };

  return (
    <div className="scene scene-enter" style={{ minHeight: '100vh', padding: '2rem 1rem 5rem' }}>
      <h1 className="pixel-font" style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.25rem)', color: '#FFF9E6', marginBottom: '0.6rem', textShadow: '2px 2px 0 #000' }}>
        📖 catatan dari semesta
      </h1>
      <p style={{ color: '#D6B8F7', fontSize: '1rem', marginBottom: '2rem', fontWeight: 600 }}>
        pesan-pesan hangat yang melayang di langit malam khusus buat kamu, bby.
      </p>

      <div className="dialog-box" style={{ maxWidth: '480px', minHeight: '140px', display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: '2rem' }}>
        <div className="dialog-speaker">✨ Bisikan Semesta:</div>
        <div className="dialog-text" style={{ fontSize: '1.15rem', fontStyle: 'italic', color: currentMessage ? '#FFF9E6' : '#B3A8FA' }}>
          {currentMessage ? `"${currentMessage}"` : 'klik tombol di bawah buat dengerin bisikan semesta malam ini, bby...'}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button className="pixel-btn pixel-btn--pink" onClick={getRandomMessage}>
          bisikin sesuatu dong ✦
        </button>
        <button className="pixel-btn" onClick={onBack}>
          ← balik ke kamar
        </button>
      </div>
    </div>
  );
}
