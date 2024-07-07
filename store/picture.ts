import { defineStore } from "pinia";

export const usePictureStore = defineStore('picture', {
    state: () => {
        return {
            currentIndex: null,
            currentPicture: null,
            currentPictures: []
        };
    },

    getters: {},

    actions: {
        async getPicture(id: number) {
            await $fetch(`/api/picture/${id}`);
        },

        async minus() {
            if(this.currentIndex != null && this.currentPicture != null) {
                this.currentIndex--;
                this.currentPicture--;
                return this.currentPictures[this.currentIndex];
            }
        },

        async plus() {
            if(this.currentIndex != null && this.currentPicture != null) {
                this.currentIndex++;
                this.currentPicture++;
                return this.currentPictures[this.currentIndex];
            }
        }
    },
});