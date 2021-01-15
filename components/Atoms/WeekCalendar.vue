<template>
    <div class="table-wrapper">
        <!-- カレンダーヘッダ -->
        <div class="calendar-header">
            <div v-if="arrayNum !== 0">
                <div class="calendar-header-left" @click="setLastWeek">
                    <span class="header-arrow">
                        <fa icon="chevron-left" />
                    </span>
                    <p class="calendar-header-left-text">前週</p>
                </div>
            </div>
            <div v-else></div>
            <div v-if="arrayNum < arrayLength">
                <div class="calendar-header-right" @click="setNextWeek">
                    <p class="calendar-header-right-text">翌週</p>
                    <span class="header-arrow">
                        <fa icon="chevron-right" />
                    </span>
                </div>
            </div>
        </div>
        <!-- カレンダー -->
        <div class="table-header">
            <table class="table">
                <thead class="table-thead">
                    <tr class="table-tr">
                        <th class="table-th sticky"></th>
                        <th
                            class="table-th"
                            v-for="(weekday, index) in weekdays[arrayNum]"
                            :key="index"
                        >
                            {{ weekday.day }}
                        </th>
                    </tr>
                </thead>
                <tbody v-for="(weekday, index) in weekdays[arrayNum]" :key="index">
                    <tr class="table-tr" v-for="(time, index) in weekday.time" :key="index">
                        <th class="table-th sticky">
                            {{ time }}
                        </th>
                        <td class="table-td" @click="chooseTime(index)">
                            <fa :icon="trueDay ? ['far', 'circle'] : 'times'" />
                        </td>
                        <td class="table-td">
                            <fa :icon="falseDay ? ['far', 'circle'] : 'times'" />
                        </td>
                        <td class="table-td" @click="chooseTime(index)">
                            <fa :icon="trueDay ? ['far', 'circle'] : 'times'" />
                        </td>
                        <td class="table-td">
                            <fa :icon="falseDay ? ['far', 'circle'] : 'times'" />
                        </td>
                        <td class="table-td" @click="chooseTime(index)">
                            <fa :icon="trueDay ? ['far', 'circle'] : 'times'" />
                        </td>
                        <td class="table-td">
                            <fa :icon="falseDay ? ['far', 'circle'] : 'times'" />
                        </td>
                        <td class="table-td" @click="chooseTime(index)">
                            <fa :icon="trueDay ? ['far', 'circle'] : 'times'" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        times() {
            return this.$store.state.weekCalendar.times;
        },
        weekdays() {
            return this.$store.state.weekCalendar.weekdays;
        },
        arrayNum() {
            return this.$store.state.weekCalendar.arrayNum;
        },
        arrayLength() {
            return this.$store.state.weekCalendar.arrayLength;
        },
        trueDay() {
            return this.$store.state.weekCalendar.trueDay;
        },
        falseDay() {
            return this.$store.state.weekCalendar.falseDay;
        },
    },
    methods: {
        chooseTime(num) {
            console.log(num);
            this.$store.commit('weekCalendar/chooseTime', num, num2);
            this.$scrollTo('#staff');
        },
        setLastWeek() {
            this.$store.commit('weekCalendar/setLastWeek');
        },
        setNextWeek() {
            this.$store.commit('weekCalendar/setNextWeek');
        },
    },
    mounted() {
        this.$store.commit('weekCalendar/weekdays');
        console.log(this.$store.state.weekCalendar.weekdays);
        console.log(this.times);
    },
};
</script>

<style lang="scss" scoped>
//wrapper
.table-wrapper {
    max-width: 400px;
    width: 100%;
    margin: 0 auto;
    text-align: center;
}
//カレンダーヘッダー
.calendar-header {
    padding: 10px;
    height: 50px;
    background: #89535a;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-left {
        display: flex;
        align-items: center;
        cursor: pointer;
        &-text {
            margin-left: 6px;
        }
    }
    &-right {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        cursor: pointer;
        &-text {
            margin-right: 6px;
        }
    }
    & p {
        font-size: 0.875rem;
        font-weight: bold;
    }
}
//カレンダー
.table-header {
    border: 1px solid #ddd;
    border-right-width: 0;
    overflow-x: auto;
    & .table {
        width: 100%;
        text-align: center;
        &-tr {
            &:last-child {
                & th,
                & td {
                    border-bottom-width: 0;
                }
            }
        }
        &-th {
            min-width: 50px;
            height: 50px;
            font-size: 0.75rem;
            background-color: #efefef;
            border-bottom: 1px solid #ddd;
            border-right: 1px solid #ddd;
            font-weight: bold;
            vertical-align: middle;
            white-space: nowrap;
            &.sticky {
                position: sticky;
                left: 0;
            }
        }
        &-td {
            border-bottom: 1px solid #ddd;
            border-right: 1px solid #ddd;
            vertical-align: middle;
            white-space: nowrap;
        }
    }
}
</style>
