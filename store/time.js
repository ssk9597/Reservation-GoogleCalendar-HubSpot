export const state = () => ({
    //時間の取得
    times: [
        { id: 0, time: '09:00', isEmpty: true },
        { id: 1, time: '09:30', isEmpty: false },
        { id: 2, time: '10:00', isEmpty: true },
        { id: 3, time: '10:30', isEmpty: true },
        { id: 4, time: '11:00', isEmpty: false },
        { id: 5, time: '11:30', isEmpty: true },
        { id: 6, time: '12:00', isEmpty: true },
        { id: 7, time: '12:30', isEmpty: true },
        { id: 8, time: '13:00', isEmpty: false },
        { id: 9, time: '13:30', isEmpty: true },
        { id: 10, time: '14:00', isEmpty: true },
        { id: 11, time: '14:30', isEmpty: false },
        { id: 12, time: '15:00', isEmpty: false },
        { id: 13, time: '15:30', isEmpty: true },
        { id: 14, time: '16:00', isEmpty: false },
        { id: 15, time: '16:30', isEmpty: true },
        { id: 16, time: '17:00', isEmpty: true },
        { id: 17, time: '17:30', isEmpty: false },
        { id: 18, time: '18:00', isEmpty: true },
    ],
    startTime: '',
    endTime: '',
});

export const mutations = {
    //時間の選択
    pickTime(state, time) {
        if (time.isEmpty) {
            state.startTime = time.time;

            if (state.startTime === '18:00') {
                state.endTime = '19:00';
            } else if (state.startTime === '17:30') {
                state.endTime = '18:30';
            } else {
                state.endTime = state.times[time.id + 2].time;
            }
        }
    },
};

export const actions = {};
