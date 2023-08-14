import { AddCategoryResponse } from "./category";
export interface ProductDetails {
  categoryDetails?: CategoryDetails;
  invoiceDetails: InvoiceDetails;
  supplierDetails: SupplierDetails;
  productDetails: ProductDetail;
  categoryId?: string;
}

export interface CategoryDetails {
  categoryName: string;
  categoryId: string;
}
export interface InvoiceDetails {
  invoiceNumber: string;
  invoiceDate: Date | null;
}

export interface ProductDetail {
  productName: string;
  purchaseDate: Date | null;
  quantity: number | null;
  price: number | null;
  cgst: number | null;
  sgst: number | null;
}

export interface SupplierDetails {
  supplierName: string;
  supplierAddress: string;
}

export interface AddProductResponse extends ProductDetails {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface AllProductResponse
  extends InvoiceDetails,
    ProductDetail,
    SupplierDetails {
  id: string;
  created_at: string;
  updated_at: string;

  category: AddCategoryResponse;
}

export interface GetProductByIdResponse
  extends InvoiceDetails,
    ProductDetail,
    SupplierDetails {
  id: string;
  created_at: string;
  updated_at: string;
  category: AddCategoryResponse;
}

export type AllProductUrlSearchParams = {
  page: number;
  take: number;
  search: string;
};
