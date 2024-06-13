import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/index.css";
import controllerImage from "../CSS/images/controller_right.png";

// Example for first question
const eventyrDatabase = {
  1234: {
    // Code to enter play
    title: "Troll Eventyret",
    description: "Bli med på en spennende reise gjennom trollets skog!",
    questions: [
      {
        question: "Hva skal helten ha med seg?",
        options: ["Sverd", "Bue", "Tryllestav"],
      },
      {
        question: "Hvilken vei skal helten ta?",
        options: ["Den skumle stien", "Den solfylte veien"],
      },
    ],
  },
};

// Frontpage (enter code)
export function FrontPage() {
  const [code, setCode] = useState(["", "", "", ""]);
  const navigate = useNavigate();

  const handleCodeChange = (index) => (event) => {
    const newCode = [...code];
    newCode[index] = event.target.value.slice(0, 1); // Sikrer at kun ett tegn per boks
    setCode(newCode);
    if (event.target.value !== "" && index < 3) {
      const nextSibling = document.querySelector(
        `input[name='digit${index + 2}']`,
      );
      if (nextSibling !== null) {
        nextSibling.focus();
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const fullCode = code.join("");
    const eventyrData = eventyrDatabase[fullCode];
    if (eventyrData) {
      navigate("/enter-username-page", { state: { eventyrData } });
    } else {
      alert("Ugyldig kode. Prøv igjen.");
      setCode(["", "", "", ""]);
    }
  };

  return (
    <div className="container">
      <h1 className="enter-code">SKRIV INN KODEN</h1>
      <br />
      <form onSubmit={handleSubmit} className="code-inputs">
        {Array.from({ length: 4 }).map((_, index) => (
          <input
            key={index}
            type="text"
            name={`digit${index + 1}`}
            maxLength="1"
            value={code[index]}
            onChange={handleCodeChange(index)}
            className="code-input"
          />
        ))}
        <br />
        <br />

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
