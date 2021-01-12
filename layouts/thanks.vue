<template>
    <div class="bg-wrapper">
        <Logo />
        <Nuxt />
    </div>
</template>

<script>
import Logo from '@/components/Atoms/Logo';
export default {
    components: {
        Logo,
    },
};
</script>

<style lang="scss">
@import 'css-wipe';
html {
    font-family: 'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo,
        sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
}
* {
    line-height: 2;
}
.bg-wrapper {
    max-width: 600px;
    width: 100%;
    margin: 0 auto;
    background-color: #f7f5ee;
}
</style>
