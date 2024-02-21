import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import classes from "./Login.module.css";
import Button from "../../../../shared/components/button/Button";
import Input from "../../../../shared/components/input/Input";
import { emailValidator } from "../../../../shared/validators/email";
import { signInViaLoginLink } from "../../store/effects";
import { useAppDispatch } from "../../../../core/hooks";
import { selectLoginLinkSent } from "../../store/slice";

type LoginForm = {
  email: string;
};

function LoginPage() {
  const dispatch = useAppDispatch();
  const isLoginLinkSent = useSelector(selectLoginLinkSent);
  const { t } = useTranslation();
  const {
    reset,
    handleSubmit,
    control,
    getValues,
    formState: { isSubmitting, isDirty, isValid },
  } = useForm<LoginForm>({
    defaultValues: {
      email: "",
    } as LoginForm,
    mode: "onTouched",
  });

  useEffect(() => {
    if (isLoginLinkSent && getValues("email")) {
      alert("Check your email for the login link!");
      reset();
    }
  }, [isLoginLinkSent, reset, getValues]);

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    console.log(data);
    dispatch(signInViaLoginLink(data.email));
  };

  return (
    <div className={classes["login-page"]}>
      <div className={classes["card"]}>
        <div>
          <h1>{t("login.title")}</h1>
          <p className={classes["description"]}>{t("login.description")}</p>
        </div>
        <div className={classes["card-body"]}>
          <form onSubmit={handleSubmit(onSubmit)} className={classes["form"]}>
            <div>
              <label className={classes["form-label"]} htmlFor="email">
                {t("login.email")}
              </label>
              <Input
                name="email"
                control={control}
                rules={{
                  required: true,
                  validate: emailValidator,
                }}
                className={classes["form-control"]}
                type="email"
                placeholder={t("login.emailPlaceholder")}
                autoFocus={true}
              />
            </div>

            <div className={classes["form-actions"]}>
              <Button
                type="submit"
                className={classes["form-button"]}
                disabled={isSubmitting || !isDirty || !isValid}
              >
                // TODO Is submitting doesn't work as expected
                {isSubmitting ? t("general.sending") : t("login.sendMagicLink")}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
