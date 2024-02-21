import { AuthSession } from "../models/auth-session";
import { AuthUser } from "../models/auth-user";
import { UserContext } from "../models/user-context";

export type AuthState = {
  isAuth: boolean;
  isCheckingAuth: boolean;
  authUser: AuthUser;
  isLoadingUserContext: boolean;
  userContext: UserContext;
  session: AuthSession;
  isSigningIn: boolean;
  loginLinkSent: boolean;
};
