import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { key, fileName, fileData } = body;

  if (!fileName || !fileData) {
    return NextResponse.json({ message: "Missing file" }, { status: 400 });
  }

  // Decode Base64
  const matches = fileData.match(/^data:.+;base64,(.+)$/);
  if (!matches)
    return NextResponse.json({ message: "Invalid file data" }, { status: 400 });

  const buffer = Buffer.from(matches[1], "base64");

  const publicDir = path.join(process.cwd(), "public", "audio");
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

  const filePath = path.join(publicDir, fileName);
  fs.writeFileSync(filePath, buffer);

  const releaseDir = path.join(process.cwd(), "public", "release");
  if (!fs.existsSync(releaseDir)) fs.mkdirSync(releaseDir, { recursive: true });
  const fileReleasePath = path.join(releaseDir, `${key}.json`);
  fs.writeFileSync(fileReleasePath, JSON.stringify({ release: true }));

  const url = `/audio/${fileName}`;
  return NextResponse.json({ message: "Uploaded successfully!", url });
}
