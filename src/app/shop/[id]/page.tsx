"use client";

import React, { useEffect, useState } from "react";
import Carousel from "@/components/Carousel";
import { useParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discount: number | null;
  qty: number;
  category: string;
  src: string;
  srcArray: Array<string>;
}

export default function Page() {
  const [selected, setSelected] = useState(null);
  const [data, setData] = useState<Product[]>([]);
  const { id } = useParams();
  const stringId = id as string;
  const [carouselSrcArray, setCarouselSrcArray] = useState<string[]>([]);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/crud/read", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: parseInt(stringId) }),
      });
      const resData = await res.json();
      res.status == 200 ? setData(resData) : setData([]);
    } catch (error) {
      console.log(error);
    }
  };

  const buttons: any[] = ["S", "M", "XL"];

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(event.target.size.value);
    // setSelected(event.target.size);
    // alert(`You selected: ${event.target.size}`);
    open(
      "https://wa.me/6285722696333?text=Halo%2C%0A%0ASaya%20tertarik%20untuk%20membeli%20%5BNama%20Produk%5D%20yang%20Anda%20tawarkan.%20Saya%20lihat%20ada%20%5BStok%20Produk%5D%20tersedia%20dengan%20%5BVarian%20Produk%5D.%20Bisaka%20Anda%20memberikan%20informasi%20lebih%20lanjut%20mengenai%20harga%20dan%20spesifikasi%20produk%3F%0A%0ASaya%20akan%20menunggu%20respon%20dari%20Anda.%20Terima%20kasih. " +
        selected
    );
  };

  useEffect(() => {
    fetchData();
    console.log(id);
  }, [id]);

  useEffect(() => {
    if (data.length < 1) {
      return;
    }
    setCarouselSrcArray(data[0].srcArray);
  }, [data]);

  return (
    <main>
      <div className="flex space-x-12 mt-24 justify-center">
        <div className="w-[20rem]">
          <Carousel
            imageSrcArray={carouselSrcArray.length < 1 ? [] : carouselSrcArray}
          />
        </div>
        <div className="w-[20rem] px-4 py-6">
          <div className="flex flex-col">
            <div className="flex flex-col">
              <span className="font-bold text-2xl">
                {data.length < 1 ? <>Loading...</> : data[0].name}
              </span>
              <span className="text-base">
                {data.length < 1 ? <>Loading...</> : data[0].description}
              </span>
              {data.length < 1 ? (
                <>Loading...</>
              ) : Number.isInteger(data[0].qty) && data[0].qty > 0 ? (
                <span className="text-base font-bold text-green-500 mt-4">
                  {data[0].qty} stok tersedia
                </span>
              ) : (
                <span className="text-base font-bold text-red-500 mt-4">
                  Stock habis
                </span>
              )}
            </div>
            <div className="mt-4">
              <form onSubmit={(event) => handleSubmit(event)} className="mt-4">
                <div className="flex flex-col mt-4">
                  <label htmlFor="size" className="font-bold">
                    PILIH UKURAN:
                  </label>
                  <div className="flex space-x-4 mt-4">
                    {buttons.map((button, index) => (
                      <input
                        key={index}
                        type="radio"
                        name="size"
                        value={button}
                        aria-label={button}
                        className="btn w-24"
                      />
                    ))}
                  </div>
                  <div className="mt-8 w-[20.6rem]">
                    <button
                      type="submit"
                      className="btn text-white w-[20.6rem] bg-blue-700 hover:bg-blue-800 cursor-pointer focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      <FontAwesomeIcon
                        icon={faShoppingBag}
                        className="float-start text-[22px]"
                      />
                      <span>Masukan Keranjang</span>
                    </button>
                    <button
                      type="submit"
                      className="btn text-white w-[20.6rem] bg-green-500 hover:bg-green-700 cursor-pointer focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-500 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                    >
                      <FontAwesomeIcon
                        icon={faWhatsapp}
                        className="float-start text-[22px]"
                      />
                      <span>Beli Langsung Melalui WhatsApp</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
