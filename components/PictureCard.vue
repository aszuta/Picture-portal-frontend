<template>
    <section class="PictureSection">
        <div class="PictureSection__header">
            <header class="PictureSection__header-container">
                <div class="PictureSection__author">
                    <span class="PictureSection__author-info">
                        <button class="PictureSection__avatar">
                            <font-awesome-icon :icon="['fas', 'user']" />
                        </button>
                        <button class="PictureSection__name">test</button>
                    </span>
                </div>
                <div class="PictureSection__buttons">
                    <button class="PictureSection__button">
                        <font-awesome-icon :icon="['fas', 'heart']" />
                    </button>
                    <button class="PictureSection__button">
                        <font-awesome-icon :icon="['fas', 'plus']" />
                    </button>
                </div>
            </header>
        </div>
        <div class="PictureSection__picture">
            <img :src="`http://localhost:8000/${props.path}`" alt="">
        </div>
        <div class="PictureSection__info">
            <div class="PictureSection__info-container">
                <h1 class="PictureSection__container-title">{{ props.title }}</h1>
                <div class="PictureSection__container-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
                <div class="PictureSection__container-date">
                    <div class="PictureSection__date-icon">
                        <font-awesome-icon :icon="['fas', 'calendar']" />
                    </div>
                     Published on: {{ props.createdAt }}
                </div>
            </div>
            <div class="PictureSection__tags">
                <NuxtLink class="PictureSection__tags-item">Technology</NuxtLink>
            </div>
        </div>
    </section>
</template>

<script setup>
const props = defineProps({
    title: String,
    path: String,
    createdAt: String,
});
</script>

<style lang="scss">
.PictureSection {
    padding: 1rem 2rem;

    &__header {
        position: relative;
        z-index: 1;
    }

    &__header-container {
        display: flex;
        align-items: center;
        padding: 13px 20px;
    }

    &__author {
        flex-grow: 1;
    }

    &__author-info {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    &__avatar {
        background-color: #8c8c8c;
        border-radius: 20px;
        height: 40px;
        width: 40px;
    }

    &__name {
        display: block;
        font-size: 16px;
    }

    &__buttons {
        display: flex;
                gap: 8px;
    }

    &__button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #a7a7a7;
        border-radius: 5px;
        height: 30px;
        min-width: 40px;
        color: #666666;
        transition: 0.1s;

        &:hover {
            color: #1a1a1a;
            border: 1px solid #1a1a1a;
        }
    }

    &__picture {
        display: flex;
        justify-content: center;
    }

    &__info {
        padding-top: 15px;
        padding-inline: 20px;
    }

    &__info-container {
        max-width: 600px;
    }

    &__container-title {
        font-size: 18px;
        font-weight: 600;
        line-height: 1.5rem;
        text-align: left;
    }

    &__container-description {
        font-size: 14px;
        padding-top: 8px;
    }

    &__container-date {
        display: flex;
        align-items: center;
        font-size: 14px;
        padding-top: 20px;
    }

    &__date-icon {
        margin-right: 8px;
    }

    &__tags {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        padding-top: 20px;
    }

    &__tags-item {
        display: inline-block;
        background-color: #e6e6e6;
        padding: 5px 10px;
        border-radius: 3px;

        &:hover {
            background-color: #d9d9d9;
            cursor: pointer;
        }
    }
}
</style>