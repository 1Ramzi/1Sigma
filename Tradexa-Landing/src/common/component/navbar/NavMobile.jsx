"use client";
import clsx from "clsx";
import NavigationMenuMobile from "./NavigationMenuMobile";

const NavMobile = ({ open, handleOpen, close }) => {
  return (
    <div>
      <label className={`hamburger relative z-[999] ${open ? "open" : ""}`}>
        <input
          type="checkbox"
          className="inputToogle"
          checked={open}
          onChange={handleOpen}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="19"
          viewBox="0 0 150 19"
          fill="none"
        >
          <line y1="1.5" x2="150" y2="1.5" className={clsx(open ? '!stroke-white  rotate-6' : '', `stroke-black dark:stroke-white transition-all duration-300  `)} strokeWidth="3" />
          <line y1="9.5" x2="150" y2="9.5" className={clsx(open ? 'stroke-white' : '', `stroke-black dark:stroke-white transition-all duration-300 `)} strokeWidth="3" />
          <line y1="17.5" x2="150" y2="17.5" className={clsx(open ? '!stroke-white -rotate-6' : '', `stroke-black dark:stroke-white transition-all duration-300 `)} strokeWidth="3" />
        </svg>
      </label>
      <NavigationMenuMobile open={open} close={close} />
    </div>
  );
};

export default NavMobile;
