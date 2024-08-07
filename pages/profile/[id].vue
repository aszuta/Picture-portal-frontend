<template>
    <AppPage name="profile">
        <div class="AppPage__profile">
            <div class="AppPage__profile-container">
                <img class="AppPage__profile-avatar" src="../../assets/default_profile_image.png" alt="" >
                <div class="AppPage__profile-info">
                    <div class="AppPage__profile-name">{{ data?.profile.name }}</div>
                    <div class="AppPage__profile-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                </div>
            </div>
        </div>
        <div class="AppPage__profile-buttons">
            <ul class="AppPage__buttons-list">
                <li class="AppPage__list-item item--active">
                    <NuxtLink class="AppPage__item-link">Photos</NuxtLink>
                </li>
                <li class="AppPage__list-item">
                    <NuxtLink class="AppPage__item-link">Saved</NuxtLink>
                </li>
            </ul>
        </div>
        <div class="AppPage__grid">
            <GridCard
                v-for="(picture, index) in data?.pictures"
                :key="picture.id"
                :id="picture.id"
                :name="picture.title"
                :path="picture.filepath"
                :createdBy="picture.createdBy"
                :index="index"
                :pictures="data?.pictures"
            />
        </div>
    </AppPage>
</template>

<script setup>
const api = useApi();
const route = useRoute().params.id;

const { data } = await useAsyncData('profile', async () => {
    const profile = await api(`/api/user/${route}`);
    const pictures = await api(`/api/picture/file/${profile.id}`);
    return {
        profile,
        pictures
    };
});
</script>

<style lang="scss">
.AppPage {

    &__profile {
        max-width: 1000px;
        width: 100%;
        margin-inline: auto;
    }

    &__profile-container {
        display: flex;
        align-items: center;
        gap: 30px;
    }

    &__profile-avatar {
        display: block;
        height: 150px;
        width: 150px;
        border-radius: 50%;
    }

    &__profile-info {
        display: flex;
        flex-direction: column;
        row-gap: 30px;
    }

    &__profile-name {
        font-size: 40px;
        font-weight: 600;
    }

    &__profile-description {
        max-width: 70%;
    }

    &__profile-buttons {
        position: sticky;
        box-shadow: 0 1px #0000001f;
        width: 50%;
        margin-top: 50px;
        margin-bottom: 20px;
    }

    &__buttons-list {
        display: flex;
        justify-content: center;
        column-gap: 30px;
        list-style: none;
    }

    &__list-item {
        padding: 1rem 2rem;
        color: #8c8c8c;

        &:hover {
            color: #000000;
            box-shadow: inset 0 -2px #111;
        }
    }

    &__item-link {
        position: relative;
    }

    .item--active {
        font-weight: 600;
        color: #000000;
    }
}
</style>