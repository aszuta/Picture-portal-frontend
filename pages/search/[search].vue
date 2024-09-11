<template>
    <AppPage name="home">
        <h2 class="AppPage__title">Searched pictures for "{{ route }}"</h2>
        <div class="AppPage__grid">
            <GridCard
                v-for="(picture, index) in data?.searchedPictures"
                :key="picture.id"
                :id="picture.id"
                :name="picture.title"
                :path="picture.filepath"
                :createdBy="picture.createdBy"
                :username="picture.username"
                :index="index"
                :pictures="data?.searchedPictures"
            />
        </div>
    </AppPage>
</template>

<script setup>
const api = useApi();
const route = useRoute().params.search;

const { data } = await useAsyncData('pictures', async () => {
    const pictures = await api('/api/picture');
    const searchedPictures = pictures.filter(picture => picture.title.includes(route));

    return { searchedPictures };
})
</script>

<style lang="scss">
.AppPage {

    &__title {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
    }
}
</style>