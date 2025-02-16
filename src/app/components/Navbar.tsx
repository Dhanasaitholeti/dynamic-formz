"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-semibold">
        <Link href="/">Dynamic Formz</Link>
      </h1>

      <div className="hidden md:flex space-x-6">
        <Link href="/my-forms" className="text-gray-700 hover:text-blue-600">
          My Forms
        </Link>
        <Link href="/create-form" className="text-gray-700 hover:text-blue-600">
          Create Form
        </Link>
        <Link href="/login" className="text-gray-700 hover:text-blue-600">
          Login
        </Link>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={20} />
      </Button>

      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col space-y-4 py-4 px-6 md:hidden">
          <Link
            href="/create-form"
            className="text-gray-700 hover:text-blue-600"
          >
            Create Form
          </Link>
          <Link href="/login" className="text-gray-700 hover:text-blue-600">
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
