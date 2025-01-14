"use client";

import React from "react";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import Image from "next/image";

function index() {
  return (
    <main className="flex justify-center mx-24">
      <div className="flex flex-col">
        {/* <div className="flex w-screen">
          <div className="flex flex-col self-start mt-36 h-[10rem] mx-12 w-[80rem]">
            <span className="text-7xl font-bold">SIDI ROOM Kaos</span>
            <span className="text-4xl w-[24rem] mt-8">
              Nyaman Dipakai, Gaya Tak Terkalahkan
            </span>

            <button
              type="button"
              className="text-white w-[9rem] mt-16 bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-bold rounded-full text-sm px-5 py-4 text-center me-2 mb-2"
            >
              BELANJA
            </button>
          </div>
          <Image src="/green_miatex.jpeg" className="w-[40rem]" />
        </div> */}
        <div className="hero min-h-screen">
          <div className="hero-content flex-col space-x-24 lg:flex-row">
            <Image
              alt="image"
              width={1000}
              height={1000}
              loading="lazy"
              src="/green_miatex.jpeg"
              className="max-w-[30rem]"
            />
            <div className="w-[32rem]">
              <h1 className="text-5xl font-bold">Kaos Sidi Room</h1>
              <p className="py-6">
                Kaos Sidi Room menggabungkan kenyamanan dan gaya dengan desain
                yang modern dan minimalis. Terbuat dari bahan katun berkualitas
                tinggi yang menjamin kelembutan dan daya tahan, kaos ini cocok
                untuk digunakan sehari-hari atau acara kasual.
              </p>
              <Link href="/shop" className="btn btn-primary">
                Belanja Sekarang
              </Link>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-12">
          <div className="flex flex-col">
            <div className="flex justify-center">
              <div className="flex flex-col">
                <span className="text-3xl font-bold tracking-[0.1em]">
                  Beragam Warna
                </span>
                <span className="text-sm mt-2 text-center">Sangat Beragam</span>
              </div>
            </div>
            <div className="flex justify-evenly space-x-24">
              <ProductCard
                price={100000}
                src="/sample-box.jpeg"
                databaseId={1}
                title="Kaos SIDI ROOM"
                scaleAlt=" w-[14rem] "
              />
              <ProductCard
                price={100}
                src="/sample-box.jpeg"
                databaseId={1}
                title="Kaos SIDI ROOM"
                scaleAlt=" w-[14rem] "
              />
              <ProductCard
                price={100}
                src="/sample-box.jpeg"
                databaseId={1}
                title="Kaos SIDI ROOM"
                scaleAlt=" w-[14rem] "
              />
              <ProductCard
                price={100}
                src="/sample-box.jpeg"
                databaseId={1}
                title="Kaos SIDI ROOM"
                scaleAlt=" w-[14rem] "
              />
            </div>
            <div className="flex justify-center mt-24">
              <Link href="/shop" className="btn btn-primary">
                Jelajahi
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default index;
