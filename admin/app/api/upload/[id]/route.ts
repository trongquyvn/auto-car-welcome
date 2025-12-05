import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const releaseDir = path.join(process.cwd(), "public", "release");
  if (!fs.existsSync(releaseDir)) fs.mkdirSync(releaseDir, { recursive: true });
  const fileReleasePath = path.join(releaseDir, `${id}.json`);
  fs.writeFileSync(fileReleasePath, JSON.stringify({ release: false }));

  return NextResponse.json({ id });
}
