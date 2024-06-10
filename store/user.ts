import { defineStore } from "pinia";
import { jwtDecode, type JwtPayload } from "jwt-decode";
import Register from "~/pages/register.vue";

const api = useApi();

type Login = {
    email: string,
    password: string,
};

type Register = {
    name: string,
    email: string,
    password: string,
};

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            isLoggedIn: false
        };
    },

    getters: {},

    actions: {
        async loginUser(login: Login) {
            await api('/api/auth/login', {
                method: 'POST',
                body: login
            }).then(() => {
                this.isLoggedIn = true;
                this.intervalToken();
            });
        },

        async register(register: Register) {
            await api('/api/user/register', {
                method: 'POST',
                body: register,
            }).then(() => {
                this.isLoggedIn = true;
                this.intervalToken();
            });
        },

        async getProfile() {
            await api('/api/auth/profile', {
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
                }, 1000);
            };
        },

        async refresh() {
            await api('/api/auth/refresh', {
                credentials: 'include',
            });
        },

        async logout() {
            await api('/api/auth/logout', {
                credentials: 'include',
            });
        },
    },
});