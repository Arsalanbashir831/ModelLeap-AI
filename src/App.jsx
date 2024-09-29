import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import DashboardLayout from './DashboardLayout'
import AI from './Pages/PlayGround/AI'
import APIkey from './Pages/KeyManagement/APIkey'

const router = createBrowserRouter([
  {

    path: "/app",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      { path: '/app', element: <AI /> },
      {path: '/app/keymanagement', element: <APIkey />},
    ]
  },
])


const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App