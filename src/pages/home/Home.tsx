import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import classes from "./Home.module.css";
import Button from "../../shared/components/button/Button";
import {
  selectIsAuth,
  selectUserContext,
} from "../../features/auth/store/slice";
import { useAppDispatch } from "../../core/hooks";
import { signOut } from "../../features/auth/store/effects";

function HomePage() {
  const isAuth = useSelector(selectIsAuth);
  const userContext = useSelector(selectUserContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSignIn = () => navigate("/login");
  const handleSignOut = () => dispatch(signOut());
  const handleGoToMyProfile = () => navigate("/my-profile");

  return (
    <div className={classes["homepage"]}>
      {!isAuth && (
        <Button type="button" onClick={handleSignIn}>
          {t("auth.signIn")}
        </Button>
      )}
      {userContext && (
        <>
          <h1 className="header">
            {t("home.hello")} {userContext.firstName}
          </h1>
          <Button type="button" onClick={handleGoToMyProfile}>
            {t("home.myProfile")}
          </Button>
        </>
      )}

      {isAuth && (
        <Button type="button" onClick={handleSignOut}>
          {t("auth.signOut")}
        </Button>
      )}
    </div>
  );
}

export default HomePage;
