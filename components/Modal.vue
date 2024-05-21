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

        <!-- <NuxtLink
          :to="{
            name: 'picture-id',
            params: { id: props.id}
          }"
        >{{ props.id }}</NuxtLink> -->
        <!-- {{ props.name }} -->

        <!-- <div :class="[isModalActive ? 'modal' : '']" @click="isModalActive = false">
            <button class="btn" @click="isModalActive = false">X</button>
            <img :src="`http://localhost:8000/${dupa}`" alt="" class="modal-item">
        </div> -->
        
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    id: undefined,
    name: undefined,
    path: undefined,
});

// let isModalActive = ref<boolean>(false);
const activeModal = ref<string>('');
const router = useRouter();

// function openModal(path: string) {
//     isModalActive.value = !isModalActive.value;
//     dupa.value = path;
//     router.replace({ path: `/picture/${props.id}` });
//     return dupa;
// }

onBeforeRouteLeave((to, from, next) => {
  if(to.name === 'picture-id') {
    openModal(to);
  } else {
    next();
  }
});

function openModal(route: any) {
  activeModal.value = route.params.id;
  console.log(activeModal);
  window.history.pushState({}, null, route.path);
}

// function openModal(filepath: string) {
//     isModalActive.value = !isModalActive.value;
//     image.value = filepath;
//     return image;
// }
</script>