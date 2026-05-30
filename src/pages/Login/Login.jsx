import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, LogIn, ArrowRight, Mail } from "lucide-react";
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
  const [dialogEmail, setDialogEmail] = useState("");
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

      // Safeguard Validation payload map
      const loginData = { 
        email: email.trim().toLowerCase(), 
        password 
      };
      
      const data = await loginUser(loginData);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");
    } catch (err) {
      // Direct extraction of remote backend controller exception responses
      setError(err.response?.data?.message || "Login failed. Please check backend validation.");
      console.error("Backend login stream failure diagnostics:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!dialogEmail) {
      alert("Please enter your email address first");
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: dialogEmail.trim().toLowerCase() }),
        }
      );
      const data = await response.json();
      alert(data.message || "Reset link generated.");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    // ─── Dub Canvas Minimal White Workspace Base Layer ───
    <div className="h-screen w-screen bg-[#ffffff] flex items-center justify-center px-4 overflow-hidden relative text-[#0a0a0a] font-sans selection:bg-[#f5f5f5]">
      
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[365px] flex flex-col"
      >
        {/* Crisp Marketing Horizontal Header */}
        <div className="text-center mb-6 flex flex-col items-center">
          <div className="flex items-center gap-2.5">
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#000000] shrink-0">
              <Eye className="text-[#ffffff] w-4 h-4" />
            </div>
            <h1 className="text-2xl font-medium tracking-tight text-[#0a0a0a]">Nainocular</h1>
          </div>
          <p className="text-xs text-[#404040] mt-1.5">Your premium eye fitness partner</p>
        </div>

        {/* Outlined Container Card Panel */}
        <div className="bg-[#ffffff] rounded-xl border border-[#e5e5e5] shadow-sm p-6 text-left">
          
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-4 p-3 bg-[#ffffff] text-red-600 text-xs font-medium rounded-lg border border-red-200"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Email Input Field Layer */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-medium text-[#0a0a0a]">Email</Label>
              <div className="flex items-center bg-[#ffffff] border border-[#d4d4d4] rounded-lg px-3 h-10 focus-within:border-[#3b82f6] focus-within:ring-4 focus-within:ring-[#3b82f6]/10 transition-all duration-150">
                <Mail className="text-[#404040] w-4 h-4 flex-shrink-0" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="border-0 bg-transparent shadow-none focus-visible:ring-0 placeholder:text-[#404040]/40 text-[#111827] text-sm ml-2 h-full w-full p-0"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
            </div>

            {/* Password Input Field Layer */}
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs font-medium text-[#0a0a0a]">Password</Label>
              <div className="flex items-center bg-[#ffffff] border border-[#d4d4d4] rounded-lg px-3 h-10 focus-within:border-[#3b82f6] focus-within:ring-4 focus-within:ring-[#3b82f6]/10 transition-all duration-150">
                <Lock className="text-[#404040] w-4 h-4 flex-shrink-0" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="border-0 bg-transparent shadow-none focus-visible:ring-0 placeholder:text-[#404040]/40 text-[#111827] text-sm ml-2 h-full w-full p-0"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[#404040] hover:text-[#0a0a0a] transition focus:outline-none ml-2 bg-transparent border-0 p-0 cursor-pointer"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Grid Interface */}
            <div className="flex justify-between items-center text-xs pt-0.5">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" className="rounded border-[#d4d4d4] data-[state=checked]:bg-[#000000] data-[state=checked]:border-[#000000] h-4 w-4 shadow-none" />
                <Label htmlFor="remember" className="text-[#404040] font-normal cursor-pointer text-xs">
                  Remember me
                </Label>
              </div>

              {/* Secure Reset Password Modals Frame */}
              <Dialog>
                <DialogTrigger asChild>
                  <button type="button" className="text-xs text-[#3b82f6] hover:underline font-medium transition focus:outline-none bg-transparent border-0 p-0 cursor-pointer">
                    Forgot Password?
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-[350px] bg-[#ffffff] rounded-xl border border-[#e5e5e5] shadow-md p-6">
                  <DialogHeader className="text-left">
                    <DialogTitle className="text-base font-medium text-[#0a0a0a]">Reset Password</DialogTitle>
                    <DialogDescription className="text-xs text-[#404040] mt-1">
                      Enter your email to receive a password reset link.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-3 pt-4">
                    <Input
                      type="email"
                      placeholder="name@example.com"
                      value={dialogEmail}
                      onChange={(e) => setDialogEmail(e.target.value)}
                      className="h-10 rounded-lg border-[#d4d4d4] focus-visible:ring-[#3b82f6]/20 text-sm bg-white"
                    />
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="w-full h-10 bg-[#000000] hover:bg-[#171717] text-[#ffffff] rounded-lg font-medium text-xs uppercase tracking-wider border-0 shadow-sm transition-all active:scale-[0.99] cursor-pointer"
                    >
                      Send Reset Link
                    </button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Primary Filled CTA Element Block */}
            <div className="pt-1.5">
              <button
                type="submit"
                disabled={loading}
                className="w-full h-10 bg-[#000000] hover:bg-[#171717] text-[#ffffff] rounded-lg font-medium shadow-sm flex items-center justify-center gap-1.5 text-xs border-0 transition-all active:scale-[0.985] cursor-pointer"
              >
                {loading ? (
                  <div className="w-3.5 h-3.5 border-2 border-[#ffffff] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <LogIn className="w-3.5 h-3.5" />
                    Sign In
                  </>
                )}
              </button>
            </div>

            {/* Hairline Operational Divider Framework */}
            <div className="flex items-center gap-2 py-0.5">
              <div className="flex-1 h-[1px] bg-[#e5e5e5]" />
              <span className="text-[10px] text-[#404040] font-medium tracking-widest">OR</span>
              <div className="flex-1 h-[1px] bg-[#e5e5e5]" />
            </div>
          </form>

          {/* Registration Redirect Belt */}
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

        {/* Bottom Platform Encryption Tag */}
        <div className="text-center mt-4 text-[10px] text-[#404040] font-normal tracking-wide">
          🔒 Secured by End-to-End Encryption
        </div>

      </motion.div>
    </div>
  );
};

export default Login;