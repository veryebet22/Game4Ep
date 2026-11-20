import React from 'react';
import { SECRET_ROOM_TEXT } from '../gameConfig';

export default function SecretRoom({ onBack }) {
  return (
    <div className="scene scene-enter" style={{ minHeight: '100vh', padding: '2rem 1rem 5rem' }}>
      <div style={{ marginBottom: '1.5rem', fontSize: '2.5rem' }}>🌿✨</div>
      
      <h1 className="pixel-font" style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.3rem)', color: '#FFB3D6', marginBottom: '1.2rem', textShadow: '2px 2px 0 #000' }}>
        {SECRET_ROOM_TEXT[0]}
      </h1>
      
      <p style={{ fontSize: '1.2rem', color: '#FFF9E6', fontWeight: 700, maxWidth: '440px', lineHeight: '1.7', marginBottom: '0.8rem' }}>
        {SECRET_ROOM_TEXT[1]}
      </p>
      <p style={{ fontSize: '1.05rem', color: '#D6B8F7', fontStyle: 'italic', maxWidth: '440px', lineHeight: '1.7', marginBottom: '2rem' }}>
        {SECRET_ROOM_TEXT[2]}
      </p>

      <div style={{ margin: '1rem 0 2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        {['🌙', '⭐', '🌿', '✨', '💫'].map((emoji, i) => (
          <span
            key={i}
            className="float-anim"
            style={{
              fontSize: '2rem',
              animationDelay: `${i * 0.3}s`,
              display: 'inline-block',
            }}
          >
            {emoji}
          </span>
        ))}
      </div>

      <div className="dialog-box" style={{ maxWidth: '440px', textAlign: 'center', marginBottom: '2rem' }}>
        <div className="dialog-speaker" style={{ justifyContent: 'center' }}>
          🌙 Sebastian Everett · pemandu kamu
        </div>
        <div className="dialog-text">
          "hehe... udah kutebak kamu pasti nemuin ruangan rahasia ini, ganteng. ini lugar buat kamu santai sejenak, sayang."
          <br />
          <span style={{ color: '#FFB3D6', fontWeight: 700 }}>
            ini sudut paling damai di semesta kita, sayang. tempat khusus buat kamu rehat sejenak.
          </span>
        </div>
      </div>

      <button className="pixel-btn pixel-btn--pink" onClick={onBack}>
        ← balik ke kamar
      </button>
    </div>
  );
}
