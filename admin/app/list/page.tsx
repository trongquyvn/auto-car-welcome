"use client";

import { useEffect, useState } from "react";
import { cars, publicURL } from "@/constants";
import { LoaderCircle } from "lucide-react";

export default function ListFile() {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/list-files`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setFiles(data);
        }
      })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-white p-6 w-full">
      <h2 className="text-xl font-bold mb-4">Uploaded MP3 Files</h2>
      {!loading ? (
        <>
          {files.length === 0 ? (
            <p className="text-gray-500">No files uploaded yet.</p>
          ) : (
            <ul className="space-y-3">
              {cars.map((e) => {
                const f = files.find((f: any) => f.name.includes(e.value));
                return (
                  <li
                    key={e.id}
                    className="flex justify-between items-center pb-1 mb-6 border-b"
                  >
                    <span className="truncate max-w-xs">{e.name}</span>
                    {f && (
                      <a
                        onClick={() => {
                          window.open(
                            `${publicURL}/uploads/${f.name}?ts=${Date.now()}`,
                          );
                        }}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline ml-4 cursor-pointer"
                      >
                        View
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </>
      ) : (
        <LoaderCircle className="animate-spin" />
      )}
    </div>
  );
}
