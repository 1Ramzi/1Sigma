"use client";
import clsx from "clsx";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import { Services } from "@/common/constant/Service";
import ComponentTransition from "@/common/component/element/ComponentTransition";

export default function FaqAccordian() {
    const [openStates, setOpenStates] = useState(Array(Services.length).fill(false));

    const handleClick = (index) => {
      setOpenStates((prevOpenStates) => {
        const newOpenStates = [...prevOpenStates];
        newOpenStates[index] = !newOpenStates[index];
        return newOpenStates;
      });
    };

  return (
    <ComponentTransition className="flex  rounded-3xl pb-20 justify-center mt-10 items-center flex-col">
    {Services.map((item, index) => (
      <div key={index} className="flex  justify-center items-center flex-col mt-10 relative  border-b-[1px] border-neutral-400 pb-5">
        <button onClick={() => handleClick(index)} className="w-full">
          <div className={clsx("flex group h-auto  items-center gap-5", { 'cursor-pointer': !openStates[index] })}>
            <h1 className="text-xl text-start font-semibold">{item.title}</h1>
            <div className="absolute right-0">
              <GoPlus
                size={50}
                className={`${openStates[index] ? 'rotate-45' : 'rotate-0'} text-neutral-500 max-md:hidden transition-all duration-300`}
              />
            </div>
          </div>
          <motion.div
            className="overflow-hidden"
            initial={{ height: 0 }}
            animate={{ height: openStates[index] ? 'auto' : '0px' }}
          >
            <h1 className="text-start mt-5">{item.desc}</h1>
          </motion.div>
        </button>
      </div>
    ))}
  </ComponentTransition>
  );
}
