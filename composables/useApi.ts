import { type FetchOptions } from 'ofetch';

export const useApi = () => {
  const runtimeConfig = useRuntimeConfig();
  const cookie = useCookie('authcookie');

  return async <T>(url: string, fetchOptions: FetchOptions = {}): Promise<T> => {
    return $fetch<T>(url, {
      baseURL: runtimeConfig.baseUrl || runtimeConfig.public.baseURL,
      headers: cookie.value ? { Authorization: `Bearer ${cookie.value}` } : {},
      ...fetchOptions,
    });
  };
};
