"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const body = await req.json(); //Receive data from the client
  const supabase = createClient(); //Get the client auth information for supabase RLS data from the client

  const { error } = await supabase
    .from("products")
    .update({
      name: body.name,
      price: body.price,
      description: body.description,
    })
    .eq("id", body.idDestination);

  if (error) {
    console.log("error");
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ message: "success" }, { status: 200 });

  // console.log(body); // Body returns as { email: userEmail, password: userPassword }
};

export const GET = async () => {
  redirect("/404");
};
