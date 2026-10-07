import React from 'react';

interface KlockitLogoProps {
  variant?: 'full' | 'compact' | 'icon-only' | 'app-icon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  theme?: 'dark' | 'light';
}

/**
 * High-fidelity vector rendition of Klockit's geometric faceted 'K' logo
 * and typography based on official brand assets:
 * Deep Navy: #0A266B
 * Bright Blue: #009FF5
 * Bright Cyan: #00C2FF
 * Tagline: "Know who was at work"
 */
export function KlockitIcon({ size = 36, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="Klockit mark"
    >
      <defs>
        {/* Left vertical/angled parallelogram gradient */}
        <linearGradient id="klockit-left-grad" x1="20" y1="100" x2="52" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00C2FF" />
          <stop offset="60%" stopColor="#009FF5" />
          <stop offset="100%" stopColor="#0A266B" />
        </linearGradient>

        {/* Lower diagonal band folding across */}
        <linearGradient id="klockit-lower-grad" x1="30" y1="80" x2="105" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00C2FF" />
          <stop offset="70%" stopColor="#009FF5" />
          <stop offset="100%" stopColor="#0A266B" />
        </linearGradient>

        {/* Upper diagonal arm going to top right */}
        <linearGradient id="klockit-upper-grad" x1="50" y1="50" x2="100" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0088E0" />
          <stop offset="100%" stopColor="#0A266B" />
        </linearGradient>

        {/* Shadow crease between planes */}
        <linearGradient id="klockit-crease-shadow" x1="55" y1="45" x2="70" y2="65" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#061842" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#061842" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Left angled stem */}
      <path
        d="M32 20H54L38 100H16L32 20Z"
        fill="url(#klockit-left-grad)"
      />

      {/* Top right arm */}
      <path
        d="M68 20H100L58 68L48 55L68 20Z"
        fill="url(#klockit-upper-grad)"
      />

      {/* Bottom right folding diagonal leg */}
      <path
        d="M26 84L60 46L102 100H68L45 70L26 84Z"
        fill="url(#klockit-lower-grad)"
      />

      {/* Subtle depth crease on fold */}
      <path
        d="M52 56L68 76L61 84L46 64Z"
        fill="url(#klockit-crease-shadow)"
      />
    </svg>
  );
}

export function KlockitAppIcon({ size = 48, className = '' }: { size?: number; className?: string }) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`rounded-2xl bg-white shadow-md border border-slate-200/80 p-2 flex items-center justify-center shrink-0 ${className}`}
    >
      <KlockitIcon size={size * 0.75} />
    </div>
  );
}

export function KlockitLogo({
  variant = 'full',
  size = 'md',
  className = '',
  theme = 'light',
}: KlockitLogoProps) {
  const iconSizes = {
    sm: 26,
    md: 34,
    lg: 44,
    xl: 56,
  };

  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  };

  const taglineSizes = {
    sm: 'text-[10px] tracking-wider',
    md: 'text-xs tracking-wider',
    lg: 'text-sm tracking-widest',
    xl: 'text-base tracking-widest',
  };

  const isLightText = theme === 'dark';
  const textColor = isLightText ? 'text-white' : 'text-[#0A266B]';
  const tagColor = isLightText ? 'text-slate-300' : 'text-slate-500';

  if (variant === 'icon-only') {
    return <KlockitIcon size={iconSizes[size]} className={className} />;
  }

  if (variant === 'app-icon') {
    return <KlockitAppIcon size={iconSizes[size] * 1.3} className={className} />;
  }

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <KlockitIcon size={iconSizes[size]} />
      <div className="flex flex-col">
        <div className={`font-extrabold tracking-tight leading-none ${textSizes[size]} ${textColor} flex items-center`}>
          <span>Klock</span>
          <span className="relative inline-block">
            {/* The signature cyan dot on the 'i' */}
            <span className="text-[#00C2FF]">i</span>
          </span>
          <span>t</span>
        </div>
        {variant === 'full' && (
          <span className={`font-normal mt-0.5 leading-none ${taglineSizes[size]} ${tagColor}`}>
            Know who was at work
          </span>
        )}
      </div>
    </div>
  );
}
