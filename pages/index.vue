<template>
    <div class="home_container">
        <div class="container_grid">
            <GridCard
                v-for="(picture, index) in data?.pictures"
                :key="picture.id"
                :id="picture.id"
                :name="picture.title"
                :path="picture.filepath"
                :index="index"
                :pictures="data?.pictures"
            />
        </div>
    </div>
</template>

<script setup>
const api = useApi();

const { data } = await useAsyncData('pictures', async () => {
    const pictures = await api('/api/picture');
    return {
        pictures,
    };
});
</script>