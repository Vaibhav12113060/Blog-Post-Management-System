import { useState } from "react";
import { useBlogs } from "../hooks/useBlogs";
import { useAuth } from "../context/AuthContext";

import Header from "../components/Header";
import BlogTable from "../components/BlogTable";
import Pagination from "../components/Pagination";
import FilterBar from "../components/FilterBar";

const Dashboard = () => {
  const [filters, setFilters] = useState({
    search: "",
    category: "All Categories",
    status: "All Status",
    page: 1,
  });

  // Use the global auth state and logout function
  const { user, logout } = useAuth();

  const { blogs, loading, totalPages, totalRecords, refetch } =
    useBlogs(filters);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-3 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        <Header user={user} handleLogout={logout} />
        <FilterBar filters={filters} setFilters={setFilters} />
        <BlogTable
          blogs={blogs}
          loading={loading}
          currentUserId={user?._id}
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
