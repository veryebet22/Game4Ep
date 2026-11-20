import React, { useState, useEffect } from 'react';

export default function LoadingScene({ onEnter }) {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setReady(true);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="scene scene-enter">
      <div style={{ marginBottom: '2rem' }}>
        <div className="loading-title">
          somewhere, in our<br />little universe
        </div>
        <div className="loading-subtitle">
          {progress < 50
            ? 'lagi ngumpulin bintang-bintang kecil...'
            : progress < 100
            ? 'lagi nyiapin semesta mungil yang hangat buat kamu ♡'
            : 'semuanya udah siap buat kamu, sayang ♡'}
        </div>
      </div>

      <div className="progress-bar-container">
        <div
          className="progress-bar-fill"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      {ready && (
        <button
          className="pixel-btn pixel-btn--pink"
          onClick={onEnter}
          autoFocus
        >
          masuk ke semesta kita.exe ✦
        </button>
      )}
    </div>
  );
}
