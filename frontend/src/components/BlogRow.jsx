import { useNavigate } from "react-router-dom";
import ActionsDropdown from "./ActionsDropdown";
import API from "../api/axiosInstance";

const BlogRow = ({ blog, idx, page, currentUserId, refetch, totalRows }) => {
  const navigate = useNavigate();
  const ownerId = blog.authorId?._id || blog.authorId || blog.userId;
  const isOwner =
    currentUserId && ownerId && ownerId.toString() === currentUserId;

  const handleDelete = async () => {
    if (window.confirm("Delete this item?")) {
      await API.delete(`/blog/${blog._id}`);
      refetch();
    }
  };

  return (
    <tr className="hover:bg-slate-50/50 transition-colors">
      <td className="px-4 md:px-6 py-4 md:py-5 text-slate-400 font-medium">
        {(page - 1) * 5 + idx + 1}
      </td>

      <td className="px-4 md:px-6 py-4 md:py-5 font-bold text-slate-800 truncate max-w-[150px] md:max-w-none">
        {blog.title}
      </td>

      <td className="px-4 md:px-6 py-4 md:py-5 text-slate-600 font-medium">
        {blog.authorName || "User"}
      </td>

      <td className="px-4 md:px-6 py-4 md:py-5 text-slate-600 text-xs md:text-sm">
        {blog.category}
      </td>

      <td className="px-4 md:px-6 py-4 md:py-5 text-center">
        <span
          className={`px-2.5 py-1 rounded-full text-[9px] md:text-[10px] font-black uppercase ${
            blog.status === "Published"
              ? "bg-emerald-100 text-emerald-700"
              : "bg-orange-100 text-orange-600"
          }`}
        >
          {blog.status}
        </span>
      </td>

      <td className="px-4 md:px-6 py-4 md:py-5 text-center text-slate-500 text-xs md:text-sm">
        {new Date(blog.createdAt).toLocaleDateString("en-GB")}
      </td>

      <td className="px-4 md:px-6 py-4 md:py-5 text-right">
        <ActionsDropdown
          blogId={blog._id}
          isOwner={isOwner}
          onDelete={handleDelete}
        />
      </td>
    </tr>
  );
};

export default BlogRow;
