<template>
    <section class="PicturesSection">
        <h2 class="PicturesSection__title">Related pictures</h2>
        <div class="PicturesSection__container">
            <div class="PicturesSection__grid">
                <GridCard
                    v-for="picture in props.relatedPictures"
                    :key="picture.id"
                    :id="picture.id"
                    :name="picture.title"
                    :path="picture.filepath"
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

    &__title-container {

    }

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

@media screen and (min-width: 768px){
    .PicturesSection {

        &__container {
            max-width: 1320px;
            width: 100%;
            margin-inline: auto;
        }
    }
}
</style>