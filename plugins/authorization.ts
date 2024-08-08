import { useUserStore } from '~/store/user';
import { storeToRefs } from 'pinia';
import { jwtDecode } from 'jwt-decode';

export default defineNuxtPlugin(() => {
    const { isLoggedIn } = storeToRefs(useUserStore());
    const user = useUserStore();
    const cookie = useCookie('authcookie');
    const api = useApi();

    const getUser = async () => {
        const profile = await api('/api/auth/profile', {
            method: 'GET'
        });
        user.setUser(profile);
        console.log(profile);
    }

    if (cookie.value) {
        isLoggedIn.value = true;
    }

    if (user.$state.isLoggedIn) {
        getUser();
    }

    if (import.meta.client) {
        if (user.$state.isLoggedIn) {
            setInterval(async () => {
                const cookie = useCookie('authcookie')?.value;
                console.log(cookie);
                if (!cookie) {
                    return await $fetch('/api/auth/refresh', {
                        credentials: 'include',
                    });
                }
    
                const decodedCookie = jwtDecode(cookie);
                const expiration = decodedCookie.exp - 30;
                const expDate = Date.now() / 1000;
                    
                if (expDate > expiration) {
                    await $fetch('/api/auth/refresh', {
                        credentials: 'include',
                    });
                }
            }, 1000);
        }
    }
});