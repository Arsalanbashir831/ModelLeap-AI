import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import DashboardLayout from './DashboardLayout'
import AI from './Pages/PlayGround/AI'

const router = createBrowserRouter([
  {

    path: "/app",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      { path: '/app', element: <AI /> },
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