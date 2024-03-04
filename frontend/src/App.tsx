import { useAppSelector } from "@hooks/redux.ts";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Themes } from "@store/themes.ts";
import { RouterProvider } from "react-router-dom";
import { router } from "@src/routes.tsx";
import { ReactElement } from "react";
import { SnackbarProvider } from "notistack";

function App(): ReactElement {
  const { darkMode } = useAppSelector(state => state.theme);

  return(
    <ThemeProvider theme={darkMode ? Themes.DARK : Themes.LIGHT}>
      <SnackbarProvider maxSnack={4}>
        <CssBaseline/>
        <RouterProvider router={router} />
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App;