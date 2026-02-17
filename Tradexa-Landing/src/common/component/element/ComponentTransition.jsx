'use client'
import React from "react";
import { translateInViewVariant } from "./Transition";
import { motion } from "framer-motion";

const ComponentTransition = ({ children,className, delay }) => {
  return (
    <motion.div
      initial="initial"
      whileInView="whileInview"
      variants={translateInViewVariant}
      transition={{
        delay: delay,
        ease: [0.2, 0.65, 0.3, 0.9],
        duration: 1.5,
      }}
      className={className}
      viewport={{once: true}}
    >
      {children}
    </motion.div>
  );
};

export default ComponentTransition;
