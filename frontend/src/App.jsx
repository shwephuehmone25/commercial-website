import React from 'react'; 
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './layouts/Main';
import Index from './pages/product/Index';
import isLoginLoader from './utils/isLogin';

const Create = React.lazy(() => import("./pages/product/Create"));
const Edit = React.lazy(() => import("./pages/product/Edit"));
const Details = React.lazy(() => import("./pages/product/Details"));
const Unauthorized = React.lazy(() => import("./pages/Unauthorized"));
const Login = React.lazy(() => import("./pages/user/Login"));  
const Register = React.lazy(() => import("./pages/user/Register"));  

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          index: true,
          element: <Index />,
        },
        {
          path: "/create/product",
          element: (
            <React.Suspense fallback={<div>Loading...</div>}>
              <Create />
            </React.Suspense>
          ),
          loader: isLoginLoader(["admin"]),
        },
        {
          path: "/edit/product/:id",
          element: (
            <React.Suspense fallback={<div>Loading...</div>}>
              <Edit />
            </React.Suspense>
          ),
          loader: isLoginLoader(["admin"]),
        },
        {
          path: "/product/:id",
          element: (
            <React.Suspense fallback={<div>Loading...</div>}>
              <Details />
            </React.Suspense>
          ),
        },
        {
          path: "/unauthorized",
          element: (
            <React.Suspense fallback={<div>Loading...</div>}>
              <Unauthorized />
            </React.Suspense>
          ),
        },
        {
          path: "/login",  
          element: (
            <React.Suspense fallback={<div>Loading...</div>}>
              <Login />
            </React.Suspense>
          ),
        },
        {
          path: "/register",  
          element: (
            <React.Suspense fallback={<div>Loading...</div>}>
              <Register />
            </React.Suspense>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
