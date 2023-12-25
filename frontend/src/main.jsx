import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import "bulma/css/bulma.css"
import axios from "axios"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Login from "./component/Login.jsx"
import Register from "./component/Register.jsx"
import Dashboard from "./component/Dashboard.jsx"
axios.defaults.withCredentials = true

const routers = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={routers} />
  </React.StrictMode>
)
