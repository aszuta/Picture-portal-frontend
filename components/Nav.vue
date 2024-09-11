<template>
    <header class="AppHeader">
        <div class="AppHeader__container">
            <NuxtLink to="/" class="AppHeader__logo-container">
                <img class="AppHeader__logo" src="../assets/logo.PNG">
            </NuxtLink>
            <nav class="AppHeader__navigation">
                <form class="AppHeader__navigation-search" @submit.prevent="search()">
                    <button class="AppHeader__search-button" @click="search()">
                        <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="AppHeader__icon-left"/>
                    </button>
                    <TextInput v-model="input" type="text" placeholder="Write something..." name="search"/>
                    <button v-if="input != ''" class="AppHeader__search-button" @click.prevent="clear()">
                        <font-awesome-icon :icon="['fas', 'xmark']" class="AppHeader__icon-right"/>
                    </button>
                </form>
                <button class="AppHeader__hamburger" @click="open">
                    <span></span>
                    <span :class="[isNavigationActive ? 'AppHeader__hamburger-span' : '']"></span>
                    <span></span>
                </button>
                <ul class="AppHeader__navigation-list" :class="{ 'AppHeader__navigation-list--active': isNavigationActive }" @click="isNavigationActive = false" @keydown="isNavigationActive = false">
                    <li class="AppHeader__list-item">
                        <button class="AppHeader__item AppHeader__item-button" @click="openModal()">Add</button>
                    </li>
                    <li class="AppHeader__list-item">
                        <NuxtLink v-if="!userStore.isLoggedIn" to="/login" class="AppHeader__item">Login</NuxtLink>
                        <NuxtLink v-else :to="`/profile/${userStore.userProfile.id}`">{{ userStore.userProfile.name }}</NuxtLink>
                    </li>
                    <li class="AppHeader__list-item">
                        <NuxtLink v-if="!userStore.isLoggedIn" to="/register" class="AppHeader__item">Register</NuxtLink>
                        <button v-else class="AppHeader__item AppHeader__item-button" @click.prevent="logout()" >Logout</button>
                    </li>
                </ul>
            </nav>
            <UploadPictureModal v-if="isModalActive" @close="isModalActive = false" file-form/>
        </div>
    </header>
</template>

<script setup>
import { useUserStore } from '~/store/user';
const userStore = useUserStore();

let isModalActive = ref(false);
let isNavigationActive = ref(false);
let isMobileView = ref(false);
const api = useApi();
const router = useRouter();
const input = ref('');

function search() {
    router.push(`/search/${input.value}`);
}

function clear() {
    input.value = '';
};

function open() {
    isNavigationActive.value = !isNavigationActive.value;
};

function handleResize() {
  isMobileView.value = window.innerWidth <= 600;
}

onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

function openModal() {
    if (userStore.isLoggedIn) {
        isModalActive.value = !isModalActive.value;
    } else {
        router.push('/login');
    }
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
        box-shadow: 0 1px 4px rgb(146 161 176 / 15%);
    }

    &__logo-container {
        padding: 0 3vh;
        font-weight: 500;
        z-index: 5;
    }

    &__logo {
        width: 35px;
    }

    &__navigation {
        display: flex;
        align-items: center;
        flex-grow: 1;
    }

    &__navigation-search {
        display: flex;
        flex-direction: inherit;
        flex-grow: 1;
        height: 40px;
        border-radius: 17px;
        box-shadow: 0 0 0 1px #d9d9d9;
        background-color: #fffcfa;
        transition: 0.3s;

        &:focus {
            background-color: white;
            outline: none;
        }

        &:hover {
            background-color: #eeeded;
            transition: 0.3s;
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
        background-color: transparent;
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

    &__hamburger {
        width: 6rem;
        height: 6rem;
        position: relative;
        background: transparent;
        margin-left: 5px;
        z-index: 5;

        > span:first-child {
            top: 1rem;
        }
        
        > span {
            display: block;
            width: 1.6rem;
            height: 0.2rem;
            margin: auto;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background-color: rgb(0, 0, 0);
            transition: left 0.32s;
        }
        
        > span:last-child {
            bottom: 1rem;
        }
    }

    &__hamburger-span:nth-child(2) {
        left: -1rem;
    }

    &__navigation-list {
        display: inherit;
        height: 100%;
        width: 100%;
        position: fixed;
        top: 0;
        right: -100%;
        list-style: none;
        background-color: #fffcfa;
        transition: right 0.3s;

        &--active {
            right: 0;
            flex-direction: column;
        }
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
        text-decoration: none;
        color: #6d6d6d;

        &:hover {
            color: black;
        }
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

@media screen and (max-width: 600px) {
    .AppHeader {

        &__navigation-list {
            flex-direction: column;
            height: 30%;
            padding-top: 6rem;
            box-shadow: 0 1px 4px rgb(146 161 176 / 15%);
        }

        &__item-button {
            padding: 20px 40px;
        }
    }
}

@media screen and (min-width: 1024px) {
    .AppHeader {

        &__hamburger {
            display: none;
        }

        &__navigation-list {
            align-items: center;
            width: auto;
            padding: 0 2vw;
            position: static;
            background: transparent;
        }
    }
}
</style>