<template>
    <div class="store-container">
        <div v-for="content in storeNames.contents" :key="content.id">
            <div v-if="content.location === content.prefectures.prefectures">
                <h3 class="heading" :id="content.anchorID">{{ content.location }}</h3>
                <div class="store-wrapper">
                    <img :src="content.image.url" :alt="content.storeName" />
                    <p>{{ content.storeName }}</p>
                </div>
                <div class="btn-center">
                    <div class="btn" @click="selectStore(content.location)">選択</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['storeNames', 'employees'],
    computed: {
        store() {
            return this.$store.state.storeSelect.store;
        },
    },
    methods: {
        selectStore(name) {
            this.$store.commit('storeSelect/selectStore', name);
            this.$store.dispatch('storeSelect/getEmployeeAction');
            this.$scrollTo('#date');
        },
    },
};
</script>

<style lang="scss" scoped>
.store-wrapper {
    margin: 0 auto;
    max-width: 400px;
    width: 100%;
    display: block;
    line-height: 1;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
    background-color: #fff;
    margin-bottom: 24px;

    & img {
        width: 100%;
        height: 100%;
    }

    & p {
        padding: 15px 0 15px 30px;
        line-height: 1;
        font-weight: bold;
    }
}
</style>