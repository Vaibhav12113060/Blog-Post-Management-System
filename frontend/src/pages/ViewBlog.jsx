import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axiosInstance";
import Logo from "../components/Logo"; // ✅ Added Logo

const ViewBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/blog/${id}`).then(({ data }) => setBlog(data.data));
  }, [id]);

  if (!blog)
    return (
      <div className="h-screen bg-[#CBD5E1] flex items-center justify-center font-bold text-slate-500 animate-pulse tracking-tighter">
        LOADING ARTICLE...
      </div>
    );

  return (
    <div className="h-screen bg-[#CBD5E1] flex flex-col items-center justify-center p-2 md:p-10 overflow-hidden font-sans text-slate-900">
      <div className="w-full max-w-7xl h-[95vh] md:h-[90vh] flex flex-col gap-4">
        {/* PORTION 1: HEADER WITH LOGO & BACK BUTTON */}
        <div className="flex justify-between items-center shrink-0 px-2">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-700 hover:text-emerald-900 font-bold text-[10px] md:text-xs bg-white/60 px-5 py-2 rounded-xl backdrop-blur-md border border-slate-300 shadow-sm transition-all"
          >
            ← Back
          </button>
          <Logo size="text-xl md:text-2xl" />
        </div>

        <article className="flex-1 flex flex-col md:flex-row overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] border border-slate-300 bg-white">
          {/* Rest of the component remains the same... */}
          {blog.thumbnail && (
            <div className="w-full md:w-[45%] h-48 md:h-full bg-black shrink-0 overflow-hidden">
              <img
                src={blog.thumbnail}
                className="w-full h-full object-cover opacity-90 shadow-inner"
                alt="thumbnail"
              />
            </div>
          )}

          <div className="flex-1 h-full bg-gradient-to-br from-[#064e3b] via-[#022c22] to-[#082f49] flex flex-col overflow-hidden">
            <div className="p-6 md:p-12 pb-6 shrink-0 border-b border-white/5 bg-black/10 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <span className="bg-emerald-400 text-emerald-950 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-[0.15em]">
                  {blog.category}
                </span>
                <div className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl backdrop-blur-md shadow-inner text-emerald-400">
                  <p className="font-bold text-[9px] md:text-[10px] uppercase tracking-widest">
                    {new Date(blog.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <h1 className="text-xl md:text-4xl font-black text-white leading-tight mb-4 md:mb-6 tracking-tight">
                {blog.title}
              </h1>
              <div className="flex items-center gap-3 p-2.5 md:p-3 bg-white/5 rounded-2xl border border-white/5 w-fit">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center font-black text-sm md:text-lg">
                  {blog.authorName?.charAt(0)}
                </div>
                <div className="pr-2">
                  <p className="font-bold text-white text-xs md:text-sm leading-none mb-1">
                    {blog.authorName}
                  </p>
                  <p className="text-emerald-400/50 text-[8px] md:text-[10px] font-black uppercase tracking-wider">
                    {blog.authorEmail}
                  </p>
                </div>
              </div>
            </div>

            <div
              className="flex-1 overflow-y-auto p-6 md:p-12 pt-6 scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <style>{`div::-webkit-scrollbar { display: none; }`}</style>
              {blog.shortDescription && (
                <div className="relative mb-6 md:mb-8 pl-5 border-l-2 border-emerald-400">
                  <p className="text-sm md:text-[16px] font-bold text-emerald-100 italic leading-relaxed">
                    {blog.shortDescription}
                  </p>
                </div>
              )}
              <div className="text-slate-400 leading-[1.6] md:leading-[1.8] text-sm md:text-[15px] space-y-5 mb-12 font-normal tracking-wide text-justify">
                {blog.content}
              </div>
              {blog.tags && blog.tags.length > 0 && (
                <div className="pt-8 border-t border-emerald-800/50 flex flex-wrap gap-2 pb-10">
                  {blog.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-emerald-950/30 text-emerald-400/60 border border-emerald-800/50 rounded-lg text-[9px] md:text-[10px] font-bold uppercase tracking-widest"
                    >
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default ViewBlog;
