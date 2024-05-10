<template>
    <div class="navigation_header">
        <div class="header_container">
            <div class="container_logo">Logo</div>
            <div class="container_search">
                <input type="text" class="search_input">
            </div>
            <nav class="container_navigation">
                <ul class="navigation_list">
                    <li class="list_item">Dodaj</li>
                    <li class="list_item">
                        <NuxtLink to="/login" class="item_link">Login</NuxtLink>
                    </li>
                    <li class="list_item">
                        <NuxtLink to="/register" class="item_link">Register</NuxtLink>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>