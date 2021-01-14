export const state = () => ({
    //従業員のメールアドレス(GoogleカレンダーのID)
    employeeEmail: '',
});

export const mutations = {
    //従業員の選択
    selectStaff(state, payload) {
        state.employeeEmail = payload;
    },
};
