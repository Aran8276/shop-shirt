"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { decode } from "base64-arraybuffer";

export const POST = async (req: Request) => {
  const body = await req.json(); //Receive data from the client
  const supabase = createClient(); //Get the client auth information for supabase RLS data from the client

  const uploadFile = async (
    filename: string,
    base64data: string,
    contentType: string
  ) => {
    const { error } = await supabase.storage
      .from("products")
      .upload(`/${filename}`, decode(base64data), {
        cacheControl: "3600",
        upsert: false,
        contentType: contentType,
      });

    if (error) {
      console.log("error");
      console.log(error);
      return NextResponse.json({ error }, { status: 500 });
    }
  };

  const insertDatabase = async (from: string, data: object) => {
    const { error } = await supabase.from(from).insert(data);
    if (error) {
      console.log("error");
      console.log(error);
      return NextResponse.json({ error }, { status: 500 });
    }
  };

  const parsedImageArray = body.srcArray;
  const srcDBArray = [];

  for (let i = 0; i < parsedImageArray.length; i++) {
    uploadFile(
      `${parsedImageArray[i].filename}.${parsedImageArray[i].filetype}`,
      parsedImageArray[i].base64String,
      parsedImageArray[i].type
    );
    srcDBArray.push(
      `${parsedImageArray[i].cdnUrl}${parsedImageArray[i].filename}.${parsedImageArray[i].filetype}`
    );
  }

  uploadFile(
    `${body.src.filename}.${body.src.filetype}`,
    body.src.base64String,
    body.src.type
  );

  insertDatabase("products", {
    name: body.name,
    description: body.description,
    price: body.price,
    category: body.category,
    src: `${body.src.cdnUrl}${body.src.filename}.${body.src.filetype}`,
    srcArray: JSON.stringify(srcDBArray),
  });

  return NextResponse.json({ message: "success" }, { status: 200 });

  // Validation should be done here
};

export const GET = async () => {
  redirect("/404");
};
