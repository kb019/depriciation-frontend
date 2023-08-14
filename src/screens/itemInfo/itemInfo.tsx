import React from "react";
import ComponentWithHeader from "../../common/componentWithHeader";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../redux/api/productApiSlice";
import ItemDetail from "../../components/itemInfo/itemDetail";
import Loader from "../../common/loader";

function ItemInfo() {
  const { productId } = useParams();
  const { data: itemData, isLoading: itemLoading } = useGetProductByIdQuery({
    productId: productId!,
  });

  if (itemLoading) return <Loader />;
  return (
    <ComponentWithHeader title="Item Details">
      <div className="bg-white rounded-lg grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 border-2 border-gray-300">
        {/* Supplier Details Start */}
        <div className="p-4  sm:border-r-2 border-gray-300">
          <h3 className="font-semibold">Supplier Details</h3>
          <ItemDetail title={"Supplier Name"} desc={itemData?.supplierName!} />
          <ItemDetail
            title={"Supplier Address"}
            desc={itemData?.supplierAddress!}
          />
        </div>
        {/* Supplier Details End */}
        {/* Product Details Start */}
        <div className="p-4  sm:border-t-0 border-t-2 border-gray-300">
          <h3 className="font-semibold">Product Details</h3>

          <ItemDetail title={"Product Name"} desc={itemData?.productName!} />
          <ItemDetail
            title={"Purchase Date"}
            desc={new Date(itemData?.purchaseDate!).toDateString()}
          />
          <ItemDetail title={"Product Price"} desc={`₹ ${itemData?.price}`} />
          <ItemDetail title={"Product Price"} desc={`₹ ${itemData?.price}`} />
          <ItemDetail title={"Quantity"} desc={`${itemData?.quantity}`} />
          <ItemDetail title={"CGST"} desc={`${itemData?.cgst} %`} />
          <ItemDetail title={"SGST"} desc={`${itemData?.sgst} %`} />
        </div>
        {/* {Product Details End} */}
        {/* Invoice Details Start */}
        <div className="p-4 md:border-l-2 border-t-2 md:border-t-0 md:col-span-1 col-span-full border-gray-300">
          <h3 className="font-semibold">Invoice Details</h3>

          <ItemDetail
            title={"Invoice Number"}
            desc={itemData?.invoiceNumber!}
          />
          <ItemDetail
            title={"Invoice Date"}
            desc={new Date(itemData?.invoiceDate!).toDateString()}
          />
        </div>
        {/* {Invoice Details End} */}
      </div>
    </ComponentWithHeader>
  );
}

export default ItemInfo;
