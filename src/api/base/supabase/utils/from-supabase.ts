import {
  SupabaseAuthResponse,
  SupabaseResponse,
} from "../models/supabase-response";
import { SupabaseObject } from "./supabase-response.util";

// For consistency we want to throw error for every api action,
// not return it in response, that's why we need this wrappers
export const fromSupabaseAuth = async <R>(
  input: Promise<SupabaseAuthResponse<R>>
): Promise<R> => {
  const { data, error } = await input;

  if (error) {
    throw error;
  }

  return data || null;
};

export const fromSupabase = <T extends object>(
  input: SupabaseObject<SupabaseResponse<T>>
): PromiseLike<SupabaseResponse<T>> => {
  return input.throwOnError();
};
