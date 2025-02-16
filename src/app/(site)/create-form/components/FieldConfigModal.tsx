"use client";

import { useState } from "react";

interface FieldConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (label: string, options?: string[]) => void;
  fieldType: string;
}

const FieldConfigModal: React.FC<FieldConfigModalProps> = ({
  isOpen,
  onClose,
  onSave,
  fieldType,
}) => {
  const [label, setLabel] = useState("");
  const [options, setOptions] = useState<string[]>([]);

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSave = () => {
    onSave(
      label,
      fieldType === "select" ||
        fieldType === "radio" ||
        fieldType === "checkbox"
        ? options
        : undefined
    );
    onClose();
    setLabel("");
    setOptions([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Configure Field</h2>

        {/* Label Input */}
        <label className="block mb-2">Label:</label>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />

        {/* Options Input (Only for select, radio, checkbox) */}
        {(fieldType === "select" ||
          fieldType === "radio" ||
          fieldType === "checkbox") && (
          <div className="mt-4">
            <label className="block mb-2">Options:</label>
            {options.map((option, index) => (
              <input
                key={index}
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md mb-2"
              />
            ))}
            <button
              onClick={handleAddOption}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              + Add Option
            </button>
          </div>
        )}

        {/* Save and Cancel Buttons */}
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-400 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default FieldConfigModal;
