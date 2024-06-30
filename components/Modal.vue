<template>
    <div class="modal_mask" @click="$emit('close')" @keydown.esc="$emit('close')">
        <div class="modal_container" @click.stop="">
            
            <template v-if="fileForm">
                <h2 class="modal_title">Add picture</h2>
                <form @submit.prevent="submit()" enctype="multipart/form-data" class="modal_form">
                    <Input v-model="title" type="text"/>
                    <Input name="file" @uploaded-file="upload" is-file/>
                    <button type="submit">Send</button>
                </form>
                <div class="preview">
                    <img :src="url" class="preview_img" />
                </div>
            </template>

            <template v-else>
                {{ props.id }}
                <PictureCard
                    :title="data?.title"
                    :path="data?.filepath"
                    :createdAt="data?.createdAt"
                />
                <Comment />
                <ModalCard 
                    :relatedPictures="relatedPictures"
                />
            </template>

        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    id: Number,
    fileForm: Boolean,
    picture: Object,
    relatedPictures: Object,
    data: Object
});

const file = ref('');
const title = ref('');
let url = ref('');

const api = useApi();
console.log(props.data);

const upload = (data) => {
    url.value = URL.createObjectURL(data.value);
    file.value = data.value;
};

function minus() {
    console.log('-');
};

function plus() {
    console.log('+');
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
