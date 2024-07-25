<template>
    <div class="Layout">
        <Nav />
        <slot />
    </div>
</template>

<style lang="scss">
.Layout {
    width: 100%;
    min-height: 100vh;
    background-color: #fffcfa;
}
</style>