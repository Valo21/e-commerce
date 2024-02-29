import { createSlice } from "@reduxjs/toolkit";


interface ThemeState {
  darkMode: boolean
}

const initialState : ThemeState = {
  darkMode: false
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    switchTheme: (state) => {
      state.darkMode = !state.darkMode
    }
  }
})

export default themeSlice;
export const { switchTheme } = themeSlice.actions;