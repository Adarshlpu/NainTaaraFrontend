import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, LogIn, ArrowRight,Mail } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!email || !password) {
        setError("Please fill in all fields");
        setLoading(false);
        return;
      }

      const loginData = { email, password };
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
    // 💡 DUB THEME: Pure Canvas White layout without heavy gradients or soft colorful background blur blobs
    <div className="h-screen w-screen bg-[#ffffff] flex items-center justify-center px-4 overflow-hidden relative text-[#0a0a0a] font-sans selection:bg-slate-100">
      
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[365px] flex flex-col"
      >
        {/* Crisp Marketing Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#000000] mb-3">
            <Eye className="text-white w-5 h-5 stroke-[2]" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0a0a0a]">Nainocular</h1>
          <p className="text-xs text-[#404040] mt-1">Your premium eye fitness partner</p>
        </div>

        {/* Outlined Container Card Panel */}
        <div className="bg-white rounded-xl border border-[#e5e5e5] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] p-6 text-left">
          
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-4 p-3 bg-red-50 text-red-600 text-xs font-medium rounded-lg border border-red-100"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Email Form Field Framework */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-medium text-[#0a0a0a]">Email</Label>
              <div className="flex items-center bg-white border border-[#d4d4d4] rounded-lg px-3 h-10 focus-within:border-[#3b82f6] focus-within:ring-4 focus-within:ring-[#3b82f6]/10 transition-all duration-150">
                <Mail className="text-[#404040] w-4 h-4 flex-shrink-0" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="border-0 bg-transparent shadow-none focus-visible:ring-0 placeholder:text-neutral-400 text-[#111827] text-sm ml-2 h-full w-full p-0"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                 
                  disabled={loading}
                  required
                />
              </div>
            </div>

            {/* Password Form Field Framework */}
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs font-medium text-[#0a0a0a]">Password</Label>
              <div className="flex items-center bg-white border border-[#d4d4d4] rounded-lg px-3 h-10 focus-within:border-[#3b82f6] focus-within:ring-4 focus-within:ring-[#3b82f6]/10 transition-all duration-150">
                <Lock className="text-[#404040] w-4 h-4 flex-shrink-0" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="border-0 bg-transparent shadow-none focus-visible:ring-0 placeholder:text-neutral-400 text-[#111827] text-sm ml-2 h-full w-full p-0"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-neutral-400 hover:text-[#0a0a0a] transition focus:outline-none ml-2 bg-transparent border-0 p-0 cursor-pointer"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Configuration Grid */}
            <div className="flex justify-between items-center text-xs pt-0.5">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" className="rounded border-[#d4d4d4] data-[state=checked]:bg-[#000000] data-[state=checked]:border-[#000000] h-4 w-4 shadow-none" />
                <Label htmlFor="remember" className="text-[#404040] font-normal cursor-pointer text-xs">
                  Remember me
                </Label>
              </div>

              {/* 💡 DIALOG COMPONENT: Fully restored and styled to clean monochrome specification bounds */}
              <Dialog>
                <DialogTrigger asChild>
                  <button type="button" className="text-xs text-[#3b82f6] hover:underline font-medium transition focus:outline-none bg-transparent border-0 p-0 cursor-pointer">
                    Forgot Password?
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-[350px] bg-white rounded-xl border border-[#e5e5e5] shadow-md p-6">
                  <DialogHeader className="text-left">
                    <DialogTitle className="text-base font-bold text-[#0a0a0a]">Reset Password</DialogTitle>
                    <DialogDescription className="text-xs text-[#404040] mt-1">
                      Enter your email to receive a password reset link.
                    </DialogDescription>
                  </DialogHeader>
                  {/* <div className="space-y-3 pt-4">
                    <Input placeholder="Enter phone number" className="h-10 rounded-lg border-[#d4d4d4] focus-visible:ring-[#3b82f6]/20 text-sm" />
                    <button type="button" className="w-full h-10 bg-[#000000] hover:bg-[#171717] text-white rounded-lg font-medium text-xs uppercase tracking-wider border-0 shadow-sm transition-all active:scale-[0.99]">
                      Send Code
                    </button>
                  </div> */}
                  <div className="space-y-3 pt-4">

  <Input
    type="email"
    placeholder="Enter your email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="h-10 rounded-lg border-[#d4d4d4] focus-visible:ring-[#3b82f6]/20 text-sm"
  />

  <button
    type="button"
    onClick={async () => {

      try {

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/auth/forgot-password`,
  
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              email,
            }),
          }
        );

        const data =
          await response.json();

        alert(data.message);

      } catch(error){

        console.log(error);

        alert("Something went wrong");

      }

    }}

    className="w-full h-10 bg-[#000000] hover:bg-[#171717] text-white rounded-lg font-medium text-xs uppercase tracking-wider border-0 shadow-sm transition-all active:scale-[0.99]"
  >
    Send Reset Link
  </button>

</div>

                </DialogContent>
              </Dialog>
            </div>

            {/* Main Filled Action Button: Jet Black Filled Style */}
            <div className="pt-1.5">
              <button
                type="submit"
                disabled={loading}
                className="w-full h-10 bg-[#000000] hover:bg-[#171717] text-white rounded-lg font-medium shadow-sm flex items-center justify-center gap-1.5 text-xs border-0 transition-all active:scale-[0.985] cursor-pointer"
              >
                {loading ? (
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <LogIn className="w-3.5 h-3.5" />
                    Sign In
                  </>
                )}
              </button>
            </div>

            {/* Hairline Operational Divider */}
            <div className="flex items-center gap-2 py-0.5">
              <div className="flex-1 h-[1px] bg-[#e5e5e5]" />
              <span className="text-[10px] text-neutral-400 font-bold tracking-widest">OR</span>
              <div className="flex-1 h-[1px] bg-[#e5e5e5]" />
            </div>

            {/* Google OAuth Structural Node Component */}
            {/* <button
              type="button"
              disabled={loading}
              className="w-full h-10 bg-white border border-[#e5e5e5] hover:bg-[#f5f5f5] text-[#0a0a0a] rounded-lg font-medium flex items-center justify-center gap-2 text-xs shadow-none transition-all cursor-pointer active:scale-[0.985]"
            > */}
              {/* <svg className="w-3 h-3 mr-0.5" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5.04c1.64 0 3.12.56 4.28 1.67l3.2-3.2C17.52 1.58 14.96 1 12 1 7.35 1 3.4 3.65 1.5 7.5l3.6 2.8C6.01 6.8 8.74 5.04 12 5.04z" />
                <path fill="#4285F4" d="M23.5 12.25c0-.82-.07-1.6-.2-2.35H12v4.5h6.46c-.28 1.47-1.11 2.71-2.36 3.55l3.6 2.8c2.1-1.94 3.3-4.8 3.3-8.5z" />
                <path fill="#FBBC05" d="M5.1 14.7l-3.6 2.8C3.4 21.35 7.35 24 12 24c3.24 0 5.97-1.08 7.96-2.91l-3.6-2.8c-1.1.74-2.5 1.18-4.36 1.18-3.26 0-5.99-1.76-6.9-4.77z" />
                <path fill="#34A853" d="M1.5 7.5A12.9 12.9 0 001.5 16.5l3.6-2.8c-.24-.63-.35-1.3-.35-1.95s.11-1.32.35-1.95L1.5 7.5z" />
              </svg> */}
              {/* Continue with Google */}
            {/* </button> */}
          </form>

          {/* Footer Redirection Map */}
          <p className="text-center text-[#404040] mt-5 text-xs font-normal">
            New to eye fitness?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-[#3b82f6] font-medium hover:underline inline-flex items-center gap-0.5 transition focus:outline-none bg-transparent border-0 p-0 cursor-pointer"
            >
              Create Account
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </p>
        </div>

        {/* Footer Brand Encryption Label */}
        <div className="text-center mt-4 text-[10px] text-neutral-400 font-normal tracking-wide">
          🔒 Secured by End-to-End Encryption
        </div>

      </motion.div>
    </div>
  );
};

export default Login;