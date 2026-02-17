import React from "react";
import Image from "../element/Image";

export default function Logo() {
  return (
    <>
      <Image
        className="w-[50%] left-[-10%] top-[-23%] absolute h-auto object-cover  rounded-3xl"
        src="/Finger.svg"
        alt="Image"
        width={400}
        height={400}
        priority
      />
    </>
  );
}
