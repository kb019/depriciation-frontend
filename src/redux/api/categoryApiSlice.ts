import {
  AddCategoryResponse,
  AllCategoryResponse,
  AllCategoryUrlParams,
  Category,
} from "../../models/category";
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
    getAllCategories: builder.query<
      PaginatedResponse<AllCategoryResponse>,
      AllCategoryUrlParams
    >({
      query: ({ page, take, search }) => ({
        url: "/api/v1/category",
        params: {
          page,
          take,
          search,
        },
      }),
    }),
    addNewCategory: builder.mutation<AddCategoryResponse, Category>({
      query: ({ name }) => ({
        url: "/api/v1/category",
        method: "POST",
        body: {
          name,
        },
      }),
    }),
    updateCategory: builder.mutation<
      AddCategoryResponse,
      { categoryId: string; name: string }
    >({
      query: ({ categoryId, name }) => ({
        url: `/api/v1/category/${categoryId}`,
        method: "PUT",
        body: {
          name,
        },
      }),
    }),
    deleteCategoryById:builder.mutation<{message:string},{categoryId:string}>({
       query:({categoryId})=>({
        url:`/api/v1/category/${categoryId}`,
        method:"DELETE"
       })
    })
  }),
});

export const { useLazyGetAllCategoriesQuery, useAddNewCategoryMutation ,useUpdateCategoryMutation,useDeleteCategoryByIdMutation} =
  categoryApiSlice;
