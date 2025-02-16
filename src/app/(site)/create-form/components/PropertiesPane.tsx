import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

  const handleChange = (key: keyof FormField, value: string) => {
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

      {selectedField.type === "text" && (
        <div className="mt-2">
          <Label>Placeholder</Label>
          <Input
            value={selectedField.options?.[0] || ""}
            onChange={(e) => handleChange("options", [e.target.value])}
          />
        </div>
      )}
    </div>
  );
};

export default PropertiesPanel;
