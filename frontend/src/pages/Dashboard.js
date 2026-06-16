import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputLayer from "../components/InputLayer";
import RealTimeEmotionDetector from "../components/RealTimeEmotionDetector";
import EmotionalHeatMap from "../components/EmotionalHeatMap";
import EmotionHistory from "../components/EmotionHistory";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 2rem", background: "#2992bb", color: "white", borderRadius: "0 0 12px 12px" }}>
        <h2 style={{ margin: 0 }}>Dashboard Emosync</h2>
        <button onClick={handleLogout} style={{ background: "#e53935", color: "white", border: "none", padding: "0.5rem 1rem", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", transition: "background-color 0.3s" }}>
          Keluar
        </button>
      </div>
      <InputLayer />
      <RealTimeEmotionDetector />
      <EmotionalHeatMap />
      <EmotionHistory />
    </div>
  );
}
export default Dashboard;
