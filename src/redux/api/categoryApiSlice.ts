import { AllCategoryResponse, AllCategoryUrlParams } from "../../models/category";
import { PaginatedResponse } from "../../models/paginatedResponse";
import { apiSlice } from "../auth/authApi";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getUserById: builder.query<any, string | null>({
    //   query: (userId) => {
    //     return {
    //       url: `/api/v1/user/${userId}`,
    //       method: "GET",
    //     };
    //   },
    // }),
    getAllCategories:builder.query<PaginatedResponse<AllCategoryResponse>,AllCategoryUrlParams>({
      query:({page,take,search})=>({
        url:"/api/v1/category",
        params:{
         page,take,search
        }
      })
    })
  }),
});

export const {
  useLazyGetAllCategoriesQuery,

} = categoryApiSlice;
