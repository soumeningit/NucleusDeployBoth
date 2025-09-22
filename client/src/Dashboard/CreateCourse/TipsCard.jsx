import { FiZap, FiCheck } from "react-icons/fi";

function TipsCard() {
  return (
    <div className="lg:sticky lg:top-24">
      <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-lg">
        <div className="flex items-center">
          <FiZap className="h-8 w-8 text-indigo-500" />
          <h3 className="ml-3 text-lg font-bold text-slate-800">
            Tips for a Great Course
          </h3>
        </div>
        <ul className="mt-4 space-y-3 text-sm text-slate-600">
          {[
            "Start with a compelling title and a clear, concise description.",
            "Use a high-quality, relevant thumbnail to attract students.",
            "Break down your curriculum into logical, bite-sized lectures.",
            "Clearly list any prerequisites so students know if they're ready.",
            "Record high-quality video and audio for the best learning experience.",
          ].map((tip, i) => (
            <li key={i} className="flex items-start">
              <FiCheck className="text-green-500 mr-2 mt-1 flex-shrink-0" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TipsCard;
