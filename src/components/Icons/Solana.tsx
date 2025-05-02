import React from "react";

interface SolanaProps {
  size?: number | string;
  gradientStart?: string;
  gradientEnd?: string;
}

const SolanaLogo: React.FC<SolanaProps> = ({
  size = "100%",
  gradientStart = "#00FFA3", // Bright green default
  gradientEnd = "#DC1FFF", // Bright purple default
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 397.7 311.7"
    width={size}
    height={size}
    fill="none"
  >
    <defs>
      <linearGradient
        id="gradient1"
        x1="360.8791"
        y1="351.4553"
        x2="141.213"
        y2="-69.2936"
        gradientTransform="matrix(1 0 0 -1 0 314)"
      >
        <stop offset="0" stopColor={gradientStart} />
        <stop offset="1" stopColor={gradientEnd} />
      </linearGradient>
      <linearGradient
        id="gradient2"
        x1="264.8291"
        y1="401.6014"
        x2="45.163"
        y2="-19.1475"
        gradientTransform="matrix(1 0 0 -1 0 314)"
      >
        <stop offset="0" stopColor={gradientStart} />
        <stop offset="1" stopColor={gradientEnd} />
      </linearGradient>
      <linearGradient
        id="gradient3"
        x1="312.5484"
        y1="376.688"
        x2="92.8822"
        y2="-44.061"
        gradientTransform="matrix(1 0 0 -1 0 314)"
      >
        <stop offset="0" stopColor={gradientStart} />
        <stop offset="1" stopColor={gradientEnd} />
      </linearGradient>
    </defs>

    <path
      d="M64.6,237.9c2.4-2.4,5.7-3.8,9.2-3.8h317.4c5.8,0,8.7,7,4.6,11.1l-62.7,62.7c-2.4,2.4-5.7,3.8-9.2,3.8H6.5
      c-5.8,0-8.7-7-4.6-11.1L64.6,237.9z"
      fill="url(#gradient1)"
    />
    <path
      d="M64.6,3.8C67.1,1.4,70.4,0,73.8,0h317.4c5.8,0,8.7,7,4.6,11.1l-62.7,62.7c-2.4,2.4-5.7,3.8-9.2,3.8H6.5
      c-5.8,0-8.7-7-4.6-11.1L64.6,3.8z"
      fill="url(#gradient2)"
    />
    <path
      d="M333.1,120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8,0-8.7,7-4.6,11.1l62.7,62.7c2.4,2.4,5.7,3.8,9.2,3.8h317.4
      c5.8,0,8.7-7,4.6-11.1L333.1,120.1z"
      fill="url(#gradient3)"
    />
  </svg>
);

export default SolanaLogo;
