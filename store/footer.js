export const state = () => ({
    isVisible1: true,
    isVisible2: true,
    isVisible3: true,
});

export const mutations = {
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
