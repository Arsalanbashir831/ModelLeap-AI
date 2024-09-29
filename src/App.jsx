import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import DashboardLayout from './DashboardLayout'
import AI from './Pages/PlayGround/AI'
import APIkey from './Pages/KeyManagement/APIkey'
import Settings from './Pages/Settings/Settings'
import Integration from './Pages/Documentation/Integration'

const router = createBrowserRouter([
  {

    path: "/app",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      { path: '/app', element: <AI /> },
      {path: '/app/keymanagement', element: <APIkey />},
      {path: '/app/settings', element: <Settings />},
      {path: '/app/documentation', element: <Integration />},
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