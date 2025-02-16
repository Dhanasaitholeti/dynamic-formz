"use client";

import { useState } from "react";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import { Sidebar } from "./Sidebar";
import { FormCanvas } from "./FormCanvas";
import FieldConfigModal from "./FieldConfigModal";

interface FormField {
  id: string;
  type: string;
  label: string;
  position: number;
  options?: string[];
}

interface DragItem {
  type: string;
  label: string;
}

const FormBuilder: React.FC = () => {
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentField, setCurrentField] = useState<{ type: string } | null>(
    null
  );

  const [, drop] = useDrop<DragItem, void, unknown>({
    accept: "FORM_ELEMENT",
    drop: (item) => {
      setCurrentField({ type: item.type });
      setIsModalOpen(true);
    },
  });

  const handleSaveField = (label: string, options?: string[]) => {
    if (currentField) {
      setFormFields((prevFields) => [
        ...prevFields,
        {
          id: uuidv4(),
          type: currentField.type,
          label,
          position: prevFields.length,
          options,
        },
      ]);
      setCurrentField(null);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div ref={drop} className="flex-1 p-4 bg-gray-100">
        <FormCanvas formFields={formFields} />
      </div>

      <FieldConfigModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveField}
        fieldType={currentField?.type || ""}
      />
    </div>
  );
};

export default FormBuilder;
