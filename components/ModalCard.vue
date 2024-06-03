<template>
    <section class="pictures_section">
        <div class="comment_section">
            <h2 class="section_title">Related pictures</h2>
        </div>
        <div class="section_container">
            <div class="container_grid">
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

<script setup lang="ts">
const props = defineProps({
    relatedPictures: Object,
});
</script>