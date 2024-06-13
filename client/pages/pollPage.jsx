import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../CSS/index.css";
import { savePointsToDatabase } from "../utils/savePointsToDb";
import { fetchPoints } from "../utils/fetchPointsFromDb";
import { updatePointsInDatabase } from "../utils/updatePointsInDb";
import { questions } from "../data/questions";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Page to roll out questions
export function PollPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [choice, setChoice] = useState(null);
  const [timer, setTimer] = useState(10);
  const [showResults, setShowResults] = useState(false);
  const [votes, setVotes] = useState({ ja: 29, meh: 71 }); // Initial dummy data for demonstration
  const navigate = useNavigate();
  const location = useLocation();
  const { username, points: initialPoints } = location.state || {
    username: "Guest", // Alt. name to username
    points: 0,
  };
  const [points, setPoints] = useState(initialPoints);

  useEffect(() => {
    if (currentQuestionIndex > 0 && currentQuestionIndex % 3 === 0) {
      navigate("/look-at-stage", { state: { username, points, timer } }); // Navigate to LookAtStagePage every 3 questions
    }
  }, [currentQuestionIndex, navigate, points, timer, username]);

  useEffect(() => {
    if (!location.state || !location.state.points) {
      fetchPoints(username, setPoints, (error) => {
        console.log("Failed to fetch points:", error.message);
      });
    }
  }, [username]);

  useEffect(() => {
    shuffleArray(questions);
  }, []);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(countdown);
          setShowResults(true);

          // Only calculate points here
          const currentQuestion = questions[currentQuestionIndex];
          let maxVotes = 0;
          let majorityChoice = "";
          Object.entries(currentQuestion.results).forEach(([key, value]) => {
            if (value > maxVotes) {
              maxVotes = value;
              majorityChoice = key;
            }
          });

          const earnedPoints = choice === majorityChoice ? 1 : 0;

          // Update points based on the user's choice
          setPoints((prevPoints) => {
            const updatedPoints = prevPoints + earnedPoints;
            if (earnedPoints > 0) {
              updatePointsInDatabase(username, updatedPoints);
            }
            return updatedPoints;
          });

          setTimeout(() => {
            if (currentQuestionIndex + 1 < questions.length) {
              setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
              setShowResults(false);
              setTimer(10);
              setChoice(null); // Reset choice for next question
            } else {
              navigate("/end-page", { state: { username, points } });
            }
          }, 7000);

          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [
    choice,
    votes,
    navigate,
    username,
    currentQuestionIndex,
    questions.length,
  ]);

  const handleVote = (option) => {
    if (!showResults) {
      setChoice(option);
    }
  };

  // Redirected to buyWithPoints after some questions
  useEffect(() => {
    if (currentQuestionIndex > 0 && currentQuestionIndex % 2 === 0) {
      navigate("/buy-with-points-Page", { state: { username, points, timer } });
    }
  }, [currentQuestionIndex, navigate, points, timer, username]);

  const question = questions[currentQuestionIndex];
  const colors = ["#FFD166", "#EF476F", "#118AB2"];

  return (
    <div className="container">
      <div className="username">
        <h2>Brukernavn: {username}</h2>
      </div>
      <div className="points-box">
        <h2>Poeng: {points}</h2>
      </div>
      <h3 className="question">{question.question}</h3>
      {!showResults ? (
        <div>
          <p className="time-left">Tid igjen: {timer} sekunder</p>
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`vote-button startgamepage-style button-color-${index % colors.length}`}
              onClick={() => handleVote(option)}
            >
              {option}
            </button>
          ))}
          {choice && <p className="user-choice">Du har stemt på: {choice}</p>}
        </div>
      ) : (
        <div>
          <h1 className="results-heading">RESULTAT</h1>
          <div className="poll-results">
            {question.options.map((option, index) => (
              <div
                key={index}
                className={`bar option-${index}`}
                style={{ height: `${question.results[option]}%` }}
              >
                <span className="percentage">{question.results[option]}%</span>
                <span className="option-label">{option}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
