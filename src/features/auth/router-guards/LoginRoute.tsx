import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../store/slice";

type LoginRouteProps = {
  children: React.ReactNode;
};

function LoginRoute({ children }: LoginRouteProps) {
  const isAuth = useSelector(selectIsAuth);

  if (isAuth === undefined) {
    return <div>Loading</div>;
  }

  if (!isAuth) {
    return children;
  }

  return <Navigate to={"/"} />;
}

export default LoginRoute;
