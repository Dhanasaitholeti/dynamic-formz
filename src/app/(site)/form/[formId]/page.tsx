"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const formData = {
  data: {
    id: "907f1df0-c512-4542-9a6d-762601572b6b",
    title: "Customer Feedback Form",
    description: "A form to collect feedback from customers",
    isPublished: true,
    fields: [
      {
        id: "17a084fe-03b1-4a6b-8141-dbfdba32ac6c",
        label: "Full Name",
        fieldType: "TEXT",
        options: null,
        isRequired: true,
      },
      {
        id: "126aaa63-eded-45f2-9266-bfe9f0156d9c",
        label: "Email",
        fieldType: "EMAIL",
        options: null,
        isRequired: true,
      },
      {
        id: "06eacc32-dce8-41ed-9cb7-43a0cdd88b32",
        label: "How satisfied are you?",
        fieldType: "RADIO",
        options: [
          "Very Satisfied",
          "Satisfied",
          "Neutral",
          "Dissatisfied",
          "Very Dissatisfied",
        ],
        isRequired: true,
      },
    ],
  },
};

export default function Page() {
  const { id: formId, title, description, isPublished, fields } = formData.data;
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (fieldId, value) => {
    setFormValues((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const payload = {
      formId,
      values: Object.entries(formValues).map(([fieldId, value]) => ({
        fieldId,
        value,
      })),
    };

    try {
      const response = await fetch("/api/forms/response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Form submitted successfully!",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to submit form.",
        });
      }
    } catch (error) {
      console.error("Error saving form:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 w-full">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-xl">
              {title}
              <Badge variant={isPublished ? "default" : "secondary"}>
                {isPublished ? "Published" : "Draft"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">{description}</p>
            <div className="space-y-4">
              {fields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <Label className="text-lg">
                    {field.label}{" "}
                    {field.isRequired && (
                      <span className="text-red-500">*</span>
                    )}
                  </Label>
                  {field.fieldType === "TEXT" || field.fieldType === "EMAIL" ? (
                    <Input
                      type={field.fieldType.toLowerCase()}
                      placeholder={`Enter ${field.label}`}
                      value={formValues[field.id] || ""}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                    />
                  ) : field.fieldType === "RADIO" ? (
                    <RadioGroup
                      onValueChange={(value) => handleChange(field.id, value)}
                    >
                      {field.options.map((option) => (
                        <div
                          key={option}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem value={option} id={option} />
                          <Label htmlFor={option}>{option}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  ) : null}
                </div>
              ))}
            </div>
            <Button
              className="mt-6 w-full"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
