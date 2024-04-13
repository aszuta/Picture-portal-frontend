// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    baseUrl: 'http://127.0.0.1:8000',
    public: {
      baseURL: 'http://localhost:3000',
    },
  },
});
