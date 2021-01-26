import moment from 'moment';

export const state = () => ({
    //店名
    store: '',
    //MicroCMS-Employee
    employees: [],
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
        // //従業員の予定
        let schedules = [];

        state.employees.contents.forEach(employee => {
            if (state.store === employee.storeName.location) {
                //選択された店舗の従業員数
                storeEmployee.push(employee);
                this.$axios
                    .$get(`http://localhost:5000/api/receive/${employee.calendar_Id}`)
                    .then(res => {
                        res.message.forEach(data => {
                            //開始時間
                            const start = data.start.dateTime;
                            const startDate = `${start.substr(0, 10)}`;
                            const startTime = `${start.substr(11, 5)}`;
                            //終了時間
                            const end = data.end.dateTime;
                            const endDate = `${end.substr(0, 10)}`;
                            const endTime = `${end.substr(11, 5)}`;

                            schedules.push({
                                id: employee.calendar_Id,
                                startTime: startTime,
                                day: startDate,
                                isEmpty: false,
                            });
                        });

                        console.log(schedules);

                        //日付を算出
                        const thisMonth = moment();
                        const nextMonth = moment()
                            .add(1, 'months')
                            .endOf('month');
                        const compareMonth = nextMonth.diff(thisMonth, 'days');
                        let dateArray = [];
                        for (let i = 0; i <= compareMonth; i++) {
                            const num = moment()
                                .add(i, 'days')
                                .format('YYYY-MM-DD');
                            dateArray.push(num);
                        }

                        //配列を作成
                        let dateEmptyArray = [];
                        let dayTime = [];
                        let employeeCalendars = [];
                        storeEmployee.forEach(employee => {
                            employeeCalendars.push(employee.calendar_Id);
                        });
                        // console.log(employeeCalendars);

                        dateArray.forEach(date => {
                            for (let i = 0; i < state.times.length; i++) {
                                dayTime[i] = {
                                    id: employeeCalendars,
                                    time: state.times[i],
                                    day: date,
                                    isEmpty: true,
                                    emptyNum: storeEmployee.length,
                                };
                                dateEmptyArray.push(dayTime[i]);
                            }
                        });
                        console.log(dateEmptyArray);

                        dateEmptyArray.forEach(date => {
                            schedules.forEach(schedule => {
                                if (schedule.day === date.day && schedule.startTime === date.time) {
                                    const num = date.id.lastIndexOf(schedule.id);
                                    date.id.splice(num, 1);
                                    date.emptyNum--;
                                }
                                if (date.emptyNum === 0) {
                                    date.isEmpty = false;
                                    // console.log(date);
                                }
                            });
                        });
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        });
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
