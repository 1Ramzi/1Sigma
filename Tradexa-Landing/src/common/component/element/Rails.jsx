import React from "react";

const Rails = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="patternId"
      width="100%"
      height="100%"
    >
      <defs>
        <pattern
          id="a"
          patternUnits="userSpaceOnUse"
          width="20"
          height="20"
          patternTransform="scale(3) rotate(0)"
        >
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="hsla(0, 0%, 100%, 0)"
          />
          <path
            d="M 10,-2.55e-7 V 20 Z M -1.1677362e-8,10 H 20 Z"
            strokeWidth="0.5"
            className="stroke-[#0000007a] dark:stroke-[#ffffff6e]"
            fill="none"
          />
        </pattern>
      </defs>
      <rect
        width="800%"
        height="800%"
        transform="translate(0,0)"
        fill="url(#a)"
      />
    </svg>
  );
};

export default Rails;
