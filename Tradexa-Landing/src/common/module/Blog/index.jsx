import SectionHeading from "@/common/component/element/SectionHeading";
import React from "react";
import { IoNewspaperOutline } from "react-icons/io5";
import BlogList from "./component/BlogList";
import ComponentTransition from "@/common/component/element/ComponentTransition";
import Link from "next/link";
import Buttons from "@/common/component/element/Buttons";
import Feedback from "../Feedback";
import Button from "@/common/component/element/Button";

const Blog = () => {
  return (
    <div className="h-auto max-w-[1500px]  px-10 xl:px-20 pb-20">
      <ComponentTransition className="flex justify-center py-5">
        <SectionHeading title="Actualités Trading" icon={<IoNewspaperOutline  size={30} />} />
      </ComponentTransition>
      <ComponentTransition delay={0.1} className="flex justify-center items-center flex-col">
        <h1 className="text-3xl md:text-5xl py-5 text-center bg-clip-text dark:bg-gradient-to-r from-white from-50% to-[#8f8f8f] bg-text md:w-[50%] text-transparent font-bold">
          Blog & Analyses
        </h1>
        <p className="text-base md:text-2xl text-neutral-500 dark:text-neutral-300 md:w-[50%] text-center">
          Analyses de marché, stratégies de trading et actualités
          du monde de la finance et des crypto-monnaies.
        </p>
      </ComponentTransition>
      <BlogList />
      <ComponentTransition className="w-full md:flex-row flex-col items-center flex justify-center gap-3">
        <Link href='/blog' className="w-full rounded-full">
        <Button
          title="Voir tous les articles"
          className="hover:!bg-neutral-950 hover:dark:!bg-neutral-100 transition-colors !rounded-full duration-300 overflow-hidden !bg-transparent outline outline-1 dark:outline-white outline-neutral-950 dark:!text-white !text-black w-full py-5"
          />
        </Link>
      </ComponentTransition>
    </div>
  );
};

export default Blog;
