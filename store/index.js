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
});

export const mutations = {
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
