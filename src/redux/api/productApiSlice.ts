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

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addNewProduct: builder.mutation<AddProductResponse, AddUpdateProductDetail>({
      query: (productDetails) => ({
        url: "/api/v1/product",
        method: "POST",
        body: productDetails,
      }),
    }),

    getAllProducts: builder.query<
      PaginatedResponse<AllProductResponse>,
      AllProductUrlSearchParams
    >({
      query: ({ page, take, search }) => ({
        url: "/api/v1/product",
        params: {
          page,
          take,
          search,
        },
      }),
    }),
    updateProduct: builder.mutation<
      AddProductResponse,
      { productId: string; itemDetails: AddUpdateProductDetail }
    >({
      query: ({ productId, itemDetails }) => ({
        url: `/api/v1/product/${productId}`,
        method: "PUT",
        body: itemDetails,
      }),
    }),

    getProductById: builder.query<
      GetProductByIdResponse,
      { productId: string }
    >({
      query: ({ productId }) => ({
        url: `api/v1/product/${productId}`,
      }),
    }),
    deleteProductById: builder.mutation<
      { message: string },
      { productId: string }
    >({
      query: ({ productId }) => ({
        url: `/api/v1/product/${productId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddNewProductMutation,
  useLazyGetAllProductsQuery,
  useGetProductByIdQuery,
  useLazyGetProductByIdQuery,
  useUpdateProductMutation,
  useDeleteProductByIdMutation
} = productApiSlice;
