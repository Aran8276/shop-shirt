import React, { useEffect, useState } from "react";
import Image from "next/image";
import QuantityCount from "./QuantityCount";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCircleInfo } from "@fortawesome/free-solid-svg-icons";

interface SelfProps {
  height: number;
  width: number;
  src: string;
  id: number;
  name: string;
  desc: string;
  priceInt: number;
  qty: number;
  maxValue: number;
  loadOnce?: number;
  parentArray: number[];
  parentArraySetter: Function;
  // availableQty?: number;
}

export default function CartItem(props: SelfProps) {
  const [modifiedPrice, setModifiedPrice] = useState(props.priceInt);

  const update = (newValue: any) => {
    props.parentArraySetter((prevArray: number[]) => {
      const newArray = [...prevArray];
      newArray[props.id] = newValue;
      return newArray;
    });
  };

  useEffect(() => {
    console.log("true");
  }, []);

  return (
    <div className="flex w-[72rem] px-12 space-x-36">
      <div className="w-20 h-fit">
        <Image
          src={props.src}
          width={props.width}
          height={48}
          alt="image"
          className="self-center"
        />
      </div>
      <div className="flex flex-col mt-5">
        <span className="font-bold text-2xl">{props.name}</span>
        <span className="text-base">
          {props.name} {/*Requires text ellipsis soon**/}{" "}
        </span>
        <div className="flex space-x-2">
          <button className="btn btn-error btn-sm w-8 text-white mt-4">
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <button className="btn btn-info btn-sm w-8 text-white mt-4">
            <FontAwesomeIcon icon={faCircleInfo} />
          </button>
        </div>
      </div>
      <div>
        <form>
          <QuantityCount
            returnValueHandler={setModifiedPrice}
            returnArrayHandler={update}
            priceArrays={props.parentArray}
            price={props.priceInt}
            defaultValue={props.qty}
            maxValue={props.maxValue}
            minValue={1}
          />
        </form>
      </div>
      <div className="flex flex-col py-8 text-sm">
        <span className="font-bold text-2xl">
          Rp{modifiedPrice.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
