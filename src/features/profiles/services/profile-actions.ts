import { getProfile as getProfileApiAction } from "../../../api/profiles/profile-api";

export const getProfile = (id: string) => {
  return getProfileApiAction(id);
};
