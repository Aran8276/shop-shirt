"use client";

import Modal from "@/components/Modal";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const sendFormToServer = async (event: any) => {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: event.target.email.value,
          password: event.target.password.value,
        }),
      });
      const status = res.status;
      if (status === 200 && status) {
        window.location.replace("/");
      } else if (status === 400 && status) {
        alert("Error: " + (await res.json()));
        return;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card shrink-0 w-full max-w-sm bg-base-100">
          <FontAwesomeIcon className="text-[3rem]" icon={faUserPlus} />
          <h1 className="text-3xl text-center font-bold mt-6">Daftar</h1>
          <form className="card-body" onSubmit={sendFormToServer}>
            <div className="form-control">
              <label className="label" htmlFor="email">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="johndoe@gmail.com"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="password">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                id="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <Link
                  // htmlFor="adminAlertModal"
                  href="/login"
                  className="label-text-alt link link-hover cursor-pointer"
                >
                  Sudah punya akun?
                </Link>

                {/* <Modal /> */}
                {/**Ender */}
              </label>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <span>Buat Akun</span>
                )}{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
