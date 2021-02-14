<template>
    <div v-observe-visibility="visibilityChanged1" id="date">
        <h2 class="heading">ご希望の日時をお選びください</h2>
        <div v-if="dateEmptyArray != ''">
            <div v-if="dayPicker === ''">
                <Calendar />
            </div>
            <div v-else>
                <Time />
            </div>
        </div>
        <div v-else>
            <div v-if="store !== ''" class="loading-container">
                <div class="loading-block">
                    <div class="loading">
                        <div class="circle"></div>
                        <div class="circle"></div>
                        <div class="circle"></div>
                        <div class="circle"></div>
                        <div class="circle"></div>
                        <div class="circle"></div>
                        <div class="circle"></div>
                        <div class="circle"></div>
                        <div class="circle"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Calendar from '@/components/Atoms/Calendar';
import Time from '@/components/Atoms/Time';
export default {
    components: {
        Calendar,
        Time,
    },
    computed: {
        dayPicker() {
            return this.$store.state.calendar.dayPicker;
        },
        //storeSelect
        dateEmptyArray() {
            return this.$store.state.storeSelect.dateEmptyArray;
        },
        store() {
            return this.$store.state.storeSelect.store;
        },
    },
    methods: {
        visibilityChanged1() {
            this.$store.commit('footer/visibilityChanged1');
        },
    },
};
</script>

<style lang="scss" scoped>
#date {
    padding-top: 40px;
    padding-bottom: 60px;
}
.loading-container {
    max-width: 400px;
    margin: auto;
    display: flex;
    padding: 0 20px;
    justify-content: space-around;
}
.loading-block {
    width: 250px;
    height: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.loading {
    width: 45px;
    display: flex;
    flex-wrap: wrap;
}
.circle {
    width: 15px;
    height: 15px;
    background-color: #89535a;
    margin: auto;
    animation-name: loading;
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
    &:nth-child(1) {
        animation-delay: 0.2s;
    }
    &:nth-child(2) {
        animation-delay: 0.3s;
    }
    &:nth-child(3) {
        animation-delay: 0.4s;
    }
    &:nth-child(4) {
        animation-delay: 0.1s;
    }
    &:nth-child(5) {
        animation-delay: 0.2s;
    }
    &:nth-child(6) {
        animation-delay: 0.3s;
    }
    &:nth-child(7) {
        animation-delay: 0s;
    }
    &:nth-child(8) {
        animation-delay: 0.1s;
    }
    &:nth-child(9) {
        animation-delay: 0.2s;
    }
}
@keyframes loading {
    20% {
        transform: scale(0.1);
    }
    40% {
        transform: scale(1);
    }
}
</style>
