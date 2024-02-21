import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserContext } from "../models/user-context";
import { AuthSession } from "../models/auth-session";
import { AuthState } from "./state";
import { RootState } from "../../../core/root-state";

const initialState: AuthState = {
  isAuth: undefined, // Why it is set to undefined? maybe it had to be only for angular app?
  isCheckingAuth: false,
  authUser: undefined,
  isLoadingUserContext: false,
  userContext: undefined,
  session: undefined,
  isSigningIn: false,
  loginLinkSent: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signingIn: (state) => {
      state.isSigningIn = true;
    },
    reloadUserContext: (state, action) => {
      state.isLoadingUserContext = true;
    },
    checkingAuth: (state) => {
      state.isCheckingAuth = true;
    },
    loginLinkSent: (state) => {
      state.loginLinkSent = true;
      state.isSigningIn = false;
    },
    signInFailure: (state, action: PayloadAction<{ error: ApiError }>) => {
      state.isSigningIn = false;
    },
    signOutSuccess: (state) => {
      state.userContext = null;
      state.session = null;
      state.isAuth = false;
    },
    signOutFailure: (state) => {
      // TODO
    },
    loadingUserContext: (state) => {
      state.isLoadingUserContext = true;
    },
    loadUserContextSuccess: (
      state,
      action: PayloadAction<{ userContext: UserContext }>
    ) => {
      state.userContext = {
        email: state.session.user.email,
        ...action.payload.userContext,
      };
      state.isLoadingUserContext = false;
    },
    loadUserContextFailure: (state) => {
      state.userContext = null;
      state.isLoadingUserContext = false;
    },
    userAuthenticated: (
      state,
      action: PayloadAction<{ session: AuthSession }>
    ) => {
      state.session = action.payload.session;
      state.isAuth = true;
      state.isCheckingAuth = false;
    },
    userNotAuthenticated: (state) => {
      state.session = null;
      state.userContext = null;
      state.isAuth = false;
      state.isCheckingAuth = false;
    },
    checkAuthFailure: (state) => {
      state.session = null;
      state.userContext = null;
      state.isAuth = false;
      state.isCheckingAuth = false;
    },
  },
});

export const {
  checkingAuth,
  userAuthenticated,
  userNotAuthenticated,
  checkAuthFailure,
  signingIn,
  loginLinkSent,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  loadingUserContext,
  loadUserContextSuccess,
  loadUserContextFailure,
} = authSlice.actions;

export const selectIsAuth = (state: RootState) => state.auth.isAuth;
export const selectIsCheckingAuth = (state: RootState) =>
  state.auth.isCheckingAuth;
export const selectIsSigningIn = (state: RootState) => state.auth.isSigningIn;
export const selectUserContext = (state: RootState) => state.auth.userContext;
export const selectLoginLinkSent = (state: RootState) =>
  state.auth.loginLinkSent;

export const authReducer = authSlice.reducer;
