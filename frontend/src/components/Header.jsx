import { useNavigate } from "react-router-dom";
import API from "../api/axiosInstance";
import Logo from "./Logo"; // ✅ Logo Import kiya

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const handleExportCSV = async () => {
    try {
      const response = await API.get("/blog/export-csv", {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `VaiBlog_Export_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert("Export failed!");
    }
  };

  return (
    <div className="bg-white rounded-[1.5rem] border border-slate-200 p-6 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm">
      {/* ✅ Reusable Logo Component */}
      <Logo />

      <div className="flex flex-wrap md:flex-nowrap items-center gap-3 w-full md:w-auto justify-center">
        <button
          onClick={handleExportCSV}
          className="flex-1 md:flex-none px-5 py-2.5 text-[11px] font-black text-slate-600 bg-slate-50 border border-slate-200 hover:border-emerald-500 hover:text-emerald-600 rounded-xl transition-all active:scale-95 uppercase tracking-widest"
        >
          Export CSV
        </button>

        <button
          onClick={handleLogout}
          className="flex-1 md:flex-none px-5 py-2.5 text-[11px] font-black text-red-500 bg-white border border-red-100 hover:bg-red-50 rounded-xl transition-all active:scale-95 uppercase tracking-widest"
        >
          Logout
        </button>

        <button
          onClick={() => navigate("/create-post")}
          className="flex-1 md:flex-none bg-slate-900 text-white px-7 py-2.5 rounded-xl font-black hover:bg-indigo-600 shadow-lg shadow-slate-200 transition-all active:scale-95 text-[11px] uppercase tracking-widest"
        >
          + New Post
        </button>
      </div>
    </div>
  );
};

export default Header;
