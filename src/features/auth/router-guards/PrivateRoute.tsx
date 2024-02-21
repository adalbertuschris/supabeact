import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectIsAuth, selectIsCheckingAuth } from "../store/slice";
import { checkAuth } from "../store/effects";
import { useAppDispatch } from "../../../core/hooks";

type PrivateRouteProps = {
  children: React.ReactNode;
};

function PrivateRoute({ children }: PrivateRouteProps) {
  const [isMounted, setIsMounted] = useState(false);
  const isAuth = useSelector(selectIsAuth);
  const isCheckingAuth = useSelector(selectIsCheckingAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
    setIsMounted(true);
  }, [dispatch]);

  if (!isMounted || isCheckingAuth) {
    return <div>Loading</div>;
  } else if (isMounted && !isCheckingAuth && isAuth) {
    return children;
  }

  return <Navigate to={"/login"} />;
}

export default PrivateRoute;
