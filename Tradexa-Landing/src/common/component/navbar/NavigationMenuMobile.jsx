import React from "react";
import { motion } from "framer-motion";
import { NavigationItem } from "@/common/constant/NavigationItem";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Links } from "./NavLink";

const Anim = {
  open: (height = 1000) => ({
    height: "800px",
    zIndex: 99,
    transition: {
      duration: 1,
      type: "spring",
    },
  }),
  closed: {
    height: "0px",
    zIndex: 0,
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const NavigationMenuMobile = ({ open, close }) => {
  const Child = {
    Isopen: {
      opacity: 1,
      height: "100%",
    },
    closed: {
      opacity: 0,
      height: "0px",
    },
  };
  const pathname = usePathname();
  return (
    <div>
      <motion.div
        className="right-0 w-full  lg:px-10 px-5 top-0 absolute flex h-screen bg-neutral-900"
        initial={false}
        variants={Anim}
        animate={open ? "open" : "closed"}
      >
        <div className="mt-20 w-full">
          <div className=" gap-14 w-full lg:px-10 overflow-hidden">
            {NavigationItem.map((item, index) => (
              <motion.div
                key={index}
                className="h-auto w-full"
                initial={false}
                animate={open ? "Isopen" : "closed"}
                variants={Child}
                transition={{
                  type: "spring",
                  duration: 0.5,
                  delay: index * 0.1,
                }}
              >
                <Link href={item.src} onClick={close}>
                  <Links
                    pathname={pathname}
                    heading={item.title}
                    imgSrc={item.img}
                    href={item.src}
                    className="group hover:scale-105 w-full relative"
                  ></Links>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NavigationMenuMobile;
