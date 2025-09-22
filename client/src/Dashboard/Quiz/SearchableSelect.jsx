import { useState, useEffect, useRef } from "react";
import { FiSearch, FiChevronDown } from "react-icons/fi";

function SearchableSelect({
  options,
  value,
  onChange,
  placeholder = "Select an option",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const selectRef = useRef(null);

  // Effect to handle clicks outside the component to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectOption = (optionValue, optionId) => {
    onChange(optionValue, optionId);
    setIsOpen(false);
    setSearchTerm("");
  };

  const selectedOptionName =
    options.find((opt) => opt.name === value)?.name || placeholder;

  return (
    <div className="relative w-full" ref={selectRef}>
      {/* --- The main button that shows the selected value --- */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 text-lg text-left bg-white border border-slate-300 rounded-md flex justify-between items-center focus:outline-none focus:ring-1 focus:ring-cyan-400"
      >
        <span className={value ? "text-slate-800" : "text-slate-400"}>
          {selectedOptionName}
        </span>
        <FiChevronDown
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* --- The Dropdown Menu with Search --- */}
      {isOpen && (
        <div className="absolute z-10 top-full mt-2 w-full bg-white border border-slate-200 rounded-md shadow-lg">
          <div className="p-2">
            <div className="relative">
              <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 pl-10 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-400"
              />
            </div>
          </div>

          <ul className="max-h-60 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((topic) => (
                <li
                  key={topic._id}
                  onClick={() => handleSelectOption(topic.name, topic._id)}
                  className="items-start px-4 py-2 text-slate-700 hover:bg-indigo-500 hover:text-white cursor-pointer"
                >
                  {topic.name}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-slate-500">No topics found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchableSelect;
