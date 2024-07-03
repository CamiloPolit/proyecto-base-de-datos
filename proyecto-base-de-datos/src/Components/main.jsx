import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../pages/App.jsx'
import Users from '../pages/Users.jsx'
import ErrorPage from '../pages/ErrorPage.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import '../index.css'
import { AppProvider } from '../context/AppContext.jsx';

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
