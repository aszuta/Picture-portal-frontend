<template>
    <div class="TextInput">
        <label :for="name" :class="`TextInput__label TextInput__label--${name}`">{{ label }}</label>
        <input :id="name" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :class="`TextInput__field TextInput__field--${name}`" :type="type">
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
    flex-grow: inherit;

    &__label {
        display: inherit;
        margin: 0.5rem 0;

        &--search {
            visibility: none;
        }
    }

    &__field {
        padding: 0.4rem 1rem;
        min-height: 40px;
        width: 100%;
        border: 1px solid #bfbfbf;
        border-radius: 7px;
        transition: 0.3s;

        &--search {
            width: 100% ;
            border: none;
            padding: 0 1vh;
        }

        &:hover {
            border: 1px solid #666666;
            transition: 0.3s;
        }
    }
}
</style>