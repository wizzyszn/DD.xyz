import React from "react";

interface BinanceLogoProps {
  size?: number | string;
  backgroundColor?: string;
  foregroundColor?: string;
}

const BinanceLogo: React.FC<BinanceLogoProps> = ({
  size = "100%",
  backgroundColor = "#F0B90B",
  foregroundColor = "#FFFFFF",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 2496 2496"
    width={size}
    height={size}
    fill="none"
  >
    <circle cx="1248" cy="1248" r="1248" fill={backgroundColor} />
    <path
      fill={foregroundColor}
      d="M685.9 1248l.9 330 280.4 165v193.2l-444.5-260.7v-524l163.2 96.5zm0-330v192.3l-163.3-96.6V821.4l163.3-96.6 164.1 96.6-164.1 96.6zm398.4-96.6l163.3-96.6 164.1 96.6-163.8 96.6-163.6-96.6zm-280.4 688.2v-193.2l163.3 96.6v192.3l-163.3-95.7zm280.4 302.6l163.3 96.6 164.1-96.6v192.3l-164.1 96.6-163.3-96.6v-192.3zm561.6-990.8l163.3-96.6 164.1 96.6v192.3l-164.1 96.6V918l-163.3-96.6zm163.3 756.6.9-330 163.3-96.6v524l-444.5 260.7v-193.2l280.3-165zm-117.1-68.4l-163.3 95.7v-192.3l163.3-96.6v193.2zm0-523.2l.9 193.2-281.2 165v330.8l-163.3 95.7-163.3-95.7v-330.8l-281.2-165V986.4l164.1-96.6 279.5 165.8 281.2-165.8 164.1 96.6h-.1zM803.9 656.5l443.7-261.6 444.5 261.6-163.3 96.6-281.2-165.8-280.4 165.8-163.3-96.6z"
    />
  </svg>
);

export default BinanceLogo;
