import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const audioDir = path.join(process.cwd(), "public", "audio");
  if (!fs.existsSync(audioDir)) {
    return NextResponse.json({ files: [] });
  }

  const files = fs
    .readdirSync(audioDir)
    .filter((f) => f.endsWith(".mp3"))
    .map((fileName) => ({
      name: fileName,
      url: `/audio/${fileName}`,
    }));

  return NextResponse.json({ files });
}
