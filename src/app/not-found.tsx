"use server";

import { redirect } from "next/navigation";

async function NotFoundPage() {
  redirect("/404");
}

export default NotFoundPage;
