import { useAppSelector } from "@hooks/redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Themes } from "@store/themes";
import { RouterProvider } from "react-router-dom";
import { router } from "@frontend/routes";
import { ReactElement } from "react";

function App(): ReactElement {
  const { darkMode } = useAppSelector(state => state.theme);
  return(
    <ThemeProvider theme={darkMode ? Themes.DARK : Themes.LIGHT}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App;