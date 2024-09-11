import { useUserStore } from '~/store/user';
import { jwtDecode } from 'jwt-decode';

export default defineNuxtPlugin(() => {
    const user = useUserStore();;

    if (user.isLoggedIn) {
        setInterval(async () => {
            const cookie = useCookie('authcookie')?.value;
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
        }, 30000);
    }
});