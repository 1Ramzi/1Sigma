import React from "react";
import ComponentTransition from "./ComponentTransition";
import { FaCheck } from "react-icons/fa";
import Buttons from "./Buttons";
import { PricingItem } from "@/common/constant/PricingItem";
import clsx from "clsx";
import { ButtonSpot } from "./ButtonSpot";

export default function PricingCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 py-10 xl:grid-cols-3 gap-5 w-full place-content-center place-items-center">
      {PricingItem.map((item, index) => (
        <ComponentTransition
          delay={index * 0.1}
          key={index}
          className={clsx(
            ` w-full  p-10 grid gap-10 border-[1px] rounded-3xl border-black dark:border-white`
          )}
        >
          <div className="items-center space-y-0 gap-4 p-0">
            <div className="grid gap-1 text-center">
              <h1 className="text-lg lg:text-2xl font-bold">{item.plan}</h1>
              <p className="text-xs">{item.desc}</p>
            </div>
          </div>
          <div className="p-0 grid gap-4">
            <div className="flex items-center justify-center ">
              <h1 className="text-4xl font-bold text-black dark:text-white">
              {item.price} 
              <span className="text-neutral-400 dark:text-neutral-600">
              {item.payTime}
              </span>
              </h1>
            </div>
            <div className="text-sm text-center text-gray-500 dark:text-gray-400">
              
            </div>
            <ul className="grid gap-2 py-4">
              <li>
                <FaCheck className="mr-2 inline-block h-4 w-4" />
                {item.benefit[1]}
              </li>
              <li>
                <FaCheck className="mr-2 inline-block h-4 w-4" />
                {item.benefit[2]}
              </li>
              <li>
                <FaCheck className="mr-2 inline-block h-4 w-4" />
                {item.benefit[3]}
              </li>
            </ul>
          </div>
          <div className="w-full flex justify-center items-center">
            <ButtonSpot className="w-full" title="Choose Plan" />
          </div>
        </ComponentTransition>
      ))}
    </div>
  );
}
