import Image from "@/common/component/element/Image";
import React from "react";
import { CardItem } from "@/common/constant/CardItem";
import ComponentTransition from "@/common/component/element/ComponentTransition";

const CardSolution = () => {
  return (
    <div className="py-10 flex gap-10 flex-row justify-center relative flex-wrap">
      <div className="absolute  z-[-9] glowbg w-[100%] md:w-[600px] h-[400px] top-[50px]"></div>
      {CardItem?.map((item, index) => (
        <ComponentTransition
          className="w-full h-[350px] group md:basis-[48%] overflow-hidden bg-neutral-50 dark:bg-[#0a0a0a] border-[1px] dark:border-neutral-700 border-neutral-300 rounded-3xl"
          key={index}
          delay={index * 0.1}
        >
          <div className="w-full h-[190px] overflow-hidden">
          <Image
            src={item.img}
            alt="Header Image"
            width={400}
            height={400}
            loading="lazy"
            className="w-full h-auto group-hover:scale-125 transition-all duration-300  object-cover scale-110"
          />
          </div>

          <div className="px-5 py-5">
            <h1 className="text-xl font-bold py-2 text-neutral-800 dark:text-neutral-100">
              {item.title}
            </h1>
            <p className="text-sm text-neutral-700 line-clamp-2 dark:text-neutral-300">
              {item.content}
            </p>
          </div>
        </ComponentTransition>
      ))}
    </div>
  );
};

export default CardSolution;
