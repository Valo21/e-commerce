import { createSlice } from "@reduxjs/toolkit";
import { Product } from "@src/types";

interface AuthState {
  user: Partial<User> | null
}

const initialState : AuthState = {
  user: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    }
  }
})

export default authSlice;
export const { setUser } = authSlice.actions;
