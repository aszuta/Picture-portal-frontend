<template>
    <dialog class="Modal" @click="$emit('close')" @keydown.esc="$emit('close')">
        <div class="Modal__container" @click.stop="">
            <h2 class="Modal__title">Add picture</h2>
            <form @submit.prevent="submit()" enctype="multipart/form-data" class="Modal__form">
                <TextInput v-model="title" label="Title" type="text"/>
                <div class="Modal__drop-zone" v-if="!file">
                    <font-awesome-icon :icon="['fas', 'upload']" class="Modal__form-icon"/>
                    <FileInput name="file" label="Kliknij lub przeciągnij obrazek tutaj" @uploaded-file="upload"/>
                </div>
                <div class="Modal__tags">
                    <div v-for="(tag, index) in tags" :key="index" class="Modal__tag-items">
                        <span class="Modal__tag-xmark" @click="removeTag(index)">
                            <font-awesome-icon :icon="['fas', 'xmark']" />
                        </span>
                        {{ tag }}
                    </div>
                </div>
                <TextInput v-model="tag" label="Tag" type="text" @keydown="addTag" @keydown.delete="removeLastTag"/>
                <div class="Modal__picture-preview" v-if="file">
                    <img :src="url" class="Modal__preview-img" />
                </div>
                <div class="Modal__actions">
                    <button class="Modal__form-button" v-if="file" type="reset" @click="removeFile">Reset</button>
                    <button class="Modal__form-button" type="submit">Send</button>
                </div>
            </form>
            <div class="Modal__close-button" @click="$emit('close')" @keydown.esc="$emit('close')" >
                <font-awesome-icon :icon="['fas', 'xmark']" />
            </div>
        </div>
    </dialog>
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

const removeFile = () => {
    title.value = '';
    file.value = '';
    tags.value = '';
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

    &__tags {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        padding-top: 20px;
    }

    &__tag-items {
        height: 30px;
        float: left;
        margin-right: 10px;
        background-color: #eeeded;
        margin-top: 10px;
        line-height: 30px;
        padding: 0 5px;
        border-radius: 5px;
    }

    &__tag-xmark {
        padding-left: 5px;
        padding-right: 5px;

        &:hover {
            color: #818181;
            cursor: pointer;
        }
    }

    &__tag-input {
        width: 100%;
        border: 1px solid #eeeded;
        font-size: 0.9rem;
        height: 59px;
        box-sizing: border-box;
        padding: 0 10px;
    }

    &__drop-zone {
        height: 150px;
        width: 100%;
        margin: 0.3rem 0;
        background: #f5f3f3;
        border: 2px solid white;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: relative;
        transition: 0.3s;
  
        &:hover {
            border: 2px solid #e6ba37;
            transition: 0.3s;
        }
    }

    &__form-icon {
        font-size: 2rem;
        margin-bottom: 1.1rem;
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

    &__actions {
        display: inherit;
        justify-content: space-between;
    }

    &__preview-img {
        width: 100%;
        height: auto;
    }

    &__close-button {
        position: absolute;
        font-size: 1.6rem;
        top: 0.8rem;
        right: 0.8rem;
        color: #fff;
        transition: 0.3s;
        cursor: pointer;
    
        &:hover {
            color: #414040;
            transition: 0.3s;
        }
    }
}

@media screen and (max-width: 650px) {
    .Modal {
        padding: 0;
        padding-left: 0;
        padding-right: 0;
        z-index: 6;

        &__container {
            width: 100%;
            height: 100%;
            margin: 0;
            z-index: 6;
        }

        &__close-button {
            color: #414040;
            top: 1rem;
            right: 1rem;
        }
    }
}
</style>
