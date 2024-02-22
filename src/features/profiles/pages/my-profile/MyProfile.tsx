import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useMutation, useQuery } from "@tanstack/react-query";
import classes from "./MyProfile.module.css";
import Input from "../../../../shared/components/input/Input";
import Button from "../../../../shared/components/button/Button";
import { getProfile } from "../../services/profile-actions";
import { selectUserContext } from "../../../auth/store/slice";
import { updateProfile } from "../../../../api/profiles/profile-api";
import { useAppDispatch } from "../../../../core/hooks";
import { reloadUserContext } from "../../../auth/store/effects";

type ProfileForm = {
  firstName: string;
  lastName: string;
};

function MyProfilePage() {
  const userContext = useSelector(selectUserContext);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid },
    setValue,
  } = useForm<ProfileForm>({
    defaultValues: {
      firstName: "",
      lastName: "",
    } as ProfileForm,
    mode: "onTouched",
  });

  const {
    data: profile,
    isLoading: isLoadingProfile,
    error: fetchError,
  } = useQuery({
    queryKey: ["profiles", userContext?.id],
    queryFn: () => getProfile(userContext.id),
    enabled: !!userContext?.id,
  });

  const {
    mutate,
    isPending: isUpdating,
    error: updateError,
  } = useMutation({
    mutationKey: ["profiles", userContext?.id],
    mutationFn: updateProfile,
    onSuccess: (data) => {
      dispatch(reloadUserContext(data.id));
      navigate("/");
    },
  });

  useEffect(() => {
    if (profile) {
      setValue("firstName", profile.firstName);
      setValue("lastName", profile.lastName);
    }
  }, [profile, setValue]);

  const onSubmit: SubmitHandler<ProfileForm> = (data) => {
    mutate({ id: userContext.id, data: data });
  };

  return (
    <div className={classes["profile-page"]}>
      <div className={classes["card"]}>
        <div>
          <h1>{t("profile.title")}</h1>
          <p>{t("profile.description")}</p>
        </div>
        <div className={classes["card-body"]}>
          {(updateError || fetchError) && <div>{t("general.error")}</div>}
          {profile && (
            <form onSubmit={handleSubmit(onSubmit)} className={classes["form"]}>
              <div className={classes["form-group"]}>
                <label htmlFor="firstName" className={classes["form-label"]}>
                  {t("profile.firstName")}
                </label>
                <Input
                  id="firstName"
                  name="firstName"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  className={classes["form-control"]}
                  type="text"
                  autoFocus={true}
                />
              </div>

              <div className={classes["form-group"]}>
                <label htmlFor="lastName" className={classes["form-label"]}>
                  {t("profile.lastName")}
                </label>
                <Input
                  id="lastName"
                  name="lastName"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  className={classes["form-control"]}
                  type="text"
                />
              </div>

              <div className={classes["form-actions"]}>
                <Button
                  type="submit"
                  className={classes["form-button"]}
                  disabled={
                    isLoadingProfile || isUpdating || !isDirty || !isValid
                  }
                >
                  {isUpdating ? t("general.sending") : t("general.update")}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyProfilePage;
