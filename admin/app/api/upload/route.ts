import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!,
);

export const runtime = "nodejs"; // Bắt buộc khi ghi file, upload

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const key = formData.get("key");

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    // convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Tạo path file unique
    const fileExt = file.name.split(".").pop();
    const fileName = `${key}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    // Upload lên Supabase Storage
    await supabase.storage
      .from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET!)
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: true,
      });

    const releasePath = `release/${key}.json`;
    await supabase.storage
      .from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET!)
      .upload(releasePath, JSON.stringify({ release: true }), {
        upsert: true,
      });

    return NextResponse.json(true);
  } catch (e: any) {
    console.error("Server error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
