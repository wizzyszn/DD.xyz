import React from "react";

interface EthereumLogoProps {
  color?: string;
  size?: number | string;
}

const EthereumLogo: React.FC<EthereumLogoProps> = ({
  color = "rgb(30, 48, 80)", // default dark blue
  size = "100%",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 784.37 1277.39"
    fill="none"
  >
    <g>
      <polygon
        fill={color}
        points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"
      />
      <polygon
        fill={color}
        points="392.07,0 0,650.54 392.07,882.29 392.07,472.33"
      />
      <polygon
        fill={color}
        points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"
      />
      <polygon fill={color} points="392.07,1277.38 392.07,956.52 0,724.89" />
      <polygon
        fill={color}
        points="392.07,882.29 784.13,650.54 392.07,472.33"
      />
      <polygon fill={color} points="0,650.54 392.07,882.29 392.07,472.33" />
    </g>
  </svg>
);

export default EthereumLogo;
