import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../CSS/index.css";
import { savePointsToDatabase } from "../utils/savePointsToDb";

// First question (test for users)
export function StartGamePage() {
  const [choice, setChoice] = useState(null);
  const [timer, setTimer] = useState(5);
  const [showResults, setShowResults] = useState(false);
  const [votes, setVotes] = useState({ ja: 63, meh: 37 }); // Initial dummy data for demonstration
  const [points, setPoints] = useState(0);
  const location = useLocation();
  const { username } = location.state;
  const navigate = useNavigate();

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(countdown);
          setShowResults(true);

          // Calculate points
          const totalVotes = votes.ja + votes.meh;
          const majorityChoice = votes.ja > votes.meh ? "ja" : "meh";
          const earnedPoints = choice === majorityChoice ? 1 : 0;
          setPoints((prevPoints) => prevPoints + earnedPoints);

          // Save points to database
          savePointsToDatabase(username, earnedPoints, choice, majorityChoice);

          // Navigate after showing results for 10 seconds
          setTimeout(
            () => navigate("/look-at-stage", { state: { username, points } }),
            10000,
          );
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [choice, votes, navigate, username]);

  const handleVote = (option) => {
    if (!showResults) {
      setChoice(option);
      const increment = 5;
      setVotes((prevVotes) => {
        const updatedVotes = {
          ...prevVotes,
          [option]: prevVotes[option] + increment,
        };
        return updatedVotes;
      });
    }
  };

  return (
    <div className="container">
      <div className="username">
        <h2>Brukernavn: {username}</h2>
      </div>

      <div className="points-box">
        <h2>Poeng: {points}</h2>
      </div>

      {!showResults ? (
        <div>
          <h2>Er dere klare for å lage deres egen historie?</h2>
          <p>Tid igjen: {timer} sekunder</p>
          <button className="vote-button" onClick={() => handleVote("ja")}>
            Ja!
          </button>
          <button className="vote-button meh" onClick={() => handleVote("meh")}>
            Meh
          </button>

          {choice && (
            <p style={{ color: "#EF476F" }}>
              Du har stemt på: {choice === "ja" ? "Ja!" : "Meh"}
            </p>
          )}
        </div>
      ) : (
        <div>
          <h1>RESULT</h1>
          <p>
            You earned {points} point{points !== 1 && "s"}!
          </p>
          <div className="poll-results">
            <div
              className="bar ja"
              style={{ height: `${votes.ja}%` }}
              data-label="Ja!"
            >
              <span className="percentage">{votes.ja}%</span>
            </div>
            <div
              className="bar meh"
              style={{ height: `${votes.meh}%` }}
              data-label="Meh"
            >
              <span className="percentage">{votes.meh}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
