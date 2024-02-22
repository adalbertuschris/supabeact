import {
  getSession,
  getUserContext,
  signInViaLoginLink as signInViaLoginLinkApiAction,
  signOut as signOutApiAction,
} from "../../../api/auth/auth-api";
import { RootState } from "../../../core/root-state";
import {
  checkAuthFailure,
  checkingAuth,
  loadUserContextFailure,
  loadUserContextSuccess,
  loadingUserContext,
  loginLinkSent,
  signInFailure,
  signOutFailure,
  signOutSuccess,
  signingIn,
  userAuthenticated,
  userNotAuthenticated,
} from "./slice";

export const loadUserContext = (userId: string) => async (dispatch) => {
  dispatch(loadingUserContext());

  try {
    const userContext = await getUserContext(userId);

    dispatch(loadUserContextSuccess({ userContext }));
  } catch (error) {
    dispatch(loadUserContextFailure());
  }
};

export const reloadUserContext = (userId: string) => async (dispatch) => {
  dispatch(loadUserContext(userId));
};

// TODO Refactor
export const checkAuth = () => async (dispatch, getState) => {
  dispatch(checkingAuth());

  try {
    const { session } = await getSession();

    if (session) {
      dispatch(userAuthenticated({ session }));
      const state: RootState = getState();
      if (!state.auth.isLoadingUserContext && !state.auth.userContext) {
        dispatch(loadUserContext(session.user.id));
      }
    } else {
      dispatch(userNotAuthenticated());
    }
  } catch (error) {
    dispatch(checkAuthFailure());
  }
};

export const signInViaLoginLink = (email: string) => async (dispatch) => {
  dispatch(signingIn());

  try {
    await signInViaLoginLinkApiAction(email);
    dispatch(loginLinkSent());
  } catch (error) {
    dispatch(signInFailure({ error }));
  }
};

export const signOut = () => async (dispatch) => {
  try {
    await signOutApiAction();
    dispatch(signOutSuccess());
  } catch (error) {
    dispatch(signOutFailure());
  }
};
