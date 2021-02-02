<template>
    <div class="table-wrapper">
        <!-- カレンダーヘッダ -->
        <div class="calendar-header">
            <div
                v-if="currentDate.yearMonth !== compareDate.yearMonth"
                class="calendar-header-left"
                @click="prevMonth"
            >
                <span class="header-arrow">
                    <fa icon="chevron-left" />
                </span>
                <p class="calendar-header-left-text">先月</p>
            </div>
            <div class="calendar-header-left empty" v-else></div>
            <p class="calendar-header-middle">{{ displayDate }}</p>
            <div
                v-if="Number(currentDate.month) + 1 > Number(compareDate.month)"
                class="calendar-header-right"
                @click="nextMonth"
            >
                <p class="calendar-header-right-text">翌月</p>
                <span class="header-arrow">
                    <fa icon="chevron-right" />
                </span>
            </div>
            <div class="calendar-header-right empty" v-else></div>
        </div>
        <div class="table-header">
            <table class="table">
                <thead class="table-thead">
                    <tr class="table-tr">
                        <th class="table-th" v-for="(dayWeek, index) in dayWeeks" :key="index">
                            {{ dayWeek }}
                        </th>
                    </tr>
                </thead>
                <tbody class="table-tbody">
                    <tr class="table-tr" v-for="(week, index) in calendars" :key="index">
                        <td
                            class="table-td"
                            v-for="(day, index) in week"
                            :key="index"
                            :class="[
                                { outside: compareDate.yearMonth !== day.yearMonth },
                                {
                                    today:
                                        currentDate.yearMonth == day.yearMonth &&
                                        currentDate.day == day.date,
                                },
                                {
                                    notClick:
                                        (currentDate.yearMonth == day.yearMonth &&
                                            currentDate.day > day.date) ||
                                        !emptyDate(day),
                                },
                            ]"
                            @click="pickDay(day)"
                        >
                            {{ day.date }}
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
        calendars() {
            return this.$store.state.calendar.calendars;
        },
        dayWeeks() {
            return this.$store.state.calendar.weeks;
        },
        displayDate() {
            return this.$store.state.calendar.displayDate;
        },
        currentDate() {
            return this.$store.state.calendar.currentDate;
        },
        compareDate() {
            return this.$store.state.calendar.compareDate;
        },
        //storeSelect
        dateEmptyArray() {
            return this.$store.state.storeSelect.dateEmptyArray;
        },
    },
    methods: {
        prevMonth() {
            this.$store.commit('calendar/prevMonth');
            this.$store.dispatch('calendar/displayCalendar');
        },
        nextMonth() {
            this.$store.commit('calendar/nextMonth');
            this.$store.dispatch('calendar/displayCalendar');
        },
        pickDay(day) {
            this.$store.commit('calendar/pickDay', day);
        },
        emptyDate(day) {
            const date = this.dateEmptyArray.filter((date) => {
                return date.day === day.yearMonthDay;
            });
            return date.some((day) => {
                return day.isEmpty === true;
            });
        },
    },
    mounted() {
        this.$store.commit('calendar/getStartDate');
        this.$store.commit('calendar/getEndDate');
        this.$store.commit('calendar/getCalendar');
        this.$store.commit('calendar/currentDate');
        this.$store.commit('calendar/compareDate');
    },
};
</script>

<style lang="scss" scoped>
//wrapper
.table-wrapper {
    padding: 0 30px;
    max-width: 400px;
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
        &.empty {
            width: 44px;
        }
        &-text {
            margin-left: 6px;
            font-size: 0.875rem;
        }
    }
    &-right {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        cursor: pointer;
        &.empty {
            width: 44px;
        }
        &-text {
            margin-right: 6px;
            font-size: 0.875rem;
        }
    }
    & p {
        font-weight: bold;
    }
}
//カレンダー
.table-header {
    border: 1px solid #ddd;
    border-right-width: 0;

    & .table {
        width: 100%;
        text-align: center;
        &-tr {
            display: flex;
            &:last-child {
                & th,
                & td {
                    border-bottom-width: 0;
                }
            }
        }
        &-th {
            flex: 1;
            height: 40px;
            font-size: 0.75rem;
            background-color: #efefef;
            border-bottom: 1px solid #ddd;
            border-right: 1px solid #ddd;
            font-weight: bold;
            line-height: 40px;
        }
        &-td {
            flex: 1;
            height: 40px;
            font-size: 0.75rem;
            border-bottom: 1px solid #ddd;
            border-right: 1px solid #ddd;
            font-weight: bold;
            line-height: 40px;
            cursor: pointer;
        }
        &-thead {
            & th {
                &:first-child {
                    color: #ff4136;
                }
                &:last-child {
                    color: #0074d9;
                }
            }
        }
    }
}
.outside {
    background-color: #ddd;
    color: rgba(0, 1, 17, 0.2);
}
.today {
    color: #89535a;
}
.notClick {
    color: rgba(0, 1, 17, 0.05);
    pointer-events: none;
}
</style>