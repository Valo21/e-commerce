import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Product } from "../../../../src/products/entities/product.entity";

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/v1/products', credentials: 'include' }),
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
      query: (productId: string) => '/' +  productId
    }),
    createProduct: builder.mutation<Product, FormData>({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
      }),
    }),
  }),
})

export const { useGetProductsQuery, useCreateProductMutation, useGetProductQuery, useSearchProductsQuery } = productsApi;