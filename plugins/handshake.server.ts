import { useUserStore } from '~/store/user';

export default defineNuxtPlugin(async () => {
    const user = useUserStore();
    const cookie = useCookie('authcookie');
    const api = useApi();

    const getUser = async () => {
        const profile = await api('/api/auth/profile', {
            method: 'GET'
        });

        user.setUser(profile as Object);
    }

    if (cookie.value) {
        user.isLoggedIn = true;
    }

    if (user.isLoggedIn) {
        await getUser();
    }
});