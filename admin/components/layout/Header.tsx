"use client";

import { Car, Cog, Music } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-6 py-4 border-b bg-white">
      <h1 className="flex items-center gap-2 text-2xl font-semibold text-gray-800 cursor-pointer">
        <Car />
        Auto Car
      </h1>
      <div className="flex gap-8 text-black">
        <Link href="/" className="flex items-center gap-2">
          <Cog className="w-5 h-5" />
          Config
        </Link>

        <Link href="/list" className="flex items-center gap-2">
          <Music className="w-5 h-5" />
          Car
        </Link>
      </div>
    </header>
  );
}
