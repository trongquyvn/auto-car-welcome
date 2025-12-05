import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!,
);

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const releasePath = `release/${id}.json`;
    await supabase.storage
      .from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET!)
      .upload(releasePath, JSON.stringify({ release: false }), {
        upsert: true,
      });

    return NextResponse.json(id);
  } catch (error) {
    console.log("error: ", error);
    return NextResponse.json(false);
  }
}
