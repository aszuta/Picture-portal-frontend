<template>
    <div class="TextInput">
        <label :for="name" class="TextInput__label">{{ label }}</label>
        <input :id="name" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" class="TextInput__field" :type="type">
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
    }
});
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