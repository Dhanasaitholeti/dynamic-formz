import { useDrag } from "react-dnd";

const formElements = [
  { type: "TEXT", label: "Text Input" },
  { type: "NUMBER", label: "Number Input" },
  { type: "EMAIL", label: "Email Input" },
  { type: "RADIO", label: "Radio Button" },
  { type: "CHECKBOX", label: "Checkbox" },
  { type: "DROPDOWN", label: "Dropdown" },
  { type: "TEXTAREA", label: "Textarea" },
  { type: "DATE", label: "Date Picker" },
  { type: "FILE", label: "File Upload" },
];

export const Sidebar: React.FC = () => {
  return (
    <div className="w-64 p-4 bg-white shadow-md">
      <h2 className="text-lg font-bold mb-4">Form Elements</h2>
      {formElements.map((element) => (
        <DraggableElement
          key={element.type}
          type={element.type}
          label={element.label}
        />
      ))}
    </div>
  );
};

const DraggableElement: React.FC<{ type: string; label: string }> = ({
  type,
  label,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "FORM_ELEMENT",
    item: { type, label },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-2 mb-2 bg-blue-100 cursor-move ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      {label}
    </div>
  );
};
