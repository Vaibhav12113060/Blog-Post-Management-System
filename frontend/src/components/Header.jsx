import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 flex flex-col md:flex-row justify-between items-center gap-5 shadow-sm">
      <div className="text-center md:text-left">
        <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight italic uppercase">
          BlogFlow Manager
        </h1>
        <p className="text-xs md:text-sm text-slate-500 font-medium">
          Manage your posts professionally
        </p>
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto justify-center">
        <button
          onClick={handleLogout}
          className="flex-1 md:flex-none px-5 py-2 text-xs md:text-sm font-bold text-red-600 bg-white border border-red-200 hover:border-red-500 hover:bg-red-50 rounded-xl transition-all active:scale-95 shadow-sm"
        >
          Logout
        </button>

        <button
          onClick={() => navigate("/create-post")}
          className="flex-1 md:flex-none bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 shadow-md transition-all active:scale-95 text-xs md:text-sm uppercase tracking-tight"
        >
          + Add Post
        </button>
      </div>
    </div>
  );
};

export default Header;
