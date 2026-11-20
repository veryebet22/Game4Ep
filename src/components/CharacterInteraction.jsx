import React, { useState } from 'react';
import KeonhoSprite from './sprites/KeonhoSprite';
import SebastianSprite from './sprites/SebastianSprite';
import { sounds } from '../soundEffects';
import { downloadPolaroidImage, MOOD_CAPTIONS } from '../utils/savePolaroid';

export default function CharacterInteraction({ playerName, onBack, onSelfie, showNotif }) {
  const [expression, setExpression] = useState('goofy');
  const [dialog, setDialog] = useState(null);
  const [showFlash, setShowFlash] = useState(false);
  const [showPolaroid, setShowPolaroid] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // The selected mood drives the sprites on stage, the sprites inside the
  // polaroid overlay, and the caption baked into the exported PNG - all
  // three read the same value so they can never disagree.
  const isGoofy = expression === 'goofy';
  const caption = MOOD_CAPTIONS[expression] || MOOD_CAPTIONS.goofy;

  const keonhoPokes = [
    `tangan jangan iseng ya, sayang... nanti aku beneran salting tau!`,
    `rambutku udah di-styling 15 menit jadi messy aesthetic, jangan diacak-acak dong, bby!`,
    `*cekrek* hapus nggak, tadi ekspresiku belum siap tau, ganteng-ganteng gini masa scowl haha.`,
    `nyoba nyentuh pipi aku ya? ...empuk kan? tapi cuma kamu doang yang boleh cubit, sayang.`,
    `liat di cermin deh bby, kita berdua cocok banget nggak sih? boyfriend material parah.`
  ];

  const sebastianPokes = [
    `system alert: pemandu dicolek player. poinnya nggak dipotong deh soalnya kamu terlalu gemes, bby.`,
    `sayang, jangan liatin jaket bulu aku dari jauh... dekatannya berbeda saja, bby.`,
    `cakepnya kamu tuh kebangetan banget, bikin aku liat-mati aja setiap kali nangis.`,
    `kamu makin sering usil, aku makin gemes. cuma aja yuk, jangan berlebihan!`,
    `hati-hati ya bby... kamu yang nyolek tapi malah aku yang deg-degan. cuma-cuma aja!`
  ];

  const handleTakeSelfie = () => {
    // Deliberately keeps the currently selected mood. This used to call
    // setExpression('goofy'), which silently forced every photo back to
    // the silly pose - so the "kalem" mood could never be captured.
    setShowFlash(true);
    sounds.playCameraClick();
    setTimeout(() => {
      setShowFlash(false);
      setShowPolaroid(true);
      if (onSelfie) onSelfie();
      if (showNotif) showNotif('📸 foto polaroid cermin disimpan! bukti kita emang satu frekuensi ♡');
    }, 350);
  };

  const handleSavePhoto = async () => {
    setIsSaving(true);
    try {
      await downloadPolaroidImage(playerName || 'Keonho', { caption });
      if (showNotif) showNotif('💾 Foto polaroid berhasil didownload ke galeri kamu, sayang!');
    } catch {
      if (showNotif) showNotif('⚠️ Gagal mendownload foto, coba lagi ya bby.');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePokeKeonho = () => {
    sounds.playBleep();
    const msg = keonhoPokes[Math.floor(Math.random() * keonhoPokes.length)];
    setDialog({ speaker: `${playerName || 'Keonho'} 📸`, text: msg });
  };

  const handlePokeSeb = () => {
    sounds.playBleep();
    const msg = sebastianPokes[Math.floor(Math.random() * sebastianPokes.length)];
    setDialog({ speaker: 'Sebastian Everett · pemandu kamu 🌙', text: msg });
  };

  const handleSyncBraincells = () => {
    sounds.playSuccess();
    setExpression('goofy');
    setDialog({
      speaker: 'Sistem Semesta 🧠',
      text: '⚠️ Status sinkronisasi: 100% frekuensi cocok terdeteksi antara dua cowok cakep ini. Tingkat salting: maksimal!'
    });
  };

  return (
    <div className="scene scene-enter" style={{ minHeight: '100vh', padding: '1.5rem 1rem' }}>
      {showFlash && <div className="camera-flash" />}

      {/* Retro Polaroid Mirror Snap Overlay */}
      {showPolaroid && (
        <div className="selfie-overlay" onClick={() => setShowPolaroid(false)}>
          <div className="selfie-frame" onClick={(e) => e.stopPropagation()}>
            <div className="selfie-image">
              <div style={{ position: 'absolute', top: '8px', left: '10px', right: '10px', display: 'flex', justifyContent: 'space-between', zIndex: 10 }}>
                <span className="pixel-font" style={{ fontSize: '0.55rem', color: '#FFF8E7' }}>
                  MIRROR REFLECTION
                </span>
                <span style={{ fontSize: '0.8rem' }}>✨</span>
              </div>

              {/* Characters Posing Together in Mirror. goofy follows the
                  selected mood, and savePolaroid.js serialises these exact
                  DOM nodes, so the exported PNG matches what is on screen. */}
              <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                <div style={{ position: 'absolute', bottom: '26px', right: '38px', transform: 'scale(2.2)', transformOrigin: 'bottom center', zIndex: 1 }}>
                  <SebastianSprite goofy={isGoofy} scale={1} />
                </div>
                <div style={{ position: 'absolute', bottom: '10px', left: '42px', transform: 'scale(2.4)', transformOrigin: 'bottom center', zIndex: 3 }}>
                  <KeonhoSprite goofy={isGoofy} scale={1} />
                </div>
              </div>
            </div>

            <div className="selfie-caption">{caption}</div>

            {/* Genuine Photo Download & Close Buttons */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
              <button
                className="pixel-btn pixel-btn--pink"
                style={{ flex: 1, minWidth: '150px', fontSize: '0.62rem', padding: '8px 12px' }}
                onClick={handleSavePhoto}
                disabled={isSaving}
              >
                {isSaving ? '⏳ Menyimpan...' : '💾 Simpan Foto ke Galeri'}
              </button>
              <button
                className="pixel-btn"
                style={{ fontSize: '0.62rem', padding: '8px 12px' }}
                onClick={() => setShowPolaroid(false)}
              >
                tutup ♡
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Room Title */}
      <div className="pixel-panel-header" style={{ marginBottom: '1.2rem', textAlign: 'center' }}>
        <h1 className="pixel-font" style={{ fontSize: '1rem', color: '#FFF8E7', marginBottom: '0.4rem' }}>
          kita berdua · mirror snap 📸
        </h1>
        <p style={{ color: '#D6B8F7', fontSize: '0.9rem' }}>
          dua cowok cakep di depan cermin, vibesnya udah kayak pasangan serasi banget.
        </p>
      </div>

      {/* Characters Stage Container */}
      <div
        className="pixel-box"
        style={{
          width: 'min(440px, 94vw)',
          padding: '1.8rem 1rem 1.4rem',
          position: 'relative',
          marginBottom: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: 'linear-gradient(180deg, #1A1E38 0%, #14172B 100%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '2rem', minHeight: '180px' }}>

          {/* Keonho - Nametag cleanly ABOVE sprite */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="pixel-nametag" style={{ marginBottom: '16px' }}>
              <span className="pixel-nametag-icon">📸</span>
              <span className="pixel-nametag-name">{playerName || 'Keonho'}</span>
            </div>

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
                <KeonhoSprite goofy={isGoofy} onClick={handlePokeKeonho} />
              </div>
            </div>
          </div>

          {/* Sebastian - Nametag cleanly ABOVE sprite */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="pixel-nametag" style={{ marginBottom: '16px' }}>
              <span className="pixel-nametag-icon">🌙</span>
              <span className="pixel-nametag-name">Sebastian Everett</span>
            </div>

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
                <SebastianSprite goofy={isGoofy} onClick={handlePokeSeb} />
              </div>
            </div>
          </div>

        </div>

        {/* Expression Mode Switcher */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '1.8rem', alignItems: 'center' }}>
          <span className="pixel-font" style={{ fontSize: '0.6rem', color: '#D6B8F7', marginRight: '4px' }}>
            mood:
          </span>
          <button
            className={`pixel-btn pixel-btn--small ${expression === 'goofy' ? 'pixel-btn--pink' : 'pixel-btn--ghost'}`}
            onClick={() => setExpression('goofy')}
          >
            😜 pose gemes
          </button>
          <button
            className={`pixel-btn pixel-btn--small ${expression === 'normal' ? 'pixel-btn--pink' : 'pixel-btn--ghost'}`}
            onClick={() => setExpression('normal')}
          >
            😊 kalem
          </button>
        </div>
      </div>

      {/* Interactive Controls */}
      <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '1.2rem', maxWidth: '440px' }}>
        <button className="pixel-btn pixel-btn--pink" onClick={handleTakeSelfie} style={{ flex: '1 1 180px' }}>
          📸 jepret foto cermin!
        </button>
        <button className="pixel-btn pixel-btn--ghost" onClick={handleSyncBraincells} style={{ flex: '1 1 140px' }}>
          🧠 tes frekuensi
        </button>
      </div>

      {/* Dynamic Dialog Box */}
      {dialog && (
        <div className="dialog-box" style={{ maxWidth: '440px', width: '100%', marginBottom: '1rem' }}>
          <div className="dialog-speaker">{dialog.speaker}</div>
          <div className="dialog-text">{dialog.text}</div>
        </div>
      )}

      {/* Back button */}
      <div style={{ marginTop: '1rem' }}>
        <button className="pixel-btn" onClick={onBack}>
          ← balik ke kamar
        </button>
      </div>
    </div>
  );
}