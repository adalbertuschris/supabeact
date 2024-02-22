import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { selectIsAuth, selectIsCheckingAuth } from "../store/slice";
import { checkAuth } from "../store/effects";
import { useAppDispatch } from "../../../core/hooks";

type PrivateRouteProps = {
  children: React.ReactNode;
};

function PrivateRoute({ children }: PrivateRouteProps) {
  const isMounted = useRef(false);
  const isAuth = useSelector(selectIsAuth);
  const isCheckingAuth = useSelector(selectIsCheckingAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
    isMounted.current = true;
  }, [dispatch]);

  if (!isMounted.current || isCheckingAuth) {
    return <div>Loading</div>;
  } else if (isMounted.current && !isCheckingAuth && isAuth) {
    return children;
  }
  return <Navigate to={"/login"} />;
}

export default PrivateRoute;
