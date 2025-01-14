import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export const POST = async () => {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();
  if (error) {
    return console.log(error);
  }

  redirect("/login");
};

export const GET = async () => {
  redirect("/404");
};
