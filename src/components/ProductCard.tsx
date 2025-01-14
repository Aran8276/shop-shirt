import Link from "next/link";
import React from "react";
import Image from "next/image";

type SelfProps = {
  src: string;
  title: string;
  price: number;
  scale?: string;
  scaleAlt?: string;
  isDummy?: boolean;
  isDiscount?: boolean;
  discountPrice?: number;
  databaseId?: number;
  isAdmin?: boolean;
  onClickDelete: any;
  onClickEdit: any;
  editModalhtmlFor: string;
  deleteModalhtmlFor: string;
  editIndex: number;
};

function ProductCard(props: SelfProps) {
  const formattedPrice = props.price.toLocaleString();
  return (
    <>
      {props.isDummy ? (
        /*IF True */
        <div className={"text-sm " + props.scale + " h-fit "}>
          <Image
            alt="image"
            width={1000}
            height={1000}
            loading="lazy"
            className={props.scaleAlt}
            src={props.src}
          />
          <div className="mt-12">{props.title}</div>
          {props.isDiscount ? (
            <div className="flex space-x-4">
              <div className="mt-2 font-bold line-through">
                Rp{formattedPrice}
              </div>
              <div className="mt-2 font-bold">Rp{props.discountPrice}</div>
            </div>
          ) : (
            <div className="mt-2 font-bold">Rp{formattedPrice}</div>
          )}
        </div>
      ) : (
        /*IF False or undefined */
        <div className="flex flex-col">
          <Link
            href={"/shop/" + props.databaseId}
            className={"text-sm " + props.scale + " h-fit "}
          >
            <Image
              alt="image"
              width={1000}
              height={1000}
              loading="lazy"
              className={props.scaleAlt}
              src={props.src}
            />
            <div className="mt-12">{props.title}</div>
            {props.isDiscount ? (
              <div>
                <div className="mt-2 font-bold line-through">
                  Rp{formattedPrice}
                </div>
                <span className="line-through">LineThrough</span>
              </div>
            ) : (
              <div className="mt-2 font-bold">Rp{formattedPrice}</div>
            )}
          </Link>
          <div className="flex mt-4 space-x-2">
            <label
              className="btn btn-sm bg-red-500 text-xs text-white"
              onClick={() => props.onClickDelete(props.databaseId)}
              htmlFor={props.deleteModalhtmlFor}
            >
              Hapus
            </label>
            <label
              className="btn btn-sm bg-blue-500 text-xs text-white"
              onClick={() => props.onClickEdit(props.editIndex)}
              htmlFor={props.editModalhtmlFor}
            >
              Edit
            </label>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductCard;
