<template>
    <AppPage name="picture">
        <PictureCard
            :pictureCard="data.picture"
        />
        <CommentContainer 
            :postId="id"
            :comments="data?.comments"
        />
        <ModalCard 
            :relatedPictures="data.picture.related"
        />
    </AppPage>
</template>

<script setup>
const api = useApi();
const { id } = useRoute().params;

const { data } = await useAsyncData('pictures', async () => {
    const picture = await api(`/api/picture/${id}`);
    const comments = await api(`/api/comment/${id}`, { method: 'GET' });
    return {
        picture,
        comments
    };
});

</script>