<template>
    <div class="staff-container" v-observe-visibility="visibilityChanged2" id="staff">
        <h2 class="heading">スタッフをお選びください</h2>
        <div v-if="time !== ''">
            <div v-if="emptyStaff === ''">
                <div v-for="content in employees.contents" :key="content.id">
                    <div v-if="store === content.storeName.location">
                        <div class="staff-wrapper">
                            <img :src="content.image.url" :alt="content.name" />
                            <h3>{{ content.name }}</h3>
                            <p>{{ content.body }}</p>
                        </div>
                        <div class="btn-center">
                            <div class="btn" @click="selectStaff(content.calendar_Id)">
                                相談する
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <div v-for="(staff, index) in emptyStaff" :key="index">
                    <div v-for="content in employees.contents" :key="content.id">
                        <div
                            v-if="
                                store === content.storeName.location &&
                                staff !== content.calendar_Id
                            "
                        >
                            <div class="staff-wrapper">
                                <img :src="content.image.url" :alt="content.name" />
                                <h3>{{ content.name }}</h3>
                                <p>{{ content.body }}</p>
                            </div>
                            <div class="btn-center">
                                <div class="btn" @click="selectStaff(content.calendar_Id)">
                                    相談する
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['employees'],
    computed: {
        store() {
            return this.$store.state.storeSelect.store;
        },
        //calendar, time
        time() {
            return this.$store.state.time.time;
        },
        emptyStaff() {
            if (this.time.id.length > 0) {
                return this.time.id;
            } else {
                return '';
            }
        },
    },
    methods: {
        selectStaff(email) {
            this.$store.commit('staffSelect/selectStaff', email);
            this.$scrollTo('#input');
        },
        visibilityChanged2() {
            this.$store.commit('footer/visibilityChanged2');
        },
    },
};
</script>

<style lang="scss" scoped>
#staff {
    padding-top: 40px;
    margin-bottom: 40px;
}
.staff-wrapper {
    margin: 0 auto;
    text-align: center;
    max-width: 400px;
    width: 100%;
    display: block;
    line-height: 1;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
    background-color: #fff;
    margin-bottom: 24px;

    & img {
        padding: 20px 75px;
        max-width: 400px;
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

    & h3 {
        font-size: 1.25rem;
        font-weight: bold;
        padding-bottom: 16px;
    }

    & p {
        padding-bottom: 40px;
    }
}
</style>
