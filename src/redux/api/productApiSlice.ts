
import { AddProductResponse, ProductDetails } from "../../models/product";
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
     
      
    }),
  });
  
  export const { useAddNewProductMutation} =
    categoryApiSlice;
  