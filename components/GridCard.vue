<template>
  <div class="AppPage__grid-row" >
        <NuxtLink :to="`/picture/${props.id}`">
          <img :src="`http://localhost:8000/${props.path}`" alt="" class="AppPage__image" @click="$emit('path', props.path)">
        </NuxtLink>
        <div class="AppPage__image-container">
          <div class="AppPage__container">
            <div class="AppPage__upper-container">
              <div class="AppPage__upper-buttons">
                  <button class="AppPage__button" :class="isLikeActive ? 'AppPage__button--like-active' : ''" @click="like()">
                    <font-awesome-icon :icon="['fas', 'heart']" />
                  </button>
                  <button class="AppPage__button" :class="isSaveActive ? 'AppPage__button--save-active' : ''" @click="save()">
                    <font-awesome-icon :icon="['fas', 'plus']" />
                  </button>
              </div>
            </div>
              <div class="AppPage__lower-container">
                <span class="AppPage__lower-buttons">
                  <div class="AppPage__author-info">
                    <NuxtLink :to="`/profile/${props.createdBy}`" class="AppPage__avatar">
                      <font-awesome-icon :icon="['fas', 'user']" />
                    </NuxtLink>
                    <div class="AppPage__name">test</div>
                  </div>
                </span>
              </div>
          </div>
        </div>

        <NuxtLink
          :to="{
            name: 'picture-id',
            params: { id: props.id}
          }"
          @click="test(props.id)"
        >{{ props.id }}</NuxtLink>
        {{ props.name }}
        <PictureModal 
          v-if="isModalActive" 
          :id="props.id"
          :data="data"
          :number="props.index"
          :relatedPictures="props.pictures"
          @close="isModalActive = false"
          @minus="siema"
          @plus="siema"
        />
        {{ props.index }}
    </div>
</template>

<script setup>
import { useUserStore } from '~/store/user';

const props = defineProps({
    id: Number,
    name: String,
    path: String,
    createdBy: Number,
    index: Number,
    pictures: Object,
    votes: Object,
});

import { usePictureStore } from '~/store/picture';

let isModalActive = ref(false);
const isLikeActive = ref(false);
const isSaveActive = ref(false);
const user = useUserStore().userProfile;
const isLoggedIn = useUserStore().isLoggedIn;
const api = useApi();
const data = ref([]);

onBeforeRouteLeave((to, from, next) => {
  console.log(to.value);
  if(to.name === 'picture-id') {
    openModal(to);
  } else {
    next();
  }
});

const siema = (data) => {
  console.log(data.id);
  test(data.id);
  window.history.pushState({}, null, `/picture/${data.id}`);
}

async function openModal(route) {
  console.log(route.path);
  window.history.pushState({}, null, route.path);
};

async function test(id) {
  if(isModalActive != true) {
    isModalActive.value = true;
    usePictureStore().$state.currentIndex = props.index;
    usePictureStore().$state.currentPicture = props.id;
    getLikes(id, user.id);
    getSavedPosts(user.id, id);
  }

  if(isModalActive = true) document.body.style.overflow = 'hidden';
  usePictureStore().$state.currentPictures = props.pictures;

  props.pictures.map((item) => {
    if (item.id == id) {
      data.value = item;
      console.log(data.value);
      return {
        data
      };
    }
  });
};

async function like() {
  try {
    const payload = {
      postId: props.id,
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
};

async function save() {
  try {
    const payload = {
      userId: user.id,
      postId: props.id,
    };
    
    if (!isSaveActive.value) {
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
};

async function getLikes(postId, userId) {
    const data = await api(`/api/vote?postId=${postId}&userId=${userId}`);
    console.log(data);
    if (data.voteType === 'voteUp') isLikeActive.value = true;
};

async function getSavedPosts(userId, postId) {
    const result = await api(`/api/savePost?userId=${userId}&postId=${postId}`);
    console.log(result);
    if (result === 'true') isSaveActive.value = true;
}

if (isLoggedIn) {
    getLikes(props.id, user.id);
    getSavedPosts(user.id, props.id);
}
</script>

<style lang="scss">
.AppPage {

  &__grid-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    overflow: hidden;
    width: 300px;
  }

  &__image {
    height: 300px;
    width: 300px;
    object-fit: cover;
    vertical-align: top;
  }

  &__image-container {
    height: 300px;
    width: 300px;
    position: absolute;
  }

  &__container {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    padding: 20px;
    position: absolute;
    opacity: 0;
    transition: all 0.1s ease-in-out;

    &:hover {
      opacity: 1;
      background-color: rgba(77,77,77,0.5);
    }
  }

  &__upper-container {
    display: grid;
    grid-template-columns: minmax(0, min-content) auto;
    position: relative;
  }

  &__upper-buttons {
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
    gap: 8px;
  }

  &__button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #666666;
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

  &__lower-container {
    display: grid;
    grid-template-columns: minmax(0, min-content) auto;
    margin-top: auto;
    position: relative;
  }

  &__lower-buttons {
    display: flex;
    justify-content: space-between;
  }

  &__author-info {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__avatar {
    background-color: #8c8c8c;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    width: 40px;
    height: 40px;
  }

  &__name {
    display: block;
    color: #d9d9d9;

    &:hover {
      color: white;
    }
  }
}
</style>