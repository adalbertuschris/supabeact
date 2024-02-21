import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home/Home";
import LoginPage from "./features/auth/pages/login/Login";
import PrivateRoute from "./features/auth/router-guards/PrivateRoute";
import LoginRoute from "./features/auth/router-guards/LoginRoute";
import MyProfilePage from "./features/profiles/pages/my-profile/MyProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: (
      <LoginRoute>
        <LoginPage />
      </LoginRoute>
    ),
  },
  {
    path: "/my-profile",
    element: (
      <PrivateRoute>
        <MyProfilePage />
      </PrivateRoute>
    ),
  },
]);
