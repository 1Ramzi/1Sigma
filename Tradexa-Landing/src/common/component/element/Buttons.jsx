

const Buttons = ({className= '',title= ''}) => {
  return (
    <button className={`${className}dark:bg-neutral-100 bg-neutral-950 transition-all duration-1000 hover:delay-75 hover:bg-neutral-950 group px-6 py-2 overflow-hidden relative rounded-full`}>
      <h1 className="dark:text-black text-white font-semibold transition-all duration-500 group-hover:translate-y-[-150%]">
        {title}
      </h1>
      <h1 className="dark:text-black text-white font-semibold group-hover:text-black group-hover:dark:text-white z-[99] transition-all duration-500 absolute translate-y-[10%] group-hover:translate-y-[-100%]">
        {title}
      </h1>
      <div className="w-[20%] rounded-full transition-all duration-500 dark:bg-neutral-950 bg-neutral-300     absolute h-[30px] inset-0 translate-y-[140%] group-hover:translate-y-[-50%]"></div>
      <div className="w-[30%] rounded-full transition-all duration-500 dark:bg-neutral-950 bg-neutral-300   left-[30px] absolute h-[30px]  inset-0 translate-y-[140%] group-hover:translate-y-[-50%]"></div>
      <div className="w-[30%] rounded-full transition-all duration-500 dark:bg-neutral-950 bg-neutral-300   left-[80px] absolute h-[30px] inset-0 translate-y-[140%] group-hover:translate-y-[-50%]"></div>
      <div className="w-[160%] top-[-10px] h-[50px] left-[-5px] dark:bg-neutral-950 bg-neutral-300  rounded-3xl transition-all duration-500 absolute  group-hover:translate-y-[0%] translate-y-[150%]"></div>
    </button>
  );
};

export default Buttons;
