import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import {MainProvider} from './contexts/MainContext';
import SingleCard, {loader as SingleLoader} from './components/SingleCard';
import ShopCard from './components/ShopCard';
import {
  NavLink,
  useLoaderData,
  Form,
  redirect,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import Profile from './components/Profile';
import NewMerchandise from './components/NewMerchandise';
import LoginBox from './components/LoginBox';
import Auth from './routes/Auth';
import RegisterBox from './components/RegisterBox';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
    children: [
      {
        path: "login",
        element: <LoginBox />,
      },
      {
        path: "register",
        element: <RegisterBox />,
      }
    ],
  },
  {
    path: "/home",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home/shop",
        element: <ShopCard />,
      },
      {
        path: "shop/:id",
        element: <SingleCard />,
        loader: SingleLoader,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "newMerchandise",
        element: <NewMerchandise />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MainProvider>
      <RouterProvider router={router} />
    </MainProvider>
  </React.StrictMode>
  ,
)
