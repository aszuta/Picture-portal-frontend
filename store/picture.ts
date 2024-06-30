import { defineStore } from "pinia";

export const usePictureStore = defineStore('picture', {
    state: () => {
        return {
            currentPicture: null as number | null
        };
    },

    getters: {},

    actions: {
        async getPicture(id: number) {
            await $fetch(`/api/picture/${id}`);
        }
    },
});