<template>
    <div class="area-container" id="area">
        <h2 class="heading">エリアをお選びください</h2>
        <div class="area-wrapper">
            <nuxt-link
                class="area-button"
                v-for="content in prefectures.contents"
                :key="content.id"
                v-scroll-to="content.anchorLink"
                to
            >
                {{ content.prefectures }}
            </nuxt-link>
        </div>
        <p class="area-caution">※お近くに店舗がない場合はオンラインをお選びください</p>
    </div>
</template>

<script>
export default {
    props: ['prefectures'],
};
</script>

<style lang="scss" scoped>
.area-wrapper {
    display: flex;
    flex-wrap: wrap;
}
.area-button {
    padding: 10px 20px;
    border: 2px solid #89535a;
    background-color: #fff;
    color: #89535a;
    font-weight: bold;
    line-height: 1;
    border-radius: 10px;
    margin-right: 20px;
    margin-bottom: 20px;
    cursor: pointer;
    display: block;
    text-decoration: none;

    &:hover {
        background-color: #89535a;
        color: #fff;
    }
}
.area-caution {
    font-size: 0.75rem;
    line-height: 1;
    padding-bottom: 70px;
}
</style>