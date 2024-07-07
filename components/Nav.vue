<template>
    <header class="navigation_header">
        <div class="header_container">
            <div class="container_logo">Logo</div>
            <div class="container_navigation">
                <div class="container_search">
                    <button class="search_icon">
                        <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="icon_search"/>
                    </button>
                    <input type="text" class="search_input" placeholder="Write something...">
                    <button class="search_icon">
                        <font-awesome-icon :icon="['fas', 'xmark']" class="icon_clear"/>
                    </button>
                </div>
                <ul class="navigation_list">
                    <li class="list_item">
                        <button class="item_link item_button" @click="openModal()">Add</button>
                        <Modal v-if="isModalActive" @close="isModalActive = false" file-form/>
                    </li>
                    <li class="list_item">
                        <NuxtLink to="/login" class="item_link">Login</NuxtLink>
                    </li>
                    <li class="list_item">
                        <NuxtLink to="/register" class="item_link">Register</NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
    </header>
</template>

<script setup>
let isModalActive = ref(false);

function openModal() {
    console.log(isModalActive.value);
    isModalActive.value = !isModalActive.value;
};
</script>