"use client";
import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "@/common/component/element/Image";
import { useMobile } from "@/common/hooks/useMobile";

const ImgScale = () => {
  const isMobile = useMobile();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [1.2, 1.6]);
  const scale = useSpring(y, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
    duration: 3,
  });

  return (
    <motion.div
      style={{
        scale: !isMobile ? scale : 1,
      }}
      className="overflow-hidden "
    >
      <Image
        width={400}
        height={400}
        src="/fabric.webp"
        alt="Image"
        priority
        className="h-auto w-[500px]"

      />
    </motion.div>
  );
};

export default ImgScale;
