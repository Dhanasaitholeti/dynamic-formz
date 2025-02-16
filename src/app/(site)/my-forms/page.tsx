"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function MyFormsPage() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchForms() {
      try {
        const response = await fetch("http://localhost:3000/api/forms/my", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: "5b16111c-7356-4d84-921c-8486b00bc2b8",
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch forms");
        }

        const data = await response.json();
        setForms(data.forms);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchForms();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">My Forms</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {forms.map((form) => (
          <Link href={`/my-forms/${form.id}`} passHref>
            <div
              key={form.id}
              className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
            >
              <h2 className="text-lg font-medium">{form.title}</h2>
              <p className="text-gray-600 mt-1">{form.description}</p>
              <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                <span>
                  Created: {new Date(form.createdAt).toLocaleDateString()}
                </span>
                <span>Responses: {form.responses.length}</span>
              </div>
              <div className="mt-2 text-sm font-medium">
                {form.isPublished ? (
                  <span className="text-green-600">Published</span>
                ) : (
                  <span className="text-gray-500">Draft</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
