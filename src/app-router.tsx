import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home/Home";
import LoginPage from "./features/auth/pages/login/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
