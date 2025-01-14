"use client";

import CartItem from "@/components/CartItem";
import React, { useEffect, useState } from "react";
import { initFlowbite } from "flowbite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons/faWhatsapp";

type CartTable = {
  uuid: string;
  content: string;
};

type CartItemType = {
  src: string;
  name: string;
  desc: string;
  price: number;
  qty: number;
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

type UserResponseData = {
  isUserLoggedIn?: boolean;
  userEmail?: string;
  uuid?: string;
};

export default function Page() {
  const [priceArrays, setPriceArrays] = useState<number[]>([]);
  const [priceSum, setPriceSum] = useState(0);
  const [data, setData] = useState<Products[]>([]);
  const [userData, setUserData] = useState<UserResponseData | null>(null);
  const [cartData, setCartData] = useState<CartTable[]>([]);
  const [parsedCartData, setParsedCartData] = useState<number[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [finalDataArray, setFinal] = useState<any[]>([]);

  const fetchCartData = async (uuid: string) => {
    try {
      const res = await fetch("/api/cart/read", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: uuid }),
      });
      const resData = await res.json();
      if (res.status !== 200) {
        throw new Error("Failed to fetch data");
      }
      return resData;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserData = async () => {
    try {
      const res = await fetch("/api/getuser", {
        method: "POST",
      });
      const resData = await res.json();
      if (res.status !== 200) {
        throw new Error("Failed to fetch data");
      }
      return resData;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProductsData = async () => {
    try {
      const res = await fetch("/api/crud/read", {
        method: "POST",
      });
      const resData = await res.json();
      if (res.status !== 200) {
        throw new Error("Failed to fetch data");
      }
      return resData;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductsData().then((res) => {
      setData(res);
      fetchUserData().then((res) => {
        setUserData(res);
      });
    });
  }, []);

  useEffect(() => {
    if (!userData || !userData.uuid || data.length < 1) {
      return;
    }
    fetchCartData(userData.uuid).then((res: any) => {
      setCartData(res);
    });
  }, [data, userData]);

  useEffect(() => {
    if (!cartData || cartData.length < 1) {
      return;
    }
    // console.log(userData);
    // console.log(JSON.stringify(data));
    // console.log(JSON.stringify(parser));
    const parser = JSON.parse(cartData[0].content);
    setParsedCartData(parser);
    setIsReady(true);
  }, [cartData]);

  useEffect(() => {
    if (!isReady) {
      return;
    }
    // const newCartArray = data.filter((obj) => parsedCartData.includes(obj.id));
    const newCartArray = parsedCartData.map((id) =>
      data.find((obj) => obj.id === id)
    );
    setFinal(newCartArray);
  }, [isReady]);

  useEffect(() => {
    if (finalDataArray.length < 0) {
      console.log("Warning: data array length is below 0, returning");
      return;
    }

    console.log(finalDataArray);
  }, [finalDataArray]);

  useEffect(() => {
    if (priceArrays.length < 1) {
      return;
    }
    const sum = priceArrays.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );
    setPriceSum(sum);
  }, [priceArrays]);

  return (
    <main className="flex mt-12 w-screen">
      <div className="mx-40">
        <span className="font-bold text-2xl ">Keranjang</span>
        <div className="px-2 mt-4">
          {finalDataArray.length > 0 ? (
            finalDataArray.map((item, index) => (
              <CartItem
                key={index}
                src={item.src}
                name={item.name}
                desc={item.description}
                priceInt={item.price}
                maxValue={item.qty} /* Maximum in stock */
                qty={1}
                parentArray={priceArrays}
                parentArraySetter={setPriceArrays}
                loadOnce={1}
                id={index}
                width={1000}
                height={1000}
              />
            ))
          ) : (
            <>Loading</>
          )}
          {/* <CartItem src="/sample-box.jpeg" width={1000} height={1000} />
          <CartItem src="/sample-box.jpeg" width={1000} height={1000} />
          <CartItem src="/sample-box.jpeg" width={1000} height={1000} /> */}
        </div>
        <hr className="h-[2px] my-8 bg-gray-700 mx-40 opacity-20" />
        <div className="flex justify-end mx-40">
          <div className="flex flex-col">
            <div className="flex space-x-12">
              <div className="flex flex-col">
                <span className="font-bold text-xl">Total Belanja</span>
                <span className="opacity-75 text-base">
                  {finalDataArray.length} barang
                </span>
              </div>
              <div className="py-3">
                <span className="font-bold text-2xl">
                  Rp{priceSum.toLocaleString()}
                </span>
              </div>
            </div>
            <button
              type="submit"
              className="btn text-white w-[20.6rem] bg-green-500 hover:bg-green-700 cursor-pointer mt-4 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-500 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
            >
              <FontAwesomeIcon
                icon={faWhatsapp}
                className="float-start text-[22px]"
              />
              <span>Checkout Melalui WhatsApp</span>
            </button>
          </div>
        </div>
        <div></div>
      </div>
    </main>
  );
}
