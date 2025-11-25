import React from "react";

// This component shows the answer choices for a question
const OptionContainer = ({
  question, // The current question object
  setCorrectOption, // Function to remember which answer is correct
  selectedOption, // Which answer the user picked
  setSelectedOption, // Function to update the selected answer
}) => {
  // Get all the answer choices from the question
  const options = question.options;

  // This function runs when someone clicks an answer
  function selectAnswer(index, option) {
    // Remember which answer the user clicked
    setSelectedOption(index);

    // Check if the clicked answer is the right one
    if(option.is_correct === true){
      // If it's correct, remember this as the correct answer
      setCorrectOption(index);
    }
  }

  // This part draws the answer buttons on the screen
  return (
    <div className="options">
      {/* Create a button for each answer choice */}
      {options.map((option, index) => (
        <button
          key={option.id} // Give each button a unique ID so React can track it
          // Change the button color if it's the selected answer
          className={`btn btn-option ${
            selectedOption === index ? "answer correct" : ""
          } `}
          // When clicked, call the selectAnswer function
          onClick={() => selectAnswer(index, option)}
        >
          {/* Show the answer text on the button */}
          {option.option}
        </button>
      ))}
    </div>
  );
};

export default OptionContainer;