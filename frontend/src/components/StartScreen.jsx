import React, { useState } from "react";
import api from "../../api";
import Error from "./Error";

const StartScreen = ({ username, setUsername, setLoadingState }) => {
  const [error, setError] = useState(null);

  function submitUsername() {
    if (!username) return;

    const studentUsername = { username: username.toUpperCase() };

    api
      .post("has_taken_quiz/", studentUsername)
      .then((res) => {
        localStorage.setItem("username", username.toUpperCase());

        // move to quiz selection screen
        setLoadingState("select");
      })
      .catch((err) => {
        setError(err.response?.data?.error || "Unknown error");
      });
  }

  return (
    <div className="start">
      <h2>Welcome to The Quiz!</h2>
      <input
        placeholder="Enter username"
        className="btn btn-ui"
        style={{ marginBottom: "20px", textTransform: "uppercase" }}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {error && <Error error={error} />}
      <button
        className="btn btn-ui"
        onClick={submitUsername}
        disabled={username === ""}
      >
        Continue
      </button>
    </div>
  );
};

export default StartScreen;
