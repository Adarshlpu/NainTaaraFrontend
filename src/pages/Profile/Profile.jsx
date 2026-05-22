import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, User, Mail, Smartphone, Shield, Eye, Calendar, Sparkles, Loader2 } from "lucide-react";
import axios from "axios";

// Shadcn UI Elements
import { Button } from "../../components/ui/button";

const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Session expired. Please log in again.");
          setLoading(false);
          return;
        }

        // Live user model sync data parameters from database
        const response = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data && response.data.user) {
          setProfileData(response.data.user);
        }
      } catch (err) {
        console.error("Profile view sync fail error:", err);
        setError("Failed to load user profile metrics.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#ff7a00] animate-spin" />
        <p className="text-sm font-semibold text-neutral-500 mt-3">Loading secure profile container...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] antialiased selection:bg-orange-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* BACK ACTION CONTROL BAR */}
        <div className="mb-8 flex items-center justify-between">
          <Button 
            onClick={() => navigate("/dashboard")} 
            variant="outline" 
            className="h-10 border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 font-bold rounded-xl flex items-center justify-center gap-2 text-xs shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Button>
          <span className="text-xs text-neutral-400 font-bold uppercase tracking-wider">Secure Profile Layer</span>
        </div>

        {error ? (
          <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-bold shadow-sm">
            {error}
          </div>
        ) : (
          <motion.div 
            variants={containerVariants} 
            initial="hidden" 
            animate="visible"
            className="space-y-6"
          >
            {/* 🌟 USER PRIMARY IDENTITY CARD */}
            <motion.div variants={itemVariants} className="bg-white border border-neutral-200/60 rounded-[24px] p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.01)] flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-44 h-44 bg-orange-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#ff7a00] to-orange-600 flex items-center justify-center text-white text-3xl font-black shadow-md shadow-orange-500/10">
                {profileData?.name?.charAt(0).toUpperCase()}
              </div>

              <div className="text-center sm:text-left flex-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                  <h1 className="text-2xl font-black text-neutral-900 tracking-tight">{profileData?.name}</h1>
                  <span className="bg-orange-50 border border-orange-100 text-[#ff7a00] text-[10px] font-bold px-2.5 py-0.5 rounded-lg flex items-center gap-1">
                    <Sparkles className="w-3 h-3 animate-pulse" /> Active Patient
                  </span>
                </div>
                <p className="text-neutral-400 text-xs font-semibold mt-1">Patient ID: {profileData?._id?.slice(-8).toUpperCase()}</p>
                
                {/* Account metadata timeline badges */}
                <div className="mt-4 flex flex-wrap gap-4 text-xs font-bold text-neutral-500">
                  <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-neutral-400" /> Age: {profileData?.age} Years</div>
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-neutral-400" /> Status: {profileData?.isVerified ? "Verified Account" : "Standard Compliance"}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 🌟 METRIC MATRIX GRID (BENTO CARD LOOK) */}
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Card 1: Account Core Details */}
              <motion.div variants={itemVariants} className="bg-white border border-neutral-200/60 rounded-[24px] p-6 shadow-sm">
                <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wider mb-5 pb-2 border-b border-neutral-100 flex items-center gap-2">
                  <User className="w-4 h-4 text-[#ff7a00]" /> Account Attributes
                </h3>
                <div className="space-y-4 text-sm font-semibold">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-50">
                    <span className="text-neutral-400 flex items-center gap-2"><Mail className="w-4 h-4" /> Email Address</span>
                    <span className="text-neutral-800">{profileData?.email || "Not specified"}</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-50">
                    <span className="text-neutral-400 flex items-center gap-2"><Smartphone className="w-4 h-4" /> Registered Mobile</span>
                    <span className="text-neutral-800">{profileData?.mobile}</span>
                  </div>
                </div>
              </motion.div>

              {/* Card 2: Clinical Ophthalmic Diagnostics */}
              <motion.div variants={itemVariants} className="bg-white border border-neutral-200/60 rounded-[24px] p-6 shadow-sm">
                <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wider mb-5 pb-2 border-b border-neutral-100 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-[#ff7a00]" /> Ophthalmic Diagnosis
                </h3>
                <div className="space-y-4 text-sm font-semibold">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-neutral-50 rounded-xl text-center">
                      <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">Left Eye Power</span>
                      <p className="text-lg font-black text-neutral-800 mt-1">{profileData?.leftEyePower || "0.00"}</p>
                    </div>
                    <div className="p-3 bg-neutral-50 rounded-xl text-center">
                      <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">Right Eye Power</span>
                      <p className="text-lg font-black text-neutral-800 mt-1">{profileData?.rightEyePower || "0.00"}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-orange-50/50 border border-orange-100/30">
                    <span className="text-neutral-500 font-bold">Diagnosed Condition</span>
                    <span className="bg-[#ff7a00] text-white text-xs font-bold px-3 py-1 rounded-lg">
                      {profileData?.eyeCondition || "General Vision Fitness"}
                    </span>
                  </div>
                </div>
              </motion.div>

            </div>

            {/* MNC STYLE INFORMATION REGULATION STRIP */}
            <motion.div variants={itemVariants} className="bg-gradient-to-r from-neutral-900 to-neutral-950 text-white rounded-[24px] p-6 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <h4 className="font-bold text-base">Need to update clinical records?</h4>
                <p className="text-neutral-400 text-xs mt-0.5">Please contact your pediatric panel doctor to change correction power coordinates.</p>
              </div>
              <Button asChild className="h-10 px-5 bg-white hover:bg-neutral-50 text-neutral-950 font-bold rounded-xl border-0 text-xs shadow-none">
                <Link to="/contact">Support Center</Link>
              </Button>
            </motion.div>

          </motion.div>
        )}

      </div>
    </div>
  );
};

export default Profile;