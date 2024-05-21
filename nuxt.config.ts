// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    baseUrl: process.env.API_URL,
    public: {
      baseURL: process.env.PUBLIC_BASE_URL,
    },
  },
  build: {
    transpile: [
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-regular-svg-icons',
      '@fortawesome/free-solid-svg-icons',
    ],
  },
  css: [
    '~/assets/scss/style.scss',
    '@fortawesome/fontawesome-svg-core/styles.css',
  ],
});
