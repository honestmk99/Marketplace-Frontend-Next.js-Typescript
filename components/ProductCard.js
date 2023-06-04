import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

function ProductCard({
  id,
  name,
  size,
  image,
  slug,
  price,
  stock,
  category,
  measurement,
  weight,
}) {
  const router = useRouter();

  return (
    <div className="w-full max-w-sm mx-auto overflow-hidden border border-black">
      <div className="h-60 w-full justify-end object-contain">
        <a href={`/products/${id}`}> <img src={image} alt="" /></a>
      </div>
      <div className="mb-2 lg:mt-24 mt-6 lg:pt-4">
        <h3 className="ml-2 text-lg font-bold uppercase">{name}</h3>
        <div className="flex flex-col">
          <span className="ml-2 text-lg leading-7">
            ${price}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
