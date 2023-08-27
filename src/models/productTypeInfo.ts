import { AddCategoryResponse, AllCategoryResponse } from "./category";
import { CategoryDetails } from "./product";

export interface ProductTypeInfo {
  categoryInputValue: string;
  categoryDetails: CategoryDetails;
  productType: string;
}

export interface ApiProductTypeInfo {
  productType: string;
  categoryId: string;
}

export interface AddApiProductTypeResponse {
  id: string;
  productType: string;
  created_at: string;
  updated_at: string;
  category: AddCategoryResponse;
}

export interface AllProductTypeResponse {
  id: string;
  created_at: string;
  updated_at: string;
  productType: string;
  category: AllCategoryResponse;
}

export interface ModifyProductTypeInfo {
  data: ProductTypeEditInfo;
  triggerAction: () => void;
}

export interface ProductTypeEditInfo {
  productId: string;
  categoryName: string;
  productName: string;
  categoryId: string;
}
