export const state = () => ({
    //時間の取得
    times: [
        '09:00',
        '09:30',
        '10:00',
        '10:30',
        '11:00',
        '11:30',
        '12:00',
        '12:30',
        '13:00',
        '13:30',
        '14:00',
        '14:30',
        '15:00',
        '15:30',
        '16:00',
        '16:30',
        '17:00',
        '17:30',
        '18:00',
    ],
    startTime: '',
    endTime: '',
    //カレンダー
    //日付を算出
    year: '',
    month: '',
    day: '',
    //カレンダーヘッダーなどで使用
    arrayNum: 0,
    arrayLength: 0,
    //予定の○×で使用
    trueDay: true,
    falseDay: false,
    //空の配列
    weekdays: [],
});

export const mutations = {
    //カレンダー
    weekdays(state) {
        //今日の日付
        const date = new Date();
        state.year = date.getFullYear();
        state.month = date.getMonth() + 1;
        state.day = date.getDate();

        //月の日数
        //今月
        const lastDay1 = new Date(state.year, state.month, 0).getDate();
        //来月
        const lastDay2 = new Date(state.year, state.month + 1, 0).getDate();

        //日数カウント
        let countDay1 = state.day;
        let countDay2 = 1;

        while (countDay1 + countDay2 <= lastDay1 + lastDay2) {
            let weekData = [];

            for (let i = 0; i <= 6; i++) {
                if (countDay1 <= lastDay1) {
                    weekData[i] = {
                        day: `${state.month}月${countDay1}日`,
                        time: state.times,
                    };
                    countDay1++;
                } else {
                    if (countDay2 <= lastDay2) {
                        weekData[i] = {
                            day: `${state.month + 1}月${countDay2}日`,
                            time: state.times,
                        };
                        countDay2++;
                    } else {
                        weekData[i] = '';
                    }
                }
            }
            state.weekdays.push(weekData);
        }
        //配列の長さを代入
        state.arrayLength = state.weekdays.length - 1;
    },
    setLastWeek(state) {
        state.arrayNum--;
    },
    setNextWeek(state) {
        state.arrayNum++;
    },
    //時間の選択
    chooseTime(state, payload) {
        state.startTime = state.times[payload];
        if (state.startTime === '18:00') {
            state.endTime = '19:00';
        } else if (state.startTime === '17:30') {
            state.endTime = '18:30';
        } else {
            state.endTime = state.times[payload + 2];
        }
    },
};

export const actions = {};
