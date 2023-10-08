import { PaginatedResponse } from "../../models/paginatedResponse";
import { apiSlice } from "../auth/authApi";
import { PaginationRequestType } from "../../models/paginatedRequestType";
import { DepreciationItValue } from "../../models/depreciationRates";

export const depreciationItApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //   addNewProductType: builder.mutation<
    //     AddApiProductTypeResponse,
    //     ApiProductTypeInfo
    //   >({
    //     query: (productTypeDetails) => ({
    //       url: "/api/v1/productType",
    //       method: "POST",
    //       body: productTypeDetails,
    //     }),
    //   }),
    //   getAllProductsType: builder.query<
    //     PaginatedResponse<AllProductTypeResponse>,
    //     PaginationRequestType
    //   >({
    //     query: ({ page, take, search }) => ({
    //       url: "/api/v1/productType",
    //       params: {
    //         page,
    //         take,
    //         search,
    //       },
    //     }),
    //   }),
    getAllRates: builder.query<
      PaginatedResponse<DepreciationItValue>,
      PaginationRequestType & { productTypeId: string }
    >({
      query: ({ page, take, search, productTypeId }) => ({
        url: `/api/v1/depreciation-it/${productTypeId}`,
        params: {
          page,
          take,
          search,
        },
      }),
    }),

    //   updateProductType: builder.mutation<
    //     AddApiProductTypeResponse,
    //     { productTypeId: string; productTypeDetails: ApiProductTypeInfo }
    //   >({
    //     query: ({ productTypeId, productTypeDetails }) => ({
    //       url: `/api/v1/productType/${productTypeId}`,
    //       method: "PUT",
    //       body: productTypeDetails,
    //     }),
    //   }),
    updateDepriciationItRate: builder.mutation<
      DepreciationItValue,
      { depreciationItId: string; depreciationItRate: string }
    >({
      query: ({ depreciationItId, depreciationItRate }) => ({
        url: `/api/v1/depreciation-it/${depreciationItId}`,
        method: "PUT",
        body: {
          depRate: depreciationItRate,
        },
      }),
    }),
    //   deleteProductTypeById: builder.mutation<
    //     { message: string },
    //     { productTypeId: string }
    //   >({
    //     query: ({ productTypeId }) => ({
    //       url: `/api/v1/productType/${productTypeId}`,
    //       method: "DELETE",
    //     }),
    //   }),
    //   getAllProductTypesWithoutPagination: builder.query<
    //     Omit<AllProductTypeResponse,"category">[],
    //     void
    //   >({
    //     query: (arg) => ({
    //       url: "api/v1/productType/plain",
    //     }),
    //   }),
  }),
});

export const {
  // useAddNewProductTypeMutation,
  // useGetAllProductsTypeQuery,
  // useLazyGetAllProductsTypeQuery,
  // // useLazyGetAllProductsQuery,
  // // useGetProductByIdQuery,
  // // useLazyGetProductByIdQuery,
  // // useUpdateProductMutation,
  // useUpdateProductTypeMutation,
  // useDeleteProductTypeByIdMutation,
  // useGetAllProductTypesWithoutPaginationQuery
  useLazyGetAllRatesQuery,
  useUpdateDepriciationItRateMutation,
} = depreciationItApiSlice;
