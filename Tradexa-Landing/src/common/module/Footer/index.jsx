import React from "react";
import { FooterItem } from "@/common/constant/FooterItem";
import { FaMedium } from "react-icons/fa6";
import { FaTwitter, FaLinkedin, FaDiscord } from "react-icons/fa";
import Link from "next/link";
import ComponentTransition from "@/common/component/element/ComponentTransition";
import TextAnimated from "../Faq/component/TextAnimated";

const Footer = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-4 py-10 px-8 h-auto w-full max-w-[1500px] place-content-center md:px-5 place-items-start md:place-items-center">
        {FooterItem?.map((item, index) => (
          <ComponentTransition
            delay={index * 0.1}
            className="flex flex-col"
            key={index}
          >
            <h1 className="text-2xl font-bold py-3 px-2 md:px-2">
              {item.title}
            </h1>
            <div className="md:px-2 md:py-2 px-2 py-[4px] flex">
              <Link href={item.child_1.href} className="">
                <TextAnimated
                  className=" text-base overflow-hidden text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 hover:dark:text-neutral-800"
                  delay={index * 0.2}
                >
                  {item.child_1.title}
                </TextAnimated>
              </Link>
            </div>
            <div className="md:px-2 md:py-2 px-2 py-[4px] flex">
              <Link href={item.child_2.href} className="">
                <TextAnimated
                  className=" text-base overflow-hidden text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 hover:dark:text-neutral-800"
                  delay={1}
                >
                  {item.child_2.title}
                </TextAnimated>
              </Link>
            </div>
            <div className="md:px-2 md:py-2 px-2 py-[4px] flex">
              <Link href={item.child_3.href} className="">
                <TextAnimated
                  delay={1}
                  className=" text-base overflow-hidden text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 hover:dark:text-neutral-800"
                >
                  {item.child_3.title}
                </TextAnimated>
              </Link>
            </div>
          </ComponentTransition>
        ))}
      </div>
      <div className="flex justify-center py-20 items-center flex-col ">
        <div className="gap-5 flex py-5 justify-center items-center w-full">
          <FaMedium size={30} />
          <FaTwitter size={30} />
          <FaLinkedin size={30} />
          <FaDiscord size={30} />
        </div>
        <div className="flex flex-col">
          <h1 className="text-sm">© 2026 Tradexa. Tous droits réservés.</h1>
          <h1 className="text-sm">
            Plateforme de signaux de trading propulsée par l&apos;IA.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Footer;
