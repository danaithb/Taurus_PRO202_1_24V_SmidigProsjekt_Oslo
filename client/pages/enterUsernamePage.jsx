import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import controllerImage from "../CSS/images/controller_right.png";
import "../CSS/index.css";

// Enter username page
function EnterUsernamePage() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {}, []);

  const { eventyrData } = location.state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Starting to submit username:", username);
      const response = await fetch("/api/username", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });
      console.log("Usernamee fetch completed");
      if (!response.ok) {
        throw new Error("Brukernavnet finnes allerede, prøvd på nytt!🥸");
      }
      const data = await response.json();
      console.log("Server response:", data);
      navigate("/start-game", { state: { eventyr: eventyrData, username } });
    } catch (error) {
      console.error("Error submitting username:", error);
      alert(error.message);
    }
  };

  return (
    <div>
      <h1 className="enter-username">Skriv inn brukernavn</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Brukernavn.."
          required
          className="username-input"
        />
        <button type="submit" className="enter-button">
          ENTER
        </button>
      </form>
      <img
        src={controllerImage}
        alt="Controller"
        className="controller-image"
      />
    </div>
  );
}

export default EnterUsernamePage;
