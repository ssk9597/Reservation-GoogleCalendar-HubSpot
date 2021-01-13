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
            return this.$store.state.store;
        },
    },
    methods: {
        selectStore(name) {
            this.$store.commit('selectStore', name);
            this.$scrollTo('#date');

            //対象店舗の従業員のカレンダーIDを取り出す。
            let calendarId = [];
            this.employees.contents.forEach((employee) => {
                if (this.store === employee.storeName.location) {
                    calendarId.push(employee.calendar_Id);
                    console.log(`http://localhost:5000/api/receive/${employee.calendar_Id}`);
                    this.$axios
                        .$get(`http://localhost:5000/api/receive/${employee.calendar_Id}`)
                        .then((res) => {
                            console.log(res);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            });
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