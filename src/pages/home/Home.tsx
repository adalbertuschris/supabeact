import { useState } from "react";
import classes from "./Home.module.css";
import Button from "../../shared/components/button/Button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type UserContext = {
  firstName: string;
};

function HomePage() {
  const [isAuth, setIsAuth] = useState(false);
  const [userContext, setUserContext] = useState<UserContext>(null!);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSignIn = () => navigate("/login");
  const handleSignOut = () => {};
  const handleGoToMyProfile = () => {};

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
