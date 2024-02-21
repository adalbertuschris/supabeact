import { mapObjectPropsToCamelCase } from "../utils/supabase-object.util";
import { SupabaseConverterOptions } from "../models/supabase-converter-options";
import { SupabaseResponse } from "../models/supabase-response";

// TODO Write tests

export interface SupabaseObject<T> extends PromiseLike<T> {
  throwOnError(): this;
}

export const mapSupabaseResponse = <T extends object, R>(
  response: SupabaseResponse<T>,
  converterOptions?: SupabaseConverterOptions
): R => {
  const { count, data } = response;
  const mappedResponse = mapObjectPropsToCamelCase(data, converterOptions) as R;

  return Array.isArray(mappedResponse)
    ? ({
        totalItems: count, // to get total items we need set count flag in select method
        items: mappedResponse,
      } as R)
    : mappedResponse;
};

export const mapSupabaseResponseToResult = <T extends object, R>(
  response: SupabaseResponse<T>,
  converterOptions?: SupabaseConverterOptions
): R => {
  const { count, data } = response;

  const mappedResponse = mapObjectPropsToCamelCase(data, converterOptions) as R;

  return Array.isArray(mappedResponse)
    ? ({
        totalItems: count, // to get total items we need set count flag in select method
        items: mappedResponse,
      } as R)
    : mappedResponse;
};
