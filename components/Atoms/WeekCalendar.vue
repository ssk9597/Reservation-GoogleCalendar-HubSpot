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
                    <tr class="table-tr" v-for="(weekday, index) in weekdays" :key="index">
                        <th class="table-th sticky"></th>
                        <th class="table-th" v-for="(day, index) in weekday[arrayNum]" :key="index">
                            {{ day }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="table-tr" v-for="(time, index) in times" :key="index">
                        <th class="table-th sticky">{{ time }}</th>
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
    name: 'VerticalTable',
    data() {
        return {
            today: '',
            year: '',
            month: '',
            day: '',
            arrayNum: 0,
            arrayLength: 0,
            trueDay: true,
            falseDay: false,
        };
    },
    computed: {
        weekdays() {
            //配列
            let weekday = [];

            //今日の日付
            let date = new Date();
            this.year = date.getFullYear();
            this.month = date.getMonth() + 1;
            this.day = date.getDate();

            //月の日数
            //今月
            const lastDay1 = new Date(this.year, this.month, 0).getDate();
            //来月
            const lastDay2 = new Date(this.year, this.month + 1, 0).getDate();
            //再来月
            const lastDay3 = this.day;

            //日数カウント
            let countDay1 = this.day;
            let countDay2 = 1;
            let countDay3 = 1;

            while (countDay1 + countDay2 + countDay3 <= lastDay1 + lastDay2 + lastDay3) {
                let weekData = [];

                for (let i = 0; i <= 6; i++) {
                    if (countDay1 <= lastDay1) {
                        weekData[i] = `${this.month}月${countDay1}日`;
                        countDay1++;
                    } else {
                        if (countDay2 <= lastDay2) {
                            weekData[i] = `${this.month + 1}月${countDay2}日`;
                            countDay2++;
                        } else {
                            if (countDay3 <= lastDay3) {
                                weekData[i] = `${this.month + 2}月${countDay3}日`;
                                countDay3++;
                            } else {
                                weekData[i] = '';
                            }
                        }
                    }
                }
                weekday.push(weekData);
            }
            //配列の長さを代入
            this.arrayLength = weekday.length - 1;

            return { weekday };
        },
        times() {
            return this.$store.state.times;
        },
    },
    methods: {
        chooseTime(num) {
            this.$store.commit('chooseTime', num);
            this.$scrollTo('#staff');
        },
        setLastWeek() {
            this.arrayNum--;
        },
        setNextWeek() {
            this.arrayNum++;
        },
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
