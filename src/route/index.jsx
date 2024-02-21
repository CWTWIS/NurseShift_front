import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AllSchedule from "../pages/AllSchedule";
import PersonalSchedule from "../pages/PersonalSchedule";

import RedirectIfAuthenticated from "../features/auth/components/RedirectIfAuthenticated";
import ProtectedRoute from "../features/auth/components/ProtectedRoute";
import Container from "../layouts/Container";
const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <RedirectIfAuthenticated>
        <LoginPage />
      </RedirectIfAuthenticated>
    ),
  },
  {
    path: "/register",
    element: (
      <RedirectIfAuthenticated>
        <RegisterPage />
      </RedirectIfAuthenticated>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Container />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <AllSchedule /> },
      { path: "personal/:userId", element: <PersonalSchedule /> },
      // { path: ":userId", element: <PersonalSchedule /> },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
