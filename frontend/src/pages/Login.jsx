import { useFormik } from "formik";
import { authSchema } from "../utils/validationSchema";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/authApi";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Logo from "../components/Logo"; // ✅ Added Logo

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: authSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setErrorMessage("");
      try {
        const { data } = await loginUser({
          email: values.email,
          password: values.password,
        });
        login(data.user, data.token);
      } catch (error) {
        const status = error.response?.status;
        if (status === 401)
          setErrorMessage("Invalid credentials. Check email and password.");
        else if (status === 404) setErrorMessage("User account not found.");
        else setErrorMessage("Server error. Please try again later.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const inputStyle = (field) => `
    w-full px-4 py-3 md:py-2 border rounded-xl transition-all outline-none text-sm
    ${
      formik.touched[field] && formik.errors[field]
        ? "border-red-500 ring-2 ring-red-50"
        : "border-gray-300 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
    }
  `;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1F5F9] font-sans px-4 py-8">
      <div className="bg-white p-6 md:p-10 rounded-[2rem] shadow-2xl w-full max-w-md border border-gray-100 text-center">
        {/* ✅ Logo Rendered Here */}
        <div className="flex justify-center mb-8">
          <Logo size="text-4xl" />
        </div>

        <p className="text-slate-500 mb-8 font-medium text-sm">
          Access your content dashboard
        </p>

        {errorMessage && (
          <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-[10px] font-bold uppercase tracking-tight text-left">
            {errorMessage}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-5 text-left">
          <div>
            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              className={inputStyle("email")}
              placeholder="admin@example.com"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-[10px] font-bold mt-1.5 ml-1 uppercase">
                {formik.errors.email}
              </p>
            )}
          </div>

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

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className={`w-full py-3.5 px-4 rounded-xl text-white font-black shadow-xl transition-all transform active:scale-[0.98] uppercase text-sm tracking-wide ${
              formik.isSubmitting
                ? "bg-indigo-400"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {formik.isSubmitting ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        <div className="text-center mt-8">
          <p className="text-sm text-slate-600 font-medium">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
