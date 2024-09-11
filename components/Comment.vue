<template>
    <div class="CommentsSection__container">
        <div class="CommentsSection__avatar">
            <font-awesome-icon :icon="['fas', 'user']" />
        </div>
        <div class="CommentsSection__comment">
            <div class="CommentsSection__user">{{ props.name }}</div>
            <div class="CommentsSection__text">{{ props.content }}</div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    name: String,
    content: String
});
</script>

<style lang="scss">
.CommentsSection {

    &__container {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 15px;
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

    &__comment {
        display: flex;
        flex-direction: column;
    }

    &__user {
        font-size: 16px;
        font-weight: 600;
    }

    &__text {
        font-size: 14px;
        line-height: 1.5rem;
    }
}

@media screen and (min-width: 768px) {
    .CommentsSection {
        max-width: 1320px;
        width: 100%;
        margin-inline: auto;
    }
}
</style>