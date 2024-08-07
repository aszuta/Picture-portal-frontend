<template>
    <AppPage name="profile">
        <PictureCard
            :id="data?.picture.id"
            :title="data?.picture.title"
            :path="data?.picture.filepath"
            :createdAt="data?.picture.createdAt"
            :tags="data?.picture.tags"
        />
        <CommentContainer 
            :postId="id"
            :comments="data?.comments"
        />
        <ModalCard 
            :relatedPictures="data?.relatedPictures"
        />
    </AppPage>
</template>

<script setup>
const api = useApi();
const { id } = useRoute().params;
const route = useRoute();
console.log(route);

const { data } = await useAsyncData('pictures', async () => {
    const picture = await api(`/api/picture/${id}`);
    const relatedPictures = await api('/api/picture');
    const comments = await api(`/api/comment/${id}`, { method: 'GET' });
    return {
        picture,
        comments,
        relatedPictures
    };
});

</script>