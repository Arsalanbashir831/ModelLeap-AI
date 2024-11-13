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

import ProtectedRoute from "./Components/common/ProtectedRoute";
import useUserData from "./hooks/useUserData";
import Usage from "./Pages/Usage/Usage";
import ChatbotHistory from "./Pages/AiLab/ChatbotHistory";
// import Pricing from './Pages/Pricing/Pricing'
import Contact from "./Pages/ContactUs/Contact";
import AdminAuth from "./Pages/Admin/Auth/AdminAuth";
import AdminDashboardLayout from "./AdminDashboardLayout";
import UserTable from "./Pages/Admin/Panel/Users";
import UserTableWithActions from "./Pages/Admin/Panel/ApprovalTable";

const router = createBrowserRouter([
  { path: "/", element:(<>

<ProtectedRoute>
<DashboardLayout>
</DashboardLayout>
</ProtectedRoute>
    
  </>) , children:[{path:'/',element:<AI/>}] },
  { path: "/auth", element: <Auth /> },
  // { path: "/pricing", element:  <Pricing/> },
  { path: "/contact", element: <Contact /> },
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
      { path: "/app/contactus", element: <Contact /> },
    ],
  },
  { path: "/app/ailab/chat/:botId", element: <AiLabChat /> },
  { path: "/app/ailab/history/:botId", element: <ChatbotHistory /> },
  { path: "/admin/auth", element: <AdminAuth /> },
  { path: "/admin/dashboard", element: <AdminDashboardLayout />, children: [
    { path: "/admin/dashboard/users", element: <UserTable /> },
    { path: "/admin/dashboard/approvals", element: <UserTableWithActions /> },
  ] },
  { path: "*", element: <NotFound /> },
]);

const App = () => {
  const { userData } = useUserData();
  useEffect(() => {}, [userData]);
  return (
    <>
      <RouterProvider router={router} />
      {/* Only run validation when the Router is available */}
      {/* {useAuthValidation()}  */}
    </>
  );
};

export default App;
