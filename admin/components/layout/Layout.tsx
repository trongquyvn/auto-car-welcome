"use client";

import Header from "./Header";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // For authenticated pages - layout with sidebar and header
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div
        className="flex-1 flex flex-col"
        style={{ backgroundColor: "#f5f4f4" }}
      >
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
