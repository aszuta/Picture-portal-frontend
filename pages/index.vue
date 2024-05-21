<template>
    <div class="home_container">
        <form @submit.prevent="submit()" enctype="multipart/form-data">
            <input @change="handleFileChange" ref="file" accept="image/jpeg,image/png,image/jpg" type="file">
            <button type="submit">Send</button>
        </form>
        Lista obrazków {{ data.pictures.length }}

        <!-- <ul>
            <li
                v-for="picture in data.pictures"
                :key="picture.id"
            >
                {{ picture }}
            </li>
        </ul> -->

        <!-- <div class="modal" :class="[isModalActive ? 'active' : '']" @click="isModalActive = false">
            <button class="btn" @click="isModalActive = false">X</button>
            <img :src="`http://localhost:8000/${image}`" alt="" class="modal-item">
        </div> -->

        <div class="container_grid">
            <Modal
                v-for="picture in data?.pictures"
                :key="picture.id"
                :id="picture.id"
                :name="picture.title"
                :path="picture.filepath"
                @path="getPath"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
const api = useApi();

const file = ref<File | string> ('');
let isModalActive = ref<boolean>(false);
const image = ref<string>('');
const route = useRoute();

const handleFileChange = (fileData: Event) => {
    const fileInputData = fileData.target as HTMLInputElement;
    if (fileInputData.files && fileInputData.files?.length > 0) {
        file.value = fileInputData.files[0];
    }
}

function getPath(data: string) {
    openModal(data);
};

async function submit() {
    try {
        if(!file.value) console.log('nie dziala');

        console.log(file.value);
        const formData = new FormData();
        formData.append('title', 'test1');
        formData.append('createdBy', '1');
        formData.append('picture', file.value);
        await api('api/picture', {
            method: 'POST',
            body: formData,
        });
    } catch (error: any) {
        console.log(error);
    }
}

// async function openModal(id: number) {
//     isModalActive.value = !isModalActive.value;
//     result.value = id;
// }

function openModal(filepath: string) {
    isModalActive.value = !isModalActive.value;
    image.value = filepath;
    return image;
}

const { data } = await useAsyncData('pictures', async () => {
    const pictures = await api('/api/picture');

    return {
        pictures,
    };
});
</script>