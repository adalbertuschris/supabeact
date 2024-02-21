import { AuthSession } from "@supabase/supabase-js";
import { supabaseClient } from "../base/supabase-client";
import { mapSupabaseResponseToResult } from "../base/supabase/utils/supabase-response.util";
import { SignInResponse } from "./models/sign-in-response";
import { UserContextResponse } from "./models/user-context-response";
import {
  fromSupabase,
  fromSupabaseAuth,
} from "../base/supabase/utils/from-supabase";

export const getSession = (): Promise<{ session: AuthSession }> =>
  fromSupabaseAuth(supabaseClient.auth.getSession());

// TODO Change emailRedirectTo
export const signInViaLoginLink = (email: string): Promise<SignInResponse> =>
  fromSupabaseAuth(
    supabaseClient.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "http://localhost:5174/",
      },
    })
  );

export const signOut = (): Promise<void> =>
  fromSupabaseAuth(supabaseClient.auth.signOut());

export const getUserContext = async (
  userId: string
): Promise<UserContextResponse> => {
  const response = await fromSupabase(
    supabaseClient
      .from("profiles")
      .select("id,last_name,first_name")
      .eq("id", userId)
      .single<UserContextResponse>()
  );

  return mapSupabaseResponseToResult(response);
};
