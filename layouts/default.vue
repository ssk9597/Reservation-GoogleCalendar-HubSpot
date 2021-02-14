<template>
    <div class="bg-wrapper">
        <Logo />
        <Nuxt />
        <div class="margin"></div>
        <Footer />
    </div>
</template>

<script>
import Logo from '@/components/Atoms/Logo';
import Footer from '@/components/Atoms/Footer';
export default {
    components: {
        Logo,
        Footer,
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
.margin {
    padding-bottom: 200px;
}
//共通
.heading {
    font-size: 1.25rem;
    color: #111111;
    font-weight: bold;
    margin-bottom: 18px;
    line-height: 1;
}
.btn-center {
    text-align: center;
}
.btn {
    display: inline-block;
    width: 250px;
    padding: 15px 0;
    border: 2px solid #89535a;
    border-radius: 25px;
    background-color: #fff;
    color: #89535a;
    font-size: 1.25rem;
    font-weight: bold;
    line-height: 1;
    text-align: center;
    margin-bottom: 60px;
    text-decoration: none;
    cursor: pointer;
    &:hover {
        background-color: #89535a;
        color: #fff;
    }
}
//共通
</style>
