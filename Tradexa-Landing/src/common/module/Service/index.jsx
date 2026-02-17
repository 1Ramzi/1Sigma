"use client";
import SectionHeading from "@/common/component/element/SectionHeading";
import React from "react";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import Card from "./component/Card";
import { motion } from "framer-motion";
import { translateInViewVariant } from "@/common/component/element/Transition";
import Buttons from "@/common/component/element/Buttons";
import Link from "next/link";
import ComponentTransition from "@/common/component/element/ComponentTransition";
import Button from "@/common/component/element/Button";

const Service = () => {
  return (
    <div className="h-auto max-w-[1500px]  px-10 xl:px-20 pb-20">
      <div>
      <motion.div
        className="flex justify-center py-5"
        initial="initial"
        whileInView="whileInview"
        variants={translateInViewVariant}
        transition={{
            ease: [0.2, 0.65, 0.3, 0.9],
            duration: 1.5,
        }}
        viewport={{once: true}}
      >
        <SectionHeading
          title="Nos Services"
          icon={<MdOutlineMiscellaneousServices size={30} />}
        />
      </motion.div>
      <motion.div
        className="flex justify-center items-center flex-col"
        initial="initial"
        whileInView="whileInview"
        variants={translateInViewVariant}
        transition={{
          delay: 0.20,
            ease: [0.2, 0.65, 0.3, 0.9],
            duration: 1.5,
        }}
        viewport={{once: true}}
      >
        <h1 className="text-3xl md:text-5xl py-5 text-center dark:bg-gradient-to-r from-white from-50% to-[#8f8f8f] bg-text bg-clip-text  md:w-[50%] text-transparent font-bold">
          Des outils de trading conçus pour votre réussite
        </h1>
        <p className="text-base md:text-2xl text-neutral-500 dark:text-neutral-300">
          Crypto / Forex / Indices / Matières premières
        </p>
      </motion.div>
      </div>
      <Card />
      <ComponentTransition className="w-full md:flex-row flex-col items-center flex justify-center gap-3">
        <Link href='/services' className="w-full rounded-full">
        <Button
          title="Voir tous les services"
          className="hover:!bg-neutral-950 hover:dark:!bg-neutral-100 transition-colors !rounded-full duration-300 overflow-hidden !bg-transparent outline outline-1 dark:outline-white outline-neutral-950 dark:!text-white !text-black w-full py-5"
          />
        </Link>
      </ComponentTransition>
    </div>
  );
};

export default Service;
