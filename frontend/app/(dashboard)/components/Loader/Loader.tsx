// Assuming you've added the animations to tailwind.config.js

const Loader = () => {
  return (
    <div className="flex flex-row gap-2 h-full justify-center items-center">
      <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
      <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
      <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
    </div>
  );
};

export default Loader;
