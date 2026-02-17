  
  const Breakline = ({ className = '', ...others }) => {
    return (
      <div
        className={`border-t dark:border-neutral-700 border-gray-300 my-4 ${className}`}
        data-testid='breakline'
        {...others}
      ></div>
    );
  };
  
  export default Breakline;
  