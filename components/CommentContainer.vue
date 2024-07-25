<template>
    <section class="CommentsSection">
        <CommentForm/>
        <div class="CommentsSection__comments">
            <div class="CommentSection__container">
            <h2 class="CommentsSection__title">Comments</h2>
            <div class="CommentsSection__avatar">
                <font-awesome-icon :icon="['fas', 'user']" />
            </div>
            <Comment 
                v-for="comment in props.comments" 
                :key="comment.id"
                :name="comment.name"
                :content="comment.content"
            />
            </div>
        </div>
    </section>
</template>

<script setup>
const props = defineProps({
    comments: Object
});
</script>

<style lang="scss">
.CommentsSection {
    display: flex;
    flex-direction: column;
    padding-top: 50px;
    padding-inline: 20px;

    &__avatar {
        background-color: #8c8c8c;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
    }

    &__comments {
        display: inline-flex;
        width: 100%;
        padding-top: 20px;
    }

    &__container {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    &__title {
        margin-bottom: 24px;
        line-height: 1.5rem;
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