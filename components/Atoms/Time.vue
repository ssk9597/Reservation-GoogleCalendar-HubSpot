<template>
    <div class="table-wrapper">
        <!-- タイムピッカーヘッダ -->
        <div class="calendar-header">
            <div class="calendar-header-left" @click="prevSelect()">
                <span class="header-arrow">
                    <fa icon="chevron-left" />
                </span>
                <p class="calendar-header-left-text">戻る</p>
            </div>
            <p class="calendar-header-middle">{{ date }}</p>
            <div class="calendar-header-right"></div>
        </div>
        <!-- カレンダー -->
        <div class="table-header">
            <table class="table">
                <thead class="table-thead">
                    <tr class="table-tr">
                        <th class="table-th sticky"></th>
                        <th
                            class="table-th"
                            v-for="(time, index) in chooseDateEmptyArray"
                            :key="index"
                        >
                            {{ time.time }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="table-tr">
                        <th class="table-th sticky">空き状況</th>
                        <td
                            class="table-td"
                            v-for="(time, index) in chooseDateEmptyArray"
                            :key="index"
                        >
                            <fa
                                :icon="time.isEmpty ? ['far', 'circle'] : 'times'"
                                @click="pickTime(time)"
                            />
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
        dayPicker() {
            return this.$store.state.calendar.dayPicker;
        },
        date() {
            return `${this.dayPicker.substr(0, 4)}年${this.dayPicker.substr(
                5,
                2
            )}月${this.dayPicker.substr(8, 2)}日`;
        },
        //storeSelect
        dateEmptyArray() {
            return this.$store.state.storeSelect.dateEmptyArray;
        },
        chooseDateEmptyArray() {
            const times = this.dateEmptyArray.filter((date) => {
                return date.day === this.dayPicker;
            });
            console.log(times);
            return times;
        },
    },
    methods: {
        prevSelect() {
            this.$store.commit('calendar/prevSelect');
            this.$store.commit('calendar/getStartDate');
            this.$store.commit('calendar/getEndDate');
            this.$store.commit('calendar/getCalendar');
            this.$store.commit('calendar/currentDate');
            this.$store.commit('calendar/compareDate');
            console.log(this.$store.state.calendar.currentDate);
            console.log(this.$store.state.calendar.compareDate);
            console.log(this.$store.state.calendar.displayDate);
        },
        pickTime(time) {
            this.$store.commit('time/pickTime', time);
            if (time.isEmpty) {
                this.$scrollTo('#staff');
            } else {
                alert('その時間は予約で埋まっています');
            }
        },
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
        width: 44px;
        &-text {
            margin-left: 6px;
            font-size: 0.875rem;
        }
    }
    &-right {
        width: 44px;
    }
    & p {
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