import { motion } from "framer-motion";
import { Eye, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fffaf5] via-white to-orange-50 flex items-center justify-center px-4 overflow-hidden relative">

      {/* Background Blur */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-orange-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-orange-100 rounded-full blur-3xl opacity-40"></div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 bg-white/80 backdrop-blur-xl border border-orange-100 shadow-2xl rounded-[40px] w-full max-w-md p-8 sm:p-10"
      >

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <motion.div
            whileHover={{ scale: 1.08 }}
            className="w-20 h-20 rounded-full bg-gradient-to-r from-[#ff7a00] to-orange-400 flex items-center justify-center shadow-lg mb-4"
          >
            <Eye className="text-white w-10 h-10" />
          </motion.div>

          <h1 className="text-4xl font-extrabold text-gray-900">
            Naintaara
          </h1>

          <p className="text-gray-500 mt-2 text-center">
            Welcome back! Continue your child’s eye fitness journey.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5">

          {/* Email */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Email Address
            </label>

            <div className="flex items-center bg-[#fff7f0] border border-orange-100 rounded-2xl px-4 py-4 focus-within:border-[#ff7a00] transition-all">
              <Mail className="text-[#ff7a00] w-5 h-5 mr-3" />

              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent outline-none w-full text-gray-700 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Password
            </label>

            <div className="flex items-center bg-[#fff7f0] border border-orange-100 rounded-2xl px-4 py-4 focus-within:border-[#ff7a00] transition-all">
              <Lock className="text-[#ff7a00] w-5 h-5 mr-3" />

              <input
                type="password"
                placeholder="Enter your password"
                className="bg-transparent outline-none w-full text-gray-700 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm text-[#ff7a00] hover:text-orange-600 font-medium transition"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <motion.button
          onClick={() => navigate("/dashboard")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            type="button"
            className="w-full bg-gradient-to-r from-[#ff7a00] to-orange-500 text-white py-4 rounded-2xl font-bold shadow-lg hover:shadow-orange-200 transition-all duration-300"
          >
            Login
          </motion.button>

          {/* Divider */}
          <div className="flex items-center gap-4 py-2">
            <div className="flex-1 h-[1px] bg-orange-100"></div>
            <span className="text-sm text-gray-400">OR</span>
            <div className="flex-1 h-[1px] bg-orange-100"></div>
          </div>

          {/* Google Login */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            type="button"
            className="w-full bg-white border border-orange-100 py-4 rounded-2xl font-semibold text-gray-700 hover:bg-orange-50 transition-all shadow-sm"
          >
            Continue with Google
          </motion.button>
        </form>

        {/* Bottom */}
        <p className="text-center text-gray-500 mt-8 text-sm">
          Don’t have an account?{" "}
          <button
  type="button"
  onClick={() => navigate("/signup")}
  className="text-[#ff7a00] font-semibold hover:text-orange-600"
>
  Sign Up
</button>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;