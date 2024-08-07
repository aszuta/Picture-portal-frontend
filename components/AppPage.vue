<template>
    <main :class="`AppPage AppPage--${props.name}`" >
        <slot></slot>
    </main>
</template>

<script setup>
const props = defineProps({
    name: String 
});
</script>


<style lang="scss">
.AppPage {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    &--profile {
        padding-top: 9rem;
    }

    &--picture {
        padding-top: 6rem;
        width: 100%;
    }

    &--home {
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

@media screen and (min-width: 768px){
    .AppPage {

        &--home {
            max-width: 1320px;
            width: 100%;
            margin-inline: auto;
        }
    }
}
</style>