<template>
    <header class="AppHeader">
        <div class="AppHeader__container">
            <div class="AppHeader__logo">Logo</div>
            <nav class="AppHeader__navigation">
                <form class="AppHeader__navigation-search" @submit.prevent="search()">
                    <button class="AppHeader__search-button" @click="search()">
                        <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="AppHeader__icon-left"/>
                    </button>
                    <TextInput v-model="input" type="text" placeholder="Write something..." name="search"/>
                    <button class="AppHeader__search-button" @click="clear()">
                        <font-awesome-icon :icon="['fas', 'xmark']" class="AppHeader__icon-right"/>
                    </button>
                </form>
                <ul class="AppHeader__navigation-list">
                    <li class="AppHeader__list-item">
                        <button class="AppHeader__item AppHeader__item-button" @click="openModal()">Add</button>
                        <UploadPictureModal v-if="isModalActive" @close="isModalActive = false" file-form/>
                    </li>
                    <li class="AppHeader__list-item">
                        <NuxtLink v-if="loggedIn === false" to="/login" class="item_link">Login</NuxtLink>
                        <NuxtLink v-else :to="`/profile/${currentUser.id}`">{{ currentUser.name }}</NuxtLink>
                    </li>
                    <li class="AppHeader__list-item">
                        <NuxtLink v-if="loggedIn === false" to="/register" class="item_link">Register</NuxtLink>
                        <button v-else class="AppHeader__item AppHeader__item-button" @click.prevent="logout()" >Logout</button>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script setup>
import { useUserStore } from '~/store/user';

const loggedIn = useUserStore().$state.isLoggedIn;
const currentUser = useUserStore().$state.userProfile;
let isModalActive = ref(false);
const api = useApi();
const router = useRouter();
let input = ref('');

function search() {
    router.push(`/search/${input.value}`);
}

function clear() {
    // input.value = '';
};

function openModal() {
    isModalActive.value = !isModalActive.value;
};

async function logout() {
    await api('/api/auth/logout', { 
        method: 'POST',
        credentials: 'include' 
    });
    const cookie = useCookie('authcookie');
    cookie.value = null;
    reloadNuxtApp();
};
</script>

<style lang="scss">
.AppHeader {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 6rem;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 6;

    &__container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: inherit;
        background-color: #fffcfa;
        max-width: 1440px;
        width: 100%;
    }

    &__logo {
        padding: 0 3vh;
        font-weight: 500;
        z-index: 5;
    }

    &__navigation {
        display: flex;
        flex-grow: 1;
    }

    &__navigation-search {
        display: flex;
        flex-direction: inherit;
        flex-grow: 1;
        height: 40px;
        border-radius: 17px;
        box-shadow: 0 0 0 1px #d9d9d9;

        &:focus {
            background-color: white;
            outline: none;
        }
    }

    &__search-input {
        width: 100% ;
        border: none;
        padding: 0 1vh;
    }

    &__search-button {
        display: flex;
        align-items: center;
        background-color: initial;
        padding: 0;
        color: #9c9c9c;

        &:hover {
            color: #616161;
            cursor: pointer;
        }
    }

    &__icon-left {
        padding-left: 15px;
    }

    &__icon-right {
        padding-right: 15px;
    }

    &__navigation-list {
        display: inherit;
        height: inherit;
        list-style: none;
    }

    &__list-item {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        height: inherit;
        padding: 0 1rem;
    }

    &__item {
        display: inherit;
        justify-content: inherit;
        align-items: inherit;
        height: inherit;
        position: relative;
    }

    &__item-button {
        font-size: 15px;
        border: solid 1px #d9d9d9;
        border-radius: 15px;
        padding: 10px 20px;

        &:hover {
            background-color: #eeeded;
            cursor: pointer;
        }
    }
}
</style>