export const state = () => ({
    //店名
    store: '',
    //MicroCMS-Employee
    employees: [],
});

export const mutations = {
    //店名
    selectStore(state, payload) {
        state.store = payload;
    },
    setEmployee(state, payload) {
        state.employees = payload;

        //選択された店舗の従業員数
        let storeEmployee = [];

        state.employees.contents.forEach(employee => {
            if (state.store === employee.storeName.location) {
                //選択された店舗の従業員数
                storeEmployee.push(employee);

                this.$axios
                    .$get(`http://localhost:5000/api/receive/${employee.calendar_Id}`)
                    .then(res => {
                        console.log(res);
                        res.message.forEach(data => {
                            console.log(data);
                            console.log('担当者の名前 : ' + employee.name);
                            console.log('担当者のカレンダーID : ' + employee.calendar_Id);

                            //開始時間
                            const start = data.start.dateTime;
                            const startDate = `${start.substr(0, 4)}年${start.substr(
                                5,
                                2
                            )}月${start.substr(8, 2)}日`;
                            const startTime = `${start.substr(11, 2)}:${start.substr(14, 2)}`;
                            //終了時間
                            const end = data.end.dateTime;
                            const endDate = `${end.substr(0, 4)}年${end.substr(5, 2)}月${end.substr(
                                8,
                                2
                            )}日`;
                            const endTime = `${end.substr(11, 2)}:${end.substr(14, 2)}`;

                            console.log(`開始時間 : ${startDate} ${startTime}`);
                            console.log(`終了時間 : ${endDate} ${endTime}`);
                            console.log('--------------------');
                        });
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        });

        console.log('選択された店舗の従業員数は' + storeEmployee.length + '名です');
    },
};

export const actions = {
    async getEmployeeAction({ commit }) {
        const employees = await this.$axios.$get('https://meeting.microcms.io/api/v1/employee', {
            headers: {
                'X-API-KEY': process.env.API_KEY,
            },
        });
        commit('setEmployee', employees);
    },
};
