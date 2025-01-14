import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const POST = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (!data?.user) {
    revalidatePath("/");
    return NextResponse.json({}, { status: 202 });
  } else if (error) {
    return NextResponse.json({}, { status: 500 });
  }
  return NextResponse.json(
    {
      isUserLoggedIn: true,
      userEmail: data.user.email,
      uuid: data.user.id,
    },
    { status: 200 }
  );
};

export const GET = async () => {
  redirect("/404");
};
