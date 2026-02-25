import { useNavigate } from "react-router-dom";
import HomeUI from "../ui/HomeUI";

function Home() {
  const API_BASE = import.meta.env.VITE_API_BASE;
  const navigate = useNavigate();

  const handleLogin = () => {
    window.location.href = `${API_BASE}/auth/login`;
  };

  const openPromptMode = () => {
    localStorage.setItem("dashboardMode", "prompt");
    navigate("/dashboard?mode=prompt");
  };

  const openStructuredMode = () => {
    localStorage.setItem("dashboardMode", "structured");
    navigate("/dashboard?mode=structured");
  };

  const openPreviewDashboard = () => {
    navigate("/dashboard?preview=true");
  };

  return (
    <HomeUI
      handleLogin={handleLogin}
      openPromptMode={openPromptMode}
      openStructuredMode={openStructuredMode}
      openPreviewDashboard={openPreviewDashboard}
    />
  );
}

export default Home;