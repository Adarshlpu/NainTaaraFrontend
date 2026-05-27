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
import EyeMovementTrainer from "./pages/Games/EyeMovementTrainer/EyeMovementTrainer";



const ProtectedRoute = ({ children}) =>{
  const token = localStorage.getItem("token");

  return token 
  ? children 
  : <Navigate to = "/login" />;

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
    </Routes>
  );
}

export default App;