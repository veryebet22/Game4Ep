import React, { useState, useCallback, useRef } from 'react';
import KeonhoSprite from './sprites/KeonhoSprite';
import SebastianSprite from './sprites/SebastianSprite';
import { SEBASTIAN_DIALOGS, PLANT_COMMENTS, CHARACTER_DIALOGS } from '../gameConfig';
import { sounds } from '../soundEffects';
import { downloadPolaroidImage } from '../utils/savePolaroid';

export default function MainRoom({
  playerName,
  onNavigate,
  onMoonClick,
  moonClicks,
  onPlantClick,
  onSelfie,
  onSecretUnlock,
  showNotif,
}) {
  const [dialog, setDialog] = useState(null);
  const [showFlash, setShowFlash] = useState(false);
  const [showSelfie, setShowSelfie] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  // Combo timing refs instead of persistent state
  const keonhoLastClick = useRef(Date.now());
  const sebastianLastClick = useRef(Date.now());

  const showDialog = useCallback((speaker, text, duration = 3000) => {
    setDialog({ speaker, text });
    setTimeout(() => setDialog(null), duration);
  }, []);

  const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const handleComputerClick = () => {
    showDialog('Sebastian Everett', 'main game arcade bentar, bby? cobain tangkap bintang buat aku yuk, ganteng.');
    setTimeout(() => onNavigate('game'), 800);
  };

  const handleMusicClick = () => {
    showDialog('Sebastian Everett', 'ke ruang musik yuk, kita dengerin lagu-lagu manis bareng, sayang.');
    setTimeout(() => onNavigate('playlist'), 800);
  };

  const handleBookClick = () => {
    showDialog('Sebastian Everett', 'ada catatan manis yang melayang dari semesta, baca yuk buat kamu, sayang.');
    setTimeout(() => onNavigate('messages'), 800);
  };

  const handleMoonClickLocal = () => {
    onMoonClick();
    if (moonClicks >= 4) {
      showDialog('Sebastian Everett', 'tuh kan bulannya ngedip ke kamu, bby! taman rahasia kita kebuka waktunya.');
      setTimeout(() => onSecretUnlock(), 1500);
    } else {
      const remaining = 5 - moonClicks - 1;
      if (remaining > 0) {
        showDialog('Sebastian Everett', `bulannya makin bersinar buat kamu, sayang... (${remaining} kali lagi ya)`);
      }
    }
  };

  const handlePlantClickLocal = () => {
    onPlantClick();
    showDialog('Sebastian Everett', randomFrom(PLANT_COMMENTS));
  };

  const handleMirrorClick = () => {
    showDialog('Sebastian Everett', 'intit kata-kata manis yuk, bby... isinya seberapa cakep kamu di mataku, sayang.');
    setTimeout(() => onNavigate('compliments'), 800);
  };

  const handleSavePhoto = async () => {
    setIsSaving(true);
    try {
      await downloadPolaroidImage(playerName || 'Keonho');
      if (showNotif) showNotif('💾 Foto polaroid berhasil didownload ke galeri kamu, sayang!');
    } catch {
      if (showNotif) showNotif('⚠️ Gagal mendownload foto, coba lagi ya bby.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleKeonhoClick = () => {
    setShowFlash(true);
    sounds.playCameraClick();
    setTimeout(() => setShowFlash(false), 400);
    showDialog('you', randomFrom(CHARACTER_DIALOGS), 2500);
    
    // Check secret combo: click within 2 seconds of Sebastian
    keonhoLastClick.current = Date.now();
    if (Date.now() - sebastianLastClick.current < 2000) {
      setShowSelfie(true);
      sounds.playCameraClick();
      onSelfie();
    }
    setTimeout(() => { /* auto-reset after 3s */ }, 3000);
  };

  const handleSebastianClick = () => {
    sounds.playBleep();
    showDialog('Sebastian Everett', randomFrom(SEBASTIAN_DIALOGS), 2500);
    
    // Check secret combo: click within 2 seconds of Keonho
    sebastianLastClick.current = Date.now();
    if (Date.now() - keonhoLastClick.current < 2000) {
      setShowSelfie(true);
      sounds.playCameraClick();
      onSelfie();
    }
    setTimeout(() => { /* auto-reset after 3s */ }, 3000);
  };

  return (
    <div className="main-room scene-enter">
      {showFlash && <div className="camera-flash" />}
      
      {/* Selfie overlay */}
      {showSelfie && (
        <div className="selfie-overlay" onClick={() => setShowSelfie(false)}>
          <div className="selfie-frame" onClick={e => e.stopPropagation()}>
            <div className="selfie-image">
              <div style={{ position: 'absolute', top: '8px', left: '10px', right: '10px', display: 'flex', justifyContent: 'space-between', zIndex: 10 }}>
                <span className="pixel-font" style={{ fontSize: '0.55rem', color: '#FFF8E7' }}>
                  MIRROR SNAP
                </span>
                <span style={{ fontSize: '0.8rem' }}>✨</span>
              </div>

              {/* Characters Posing Together in Mirror */}
              <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                <div style={{ position: 'absolute', bottom: '26px', right: '38px', transform: 'scale(2.2)', transformOrigin: 'bottom center', zIndex: 1 }}>
                  <SebastianSprite goofy />
                </div>
                <div style={{ position: 'absolute', bottom: '10px', left: '42px', transform: 'scale(2.4)', transformOrigin: 'bottom center', zIndex: 3 }}>
                  <KeonhoSprite goofy />
                </div>
              </div>
            </div>
            <div className="selfie-caption">
              “proof that we share exactly one braincell ♡”
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
              <button
                className="pixel-btn pixel-btn--pink"
                style={{ flex: 1, minWidth: '140px', fontSize: '0.62rem', padding: '8px 12px' }}
                onClick={handleSavePhoto}
                disabled={isSaving}
              >
                {isSaving ? '⏳ Menyimpan...' : '💾 Simpan Foto ke Galeri'}
              </button>
              <button
                className="pixel-btn"
                style={{ fontSize: '0.62rem', padding: '8px 12px' }}
                onClick={() => setShowSelfie(false)}
              >
                tutup ♡
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="room-container">
        {/* Welcome text */}
        <div style={{ textAlign: 'center', marginBottom: '1.2rem', position: 'relative', zIndex: 2 }}>
          <h1 className="pixel-font" style={{ fontSize: 'clamp(0.85rem, 2.8vw, 1.2rem)', color: '#FFF9E6', marginBottom: '0.6rem', lineHeight: '1.6', textShadow: '2px 2px 0 #000' }}>
            selamat datang, {playerName || 'Keonho'}.
          </h1>
          <p style={{ color: '#D6B8F7', fontSize: '1rem', fontWeight: 600 }}>
            santai aja ya, bby. nggak ada misi yang perlu diburu-buru di sini ♡
          </p>
        </div>

        {/* Room pixel art */}
        <div className="room-pixel-art">
          {/* Wall */}
          <div className="room-wall" />
          
          {/* Floor */}
          <div className="room-floor">
            <div className="floor-pattern" />
          </div>

          {/* Window with moon */}
          <div className="room-object room-window" onClick={handleMoonClickLocal} title="Klik bulannya!">
            <div className="window-frame">
              <div className="window-cross" />
              <div className={`moon ${moonClicks >= 5 ? 'clicked' : ''}`} />
              <div className="window-star" style={{ top: '20%', left: '15%' }} />
              <div className="window-star" style={{ top: '40%', left: '70%' }} />
              <div className="window-star" style={{ top: '10%', left: '50%' }} />
              {moonClicks >= 5 && (
                <>
                  <div className="window-star" style={{ top: '30%', left: '30%', width: '3px', height: '3px', background: '#F7DCE7' }} />
                  <div className="window-star" style={{ top: '50%', left: '55%', width: '3px', height: '3px', background: '#D8B6D8' }} />
                  <div className="window-star" style={{ top: '15%', left: '80%', width: '3px', height: '3px', background: '#F7DCE7' }} />
                </>
              )}
            </div>
          </div>

          {/* Bookshelf */}
          <div className="room-object room-bookshelf" onClick={handleBookClick} title="Buku - Catatan Semesta">
            <div className="bookshelf">
              <div className="shelf-plank" />
              <div className="shelf-plank" />
              <div className="shelf-plank" />
              <div className="shelf-plank" />
              <div className="pixel-book" style={{ left: '10%', top: '5%', height: '25%', background: '#8a4a5a' }} />
              <div className="pixel-book" style={{ left: '30%', top: '3%', height: '28%', background: '#4a6a8a' }} />
              <div className="pixel-book" style={{ left: '50%', top: '7%', height: '22%', background: '#6a8a5a' }} />
              <div className="pixel-book" style={{ left: '70%', top: '4%', height: '26%', background: '#8a7a4a' }} />
              <div className="pixel-book" style={{ left: '15%', top: '36%', height: '25%', background: '#5a5a8a' }} />
              <div className="pixel-book" style={{ left: '40%', top: '38%', height: '23%', background: '#8a5a6a' }} />
              <div className="pixel-book" style={{ left: '65%', top: '35%', height: '27%', background: '#5a8a7a' }} />
            </div>
          </div>

          {/* Mirror / Polaroid for Compliment Corner */}
          <div className="room-mirror" onClick={handleMirrorClick} title="Kata Manis">
            <div className="mirror-frame" />
          </div>

          {/* Desk */}
          <div className="room-object room-desk">
            <div className="desk-surface">
              <div className="desk-top" />
              <div className="desk-lamp">
                <div className="lamp-shade" />
                <div className="lamp-base" />
              </div>
              <div className="lamp-glow" />
            </div>
          </div>

          {/* Computer on desk */}
          <div className="room-computer" onClick={handleComputerClick} title="Star Arcade">
            <div className="computer-screen" />
            <div className="computer-base" />
          </div>

          {/* Plant */}
          <div className="room-object room-plant" onClick={handlePlantClickLocal} title="Gerald si tanaman">
            <div className="plant-pot">
              <div className="plant-leaves">
                <div className="leaf" />
                <div className="leaf" />
                <div className="leaf" />
              </div>
              <div className="pot-body" />
            </div>
          </div>

          {/* Music player */}
          <div className="room-object room-music" onClick={handleMusicClick} title="Ruang Musik">
            <div className="music-player-icon">
              <div className="music-disc" />
            </div>
          </div>

          {/* Bed */}
          <div className="room-object room-bed">
            <div className="bed-frame">
              <div className="bed-mattress" />
              <div className="bed-pillow" />
              <div className="bed-blanket" />
            </div>
          </div>

          {/* Characters with names explicitly on top */}
          <div className="room-characters">
            <div className="pixel-char-container float-anim" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="pixel-nametag pixel-nametag--room">
                <span className="pixel-nametag-icon">📸</span>
                <span className="pixel-nametag-name">{playerName || 'Keonho'}</span>
              </div>
              <div style={{ transform: 'scale(1.35)', transformOrigin: 'bottom center' }}>
                <KeonhoSprite onClick={handleKeonhoClick} />
              </div>
            </div>
            <div className="pixel-char-container float-anim" style={{ animationDelay: '0.5s', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="pixel-nametag pixel-nametag--room">
                <span className="pixel-nametag-icon">🌙</span>
                <span className="pixel-nametag-name">Sebastian</span>
              </div>
              <div style={{ transform: 'scale(1.35)', transformOrigin: 'bottom center' }}>
                <SebastianSprite onClick={handleSebastianClick} />
              </div>
            </div>
          </div>
        </div>

        {/* Dialog box */}
        {dialog && (
          <div className="dialog-box" style={{ marginTop: '0.5rem' }}>
            <div className="dialog-speaker">
              {dialog.speaker === 'you' ? `${playerName || 'Keonho'} 📸` : 'Sebastian Everett · pemandu kamu 🌙'}
            </div>
            <div className="dialog-text">{dialog.text}</div>
          </div>
        )}

        {/* Quick hint */}
        {!dialog && (
          <div className="dialog-box" style={{ marginTop: '0.8rem' }}>
            <div className="dialog-speaker">🌙 Sebastian Everett · pemandu kamu</div>
            <div className="dialog-text">
              "sayang, jangan diklik semua... eh tapi bebas deh, gemes banget liat kamu penasaran."
              <div style={{ color: '#FFB3D6', fontSize: '0.92rem', marginTop: '8px', fontWeight: 700 }}>
                💡 klik barang-barang di sekitar buat jalan-jalan bareng aku. klik sprite kita berdua buat foto bareng ya, bby!
              </div>
            </div>
          </div>
        )}

        {/* Quick navigation buttons */}
        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1.4rem' }}>
          <button className="pixel-btn" onClick={() => onNavigate('map')}>
            🗺️ peta malam
          </button>
          <button className="pixel-btn pixel-btn--pink" onClick={() => onNavigate('compliments')}>
            💝 kata manis
          </button>
          <button className="pixel-btn pixel-btn--ghost" onClick={() => onNavigate('characters')}>
            📸 foto cermin
          </button>
        </div>
      </div>
    </div>
  );
}
