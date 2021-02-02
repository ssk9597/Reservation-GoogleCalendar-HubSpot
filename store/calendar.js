import moment from 'moment';

export const state = () => ({
    day: moment(),
    dayPicker: '',
    displayDate: moment().format('YYYY[年]M[月]'),
    currentDate: { date: '', yearMonth: '', month: '', day: '' },
    compareDate: { date: '', yearMonth: '', month: '', day: '' },
    startDate: '',
    endDate: '',
    calendars: [],
    weeks: ['日', '月', '火', '水', '木', '金', '土'],
});

export const mutations = {
    compareDate(state) {
        state.compareDate.date = moment().format('YYYY-MM-DD');
        state.compareDate.yearMonth = moment().format('YYYY-MM');
        state.compareDate.month = moment().format('M');
        state.compareDate.day = moment().format('D');
    },
    currentDate(state) {
        state.currentDate.date = moment().format('YYYY-MM-DD');
        state.currentDate.yearMonth = moment().format('YYYY-MM');
        state.currentDate.month = moment().format('M');
        state.currentDate.day = moment().format('D');
    },
    getStartDate(state) {
        let date = moment(state.day);
        date.startOf('month');
        const dayWeek = date.day();

        state.startDate = date.subtract(dayWeek, 'days');
    },
    getEndDate(state) {
        let date = moment(state.day);
        date.endOf('month');
        const dayWeek = date.day();

        state.endDate = date.add(6 - dayWeek, 'days');
    },
    getCalendar(state) {
        //初期化
        state.calendars = [];
        //その他のメソッドの値を使用
        const startDate = state.startDate;
        const endDate = state.endDate;
        //週の数を調べる
        const weekNum = Math.ceil(endDate.diff(startDate, 'days') / 7);

        let calendars = state.calendars;

        for (let i = 0; i < weekNum; i++) {
            let week = [];
            for (let v = 0; v < 7; v++) {
                week.push({
                    date: startDate.get('date'),
                    yearMonth: startDate.format('YYYY-MM'),
                    yearMonthDay: startDate.format('YYYY-MM-DD'),
                });
                startDate.add(1, 'days');
            }
            calendars.push(week);
        }
    },
    prevMonth(state) {
        state.day = moment(state.day).subtract(1, 'month');
        state.displayDate = state.day.format('YYYY[年]M[月]');
        state.compareDate.date = state.day.format('YYYY-MM-DD');
        state.compareDate.yearMonth = state.day.format('YYYY-MM');
        state.compareDate.month = state.day.format('M');
        state.compareDate.day = state.day.format('D');
    },
    nextMonth(state) {
        state.day = moment(state.day).add(1, 'month');
        state.displayDate = state.day.format('YYYY[年]M[月]');
        state.compareDate.date = state.day.format('YYYY-MM-DD');
        state.compareDate.yearMonth = state.day.format('YYYY-MM');
        state.compareDate.month = state.day.format('M');
        state.compareDate.day = state.day.format('D');
    },
    pickDay(state, day) {
        const date = ('00' + day.date).slice(-2);
        state.dayPicker = `${day.yearMonth}-${date}`;
        console.log(`${day.yearMonth}-${date}`);
    },
    prevSelect(state) {
        state.dayPicker = '';
        state.day = moment();
        state.displayDate = state.day.format('YYYY[年]M[月]');
    },
};

export const actions = {
    displayCalendar({ commit }) {
        commit('getStartDate');
        commit('getEndDate');
        commit('getCalendar');
    },
};
