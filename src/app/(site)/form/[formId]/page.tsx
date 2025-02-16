"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Page() {
  const { formId } = useParams();
  const [formData, setFormData] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await fetch(`/api/forms/${formId}`);
        if (!response.ok) throw new Error("Failed to fetch form data");
        const data = await response.json();
        setFormData(data.data);
      } catch (error) {
        console.error("Error fetching form:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load form data.",
        });
      }
    };
    if (formId) fetchForm();
  }, [formId, toast]);

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

      const username = "airbaseinc-S3FWPG.IE904E";
      const password = "759021a4-3ed6-4e51-83e4-acb35a31090f";
      const basicAuth = btoa(`${username}:${password}`);

      const webhookCall = await fetch(
        "https://c02-usa-west.integrate-test.boomi.com/ws/simple/executeDetailstestapi",
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${basicAuth}`,
          },
        }
      );

      console.log("webhookCall", webhookCall);

      if (response.ok) {
        toast({
          title: "Success",
          description: "Form submitted successfully!",
        });
      } else {
        throw new Error("Failed to submit form.");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!formData) {
    return <p className="text-center text-gray-500">Loading form...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 w-full">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-xl">
              {formData.title}
              <Badge variant={formData.isPublished ? "default" : "secondary"}>
                {formData.isPublished ? "Published" : "Draft"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">{formData.description}</p>
            <div className="space-y-4">
              {formData.fields.map((field) => {
                let fieldComponent = null;
                switch (field.fieldType) {
                  case "TEXT":
                  case "EMAIL":
                    fieldComponent = (
                      <Input
                        type={field.fieldType.toLowerCase()}
                        placeholder={`Enter ${field.label}`}
                        value={formValues[field.id] || ""}
                        onChange={(e) => handleChange(field.id, e.target.value)}
                      />
                    );
                    break;

                  case "TEXTAREA":
                    fieldComponent = (
                      <Textarea
                        placeholder={`Enter ${field.label}`}
                        value={formValues[field.id] || ""}
                        onChange={(e) => handleChange(field.id, e.target.value)}
                      />
                    );
                    break;

                  case "RADIO":
                    fieldComponent = (
                      <RadioGroup
                        value={formValues[field.id] || ""}
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
                    );
                    break;

                  case "CHECKBOX":
                    fieldComponent = (
                      <div className="flex flex-col space-y-2">
                        {field.options.map((option) => (
                          <div
                            key={option}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={option}
                              checked={
                                formValues[field.id]?.includes(option) || false
                              }
                              onCheckedChange={(checked) => {
                                setFormValues((prev) => ({
                                  ...prev,
                                  [field.id]: checked
                                    ? [...(prev[field.id] || []), option]
                                    : prev[field.id]?.filter(
                                        (val) => val !== option
                                      ) || [],
                                }));
                              }}
                            />
                            <Label htmlFor={option}>{option}</Label>
                          </div>
                        ))}
                      </div>
                    );
                    break;

                  case "DROPDOWN":
                    fieldComponent = (
                      <Select
                        value={formValues[field.id] || ""}
                        onValueChange={(value) => handleChange(field.id, value)}
                      >
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
                    );
                    break;

                  default:
                    fieldComponent = null;
                }
                return (
                  <div key={field.id} className="space-y-2">
                    <Label className="text-lg">
                      {field.label}{" "}
                      {field.isRequired && (
                        <span className="text-red-500">*</span>
                      )}
                    </Label>
                    {fieldComponent}
                  </div>
                );
              })}
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
