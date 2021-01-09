export const state = () => ({
    //店名
    store: '',
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
    //フォーム
    username: '',
    userEmail: '',
    userText: '',
    //footer
    isVisible1: true,
    isVisible2: true,
    isVisible3: true,
});

export const mutations = {
    //setter
    username(state, username) {
        state.username = username;
    },
    userEmail(state, userEmail) {
        state.userEmail = userEmail;
    },
    userText(state, userText) {
        state.userText = userText;
    },
    //店名
    selectStore(state, payload) {
        state.store = payload;
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
    //従業員の選択
    selectStaff(state, payload) {
        state.employeeEmail = payload;
    },
    //footer
    visibilityChanged1(state) {
        state.isVisible1 = !state.isVisible1;
    },
    visibilityChanged2(state) {
        state.isVisible2 = !state.isVisible2;
    },
    visibilityChanged3(state) {
        state.isVisible3 = !state.isVisible3;
    },
};

export const actions = {};
