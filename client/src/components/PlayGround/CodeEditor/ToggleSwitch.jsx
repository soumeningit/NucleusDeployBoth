function ToggleSwitch({ enabled, setEnabled }) {
  return (
    <button
      type="button"
      className={`${
        enabled ? "bg-indigo-600" : "bg-slate-300"
      } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out`}
      onClick={() => setEnabled(!enabled)}
    >
      <span
        className={`${
          enabled ? "translate-x-5" : "translate-x-0"
        } inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
      />
    </button>
  );
}

export default ToggleSwitch;
