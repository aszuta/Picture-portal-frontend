import { type FetchOptions } from 'ofetch';

export const useApi = () => {
  const runtimeConfig = useRuntimeConfig();
  const cookie = useCookie('authcookie');

  return async <T>(url: string, fetchOptions: FetchOptions = {}): Promise<T> => {
    const baseURL = import.meta.server
      ? runtimeConfig.baseURL
      : runtimeConfig.public.baseURL;

    return $fetch<T>(url, {
      baseURL,
      headers: cookie.value ? { Authorization: `Bearer ${cookie.value}` } : {},
      ...fetchOptions,
    });
  };
};
