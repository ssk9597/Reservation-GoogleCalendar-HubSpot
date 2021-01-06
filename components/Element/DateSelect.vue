<template>
    <div v-observe-visibility="visibilityChanged1" id="date">
        <h2 class="heading">ご希望の日時をお選びください</h2>
        <WeekCalendar />
    </div>
</template>

<script>
import WeekCalendar from '@/components/Atoms/WeekCalendar';
export default {
    components: {
        WeekCalendar,
    },
    computed: {
        store() {
            return this.$store.state.store;
        },
    },
    methods: {
        visibilityChanged1() {
            this.$store.commit('visibilityChanged1');
        },
    },
};
</script>

<style lang="scss" scoped>
#date {
    padding-top: 40px;
    padding-bottom: 100px;
}
</style>
