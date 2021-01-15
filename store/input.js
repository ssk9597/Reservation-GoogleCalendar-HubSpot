export const state = () => ({
    //フォーム
    firstName: '',
    lastName: '',
    userEmail: '',
    userText: '',
});

export const mutations = {
    //setter
    firstName(state, firstName) {
        state.firstName = firstName;
    },
    lastName(state, lastName) {
        state.lastName = lastName;
    },
    userEmail(state, userEmail) {
        state.userEmail = userEmail;
    },
    userText(state, userText) {
        state.userText = userText;
    },
};
