import React from "react";

interface SelfProps {
  htmlFor: string;
  formRef: React.RefObject<HTMLFormElement>;
  isEdit?: boolean;
  isDelete?: boolean;
}

export default function ModalActions(props: SelfProps) {
  return (
    <>
      <label
        onClick={() =>
          props.formRef.current && props.formRef.current.requestSubmit()
        }
        htmlFor={props.htmlFor}
        className={
          props.isDelete
            ? "btn text-white inline-flex items-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            : "btn text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        }
      >
        {props.isDelete ? (
          <></>
        ) : (
          <svg
            className="me-1 -ms-1 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        )}

        {props.isEdit ? (
          <> Edit Produk </>
        ) : props.isDelete ? (
          <>Konfirmasi</>
        ) : (
          <> Tambahkan Produk </>
        )}
      </label>
      <label htmlFor={props.htmlFor} className="btn">
        Tutup
      </label>
    </>
  );
}
