import blog from "../assets/blog.png";

const Logo = ({
  size = "text-2xl md:text-3xl",
  iconSize = "w-8 h-8 md:w-10 md:h-10",
}) => {
  return (
    <div className="flex items-center gap-3 select-none group">
      {/* ✅ V + Docs Icon (Minimalist Version) */}
      <div
        className={`${iconSize} flex-shrink-0 transition-transform group-hover:scale-110`}
      >
        <img
          src={blog}
          alt="VaiBlog Icon"
          className="w-full h-full object-contain"
        />
      </div>

      {/* ✅ Clean Text Branding (No Italic) */}
      <div className="flex flex-col">
        <h1
          className={`${size} font-black text-slate-900 tracking-tighter uppercase leading-none`}
        >
          VaiBlog<span className="text-indigo-600">.</span>
        </h1>
        <div className="mt-1 flex items-center gap-2">
          <span className="h-[2px] w-4 bg-indigo-600 rounded-full"></span>
          <p className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-[0.2em]">
            Content Manager
          </p>
        </div>
      </div>
    </div>
  );
};

export default Logo;
