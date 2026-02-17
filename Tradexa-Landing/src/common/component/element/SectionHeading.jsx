import React from "react";

const SectionHeading = ({
  title,
  icon,
  className,
}) => {
  return (
    <div
      className={`flex items-center gap-3 text-2xl font-medium py-1 px-5 rounded-full text-neutral-800 dark:text-neutral-300 border-[1px] border-neutral-900 dark:border-neutral-700 ${className}`}
    >
      <h2 className='capitalize'>{title}</h2>
      {icon && <>{icon}</>}
    </div>
  );
};

export default SectionHeading;
