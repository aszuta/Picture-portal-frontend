<template>
    <AppPage name="home">
        <h2 class="AppPage__title">Pictures for tag "{{ route }}"</h2>
        <div class="AppPage__grid">
            <GridCard
                v-for="(picture, index) in data?.pictures"
                :key="picture.id"
                :id="picture.id"
                :name="picture.title"
                :path="picture.filepath"
                :createdBy="picture.createdBy"
                :username="picture.username"
                :index="index"
                :pictures="data?.pictures"
            />
        </div>
    </AppPage>
</template>

<script setup>
const api = useApi();
const route = useRoute().params.tag;

const { data } = await useAsyncData('pictures', async () => {
    const pictures = await api(`/api/picture/tag/${route}`);
    return { pictures };
});
</script>