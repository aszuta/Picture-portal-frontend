// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    baseUrl: process.env.API_URL,
    public: {
      baseURL: process.env.PUBLIC_BASE_URL,
    },
  },
  css: ['~/assets/scss/style.scss'],
});
