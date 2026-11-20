import React from 'react';
import { PLAYLIST } from '../gameConfig';

// A compact player bar fixed above the bottom nav.
// Shows the current track, play/pause, prev/next.
// Visible on every scene so music keeps its controls everywhere.
//
// All positioning/styling lives in `.mini-player` (index.css) - keeping it
// out of inline styles is what stops the box from overlapping the nav bar
// and from spilling over its own border on narrow screens.
export default function MiniPlayer({ playerState, onToggle, onNext, onPrev }) {
  const track = PLAYLIST[playerState.currentIndex];
  if (!track) return null;

  const statusLabel =
    playerState.status === 'playing'
      ? '♪ playing'
      : playerState.status === 'loading'
      ? '… loading'
      : playerState.status === 'error'
      ? '⚠ error'
      : playerState.status === 'unavailable'
      ? '○ file nggak ada'
      : '⏸ paused';

  const unavailable = playerState.status === 'unavailable';

  // Spinner only during a real track swap, never during buffering -
  // a buffering stall must not freeze the play button.
  const playIcon = playerState.isLoadingTrack
    ? '…'
    : playerState.isPlaying
    ? '⏸'
    : '▶';

  return (
    <div
      className="mini-player"
      role="region"
      aria-label="Persistent music player"
    >
      <button
        className="pixel-btn pixel-btn--small mini-player__btn"
        onClick={onPrev}
        aria-label="Previous track"
      >
        ⏮
      </button>

      <button
        className={`pixel-btn pixel-btn--small mini-player__btn${
          playerState.isPlaying ? ' pixel-btn--pink' : ''
        }`}
        onClick={onToggle}
        aria-label={playerState.isPlaying ? 'Pause' : 'Play'}
        aria-pressed={playerState.isPlaying}
      >
        {playIcon}
      </button>

      <button
        className="pixel-btn pixel-btn--small mini-player__btn"
        onClick={onNext}
        aria-label="Next track"
      >
        ⏭
      </button>

      <div className="mini-player__meta">
        <span className="mini-player__title">
          {track.emoji} {track.title}
        </span>
        <span className="mini-player__sub">
          {track.artist} ·{' '}
          <span className="mini-player__status">{statusLabel}</span>
        </span>
      </div>

      {/* Announced to screen readers only when something is actually wrong. */}
      {unavailable && (
        <span role="status" className="visually-hidden">
          {playerState.errorMessage}
        </span>
      )}
    </div>
  );
}
