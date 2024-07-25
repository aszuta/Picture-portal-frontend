<template>
    <form  @submit.prevent="submit()" method="post" class="CommentsSection__form">
        <h2 class="CommentsSection__form-title">Add comment</h2>
        <div class="CommentsSection__avatar">
            <font-awesome-icon :icon="['fas', 'user']" />
        </div>
        <TextInput v-model="form.content" type="text" name="comment"/>
        <button class="CommentsSection__button">
            <font-awesome-icon :icon="['fas', 'paper-plane']" />
        </button>
    </form>
</template>

<script setup>
const props = defineProps({
    postId: String
});

const form = {
    postId: props.postId,
    name: 'test1',
    content: ''
};
const api = useApi();

async function submit() {
    try {
        await api(`/api/comment/${props.postId}`, {
            method: 'POST',
            body: form.value
        });
    } catch (error) {
        console.log(error);
    }
};
</script>

<style lang="scss">
.CommentsSection {
    display: flex;
    flex-direction: column;
    padding-top: 50px;
    padding-inline: 20px;

    &__form {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    &__form-title {
        margin-bottom: 24px;
        line-height: 1.5rem;
    }

    &__avatar {
        background-color: #8c8c8c;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
    }

    &__button {
        background-color: #e6e6e6;
        border-radius: 20px;
        width: 60px;
        height: 40px;

        &:hover {
            background-color: #cccccc;
            cursor: pointer;
        }
    }
}

@media screen and (min-width: 768px){
    .CommentsSection {
        max-width: 1320px;
        width: 100%;
        margin-inline: auto;
    }
}
</style>