import { useUserStore } from "~/store/user";
import { storeToRefs } from "pinia";

export default defineNuxtPlugin(() => {
    const { isLoggedIn } = storeToRefs(useUserStore());
    const user = useUserStore();
    const cookie = useCookie('authcookie');
    console.log(cookie.value);

    if (cookie.value) {
        console.log(isLoggedIn.value);
        isLoggedIn.value = true;
    }

    if (import.meta.client) {
        if (user.$state.isLoggedIn == true) {
            user.intervalToken();
        }
    }
});