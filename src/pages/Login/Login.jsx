import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Phone, Lock, LogIn, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Shadcn UI Elements
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Checkbox } from "../../components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";

import { loginUser } from "../../api/authApi";

const Login = () => {
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!mobile || !password) {
        setError("Please fill in all fields");
        setLoading(false);
        return;
      }

      const loginData = { mobile, password };
      const data = await loginUser(loginData);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    // 💡 FIXED VIEWPORT: Background screen locked to 100vh/100vw
    <div className="h-screen w-screen bg-[#fafafa] flex items-center justify-center px-4 overflow-hidden relative selection:bg-orange-100">
      
      {/* Luxury Organic Glow */}
      <div className="absolute top-[25%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] bg-gradient-to-tr from-orange-200/40 to-amber-200/20 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* 💡 FIXED STATIC CENTER: Same exact transform & motion settings as Signup page */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[365px] flex flex-col"
      >
        {/* Sleek Minimalist Header */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#ff7a00] shadow-sm mb-2">
            <Eye className="text-white w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Nainocular</h1>
          <p className="text-xs text-neutral-500 mt-0.5">Your premium eye fitness partner</p>
        </div>

        {/* Card Component Box */}
        <div className="bg-white rounded-[24px] border border-neutral-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04),0_1px_2px_rgb(0,0,0,0.02)] p-5 transition-all">
          
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-4 p-3 bg-red-50 text-red-600 text-xs font-medium rounded-xl border border-red-100"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-3.5">
            
            {/* Mobile Form Field */}
            <div className="space-y-1.5">
              <Label htmlFor="mobile" className="text-xs font-semibold text-neutral-700">Mobile Number</Label>
              <div className="flex items-center bg-neutral-50/60 border border-neutral-200 rounded-xl px-3.5 h-10 focus-within:border-[#ff7a00] focus-within:bg-white focus-within:ring-4 focus-within:ring-orange-500/5 transition-all duration-150">
                <Phone className="text-[#ff7a00] w-4 h-4 flex-shrink-0 opacity-85" />
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="10-digit mobile number"
                  className="border-0 bg-transparent shadow-none focus-visible:ring-0 placeholder:text-neutral-400 text-neutral-800 text-sm ml-2 h-full"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  maxLength={10}
                  disabled={loading}
                  required
                />
              </div>
            </div>

            {/* Password Form Field */}
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs font-semibold text-neutral-700">Password</Label>
              <div className="flex items-center bg-neutral-50/60 border border-neutral-200 rounded-xl px-3.5 h-10 focus-within:border-[#ff7a00] focus-within:bg-white focus-within:ring-4 focus-within:ring-orange-500/5 transition-all duration-150">
                <Lock className="text-[#ff7a00] w-4 h-4 flex-shrink-0 opacity-85" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="border-0 bg-transparent shadow-none focus-visible:ring-0 placeholder:text-neutral-400 text-neutral-800 text-sm ml-2 h-full"
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
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Dialog Wrapper */}
            <div className="flex justify-between items-center text-xs pt-0.5">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" className="rounded border-neutral-300 data-[state=checked]:bg-[#ff7a00] data-[state=checked]:border-[#ff7a00] h-4 w-4 shadow-none" />
                <Label htmlFor="remember" className="text-neutral-500 font-medium cursor-pointer text-xs">
                  Remember me
                </Label>
              </div>
{/*}
             <Dialog>
                <DialogTrigger asChild>
                  <button type="button" className="text-xs text-[#ff7a00] hover:text-orange-600 font-semibold transition focus:outline-none">
                    Forgot Password?
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-[350px] rounded-2xl border border-neutral-200/80 shadow-xl">
                  <DialogHeader>
                    <DialogTitle className="text-base font-bold text-neutral-900">Reset Password</DialogTitle>
                    <DialogDescription className="text-xs text-neutral-500">
                      Enter your mobile number to get an account recovery code.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-3 py-1">
                    <Input placeholder="Enter phone number" className="h-10 rounded-xl border-neutral-200 focus-visible:ring-orange-500/20" />
                    <Button className="w-full h-10 bg-[#ff7a00] hover:bg-orange-600 text-white rounded-xl font-medium border-0 shadow-sm transition-all">
                      Send Code
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              */}
            </div>

            {/* Main Action Button */}
            <div className="pt-0.5">
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-10 bg-[#ff7a00] hover:bg-orange-600 text-white rounded-xl font-semibold shadow-sm flex items-center justify-center gap-1.5 text-xs border-0 transition-all active:scale-[0.985]"
              >
                {loading ? (
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <LogIn className="w-3.5 h-3.5" />
                    Sign In
                  </>
                )}
              </Button>
            </div>

            {/* Micro Divider */}
            <div className="flex items-center gap-2 py-0.5">
              <div className="flex-1 h-[1px] bg-neutral-100" />
              <span className="text-[10px] text-neutral-400 font-bold tracking-widest">OR</span>
              <div className="flex-1 h-[1px] bg-neutral-100" />
            </div>

            {/* Google OAuth Call 
            <Button
              type="button"
              variant="outline"
              disabled={loading}
              className="w-full h-10 bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-600 rounded-xl font-medium flex items-center justify-center gap-2 text-xs shadow-none transition-all"
            >
              <svg className="w-3 h-3 mr-0.5" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5.04c1.64 0 3.12.56 4.28 1.67l3.2-3.2C17.52 1.58 14.96 1 12 1 7.35 1 3.4 3.65 1.5 7.5l3.6 2.8C6.01 6.8 8.74 5.04 12 5.04z" />
                <path fill="#4285F4" d="M23.5 12.25c0-.82-.07-1.6-.2-2.35H12v4.5h6.46c-.28 1.47-1.11 2.71-2.36 3.55l3.6 2.8c2.1-1.94 3.3-4.8 3.3-8.5z" />
                <path fill="#FBBC05" d="M5.1 14.7l-3.6 2.8C3.4 21.35 7.35 24 12 24c3.24 0 5.97-1.08 7.96-2.91l-3.6-2.8c-1.1.74-2.5 1.18-4.36 1.18-3.26 0-5.99-1.76-6.9-4.77z" />
                <path fill="#34A853" d="M1.5 7.5A12.9 12.9 0 001.5 16.5l3.6-2.8c-.24-.63-.35-1.3-.35-1.95s.11-1.32.35-1.95L1.5 7.5z" />
              </svg>
              Continue with Google
            </Button>

            */}
          </form>

          {/* Footer Redirection */}
          <p className="text-center text-neutral-500 mt-4 text-xs font-medium">
            New to eye fitness?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-[#ff7a00] font-bold hover:text-orange-600 inline-flex items-center gap-0.5 transition focus:outline-none"
            >
              Create Account
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </p>
        </div>

        {/* Footer Brand Label */}
        <div className="text-center mt-3 text-[10px] text-neutral-400 font-medium tracking-wide">
          🔒 Secured by End-to-End Encryption
        </div>

      </motion.div>
    </div>
  );
};

export default Login;