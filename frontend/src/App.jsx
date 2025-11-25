import { useEffect, useState } from "react";
import Error from "./components/Error";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Main from "./components/Main";
import StartScreen from "./components/StartScreen";
import api from "../api";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import Timer from "./components/Timer";
import Footer from "./components/Footer";
import QuizSelectScreen from "./components/QuizSelectScreen";

const App = () => {
  const [loadingState, setLoadingState] = useState("start"); // Show StartScreen first
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [username, setUsername] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [studentScore, setStudentScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(null);

  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [quizList, setQuizList] = useState([]);
  const [questionsLoading, setQuestionsLoading] = useState(false);

  const scorePerQuestion = 5;
  const secondsPerQuestion = 10;
  const numQuestions = questions.length;
  const quizTotalScore = numQuestions * scorePerQuestion;

  // Fetch quizzes on app load
  useEffect(() => {
    api
      .get("quizzes/")
      .then((res) => setQuizList(res.data))
      .catch((err) => setError(err.message));
  }, []);

  // Fetch questions when a quiz is selected
  useEffect(() => {
    if (!selectedQuiz) return;

    setQuestionsLoading(true);
    api
      .get(`questions/${selectedQuiz}/`)
      .then((res) => {
        setQuestions(res.data);
        setLoadingState("active"); // start quiz after questions are loaded
      })
      .catch((err) => setError(err.message))
      .finally(() => setQuestionsLoading(false));
  }, [selectedQuiz]);

  // Warn user not to refresh during quiz
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // Send quiz results to the server
  function submitQuizToApi(updatedScore) {
    const studentQuiz = {
      username: localStorage.getItem("username"),
      quiz_id: selectedQuiz,
      score: updatedScore,
    };

    api
      .post("submit_quiz/", studentQuiz)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.message));
  }

  const isLastQuestion = questionIndex + 1 === numQuestions;

  return (
    <div className="app">
      <Header />
      <Main>
        {error && <Error error={error} />}

        {/* Show StartScreen first */}
        {loadingState === "start" && (
          <StartScreen
            username={username}
            setUsername={setUsername}
            setLoadingState={setLoadingState} // move to quiz selection after entering username
          />
        )}

        {/* Show quiz selection screen */}
        {loadingState === "select" && (
          <>
            {questionsLoading && <Loader />}
            {!questionsLoading && quizList.length > 0 && (
              <QuizSelectScreen
                quizList={quizList}
                setSelectedQuiz={setSelectedQuiz}
                setLoadingState={setLoadingState}
              />
            )}
          </>
        )}

        {/* Show active quiz */}
        {loadingState === "active" && !questionsLoading && (
          <>
            <Progress
              questionIndex={questionIndex}
              username={username}
              numQuestions={numQuestions}
            />
            <Question
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              question={questions[questionIndex]}
              setCorrectOption={setCorrectOption}
            />
            <Footer>
              <Timer
                timeRemaining={timeRemaining}
                setTimeRemaining={setTimeRemaining}
                setLoadingState={setLoadingState}
                submitQuizToApi={submitQuizToApi}
                studentScore={studentScore}
              />

              {/* Button to go back to quiz selection */}
              <button
                className="home-btn btn btn-ui "
                onClick={() => {
                  setLoadingState("select");  // Go back to quiz selection
                  setQuestions([]);           // Clear current questions
                  setQuestionIndex(0);        // Reset question index
                  setSelectedOption(null);    // Clear selected option
                  setCorrectOption(null);     // Clear correct option
                  setStudentScore(0);         // Reset score
                  setSelectedQuiz(null);      // Optional: clear selected quiz
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg>
                Home
              </button>


              {/* Restart quiz button to repeat same quiz */}
              <button
                className="btn btn-ui restart-btn restart-btn"
                onClick={() => {
                  setQuestionIndex(0);
                  setSelectedOption(null);
                  setCorrectOption(null);
                  setStudentScore(0);
                  setTimeRemaining(secondsPerQuestion * numQuestions);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-440h80q0 117 81.5 198.5T480-160q117 0 198.5-81.5T760-440q0-117-81.5-198.5T480-720h-6l62 62-56 58-160-160 160-160 56 58-62 62h6q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-440q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-80Z"/></svg>
                Restart
              </button>


              {/* Show NextButton for all but last question */}
              {!isLastQuestion ? (
                <NextButton
                  selectedOption={selectedOption}
                  setQuestionIndex={setQuestionIndex}
                  setSelectedOption={setSelectedOption}
                  numQuestions={numQuestions}
                  questionIndex={questionIndex}
                  correctOption={correctOption}
                  setStudentScore={setStudentScore}
                  setLoadingState={setLoadingState}
                  submitQuizToApi={submitQuizToApi}
                />
                
              ) : (
                <button
                  className="btn btn-ui done-btn"
                  onClick={() => {
                    submitQuizToApi(studentScore); // submit final score
                    setLoadingState("select"); // go back to quiz selection
                    setQuestions([]);
                    setQuestionIndex(0);
                    setSelectedOption(null);
                    setCorrectOption(null);
                    setStudentScore(0);
                  }}
                >
                  Done
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q65 0 123 19t107 53l-58 59q-38-24-81-37.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-18-2-36t-6-35l65-65q11 32 17 66t6 70q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-56-216L254-466l56-56 114 114 400-401 56 56-456 457Z"/></svg>
                </button>
              )}
            </Footer>
          </>
        )}
      </Main>
    </div>
  );
};

export default App;
