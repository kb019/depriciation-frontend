import {
  AddApiProductTypeResponse,
  AllProductTypeResponse,
} from "./../../models/productTypeInfo";
import {
  AddUpdateProductDetail,
  AllProductResponse,
  GetProductByIdResponse,
} from "./../../models/product";

import { PaginatedResponse } from "../../models/paginatedResponse";
import {
  AddProductResponse,
  AllProductUrlSearchParams,
  ProductDetails,
} from "../../models/product";
import { apiSlice } from "../auth/authApi";
import { ApiProductTypeInfo } from "../../models/productTypeInfo";
import {
  AllCategoryResponse,
  AllCategoryUrlParams,
} from "../../models/category";
import { PaginationRequestType } from "../../models/paginatedRequestType";

export const productTypeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addNewProductType: builder.mutation<
      AddApiProductTypeResponse,
      ApiProductTypeInfo
    >({
      query: (productTypeDetails) => ({
        url: "/api/v1/productType",
        method: "POST",
        body: productTypeDetails,
      }),
    }),
    getAllProductsType: builder.query<
      PaginatedResponse<AllProductTypeResponse>,
      PaginationRequestType
    >({
      query: ({ page, take, search }) => ({
        url: "/api/v1/productType",
        params: {
          page,
          take,
          search,
        },
      }),
    }),

    //   getAllProducts: builder.query<
    //     PaginatedResponse<AllProductResponse>,
    //     AllProductUrlSearchParams
    //   >({
    //     query: ({ page, take, search }) => ({
    //       url: "/api/v1/product",
    //       params: {
    //         page,
    //         take,
    //         search,
    //       },
    //     }),
    //   }),
    updateProductType: builder.mutation<
      AddApiProductTypeResponse,
      { productTypeId: string; productTypeDetails: ApiProductTypeInfo }
    >({
      query: ({ productTypeId, productTypeDetails }) => ({
        url: `/api/v1/productType/${productTypeId}`,
        method: "PUT",
        body: productTypeDetails,
      }),
    }),

    //   getProductById: builder.query<
    //     GetProductByIdResponse,
    //     { productId: string }
    //   >({
    //     query: ({ productId }) => ({
    //       url: `api/v1/product/${productId}`,
    //     }),
    //   }),
    deleteProductTypeById: builder.mutation<
      { message: string },
      { productTypeId: string }
    >({
      query: ({ productTypeId }) => ({
        url: `/api/v1/productType/${productTypeId}`,
        method: "DELETE",
      }),
    }),
    getAllProductTypesWithoutPagination: builder.query<
      Omit<AllProductTypeResponse,"category">[],
      void
    >({
      query: (arg) => ({
        url: "api/v1/productType/plain",
      }),
    }),
  }),
});

export const {
  useAddNewProductTypeMutation,
  useGetAllProductsTypeQuery,
  useLazyGetAllProductsTypeQuery,
  // useLazyGetAllProductsQuery,
  // useGetProductByIdQuery,
  // useLazyGetProductByIdQuery,
  // useUpdateProductMutation,
  useUpdateProductTypeMutation,
  useDeleteProductTypeByIdMutation,
  useGetAllProductTypesWithoutPaginationQuery
} = productTypeApiSlice;
