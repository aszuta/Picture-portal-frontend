import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            isLoggedIn: false as Boolean,
            userProfile: [] as Array<any>
        };
    },

    getters: {},

    actions: {
        setUser (user: any) {
            this.userProfile = user;
        },
    },
});