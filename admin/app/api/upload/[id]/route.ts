import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface Params {
  id: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Params },
) {
  const id = params.id;

  const releaseDir = path.join(process.cwd(), "public", "release");
  if (!fs.existsSync(releaseDir)) fs.mkdirSync(releaseDir, { recursive: true });
  const fileReleasePath = path.join(releaseDir, `${id}.json`);
  fs.writeFileSync(fileReleasePath, JSON.stringify({ release: false }));

  return NextResponse.json({ id });
}
