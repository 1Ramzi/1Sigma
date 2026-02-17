import clsx from "clsx";
import React from "react";

const ContactForm = () => {
  return (
    <form>
      <div className="flex flex-col flex-grow gap-5">
        <div className="flex flex-col md:flex-row gap-5">
          <input
            className="w-full py-2 px-3 dark:bg-neutral-900 bg-neutral-200 rounded-md border border-neutral-200 focus:outline-none dark:border-neutral-800"
            type="text"
            placeholder="Name"
            name="name"
            required
          />
          <input
            className="w-full py-2 px-3 rounded-md border dark:bg-neutral-900 bg-neutral-200 border-neutral-200 dark:border-neutral-700 focus:outline-none"
            type="email"
            placeholder="Email"
            name="email"
            required
          />
        </div>
        <textarea
          className="w-full py-2 px-3 rounded-md border dark:bg-neutral-900 bg-neutral-200 border-neutral-200 focus:outline-none dark:border-neutral-700"
          rows={5}
          placeholder="Message"
          name="message"
          required
        />
        <button
          className={clsx(
            "py-2.5 bg-neutral-900 text-neutral-300 dark:bg-neutral-50 dark:text-neutral-950 flex justify-center hover:dark:bg-neutral-50 hover:bg-neutral-900 hover:scale-[101%] duration-300 transition-all"
          )}
          type="submit"
        >
          Send The Message
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
