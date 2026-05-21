import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import Rewards from "./pages/rewards/Rewards";
import Games from "./pages/games/Games";
import Reports from "./pages/reports/Reports";
import Shape from "./pages/Games/ShapeMatching/shape";
import OddNout from "./pages/Games/oddnoutcolor/OddNout";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/rewards" element={<Rewards />} />
      <Route path="/games" element={<Games />} />
<Route path="/reports" element={<Reports />} />
<Route path="/games/shape" element={<Shape />} />
<Route
  path="/games/oddnout"
  element={<OddNout />}
/>
    </Routes>
  );
}

export default App;