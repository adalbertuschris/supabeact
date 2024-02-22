import { supabaseClient } from "../base/supabase-client";
import { fromSupabase } from "../base/supabase/utils/from-supabase";
import { supabasePayload } from "../base/supabase/utils/supabase-payload.util";
import { mapSupabaseResponseToResult } from "../base/supabase/utils/supabase-response.util";
import { ProfileResponse } from "./models/profile-response";
import { ProfileUpsertRequest } from "./models/profile-upsert-request";

type ProfileSupabaseResponse = {
  id: string;
  first_name: string;
  last_name: string;
};

type ProfileUpsertSupabasePayload = Omit<ProfileSupabaseResponse, "id"> & {
  updated_at: string;
};

export const getProfile = async (userId: string): Promise<ProfileResponse> => {
  const response = await fromSupabase(
    supabaseClient
      .from("profiles")
      .select(`*`)
      .eq("id", userId)
      .single<ProfileSupabaseResponse>()
  );

  return mapSupabaseResponseToResult(response);
};

export const updateProfile = async (model: {
  id: string;
  data: ProfileUpsertRequest;
}): Promise<ProfileResponse> => {
  const payload: ProfileUpsertSupabasePayload = supabasePayload({
    ...model.data,
    updatedAt: new Date().toISOString(),
  });

  const response = await fromSupabase(
    supabaseClient
      .from("profiles")
      .update(payload)
      .eq("id", model.id)
      .select()
      .single<ProfileSupabaseResponse>()
  );

  return mapSupabaseResponseToResult(response);
};
