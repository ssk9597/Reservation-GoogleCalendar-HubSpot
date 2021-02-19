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
                    //開始時間
                    const start = schedule.start.dateTime;
                    const startDate = `${start.substr(0, 10)}`;
                    const startHour = `${start.substr(11, 2)}`;
                    const startMinute = `${start.substr(14, 2)}`;
                    //終了時間
                    const end = schedule.end.dateTime;
                    const endHour = `${end.substr(11, 2)}`;
                    const endMinute = `${end.substr(14, 2)}`;
                    //for文
                    const differenceHour = endHour - startHour;
                    const minutes = ['00', '30'];

                    //条件分岐
                    //①開始時間が30分超
                    if (startMinute > 30) {
                        // ①-①終了時間が30分超
                        if (endMinute > 30) {
                            for (let i = 0; i <= differenceHour; i++) {
                                for (let v of minutes) {
                                    const time = `${Number(startHour) + Number(i)}:${v}`;
                                    state.shapeEmployeeSchedules.push({
                                        id: schedule.organizer.email,
                                        time: time,
                                        day: startDate,
                                    });
                                }
                            }
                        } else {
                            // ①-②終了時間が30分以下
                            for (let i = 0; i < differenceHour; i++) {
                                for (let v of minutes) {
                                    const time = `${Number(startHour) + Number(i)}:${v}`;
                                    state.shapeEmployeeSchedules.push({
                                        id: schedule.organizer.email,
                                        time: time,
                                        day: startDate,
                                    });
                                }
                                //終了時間が0のときは値を追加しない
                                if (endMinute !== '00') {
                                    const time = `${Number(endHour)}:${minutes[0]}`;
                                    state.shapeEmployeeSchedules.push({
                                        id: schedule.organizer.email,
                                        time: time,
                                        day: startDate,
                                    });
                                }
                            }
                        }
                    } else {
                        //②開始時間が30分以下
                        // ②-①終了時間が30分超
                        if (endMinute > 30) {
                            //30分前の値を追加
                            const time = `${Number(startHour) - 1}:${minutes[1]}`;
                            state.shapeEmployeeSchedules.push({
                                id: schedule.organizer.email,
                                time: time,
                                day: startDate,
                            });
                            for (let i = 0; i <= differenceHour; i++) {
                                for (let v of minutes) {
                                    const time = `${Number(startHour) + Number(i)}:${v}`;
                                    state.shapeEmployeeSchedules.push({
                                        id: schedule.organizer.email,
                                        time: time,
                                        day: startDate,
                                    });
                                }
                            }
                        } else {
                            //30分前の値を追加
                            const time = `${Number(startHour) - 1}:${minutes[1]}`;
                            state.shapeEmployeeSchedules.push({
                                id: schedule.organizer.email,
                                time: time,
                                day: startDate,
                            });
                            for (let i = 0; i < differenceHour; i++) {
                                for (let v of minutes) {
                                    const time = `${Number(startHour) + Number(i)}:${v}`;
                                    state.shapeEmployeeSchedules.push({
                                        id: schedule.organizer.email,
                                        time: time,
                                        day: startDate,
                                    });
                                }
                            }
                        }
                    }
                });
            }
        });
        //連想配列の重複を削除する
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

        state.dateEmptyArray.forEach(date => {
            if (date.day === currentDate && date.time <= nonReserveTime) {
                date.emptyNum = 0;
                date.isEmpty = false;
            }
            state.shapeEmployeeSchedules.forEach(schedule => {
                if (
                    schedule.day === date.day &&
                    schedule.time === date.time &&
                    date.id.indexOf(schedule.id) == -1
                ) {
                    date.id.push(schedule.id);
                    date.emptyNum--;
                    if (date.emptyNum === 0) {
                        date.isEmpty = false;
                    }
                }
            });
        });
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
                            .$get(
                                `https://reserve-hubspot-googlecalendar.netlify.app/api/receive/${employee.calendar_Id}`
                            )
                            .then(results => {
                                results.message.forEach(result => {
                                    employeeSchedules.push(result);
                                });
                            })
                            .catch(err => {
                                console.log(err);
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
