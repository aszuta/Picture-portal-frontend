import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            isLoggedIn: false
        };
    },

    getters: {},

    actions: {
        async getProfile() {
            await $fetch('/api/auth/profile', {
                credentials: 'include',
            });
        },

        async intervalToken() {
            if (this.isLoggedIn) {
                setInterval(async () => {
                    const cookie = useCookie('authcookie')?.value;
                    if (!cookie) return this.refresh();
        
                    const decodedCookie = jwtDecode(cookie);
                    const expiration = decodedCookie.exp - 30;
                    const expDate = Date.now() / 1000;
                        
                    if (expDate > expiration) {
                        this.refresh();
                    }
                }, 30000);
            };
        },

        async refresh() {
            await $fetch('/api/auth/refresh', {
                credentials: 'include',
            });
        },

        async logout() {
            await $fetch('/api/auth/logout', {
                credentials: 'include',
            });
        },
    },
});