<template>
    <div class="modal_mask" @click="$emit('close')" @keydown.esc="$emit('close')">
        <div class="modal_container" @click.stop="">
            
            <template v-if="fileForm">
                <h2 class="modal_title">Add picture</h2>
                <form @submit.prevent="submit()" enctype="multipart/form-data" class="modal_form">
                    <Input v-model="title" label="Title" type="text"/>
                    <Input name="file" @uploaded-file="upload" is-file/>
                    <button class="form_button" type="submit">Send</button>
                </form>
                <div class="preview">
                    <img :src="url" class="preview_img" />
                </div>
            </template>

            <template v-else>
                <div class="modal_previous">
                    <NuxtLink :to="{
                            name: 'picture-id',
                            params: { id: props.id}
                        }" class="previous_button" @click="minus(props.number)">
                        <font-awesome-icon :icon="['fas', 'angle-left']" />
                    </NuxtLink>
                </div>
                <div class="modal_content">
                    {{ props.number }}
                    <PictureCard
                        :title="data.title"
                        :path="data.filepath"
                        :createdAt="data.createdAt"
                    />
                    <Comment />
                    <ModalCard 
                        :relatedPictures="relatedPictures"
                    />
                </div>
                <div class="modal_next">
                    <NuxtLink :to="{
                            name: 'picture-id',
                            params: { id: props.id}
                        }" class="next_button" @click="plus(props.number)">
                        <font-awesome-icon :icon="['fas', 'angle-right']" />
                    </NuxtLink>
                </div>
            </template>

        </div>
    </div>
</template>

<script setup>
import { usePictureStore } from '~/store/picture';

const props = defineProps({
    id: Number,
    fileForm: Boolean,
    picture: Object,
    relatedPictures: Object,
    data: Object,
    number: {
        type: Number,
        default: 0
    }
});

const file = ref('');
const title = ref('');
let url = ref('');

const api = useApi();

const emit = defineEmits(['minus', 'plus']);

const upload = (data) => {
    url.value = URL.createObjectURL(data);
    file.value = data.value;
};

async function minus(param) {
    console.log(param);
    const result = await usePictureStore().minus();
    emit('minus', result);
};

async function plus() {
    const result = await usePictureStore().plus();
    emit('plus', result);
} ;

const submit = async () => {
    try {
        if (!file.value) console.log('brak pliku');
        console.log(file);

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
