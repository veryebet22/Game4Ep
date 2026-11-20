import React from 'react';
import { PLAYLIST } from '../gameConfig';

export default function PlaylistRoom({
  onBack,
  playerState,
  onToggle,
  onNext,
  onPrev,
  onSelect,
}) {
  const activeIndex = playerState.currentIndex;
  const activeSong = PLAYLIST[activeIndex] || PLAYLIST[0];

  const statusLabel =
    playerState.status === 'playing'
      ? '▶ sedang diputar'
      : playerState.isLoadingTrack
      ? '… memuat lagu'
      : playerState.status === 'loading'
      ? '… buffering'
      : playerState.status === 'error'
      ? '⚠ error'
      : playerState.status === 'unavailable'
      ? '○ file lokal belum ada'
      : '⏸ jeda';

  return (
    <div className="playlist-room scene-enter">
      <h1
        className="pixel-font"
        style={{
          fontSize: 'clamp(0.9rem, 2.5vw, 1.25rem)',
          color: '#FFF9E6',
          marginBottom: '0.6rem',
          textShadow: '2px 2px 0 #000',
        }}
      >
        🎵 lagu di bawah rembulan
      </h1>
      <p
        style={{
          color: '#D6B8F7',
          fontSize: '1.05rem',
          marginBottom: '0.4rem',
          fontWeight: 600,
        }}
      >
        lagu-lagu manis dari HIVI!, Tulus, dan Afgan khusus buat nemenin kamu, bby.
      </p>
      <p
        className="pixel-font"
        style={{
          fontSize: '0.65rem',
          color: '#FFB3D6',
          marginBottom: '1.5rem',
        }}
      >
        klik lagu di bawah buat dengerin, bby ♡
      </p>

      {/* Now-playing panel with transport controls */}
      <div
        style={{
          width: '100%',
          maxWidth: '520px',
          marginBottom: '1.4rem',
          background: 'rgba(23, 27, 53, 0.9)',
          padding: '14px 14px 12px',
          borderRadius: '12px',
          border: '2px solid #8E82E2',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '10px',
            padding: '0 4px',
          }}
        >
          <span
            className="pixel-font"
            style={{ fontSize: '0.52rem', color: '#FFF4DE' }}
          >
            📻 PEMUTAR LOKAL
          </span>
          <span
            style={{
              fontSize: '0.75rem',
              color: '#1DB954',
              fontWeight: 700,
            }}
          >
            • {activeIndex + 1} dari {PLAYLIST.length}
          </span>
        </div>

        {/* Current track display */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'rgba(32, 36, 64, 0.7)',
            borderRadius: '8px',
            padding: '10px 12px',
            marginBottom: '10px',
          }}
        >
          <div
            style={{
              fontSize: '1.6rem',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #8E82E2, #D6B8F7)',
              border: '2px solid #FFF9E6',
              borderRadius: '4px',
              flexShrink: 0,
            }}
          >
            {activeSong.emoji}
          </div>
          <div style={{ minWidth: 0 }}>
            <div
              className="pixel-font"
              style={{
                fontSize: '0.6rem',
                color: '#FFF9E6',
                marginBottom: '4px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {activeSong.title}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#FFB3D6', fontWeight: 700 }}>
              {activeSong.artist} ·{' '}
              <span style={{ color: '#B3A8FA', fontWeight: 600 }}>{statusLabel}</span>
            </div>
          </div>
        </div>

        {/* Transport controls. flex-wrap lives in `.player-controls` so the
            three buttons wrap on narrow screens instead of overflowing. */}
        <div className="player-controls">
          <button
            className="pixel-btn pixel-btn--small"
            onClick={onPrev}
            aria-label="Previous"
            style={{ fontSize: '0.6rem', padding: '8px 14px' }}
          >
            ⏮ sebelumnya
          </button>
          <button
            className={`pixel-btn pixel-btn--small ${
              playerState.isPlaying ? 'pixel-btn--pink' : ''
            }`}
            onClick={onToggle}
            aria-label={playerState.isPlaying ? 'Pause' : 'Play'}
            aria-pressed={playerState.isPlaying}
            style={{ fontSize: '0.6rem', padding: '8px 18px' }}
          >
            {playerState.isLoadingTrack
              ? '… memuat'
              : playerState.isPlaying
              ? '⏸ jeda'
              : '▶ putar'}
          </button>
          <button
            className="pixel-btn pixel-btn--small"
            onClick={onNext}
            aria-label="Next"
            style={{ fontSize: '0.6rem', padding: '8px 14px' }}
          >
            berikutnya ⏭
          </button>
        </div>

        {/* Status / error message */}
        {playerState.errorMessage && (
          <div
            role="status"
            style={{
              fontSize: '0.8rem',
              color: '#FFB3D6',
              textAlign: 'center',
              background: 'rgba(46, 31, 59, 0.7)',
              borderRadius: '6px',
              padding: '8px 10px',
              lineHeight: 1.5,
            }}
          >
            {playerState.errorMessage}
          </div>
        )}

        <div
          style={{
            marginTop: '10px',
            padding: '8px 10px',
            background: 'rgba(32, 36, 64, 0.7)',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <span style={{ fontSize: '0.85rem', color: '#FFB3D6', fontStyle: 'italic' }}>
            “{activeSong.note}”
          </span>
        </div>
      </div>

      {/* Song list */}
      <div className="song-list" style={{ width: '100%', maxWidth: '520px' }}>
        {PLAYLIST.map((song, i) => {
          const isSelected = i === activeIndex;
          return (
            <div
              key={i}
              className="song-card"
              onClick={() => onSelect(i)}
              style={{
                cursor: 'pointer',
                borderColor: isSelected ? '#FFB3D6' : undefined,
                background: isSelected ? 'rgba(46, 38, 77, 0.9)' : undefined,
                // No scale() here: scaling a hard pixel border/shadow made
                // the selected card jump and blur on every selection.
                transition: 'border-color 0.2s ease, background 0.2s ease',
              }}
            >
              <div className="song-cover">{song.emoji}</div>
              <div className="song-info">
                <div
                  className="song-title"
                  style={{ color: isSelected ? '#FFB3D6' : '#FFF9E6' }}
                >
                  {song.title} {isSelected && '✨'}
                </div>
                <div className="song-artist">{song.artist}</div>
                <div className="song-note">“{song.note}”</div>
              </div>

              <div className="song-actions">
                <button
                  className={`pixel-btn pixel-btn--small ${
                    isSelected ? 'pixel-btn--pink' : 'pixel-btn--ghost'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(i);
                  }}
                  style={{ fontSize: '0.55rem', padding: '6px 8px' }}
                >
                  {isSelected && playerState.isPlaying
                    ? '⏸ Jeda'
                    : isSelected
                    ? '▶ Putar'
                    : 'Pilih Lagu'}
                </button>
                {isSelected && (
                  <button
                    className="pixel-btn pixel-btn--small pixel-btn--ghost"
                    style={{ fontSize: '0.55rem', padding: '6px 8px' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(song.spotifyUrl, '_blank');
                    }}
                  >
                    Buka di Spotify ↗
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: '1.5rem',
          display: 'flex',
          gap: '0.8rem',
          justifyContent: 'center',
        }}
      >
        <button className="pixel-btn" onClick={onBack}>
          ← balik ke kamar
        </button>
      </div>
    </div>
  );
}
