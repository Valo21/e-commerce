import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Product } from "@backend/products/entities/product.entity.ts";

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/users', credentials: 'include' }),
  endpoints: (builder) => ({
    getUserOwnProducts: builder.query<Product[], null>({
      query: () => `me/products`,
    }),
  }),
})

export const {
  useGetUserOwnProductsQuery
} = usersApi;