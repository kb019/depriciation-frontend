import { DepreciationItData } from "./../../models/deprectionItData";
import { DepreciationRate } from "./../../models/depreciationRate";
import { PaginatedResponse } from "../../models/paginatedResponse";
import { apiSlice } from "../auth/authApi";
import { PaginationRequestType } from "../../models/paginatedRequestType";
import { DepreciationItValue } from "../../models/depreciationRates";

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

    downloadPDFFile: builder.mutation({
      // queryFn: async ({ year, pdfContent }, api, extraOptions, baseQuery) => {
      queryFn: async ({ year, pdfContent }, _api, _extraOptions, baseQuery) => {
        const result: any = await baseQuery({
          url: `/api/v1/pdfGenerator/genItDepPdf/${year}`,
          responseHandler: (response) => response.blob(),
          body: pdfContent,
          method: "POST",
        });
        var hiddenElement = document.createElement("a");
        var url = window.URL || window.webkitURL;
        var blobPDF = url.createObjectURL(result.data);
        hiddenElement.href = blobPDF;
        hiddenElement.target = "_blank";
        hiddenElement.download = `DepreciationIt.pdf`;
        hiddenElement.click();
        // setTimeout(() => {
        //   document.removeChild(hiddenElement);
        //   url.revokeObjectURL(blobPDF);
        // }, 2000);
        return { data: null };
      },
    }),
  }),
});

export const {
  useLazyGetAllRatesQuery,
  useUpdateDepriciationItRateMutation,
  useLazyUseGetDepriciationItDataQuery,
  useLazyCheckNullRatesExsistsQuery,
  useDownloadPDFFileMutation,
} = depreciationItApiSlice;
