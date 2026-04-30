const FilterBar = ({ filters, setFilters }) => {
  const categories = ["Technology", "Business", "Lifestyle", "Design", "Other"];
  const statuses = ["Published", "Draft"];

  const baseStyle =
    "block w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-xs font-medium text-slate-700 shadow-sm";

  return (
    <div className="w-full mb-6">
      <div className="bg-white border border-slate-200 rounded-2xl md:rounded-[2rem] p-3 md:p-6 shadow-sm flex flex-col lg:flex-row gap-3 md:gap-4 items-center">
        {/* Search Input - Full width on mobile */}
        <div className="relative w-full group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search posts..."
            className={`${baseStyle} pl-10`}
            value={filters.search || ""}
            onChange={(e) =>
              setFilters({ ...filters, search: e.target.value, page: 1 })
            }
          />
        </div>

        {/* Dropdowns Group - Mobile par ek hi row mein 2 columns */}
        <div className="grid grid-cols-2 gap-2 w-full lg:w-auto lg:flex lg:gap-3">
          {/* Category Dropdown */}
          <div className="relative lg:w-44">
            <select
              className={`${baseStyle} appearance-none pr-8 cursor-pointer`}
              value={filters.category || ""}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value, page: 1 })
              }
            >
              <option value="">Category</option>{" "}
              {/* Shortened label for mobile */}
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-2.5 flex items-center pointer-events-none text-slate-400">
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Status Dropdown */}
          <div className="relative lg:w-40">
            <select
              className={`${baseStyle} appearance-none pr-8 cursor-pointer`}
              value={filters.status || ""}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value, page: 1 })
              }
            >
              <option value="">Status</option>
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-2.5 flex items-center pointer-events-none text-slate-400">
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
