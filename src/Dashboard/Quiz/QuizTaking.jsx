import { FiChevronRight } from "react-icons/fi";
import QuizProgressBar from "./QuizProgressBar";

function QuizTaking({
  quizData,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  userAnswers,
  onAnswerSelect,
  onSubmit,
}) {
  const currentQuestion = quizData[currentQuestionIndex];

  // Guard clause for when data is not yet available
  if (!currentQuestion) {
    return <div>Loading question...</div>;
  }

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-xl font-bold text-slate-800">
          Java Fundamentals Quiz
        </h3>
        <p className="text-sm font-semibold text-slate-500">
          Question {currentQuestionIndex + 1} of {quizData.length}
        </p>
      </div>

      <QuizProgressBar
        progress={((currentQuestionIndex + 1) / quizData.length) * 100}
      />

      <h2 className="text-2xl font-bold mb-6 text-slate-800">
        {currentQuestion.question}
      </h2>
      <div className="space-y-4">
        {Object.entries(currentQuestion.options).map(([key, optionText]) => (
          <button
            key={key}
            onClick={() => onAnswerSelect(currentQuestion._id, optionText, key)}
            className={`block w-full text-left p-4 rounded-lg border-2 transition-transform transform hover:scale-[1.02] ${
              userAnswers[currentQuestion._id] === optionText
                ? "bg-indigo-100 border-indigo-500"
                : "bg-white hover:bg-slate-50 border-slate-300"
            }`}
          >
            <span className="font-bold mr-3">{key}.</span>
            {optionText}
          </button>
        ))}
      </div>
      <div className="flex justify-end mt-8">
        {currentQuestionIndex < quizData.length - 1 ? (
          <button
            onClick={() => setCurrentQuestionIndex((i) => i + 1)}
            className="cursor-pointer flex items-center bg-indigo-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-indigo-700"
          >
            Next <FiChevronRight className="ml-1" />
          </button>
        ) : (
          <button
            onClick={onSubmit}
            className="cursor-pointer bg-green-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-green-700"
          >
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
}

export default QuizTaking;
