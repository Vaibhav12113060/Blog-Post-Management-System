import { useState, useEffect, useCallback } from "react";
import API from "../api/axiosInstance";

export const useBlogs = (filters) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);

      const catParam =
        filters.category === "All Categories" ? "" : filters.category;

      const statParam = filters.status === "All Status" ? "" : filters.status;

      const { data } = await API.get(`/blog`, {
        params: {
          search: filters.search,
          category: catParam,
          status: statParam,
          page: filters.page,
          limit: 5,
        },
      });

      // ✅ FIXED MAPPING
      setBlogs(data.data || []);
      setTotalPages(data.pagination?.totalPages || 1);
      setTotalRecords(data.pagination?.totalRecords || 0);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return {
    blogs,
    loading,
    totalPages,
    totalRecords,
    refetch: fetchBlogs,
  };
};
