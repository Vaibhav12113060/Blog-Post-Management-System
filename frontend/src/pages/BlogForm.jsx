import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { blogSchema } from "../utils/validationSchema";
import API from "../api/axiosInstance";

const BlogForm = ({ mode = "create" }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      authorName: "",
      authorEmail: "",
      category: "",
      tags: "",
      status: "",
      shortDescription: "",
      content: "",
      thumbnail: null,
    },
    validationSchema: blogSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setLoading(true);
      const data = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === "thumbnail") {
          if (values[key]) data.append("thumbnail", values[key]);
        } else {
          data.append(key, values[key]);
        }
      });

      try {
        mode === "create"
          ? await API.post("/blog", data)
          : await API.put(`/blog/${id}`, data);
        navigate("/dashboard");
      } catch (err) {
        alert("Submission Failed!");
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    const fetchEverything = async () => {
      try {
        const profileRes = await API.get("/auth/me");
        const user = profileRes.data?.user || profileRes.data;
        let blogData = {};
        if (mode === "edit" && id) {
          const blogRes = await API.get(`/blog/${id}`);
          blogData = blogRes.data?.data || blogRes.data;
        }
        formik.setValues({
          ...formik.initialValues,
          ...blogData,
          authorName:
            (typeof user === "object" ? user.name : blogData.authorName) ||
            "Tester1",
          authorEmail:
            (typeof user === "object" ? user.email : blogData.authorEmail) ||
            "tester1@gmail.com",
          tags: Array.isArray(blogData.tags)
            ? blogData.tags.join(", ")
            : blogData.tags || "",
          title: blogData.title || "",
          shortDescription: blogData.shortDescription || "",
          content: blogData.content || "",
        });
      } catch (err) {
        console.error("Fetch Error:", err);
      }
    };
    fetchEverything();
  }, [id, mode]);

  const inputStyle =
    "w-full p-3 md:p-4 bg-slate-50 border rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 transition-all text-xs md:text-sm font-medium text-slate-600 shadow-sm";
  const errorInputStyle = "border-red-500 ring-2 ring-red-100";
  const fixedStyle =
    "w-full p-3 md:p-4 bg-slate-100 border border-slate-200 rounded-2xl text-slate-500 font-bold text-xs md:text-sm cursor-not-allowed select-none";
  const labelStyle =
    "text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-widest ml-2 mb-2 block";
  const errorTextStyle =
    "text-red-500 text-[9px] md:text-[10px] font-bold uppercase ml-2 mt-1 tracking-tight";

  return (
    <div className="min-h-screen bg-[#CBD5E1] py-6 md:py-10 px-3 md:px-4 font-sans">
      <div className="max-w-3xl mx-auto">
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="mb-6 flex items-center gap-2 text-slate-600 hover:text-indigo-700 font-bold text-[10px] md:text-xs bg-white/80 px-4 md:px-5 py-2 md:py-2.5 rounded-xl border border-slate-300 transition-all shadow-sm"
        >
          ← <span className="hidden sm:inline">Back to Dashboard</span>
          <span className="sm:hidden">Back</span>
        </button>

        <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden">
          <div className="p-6 md:p-10 text-center border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-xl md:text-3xl font-black text-slate-900 uppercase tracking-tighter italic">
              {mode === "create" ? "Post new Blog" : "Update Blog Post"}
            </h2>
          </div>

          <form
            onSubmit={formik.handleSubmit}
            className="p-6 md:p-10 space-y-6 md:space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="md:col-span-2">
                <label className={labelStyle}>Post Title *</label>
                <input
                  name="title"
                  className={`${inputStyle} ${formik.touched.title && formik.errors.title ? errorInputStyle : "border-slate-200"}`}
                  {...formik.getFieldProps("title")}
                />
                {formik.touched.title && formik.errors.title && (
                  <p className={errorTextStyle}>{formik.errors.title}</p>
                )}
              </div>

              <div>
                <label className={labelStyle}>Author Name</label>
                <input
                  className={fixedStyle}
                  value={formik.values.authorName}
                  readOnly
                />
              </div>

              <div>
                <label className={labelStyle}>Author Email</label>
                <input
                  className={fixedStyle}
                  value={formik.values.authorEmail}
                  readOnly
                />
              </div>

              {/* Responsive Dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:col-span-2">
                <div>
                  <label className={labelStyle}>Category *</label>
                  <select
                    name="category"
                    className={`${inputStyle} ${formik.touched.category && formik.errors.category ? errorInputStyle : "border-slate-200"}`}
                    {...formik.getFieldProps("category")}
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    {[
                      "Technology",
                      "Business",
                      "Lifestyle",
                      "Design",
                      "Other",
                    ].map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {formik.touched.category && formik.errors.category && (
                    <p className={errorTextStyle}>{formik.errors.category}</p>
                  )}
                </div>
                <div>
                  <label className={labelStyle}>Status *</label>
                  <select
                    name="status"
                    className={`${inputStyle} ${formik.touched.status && formik.errors.status ? errorInputStyle : "border-slate-200"}`}
                    {...formik.getFieldProps("status")}
                  >
                    <option value="" disabled>
                      Select Status
                    </option>
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                  </select>
                  {formik.touched.status && formik.errors.status && (
                    <p className={errorTextStyle}>{formik.errors.status}</p>
                  )}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className={labelStyle}>Thumbnail (Max 2MB)</label>
                <input
                  type="file"
                  name="thumbnail"
                  className={inputStyle}
                  accept="image/*"
                  onChange={(e) =>
                    formik.setFieldValue("thumbnail", e.currentTarget.files[0])
                  }
                />
                {formik.touched.thumbnail && formik.errors.thumbnail && (
                  <p className={errorTextStyle}>{formik.errors.thumbnail}</p>
                )}
              </div>
            </div>

            <textarea
              name="shortDescription"
              className={`${inputStyle} h-24 md:h-28 resize-none`}
              placeholder="Short Description"
              {...formik.getFieldProps("shortDescription")}
            />
            <textarea
              name="content"
              className={`${inputStyle} h-48 md:h-64 resize-none`}
              placeholder="Content"
              {...formik.getFieldProps("content")}
            />

            <div className="flex justify-center md:justify-end pt-6 border-t border-slate-100">
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto px-12 py-3.5 bg-indigo-600 text-white font-black rounded-2xl shadow-xl hover:bg-indigo-700 transition-all active:scale-95 text-sm uppercase"
              >
                {loading ? "SAVING..." : "Publish Blog"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogForm;
