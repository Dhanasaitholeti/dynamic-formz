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
    <div className="w-64 p-4 bg-gray-100 shadow-lg rounded-lg">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">
        Form Elements
      </h2>
      <div className="space-y-3">
        {formElements.map((element) => (
          <DraggableElement
            key={element.type}
            type={element.type}
            label={element.label}
          />
        ))}
      </div>
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
      className={`p-3 bg-white rounded-md shadow-sm text-gray-700 text-sm font-medium cursor-pointer transition-all duration-200 ${
        isDragging ? "opacity-50" : "hover:bg-gray-200 hover:shadow-md"
      }`}
    >
      {label}
    </div>
  );
};
