import React, { useState, useEffect, useRef } from 'react';

export default function SebastianSprite({ goofy = false, onClick, scale = 1 }) {
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
    }, 3600 + Math.random() * 2000);
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
      aria-label="Sebastian Everett"
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

        {/* Legs / Dark Trousers */}
        <rect x="15" y="48" width="6" height="11" fill="#1A1C29" />
        <rect x="23" y="48" width="6" height="11" fill="#151722" />
        {/* Shoes */}
        <rect x="13" y="58" width="8" height="4" fill="#0B0C14" />
        <rect x="13" y="60" width="8" height="2" fill="#94A3B8" />
        <rect x="23" y="58" width="8" height="4" fill="#0B0C14" />
        <rect x="23" y="60" width="8" height="2" fill="#94A3B8" />

        {/* Denim Outerwear (From Photo) */}
        {/* Main Denim Body */}
        <rect x="11" y="27" width="22" height="22" fill="#3D5A85" />
        <rect x="10" y="29" width="2" height="18" fill="#2B4263" />
        <rect x="32" y="29" width="2" height="18" fill="#2B4263" />

        {/* Denim Seams & Chest Pockets */}
        <rect x="14" y="32" width="6" height="5" fill="#324C73" />
        <rect x="24" y="32" width="6" height="5" fill="#324C73" />
        <line x1="22" y1="29" x2="22" y2="48" stroke="#2B4263" strokeWidth="1" />
        {/* Denim Buttons / Rivets */}
        <circle cx="22" cy="32" r="0.8" fill="#D4AF37" />
        <circle cx="22" cy="38" r="0.8" fill="#D4AF37" />
        <circle cx="22" cy="44" r="0.8" fill="#D4AF37" />

        {/* Fluffy / Frayed Collar (Distinguishing Feature in Reference Photo!) */}
        {/* Fluffy Shearling / Sherpa Texture */}
        <rect x="12" y="24" width="20" height="5" rx="2" fill="#F3ECE1" />
        <rect x="11" y="25" width="2" height="3" fill="#DFD2BE" />
        <rect x="31" y="25" width="2" height="3" fill="#DFD2BE" />
        {/* Fluffy cloud edges */}
        <circle cx="13" cy="26" r="1.5" fill="#FFFBF5" />
        <circle cx="16" cy="27" r="1.5" fill="#FFFBF5" />
        <circle cx="19" cy="27.5" r="1.5" fill="#FFFBF5" />
        <circle cx="22" cy="28" r="1.5" fill="#FFFBF5" />
        <circle cx="25" cy="27.5" r="1.5" fill="#FFFBF5" />
        <circle cx="28" cy="27" r="1.5" fill="#FFFBF5" />
        <circle cx="31" cy="26" r="1.5" fill="#FFFBF5" />

        {/* Arms */}
        <rect x="7" y="29" width="5" height="17" fill="#3D5A85" />
        <rect x="7" y="44" width="5" height="2" fill="#2B4263" />
        <rect x="8" y="46" width="4" height="4" fill="#F8CBA6" />

        <rect x="32" y="29" width="5" height="17" fill="#3D5A85" />
        <rect x="32" y="44" width="5" height="2" fill="#2B4263" />
        <rect x="32" y="46" width="4" height="4" fill="#F8CBA6" />

        {/* Neck */}
        <rect x="19" y="22" width="6" height="4" fill="#F0B990" />

        {/* Head / Face */}
        <rect x="13" y="10" width="18" height="15" rx="2" fill="#F8CBA6" />
        {/* Soft cheek blush */}
        <rect x="14" y="19" width="3" height="2" fill="#F4A988" opacity="0.6" />
        <rect x="27" y="19" width="3" height="2" fill="#F4A988" opacity="0.6" />

        {/* Facial Expression */}
        {goofy ? (
          /* Mischievous playful grimace mirroring Keonho from photo */
          <g>
            {/* Arched playful eyebrows */}
            <polygon points="15,14 19,16 19,14 15,13" fill="#1E1B2E" />
            <polygon points="29,14 25,16 25,14 29,13" fill="#1E1B2E" />
            {/* Mischievous squinting dark eyes */}
            <rect x="16" y="16" width="4" height="2" fill="#1A1829" />
            <rect x="24" y="16" width="4" height="2" fill="#1A1829" />
            {/* Crinkled nose */}
            <rect x="21" y="17" width="2" height="1" fill="#D9825F" />
            {/* Teeth showing playfully */}
            <rect x="17" y="19" width="10" height="4" rx="1" fill="#7A2222" />
            <rect x="18" y="19.5" width="8" height="2" fill="#FFFFFF" />
            <line x1="20" y1="19.5" x2="20" y2="21.5" stroke="#CBD5E1" strokeWidth="0.5" />
            <line x1="22" y1="19.5" x2="22" y2="21.5" stroke="#CBD5E1" strokeWidth="0.5" />
            <line x1="24" y1="19.5" x2="24" y2="21.5" stroke="#CBD5E1" strokeWidth="0.5" />
          </g>
        ) : (
          /* Gentle, calm, slightly teasing smile */
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
            {/* Mischievous / gentle smile */}
            <path d="M 19 21 Q 22 23 25 21" stroke="#C87055" strokeWidth="1.2" fill="none" />
          </g>
        )}

        {/* Sebastian / Seonghyeon's Hair (Dark, Parted with Bangs on Forehead) */}
        {/* Hair base */}
        <path
          d="M 12 12 Q 12 3 22 3 Q 32 3 32 12 L 32 15 L 30 14 L 30 11 Q 22 7 14 11 L 14 15 Z"
          fill="#13121D"
        />
        {/* Sideburns */}
        <rect x="12" y="11" width="2.5" height="8" fill="#13121D" />
        <rect x="29.5" y="11" width="2.5" height="8" fill="#13121D" />
        {/* Bangs falling over forehead - center parted curtain */}
        <polygon points="14,8 18,15 19,8" fill="#1E1D2D" />
        <polygon points="18,8 20,14 21,8" fill="#29273D" />
        {/* Center part */}
        <polygon points="21,6 22,10 23,6" fill="#13121D" />
        <polygon points="23,8 24,14 26,8" fill="#29273D" />
        <polygon points="26,8 30,15 31,8" fill="#1E1D2D" />
        {/* Hair highlights */}
        <rect x="16" y="4" width="4" height="1.5" fill="#3D3A54" />
        <rect x="24" y="4" width="5" height="1.5" fill="#3D3A54" />
      </svg>
    </div>
  );
}
