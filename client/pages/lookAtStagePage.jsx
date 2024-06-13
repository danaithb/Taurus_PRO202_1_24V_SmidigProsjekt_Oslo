import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import redCurtains from "../CSS/images/redCurtains.png";

// Look at stage page
export const LookAtStagePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { username, points } = location.state || {
    username: "Guest",
    points: 0,
  };

  useEffect(() => {
    setTimeout(() => {
      navigate("/poll", { state: { username, points } });
    }, 10000); // Show page for 10 seconds
  }, [navigate, username, points]);

  return (
    <div className="lookAtStageContainer">
      <img src={redCurtains} alt="Red curtains" className="lookAtStageImage" />
      <h1 className="lookAtStageText">SHH.. FØLG MED PÅ SCENEN</h1>
    </div>
  );
};
