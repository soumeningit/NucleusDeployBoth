import { FiX } from "react-icons/fi";

function TagInput({ tags, setTags, tagInput, setTagInput, handleKeyDown }) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 p-2 border border-slate-300 rounded-md">
        {tags.map((tag) => (
          <span
            key={tag}
            className="flex items-center bg-indigo-100 text-indigo-700 text-sm font-medium px-2 py-1 rounded-full"
          >
            {tag}
            <button
              type="button"
              onClick={() => setTags(tags.filter((t) => t !== tag))}
              className="cursor-pointer ml-1.5 text-indigo-400 hover:text-indigo-700"
            >
              <FiX size={14} />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, "tag")}
          placeholder={tags.length < 10 ? "Add a tag..." : "10 tags max"}
          disabled={tags.length >= 10}
          className="flex-grow bg-transparent focus:outline-none text-sm p-1"
        />
      </div>
      <label className="text-xs text-slate-500 mt-1">
        Add up to 10 tags. Press Enter to add.
      </label>
    </div>
  );
}

export default TagInput;
