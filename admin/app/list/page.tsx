"use client";

import { useEffect, useState } from "react";
import { cars } from "@/constants";

interface FileItem {
  name: string;
  url: string;
}

export default function ListFile() {
  const [files, setFiles] = useState<FileItem[]>([]);

  useEffect(() => {
    fetch("/api/list-files")
      .then((res) => res.json())
      .then((data) => setFiles(data.files))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-white p-6 w-full">
      <h2 className="text-xl font-bold mb-4">Uploaded MP3 Files</h2>
      {files.length === 0 ? (
        <p className="text-gray-500">No files uploaded yet.</p>
      ) : (
        <ul className="space-y-3">
          {cars.map((e) => {
            const f = files.find((f) => f.name.includes(e.value));
            return (
              <li key={e.id} className="flex justify-between items-center">
                <span className="truncate max-w-xs">{e.name}</span>
                {f && (
                  <a
                    href={f.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline ml-4"
                  >
                    View
                  </a>
                )}
              </li>
            );
          })}
          {/* {files.map((file) => (
            <li key={file.name} className="flex justify-between items-center">
              <span className="truncate max-w-xs">{file.name}</span>
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline ml-4"
              >
                View
              </a>
            </li>
          ))} */}
        </ul>
      )}
    </div>
  );
}
