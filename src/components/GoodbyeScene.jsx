import React from 'react';

export default function GoodbyeScene({ onBack }) {
  return (
    <div className="scene scene-enter" style={{ minHeight: '100vh', padding: '2rem 1rem 5rem' }}>
      <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🌙✨</div>
      <h1 className="pixel-font" style={{ fontSize: 'clamp(1rem, 3vw, 1.4rem)', color: '#FFF9E6', marginBottom: '1rem', textShadow: '2px 2px 0 #000' }}>
        udah mau udahan nih, bby?
      </h1>
      <p style={{ fontSize: '1.15rem', color: '#D6B8F7', fontWeight: 600, maxWidth: '440px', lineHeight: '1.7', marginBottom: '0.6rem' }}>
        udah mau keluar ya, sayang? nggak apa-apa kok. bintang-bintang di sini bakal selalu setia nungguin kamu balik.
      </p>
      <p style={{ fontStyle: 'italic', color: '#FFB3D6', fontSize: '1.05rem', marginBottom: '2rem' }}>
        hati-hati ya bby. jangan lupa buat tetap tersenyum hari ini, ganteng.
      </p>

      <div className="dialog-box" style={{ maxWidth: '450px', marginBottom: '2rem', textAlign: 'center' }}>
        <div className="dialog-speaker" style={{ justifyContent: 'center' }}>
          🌙 Sebastian Everett · pemandu kamu
        </div>
        <div className="dialog-text">
          "jangan begadang mulu ya, sayang. tidur yang nyenyak bby. see you in our next orbit♡"
        </div>
      </div>

      <button className="pixel-btn pixel-btn--pink" onClick={onBack}>
        balik ke semesta kita ✦
      </button>
    </div>
  );
}
