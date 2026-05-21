import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, Phone, Calendar, ArrowRight, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Shadcn UI Elements
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Checkbox } from "../../components/ui/checkbox";

import { signupUser } from "../../api/authApi";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!agreedToTerms) {
      setError("Please accept the Terms and Conditions to proceed.");
      return;
    }

    setLoading(true);

    try {
      const userData = { name, email, mobile, password, age };
      const data = await signupUser(userData);
      localStorage.setItem("token", data.token);
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // 💡 FIXED VIEWPORT CENTRE: Pure screen ko flexbox grid se completely centralize kiya hai. Ab right-left shifting impossible hai.
    <div className="h-screen w-screen bg-[#fafafa] flex items-center justify-center px-4 overflow-hidden relative selection:bg-orange-100">
      
      {/* Luxury Organic Background Glows */}
      <div className="absolute top-[15%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-tr from-orange-200/30 to-amber-200/20 rounded-full blur-[110px] pointer-events-none z-0" />

      {/* Main Structural Layout Wrapper */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[365px] flex flex-col"
      >
        {/* Ultra-Compact Header */}
        <div className="text-center mb-3">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#ff7a00] shadow-sm mb-1.5">
            <Eye className="text-white w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-neutral-900">Create Account</h1>
          <p className="text-[11px] text-neutral-500 font-medium">Start your child’s eye fitness journey today</p>
        </div>

        {/* Human Designer Container Box */}
        <div className="bg-white rounded-[24px] border border-neutral-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04),0_1px_2px_rgb(0,0,0,0.02)] p-4 sm:p-5 transition-all">
          
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-2.5 p-2 bg-red-50 text-red-600 text-[11px] font-medium rounded-xl border border-red-100"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSignup} className="space-y-2.5">
            
            {/* Full Name Field */}
            <div className="space-y-1">
              <Label htmlFor="name" className="text-[11px] font-semibold text-neutral-700">Full Name</Label>
              <div className="flex items-center bg-neutral-50/60 border border-neutral-200 rounded-xl px-3 h-10 focus-within:border-[#ff7a00] focus-within:bg-white focus-within:ring-4 focus-within:ring-orange-500/5 transition-all duration-150">
                <User className="text-[#ff7a00] w-3.5 h-3.5 flex-shrink-0 opacity-85" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  className="border-0 bg-transparent shadow-none focus-visible:ring-0 placeholder:text-neutral-400 text-neutral-800 text-xs ml-2 h-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
            </div>

            {/* Email Address Field */}
            <div className="space-y-1">
              <Label htmlFor="email" className="text-[11px] font-semibold text-neutral-700">Email Address</Label>
              <div className="flex items-center bg-neutral-50/60 border border-neutral-200 rounded-xl px-3 h-10 focus-within:border-[#ff7a00] focus-within:bg-white focus-within:ring-4 focus-within:ring-orange-500/5 transition-all duration-150">
                <Mail className="text-[#ff7a00] w-3.5 h-3.5 flex-shrink-0 opacity-85" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="border-0 bg-transparent shadow-none focus-visible:ring-0 placeholder:text-neutral-400 text-neutral-800 text-xs ml-2 h-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
            </div>

            {/* Dual Column Row: Mobile & Age */}
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-8 space-y-1">
                <Label htmlFor="mobile" className="text-[11px] font-semibold text-neutral-700">Mobile</Label>
                <div className="flex items-center bg-neutral-50/60 border border-neutral-200 rounded-xl px-2.5 h-10 focus-within:border-[#ff7a00] focus-within:bg-white focus-within:ring-4 focus-within:ring-orange-500/5 transition-all duration-150">
                  <Phone className="text-[#ff7a00] w-3.5 h-3.5 flex-shrink-0 opacity-85" />
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="Mobile number"
                    className="border-0 bg-transparent shadow-none focus-visible:ring-0 placeholder:text-neutral-400 text-neutral-800 text-xs ml-1.5 h-full px-0"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    maxLength={10}
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              <div className="col-span-4 space-y-1">
                <Label htmlFor="age" className="text-[11px] font-semibold text-neutral-700">Age</Label>
                <div className="flex items-center bg-neutral-50/60 border border-neutral-200 rounded-xl px-2.5 h-10 focus-within:border-[#ff7a00] focus-within:bg-white focus-within:ring-4 focus-within:ring-orange-500/5 transition-all duration-150">
                  <Input
                    id="age"
                    type="number"
                    placeholder="Age"
                    className="border-0 bg-transparent shadow-none focus-visible:ring-0 placeholder:text-neutral-400 text-neutral-800 text-xs h-full w-full px-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-center font-medium"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <Label htmlFor="password" className="text-[11px] font-semibold text-neutral-700">Password</Label>
              <div className="flex items-center bg-neutral-50/60 border border-neutral-200 rounded-xl px-3 h-10 focus-within:border-[#ff7a00] focus-within:bg-white focus-within:ring-4 focus-within:ring-orange-500/5 transition-all duration-150">
                <Lock className="text-[#ff7a00] w-3.5 h-3.5 flex-shrink-0 opacity-85" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create password"
                  className="border-0 bg-transparent shadow-none focus-visible:ring-0 placeholder:text-neutral-400 text-neutral-800 text-xs ml-2 h-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-neutral-400 hover:text-[#ff7a00] transition focus:outline-none"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Terms & Conditions Box */}
            <div className="flex items-start gap-2 pt-0.5">
              <Checkbox 
                id="terms" 
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(!!checked)}
                className="rounded border-neutral-300 data-[state=checked]:bg-[#ff7a00] data-[state=checked]:border-[#ff7a00] h-3.5 w-3.5 mt-0.5 shadow-none" 
              />
              <Label htmlFor="terms" className="text-[10px] text-neutral-500 font-medium leading-tight cursor-pointer select-none">
                I agree to the{" "}
                <button type="button" className="text-[#ff7a00] font-bold hover:underline">Terms</button>
                {" "}and{" "}
                <button type="button" className="text-[#ff7a00] font-bold hover:underline">Privacy</button>.
              </Label>
            </div>

            {/* Submit Action Button */}
            <div className="pt-0.5">
              <Button
                type="submit"
                disabled={loading || !agreedToTerms}
                className="w-full h-10 bg-[#ff7a00] hover:bg-orange-600 disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed text-white rounded-xl font-semibold shadow-sm flex items-center justify-center gap-1.5 text-xs border-0 transition-all active:scale-[0.985]"
              >
                {loading ? (
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <LogIn className="w-3.5 h-3.5" />
                    Create Account
                  </>
                )}
              </Button>
            </div>

            {/* Minimal Separation Line */}
            <div className="flex items-center gap-2 py-0.5">
              <div className="flex-1 h-[1px] bg-neutral-100" />
              <span className="text-[9px] text-neutral-400 font-bold tracking-widest">OR</span>
              <div className="flex-1 h-[1px] bg-neutral-100" />
            </div>

            {/* Google Authentication */}
            <Button
              type="button"
              variant="outline"
              disabled={loading}
              className="w-full h-10 bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-600 rounded-xl font-medium flex items-center justify-center gap-2 text-xs shadow-none transition-all"
            >
              <svg className="w-3 h-3 mr-0.5" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5.04c1.64 0 3.12.56 4.28 1.67l3.2-3.2C17.52 1.58 14.96 1 12 1 7.35 1 3.4 3.65 1.5 7.5l3.6 2.8C6.01 6.8 8.74/5.04 12 5.04z" />
                <path fill="#4285F4" d="M23.5 12.25c0-.82-.07-1.6-.2-2.35H12v4.5h6.46c-.28 1.47-1.11 2.71-2.36 3.55l3.6 2.8c2.1-1.94 3.3-4.8 3.3-8.5z" />
                <path fill="#FBBC05" d="M5.1 14.7l-3.6 2.8C3.4 21.35 7.35 24 12 24c3.24 0 5.97-1.08 7.96-2.91l-3.6-2.8c-1.1.74-2.5 1.18-4.36 1.18-3.26 0-5.99-1.76-6.9-4.77z" />
                <path fill="#34A853" d="M1.5 7.5A12.9 12.9 0 001.5 16.5l3.6-2.8c-.24-.63-.35-1.3-.35-1.95s.11-1.32.35-1.95L1.5 7.5z" />
              </svg>
              Continue with Google
            </Button>
          </form>

          {/* Core Footer Link */}
          <p className="text-center text-neutral-500 mt-4 text-xs font-medium">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-[#ff7a00] font-bold hover:text-orange-600 inline-flex items-center gap-0.5 transition focus:outline-none"
            >
              Login
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </p>
        </div>

        {/* System Footprint Label */}
        <div className="text-center mt-3 text-[10px] text-neutral-400 font-medium tracking-wide">
          🔒 Secured by End-to-End Encryption
        </div>

      </motion.div>
    </div>
  );
};

export default Signup;