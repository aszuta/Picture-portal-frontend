<template>
    <div class="register_container">
        <div class="container_content">
            <form class="content_form" method="post" @submit.prevent="register()">
                <h1 class="form_title">Register</h1>
                <Input v-model="form.name" type="text" placeholder="Name" name="name" label="Name: " />
                <Input v-model="form.email" type="text" placeholder="Email" name="email" label="Email: " />
                <Input v-model="form.password" type="password" placeholder="Password" name="password" label="Password: " />
                <button class="form_button" type="submit">Zarejestruj</button>
            </form>
            <div class="content_info">
                <div class="min_info">Masz konto?</div>
                <NuxtLink to="/login" class="info_link">Zaloguj się</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/store/user';

type Register = {
    name: string,
    email: string,
    password: string
};

const form = ref<Register>({
    name: '',
    email: '',
    password: ''
});

async function register() {
    try {
        await useUserStore().register(form.value);
    } catch (error) {   
        console.log(error);
    }
};
</script>