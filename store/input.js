export const state = () => ({
    //フォーム
    username: '',
    userEmail: '',
    userText: '',
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
};

export const actions = {};
