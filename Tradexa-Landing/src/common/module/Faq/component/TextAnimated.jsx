'use client'
import { motion } from "framer-motion";
import React from "react";

const TextAnimated = ({ children, delay, className }) => {
  return (
    <motion.h1
      className={className}
      initial={{ y: 20, height: "0px" }}
      whileInView={{
        y: 0,
        height: "30px",
        transition: { delay: delay, duration: 1.2 },
      }}
      viewport={{once: true}}
    >
      {children}
    </motion.h1>
  );
};

export default TextAnimated;
