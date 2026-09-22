import React from 'react';

interface OmShopLogoProps {
  className?: string;
  size?: number | string;
  withBorder?: boolean;
  withContainer?: boolean;
}

export const OmShopLogo: React.FC<OmShopLogoProps> = ({
  className = 'w-8 h-8',
  size,
  withBorder = false,
  withContainer = false,
}) => {
  const content = (
    <svg
      viewBox="0 0 500 500"
      className="w-full h-full select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={size ? { width: size, height: size } : undefined}
    >
      <defs>
        {/* Vibrant Royal Blue Gradient matching user's official shop emblem */}
        <linearGradient id="omLogoBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00A2FF" />
          <stop offset="50%" stopColor="#0055EE" />
          <stop offset="100%" stopColor="#0035B5" />
        </linearGradient>

        <radialGradient id="omLogoRadialGlow" cx="42%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#38B6FF" />
          <stop offset="45%" stopColor="#0055EE" />
          <stop offset="100%" stopColor="#002D9C" />
        </radialGradient>
      </defs>

      {/* Outer Enclosing Circular Orbital Arc */}
      <path 
        d="M 92 178 A 195 195 0 1 1 316 438" 
        fill="none" 
        stroke="url(#omLogoBlueGrad)" 
        strokeWidth="13" 
        strokeLinecap="round" 
      />

      {/* 1. LEFT SIDE: SMARTPHONE CHASSIS & BEZEL */}
      <g transform="translate(42, 185) rotate(-18)">
        {/* Outer Phone Body */}
        <rect 
          x="0" 
          y="0" 
          width="78" 
          height="164" 
          rx="18" 
          fill="#FFFFFF" 
          stroke="url(#omLogoBlueGrad)" 
          strokeWidth="7.5" 
        />
        {/* Inner Phone Display Bezel */}
        <rect 
          x="6.5" 
          y="8" 
          width="65" 
          height="148" 
          rx="13" 
          fill="#FFFFFF" 
          stroke="url(#omLogoBlueGrad)" 
          strokeWidth="3" 
        />
        {/* Notch / Speaker Sensor */}
        <rect 
          x="24" 
          y="11" 
          width="30" 
          height="4.5" 
          rx="2.25" 
          fill="url(#omLogoBlueGrad)" 
        />
        {/* Physical Buttons */}
        <rect x="-4.5" y="42" width="4" height="18" rx="2" fill="url(#omLogoBlueGrad)" />
        <rect x="-4.5" y="66" width="4" height="18" rx="2" fill="url(#omLogoBlueGrad)" />
        <rect x="78" y="50" width="4" height="24" rx="2" fill="url(#omLogoBlueGrad)" />
      </g>

      {/* Curved lower swoosh joining phone base to circle */}
      <path 
        d="M 98 335 C 105 385, 142 428, 205 444 C 275 460, 360 435, 410 365" 
        fill="none" 
        stroke="url(#omLogoBlueGrad)" 
        strokeWidth="8" 
        strokeLinecap="round" 
      />

      {/* 2. CENTER: SACRED OM (ॐ) SYMBOL */}
      <g fill="url(#omLogoRadialGlow)" stroke="url(#omLogoBlueGrad)">
        {/* Top Diamond Bindu */}
        <rect 
          x="262" 
          y="98" 
          width="25" 
          height="25" 
          rx="4" 
          transform="rotate(45 274.5 110.5)" 
          fill="url(#omLogoBlueGrad)" 
          stroke="none" 
        />

        {/* Top Chandra (Crescent) */}
        <path 
          d="M 238 128 
             C 256 150, 296 150, 324 126 
             C 305 138, 260 140, 238 128 Z" 
          strokeWidth="1.5" 
        />

        {/* Main Upper Head of the Om */}
        <path 
          d="M 172 178 
             C 192 142, 240 140, 264 165 
             C 288 190, 276 226, 235 240 
             C 222 244, 212 242, 218 232 
             C 224 220, 248 220, 252 198 
             C 256 174, 226 162, 194 175 
             C 182 180, 170 188, 172 178 Z" 
          strokeWidth="1.5" 
        />

        {/* Main Lower Belly of the Om */}
        <path 
          d="M 226 238 
             C 255 244, 274 274, 258 318 
             C 238 370, 175 365, 142 308 
             C 134 294, 148 288, 156 298 
             C 182 338, 222 344, 238 308 
             C 252 278, 232 254, 202 248 
             C 194 246, 198 236, 208 238 Z" 
          strokeWidth="1.5" 
        />

        {/* Sweeping Right Wing & Elevated Tail */}
        <path 
          d="M 235 246 
             C 285 220, 375 250, 376 318 
             C 376 395, 290 408, 232 374 
             C 222 368, 228 354, 238 360 
             C 280 384, 348 376, 348 315 
             C 348 266, 278 242, 228 264 
             C 220 268, 224 252, 235 246 Z" 
          strokeWidth="1.5" 
        />
      </g>

      {/* 3. TOP RIGHT: WI-FI / WIRELESS SIGNAL WAVES */}
      <g stroke="url(#omLogoBlueGrad)" strokeLinecap="round" fill="none">
        <path d="M 368 152 A 28 28 0 0 1 406 122" strokeWidth="10" />
        <path d="M 372 130 A 52 52 0 0 1 432 88" strokeWidth="11" />
        <path d="M 382 108 A 76 76 0 0 1 462 58" strokeWidth="12" />
        <circle cx="382" cy="164" r="7" fill="url(#omLogoBlueGrad)" stroke="none" />
      </g>

      {/* 4. BOTTOM RIGHT: DIGITAL PCB CIRCUIT TRACES & NODES */}
      <g stroke="url(#omLogoBlueGrad)" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M 305 372 L 358 372 L 398 328 L 434 328" strokeWidth="6" />
        <circle cx="444" cy="328" r="8" fill="#FFFFFF" stroke="url(#omLogoBlueGrad)" strokeWidth="5" />

        <path d="M 324 394 L 376 394 L 414 356 L 452 356" strokeWidth="6" />
        <circle cx="462" cy="356" r="8" fill="#FFFFFF" stroke="url(#omLogoBlueGrad)" strokeWidth="5" />

        <path d="M 346 414 L 392 414 L 426 384 L 454 384" strokeWidth="5" />
        <circle cx="464" cy="384" r="7" fill="#FFFFFF" stroke="url(#omLogoBlueGrad)" strokeWidth="4.5" />
      </g>
    </svg>
  );

  if (withContainer) {
    return (
      <div 
        className={`relative inline-flex items-center justify-center rounded-2xl bg-white p-1.5 transition-transform hover:scale-105 ${
          withBorder ? 'border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]' : ''
        } ${className}`}
      >
        <div className="w-full h-full rounded-xl overflow-hidden">
          {content}
        </div>
      </div>
    );
  }

  return <div className={`inline-flex items-center justify-center shrink-0 ${className}`}>{content}</div>;
};
