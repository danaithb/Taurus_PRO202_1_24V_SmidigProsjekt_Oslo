import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import controllerImage from "../CSS/images/controller_right.png";
import { fetchPoints } from "../utils/fetchPointsFromDb";
import { updatePointsInDatabase } from "../utils/updatePointsInDb";

// Page for users to use their points
export function BuyWithPointsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    username,
    points: initialPoints,
    timer: initialTimer,
  } = location.state || {};
  const [points, setPoints] = useState(initialPoints);
  const [choice, setChoice] = useState(null);
  const [timer, setTimer] = useState(40); // Timer
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchPoints(username, setPoints, (error) => {
      console.error("Failed to fetch points:", error.message);
    });

    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 1) {
          return prevTimer - 1;
        } else {
          clearInterval(countdown);
          navigate("/poll"); // Redirect to the poll page after countdown
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [username, navigate]);

  const makeChoice = async (option, username) => {
    setChoice(option);
    switch (option) {
      case "extraTime":
        if (points > 0) {
          const updatedPoints = points - 1;
          console.log("Updated Points:", updatedPoints);
          setPoints(updatedPoints);
          setTimer((prevTimer) => prevTimer + 1);
          setMessage("Du kjøpte 1 sekund ekstra tid til neste runde");
          await updatePointsInDatabase(username, updatedPoints);
        }
        break;
      case "giveToRandomUser":
        setMessage("Du har valgt å gi bort 1 poeng");
        if (points > 0) {
          const updatedPoints = points - 1;
          console.log("Updated Points:", updatedPoints);
          setPoints(updatedPoints);
          setMessage("Du har gitt ett poeng til en tilfeldig bruker!");
          await updatePointsInDatabase(username, updatedPoints);
        } else {
          setMessage("Du har ingen poeng å gi bort!");
        }
        break;
      case "savePoints":
        setMessage("Du har valgt å spare poengene dine");
        break;
      default:
        setMessage("");
    }
  };

  return (
    <div className="container">
      <div className="username">
        {username && <h2>Brukernavn: {username}</h2>}
      </div>
      <div className="points-box">
        <h2>Poeng: {points}</h2>
      </div>
      <h1>Du har {points} poeng</h1>
      <p>Tid igjen: {timer} sekunder</p>
      <div className="choices">
        <div className="choice-box choice-box-extra-time">
          <button onClick={() => makeChoice("extraTime", username)}>
            Ekstra tid
          </button>
        </div>
        <div className="choice-box choice-box-save-points">
          <button onClick={() => makeChoice("savePoints")}>
            Spar Poengene
          </button>
        </div>
        <div className="choice-box choice-box-give-random">
          <button onClick={() => makeChoice("giveToRandomUser", username)}>
            Gi 1 poeng til en random Bruker
          </button>
        </div>
      </div>
      <p>{message}</p>
      <img
        src={controllerImage}
        alt="Controller"
        className="controller-image"
      />
    </div>
  );
}
