<template>
    <AppPage>
        <div class="AppPage__grid">
            <GridCard
                v-for="(picture, index) in data?.pictures"
                :key="picture.id"
                :id="picture.id"
                :name="picture.title"
                :path="picture.filepath"
                :createdBy="picture.createdBy"
                :index="index"
                :pictures="data?.pictures"
            />
        </div>
    </AppPage>
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

<style lang="scss">
.AppPage {

    &__grid {
        display: grid;
        align-items: start;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 20px;
        margin-bottom: 3rem;
    }
}
</style>