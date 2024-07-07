<template>
    <div class="input">

        <template v-if="!isFile">
            <label :for="name" class="form_label">{{ label }}</label>
            <input :id="name" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" class="form_input" :type="type">
        </template>

        <template v-else-if="isFile">
            <label :for="name" class="form_label">{{ label }}</label>
            <input :id="name" @change="handleFileChange" ref="file" accept="image/jpeg,image/png,image/jpg" class="form_input" type="file">
        </template>

        <template v-else-if="isComment">
            <label :for="name" class="form_label">{{ label }}</label>
            <input :id="name" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" class="form_input" :type="type">
        </template>

    </div>
</template>

<script setup>
defineProps({
    name: String,
    label: String,
    type: String,
    modelValue: {
        type: String,
        default: '',
    },
    isFile: Boolean,
    isComment: Boolean
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