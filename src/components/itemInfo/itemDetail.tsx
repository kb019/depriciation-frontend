import React from "react";

function ItemDetail({title,desc}:{title:string,desc:string}) {
  return (
    <div className="mt-4">
      <h5 className="text-gray-700">{title}</h5>
      <div className="text-sm mt-1 text-gray-500 break-words">{desc}</div>
    </div>
  );
}

export default ItemDetail;
