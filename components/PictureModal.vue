<template>
    <dialog class="Modal" @click="$emit('close')" @keydown.esc="$emit('close')">
        <div class="Modal__container" @click.stop="">
            <div class="Modal__previous">
                <NuxtLink :to="{
                        name: 'picture-id',
                        params: { id: props.id}
                    }" class="Modal__previous-button" @click="showPrevPhoto">
                    <font-awesome-icon :icon="['fas', 'angle-left']" />
                </NuxtLink>
            </div>
            <div class="Modal__content">
                <PictureCard
                    :pictureCard="props.data"
                />
                <CommentContainer
                    :comments="props.data.comments"
                />
                <ModalCard 
                    :relatedPictures="props.data.related"
                />
            </div>
            <div class="Modal__next">
                <NuxtLink :to="{
                        name: 'picture-id',
                        params: { id: props.id}
                    }" class="Modal__next-button" @click="showNextPhoto">
                    <font-awesome-icon :icon="['fas', 'angle-right']" />
                </NuxtLink>
            </div>
            <div class="Modal__close-button" @click="closeModal" @keydown.esc="$emit('close')" >
                <font-awesome-icon :icon="['fas', 'xmark']" />
            </div>
        </div>
    </dialog>
</template>

<script setup>
import { usePictureStore } from '~/store/picture';

const props = defineProps({
    id: Number,
    fileForm: Boolean,
    data: Object,
});

const emit = defineEmits(['minus', 'plus', 'close']);

async function showPrevPhoto() {
    const result = await usePictureStore().showPrevPhoto();
    emit('minus', result);
};

async function showNextPhoto() {
    const result = await usePictureStore().showNextPhoto();
    emit('plus', result);
};

function closeModal() {
    const isModalActive = false;
    emit('close', isModalActive);
}
</script>

<style lang="scss">
.Modal {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: block;
    padding: 0 20px;
    padding-left: 120px;
    padding-right: 120px;
    z-index: 100;
    opacity: 1;

    &__container {
        background-color: #fff;
        border-radius: 3px;
        margin: 50px auto;
        padding: 20px;
    }

    &__previous {
        left: 0;
        display: flex;
        align-items: center;
        top: 0;
        bottom: 0;
        position: fixed;
    }

    &__previous-button {
        display: flex;
        font-size: 30px;
        padding-top: 80px;
        padding-bottom: 80px;
        padding-left: 44px;
        padding-right: 44px;
        color: #333333;

        &:hover {
            transition: 0.3s;
            color: #dee3e0;
        }

        &:active {
            transition: 0.3s;
            color: #333333;
        }
    }

    &__content {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 100%;
    }

    &__next {
        right: 0;
        display: flex;
        align-items: center;
        top: 0;
        bottom: 0;
        position: fixed;
    }

    &__next-button {
        display: flex;
        font-size: 30px;
        padding-top: 80px;
        padding-bottom: 80px;
        padding-left: 44px;
        padding-right: 44px;
        color: #333333;

        &:hover {
            transition: 0.3s;
            color: #dee3e0;
        }

        &:active {
            transition: 0.3s;
            color: #333333;
        }
    }
}
</style>
