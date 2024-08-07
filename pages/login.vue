<template>
    <AppPage name="login">
        <div class="AppPage__login-container">
            <form class="AppPage__login-form" method="post" @submit.prevent="login()">
                <h1 class="AppPage__form-title">Login</h1>
                <TextInput v-model="form.email" type="text" placeholder="Email" name="email" label="Email "/>
                <TextInput v-model="form.password" type="password" placeholder="Password" name="password" label="Password "/>
                <button type="submit" class="AppPage__form-button">Zaloguj</button>
            </form>
            <div class="AppPage__info">
                <div class="AppPage__info-message">Nie masz konta?</div>
                <NuxtLink to="/register" class="AppPage__info-link">Zarejestruj się</NuxtLink>
            </div>
        </div>
    </AppPage>
</template>

<script setup>
import { useUserStore } from '../store/user';

const api = useApi();

const form = {
    email: '',
    password: '',
};

async function login() {
    try {
        await api('/api/auth/login', {
            method: 'POST',
            body: form
        }).then(() => {
            useUserStore().isLoggedIn = true;
            navigateTo('/');
        });
    } catch(error) {
        console.log(error);
    }
};
</script>

<style lang="scss">
.AppPage {

    &__login-container {
        display: flex;
        flex-direction: column;
        height: 100%;
        text-align: center;
    }

    &__login-form {
        display: flex;
        flex-direction: column;
        padding: 1rem 2rem;
        gap: 24px;
    }

    &__form-title {
        text-align: center;
        font-size: 30px;
    }

    &__form-button {
        padding: 0.4rem 1rem;
        background-color: black;
        color: white;
        min-height: 40px;
        font-size: 16px;
        border-radius: 7px;
        transition: 0.3s;

        &:hover {
            background-color: #404040;
            transition: 0.3s;
        }
    }

    &__info {
        display: flex;
        flex-direction: column;
    }

    &__info-message {
        display: flex;
        justify-content: center;
    }

    &__info_link {
        display: flex;
        justify-content: center;
        color: #8c8c8c;
    }
}
</style>

