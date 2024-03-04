import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Product } from "@backend/products/entities/product.entity.ts";

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/products', credentials: 'include' }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], null>({
      query: () => ``,
    }),
    searchProducts: builder.query<Product[], string>({
      query: (name: string) => ({
        url: 'search',
        method: "POST",
        body: { name }
      })
    }),
    getProduct: builder.query<Product, string>({
      query: (productId: string) => `/${productId}?related=true`,
      providesTags: (result, error, id) => [{ id }],
    }),
    getOwnProducts: builder.query<Product[], null>({
      query: () => '/me',
    }),
    createProduct: builder.mutation<Product, FormData>({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
      }),
    }),
    updateProduct: builder.mutation<Product, [string, FormData]>({
      query: ([id, data]) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ id }],
    }),
  }),
})

export const { useGetProductsQuery,
  useCreateProductMutation,
  useGetProductQuery,
  useSearchProductsQuery,
  useGetOwnProductsQuery,
  useUpdateProductMutation
} = productsApi;