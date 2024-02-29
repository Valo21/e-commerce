import { createSlice } from "@reduxjs/toolkit";
import { User } from "@backend/users/entities/user.entity.ts";

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