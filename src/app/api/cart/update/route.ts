"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const supabase = createClient(); //Get the client auth information for supabase RLS data from the client
  try {
    const body = await req.json(); //Receive data from the client
    const { data, error } = await supabase
      .from("user_carts")
      .select("*")
      .eq("uuid", body.id);
    if (error) {
      console.log(error);
      return NextResponse.json(error);
    }
    console.log(`Data is outputted: ${JSON.stringify(data)}`);
    return NextResponse.json(data);
  } catch (SyntaxError) {
    return NextResponse.json(
      {
        status: 500,
        message: "POST Body is required",
      },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  redirect("/404");
};
