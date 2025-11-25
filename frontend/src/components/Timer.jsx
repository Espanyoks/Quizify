// // Import React and the useEffect tool
// import React, { useEffect } from "react";

// // This component shows and manages the quiz timer
// const Timer = ({
//   timeRemaining, // How many seconds are left
//   setTimeRemaining, // Function to update the time
//   setLoadingState, // Function to change screens
//   submitQuizToApi, // Function to send final score
//   studentScore // The player's current score
// }) => {
//   // Calculate minutes from total seconds
//   const mins = Math.floor(timeRemaining / 60);
//   // Calculate remaining seconds after taking out minutes
//   const secs = timeRemaining % 60;

//   // This runs when the timer first appears on screen
//   useEffect(function () {
//     // Create a clock that ticks every second
//     const id = setInterval(function () {
//       // Reduce the time by 1 second each tick
//       setTimeRemaining((curr) => curr - 1);
//     }, 1000); // 1000 milliseconds = 1 second

//     // Clean up: stop the clock when timer is removed
//     return () => clearInterval(id);
//   }, []); // Empty brackets mean this runs only once

//   // Check if time has run out
//   if (timeRemaining === 0) {
//     // Change to the finished screen
//     setLoadingState("finished");
//     // Send the final score to the server
//     submitQuizToApi(studentScore);
//   }

//   // Show the timer on the screen
//   return (
//     <div className="timer">
//       {/* Add a zero if minutes is less than 10 (like 09 instead of 9) */}
//       {mins < 10 && "0"}
//       {mins}:{/* Show minutes */}
//       {/* Add a zero if seconds is less than 10 */}
//       {secs < 10 && "0"}
//       {secs}{/* Show seconds */}
//     </div>
//   );
// };

// // Let other files use this timer
// export default Timer;