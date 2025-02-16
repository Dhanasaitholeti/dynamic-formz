"use client";

import React from "react";

interface FormField {
  id: string;
  type: string;
  label: string;
  options?: string[];
}

interface FormCanvasProps {
  formFields: FormField[];
}

export const FormCanvas: React.FC<FormCanvasProps> = ({ formFields }) => {
  return (
    <div className="bg-white p-4 border border-gray-300 rounded-md">
      <h2 className="text-lg font-semibold mb-4">Form Preview</h2>

      {formFields.map((field) => (
        <div key={field.id} className="mb-4">
          {/* Label */}
          <label className="block mb-1 font-semibold">{field.label}</label>

          {/* Input Types */}
          {field.type === "text" && (
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          )}
          {field.type === "number" && (
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          )}
          {field.type === "email" && (
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          )}
          {field.type === "password" && (
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          )}
          {field.type === "textarea" && (
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={4}
            />
          )}

          {/* Select Dropdown */}
          {field.type === "select" && (
            <select className="w-full p-2 border border-gray-300 rounded-md">
              {field.options?.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}

          {/* Radio Buttons */}
          {field.type === "radio" &&
            field.options?.map((option, index) => (
              <label key={index} className="block">
                <input
                  type="radio"
                  name={field.id}
                  value={option}
                  className="mr-2"
                />
                {option}
              </label>
            ))}

          {/* Checkboxes */}
          {field.type === "checkbox" &&
            field.options?.map((option, index) => (
              <label key={index} className="block">
                <input type="checkbox" value={option} className="mr-2" />
                {option}
              </label>
            ))}
        </div>
      ))}
    </div>
  );
};
