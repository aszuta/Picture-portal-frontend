import { useUserStore } from "~/store/user";
import { storeToRefs } from "pinia";

export default defineNuxtPlugin(() => {
    const { isLoggedIn } = storeToRefs(useUserStore());
    const user = useUserStore();
    const cookie = useCookie('authcookie');

    if (cookie.value) {
        isLoggedIn.value = true;
        console.log('test');
    }

    if (isLoggedIn.value = true) {
        user.intervalToken();
    }

    if (process.client) {
        
    }
});