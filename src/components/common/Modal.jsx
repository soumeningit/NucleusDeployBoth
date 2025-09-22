import React, { useEffect } from "react";
import { FiX } from "react-icons/fi";

function Modal({
  isOpen,
  onClose,
  icon,
  heading,
  text,
  primaryButtonText,
  onPrimaryClick,
  secondaryButtonText,
  onSecondaryClick,
}) {
  // Effect to handle closing the modal with the Escape key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  // If the modal is not open, render nothing
  if (!isOpen) {
    return null;
  }

  // Wrapper functions for button clicks to ensure the modal closes
  const handlePrimaryClick = () => {
    onPrimaryClick();
    onClose();
  };

  const handleSecondaryClick = () => {
    onSecondaryClick();
    onClose();
  };

  return (
    // The Modal Overlay
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition-opacity"
      onClick={onClose} // Close modal on overlay click
    >
      {/* The Modal Content */}
      <div
        className="relative bg-white w-full max-w-md mx-4 p-6 rounded-lg shadow-xl text-center transform transition-all"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-3 right-3 text-slate-400 hover:text-slate-600"
        >
          <FiX size={24} />
        </button>

        {/* Icon */}
        {icon && (
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
            {icon}
          </div>
        )}

        {/* Heading */}
        <h3 className="mt-4 text-xl font-bold text-slate-800">{heading}</h3>

        {/* Text / Description */}
        <div className="mt-2">
          <p className="text-sm text-slate-500">{text}</p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={handleSecondaryClick}
            className="cursor-pointer w-full px-4 py-2 bg-white border border-slate-300 text-slate-700 font-semibold rounded-lg shadow-sm hover:bg-slate-50"
          >
            {secondaryButtonText}
          </button>
          <button
            onClick={handlePrimaryClick}
            className="cursor-pointer w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-sm hover:bg-indigo-700"
          >
            {primaryButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
