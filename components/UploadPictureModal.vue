<template>
    <div class="Modal" @click="$emit('close')" @keydown.esc="$emit('close')">
        <div class="Modal__container" @click.stop="">
            <h2 class="Modal__title">Add picture</h2>
            <form @submit.prevent="submit()" enctype="multipart/form-data" class="Modal__form">
                <TextInput v-model="title" label="Title" type="text"/>
                <FileInput name="file" @uploaded-file="upload"/>
                <button class="Modal__form-button" type="submit">Send</button>
            </form>
            <div class="Modal__picture-preview">
                <img :src="url" class="Modal__preview-img" />
            </div>
        </div>
    </div>
</template>

<script setup>
const file = ref('');
const title = ref('');
let url = ref('');

const api = useApi();

const upload = (data) => {
    url.value = URL.createObjectURL(data);
    file.value = data.value;
};

const submit = async () => {
    try {
        if (!file.value) console.log('brak pliku');

        const formData = new FormData();
        formData.append('title', title.value);
        formData.append('createdBy', '1');
        formData.append('picture', file.value);

        await api('/api/picture', {
            method: 'POST',
            body: formData
        });
    } catch (error) {
        console.log(error);
    }
};
</script>

<style lang="scss">
.Modal {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    display: block;
    padding: 0 20px;
    padding-left: 120px;
    padding-right: 120px;
    z-index: 100;
    opacity: 1;

    &__container {
        background-color: #fff;
        border-radius: 3px;
        margin: 50px auto;
        padding: 20px;
    }

    &__title {
        font-size: 18px;
        margin: 0.8rem 0;
    }

    &__form {
        display: flex;
        flex-direction: column;
    }

    &__form-button {
        font-size: 15px;
        border: solid 1px #d9d9d9;
        border-radius: 15px;
        padding: 10px 20px;
        margin: 0.8rem 0;

        &:hover {
            background-color: #eeeded;
            cursor: pointer;
        }
    }

    &__picture-preview {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 1.3rem 0;
        border: 2px solid #fff;
        transition: 0.3s;

        &:hover {
            border: 2px solid #e6ba37;
            transition: 0.3s;
        }
    }

    &__preview-img {
        width: 100%;
        height: auto;
    }
}
</style>
