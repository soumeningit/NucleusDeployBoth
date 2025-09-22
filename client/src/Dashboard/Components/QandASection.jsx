import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import { createMessageAPI } from "../../operation/service/Comments";
import useAuthContext from "../../customhooks/useAuthContext";

function QandASection({
  initialQuestions,
  onNewQuestion,
  courseId,
  section,
  subSection,
}) {
  const [questions, setQuestions] = useState(initialQuestions);
  const [newQuestion, setNewQuestion] = useState("");

  const [token] = useAuthContext();

  const handleSubmitQuestion = async (e) => {
    e.preventDefault();
    if (newQuestion.trim() === "") return;

    try {
      const data = {
        sectionId: section,
        subSectionId: subSection,
        message: newQuestion,
        courseId: courseId,
      };

      console.log("Sending data to API: ", data);

      const response = await createMessageAPI(data, token);

      console.log("Question submitted successfully: ", response);
    } catch (e) {
      console.log("Error in submitting question: ", e);
      return;
    }

    // Create a new question object
    const newQuestionData = {
      id: Date.now(), // Use a more robust ID in a real app
      author: "You", // In a real app, get this from user context
      question: newQuestion,
      replies: [],
    };

    // Update the local state to show the new question immediately
    setQuestions((prev) => [newQuestionData, ...prev]);

    // Pass the new question up to the parent component to update the main state
    onNewQuestion(newQuestionData);

    setNewQuestion(""); // Clear the input field
  };

  return (
    <div>
      {/* --- Form to ask a new question --- */}
      <form onSubmit={handleSubmitQuestion} className="mb-8">
        <h3 className="font-semibold text-slate-800 mb-2">
          Ask a New Question
        </h3>
        <div className="relative">
          <textarea
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            className="w-full h-24 p-3 pr-12 border-1 border-gray-400 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Type your question here..."
          />
          <button
            type="submit"
            className="absolute cursor-pointer top-3 right-3 p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-400"
            disabled={!newQuestion.trim()}
          >
            <FiSend />
          </button>
        </div>
      </form>

      {/* --- List of existing questions --- */}
      <div className="space-y-6">
        {questions.length > 0 ? (
          questions.map((item) => (
            <div
              key={item.id}
              className="border-b pb-4 mb-4 last:border-b-0 last:mb-0 last:pb-0"
            >
              <p className="font-semibold text-slate-800">{item.question}</p>
              <p className="text-sm text-slate-500">Asked by {item.author}</p>
              {item.replies.map((reply, index) => (
                <div
                  key={index}
                  className="mt-2 pl-4 border-l-2 border-slate-200"
                >
                  <p className="font-semibold text-sm text-indigo-700">
                    {reply.answer}
                  </p>
                  <p className="text-xs text-slate-500">
                    Answered by {reply.author}
                  </p>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p className="text-slate-500">
            No questions for this lecture yet. Be the first to ask!
          </p>
        )}
      </div>
    </div>
  );
}

export default QandASection;
