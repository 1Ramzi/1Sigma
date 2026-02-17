"use client";
import React from "react";
import { BlogContent } from "@/common/constant/BlogContent";
import { usePathname } from "next/navigation";
import Image from "@/common/component/element/Image";
import Rails from "@/common/component/element/Rails";

const BlogDetail = () => {
  const pathname = usePathname();
  const blog = BlogContent.find((item) => `/blog/${item.slug}` === pathname);
  return (
    <div className="h-auto max-w-[1500px] flex flex-col items-center justify-center mt-20 max-md:px-5 px-10 xl:px-20 pb-10 overflow-hidden">
      <div className="flex justify-center mt-20 relative">
        <h1 className="text-[4.5rem] py-5 leading-[60px] bg-clip-text dark:bg-gradient-to-r from-white from-50% to-black bg-text  w-[70%] text-transparent font-bold">
          {blog.bigTitle}
        </h1>
        <div className=" absolute w-[170%]  h-[250px] z-[-99] top-[-70px]">
          <Rails/>
          <div className="bg-gradient-to-b from-white dark:from-black from-20% to-transparent absolute inset-0 "></div>
          <div className="bg-gradient-to-l from-white dark:from-black from-1% to-transparent to-30% absolute inset-0"></div>
          <div className="bg-gradient-to-r from-white dark:from-black from-1% to-transparent to-30% absolute inset-0"></div>
          <div className="bg-gradient-to-t from-white dark:from-black from-1% to-transparent to-30% absolute inset-0"></div>
        </div>
      </div>
      <div className="flex mt-32  w-full justify-center items-center flex-col">
      <Image 
      src={blog.img}
      alt={blog.bigTitle}
      width={400}
      height={400}
      priority
      className="md:h-[600px] w-full rounded-3xl"
      />
      </div>
      <div className="py-10 px-10 max-md:px-5 md:px-32 text-justify">
      <h1>
        {blog.desc}
      </h1>
      <div>
        {blog.content}
      </div>
      </div>
    </div>
  );
};

export default BlogDetail;
