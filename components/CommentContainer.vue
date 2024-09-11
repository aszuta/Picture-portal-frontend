<template>
    <section class="CommentsSection">
        <CommentForm 
            v-if="isLoggedIn"
            :postId="props.postId"
        />
        <div class="CommentsSection__comments">
            <h2 class="CommentsSection__title">Comments</h2>
            <Comment 
                v-for="comment in props.comments" 
                :key="comment.id"
                :name="comment.name"
                :content="comment.content"
            />
        </div>
    </section>
</template>

<script setup>
import { useUserStore } from '~/store/user';

const props = defineProps({
    postId: String,
    comments: Object
});

const isLoggedIn = useUserStore().isLoggedIn;
</script>

<style lang="scss">
.CommentsSection {
    padding-top: 50px;
    padding-inline: 20px;

    &__comments {
        width: 100%;
        padding-top: 20px;
    }

    &__title {
        display: flex;
        flex-direction: column;
        margin-bottom: 24px;
        line-height: 1.5rem;
    }
}

@media screen and (max-width: 767px) {
    .CommentsSection {
        max-width: 600px;
        width: 100%;
    }
}

@media screen and (min-width: 768px) {
    .CommentsSection {
        max-width: 1300px;
        width: 100%;
        margin-inline: auto;
    }
}
</style>