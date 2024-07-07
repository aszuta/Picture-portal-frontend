<template>
    <div class="login_container">
        <div class="container_content">
            <form class="content_form" method="post" @submit.prevent="login()">
                <h1 class="form_title">Login</h1>
                <Input v-model="form.email" type="text" placeholder="Email" name="email" label="Email "/>
                <Input v-model="form.password" type="password" placeholder="Password" name="password" label="Password "/>
                <button type="submit" class="form_button">Zaloguj</button>
            </form>
            <div class="content_info">
                <div class="min_info">Nie masz konta?</div>
                <NuxtLink to="/register" class="info_link">Zarejestruj się</NuxtLink>
            </div>
        </div>
    </div>
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
        }).then(() => useUserStore().isLoggedIn = true);
    } catch(error) {
        console.log(error);
    }
};
</script>
