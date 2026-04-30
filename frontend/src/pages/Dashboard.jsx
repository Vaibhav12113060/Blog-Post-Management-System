import { useState, useEffect } from "react";
import { useBlogs } from "../hooks/useBlogs";
import API from "../api/axiosInstance";

import Header from "../components/Header";
import BlogTable from "../components/BlogTable";
import Pagination from "../components/Pagination";
import FilterBar from "../components/FilterBar";

const Dashboard = () => {
  const [currentUserId, setCurrentUserId] = useState(null);

  const [filters, setFilters] = useState({
    search: "",
    category: "All Categories",
    status: "All Status",
    page: 1,
  });

  const { blogs, loading, totalPages, totalRecords, refetch } =
    useBlogs(filters);

  const handleLogout = () => {
    if (window.confirm("Bhai, Logout karna hai?")) {
      localStorage.removeItem("token"); // Token clear kiya
      localStorage.removeItem("userId"); // User ID clear kiya
      navigate("/login"); // Login page par bhej diya
    }
  };

  useEffect(() => {
    const syncUser = async () => {
      try {
        const res = await API.get("/auth/me");
        const id =
          typeof res.data.user === "object" ? res.data.user._id : res.data.user;

        setCurrentUserId(String(id));
      } catch {
        setCurrentUserId(null);
      }
    };
    syncUser();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-3 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        <Header />
        <FilterBar filters={filters} setFilters={setFilters} />
        <BlogTable
          blogs={blogs}
          loading={loading}
          currentUserId={currentUserId}
          page={filters.page}
          refetch={refetch}
        />
        <Pagination
          page={filters.page}
          totalPages={totalPages}
          totalRecords={totalRecords}
          setFilters={setFilters}
        />
      </div>
    </div>
  );
};

export default Dashboard;
