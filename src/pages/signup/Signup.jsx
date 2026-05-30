import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  ArrowRight,
  LogIn,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Shadcn UI Elements
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Checkbox } from "../../components/ui/checkbox";

import { signupUser } from "../../api/authApi";

const Signup = () => {
  const navigate = useNavigate();

  // FORM STATES
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");

  // UI STATES
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!agreedToTerms) {
      setError("Please accept Terms & Conditions.");
      return;
    }

    setLoading(true);

    try {
      const userData = {
        name,
        email,
        mobile,
        password,
        age,
      };

      const data = await signupUser(userData);
      localStorage.setItem("token", data.token);
      alert("Signup Successful");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    // ─── Dub Canvas Minimal White Workspace Base Layer ───
    <div className="h-screen w-screen bg-[#ffffff] flex items-center justify-center px-4 overflow-hidden relative text-[#0a0a0a] font-sans selection:bg-[#f5f5f5]">
      
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.4,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="relative z-10 w-full max-w-[365px] flex flex-col"
      >
        {/* Crisp Marketing Horizontal Header (Logo Fixed to Side Arrangement) */}
        <div className="text-center mb-4 flex flex-col items-center">
          <div className="flex items-center gap-2.5">
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#000000] shrink-0">
              <Eye className="text-[#ffffff] w-4 h-4" />
            </div>
            <h1 className="text-xl font-medium tracking-tight text-[#0a0a0a]">
              Create Account
            </h1>
          </div>
          <p className="text-xs text-[#404040] mt-1.5">
            Start your child’s eye fitness journey today
          </p>
        </div>

        {/* Outlined Container Card Panel (Dub Outlined Component Matrix) */}
        <div className="bg-[#ffffff] rounded-xl border border-[#e5e5e5] shadow-sm p-5 transition-all text-left">

          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-3 p-2.5 bg-[#ffffff] text-red-600 text-xs font-medium rounded-lg border border-red-200"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSignup} className="space-y-3">

            {/* Name Input Field Layer */}
            <div className="space-y-1">
              <Label htmlFor="name" className="text-xs font-medium text-[#0a0a0a]">
                Full Name
              </Label>
              <div className="flex items-center bg-[#ffffff] border border-[#d4d4d4] rounded-lg px-3 h-10 focus-within:border-[#3b82f6] focus-within:ring-4 focus-within:ring-[#3b82f6]/10 transition-all duration-150">
                <User className="text-[#404040] w-4 h-4 flex-shrink-0" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="border-0 bg-transparent shadow-none focus-visible:ring-0 placeholder:text-[#404040]/40 text-[#111827] text-sm ml-2 h-full w-full p-0"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
            </div>

            {/* Email Input Field Layer */}
            <div className="space-y-1">
              <Label htmlFor="email" className="text-xs font-medium text-[#0a0a0a]">
                Email Address
              </Label>
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

            {/* Mobile + Age Grid System */}
            <div className="grid grid-cols-12 gap-2.5">
              {/* MOBILE */}
              <div className="col-span-8 space-y-1">
                <Label htmlFor="mobile" className="text-xs font-medium text-[#0a0a0a]">
                  Mobile
                </Label>
                <div className="flex items-center bg-[#ffffff] border border-[#d4d4d4] rounded-lg px-3 h-10 focus-within:border-[#3b82f6] focus-within:ring-4 focus-within:ring-[#3b82f6]/10 transition-all duration-150">
                  <Phone className="text-[#404040] w-4 h-4 flex-shrink-0" />
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="9876543210"
                    className="border-0 bg-transparent shadow-none focus-visible:ring-0 placeholder:text-[#404040]/40 text-[#111827] text-sm ml-2 h-full w-full p-0"
                    value={mobile}
                    onChange={(e) =>
                      setMobile(
                        e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 10)
                      )
                    }
                    disabled={loading}
                    maxLength={10}
                    required
                  />
                </div>
              </div>

              {/* AGE */}
              <div className="col-span-4 space-y-1">
                <Label htmlFor="age" className="text-xs font-medium text-[#0a0a0a]">
                  Age
                </Label>
                <div className="flex items-center bg-[#ffffff] border border-[#d4d4d4] rounded-lg px-2 h-10 focus-within:border-[#3b82f6] focus-within:ring-4 focus-within:ring-[#3b82f6]/10 transition-all duration-150">
                  <Input
                    id="age"
                    type="number"
                    placeholder="12"
                    className="border-0 bg-transparent shadow-none focus-visible:ring-0 placeholder:text-[#404040]/40 text-[#111827] text-sm h-full w-full p-0 text-center"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
              </div>
            </div>

            {/* PASSWORD */}
            <div className="space-y-1">
              <Label htmlFor="password" className="text-xs font-medium text-[#0a0a0a]">
                Password
              </Label>
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

            {/* TERMS AND PRIVACY CHECKBOX */}
            <div className="flex items-start gap-2 pt-1">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(!!checked)}
                className="rounded border-[#d4d4d4] data-[state=checked]:bg-[#000000] data-[state=checked]:border-[#000000] h-4 w-4 shadow-none"
                disabled={loading}
              />
              <Label
                htmlFor="terms"
                className="text-[11px] text-[#404040] font-normal cursor-pointer leading-tight"
              >
                I agree to the Terms & Privacy Policy.
              </Label>
            </div>

            {/* Main Filled Action Button: Jet Black Filled Style */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading || !agreedToTerms}
                className="w-full h-10 bg-[#000000] hover:bg-[#171717] disabled:bg-[#f5f5f5] disabled:text-[#404040] disabled:border disabled:border-[#e5e5e5] disabled:cursor-not-allowed text-[#ffffff] rounded-lg font-medium shadow-sm flex items-center justify-center gap-1.5 text-xs border-0 transition-all active:scale-[0.985] cursor-pointer"
              >
                {loading ? (
                  <div className="w-3.5 h-3.5 border-2 border-[#ffffff] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <LogIn className="w-3.5 h-3.5" />
                    Create Account
                  </>
                )}
              </button>
            </div>

            {/* Hairline Operational Divider Framework */}
            <div className="flex items-center gap-2 py-1">
              <div className="flex-1 h-[1px] bg-[#e5e5e5]" />
              <span className="text-[10px] text-[#404040] font-medium tracking-widest">OR</span>
              <div className="flex-1 h-[1px] bg-[#e5e5e5]" />
            </div>
          </form>

          {/* Login Redirect Belt */}
          <p className="text-center text-[#404040] mt-4 text-xs font-normal">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-[#3b82f6] font-medium hover:underline inline-flex items-center gap-0.5 transition focus:outline-none bg-transparent border-0 p-0 cursor-pointer"
            >
              Login
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

export default Signup;