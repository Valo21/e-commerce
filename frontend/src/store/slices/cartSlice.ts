import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../../../src/products/entities/product.entity";

interface ProductsState {
  products: {[key: string]: Product & {
  amount: number
  }}
}

const initialState : ProductsState = {
  products: {}
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const product = action.payload;
      if (state.products[product.id]) {
        state.products[product.id].amount++
      } else {
        state.products[product.id] = {
          ...product,
          amount: 1,
        }
      }
    },
    removeProduct: (state, action) => {
      const product = action.payload;
      if (state.products[product.id].amount > 1) {
        state.products[product.id].amount--
      } else {
        delete state.products[product.id]
      }
    }
  }
})

export default cartSlice;
export const { addProduct, removeProduct } = cartSlice.actions;