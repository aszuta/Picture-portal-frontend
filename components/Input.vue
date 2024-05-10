<template>
    <div class="input">
        <label for="name" class="form-label">{{ props.label }}</label>
        <input class="form-input" :type="props.type">
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    label: String,
    type: String,
});
</script>