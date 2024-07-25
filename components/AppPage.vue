<template>
    <main :class="`AppPage AppPage--${route}`" >
        <slot></slot>
    </main>
</template>

<script setup>
const route = useRoute().name;
</script>


<style lang="scss">
.AppPage {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    &--profile-id {
        padding-top: 9rem;
    }

    &--picture-id {
        padding-top: 6rem;
        width: 100%;
    }

    &--index {
        padding-top: 9rem;
    }

    &--login {
        margin-inline: auto;
        padding-top: 6rem;
        max-width: 600px;
    }

    &--register {
        margin-inline: auto;
        padding-top: 6rem;
        max-width: 600px;
    }
}
</style>