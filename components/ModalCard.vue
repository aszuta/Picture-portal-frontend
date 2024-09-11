<template>
    <section class="PicturesSection">
        <h2 class="PicturesSection__title">Related pictures</h2>
        <div class="PicturesSection__container">
            <div class="PicturesSection__grid">
                <GridCard
                v-for="(picture, index) in props.relatedPictures"
                    :key="picture.id"
                    :id="picture.id"
                    :name="picture.title"
                    :path="picture.filepath"
                    :username="picture.username"
                    :pictures="props.relatedPictures"
                    :index="index"
                />
            </div>
        </div>
    </section>
</template>

<script setup>
const props = defineProps({
    relatedPictures: Object,
});
</script>

<style lang="scss">
.PicturesSection {
    padding-top: 50px;
    padding-inline: 20px;

    &__title {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
    }

    &__container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    &__grid {
        display: grid;
        align-items: start;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 20px;
        margin-bottom: 3rem;
    }
}

@media screen and (min-width: 768px) {
    .PicturesSection {

        &__container {
            max-width: 1320px;
            width: 100%;
            margin-inline: auto;
        }
    }
}

@media screen and (max-width: 674px) {
    .PicturesSection {

        &__container {
            width: 100%;
            margin-inline: auto;
        }

        &__grid {
            grid-template-columns: repeat(1, minmax(0, 1fr));
        }
    }
}

@media screen and (min-width: 675px) {
    .PicturesSection {
    
    &__grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
}

@media screen and (min-width: 1020px) {
    .PicturesSection {

    &__grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
}

@media screen and (min-width: 1320px) {
    .PicturesSection {

    &__grid {
        grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }
}
</style>