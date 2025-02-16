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
  console.log("formFields", formFields);

  return (
    <div className="bg-white p-4 border border-gray-300 rounded-md">
      <h2 className="text-lg font-semibold mb-4">Form Preview</h2>

      {formFields.length === 0 ? (
        <p className="text-gray-500">Drag and drop a field to start</p>
      ) : (
        formFields.map((field) => (
          <div key={field.id} className="mb-4">
            {/* Label */}
            <label className="block mb-2 font-semibold">
              {typeof field.label === "string" ? field.label : "Unnamed Field"}
            </label>

            {/* Input Fields Based on Type */}
            {field.type === "TEXT" && (
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter text..."
              />
            )}
            {field.type === "NUMBER" && (
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter number..."
              />
            )}
            {field.type === "EMAIL" && (
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter email..."
              />
            )}
            {field.type === "password" && (
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter password..."
              />
            )}
            {field.type === "TEXTAREA" && (
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={4}
                placeholder="Enter text..."
              />
            )}

            {field.type === "DROPDOWN" && (
              <select className="w-full p-2 border border-gray-300 rounded-md">
                {field.options?.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}

            {field.type === "RADIO" &&
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
            {field.type === "CHECKBOX" &&
              field.options?.map((option, index) => (
                <label key={index} className="block">
                  <input type="checkbox" value={option} className="mr-2" />
                  {option}
                </label>
              ))}
          </div>
        ))
      )}
    </div>
  );
};
