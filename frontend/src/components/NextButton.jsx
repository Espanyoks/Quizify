// import React from "react";
// import api from "../../api";

// const NextButton = ({
//   selectedOption,
//   setQuestionIndex,
//   setSelectedOption,
//   numQuestions,
//   questionIndex,
//   correctOption,
//   setStudentScore,
//   setLoadingState,
//   submitQuizToApi
// }) => {
//   if (selectedOption === null) return null;

//   function NextQuestion() {
//     setQuestionIndex((curr) => curr + 1);
//     if(selectedOption === correctOption){
//         setStudentScore(curr => curr + 5)
//     }
//     setSelectedOption(null);
//   }

//   function submitQuiz(){
//     setLoadingState("finished")
//     if(selectedOption === correctOption){
//       setStudentScore(curr => {
        
//         const updatedScore = curr + 5
//         submitQuizToApi(updatedScore)

//         return updatedScore
      
//       })
//   }
    
//   }
    

//   if (questionIndex === numQuestions - 1)
//     return <button className="btn btn-ui" onClick={submitQuiz}>Submit Quiz</button>;

//   return (
//     <button className="btn btn-ui next-btn" onClick={NextQuestion}>
//       Next
//       <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/></svg>
//     </button>
//   );
// };

// export default NextButton;