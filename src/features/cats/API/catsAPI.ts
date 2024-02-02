import { privateConfig } from "@/config/config";
import { Cat, QueryParams } from "@/app/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Headers = {
  "x-api-key": string;
};

const Headers: Headers = {
  "x-api-key": privateConfig.VITE_CAT_API_KEY,
};

const generateQueryStr = (baseString: string, query: QueryParams): string => {
  const queryString: string =
    baseString +
    Object.entries(query)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

  return queryString;
};

export const catApi = createApi({
  reducerPath: "catApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.thecatapi.com/v1/",
    prepareHeaders: (headers) => {
      headers.set("x-api-key", Headers["x-api-key"]);

      return headers;
    },
  }),

  endpoints: (builder) => ({
    getCats: builder.query<Cat[], QueryParams>({
      query: (queryParams: QueryParams) => {
        const queryStr = generateQueryStr("images/search?", queryParams);

        return { url: queryStr };
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems, { arg }) => {
        if (arg.page === 0) {
          return newItems;
        } else {
          currentCache.push(...newItems);
        }
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
  }),
});

export const { useGetCatsQuery } = catApi;
