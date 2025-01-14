"use client";

import React, { useEffect, useRef, useState } from "react";
import ProductCard from "@/components/ProductCard";
import CrudModal from "@/components/CrudModal";
import ModalActions from "@/components/ModalActions";
import Link from "next/link";

// TODO: Render the admin section conditionally based on the user UUID

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

type DisplayDataCache = {
  name: string;
  description: string;
  price: number;
  category: string;
  srcArray: Array<Object>;
};

export default function page() {
  // Form references for components
  const formRef = useRef(null);
  const formRefEdit = useRef(null);
  const formRefDelete = useRef(null);

  //Data Fetching
  const [data, setData] = useState<Product[]>([]);

  // Image Data (initiateCreateForm)
  const [fileData, setFileData] = useState<any[]>([]); // TODO: Convert this into an array of files (JavaScript: `File`)
  const [previewFileData, setPreviewFileData] = useState<any[]>([]); // TODO: Convert this into an array of files (JavaScript: `File`)
  const [selectedFile, setSelectedFile] = useState();
  const [selectedSingleFile, setSelectedSingleFile] = useState();
  const [fileDataArray, setFileDataArray] = useState<any[]>([]);
  const defaultDataCache: DisplayDataCache = {
    name: "",
    description: "",
    price: 0,
    category: "",
    srcArray: [],
  };
  const [displayDataCache, setDisplayDataCache] =
    useState<DisplayDataCache>(defaultDataCache);
  const [globalFileLength, setGlobalFileLength] = useState(NaN);
  const [primarySrcObject, setPreviewDataBase64] = useState({});
  // const [isCreateFormReadyToSend, setIsCreateFormReadyToSend] = useState(false);

  // Editing preview filler
  const [idToEdit, setIdToEdit] = useState(0);
  const [editNameValue, setNaVal] = useState("");
  const [editPriceValue, setPrVal] = useState(0);
  const [editDescValue, setDeVal] = useState("");

  const handleFileChange = (event: any) => {
    // setFileData(event.target.files[0]);
    setFileData((datas) => [...datas, event.target.files[0]]);
    setSelectedFile(event.target.files[0]);
  };

  const handleSingleFileChange = (event: any) => {
    setPreviewFileData((datas) => [...datas, event.target.files[0]]);
    setSelectedSingleFile(event.target.files[0]);
  };

  const fancyRandomStringGenerator = () => {
    let length = Math.floor(Math.random() * 6) + 10;
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      let char = characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
      result += Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
    }
    return result;
  };

  const initiateCreateForm = (file: any[], event: any, previewFile: any) => {
    const main = async () => {
      event.preventDefault();
      const formData = new FormData(event.target);

      //Text Operations
      const name = formData.get("name");
      const description = formData.get("description");
      const priceString = formData.get("price");
      const priceStringified = priceString
        ? formData.get("price")?.toString()
        : null;
      const priceInt = priceStringified
        ? parseInt(priceStringified.replace(/,/g, "").replace("Rp", ""))
        : null;
      const category = formData.get("category");

      //Image Operations
      setGlobalFileLength(file.length);
      for (let i = 0; i < file.length; i++) {
        const type = file[i].type;
        const filetype = file[i].type.split("/")[1];
        const filename = fancyRandomStringGenerator();
        const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL;
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64String = btoa(
            new Uint8Array(reader.result as ArrayBuffer).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );

          const srcObject = {
            filename: filename,
            filetype: filetype,
            cdnUrl: cdnUrl,
            type: type,
            base64String: base64String,
          };

          setFileDataArray((prevState) => [...prevState, srcObject]);

          if (
            typeof name === "string" &&
            typeof description === "string" &&
            typeof category === "string"
          ) {
            setDisplayDataCache({
              name: name,
              description: description,
              price: priceInt || 0,
              category: category,
              srcArray: [],
            });
          } else {
            // Handle the case where name is a File
          }
        };

        reader.readAsArrayBuffer(file[i]);
      }
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = btoa(
          new Uint8Array(reader.result as ArrayBuffer).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );

        const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL;

        const base64Object = {
          filename: fancyRandomStringGenerator(),
          type: previewFile.type,
          filetype: previewFile.type.split("/")[1],
          cdnUrl: cdnUrl,
          base64String: base64String,
        };
        setPreviewDataBase64(base64Object);
      };

      reader.readAsArrayBuffer(previewFile);
    };
    main();
  };

  // useEffect(() => {
  //   console.log(selectedSingleFile);
  // }, [selectedSingleFile]);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/crud/read", {
        method: "POST",
      });
      const resData = await res.json();
      res.status == 200 ? setData(resData) : setData([]);
    } catch (error) {
      console.log(error);
    }
  };

  const modalEditHandler = (id: number) => {
    setIdToEdit(data[id].id);
    setNaVal(data[id].name);
    setPrVal(data[id].price);
    setDeVal(data[id].description);
  };

  const sendEditForm = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const description = formData.get("description");
    const priceString = formData.get("price");
    const priceStringified = priceString
      ? formData.get("price")?.toString()
      : null;
    const priceInt = priceStringified
      ? parseInt(priceStringified.replace(/,/g, "").replace("Rp", ""))
      : null;

    try {
      const res = await fetch("/api/crud/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idDestination: idToEdit,
          name: name,
          price: priceInt,
          description: description,
        }),
      });
      const status = res.status;
      if (status === 200 && status) {
        fetchData();
        // window.location.reload();
      } else if (status === 400 && status) {
        alert("Error: " + (await res.json()));
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const modalDeleteHandler = (id: number) => {
    setIdToEdit(id);
  };

  const sendDeleteForm = async (id: number, event: any) => {
    event.preventDefault();
    const getSrcFromIndex = data.find((data) => data.id === idToEdit);
    const imageSrcArray = getSrcFromIndex?.srcArray;
    const imageSrc = getSrcFromIndex?.src;
    const splitUrl = imageSrc?.split("/");
    const secondaryFilename = splitUrl ? splitUrl[splitUrl.length - 1] : false;

    try {
      const res = await fetch("/api/crud/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idDestination: id,
          filename: imageSrcArray,
          secondaryFilename: secondaryFilename,
        }),
      });
      const status = res.status;
      if (status === 200 && status) {
        fetchData();
        // window.location.reload();
      } else if (status === 400 && status) {
        alert("Error: " + (await res.json()));
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (fileDataArray.length < 1 || fileDataArray.length < globalFileLength) {
      return;
    }

    const dataToSend = {
      name: displayDataCache.name,
      description: displayDataCache.description,
      price: displayDataCache.price,
      category: displayDataCache.category,
      src: primarySrcObject,
      srcArray: fileDataArray,
    };

    // console.log("File is going to be sent");
    // console.log(dataToSend);

    // Fetcher (Please disable during testing)
    const sendCreateForm = async (body: DisplayDataCache) => {
      try {
        const res = await fetch("/api/crud/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        res.status == 200 ? fetchData() : alert("failed");
      } catch (error) {
        console.log(error);
      }
    };

    sendCreateForm(dataToSend);
  }, [fileDataArray]);

  return (
    <main className="mt-12">
      <div className="flex justify-center">
        <div className="flex flex-col">
          <div className="flex flex-col mb-24">
            <div>
              <span className="text-2xl font-bold">Administrator</span>
            </div>
            <div className="mb-6 mt-6 flex space-x-5">
              <div>
                <label htmlFor="addProductModal" className="btn btn-primary">
                  Buat Produk
                </label>
                {/* Modal Open Button Goes Here */}
                <input
                  type="checkbox"
                  id="addProductModal"
                  className="modal-toggle"
                />{" "}
                {/* Hidden Modal Checkbox Manipulation */}
                <div className="modal" role="dialog">
                  {" "}
                  {/* Modal Contents Goes Here */}
                  <div className="modal-box">
                    <form
                      ref={formRef}
                      onSubmit={(event) =>
                        initiateCreateForm(fileData, event, selectedSingleFile)
                      }
                    >
                      <h3 className="font-bold text-lg">Buat Produk</h3>
                      <div className="py-2">
                        <CrudModal //CRUD MODAL CREATE CRUD MODAL CREATE CRUD MODAL CREATE CRUD MODAL CREATE CRUD MODAL CREATE CRUD MODAL CREATE
                          inputOnChangeFunction={(event: any) =>
                            handleFileChange(event)
                          }
                          inputOnChangeSingleFunction={(event: any) =>
                            handleSingleFileChange(event)
                          }
                          selectedFilePreview={selectedFile}
                          selectedSingleFilePreview={selectedSingleFile}
                        />
                      </div>
                      <div className="modal-action float-start">
                        <ModalActions
                          formRef={formRef}
                          htmlFor="addProductModal"
                        />
                      </div>
                    </form>
                  </div>
                </div>{" "}
                {/* Modal Contents Ends Here */}
              </div>
              <div>
                <Link className="btn btn-primary" href="/admin">
                  Dashboard Admin
                </Link>
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold">Kaos</span>
            </div>
            <div className="grid mt-6 grid-cols-4 gap-16">
              {data.map((name, index) => {
                return (
                  <>
                    <ProductCard
                      price={name.price}
                      src={name.src}
                      databaseId={name.id}
                      editIndex={index}
                      title={name.name}
                      key={index}
                      isAdmin={true}
                      onClickDelete={modalDeleteHandler}
                      onClickEdit={modalEditHandler}
                      editModalhtmlFor="editProductModal"
                      deleteModalhtmlFor="deleteProductModal"
                      scaleAlt=" w-[8rem] "
                    />
                  </>
                );
              })}
              <input
                type="checkbox"
                id="editProductModal"
                className="modal-toggle"
              />{" "}
              {/* Hidden Modal Checkbox Manipulation */}
              <div className="modal" role="dialog">
                {" "}
                {/* Modal Contents Goes Here */}
                <div className="modal-box">
                  <form
                    ref={formRefEdit}
                    onSubmit={(event) => sendEditForm(event)}
                  >
                    <h3 className="font-bold text-lg">
                      Edit Produk {idToEdit}
                    </h3>
                    <div className="py-2">
                      <CrudModal //CRUD MODAL EDIT CRUD MODAL EDIT CRUD MODAL EDIT CRUD MODAL EDIT CRUD MODAL EDIT
                        isEdit={true}
                        inputOnChangeFunction={(event: any) =>
                          handleFileChange(event)
                        }
                        inputOnChangeSingleFunction={(event: any) =>
                          handleSingleFileChange(event)
                        }
                        editNameValue={editNameValue}
                        editPriceValue={editPriceValue}
                        editDescValue={editDescValue}
                        currentlyEditing={idToEdit}
                      />
                    </div>
                    <div className="modal-action float-start">
                      <ModalActions
                        formRef={formRefEdit}
                        htmlFor="editProductModal"
                        isEdit={true}
                      />
                    </div>
                  </form>
                </div>
              </div>{" "}
              <input
                type="checkbox"
                id="deleteProductModal"
                className="modal-toggle"
              />{" "}
              {/* Hidden Modal Checkbox Manipulation */}
              <div className="modal" role="dialog">
                {" "}
                {/* Modal Contents Goes Here */}
                <div className="modal-box">
                  <form
                    ref={formRefDelete}
                    onSubmit={(event) => sendDeleteForm(idToEdit, event)}
                  >
                    <h3 className="font-bold text-lg">
                      Hapus Produk {idToEdit}
                    </h3>
                    <div className="py-2">
                      <label className="block mt-2 mb-2 font-medium text-gray-900 dark:text-white">
                        Apakah anda yakin ingin menghapus ini?
                      </label>
                    </div>
                    <div className="modal-action float-start">
                      <ModalActions
                        formRef={formRefDelete}
                        htmlFor="deleteProductModal"
                        isDelete={true}
                      />
                    </div>
                  </form>
                </div>
              </div>{" "}
            </div>
          </div>
          <div className="flex flex-col mb-24">
            <div>
              <span className="text-2xl font-bold">Celana Dalam</span>
            </div>
            <div className="grid mt-6 grid-cols-4 gap-16">
              {/* <ProductCard
                price={100000}
                src="/boxer.jpeg"
                databaseId={1}
                title="Celana Dalam Boxer"
                scaleAlt=" w-[8rem] "
              /> */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
