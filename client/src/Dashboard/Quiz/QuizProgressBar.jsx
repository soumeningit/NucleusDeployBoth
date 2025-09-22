function QuizProgressBar({ progress }) {
  return (
    <div className="w-full bg-slate-200 rounded-full h-2 mb-6">
      <div
        className="bg-indigo-600 h-2 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
export default QuizProgressBar;
