"use client";

import AdminContent from "@/components/AdminContent";
import AdminSidebar from "@/components/AdminSidebar";
import CrudModal from "@/components/CrudModal";
import ModalActions from "@/components/ModalActions";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState({});

  const fetchData = async () => {
    try {
      const res = await fetch("/api/crud/read", {
        method: "POST",
      });
      const resData = await res.json();
      res.status == 200 ? setData(resData) : setData({});
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex">
      <AdminSidebar
        userEmail="aran8276@gmail.com"
        userName="Aran8276"
        avatarSrc="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
      />
      <div className="w-screen flex justify-center px-8 py-12">
        <div className="flex flex-col">
          <AdminContent />
          <div className="flex justify-center py-24">
            <pre>
              {/* {`{
                  "userId": 1,
                  "id": 1,
                  "title": "delectus aut autem",
                  "completed": false
                }`} */}
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
