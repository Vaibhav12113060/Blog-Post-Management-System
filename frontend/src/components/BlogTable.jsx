import BlogRow from "./BlogRow";

const BlogTable = ({ blogs, loading, currentUserId, page, refetch }) => {
  return (
    <div className="bg-white rounded-[1.5rem] md:rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* scrollbar-hide utility class can be added if you have the tailwind-scrollbar-hide plugin */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-sm min-w-[800px] md:min-w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr className="text-slate-500 uppercase text-[10px] md:text-xs tracking-wider">
              <th className="px-4 md:px-6 py-4 text-left w-[50px] md:w-[60px]">
                ID
              </th>
              <th className="px-4 md:px-6 py-4 text-left">Title</th>
              <th className="px-4 md:px-6 py-4 text-left">Author</th>
              <th className="px-4 md:px-6 py-4 text-left">Category</th>
              <th className="px-4 md:px-6 py-4 text-center">Status</th>
              <th className="px-4 md:px-6 py-4 text-center">Created</th>
              <th className="px-4 md:px-6 py-4 text-right w-[80px]">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {blogs.map((blog, idx) => (
              <BlogRow
                key={blog._id}
                blog={blog}
                idx={idx}
                page={page}
                currentUserId={currentUserId}
                refetch={refetch}
                totalRows={blogs.length}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogTable;
