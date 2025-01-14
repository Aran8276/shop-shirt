"use client";
import React, { useEffect, useState } from "react";
import "flowbite";

interface SelfProps {
  id?: string;
  defaultValue: number;
  price: number;
  returnValueHandler: Function;
  returnArrayHandler: Function;
  maxValue?: number;
  minValue?: number;
  priceArrays: any[];
}

export default function QuantityCount(props: SelfProps) {
  const qtyReturnValueHandler = (value: number) => {
    props.returnValueHandler(value * props.price);
    props.returnArrayHandler(value * props.price);
  };

  const [value, setValue] = useState(0);

  const increment = () => {
    if (value == props.maxValue) {
      return;
    }
    setValue((prev) => prev + 1);
  };

  const decrement = () => {
    if (value == props.minValue) {
      return;
    }
    setValue((prev) => prev - 1);
  };

  useEffect(() => {
    setValue(props.defaultValue);
  }, [props.defaultValue]);

  useEffect(() => {
    qtyReturnValueHandler(value);
  }, [value]);

  return (
    <>
      <div className="relative flex items-center scale-[1.25] py-16">
        <button
          type="button"
          id="decrement-button"
          onClick={decrement}
          // data-input-counter-decrement={props.id}
          className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
        >
          <svg
            className="w-2.5 h-2.5 text-gray-900 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 2"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h16"
            />
          </svg>
        </button>
        <input
          type="text"
          id={props.id}
          data-input-counter={true}
          className="flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
          placeholder="1"
          value={value || 0}
          // data-input-counter-min="1"
          // data-input-counter-max="50"
          required={true}
        />
        <button
          type="button"
          id="increment-button"
          onClick={increment}
          // data-input-counter-increment={props.id}
          className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
        >
          <svg
            className="w-2.5 h-2.5 text-gray-900 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
