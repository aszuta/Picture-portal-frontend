import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            isLoggedIn: false as Boolean,
            userProfile: {} as Object
        };
    },

    getters: {},

    actions: {
        setUser (user: Object) {
            this.userProfile = user;
        },
    },
});