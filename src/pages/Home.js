import React, { useState, useEffect } from 'react';
import questionsData from '../json/question.json'; // Import your JSON data

export default function Home() {
  const [questions, setQuestions] = useState(questionsData);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleChoiceClick = (choiceIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].selectedAnswerIndex = choiceIndex;
    setQuestions(updatedQuestions);
  };

    const handleNextOrSubmit = () => {
        if (currentQuestionIndex === questions.length - 1) {
        // Check if all questions have been answered
        const allQuestionsAnswered = questions.every(
            (question) => question.selectedAnswerIndex !== null
        );

        if (allQuestionsAnswered) {
            // Submit button functionality (e.g., submit the answers)
            console.log('Answers submitted:', questions.map((question) => question.selectedAnswerIndex));
        } else {
            alert('Please answer all the questions before submitting.');
        }
        } else {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        }
    };

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  useEffect(() => {
    // Ensure that the currentQuestionIndex remains within the valid range
    if (currentQuestionIndex < 0) {
      setCurrentQuestionIndex(0);
    } else if (currentQuestionIndex >= questions.length) {
      setCurrentQuestionIndex(questions.length - 1);
    }
  }, [currentQuestionIndex, questions.length]);

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <main className="bg-gradient-green h-screen flex flex-col justify-center items-center text-center text-[#004d40]">
      <h1 className="text-3xl font-bold pb-4">{`Question ${currentQuestionIndex + 1}/10`}</h1>
      <h2 className="text-4xl font-bold">{currentQuestion.question}</h2>

      <hr className="w-full border-t-2 border-[#041421] my-6" />

      <div className="flex flex-col space-y-2">
        {currentQuestion.choices.map((choice, index) => (
          <div
            key={index}
            className={`py-2 px-4 flex items-center rounded-md cursor-pointer ${
              currentQuestion.selectedAnswerIndex === index
                ? 'bg-[#004d40] text-white'
                : 'bg-white hover:bg-gray-200'
            }`}
            onClick={() => handleChoiceClick(index)}
          >
            <p className="text-2xl font-bold">{String.fromCharCode(65 + index)}</p>
            <p className="text-2xl pl-[20px]">{choice}</p>
          </div>
        ))}
      </div>

      <div className="flex mt-6 space-x-10">
        <button
          onClick={handlePrevQuestion}
          className={`py-2 px-4 rounded-md bg-white hover:bg-gray-200 ${
            currentQuestionIndex === 0 ? 'cursor-not-allowed' : ''
          }`}
          disabled={currentQuestionIndex === 0}
        >
          PREV
        </button>
        <button
          onClick={handleNextOrSubmit}
          className={`py-2 px-4 rounded-md bg-white hover:bg-gray-200 ${
            currentQuestionIndex === questions.length - 1 ? 'bg-[#004d40] text-white  hover:text-[#041421]' : ''
          }`}
        >
          {currentQuestionIndex === questions.length - 1 ? 'SUBMIT' : 'NEXT'}
        </button>
      </div>
    </main>
  );
}