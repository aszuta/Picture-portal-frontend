<template>
    <div class="page_article">
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
                    <button class="btn_like">
                        <font-awesome-icon :icon="['fas', 'heart']" />
                    </button>
                    <button class="btn_save">
                        <font-awesome-icon :icon="['fas', 'plus']" />
                    </button>
                </div>
            </header>
        </div>
        <div class="actictle_main">
            <div class="1">{{ data?.picture.id }}</div>
            <div class="1">{{ data?.picture.title }}</div>
            <img :src="`http://localhost:8000/${data?.picture.filepath}`" alt="">
        </div>
    </div>
</template>

<script setup lang="ts">
const api = useApi();
const { id } = useRoute().params;
const route = useRoute().name;
console.log(route);

const { data } = await useAsyncData('picture', async () => {
    const picture = await api(`/api/picture/${id}`);
    console.log(picture);
    return {
        picture
    };
});

</script>