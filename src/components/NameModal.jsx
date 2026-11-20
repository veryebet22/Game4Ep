import React, { useState, useRef, useEffect } from 'react';

// `defaultName` pre-fills the field. Exiting to the loading screen and
// coming back lands here again, and making a returning player retype the
// name they already saved would just be friction.
export default function NameModal({ onSubmit, defaultName = '' }) {
  const [name, setName] = useState(defaultName || '');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e) => {
    e?.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError('nama kamu jangan dikosongin dong, sayang!');
      return;
    }
    if (trimmed.length > 20) {
      setError('namanya agak kepanjangan nih bby... coba yang lebih simpel?');
      return;
    }
    setError('');
    onSubmit(trimmed);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Masukkan nama kamu">
      <div className="modal-content">
        <div className="modal-label">PLAYER BARU TERDETEKSI</div>
        <h2 className="modal-heading">sebelum kita mulai...</h2>
        <p className="modal-prompt">aku harus panggil kamu siapa nih, bby?</p>
        
        <input
          ref={inputRef}
          type="text"
          className="modal-input"
          placeholder="tulis nama atau panggilan kamu..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          maxLength={20}
          aria-label="Nama kamu"
        />
        
        {error && (
          <p style={{ color: '#F7DCE7', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
            {error}
          </p>
        )}
        
        <p className="modal-helper">
          tenang aja sayang, semesta ini dibikin khusus buat kamu kok.
        </p>
        
        <button className="pixel-btn pixel-btn--pink" onClick={handleSubmit}>
          itu aku! lanjut yuk →
        </button>
      </div>
    </div>
  );
}
