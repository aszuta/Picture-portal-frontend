<template>
    <div class="CommentsSection__comment">
        <div class="CommentsSection__user">{{ props.name }}</div>
        <div class="CommentsSection__text">{{ props.content }}</div>
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

@media screen and (min-width: 768px){
    .CommentsSection {
        max-width: 1320px;
        width: 100%;
        margin-inline: auto;
    }
}
</style>