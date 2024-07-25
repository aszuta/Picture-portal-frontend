<template>
    <div class="FileInput">
        <label :for="name" class="FileInput__label">{{ label }}</label>
        <input :id="name" @change="handleFileChange" ref="file" accept="image/jpeg,image/png,image/jpg" class="FileInput__field" type="file">
    </div>
</template>

<script setup>
defineProps({
    name: String,
    label: String,
    type: String,
});

const emit = defineEmits(['uploaded-file']);

let file = ref('');

const handleFileChange = (fileData) => {
    const fileInputData = fileData.target;
    if (fileInputData.files && fileInputData.files?.length > 0) {
        file = fileInputData.files[0];
        emit('uploaded-file', file);
    }
};
</script>

<style lang="scss">
.TextInput {
    display: inherit;
    flex-direction: inherit;

    &__label {
        display: inherit;
        margin: 0.5rem 0;
    }

    &__field {
        padding: 0.4rem 1rem;
        min-height: 40px;
        width: 100%;
        border: 1px solid #bfbfbf;
        border-radius: 7px;
        transition: 0.3s;

        &:hover {
            border: 1px solid #666666;
            transition: 0.3s;
        }
    }
}
</style>