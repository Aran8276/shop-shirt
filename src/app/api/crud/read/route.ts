"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const supabase = createClient(); //Get the client auth information for supabase RLS data from the client
  try {
    const body = await req.json(); //Receive data from the client
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", body.id);
    if (error) {
      console.log(error);
      return NextResponse.json(error);
    }
    return NextResponse.json(data);
  } catch (SyntaxError) {
    const { data, error } = await supabase.from("products").select("*");
    if (error) {
      console.log(error);
      return NextResponse.json(error);
    }
    return NextResponse.json(data);
  }
};

export const GET = async () => {
  redirect("/404");
};
