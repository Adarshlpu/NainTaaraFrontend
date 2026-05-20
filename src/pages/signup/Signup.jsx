import { motion } from "framer-motion";
import { Eye, Mail, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";


const Signup = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fffaf5] via-white to-orange-50 flex items-center justify-center px-4 relative overflow-hidden">

      {/* Blur */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-orange-200 blur-3xl opacity-30 rounded-full"></div>

      <div className="absolute bottom-10 right-10 w-72 h-72 bg-orange-100 blur-3xl opacity-40 rounded-full"></div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 bg-white/80 backdrop-blur-xl border border-orange-100 shadow-2xl rounded-[40px] w-full max-w-md p-8 sm:p-10"
      >

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#ff7a00] to-orange-400 flex items-center justify-center shadow-lg mb-4">
            <Eye className="text-white w-10 h-10" />
          </div>

          <h1 className="text-4xl font-extrabold text-gray-900">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2 text-center">
            Start your child’s eye fitness journey today.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5">

          {/* Name */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Full Name
            </label>

            <div className="flex items-center bg-[#fff7f0] border border-orange-100 rounded-2xl px-4 py-4 focus-within:border-[#ff7a00]">
              <User className="text-[#ff7a00] w-5 h-5 mr-3" />

              <input
                type="text"
                placeholder="Enter your name"
                className="bg-transparent outline-none w-full"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Email Address
            </label>

            <div className="flex items-center bg-[#fff7f0] border border-orange-100 rounded-2xl px-4 py-4 focus-within:border-[#ff7a00]">
              <Mail className="text-[#ff7a00] w-5 h-5 mr-3" />

              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent outline-none w-full"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Password
            </label>

            <div className="flex items-center bg-[#fff7f0] border border-orange-100 rounded-2xl px-4 py-4 focus-within:border-[#ff7a00]">
              <Lock className="text-[#ff7a00] w-5 h-5 mr-3" />

              <input
                type="password"
                placeholder="Create password"
                className="bg-transparent outline-none w-full"
              />
            </div>
          </div>

          {/* Signup Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            className="w-full bg-gradient-to-r from-[#ff7a00] to-orange-500 text-white py-4 rounded-2xl font-bold shadow-lg"
          >
            Create Account
          </motion.button>

          {/* Divider */}
          <div className="flex items-center gap-4 py-2">
            <div className="flex-1 h-[1px] bg-orange-100"></div>
            <span className="text-sm text-gray-400">OR</span>
            <div className="flex-1 h-[1px] bg-orange-100"></div>
          </div>

          {/* Google */}
          <button
            type="button"
            className="w-full bg-white border border-orange-100 py-4 rounded-2xl font-semibold text-gray-700 hover:bg-orange-50 transition-all"
          >
            Continue with Google
          </button>
        </form>

        {/* Bottom */}
        <p className="text-center text-gray-500 mt-8 text-sm">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-[#ff7a00] font-semibold hover:text-orange-600"
          >
            Login
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;