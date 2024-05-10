<template>
    <div class="register_container">
        <div class="container_content">
            <form class="content_form" method="post">
                <h1 class="form_title">Register</h1>
                <Input type="text" placeholder="Name" name="name" label="Name: " />
                <Input type="text" placeholder="Email" name="email" label="Email: " />
                <Input type="password" placeholder="Password" name="password" label="Password: " />
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

</script>