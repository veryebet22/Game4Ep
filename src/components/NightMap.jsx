import React from 'react';
import { MAP_LOCATIONS, BADGES } from '../gameConfig';

export default function NightMap({ discoveries, onNavigate, onChangeName, onResetDiscoveries }) {
  const earnedCount = Object.keys(discoveries).filter(k => discoveries[k]).length;

  const handleLocationClick = (loc) => {
    if (loc.locked && !discoveries.secret_finder && !discoveries.moon_gazer) {
      return;
    }
    onNavigate(loc.id);
  };

  const isUnlocked = (loc) => {
    if (!loc.locked) return true;
    if (loc.id === 'secret' && (discoveries.secret_finder || discoveries.moon_gazer)) return true;
    return false;
  };

  return (
    <div className="night-map scene-enter">
      <h1 className="map-title">peta malam.exe 🗺️</h1>
      <p className="map-subtitle">mau kita ke mana nih sekarang, bby?</p>

      <div className="map-grid">
        {MAP_LOCATIONS.map(loc => {
          const unlocked = isUnlocked(loc);
          return (
            <button
              key={loc.id}
              className={`map-location ${!unlocked ? 'locked' : ''}`}
              onClick={() => handleLocationClick(loc)}
              disabled={!unlocked}
              aria-label={`${loc.name} - ${unlocked ? loc.desc : 'terkunci'}`}
            >
              <div className="map-loc-badge">{loc.emoji}</div>
              <div className="map-loc-name">{loc.name}</div>
              <div className="map-loc-desc">
                {unlocked ? loc.desc : 'masih terkunci, bby'}
              </div>
              {discoveries[loc.id === 'game' ? 'star_collector' : loc.id === 'secret' ? 'secret_finder' : ''] && (
                <span style={{ position: 'absolute', bottom: '8px', right: '8px', fontSize: '0.7rem' }}>✅</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Badges section */}
      <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        <h2 className="pixel-font" style={{ fontSize: '0.55rem', color: '#FFF4DE', marginBottom: '1rem', lineHeight: '1.6' }}>
          koleksi badge kamu ({earnedCount}/{BADGES.length})
        </h2>
        <div className="badges-container">
          {BADGES.map(badge => (
            <div
              key={badge.id}
              className={`badge ${discoveries[badge.id] ? 'earned' : 'locked'}`}
              title={discoveries[badge.id] ? badge.desc : '???'}
            >
              {discoveries[badge.id] ? badge.name : '🔒 ???'}
            </div>
          ))}
        </div>
      </div>

      {/* Utility buttons */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button className="pixel-btn pixel-btn--small" onClick={() => onNavigate('main')}>
          ← balik ke kamar
        </button>
        <button className="pixel-btn pixel-btn--small pixel-btn--ghost" onClick={onChangeName}>
          ✏️ ganti nama
        </button>
        <button className="reset-btn" onClick={onResetDiscoveries}>
          reset pencapaian
        </button>
      </div>
    </div>
  );
}
