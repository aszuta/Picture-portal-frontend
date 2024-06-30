<template>
    <main class="profile_main">
        <div class="main_profile">
            <div class="profile_container">
                <img class="profile_image" src="../../assets/default_profile_image.png" alt="" >
                <div class="container_info">
                    <div class="profile_name">{{ data?.profile.name }}</div>
                    <div class="profile_description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                </div>
            </div>
        </div>
        <div class="main_buttons">
            <ul class="buttons_list">
                <li class="list_item item_active">
                    <NuxtLink class="item_link">Photos</NuxtLink>
                </li>
                <li class="list_item">
                    <NuxtLink class="item_link">Saved</NuxtLink>
                </li>
            </ul>
        </div>
    </main>
</template>

<script setup>
const api = useApi();

const { data } = await useAsyncData('profile', async () => {
    const profile = await api(`/api/user/${1}`);
    return {
        profile
    };
});
</script>