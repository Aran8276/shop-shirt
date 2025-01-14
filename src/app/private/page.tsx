"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type UserResponseData = {
  isUserLoggedIn?: boolean;
  userEmail?: string;
  uuid?: string;
};
type Products = {
  id: number;
  name: string;
  description: string;
  price: number;
  discount: number | null;
  qty: number;
  category: string;
  src: string;
  srcArray: Array<string>;
};

type CartTable = {
  uuid: string;
  content: string;
};

export default function PrivatePage() {
  return (
    <div>
      <div />
    </div>
  );
}
