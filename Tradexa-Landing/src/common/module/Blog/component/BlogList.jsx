import Image from "@/common/component/element/Image";
import React from "react";
import { BlogContent } from "@/common/constant/BlogContent";
import Link from "next/link";
import ComponentTransition from "@/common/component/element/ComponentTransition";
import Button from "@/common/component/element/Button";

const BlogList = () => {
  return (
    <div className="py-10 flex gap-10 justify-center flex-col md:flex-row md:flex-wrap">
      {BlogContent?.map((item, index) => (
        <ComponentTransition
          delay={index * 0.1}
          key={index}
          className="w-full  gap-5 group flex h-auto md:h-[400px] bg-neutral-100 dark:bg-neutral-950 border-[1px] border-neutral-300 dark:border-neutral-700 rounded-3xl"
        >
          <Link
            href={`/blog/${item.slug}`}
            className="w-full flex max-md:flex-col-reverse"
          >
            <div className="md:basis-[60%] w-full py-5 px-5 lg:px-10">
              <h1 className="text-2xl font-bold py-2 group-hover:underline transition-all duration-300 text-neutral-800 dark:text-neutral-100">
                {item.title}
              </h1>
              <p className="text-base text-neutral-700 dark:text-neutral-300 mt-5 max-xl:line-clamp-4 line-clamp-5">
                {item.desc}
              </p>
              <Button title="Lire la suite" className="mt-3 overflow-hidden" />
            </div>
            <div className="w-full  overflow-hidden border-[1px] border-neutral-300 dark:border-neutral-700 max-md:rounded-t-3xl lg:rounded-3xl">
              <Image
                src={item.img}
                alt="Header Image"
                width={400}
                height={400}
                loading="lazy"
                className="w-full object-cover sm:scale-150 xl:top-[-100px] scale-125 relative"
              />
            </div>
          </Link>
        </ComponentTransition>
      ))}
    </div>
  );
};

export default BlogList;
