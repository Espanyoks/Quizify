// import React from "react";

// const QuizSelectScreen = ({ quizList, setSelectedQuiz, setLoadingState }) => {
//   const selectQuiz = (quizId) => {
//     setSelectedQuiz(quizId); // triggers App to fetch questions
//   };

//   return (
//     <div className="quiz-select">
//       <h2>Select a Quiz</h2>
//       {quizList.map((quiz) => (
//         <button
//           key={quiz.id}
//           className="btn btn-ui"
//           onClick={() => selectQuiz(quiz.id)}
//         >
//           {quiz.name}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default QuizSelectScreen;
