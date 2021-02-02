export const state = () => ({
    time: '',
    startTime: '',
    endTime: '',
});

export const mutations = {
    //時間の選択
    pickTime(state, time) {
        if (time.isEmpty) {
            //divideStaff
            state.time = time;
            //startTime
            state.startTime = time.time;
            //endTime
            const hour = state.startTime.substr(0, 2);
            const minute = state.startTime.substr(2, 4);
            state.endTime = `${Number(hour) + Number(1)}${minute}`;
        }
    },
};

export const actions = {};
