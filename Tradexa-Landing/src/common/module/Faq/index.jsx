import SectionHeading from "@/common/component/element/SectionHeading";
import React from "react";
import { SiKnowledgebase } from "react-icons/si";
import CardFaq from "./component/CardFaq";
import ComponentTransition from "@/common/component/element/ComponentTransition";

const Faq = () => {
  return (
    <div className="h-auto max-w-[1500px]  px-10 xl:px-20 pb-20">
      <ComponentTransition className="flex justify-center py-5">
        <SectionHeading
          title="FAQ"
          icon={<SiKnowledgebase size={30} />}
        />
      </ComponentTransition>
      <ComponentTransition delay={0.1} className="flex justify-center items-center flex-col">
        <h1 className="text-3xl md:text-5xl py-5 text-center bg-clip-text dark:bg-gradient-to-r from-white from-50% to-[#8f8f8f] bg-text md:w-[50%] text-transparent font-bold">
          Questions Fréquentes
        </h1>
        <p className="text-base md:text-2xl text-neutral-500 dark:text-neutral-300 md:w-[50%] text-center">
          Tout ce que vous devez savoir sur Tradexa et nos signaux de trading.
        </p>
      </ComponentTransition>
      <CardFaq />
    </div>
  );
};

export default Faq;
