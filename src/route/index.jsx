import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AllSchedule from "../pages/AllSchedule";
import PersonalSchedule from "../pages/PersonalSchedule";
const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/schedule", element: <AllSchedule /> },
  { path: "/schedule/:userId", element: <PersonalSchedule /> },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
