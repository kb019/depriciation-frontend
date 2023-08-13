import { AllProductResponse } from './../../models/product';

import { PaginatedResponse } from "../../models/paginatedResponse";
import { AddProductResponse, AllProductUrlSearchParams, ProductDetails } from "../../models/product";
  import { apiSlice } from "../auth/authApi";
  
  export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      
     
      addNewProduct: builder.mutation<AddProductResponse, ProductDetails>({
        query: (productDetails) => ({
          url: "/api/v1/product",
          method: "POST",
          body: productDetails
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
     
      
    }),
  });
  
  export const { useAddNewProductMutation,useLazyGetAllProductsQuery} =
    categoryApiSlice;
  