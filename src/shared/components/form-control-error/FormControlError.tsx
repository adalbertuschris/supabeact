import classes from "./FormControlError.module.css";
import { ControllerFieldState } from "react-hook-form";
import { useTranslation } from "react-i18next";

type FormControlErrorProps = {
  fieldState: ControllerFieldState;
};

function FormControlError({ fieldState }: FormControlErrorProps) {
  const { t } = useTranslation();

  return (
    <>
      {fieldState.isTouched && fieldState.error && (
        <span className={classes["validation-error"]}>
          {fieldState.error?.type === "required" && t("validation.required")}
          {fieldState.error?.type === "validate" &&
            t(`${"validation."}${fieldState.error.message}`)}
        </span>
      )}
    </>
  );
}

export default FormControlError;
