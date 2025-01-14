"use client";

import { faRepeat, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

interface SelfProps {
  inputOnChangeFunction: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputOnChangeSingleFunction: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  currentlyEditing?: number;
  editNameValue?: string;
  editPriceValue?: number;
  editDescValue?: string;
  isEdit?: boolean;
  selectedFilePreview?: any;
  selectedSingleFilePreview?: any;
}

export default function CrudModal(props: SelfProps) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");

  const [isMaxImageReached, setIsMaxImageReached] = useState(false);
  const [preview, setPreview] = useState<string[]>([]);

  const [isSingleImageOccupied, setIsSingleImageOccupied] = useState(false);
  const [singleImagePreview, setSingleImagePreview] = useState("");

  // Update the preview whenever props.selectedFilePreview changes
  useEffect(() => {
    if (!props.selectedFilePreview) {
      setPreview([]);
      return;
    }
    if (isMaxImageReached) {
      return;
    }
    const objectUrl: string = URL.createObjectURL(props.selectedFilePreview);
    setPreview((prevPreview) => [...prevPreview, objectUrl]);
    if (preview.length == 3) {
      setIsMaxImageReached(true);
    }
    return () => URL.revokeObjectURL(objectUrl);
  }, [props.selectedFilePreview]);

  useEffect(() => {
    if (!props.selectedSingleFilePreview) {
      setSingleImagePreview("");
      return;
    }
    const objectUrl: string = URL.createObjectURL(
      props.selectedSingleFilePreview
    );
    setSingleImagePreview(objectUrl);
    setIsSingleImageOccupied(true);

    return () => URL.revokeObjectURL(objectUrl);
  }, [props.selectedSingleFilePreview]);

  useEffect(() => {
    if (preview.length < 4) {
      setIsMaxImageReached(false);
    }
  }, [preview]);

  const cancelImage = (index: number) => {
    const removeItemAtIndex = (index: number) => {
      setPreview((prevArray) => {
        return prevArray.filter((item, i) => i !== index);
      });
    };
    removeItemAtIndex(index);
  };

  useEffect(() => {
    setTitle(props.editNameValue ? props.editNameValue : "");
    setDesc(props.editDescValue ? props.editDescValue : "");
    setPrice(
      props.editPriceValue ? `Rp${props.editPriceValue.toLocaleString()}` : ""
    );
  }, [props.currentlyEditing]);

  const handleChangeName = (event: any) => {
    setTitle(event.target.value);
  };

  const handleChangeDesc = (event: any) => {
    setDesc(event.target.value);
  };

  const handleChange = (event: any) => {
    const numberInput = parseInt(
      event.target.value.replace(/,/g, "").replace("Rp", "")
    );
    const formattedNumberReturn = numberInput.toLocaleString();
    Number.isNaN(numberInput) || 0
      ? setPrice("")
      : setPrice(`Rp${formattedNumberReturn}`);
  };

  return (
    <div className="grid gap-4 grid-cols-2">
      <div className="col-span-2">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Nama Produk
        </label>
        <input
          value={title}
          type="text"
          onChange={handleChangeName}
          name="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="Ketik nama produk"
          required={true}
        />
      </div>
      <div className="col-span-2 sm:col-span-1">
        <label
          htmlFor="price"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Harga
        </label>
        <input
          type="text"
          name="price"
          onChange={handleChange}
          maxLength={12}
          value={price}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="Rp14,000"
          required={true}
        />
      </div>
      <div className="col-span-2 sm:col-span-1">
        <label
          htmlFor="category"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Kategori
        </label>
        <select
          name="category"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        >
          <option value="false">Pilih Kategori</option>
          <option value="kaos">Kaos</option>
          <option value="boxer">Boxer</option>
        </select>
      </div>
      <div className="col-span-2">
        <label
          htmlFor="description"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Deskripsi Produk
        </label>
        <textarea
          name="description"
          value={desc}
          onChange={handleChangeDesc}
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Ketik deskripsi produk disini"
        ></textarea>
      </div>

      <div className="flex flex-col space-y-12">
        <div className="col-span-1">
          <label
            htmlFor="image"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Preview Gambar
          </label>
          {props.isEdit ? (
            <span className="block mb-2 text-sm font-medium text-red-500 dark:text-red-200">
              Untuk sementara ini, pengeditan gambar masih belum
              diimplementasikan{" "}
            </span>
          ) : (
            <div className="flex space-x-12 mx-8 mt-4 w-max">
              {isSingleImageOccupied ? (
                <div className="w-16 flex self-center border-[1px] p-1  border-black rounded-lg">
                  <img className="" src={singleImagePreview} />
                </div>
              ) : (
                <></>
              )}
              <label
                className={
                  "btn btn-lg w-16 self-center " +
                  (isSingleImageOccupied
                    ? " relative right-28 hover:opacity-50 bg-inherit border-none shadow-none h-max "
                    : "")
                }
              >
                <input
                  type="file"
                  className="hidden"
                  onChange={(event) => props.inputOnChangeSingleFunction(event)}
                  required={true}
                />
                {isSingleImageOccupied ? (
                  <FontAwesomeIcon
                    icon={faRepeat}
                    className="text-black text-2xl"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4"
                    viewBox="0 0 448 512"
                  >
                    <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                  </svg>
                )}
              </label>
            </div>
          )}
        </div>

        <div className="col-span-1">
          <label
            htmlFor="image"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Gambar Produk
          </label>
          {props.isEdit ? (
            <span className="block mb-2 text-sm font-medium text-red-500 dark:text-red-200">
              Untuk sementara ini, pengeditan gambar masih belum
              diimplementasikan{" "}
            </span>
          ) : (
            <div className="flex space-x-12 mx-8 mt-4 w-max">
              {preview.map((item, index) => (
                <div className="w-16 flex self-center border-[1px] p-1  border-black rounded-lg">
                  <img className="" src={item} key={index} />
                  <FontAwesomeIcon
                    className="w-4 relative right-3 cursor-pointer"
                    onClick={() => cancelImage(index)}
                    icon={faXmark}
                  />
                </div>
              ))}

              <label
                className={
                  "btn btn-lg w-16 self-center " +
                  (isMaxImageReached ? "hidden" : "")
                }
              >
                <input
                  type="file"
                  className="hidden"
                  onChange={(event) => props.inputOnChangeFunction(event)}
                  required={true}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4"
                  viewBox="0 0 448 512"
                >
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
