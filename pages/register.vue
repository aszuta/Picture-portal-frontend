<template>
    <section class="section_container">
        <div class="container_content">
            <form class="content_form" method="post">
                <h1 class="form_title">Register</h1>
                <InputContainer type="text" placeholder="Name" name="name" label="Name: " />
                <InputContainer type="text" placeholder="Email" name="email" label="Email: " />
                <InputContainer type="password" placeholder="Password" name="password" label="Password: " />
                <button class="form_button" type="submit">Zarejestruj</button>
            </form>
            <div class="content_info">
                <div class="min_info">Masz konto?</div>
                <NuxtLink to="/login" class="sign_up">Zaloguj się</NuxtLink>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">

</script>