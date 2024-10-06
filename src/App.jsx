import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import AI from "./Pages/PlayGround/AI";
import APIkey from "./Pages/KeyManagement/APIkey";
import Settings from "./Pages/Settings/Settings";
import Integration from "./Pages/Documentation/Integration";
import Plans from "./Pages/Billing/Plans";
import NotFound from "./Pages/NotFound";
import Landing from "./Pages/Landing/Landing";
import AiLab from "./Pages/AiLab/AiLab";
import AiLabChat from "./Pages/AiLab/AiLabChat";

const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  {
    path: "/app",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      { path: "/app", element: <AI /> },
      { path: "/app/keymanagement", element: <APIkey /> },
      { path: "/app/billing", element: <Plans /> },
      { path: "/app/settings", element: <Settings /> },
      { path: "/app/documentation", element: <Integration /> },
      { path: "/app/ailab", element: <AiLab /> },
    ],
  },
  {path: "/app/ailab/chat/:chatId", element: <AiLabChat />},
  { path: "*", element: <NotFound /> },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
