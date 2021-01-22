<template>
    <div v-observe-visibility="visibilityChanged1" id="date">
        <h2 class="heading">ご希望の日時をお選びください</h2>
        <div v-if="dayPicker === ''">
            <Calendar />
        </div>
        <div v-else>
            <Time />
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
</style>
