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

import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

import { auth } from "../../firebase";

const Signup = () => {

  const navigate = useNavigate();

  // FORM STATES
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");

  // UI STATES
  const [agreedToTerms, setAgreedToTerms]
    = useState(false);

  const [loading, setLoading]
    = useState(false);

  const [error, setError]
    = useState("");

  const [showPassword, setShowPassword]
    = useState(false);

  // OTP STATES
  const [otp, setOtp] = useState("");

  const [showOtpInput, setShowOtpInput]
    = useState(false);

  const [isMobileVerified, setIsMobileVerified]
    = useState(false);

  const [otpLoading, setOtpLoading]
    = useState(false);

  // SEND OTP
  const sendOtp = async () => {

    if (!mobile || mobile.length !== 10) {

      alert("Enter valid mobile number");

      return;

    }

    try {

      setOtpLoading(true);

      // Prevent multiple recaptcha render
      if (!window.recaptchaVerifier) {

        window.recaptchaVerifier =
          new RecaptchaVerifier(
            auth,
            "recaptcha-container",
            {}
          );

      }

      const appVerifier =
        window.recaptchaVerifier;

      const confirmationResult =
        await signInWithPhoneNumber(
          auth,
          "+91" + mobile,
          appVerifier
        );

      window.confirmationResult =
        confirmationResult;

      setShowOtpInput(true);

      alert("OTP Sent Successfully");

    } catch (error) {

      console.log(error);

      alert("Failed To Send OTP");

    } finally {

      setOtpLoading(false);

    }

  };

  // VERIFY OTP
  const verifyOtp = async () => {

    try {

      setOtpLoading(true);

      await window.confirmationResult.confirm(
        otp
      );

      setIsMobileVerified(true);

      alert("Mobile Verified Successfully");

    } catch (error) {

      console.log(error);

      alert("Invalid OTP");

    } finally {

      setOtpLoading(false);

    }

  };

  // HANDLE SIGNUP
  const handleSignup = async (e) => {

    e.preventDefault();

    setError("");

    if (!isMobileVerified) {

      setError(
        "Please verify your mobile number first."
      );

      return;

    }

    if (!agreedToTerms) {

      setError(
        "Please accept Terms & Conditions."
      );

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

      const data =
        await signupUser(userData);

      localStorage.setItem(
        "token",
        data.token
      );

      navigate("/login");

    } catch (err) {

      console.log(err);

      setError(
        err.response?.data?.message ||
        "Signup failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="h-screen w-screen bg-[#fafafa] flex items-center justify-center px-4 overflow-hidden relative selection:bg-orange-100">

      {/* Background Glow */}
      <div className="absolute top-[15%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-tr from-orange-200/30 to-amber-200/20 rounded-full blur-[110px] pointer-events-none z-0" />

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.4,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="relative z-10 w-full max-w-[365px] flex flex-col"
      >

        {/* Header */}
        <div className="text-center mb-3">

          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#ff7a00] shadow-sm mb-1.5">
            <Eye className="text-white w-5 h-5" />
          </div>

          <h1 className="text-xl font-bold tracking-tight text-neutral-900">
            Create Account
          </h1>

          <p className="text-[11px] text-neutral-500 font-medium">
            Start your child’s eye fitness journey today
          </p>

        </div>

        {/* Card */}
        <div className="bg-white rounded-[24px] border border-neutral-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04),0_1px_2px_rgb(0,0,0,0.02)] p-4 sm:p-5 transition-all">

          {/* Error */}
          {
            error && (

              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: 1,
                  height: "auto",
                }}
                className="mb-2.5 p-2 bg-red-50 text-red-600 text-[11px] font-medium rounded-xl border border-red-100"
              >
                {error}
              </motion.div>

            )
          }

          {/* Form */}
          <form
            onSubmit={handleSignup}
            className="space-y-2.5"
          >

            {/* Name */}
            <div className="space-y-1">

              <Label
                htmlFor="name"
                className="text-[11px] font-semibold text-neutral-700"
              >
                Full Name
              </Label>

              <div className="flex items-center bg-neutral-50/60 border border-neutral-200 rounded-xl px-3 h-10">

                <User className="text-[#ff7a00] w-3.5 h-3.5" />

                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  className="border-0 bg-transparent shadow-none focus-visible:ring-0 text-xs ml-2"
                  value={name}
                  onChange={(e)=>
                    setName(e.target.value)
                  }
                  required
                />

              </div>

            </div>

            {/* Email */}
            <div className="space-y-1">

              <Label
                htmlFor="email"
                className="text-[11px] font-semibold text-neutral-700"
              >
                Email Address
              </Label>

              <div className="flex items-center bg-neutral-50/60 border border-neutral-200 rounded-xl px-3 h-10">

                <Mail className="text-[#ff7a00] w-3.5 h-3.5" />

                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="border-0 bg-transparent shadow-none focus-visible:ring-0 text-xs ml-2"
                  value={email}
                  onChange={(e)=>
                    setEmail(e.target.value)
                  }
                  required
                />

              </div>

            </div>

            {/* Mobile + Age */}
            <div className="grid grid-cols-12 gap-2">

              {/* MOBILE */}
              <div className="col-span-8 space-y-1">

                <Label
                  htmlFor="mobile"
                  className="text-[11px] font-semibold text-neutral-700"
                >
                  Mobile
                </Label>

                <div className="flex items-center bg-neutral-50/60 border border-neutral-200 rounded-xl px-2.5 h-10">

                  <Phone className="text-[#ff7a00] w-3.5 h-3.5" />

                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="Mobile number"
                    className="border-0 bg-transparent shadow-none focus-visible:ring-0 text-xs ml-1.5"
                    value={mobile}
                    onChange={(e)=>
                      setMobile(
                        e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 10)
                      )
                    }
                    maxLength={10}
                    required
                  />

                </div>

                {/* VERIFY BUTTON */}
                {
                  !isMobileVerified && (

                    <button
                      type="button"
                      onClick={sendOtp}
                      disabled={
                        otpLoading ||
                        mobile.length !== 10
                      }
                      className="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white text-[11px] font-semibold rounded-xl h-9 transition-all disabled:bg-neutral-300"
                    >
                      {
                        otpLoading
                          ? "Sending OTP..."
                          : "Verify Mobile"
                      }
                    </button>

                  )
                }

                {/* OTP INPUT */}
                {
                  showOtpInput &&
                  !isMobileVerified && (

                    <div className="mt-2 space-y-2">

                      <Input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e)=>
                          setOtp(e.target.value)
                        }
                        className="h-9 text-xs rounded-xl"
                      />

                      <button
                        type="button"
                        onClick={verifyOtp}
                        className="w-full bg-green-500 hover:bg-green-600 text-white text-[11px] font-semibold rounded-xl h-9 transition-all"
                      >
                        Verify OTP
                      </button>

                    </div>

                  )
                }

                {/* VERIFIED */}
                {
                  isMobileVerified && (

                    <div className="mt-2 text-green-600 text-[11px] font-bold">
                      ✅ Mobile Verified
                    </div>

                  )
                }

              </div>

              {/* AGE */}
              <div className="col-span-4 space-y-1">

                <Label
                  htmlFor="age"
                  className="text-[11px] font-semibold text-neutral-700"
                >
                  Age
                </Label>

                <div className="flex items-center bg-neutral-50/60 border border-neutral-200 rounded-xl px-2.5 h-10">

                  <Input
                    id="age"
                    type="number"
                    placeholder="Age"
                    className="border-0 bg-transparent shadow-none focus-visible:ring-0 text-xs text-center"
                    value={age}
                    onChange={(e)=>
                      setAge(e.target.value)
                    }
                    required
                  />

                </div>

              </div>

            </div>

            {/* PASSWORD */}
            <div className="space-y-1">

              <Label
                htmlFor="password"
                className="text-[11px] font-semibold text-neutral-700"
              >
                Password
              </Label>

              <div className="flex items-center bg-neutral-50/60 border border-neutral-200 rounded-xl px-3 h-10">

                <Lock className="text-[#ff7a00] w-3.5 h-3.5" />

                <Input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Create password"
                  className="border-0 bg-transparent shadow-none focus-visible:ring-0 text-xs ml-2"
                  value={password}
                  onChange={(e)=>
                    setPassword(e.target.value)
                  }
                  required
                />

                <button
                  type="button"
                  onClick={()=>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >
                  {
                    showPassword
                      ? <EyeOff className="w-3.5 h-3.5" />
                      : <Eye className="w-3.5 h-3.5" />
                  }
                </button>

              </div>

            </div>

            {/* TERMS */}
            <div className="flex items-start gap-2 pt-0.5">

              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked)=>
                  setAgreedToTerms(!!checked)
                }
              />

              <Label
                htmlFor="terms"
                className="text-[10px] text-neutral-500"
              >
                I agree to Terms & Privacy.
              </Label>

            </div>

            {/* SUBMIT */}
            <Button
              type="submit"
              disabled={
                loading ||
                !agreedToTerms ||
                !isMobileVerified
              }
              className="w-full h-10 bg-[#ff7a00] hover:bg-orange-600 text-white rounded-xl font-semibold text-xs"
            >

              {
                loading
                  ? "Creating..."
                  : (
                    <>
                      <LogIn className="w-3.5 h-3.5 mr-1" />
                      Create Account
                    </>
                  )
              }

            </Button>

            {/* LOGIN */}
            <p className="text-center text-neutral-500 mt-4 text-xs font-medium">

              Already have an account?{" "}

              <button
                type="button"
                onClick={()=>
                  navigate("/login")
                }
                className="text-[#ff7a00] font-bold inline-flex items-center gap-0.5"
              >
                Login
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

            </p>

          </form>

        </div>

        {/* FOOTER */}
        <div className="text-center mt-3 text-[10px] text-neutral-400 font-medium tracking-wide">
          🔒 Secured by End-to-End Encryption
        </div>

        {/* FIREBASE RECAPTCHA */}
        <div id="recaptcha-container"></div>

      </motion.div>

    </div>

  );

};

export default Signup;