<template>
    <div class="Modal" @click="$emit('close')" @keydown.esc="$emit('close')">
        <div class="Modal__container" @click.stop="">
            <h2 class="Modal__title">Add picture</h2>
            <form @submit.prevent="submit()" enctype="multipart/form-data" class="Modal__form">
                <TextInput v-model="title" label="Title" type="text"/>
                <FileInput name="file" @uploaded-file="upload"/>
                <div 
                    v-for="(tag, index) in tags"
                    :key="tag"
                    class="Modal__tag"
                >
                    <span @click="removeTag(index)">x</span>
                    {{ tag }}
                </div>
                <TextInput v-model="tag" label="Tag" type="text" @keydown="addTag" @keydown.delete="removeLastTag"/>
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
const tag = ref('');
const title = ref('');
const tags = ref([]);
let url = ref('');

const api = useApi();

const upload = (data) => {
    url.value = URL.createObjectURL(data);
    file.value = data;
};

const addTag = (event) => {
    if (event.code == 'Comma' || event.code == 'Enter') {
        event.preventDefault();
        const val = event.target.value.trim();

        if (val.length > 0) {
            tags.value.push(val);
            tag.value = '';
        }
    }
};

const removeTag = (index) => {
    tags.value.splice(index, 1);
};

const removeLastTag = (event) => {
    if (event.target.value.length === 0) {
        removeTag(tags.length - 1);
    }
};

const submit = async () => {
    try {
        if (!file.value) console.log('brak pliku');

        const formData = new FormData();
        formData.append('title', title.value);
        formData.append('createdBy', '1');
        formData.append('picture', file.value);

        for (var i = 0; i < tags.value.length; i++) {
            formData.append('tags[]', tags.value[i]);
        }

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

    &__tag {
        height: 30px;
        float: left;
        margin-right: 10px;
        background-color: #eeeded;
        margin-top: 10px;
        line-height: 30px;
        padding: 0 5px;
        border-radius: 5px;
    }

    &__tag-input {
        width: 100%;
        border: 1px solid #eeeded;
        font-size: 0.9rem;
        height: 59px;
        box-sizing: border-box;
        padding: 0 10px;
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
