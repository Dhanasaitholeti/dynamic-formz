const PropertiesPanel: React.FC<{
  selectedElement: any;
  updateProperty: (key: string, value: string) => void;
}> = ({ selectedElement, updateProperty }) => {
  if (!selectedElement) {
    return (
      <div className="w-64 p-5 bg-gray-50 shadow-lg rounded-r-xl border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Properties Panel
        </h2>
        <p className="text-gray-500">Select an element to edit properties.</p>
      </div>
    );
  }

  return (
    <div className="w-64 p-5 bg-gray-50 shadow-lg rounded-xl border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        {selectedElement.label} Properties
      </h2>
      <div className="space-y-3">
        <div>
          <Label>Label</Label>
          <Input
            value={selectedElement.label}
            onChange={(e) => updateProperty("label", e.target.value)}
          />
        </div>

        {selectedElement.placeholder !== undefined && (
          <div>
            <Label>Placeholder</Label>
            <Input
              value={selectedElement.placeholder}
              onChange={(e) => updateProperty("placeholder", e.target.value)}
            />
          </div>
        )}

        {selectedElement.options && selectedElement.options.length > 0 && (
          <div>
            <Label>Options</Label>
            {selectedElement.options.map((option, index) => (
              <Input
                key={index}
                value={option}
                onChange={(e) =>
                  updateProperty(
                    "options",
                    selectedElement.options.map((opt, i) =>
                      i === index ? e.target.value : opt
                    )
                  )
                }
              />
            ))}
            <Button
              className="mt-2 w-full"
              onClick={() =>
                updateProperty("options", [...selectedElement.options, ""])
              }
            >
              Add Option
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertiesPanel;
