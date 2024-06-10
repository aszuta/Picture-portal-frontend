<template>
    <div class="input">
        <label :for="name" class="form_label">{{ label }}</label>
        <input :id="name" :value="modelValue" @input="$emit('update:modelValue', ($event.target as any).value)" class="form_input" :type="type">
    </div>
</template>

<script setup lang="ts">
defineProps({
    name: String,
    label: String,
    type: String,
    modelValue: {
        type: String,
        default: '',
    },
});
</script>