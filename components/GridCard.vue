<template>
  <div class="grid_row" >
        <NuxtLink :to="`/picture/${props.id}`">
          <img :src="`http://localhost:8000/${props.path}`" alt="" class="image_container" @click="$emit('path', props.path)">
        </NuxtLink>
        <div class="image_nakladka">
          <div class="nakladka_ramka">
            <div class="grid1">
              <div class="przyciski_gorne">
                  <button class="like">
                    <font-awesome-icon :icon="['fas', 'heart']" />
                  </button>
                  <button class="save">
                    <font-awesome-icon :icon="['fas', 'plus']" />
                  </button>
              </div>
            </div>
              <div class="grid2">
                <span class="przyciski_dolne">
                  <div class="autor">
                    <NuxtLink class="avatar">
                      <font-awesome-icon :icon="['fas', 'user']" />
                    </NuxtLink>
                    <div class="name">test</div>
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
        <Modal 
          v-if="isModalActive" 
          :id="props.id"
          :data="data"
          :relatedPictures="props.pictures"
          @close="isModalActive = false"
        />
    </div>
</template>

<script setup>
const props = defineProps({
    id: undefined,
    name: undefined,
    path: undefined,
    pictures: Object
});

import { usePictureStore } from '~/store/picture';

let isModalActive = ref(false);

const data = ref([]);

onBeforeRouteLeave((to, from, next) => {
  if(to.name === 'picture-id') {
    openModal(to);
  } else {
    next();
  }
});

async function openModal(route) {
  console.log(route);
  window.history.pushState({}, null, route.path);
};

async function test(id) {
  isModalActive.value = true;
  console.log(id);

  props.pictures.map((item) => {
    if (item.id == id) {
      data.value = item;
      console.log(data);
      return {
        data: item
      };
    }
  });
  usePictureStore().$state.currentPicture = id;
};
</script>