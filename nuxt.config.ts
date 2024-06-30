// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    baseUrl: process.env.BASE_URL,
    public: {
      baseURL: process.env.PUBLIC_BASE_URL,
    },
  },
  build: {
    transpile: [
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-regular-svg-icons',
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/vue-fontawesome',
    ],
  },
  css: [
    '~/assets/scss/style.scss',
    '@fortawesome/fontawesome-svg-core/styles.css',
  ],
  modules: [
    '@pinia/nuxt',
  ],
  nitro: {
    devProxy: {
      '/api/': {
        target: `${process.env.API_URL}/api`,
        changeOrigin: true,
      },
    },
  },
});
