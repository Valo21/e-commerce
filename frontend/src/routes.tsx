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
import UserLoader from "@lib/loaders/UserLoader.ts";
import AuthLoader from "@lib/loaders/AuthLoader.ts";

export const router = createBrowserRouter([
  {
    path: "/",
    id: 'Layout',
    element: <RootLayout/>,
    children: [
      {
        path: '/',
        id: 'public',
        loader: UserLoader,
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
            path: '/products/:id',
            element: <ProductPage/>
          },
          {
            path: '/auth',
            element: <AuthPage/>
          }
        ]
      },
      {
        path: '/',
        id: 'Protected',
        loader: AuthLoader,
        children: [
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
        ]
      }
    ]
  },
]);