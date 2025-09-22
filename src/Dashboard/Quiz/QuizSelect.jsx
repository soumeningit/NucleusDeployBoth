import SearchableSelect from "./SearchableSelect";

function QuizSelect({ selectedTopic, setSelectedTopic, onStart, quizTopics }) {
  return (
    <div className="text-center max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">
        Select a Quiz Topic
      </h2>

      {/* --- Use the new SearchableSelect component here --- */}
      <SearchableSelect
        options={quizTopics}
        value={selectedTopic}
        onChange={setSelectedTopic}
        placeholder="Select a topic..."
      />

      <button
        onClick={onStart}
        disabled={!selectedTopic}
        className="cursor-pointer mt-8 w-full bg-indigo-600 text-white font-semibold py-3 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed"
      >
        Start Quiz
      </button>
    </div>
  );
}
export default QuizSelect;
