import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

const ActionsDropdown = ({ blogId, isOwner, onDelete }) => {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  const btnRef = useRef();
  const navigate = useNavigate();

  const toggleDropdown = (e) => {
    // Prevent event bubbling to avoid instant closure
    e.stopPropagation();

    if (!open) {
      const rect = btnRef.current.getBoundingClientRect();
      const dropdownWidth = 160; // w-40 = 160px

      // Responsive positioning: Check if it goes off-screen on the right
      let leftPos = rect.right + window.scrollX - dropdownWidth;
      if (leftPos < 10) leftPos = 10; // Left margin for very small screens

      setPos({
        top: rect.bottom + window.scrollY + 5, // 5px gap
        left: leftPos,
      });
    }
    setOpen(!open);
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (btnRef.current && !btnRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("click", handleClick);
    }

    return () => document.removeEventListener("click", handleClick);
  }, [open]);

  return (
    <>
      <button
        ref={btnRef}
        onClick={toggleDropdown}
        // Mobile par touch target bada karne ke liye p-3 diya hai
        className="p-3 md:p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors active:bg-slate-200"
        aria-label="Actions"
      >
        <span className="text-xl font-bold leading-none">⋮</span>
      </button>

      {open &&
        createPortal(
          <div
            // Mobile-friendly styles: larger font and more padding
            className="absolute w-40 bg-white border border-slate-200 rounded-2xl shadow-2xl z-[99999] overflow-hidden animate-in fade-in zoom-in duration-100"
            style={{ top: pos.top, left: pos.left }}
          >
            <button
              onClick={() => {
                navigate(`/view/${blogId}`);
                setOpen(false);
              }}
              className="block w-full text-left px-4 py-3 md:py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 active:bg-slate-100 transition-colors"
            >
              View Blog
            </button>

            {isOwner && (
              <>
                <button
                  onClick={() => {
                    navigate(`/edit/${blogId}`);
                    setOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 md:py-2 text-sm font-bold text-indigo-600 hover:bg-indigo-50 border-t border-slate-50 active:bg-indigo-100 transition-colors"
                >
                  Edit Post
                </button>

                <button
                  onClick={() => {
                    onDelete();
                    setOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 md:py-2 text-sm font-bold text-red-600 hover:bg-red-50 border-t border-slate-50 active:bg-red-100 transition-colors"
                >
                  Delete
                </button>
              </>
            )}
          </div>,
          document.body,
        )}
    </>
  );
};

export default ActionsDropdown;
