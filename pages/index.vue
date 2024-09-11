<template>
    <AppPage name="home">
        <div class="AppPage__grid">
            <GridCard
                v-for="(picture, index) in data?.pictures"
                :key="picture.id"
                :id="picture.id"
                :name="picture.title"
                :path="picture.filepath"
                :createdBy="picture.createdBy"
                :votes="picture.votes"
                :username="picture.username"
                :index="index"
                :pictures="data?.pictures"
            />
        </div>
    </AppPage>
</template>

<script setup>
import { useUserStore } from '~/store/user';
const userStore = useUserStore();

const api = useApi();

const { data } = await useAsyncData('pictures', async () => {
    const pictures = await api('/api/picture');
    return {
        pictures,
    };
});

if (userStore.isLoggedIn) {
    reloadNuxtApp();
}
</script>

<style lang="scss">
.AppPage {

    &__grid {
        display: grid;
        align-items: start;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 20px;
        columns: 4;
        column-gap: 20px;
        margin-bottom: 3rem;
    }
}

@media screen and (max-width: 650px) {
    .AppPage {

        &__grid {
            display: flex;
            flex-direction: column;
        }
    }
}

@media screen and (max-width: 1350px) {
  .AppPage {

    &__grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
}

@media screen and (max-width: 1020px) {
  .AppPage {
    
    &__grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
}
</style>