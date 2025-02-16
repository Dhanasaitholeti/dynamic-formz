"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface FormField {
  id: string;
  type: string;
  label: string;
  options?: string[];
  isRequired?: boolean;
}

interface FormCanvasProps {
  formFields: FormField[];
  onSelectField: (field: FormField) => void;
}

export const FormCanvas: React.FC<FormCanvasProps> = ({
  formFields,
  onSelectField,
}) => {
  console.log("Form Fields:", formFields);

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = async (type?: "save" | "publish") => {
    setLoading(true);

    const formData = {
      userId: "5b16111c-7356-4d84-921c-8486b00bc2b8",
      title,
      description,
      isPublished: type === "publish",
      fields: formFields.map((field, index) => ({
        label: field.label,
        fieldType: field.type,
        options: field.options || null,
        isRequired: field.isRequired,
        position: index + 1,
        published: type === "publish",
      })),
    };

    try {
      const response = await fetch("http://localhost:3000/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save form");
      }

      const result = await response.json();
      console.log("Form saved successfully:", result);
      toast({ title: "Success", description: "Form saved successfully!" });
    } catch (error) {
      console.error("Error saving form:", error);
      toast({
        title: "Error",
        description: "Failed to save form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 border border-gray-200 shadow-lg rounded-lg flex flex-col">
      <h2 className="text-xl font-semibold mb-6 text-center">Form Preview</h2>

      <Input
        className="text-xl font-semibold mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter Your Form Title"
      />
      <Textarea
        className="mb-6"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter Your Form Description"
      />

      {formFields.length === 0 ? (
        <p className="text-gray-500">Drag and drop a field to start</p>
      ) : (
        <div className="space-y-6">
          {formFields.map((field) => (
            <div key={field.id} className="flex flex-col space-y-2">
              <Label
                className="text-lg font-medium"
                onClick={() => onSelectField(field)}
              >
                {field.label || "Unnamed Field"}
              </Label>

              {field.type === "TEXT" && (
                <Input
                  type="text"
                  placeholder="Enter text..."
                  className="w-full"
                />
              )}
              {field.type === "NUMBER" && (
                <Input
                  type="number"
                  placeholder="Enter number..."
                  className="w-full"
                />
              )}
              {field.type === "EMAIL" && (
                <Input
                  type="email"
                  placeholder="Enter email..."
                  className="w-full"
                />
              )}
              {field.type === "PASSWORD" && (
                <Input
                  type="password"
                  placeholder="Enter password..."
                  className="w-full"
                />
              )}
              {field.type === "TEXTAREA" && (
                <Textarea
                  rows={4}
                  placeholder="Enter text..."
                  className="w-full"
                />
              )}

              {field.type === "DROPDOWN" && (
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((option, index) => (
                      <SelectItem key={index} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {field.type === "RADIO" && (
                <RadioGroup className="space-y-2">
                  {field.options?.map((option, index) => (
                    <Label key={index} className="flex items-center space-x-3">
                      <RadioGroupItem value={option} />
                      <span className="text-sm">{option}</span>
                    </Label>
                  ))}
                </RadioGroup>
              )}

              {field.type === "CHECKBOX" && (
                <div className="space-y-2">
                  {field.options?.map((option, index) => (
                    <Label key={index} className="flex items-center space-x-3">
                      <Checkbox />
                      <span className="text-sm">{option}</span>
                    </Label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 flex justify-end space-x-4">
        <Button onClick={handleSave} disabled={loading} variant="outline">
          {loading ? "Saving..." : "Save"}
        </Button>
        <Button
          onClick={() => handleSave("publish")}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          Publish
        </Button>
      </div>
    </div>
  );
};
