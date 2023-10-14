import { DepreciationRate } from "./../../models/depreciationRate";
import { PaginatedResponse } from "../../models/paginatedResponse";
import { apiSlice } from "../auth/authApi";
import { PaginationRequestType } from "../../models/paginatedRequestType";
import { DepreciationItValue } from "../../models/depreciationRates";
import { DepreciationItData } from "../../models/deprectionItData";

export const depreciationItApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
    useGetDepriciationItData: builder.query<DepreciationItData[], number>({
      query: (year) => ({
        url: `/api/v1/schedule/It/${year}`,
        method: "GET",
      }),
    }),
    checkNullRatesExsists: builder.query<DepreciationRate[], number>({
      query: (year) => ({
        url: `/api/v1/schedule/CheckRates/${year}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLazyGetAllRatesQuery,
  useUpdateDepriciationItRateMutation,
  useLazyUseGetDepriciationItDataQuery,
  useLazyCheckNullRatesExsistsQuery
} = depreciationItApiSlice;
