import React from "react";

const FinishedScreen = ({
  quizTotalScore,
  studentScore,
  setLoadingState,
  setQuestionIndex,
  setSelectedOption,
  setCorrectOption,
  setStudentScore,
  setUsername,
}) => {
  const restartQuiz = () => {
    // Reset all states
    setLoadingState("start"); // back to StartScreen
    setQuestionIndex(0);
    setSelectedOption(null);
    setCorrectOption(null);
    setStudentScore(0);
    setUsername("");
  };

  return (
    <div className="finished-screen">
      <h2>Quiz Finished!</h2>
      <p>Your Score: {studentScore} / {quizTotalScore}</p>
      <button className="btn btn-ui" onClick={restartQuiz}>
        Restart Quiz
      </button>
    </div>
  );
};

export default FinishedScreen;
