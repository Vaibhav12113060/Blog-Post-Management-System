const Logo = ({ size = "text-2xl md:text-3xl" }) => {
  return (
    <div className="text-center md:text-left select-none">
      <h1
        className={`${size} font-black text-slate-900 tracking-tighter uppercase leading-none`}
      >
        VaiBlog<span className="text-indigo-600">.</span>
      </h1>
      <div className="mt-1 flex items-center justify-center md:justify-start gap-2">
        <span className="h-[2px] w-4 bg-indigo-600 rounded-full"></span>
        <p className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-[0.2em]">
          Content Manager
        </p>
      </div>
    </div>
  );
};

export default Logo;
