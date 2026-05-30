import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, User, Mail, Smartphone, Shield, Eye, Calendar, Sparkles, Loader2 } from "lucide-react";
import axios from "axios";

// Shadcn UI Elements
import { Button } from "../../components/ui/button";

// ─── Dub Token Based Skeleton Helper ──────────────────────────────────────────
const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-[#f5f5f5] rounded ${className}`} />
);

// ─── Full Profile Page Skeleton + Dub Spinner UI ──────────────────────────────
const ProfileSkeleton = () => (
  <div className="flex-1 flex flex-col justify-center items-center py-12 space-y-8 w-full">
    {/* Central Loading Indicator (Dub Minimal Utility Theme) */}
    <div className="flex flex-col items-center justify-center space-y-3 z-30">
      <div className="w-8 h-8 border-2 border-[#e5e5e5] border-t-[#000000] rounded-full animate-spin" />
      <p className="text-[11px] text-[#404040] font-medium tracking-tight">Loading secure profile container...</p>
    </div>

    {/* Dummy-Safe Skeleton Layout Grid */}
    <div className="w-full flex flex-col gap-6 opacity-40 select-none pointer-events-none">
      {/* Primary Identity Frame Skeleton */}
      <div className="bg-[#ffffff] rounded-xl p-6 border border-[#e5e5e5] flex items-center gap-6">
        <Skeleton className="w-20 h-20 rounded-xl" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      {/* Bento Grid Boxes Skeleton */}
      <div className="grid md:grid-cols-2 gap-6">
        <Skeleton className="h-40 rounded-xl" />
        <Skeleton className="h-40 rounded-xl" />
      </div>
    </div>
  </div>
);

// ─── Main Profile Page Component (Dub Architecture) ───────────────────────────
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

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true
          }
        );

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

  return (
    <div className="min-h-screen bg-[#ffffff] antialiased py-8 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto w-full select-none">
      
      {/* BACK ACTION CONTROL BAR */}
      <div className="mb-8 flex items-center justify-between border-b border-[#e5e5e5] pb-4">
        <Button 
          onClick={() => navigate("/dashboard")} 
          variant="outline" 
          className="h-9 border-[#e5e5e5] bg-[#ffffff] hover:bg-[#f5f5f5] text-[#0a0a0a] font-medium rounded-lg flex items-center justify-center gap-2 text-xs shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Button>
        <span className="text-[10px] text-[#404040] font-medium uppercase tracking-wider">Secure Profile Layer</span>
      </div>

      {/* ── LOADING PIPELINE CHECKER ── */}
      {loading ? (
        <ProfileSkeleton />
      ) : error ? (
        <div className="p-4 bg-[#ffffff] border border-red-200 text-red-600 rounded-xl text-xs font-medium shadow-sm text-left">
          {error}
        </div>
      ) : (
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          animate="visible"
          className="space-y-6"
        >
          {/* ==================== 1. USER PRIMARY IDENTITY CARD ==================== */}
          <motion.div variants={itemVariants} className="bg-[#ffffff] border border-[#e5e5e5] rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden shadow-sm">
            <div className="w-16 h-16 rounded-xl bg-[#000000] flex items-center justify-center text-[#ffffff] text-2xl font-medium shadow-sm">
              {profileData?.name?.charAt(0).toUpperCase() || "P"}
            </div>

            <div className="text-center sm:text-left flex-1 space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-xl font-medium text-[#0a0a0a] tracking-tight">{profileData?.name}</h1>
                {/* Pill Tag Variant Token */}
                <span className="bg-[#dcfce7] text-[#16a34a] text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Active Profile
                </span>
              </div>
              <p className="text-[#404040] text-xs font-normal">Patient ID: {profileData?._id?.slice(-8).toUpperCase()}</p>
              
              {/* Account metadata timeline badges */}
              <div className="pt-2 flex flex-wrap justify-center sm:justify-start gap-4 text-xs font-normal text-[#404040]">
                <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[#404040]" /> Age: {profileData?.age || "—"} Years</div>
                <div className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-[#404040]" /> Status: {profileData?.isVerified ? "Verified Account" : "Standard Compliance"}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ==================== 2. METRIC MATRIX GRID (BENTO LOOK) ==================== */}
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Card 1: Account Attributes (Dub Outlined Specifications) */}
            <motion.div variants={itemVariants} className="bg-[#ffffff] border border-[#e5e5e5] rounded-xl p-5 shadow-sm text-left">
              <h3 className="text-xs font-medium text-[#0a0a0a] uppercase tracking-wider mb-4 pb-2 border-b border-[#e5e5e5] flex items-center gap-2">
                <User className="w-4 h-4 text-[#3b82f6]" /> Account Attributes
              </h3>
              <div className="space-y-3 text-xs font-normal">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#f5f5f5]">
                  <span className="text-[#404040] flex items-center gap-2"><Mail className="w-4 h-4" /> Email Address</span>
                  <span className="text-[#0a0a0a] font-medium">{profileData?.email || "Not specified"}</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#f5f5f5]">
                  <span className="text-[#404040] flex items-center gap-2"><Smartphone className="w-4 h-4" /> Registered Mobile</span>
                  <span className="text-[#0a0a0a] font-medium">{profileData?.mobile || "—"}</span>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Clinical Ophthalmic Diagnostics */}
            <motion.div variants={itemVariants} className="bg-[#ffffff] border border-[#e5e5e5] rounded-xl p-5 shadow-sm text-left">
              <h3 className="text-xs font-medium text-[#0a0a0a] uppercase tracking-wider mb-4 pb-2 border-b border-[#e5e5e5] flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#3b82f6]" /> Ophthalmic Diagnosis
              </h3>
              <div className="space-y-3 text-xs font-normal">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-2.5 bg-[#f5f5f5] rounded-lg text-center border border-[#e5e5e5]">
                    <span className="text-[10px] text-[#404040] uppercase font-medium tracking-wider">Left Eye Power</span>
                    <p className="text-base font-medium text-[#0a0a0a] mt-0.5">{profileData?.leftEyePower || "0.00"}</p>
                  </div>
                  <div className="p-2.5 bg-[#f5f5f5] rounded-lg text-center border border-[#e5e5e5]">
                    <span className="text-[10px] text-[#404040] uppercase font-medium tracking-wider">Right Eye Power</span>
                    <p className="text-base font-medium text-[#0a0a0a] mt-0.5">{profileData?.rightEyePower || "0.00"}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#f5f5f5] border border-[#e5e5e5]">
                  <span className="text-[#404040]">Diagnosed Condition</span>
                  <span className="bg-[#0a0a0a] text-[#ffffff] text-[11px] font-medium px-2.5 py-0.5 rounded-md">
                    {profileData?.eyeCondition || "General Vision Fitness"}
                  </span>
                </div>
              </div>
            </motion.div>

          </div>

          {/* ==================== 3. RUNTIME INFORMATION REGULATION STRIP ==================== */}
          <motion.div variants={itemVariants} className="bg-[#f5f5f5] border border-[#e5e5e5] rounded-xl p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <div className="space-y-0.5">
              <h4 className="font-medium text-sm text-[#0a0a0a]">Need to update clinical records?</h4>
              <p className="text-[#404040] text-xs">Please contact your pediatric panel doctor to change correction power coordinates.</p>
            </div>
            {/* Primary Action Button Treatment */}
            <Button asChild className="h-9 px-4 bg-[#000000] hover:bg-[#171717] text-[#ffffff] text-xs font-medium rounded-lg border-0 shadow-sm transition-all active:scale-[0.98]">
              <Link to="/contact">Support Center</Link>
            </Button>
          </motion.div>

        </motion.div>
      )}
    </div>
  );
};

export default Profile;