import React from "react";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

function QuizResult({ results, onTryAgain }) {
  if (!results) {
    return <div>Loading results...</div>;
  }
  const percentage = Math.round((results.score / results.total) * 100);

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-2 text-slate-800">Quiz Result!</h2>
      <div className="flex flex-col items-center mb-6">
        <div className="text-3xl font-extrabold text-indigo-600">
          {percentage}%
        </div>
      </div>
      <p className="text-5xl font-extrabold text-indigo-600 mb-6">
        {results.score} / {results.total}
      </p>
      <div className="space-y-4 text-left max-w-2xl mx-auto mb-8">
        {results.responseDetails.map((detail) => (
          <div
            key={detail.questionId}
            className={`p-4 rounded-lg border ${
              detail.isCorrect
                ? "bg-green-50 border-green-300"
                : "bg-red-50 border-red-300"
            }`}
          >
            <p className="font-semibold">{detail.question}</p>
            <p
              className={`flex items-center text-sm font-medium mt-2 ${
                detail.isCorrect ? "text-green-700" : "text-red-700"
              }`}
            >
              {detail.isCorrect ? (
                <FiCheckCircle className="mr-2 flex-shrink-0" />
              ) : (
                <FiXCircle className="mr-2 flex-shrink-0" />
              )}
              Your answer: {detail.selectedAnswer}
            </p>
            {!detail.isCorrect && (
              <p className="text-sm text-slate-600 mt-1 pl-6">
                Correct answer: {detail.correctAnswer}
              </p>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={onTryAgain}
        className="cursor-pointer bg-indigo-600 text-white font-semibold py-3 px-8 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Take Another Quiz
      </button>
    </div>
  );
}

export default QuizResult;
