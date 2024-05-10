<template>
    <div class="login_container">
        <div class="container_content">
            <form class="content_form" method="post">
                <h1 class="form_title">Login</h1>
                <Input type="text" placeholder="Email" name="email" label="Email " />
                <Input type="password" placeholder="Password" name="password" label="Password "/>
                <button type="submit" class="form_button">Zaloguj</button>
            </form>
            <div class="content_info">
                <div class="min_info">Nie masz konta?</div>
                <NuxtLink to="/register" class="info_link">Zarejestruj się</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>
