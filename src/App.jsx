import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/signup/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import Rewards from "./pages/Rewards/Rewards";
import Games from "./pages/Games/Games";
// import Reports from "./pages/Reports/Reports";
import Shape from "./pages/Games/ShapeMatching/shape";
import OddNout from "./pages/Games/oddnoutcolor/OddNout";
// import EyeBlink from "./pages/Games/EyeBlink/EyeBlink";
import { Navigate } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import PrivacyPolicy from "./pages/privacy-policy";
import TermsAndConditions from "./pages/terms-and-conditions";
import CookiesPolicy from "./pages/cookies-policy";
import About from "./pages/About";

// FIXED: Imported your index.jsx (Blog feed) and BlogPostDetail.jsx cleanly 
import Blog from "./pages/Blog";
import BlogPostDetail from "./pages/Blog/BlogPostDetail";

import Contact from "./pages/Contact";
import EyeMovementTrainer from "./pages/Games/EyeMovementTrainer/EyeMovementTrainer";
import ColorBlindnessTest from "./pages/Games/ColorBlindnessTest/ColorBlindnessTest";


const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  return token 
    ? children 
    : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />

      <Route path="/rewards" element={
        <ProtectedRoute>
          <Rewards />
        </ProtectedRoute>
      } />

      <Route path="/games" element={
        <ProtectedRoute>
          <Games />
        </ProtectedRoute>
      } />

      {/* <Route path="/reports" element={
        <ProtectedRoute>
          <Reports />
        </ProtectedRoute>
      } /> */}

      <Route path="/games/shape" element={
        <ProtectedRoute>
          <Shape />
        </ProtectedRoute>
      } />

      <Route
        path="/games/oddnout"
        element={
          <ProtectedRoute>
            <OddNout />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/games/colorblindness"
        element={
          <ProtectedRoute>
            <ColorBlindnessTest />
          </ProtectedRoute>
        }
      />  
      
      {/* <Route
        path="/games/eyeblink"
        element={
          <ProtectedRoute>
            <EyeBlink />
          </ProtectedRoute>
        }
      /> */}
      
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />

      <Route path="/games/eyemovement" element={
        <ProtectedRoute>
          <EyeMovementTrainer />
        </ProtectedRoute>
      } />

      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      <Route path="/cookies-policy" element={<CookiesPolicy />} />

      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      {/* ==================== BLOG CHANNELS ROUTES ==================== */}
      {/* Absolute master feed list route */}
      <Route path="/blog" element={<Blog />} />
      
      {/* 🌟 Dynamic single sub-path template injection link */}
      <Route path="/blog/:slug" element={<BlogPostDetail />} />

    </Routes>
  );
}

export default App;