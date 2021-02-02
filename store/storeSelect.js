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
    //従業員のスケジュール
    employeeSchedules: [],
    //成形された従業員のスケジュール
    shapeEmployeeSchedules: [],
    //選択された店舗の従業員数
    storeEmployee: [],
    //カレンダーの日付を作る
    dateArray: [],
    //カレンダーの完成形
    dateEmptyArray: [],
});

export const mutations = {
    //店名
    selectStore(state, payload) {
        state.store = payload;
    },
    //MicroCMSの従業員を取り出す
    setEmployee(state, payload) {
        state.employees = payload;
    },
    //Googleカレンダーを取り出す
    setEmployeeSchedules(state, payload) {
        state.employeeSchedules = payload;
    },
    //Googleカレンダーを成形する
    shapeEmployeeSchedules(state) {
        state.employees.contents.forEach(employee => {
            if (state.store === employee.storeName.location) {
                state.storeEmployee.push(employee);

                state.employeeSchedules.forEach(schedule => {
                    // 開始時間
                    const start = schedule.start.dateTime;
                    const startDate = `${start.substr(0, 10)}`;
                    const startHour = `${start.substr(11, 2)}`;
                    const startMinute = `${start.substr(14, 2)}`;
                    //終了時間
                    const end = schedule.end.dateTime;
                    const endHour = `${end.substr(11, 2)}`;
                    const endMinute = `${end.substr(14, 2)}`;

                    const differenceHour = endHour - startHour;
                    const minutes = ['00', '30'];

                    if (endMinute - startMinute <= 0) {
                        if (endMinute === '30' && startMinute === '30') {
                            for (let i = 0; i <= differenceHour; i++) {
                                if (i !== differenceHour) {
                                    for (let v = 0; v < minutes.length; v++) {
                                        const time = `${Number(startHour) + Number(i)}:${
                                            minutes[v]
                                        }`;
                                        state.shapeEmployeeSchedules.push({
                                            id: employee.calendar_Id,
                                            time: time,
                                            day: startDate,
                                            isEmpty: false,
                                        });
                                    }
                                } else {
                                    const time = `${Number(startHour) + Number(i)}:${minutes[0]}`;
                                    state.shapeEmployeeSchedules.push({
                                        id: employee.calendar_Id,
                                        time: time,
                                        day: startDate,
                                        isEmpty: false,
                                    });
                                }
                            }
                        } else {
                            for (let i = 0; i < differenceHour; i++) {
                                for (let v = 0; v < minutes.length; v++) {
                                    const time = `${Number(startHour) + Number(i)}:${minutes[v]}`;
                                    state.shapeEmployeeSchedules.push({
                                        id: employee.calendar_Id,
                                        time: time,
                                        day: startDate,
                                        isEmpty: false,
                                    });
                                }
                            }
                        }
                    } else {
                        for (let i = 0; i <= differenceHour; i++) {
                            if (i !== differenceHour) {
                                for (let v = 0; v < minutes.length; v++) {
                                    const time = `${Number(startHour) + Number(i)}:${minutes[v]}`;
                                    state.shapeEmployeeSchedules.push({
                                        id: employee.calendar_Id,
                                        time: time,
                                        day: startDate,
                                        isEmpty: false,
                                    });
                                }
                            } else {
                                const time = `${Number(startHour) + Number(i)}:${minutes[0]}`;
                                state.shapeEmployeeSchedules.push({
                                    id: employee.calendar_Id,
                                    time: time,
                                    day: startDate,
                                    isEmpty: false,
                                });
                            }
                        }
                    }
                });
            }
        });
    },
    setCalendarDate(state) {
        const thisMonth = moment();
        const nextMonth = moment()
            .add(1, 'months')
            .endOf('month');
        const compareMonth = nextMonth.diff(thisMonth, 'days');
        for (let i = 0; i <= compareMonth; i++) {
            const num = moment()
                .add(i, 'days')
                .format('YYYY-MM-DD');
            state.dateArray.push(num);
        }
    },
    defaultDateEmptyArray(state) {
        let dayTime = [];
        state.dateArray.forEach(date => {
            for (let i = 0; i < state.times.length; i++) {
                dayTime[i] = {
                    id: [],
                    time: state.times[i],
                    day: date,
                    isEmpty: true,
                    emptyNum: state.storeEmployee.length,
                };
                state.dateEmptyArray.push(dayTime[i]);
            }
        });
    },
    completeDateEmptyArray(state) {
        const currentDate = moment().format('YYYY-MM-DD');
        const nonReserveTime = moment()
            .add(2, 'hours')
            .format('HH:mm');
        // console.log(state.shapeEmployeeSchedules);
        state.dateEmptyArray.forEach(date => {
            state.shapeEmployeeSchedules.forEach(schedule => {
                if (
                    schedule.day === date.day &&
                    schedule.time === date.time &&
                    date.id.indexOf(schedule.id) == -1
                ) {
                    // console.log(schedule.day);
                    // console.log(schedule.time);
                    // console.log(schedule.id);

                    date.id.push(schedule.id);
                    date.emptyNum--;

                    if (date.emptyNum === 0) {
                        date.isEmpty = false;
                    }
                }
                //2時間後まで予約できない
                if (date.day === currentDate && date.time <= nonReserveTime) {
                    date.isEmpty = false;
                }
            });
        });
        console.log(state.dateEmptyArray);
    },
};

export const actions = {
    async getEmployeeAction({ commit, state }) {
        const employees = await this.$axios.$get('https://meeting.microcms.io/api/v1/employee', {
            headers: {
                'X-API-KEY': process.env.API_KEY,
            },
        });
        commit('setEmployee', employees);

        let employeeSchedules = [];
        (async () => {
            await Promise.all(
                employees.contents.map(async employee => {
                    if (state.store === employee.storeName.location) {
                        await this.$axios
                            .$get(`http://localhost:5000/api/receive/${employee.calendar_Id}`)
                            .then(results => {
                                results.message.forEach(result => {
                                    employeeSchedules.push(result);
                                });
                            });
                    }
                })
            );
            commit('setEmployeeSchedules', employeeSchedules);
            commit('shapeEmployeeSchedules');
            commit('setCalendarDate');
            commit('defaultDateEmptyArray');
            commit('completeDateEmptyArray');
        })();
    },
};
