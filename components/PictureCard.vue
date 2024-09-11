<template>
    <section class="PictureSection">
        <div class="PictureSection__header">
            <header class="PictureSection__header-container">
                <div class="PictureSection__author">
                    <span class="PictureSection__author-info">
                        <NuxtLink :to="`/profile/${props.pictureCard.createdBy}`" class="PictureSection__avatar">
                            <font-awesome-icon :icon="['fas', 'user']" />
                        </NuxtLink>
                        <NuxtLink :to="`/profile/${props.pictureCard.createdBy}`" class="PictureSection__name">{{ props.pictureCard.username }}</NuxtLink>
                    </span>
                </div>
                <div class="PictureSection__buttons">
                    <button class="PictureSection__button" :class="props.pictureCard.isLiked ? 'PictureSection__button--like-active' : ''" @click="like()">
                        <font-awesome-icon :icon="['fas', 'heart']"/>
                    </button>
                    <button class="PictureSection__button" :class="props.pictureCard.isSaved ? 'PictureSection__button--save-active' : ''" @click="save()">
                        <font-awesome-icon :icon="['fas', 'plus']" />
                    </button>
                </div>
            </header>
        </div>
        <div class="PictureSection__picture-container">
            <img :src="`http://localhost:8000/${props.pictureCard?.filepath}`" alt="" class="PictureSection__picture">
        </div>
        <div class="PictureSection__info">
            <div class="PictureSection__info-container">
                <h1 class="PictureSection__container-title">{{ props.pictureCard?.title }}</h1>
                <div class="PictureSection__container-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
                <div class="PictureSection__container-date">
                    <div class="PictureSection__date-icon">
                        <font-awesome-icon :icon="['fas', 'calendar']" />
                    </div>
                     Published on: {{ props.pictureCard.createdAt }}
                </div>
            </div>
            <div class="PictureSection__tags">
                <NuxtLink class="PictureSection__tags-item" v-for="(tag, index) in props.pictureCard?.tags" :key="index" :to="`/tag/${tag.name}`" >
                    {{ tag.name }}
                </NuxtLink>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useUserStore } from '~/store/user';

const props = defineProps({
    pictureCard: Object,
});

const user = useUserStore().userProfile;
const isLoggedIn = useUserStore().isLoggedIn;
const api = useApi();
const isLikeActive = ref(false);
const isSaveActive = ref(false);

async function like() {
    if (isLoggedIn) {
        try {
            const payload = {
                postId: props.pictureCard?.id,
                vote: {
                    userId: user.id,
                    voteType: 'voteUp',
                },
            };

        if (isLikeActive.value === false) {
            await api(`/api/vote/${payload.postId}`, {
                method: 'POST',
                body: payload.vote,
            }).then(() => isLikeActive.value = true);
        } else {
            await api(`/api/vote?postId=${payload.postId}&userId=${payload.vote.userId}`,{
                method: 'DELETE'
            }).then(() => isLikeActive.value = false);
        }
        } catch (error) {
            console.log(error);
        }
    } else {
            router.push('/login');
        }
};

async function save() {
    if (isLoggedIn) {
        try {
            const payload = {
                userId: user.id,
                postId: props.pictureCard.id,
            };
        
        if (isSaveActive.value === false) {
            await api('/api/savePost', {
                method: 'POST',
                body: payload,
            }).then(() => isSaveActive.value = true);
        } else {
            await api(`/api/savePost?userId=${payload.userId}&postId=${payload.postId}`, {
                method: 'DELETE'
            }).then(() => isSaveActive.value = false);
        }
        } catch (error) {
            console.log(error);
        }
    } else {
        router.push('/login');
    }
};
</script>

<style lang="scss">
.PictureSection {
    padding: 1rem 2rem;
    max-width: 1440px;
    width: 100%;

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
        display: inherit;
        align-items: center;
        justify-content: center;
        background-color: #8c8c8c;
        border-radius: 20px;
        height: 40px;
        width: 40px;
        color: black;
    }

    &__name {
        display: block;
        font-size: 16px;
        background: none;
        color: #6d6d6d;
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

        &--like-active {
            background-color: #eb2f2f;
            color: white;
            border: 1px solid #eb2f2f;

            &:hover {
                background-color: #ed5858;
                color: white;
                border: 1px solid #ed5858;
            }
        }

        &--save-active {
            background-color: black;
            color: white;
            border: 1px solid black;

            &:hover {
                background-color: #403e3e;
                color: white;
                border: 1px solid #403e3e;
            }
        }

        &:hover {
            border: 1px solid #1a1a1a;
        }
    }

    &__picture-container {
        display: flex;
        justify-content: center;
    }

    &__picture {
        min-width: 300px;
        max-width: 1440px;
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
        padding-top: 8px;
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
        color: black;
        padding: 5px 10px;
        border-radius: 3px;

        &:hover {
            background-color: #d9d9d9;
            cursor: pointer;
        }
    }
}

@media screen and (max-width: 650px) {
    .PictureSection {
        padding: 0;
        width: 100%;

    }
}
</style>