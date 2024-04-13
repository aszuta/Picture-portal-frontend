<template>
    <div>
        Lista obrazków {{ data.pictures.length }}

        <ul>
            <li
                v-for="picture in data.pictures"
                :key="picture.id"
            >
                {{ picture }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
const api = useApi();

const { data } = await useAsyncData('pictures', async () => {
  const pictures = await api('/api/picture');

  return {
    pictures,
  };
});
</script>