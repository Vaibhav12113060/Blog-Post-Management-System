const Pagination = ({ page, totalPages, totalRecords, setFilters }) => {
  const start = totalRecords === 0 ? 0 : (page - 1) * 5 + 1;
  const end = totalRecords === 0 ? 0 : Math.min(page * 5, totalRecords);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
      <p className="text-sm text-slate-500 font-medium">
        Showing <span className="font-bold text-slate-900">{start}</span> to{" "}
        <span className="font-bold text-slate-900">{end}</span> of{" "}
        <span className="font-bold text-slate-900">{totalRecords}</span> records
      </p>

      <div className="flex items-center gap-1 md:gap-2">
        <button
          className="p-2 text-slate-400 hover:text-indigo-600 disabled:opacity-30 transition-colors"
          disabled={page === 1}
          onClick={() =>
            setFilters((prev) => ({ ...prev, page: prev.page - 1 }))
          }
        >
          ❮
        </button>

        <div className="flex gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setFilters((prev) => ({ ...prev, page: num }))}
              className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                page === num
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {num}
            </button>
          ))}
        </div>

        <button
          className="p-2 text-slate-400 hover:text-indigo-600 disabled:opacity-30 transition-colors"
          disabled={page === totalPages}
          onClick={() =>
            setFilters((prev) => ({ ...prev, page: prev.page + 1 }))
          }
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default Pagination;
