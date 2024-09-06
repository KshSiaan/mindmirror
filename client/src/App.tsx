import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import Home from "./view/Home";
import NotFound from "./view/notFound";
import MouseTracker from "./components/ui/mouseTracker";
import Login from "./view/Login";
import Register from "./view/Register";
import Options from "./view/Options";
import Leaderboard from "./view/Leaderboard";
import Level from "./view/Level";
import Easy from "./view/Easy";
import { isMobile } from "react-device-detect";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/options" element={<Options />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/level" element={<Level />} />
          <Route path="/easymode" element={<Easy />} />
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>

      {/* External functionalities */}
      {isMobile ? "" : <MouseTracker />}
    </>
  );
}

export default App;
