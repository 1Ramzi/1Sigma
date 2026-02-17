'use client'
import clsx from "clsx";
import React from "react";

const Button = ({title= '', className= ''}) => {
  const handleMouseMove = (e) => {
    const x = e.pageX - e.target.offsetLeft;
    const y = e.pageY - e.target.offsetTop;

    e.target.style.setProperty("--x", x + "px");
    e.target.style.setProperty("--y", y + "px");
  };

  return (
    <button
      className={clsx(className,`btn relative group inline-flex items-center justify-center md:px-8 px-5 py-1 md:py-3 bg-neutral-900 text-white text-base  tracking-wide rounded-md `)}
      onMouseMove={handleMouseMove}
    >
      <span className=" z-10 group-hover:text-neutral-900 transition-all duration-300 ">
        {title}
      </span>
    </button>
  );
};

export default Button;


