import { FiX } from "react-icons/fi";

function PrerequisiteInput({
  prerequisites,
  setPrerequisites,
  prerequisiteInput,
  setPrerequisiteInput,
  handleKeyDown,
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">
        Prerequisites
      </label>
      <div className="p-2 border border-slate-300 rounded-md">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          {prerequisites.map((p) => (
            <span
              key={p}
              className="flex items-center bg-slate-200 text-slate-700 text-sm font-medium px-2 py-1 rounded-full"
            >
              {p}
              <button
                type="button"
                onClick={() =>
                  setPrerequisites(prerequisites.filter((x) => x !== p))
                }
                className="cursor-pointer ml-1.5 text-slate-400 hover:text-slate-700"
              >
                <FiX size={14} />
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          value={prerequisiteInput}
          onChange={(e) => setPrerequisiteInput(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, "prerequisite")}
          placeholder="Add a prerequisite and press Enter"
          className="w-full bg-transparent focus:outline-none text-sm p-1"
        />
      </div>
    </div>
  );
}

export default PrerequisiteInput;
