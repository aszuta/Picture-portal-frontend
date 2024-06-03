<template>
    <section class="picture_section">
        <div class="article_header">
            <header class="header_container">
                <div class="container_author">
                    <span class="author_data">
                        <button class="data_avatar">
                            <font-awesome-icon :icon="['fas', 'user']" />
                        </button>
                        <button class="data_name">test</button>
                    </span>
                </div>
                <div class="container_btn">
                    <button class="btn">
                        <font-awesome-icon :icon="['fas', 'heart']" />
                    </button>
                    <button class="btn">
                        <font-awesome-icon :icon="['fas', 'plus']" />
                    </button>
                </div>
            </header>
        </div>
        <div class="main_content">
            <img :src="`http://localhost:8000/${props.path}`" alt="">
        </div>
        <div class="main_info">
            <div class="info_container">
                <h1 class="container_title">{{ props.title }}</h1>
                <div class="info_description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
                <div class="container_date">
                    <div class="date_icon">
                        <font-awesome-icon :icon="['fas', 'calendar']" />
                    </div>
                     Published on: {{ props.createdAt }}
                </div>
            </div>
            <div class="info_tags">
                <NuxtLink class="tags_item">Technology</NuxtLink>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const props = defineProps({
    title: String,
    path: String,
    createdAt: Date,
});
</script>