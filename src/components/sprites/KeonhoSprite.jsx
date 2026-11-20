import React, { useState, useEffect, useRef } from 'react';

export default function KeonhoSprite({ goofy = false, onClick, scale = 1 }) {
  const [blink, setBlink] = useState(false);
  const [breathPhase, setBreathPhase] = useState(0);
  
  // Ref for tracking last update time
  const lastUpdateRef = useRef(performance.now());

  useEffect(() => {
    const animate = (time) => {
      const delta = time - lastUpdateRef.current;
      lastUpdateRef.current = time;
      
      // Slow idle breathing (cycle every ~4 seconds)
      setBreathPhase(prev => {
        const newPhase = prev + delta / 4000;
        return newPhase > 1 ? newPhase - 1 : newPhase;
      });
    };
    
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, []);

  // Determine blink state based on time
  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 160);
    }, 3200 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  // Subtle pupil movement based on breath phase
  const pupilOffset = Math.sin(breathPhase * Math.PI) * 1;
  return (
    <div
      className="pixel-sprite-wrapper"
      onClick={onClick}
      style={{
        cursor: onClick ? 'pointer' : 'default',
        display: 'inline-block',
        imageRendering: 'pixelated',
        transform: `scale(${scale})`,
        transformOrigin: 'bottom center',
        userSelect: 'none',
      }}
      role={onClick ? 'button' : undefined}
      aria-label="Keonho"
      tabIndex={onClick ? 0 : undefined}
    >
      <svg
        width="44"
        height="64"
        viewBox="0 0 44 64"
        shapeRendering="crispEdges"
        style={{ display: 'block', overflow: 'visible' }}
      >
        {/* Shadow */}
        <ellipse cx="22" cy="62" rx="14" ry="2.5" fill="#0c0e1a" opacity="0.6" />

        {/* Legs / Jeans */}
        <rect x="15" y="48" width="6" height="11" fill="#1C2138" />
        <rect x="23" y="48" width="6" height="11" fill="#181D33" />
        {/* Shoes */}
        <rect x="13" y="58" width="8" height="4" fill="#0F111D" />
        <rect x="13" y="60" width="8" height="2" fill="#E2E8F0" />
        <rect x="23" y="58" width="8" height="4" fill="#0F111D" />
        <rect x="23" y="60" width="8" height="2" fill="#E2E8F0" />

        {/* Navy Textured Ribbed Knit Jacket / Sweater (From Photo) */}
        {/* Main Torso */}
        <rect x="11" y="27" width="22" height="22" fill="#1A244D" />
        <rect x="10" y="29" width="2" height="18" fill="#131B3B" />
        <rect x="32" y="29" width="2" height="18" fill="#131B3B" />
        {/* Vertical Ribbed Texture Lines */}
        <rect x="14" y="29" width="1" height="20" fill="#24336B" />
        <rect x="17" y="29" width="1" height="20" fill="#24336B" />
        <rect x="20" y="32" width="1" height="17" fill="#24336B" />
        <rect x="23" y="32" width="1" height="17" fill="#24336B" />
        <rect x="26" y="29" width="1" height="20" fill="#24336B" />
        <rect x="29" y="29" width="1" height="20" fill="#24336B" />

        {/* Chunky Silver Zipper Track Down Chest */}
        <rect x="21" y="27" width="2" height="18" fill="#CBD5E1" />
        <rect x="21" y="28" width="2" height="2" fill="#FFFFFF" />
        <rect x="21" y="33" width="2" height="3" fill="#94A3B8" />

        {/* Folded Knit Collar */}
        <polygon points="11,27 19,27 16,33 11,31" fill="#2A3875" />
        <polygon points="33,27 25,27 28,33 33,31" fill="#232F63" />

        {/* Left Arm (Relaxed) */}
        <rect x="7" y="29" width="5" height="16" fill="#1A244D" />
        <rect x="7" y="44" width="5" height="3" fill="#131B3B" />
        <rect x="8" y="47" width="4" height="4" fill="#F8CBA6" />

        {/* Right Arm (Holding Phone/Camera Up - Mirror Selfie Pose) */}
        <rect x="31" y="29" width="6" height="10" fill="#1A244D" />
        <rect x="32" y="38" width="7" height="6" fill="#1A244D" />
        {/* Hand with Ring */}
        <rect x="33" y="33" width="6" height="6" fill="#F8CBA6" />
        {/* Silver Ring on finger (visible in photo!) */}
        <rect x="35" y="33" width="2" height="2" fill="#E2E8F0" />
        <rect x="36" y="33" width="1" height="1" fill="#FFFFFF" />

        {/* iPhone (Held in Hand taking Mirror Selfie) */}
        <rect x="34" y="24" width="9" height="15" rx="2" fill="#1E232E" />
        <rect x="35" y="25" width="7" height="13" fill="#2C3240" />
        {/* Camera bump & lenses */}
        <rect x="35" y="26" width="4" height="4" fill="#15171F" />
        <circle cx="36.5" cy="27.5" r="0.8" fill="#64748B" />
        <circle cx="36.5" cy="29" r="0.8" fill="#64748B" />
        {/* Apple logo shimmer */}
        <rect x="38" y="31" width="1.5" height="2" fill="#94A3B8" />

        {/* Neck */}
        <rect x="19" y="24" width="6" height="4" fill="#F0B990" />
        {/* Grey inner t-shirt peek */}
        <rect x="20" y="26" width="4" height="2" fill="#64748B" />

        {/* Head / Face */}
        <rect x="13" y="10" width="18" height="15" rx="2" fill="#F8CBA6" />
        {/* Soft blush / shadow */}
        <rect x="13" y="19" width="3" height="2" fill="#F4A988" opacity="0.6" />
        <rect x="28" y="19" width="3" height="2" fill="#F4A988" opacity="0.6" />

        {/* Facial Expression */}
        {goofy ? (
          /* Fierce playful grimace / snarl from photo! Showing teeth */
          <g>
            {/* Angry/Playful scrunchy eyebrows */}
            <polygon points="15,14 20,16 20,14 15,13" fill="#1E1B2E" />
            <polygon points="29,14 24,16 24,14 29,13" fill="#1E1B2E" />
            {/* Squinty intense dark eyes */}
            <rect x={14 + pupilOffset} y="16" width="4" height="2" fill="#1A1829" />
            <rect x={26 + pupilOffset} y="16" width="4" height="2" fill="#1A1829" />
            {/* Scrunched nose */}
            <rect x="21" y="17" width="2" height="1" fill="#D9825F" />
            {/* Snarl mouth showing teeth */}
            <rect x="17" y="19" width="10" height="4" rx="1" fill="#7A2222" />
            <rect x="18" y="19.5" width="8" height="2" fill="#FFFFFF" />
            <line x1="20" y1="19.5" x2="20" y2="21.5" stroke="#CBD5E1" strokeWidth="0.5" />
            <line x1="22" y1="19.5" x2="22" y2="21.5" stroke="#CBD5E1" strokeWidth="0.5" />
            <line x1="24" y1="19.5" x2="24" y2="21.5" stroke="#CBD5E1" strokeWidth="0.5" />
          </g>
        ) : (
          /* Calm / Cute cool expression */
          <g>
            {/* Eyebrows */}
            <rect x="15" y="14" width="4" height="1" fill="#1E1B2E" />
            <rect x="25" y="14" width="4" height="1" fill="#1E1B2E" />
            {/* Eyes */}
            {blink ? (
              <>
                <rect x="15" y="17" width="4" height="1" fill="#1A1829" />
                <rect x="25" y="17" width="4" height="1" fill="#1A1829" />
              </>
            ) : (
              <>
                <rect x="15" y="16" width="4" height="3" rx="1" fill="#1A1829" />
                <rect x="25" y="16" width="4" height="3" rx="1" fill="#1A1829" />
                <rect x="16" y="16" width="1.5" height="1.5" fill="#FFFFFF" />
                <rect x="26" y="16" width="1.5" height="1.5" fill="#FFFFFF" />
              </>
            )}
            {/* Calm mouth / slight smirk */}
            <rect x="20" y="21" width="4" height="1.5" rx="0.5" fill="#C87055" />
          </g>
        )}

        {/* Keonho's Dark Messy Wet/Parted Hair (From Photo) */}
        {/* Hair base */}
        <path
          d="M 12 12 Q 12 3 22 3 Q 32 3 32 12 L 32 15 L 30 14 L 30 11 Q 22 7 14 11 L 14 15 Z"
          fill="#141320"
        />
        {/* Sideburns */}
        <rect x="12" y="11" width="2.5" height="8" fill="#141320" />
        <rect x="29.5" y="11" width="2.5" height="8" fill="#141320" />
        {/* Messy bangs falling on forehead */}
        <polygon points="13,8 17,14 18,8" fill="#1C1B2B" />
        <polygon points="17,8 21,15 22,8" fill="#26243A" />
        {/* Parted center strand */}
        <polygon points="21,7 23,12 24,7" fill="#141320" />
        <polygon points="24,8 27,15 28,8" fill="#26243A" />
        <polygon points="27,8 30,13 31,8" fill="#1C1B2B" />
        {/* Hair gloss highlights */}
        <rect x="16" y="4" width="4" height="1.5" fill="#3E3C57" />
        <rect x="24" y="4" width="5" height="1.5" fill="#3E3C57" />
      </svg>
    </div>
  );
}