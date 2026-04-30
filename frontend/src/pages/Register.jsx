import { useFormik } from "formik";
import { authSchema } from "../utils/validationSchema";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/authApi";
import { useState } from "react";
import Logo from "../components/Logo"; // ✅ Added Logo

const Register = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "", confirmPassword: "" },
    validationSchema: authSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setErrorMessage("");
      try {
        await registerUser({
          name: values.name,
          email: values.email,
          password: values.password,
        });
        navigate("/login");
      } catch (error) {
        setErrorMessage(
          error.response?.data?.message || "Registration failed. Try again.",
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  const inputStyle = (field) => `
    appearance-none rounded-xl relative block w-full px-4 py-3 md:py-2 border text-sm
    ${
      formik.touched[field] && formik.errors[field]
        ? "border-red-500 ring-2 ring-red-50"
        : "border-gray-300 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
    }
    placeholder-gray-500 text-gray-900 focus:outline-none transition-all
  `;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1F5F9] py-12 px-4 font-sans text-center">
      <div className="max-w-md w-full space-y-6 md:space-y-8 bg-white p-6 md:p-10 rounded-[2rem] shadow-2xl border border-gray-100">
        {/* ✅ Logo Rendered Here */}
        <div className="flex justify-center">
          <Logo size="text-4xl" />
        </div>

        <p className="mt-2 text-sm text-slate-500 font-medium">
          Join VaiBlog to manage your content professionally
        </p>

        {errorMessage && (
          <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-[10px] font-bold uppercase tracking-tight text-left">
            {errorMessage}
          </div>
        )}

        <form
          className="mt-8 space-y-4 text-left"
          onSubmit={formik.handleSubmit}
        >
          <div>
            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">
              Full Name
            </label>
            <input
              name="name"
              type="text"
              className={inputStyle("name")}
              placeholder="Vaibhav Kumar"
              {...formik.getFieldProps("name")}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-[10px] font-bold mt-1.5 ml-1 uppercase">
                {formik.errors.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              className={inputStyle("email")}
              placeholder="vaibhav@example.com"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-[10px] font-bold mt-1.5 ml-1 uppercase">
                {formik.errors.email}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                className={inputStyle("password")}
                placeholder="••••••••"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-[10px] font-bold mt-1.5 ml-1 uppercase">
                  {formik.errors.password}
                </p>
              )}
            </div>
            <div>
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">
                Confirm
              </label>
              <input
                name="confirmPassword"
                type="password"
                className={inputStyle("confirmPassword")}
                placeholder="••••••••"
                {...formik.getFieldProps("confirmPassword")}
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="text-red-500 text-[10px] font-bold mt-1.5 ml-1 uppercase">
                    {formik.errors.confirmPassword}
                  </p>
                )}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className={`group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-black rounded-xl text-white transition-all transform active:scale-95 shadow-xl uppercase tracking-widest ${
                formik.isSubmitting
                  ? "bg-indigo-400"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {formik.isSubmitting ? "Creating Account..." : "Register Now"}
            </button>
          </div>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-slate-600 font-medium">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-indigo-600 hover:text-indigo-500"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
