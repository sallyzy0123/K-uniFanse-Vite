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
import Profile from './components/Profile';
import NewMerchandise from './components/NewMerchandise';
import LoginBox from './components/LoginBox';
import Auth from './routes/Auth';
import RegisterBox from './components/RegisterBox';
import EditMerchandise from './components/EditMerchandise';
import EditAccount from './components/EditAccount';

const router = createBrowserRouter([
  {
    path: "/K-uniFanse-Vite/",
    element: <Auth />,
    children: [
      {
        path: "/K-uniFanse-Vite/",
        element: <LoginBox />,
      },
      {
        path: "/K-uniFanse-Vite/register",
        element: <RegisterBox />,
      }
    ],
  },
  {
    path: "/K-uniFanse-Vite/home",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/K-uniFanse-Vite/home/shop",
        element: <ShopCard />,
      },
      {
        path: "/K-uniFanse-Vite/home/shop/:id",
        element: <SingleCard />,
        loader: SingleLoader,
      },
      {
        path: "/K-uniFanse-Vite/home/profile",
        element: <Profile />,
      },
      {
        path: "/K-uniFanse-Vite/home/newMerchandise",
        element: <NewMerchandise />,
      },
      {
        path: "/K-uniFanse-Vite/home/shop/:id/edit",
        element: <EditMerchandise />,
        loader: SingleLoader,
      },
      {
        path: "/K-uniFanse-Vite/home/profile/edit",
        element: <EditAccount />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MainProvider>
      <RouterProvider router={router} />
    </MainProvider>
  </React.StrictMode>
)
