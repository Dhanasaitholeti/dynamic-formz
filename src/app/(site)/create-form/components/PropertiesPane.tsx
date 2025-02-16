import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormField {
  id: string;
  label: string;
  type: string;
  options?: string[];
}

interface PropertiesPanelProps {
  selectedField: FormField | null;
  onUpdateField: (updatedField: FormField) => void;
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedField,
  onUpdateField,
}) => {
  if (!selectedField)
    return (
      <div className="p-4 bg-gray-50 shadow-lg border border-gray-200">
        Select a field to edit properties
      </div>
    );

  const handleChange = (key: keyof FormField, value: any) => {
    onUpdateField({ ...selectedField, [key]: value });
  };

  return (
    <div className="w-64 p-4 bg-gray-50 shadow-lg border border-gray-200">
      <h3 className="text-lg font-semibold">Properties</h3>

      <div className="mt-2">
        <Label>Label</Label>
        <Input
          value={selectedField.label}
          onChange={(e) => handleChange("label", e.target.value)}
        />
      </div>

      {selectedField.type === "TEXT" && (
        <div className="mt-2">
          <Label>Placeholder</Label>
          <Input
            value={selectedField.options?.[0] || ""}
            onChange={(e) => handleChange("options", [e.target.value])}
          />
        </div>
      )}

      {(selectedField.type === "RADIO" ||
        selectedField.type === "CHECKBOX" ||
        selectedField.type === "DROPDOWN") && (
        <div className="mt-2">
          <Label>Options</Label>
          {selectedField.options?.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                value={option}
                onChange={(e) => {
                  const newOptions = [...(selectedField.options || [])];
                  newOptions[index] = e.target.value;
                  handleChange("options", newOptions);
                }}
              />
              <button
                type="button"
                onClick={() => {
                  const newOptions = (selectedField.options || []).filter(
                    (_, i) => i !== index
                  );
                  handleChange("options", newOptions);
                }}
                className="text-red-500"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              handleChange("options", [...(selectedField.options || []), ""])
            }
            className="mt-2 text-blue-500"
          >
            + Add Option
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertiesPanel;
