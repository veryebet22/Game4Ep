// ============================================
// Persistent Music Player
// A single global HTMLAudioElement that survives
// scene changes, React re-renders, and navigation.
// Mounted once at the App root; never recreated.
// ============================================

import { PLAYLIST } from './gameConfig';

// Check whether a local file actually exists on the server.
// Filenames may contain spaces/parentheses, so encode the URI.
const fileAvailabilityCache = new Map();

function encodeUrl(url) {
  try {
    return encodeURI(url);
  } catch {
    return url;
  }
}

// Vite serves the site from '/' during dev but from '/Game4Ep/' once this
// is deployed to GitHub Pages. The track paths in gameConfig.js are authored
// as site-absolute ('/music/x.mp3'), so they must be re-rooted onto whichever
// base this build was made with - otherwise every request would 404 against
// the bare domain root (https://veryebet22.github.io/music/...) after deploy.
const BASE = import.meta.env.BASE_URL || '/';

function resolveUrl(path) {
  const root = BASE.endsWith('/') ? BASE : `${BASE}/`;
  return root + String(path).replace(/^\/+/, '');
}

async function fileExists(url) {
  const encoded = encodeUrl(resolveUrl(url));
  if (fileAvailabilityCache.has(encoded)) {
    return fileAvailabilityCache.get(encoded);
  }
  try {
    const res = await fetch(encoded, { method: 'HEAD' });
    const ok = res.ok;
    fileAvailabilityCache.set(encoded, ok);
    return ok;
  } catch {
    fileAvailabilityCache.set(encoded, false);
    return false;
  }
}

// The singleton manager. Holds a reference to the one <audio>
// element rendered in App.jsx and exposes control methods.
class MusicPlayer {
  constructor() {
    this.audio = null;
    this.currentIndex = 0;
    this.isPlaying = false;
    this.status = 'idle'; // idle | loading | playing | paused | error | unavailable
    this.errorMessage = '';
    this.listeners = new Set();
    this._bound = false;
    // True while a track swap is in flight, so the transient `pause`/
    // `emptied` events fired by setting a new src are not mistaken for
    // a user-initiated pause.
    this._loading = false;
  }

  // Called once from App.jsx when the <audio> ref is ready.
  attach(audioEl) {
    if (this.audio === audioEl) return;
    if (this.audio) this._unbind();
    this.audio = audioEl;
    this._bind();
    // Restore the initial track without autoplay (browser policy).
    this._loadTrack(this.currentIndex, false);
  }

  _bind() {
    if (!this.audio || this._bound) return;
    const a = this.audio;
    a.addEventListener('play', this._onPlay);
    // `playing` fires again after every rebuffer. Without it the UI can
    // get stuck showing "paused"/"error" while audio keeps going,
    // because `play` only fires on a paused -> playing transition.
    a.addEventListener('playing', this._onPlaying);
    a.addEventListener('pause', this._onPause);
    a.addEventListener('ended', this._onEnded);
    a.addEventListener('error', this._onError);
    a.addEventListener('waiting', this._onBuffering);
    a.addEventListener('stalled', this._onBuffering);
    a.addEventListener('canplay', this._onCanPlay);
    this._bound = true;
  }

  _unbind() {
    if (!this.audio || !this._bound) return;
    const a = this.audio;
    a.removeEventListener('play', this._onPlay);
    a.removeEventListener('playing', this._onPlaying);
    a.removeEventListener('pause', this._onPause);
    a.removeEventListener('ended', this._onEnded);
    a.removeEventListener('error', this._onError);
    a.removeEventListener('waiting', this._onBuffering);
    a.removeEventListener('stalled', this._onBuffering);
    a.removeEventListener('canplay', this._onCanPlay);
    this._bound = false;
  }

  _onPlay = () => {
    this.isPlaying = true;
    this._loading = false;
    this.status = 'playing';
    this.errorMessage = '';
    this._emit();
  };

  _onPlaying = () => {
    // Source of truth after any stall/rebuffer: audio really is running.
    this.isPlaying = true;
    this._loading = false;
    this.status = 'playing';
    this.errorMessage = '';
    this._emit();
  };

  _onPause = () => {
    this.isPlaying = false;
    // While we are swapping tracks the element fires a transient `pause`.
    // Downgrading the status to "paused" mid-load makes the box flicker,
    // so keep whatever status _loadTrack just set.
    if (this._loading) return;
    if (this.status !== 'error' && this.status !== 'unavailable') {
      this.status = 'paused';
    }
    this._emit();
  };

  _onEnded = () => {
    // Auto-advance to the next track when a song finishes.
    this.next();
  };

  _onError = () => {
    // Only a genuine media `error` lands here. Buffer hiccups are handled
    // by _onBuffering so they never masquerade as a broken file.
    this.isPlaying = false;
    this._loading = false;
    this.status = 'error';
    this.errorMessage =
      'file audio tidak bisa dimainkan. coba lagu lain ya, bby.';
    this._emit();
  };

  _onBuffering = () => {
    if (this.isPlaying && this.status !== 'error' && this.status !== 'unavailable') {
      this.status = 'loading';
      this._emit();
    }
  };

  _onCanPlay = () => {
    if (this.status === 'loading') {
      this.status = this.isPlaying ? 'playing' : 'paused';
      this._emit();
    }
  };

  // Load a track by index. If `autoplay` is true, attempt playback.
  async _loadTrack(index, autoplay) {
    if (!this.audio) return;
    const track = PLAYLIST[index];
    if (!track) return;

    // Token guards against races: tapping next/play twice in a row starts
    // two async loads, and the slower one must not clobber the newer track.
    const token = (this._loadToken = (this._loadToken || 0) + 1);

    this.currentIndex = index;
    this.errorMessage = '';
    this._loading = true;

    const localUrl = track.localFile;
    const hasLocal = localUrl ? await fileExists(localUrl) : false;
    if (token !== this._loadToken) return; // a newer load superseded this one

    if (!hasLocal) {
      // No file on disk: pause any current audio and report honestly.
      this.audio.pause();
      this.audio.removeAttribute('src');
      this.audio.load();
      this.isPlaying = false;
      this._loading = false;
      this.status = 'unavailable';
      this.errorMessage =
        'file audio untuk lagu ini nggak ketemu di server. cek nama file di public/music/ ya, bby.';
      this._emit();
      return;
    }

    this.status = 'loading';
    this._emit();

    this.audio.src = encodeUrl(resolveUrl(localUrl));
    this.audio.load();

    if (autoplay) {
      try {
        await this.audio.play();
        // `play()` only resolves once playback has actually started, so
        // clearing here guarantees the "…" spinner can never get stuck
        // even if the DOM event ordering differs between browsers.
        if (token !== this._loadToken) return;
        this._loading = false;
        this.isPlaying = true;
        this.status = 'playing';
        this.errorMessage = '';
        this._emit();
      } catch (err) {
        if (token !== this._loadToken) return;
        // Autoplay blocked or decode failure.
        this.isPlaying = false;
        this._loading = false;
        if (err && err.name === 'NotAllowedError') {
          this.status = 'paused';
          this.errorMessage = 'klik play dulu ya, browser minta izin kamu.';
        } else {
          this.status = 'error';
          this.errorMessage = 'gagal memainkan file. format mungkin nggak didukung browser kamu.';
        }
        this._emit();
      }
    } else {
      this._loading = false;
      this.status = 'paused';
      this._emit();
    }
  }

  // ---- Public controls ----

  async play() {
    if (!this.audio) return;
    // If src is missing (unavailable track), try loading it again.
    if (!this.audio.src) {
      await this._loadTrack(this.currentIndex, true);
      return;
    }
    try {
      await this.audio.play();
    } catch (err) {
      this.isPlaying = false;
      if (err && err.name === 'NotAllowedError') {
        this.status = 'paused';
        this.errorMessage = 'klik play dulu ya, browser minta izin kamu.';
      } else {
        this.status = 'error';
        this.errorMessage = 'gagal memainkan file. format mungkin nggak didukung browser kamu.';
      }
      this._emit();
    }
  }

  pause() {
    if (!this.audio) return;
    // A user-initiated pause always wins over an in-flight track swap.
    this._loading = false;
    this.audio.pause();
    // 'pause' event handler updates state.
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  async next() {
    const nextIndex = (this.currentIndex + 1) % PLAYLIST.length;
    // Pressing next and a song ending both start the following track.
    await this._loadTrack(nextIndex, true);
  }

  async prev() {
    const prevIndex =
      (this.currentIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
    await this._loadTrack(prevIndex, true);
  }

  async select(index) {
    if (index === this.currentIndex && this.audio && this.audio.src) {
      // Re-selecting the current track toggles play.
      this.toggle();
      return;
    }
    // Selecting a song from the list always starts playback.
    await this._loadTrack(index, true);
  }

  // Pre-check availability for UI display (cached).
  isTrackAvailable(index) {
    const track = PLAYLIST[index];
    if (!track || !track.localFile) return false;
    return fileAvailabilityCache.get(encodeUrl(resolveUrl(track.localFile))) === true;
  }

  getState() {
    // The <audio> element itself is the source of truth. Deriving this on
    // every read guarantees the box can never claim "playing" while the
    // element is paused, or the other way around.
    const playing = this.audio
      ? !this.audio.paused && !this.audio.ended
      : this.isPlaying;
    this.isPlaying = playing;
    return {
      currentIndex: this.currentIndex,
      isPlaying: playing,
      status: this.status,
      errorMessage: this.errorMessage,
      // True only during an actual track swap, so the "…" spinner never
      // shows up (and never blocks the button) just because of buffering.
      isLoadingTrack: this._loading,
    };
  }

  // ---- Subscription for React ----

  subscribe(fn) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  _emit() {
    const state = this.getState();
    this.listeners.forEach((fn) => {
      try {
        fn(state);
      } catch {
        // ignore listener errors
      }
    });
  }
}

// Single global instance.
export const musicPlayer = new MusicPlayer();
