# COMPONENTS

## Atoms

layouts やコンポーネント内で使うファイルを格納

## Element

pages で使われるファイルを格納

### input.vue

computed: {
GSuite じゃないとエラーが出るっぽい
attendees1() {
return this.$store.state.input.userEmail;
    },
    attendees2() {
        return this.$store.state.staffSelect.employeeEmail;
},
},
methods: {
this.$axios.$post('https://calendarreservation.herokuapp.com/api/reserve', {
calendarID: this.calendarID,
summary: this.summary,
location: this.location,
description: this.description,
start: this.start,
end: this.end,
//GSuite じゃないとエラーが出るっぽい
// attendees1: this.attendees1,
// attendees2: this.attendees2,
})
}
