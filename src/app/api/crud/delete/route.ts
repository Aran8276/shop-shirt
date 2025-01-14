"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const body = await req.json(); //Receive data from the client
  const supabase = createClient(); //Get the client auth information for supabase RLS data from the client

  const firstOperation = async () => {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", body.idDestination);

    if (error) {
      console.log("error");
      console.log(error);
      return NextResponse.json({ error }, { status: 500 });
    }
  };

  const secondOperation = async () => {
    const outputArray = JSON.parse(body.filename);
    let srcArray = outputArray.map((outputArray: string) => {
      let parts = outputArray.split("/");
      return parts[parts.length - 1];
    });

    const { error } = await supabase.storage.from("products").remove(srcArray);
    if (error) {
      console.log("error");
      console.log(error);
      return NextResponse.json({ error }, { status: 500 });
    }
  };

  firstOperation();
  secondOperation();

  return NextResponse.json({ message: "success" }, { status: 200 });
};

export const GET = async () => {
  redirect("/404");
};
