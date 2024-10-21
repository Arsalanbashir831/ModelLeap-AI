import React, { useEffect } from "react";
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
import Auth from "./Pages/Auth/Auth";
import Support from "./Pages/Support/Support";
import { useRecoilValue } from "recoil";
import useAuthValidation from "./hooks/useAuthValidation";
import authState from "./atoms/authState";
import ProtectedRoute from "./Components/common/ProtectedRoute";
import useUserData from "./hooks/useUserData";
import Usage from "./Pages/Usage/Usage";
import ChatbotHistory from "./Pages/AiLab/ChatbotHistory";

const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/auth", element:  <Auth /> },
  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/app", element: <AI /> },
      { path: "/app/keymanagement", element: <APIkey /> },
      { path: "/app/billing", element: <Plans /> },
      { path: "/app/usage", element: <Usage /> },
      { path: "/app/settings", element: <Settings /> },
      { path: "/app/helpcenter", element: <Support /> },
      { path: "/app/documentation", element: <Integration /> },
      { path: "/app/ailab", element: <AiLab /> },
    ],
  },
  { path: "/app/ailab/chat/:botId", element: <AiLabChat /> },
  { path: "/app/ailab/history/:botId", element: <ChatbotHistory /> },
  { path: "*", element: <NotFound /> },
]);

const App = () => {
 const {userData}=useUserData()
 useEffect(()=>{},[userData])
  return (
    <>
      <RouterProvider router={router}  />
      {/* Only run validation when the Router is available */}
      {/* {useAuthValidation()}  */}
    </>
  );
};

export default App;
