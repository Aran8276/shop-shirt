"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const body = await req.json();
  const supabase = createClient();
  // console.log(body); // Body returns as { email: userEmail, password: userPassword }
  const { error } = await supabase.auth.signInWithPassword(body);

  if (error) {
    console.log(error);
    return NextResponse.json(JSON.stringify(error), { status: 400 });
  }
  revalidatePath("/");
  return NextResponse.json({ status: 200 }, { status: 200 });
};

export const GET = async () => {
  redirect("/404");
};
