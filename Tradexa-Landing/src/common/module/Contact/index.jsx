import Rails from "@/common/component/element/Rails";
import React from "react";
import CardContact from "./component/CardContact";
import ComponentTransition from "@/common/component/element/ComponentTransition";

const Contactus = () => {
  return (
    <ComponentTransition className="h-auto max-w-[1500px] w-full px-10 xl:px-20 pb-20">
      <div className="flex justify-center items-center py-5">
        <div className="flex w-[80%] justify-center mt-20 relative overflow-hidden">
          <h1 className="text-4xl w-full md:text-7xl py-5 px-10 text-center dark:bg-gradient-to-r from-white from-50% to-black bg-text bg-clip-text  text-transparent font-bold">
            Contact Us
          </h1>
          <div className=" absolute w-[150%] md:w-[210%]  h-[250px] z-[-99] top-[-70px]">
            <Rails />
            <div className="bg-gradient-to-b from-white dark:from-black from-20% to-transparent absolute inset-0 "></div>
            <div className="bg-gradient-to-l from-white dark:from-black from-1% to-transparent to-30% absolute inset-0"></div>
            <div className="bg-gradient-to-r from-white dark:from-black from-1% to-transparent to-30% absolute inset-0"></div>
            <div className="bg-gradient-to-t from-white dark:from-black from-1% to-transparent to-30% absolute inset-0"></div>
          </div>
        </div>
      </div>

    <CardContact />
    </ComponentTransition>
  );
};

export default Contactus;
