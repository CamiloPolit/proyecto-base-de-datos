import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Users from './Users.jsx'
import ErrorPage from './ErrorPage.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import { AppProvider } from './context/AppContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/users/:userID",
    element: <Users />,
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <AppProvider>
    <RouterProvider router={router} />
  </AppProvider>
)
