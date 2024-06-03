<template>
    <main class="AppPage">
        <PictureCard
            :title="data?.picture.title"
            :path="data?.picture.filepath"
            :createdAt="data?.picture.createdAt"
        />
        <!-- <div class="article_main"> -->
            
        <Comment />
        <ModalCard 
            :relatedPictures="data?.relatedPictures"
        />
        <!-- </div> -->
    </main>
</template>

<script setup lang="ts">
const api = useApi();
const { id } = useRoute().params;
const route = useRoute().name;
console.log(route);

const { data } = await useAsyncData('pictures', async () => {
    const picture = await api(`/api/picture/${id}`);
    const relatedPictures = await api('/api/picture');
    return {
        picture,
        relatedPictures
    };
});

</script>