import React from 'react';
import SebastianSprite from './sprites/SebastianSprite';

export default function IntroScene({ playerName, onContinue }) {
  return (
    <div className="scene scene-enter">
      <div style={{ marginBottom: '1.2rem', textAlign: 'center' }}>
        <div
          className="pixel-font"
          style={{
            fontSize: '0.75rem',
            color: '#FFB3D6',
            letterSpacing: '2px',
            marginBottom: '1.2rem',
            textShadow: '1px 1px 0 #000',
          }}
        >
          ● SISTEM ONLINE ●
        </div>
        
        {/* Overhead Nametag explicitly ABOVE Sebastian without covering face */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.2rem' }}>
          <div className="pixel-nametag" style={{ marginBottom: '16px' }}>
            <span className="pixel-nametag-icon">🌙</span>
            <span className="pixel-nametag-name">Sebastian Everett</span>
          </div>

          {/* Reserved layout box matching scaled dimensions (44*2.4 ~ 106px, 64*2.4 ~ 154px) */}
          <div
            style={{
              width: '106px',
              height: '154px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
          >
            <div style={{ transform: 'scale(2.4)', transformOrigin: 'bottom center' }}>
              <SebastianSprite />
            </div>
          </div>
        </div>
      </div>

      <div className="dialog-box" style={{ maxWidth: '480px' }}>
        <div className="dialog-speaker">
          <span>🌙</span> Sebastian Everett · pemandu kamu
        </div>
        <div className="dialog-text">
          <p style={{ marginBottom: '0.8rem' }}>
            halo, <strong style={{ color: '#FFB3D6' }}>{playerName || 'bby'}</strong>. akhirnya kamu dateng juga, dari tadi aku nungguin kamu tau.
          </p>
          <p style={{ marginBottom: '0.8rem' }}>
            kenalin, aku <strong>Sebastian Everett</strong>. aku yang bakal nemenin dan jadi pemandu kamu di semesta kecil ini, sayang.
          </p>
          <p style={{ color: '#D6B8F7' }}>
            aku bakal jelasin hal-hal seru di sini... tapi nggak janji ya kalau tiba-tiba aku hilang fokus gara-gara senyum manis kamu, ganteng.
          </p>
        </div>
      </div>

      <div style={{ marginTop: '1.8rem' }}>
        <button className="pixel-btn pixel-btn--pink" onClick={onContinue}>
          ajak aku keliling dong, ganteng →
        </button>
      </div>
    </div>
  );
}
