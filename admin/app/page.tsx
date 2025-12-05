"use client";

import { cars } from "@/constants";
import { useState } from "react";
import toast from "react-hot-toast";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [car, setCar] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (!car || !file) {
        toast.error("Chọn user và file đi người đẹp");
        return;
      }
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("key", car);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data) {
        toast.success("Uploaded successfully!");

        setFile(null);
        setCar("");
        // Reset input type=file
        const input =
          document.querySelector<HTMLInputElement>("input[type=file]");
        if (input) input.value = "";
        setLoading(false);
      } else {
        toast.error("Error");
      }
    } catch (error) {
      console.log("error: ", error);
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
          className={`w-full text-white py-2 rounded transition ${
            loading ? "bg-gray-300" : " bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          Upload
        </button>
      </form>
    </div>
  );
}
