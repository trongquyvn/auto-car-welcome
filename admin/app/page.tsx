"use client";

import { cars } from "@/constants";
import { useState } from "react";
import toast from "react-hot-toast";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [car, setCar] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (!file || !car) {
        toast.error("Please enter car and upload file");
        return;
      }

      // convert file to Base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result;
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileName: car + ".mp3",
            fileData: base64,
            key: car,
          }),
        });
        const data = await res.json();
        toast.success(data.message);

        setFile(null);
        setCar("");
        // Reset input type=file
        const input =
          document.querySelector<HTMLInputElement>("input[type=file]");
        if (input) input.value = "";
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.log("handleSubmit error: ", error);
      toast.error("Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl mt-[-100px]"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Upload MP3</h1>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">User</label>
          <select
            value={car}
            onChange={(e) => setCar(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select user</option>
            {cars.map((e) => (
              <option key={e.id} value={e.value}>
                {e.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            MP3 File
          </label>
          <input
            type="file"
            accept=".mp3"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
