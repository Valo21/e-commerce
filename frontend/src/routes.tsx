import {
  createBrowserRouter,
} from "react-router-dom";
import HomePage from "@pages/HomePage";
import RootLayout from "./components/RootLayout";
import SearchPage from "@pages/SearchPage";
import SettingsPage from "@pages/SettingsPage";
import ProfilePage from "@pages/ProfilePage";
import ProductPage from "@pages/ProductPage";
import MyProductsPage from "@pages/MyProductsPage";
import CreateProductPage from "@pages/CreateProductPage";
import AuthPage from "@pages/AuthPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    children: [
      {
        path: '/',
        element: <HomePage/>
      },
      {
        path: '/search',
        element: <SearchPage/>
      },
      {
        path: '/products',
        element: <ProductPage/>
      },
      {
        path: '/my-products',
        element: <MyProductsPage/>
      },
      {
        path: '/create',
        element: <CreateProductPage/>
      },
      {
        path: '/settings',
        element: <SettingsPage/>
      },
      {
        path: '/profile',
        element: <ProfilePage/>
      },
      {
        path: '/auth',
        element: <AuthPage/>
      }
    ]
  },
]);