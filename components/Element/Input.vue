<template>
    <div class="input-container" v-observe-visibility="visibilityChanged3" id="input">
        <h2 class="heading">お客様の情報を入力してください</h2>
        <ValidationObserver v-slot="{ invalid }">
            <div class="input-wrapper">
                <div class="input-wrap">
                    <div class="input-block">
                        <div class="input-heading">
                            <h3 class="input-title">姓</h3>
                            <label class="require-label">必須</label>
                        </div>
                        <ValidationProvider rules="required" v-slot="{ errors }" name="これ">
                            <input class="input" type="text" v-model="firstName" />
                            <span class="danger">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                    <div class="input-block">
                        <div class="input-heading">
                            <h3 class="input-title">名</h3>
                            <label class="require-label">必須</label>
                        </div>
                        <ValidationProvider rules="required" v-slot="{ errors }" name="これ">
                            <input class="input" type="text" v-model="lastName" />
                            <span class="danger">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                </div>
            </div>

            <div class="input-wrapper">
                <div class="input-heading">
                    <h3 class="input-title">メールアドレス</h3>
                    <label class="require-label">必須</label>
                </div>
                <ValidationProvider rules="required|email" v-slot="{ errors }" name="これ">
                    <input class="input" type="email" v-model="userEmail" />
                    <span class="danger">{{ errors[0] }}</span>
                </ValidationProvider>
            </div>
            <div class="input-wrapper">
                <div class="input-heading">
                    <h3 class="input-title">お悩み内容</h3>
                    <label class="label">任意</label>
                </div>
                <textarea class="textarea" v-model="userText"></textarea>
            </div>
            <div class="btn-center">
                <button class="booking" @click="reserve" :disabled="invalid">予約する</button>
            </div>
        </ValidationObserver>
    </div>
</template>

<script>
export default {
    computed: {
        firstName: {
            get() {
                return this.$store.state.input.firstName;
            },
            set(value) {
                this.$store.commit('input/firstName', value);
            },
        },
        lastName: {
            get() {
                return this.$store.state.input.lastName;
            },
            set(value) {
                this.$store.commit('input/lastName', value);
            },
        },
        userEmail: {
            get() {
                return this.$store.state.input.userEmail;
            },
            set(value) {
                this.$store.commit('input/userEmail', value);
            },
        },
        userText: {
            get() {
                return this.$store.state.input.userText;
            },
            set(value) {
                this.$store.commit('input/userText', value);
            },
        },
        //POSTで送る内容
        calendarID() {
            return this.$store.state.staffSelect.employeeEmail;
        },
        summary() {
            return `【A社】${this.firstName} ${this.lastName}様のご予約を承りました`;
        },
        location() {
            return this.$store.state.storeSelect.store;
        },
        description() {
            return `ご予約者のお名前：${this.firstName} ${this.lastName}, メールアドレス：${this.userEmail}, お悩み内容：${this.userText}`;
        },
        start() {
            return `2021-01-24T${this.$store.state.weekCalendar.startTime}:00`;
        },
        end() {
            return `2021-01-24T${this.$store.state.weekCalendar.endTime}:00`;
        },
        attendees1() {
            return this.$store.state.input.userEmail;
        },
        attendees2() {
            return this.$store.state.staffSelect.employeeEmail;
        },
    },
    methods: {
        visibilityChanged3() {
            this.$store.commit('footer/visibilityChanged3');
        },
        async reserve() {
            await Promise.all([
                this.$axios.$post('http://localhost:5000/api/reserve', {
                    calendarID: this.calendarID,
                    summary: this.summary,
                    location: this.location,
                    description: this.description,
                    start: this.start,
                    end: this.end,
                    attendees1: this.attendees1,
                    attendees2: this.attendees2,
                }),
                this.$axios.$post('http://localhost:5000/api/hubspot', {
                    email: this.userEmail,
                    firstName: this.firstName,
                    lastName: this.lastName,
                }),
            ])
                .then(() => {
                    this.$router.push('/thanks');
                })
                .catch((err) => {
                    console.log(err);
                });
            // await this.$axios.$post('http://localhost:5000/api/reserve', {
            //     calendarID: this.calendarID,
            //     summary: this.summary,
            //     location: this.location,
            //     description: this.description,
            //     start: this.start,
            //     end: this.end,
            //     attendees1: this.attendees1,
            //     attendees2: this.attendees2,
            // });

            // await this.$axios.$post('http://localhost:5000/api/hubspot', {
            //     email: this.userEmail,
            //     firstName: this.firstName,
            //     lastName: this.lastName,
            // });
        },
    },
};
</script>

<style lang="scss" scoped>
.input-wrapper {
    max-width: 300px;
    width: 100%;
    padding-bottom: 24px;
    margin: 0 auto;
}
.input-wrap {
    display: flex;
}
.input-block {
    flex-basis: 48%;
    &:first-child {
        margin-right: 1%;
    }
    &:last-child {
        margin-left: 1%;
    }
}
.input-heading {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
}
.input-title {
    font-size: 1rem;
    font-weight: bold;
    margin-right: 10px;
}
.require-label {
    font-size: 0.875rem;
    color: #fff;
    background-color: #7e954e;
    border-radius: 10px;
    line-height: 20px;
    height: 20px;
    padding: 3px 16px;
    line-height: 1;
    font-weight: bold;
}
.label {
    font-size: 0.875rem;
    color: #111111;
    background-color: #dddddd;
    border-radius: 10px;
    line-height: 20px;
    height: 20px;
    padding: 3px 16px;
    line-height: 1;
}
.input {
    max-width: 300px;
    width: 100%;
    height: 50px;
    border-radius: 10px;
    border: 1px solid #dddddd;
    background-color: #eeeeee;
    color: #111;
    font-size: 1.25rem;
}
.textarea {
    max-width: 300px;
    width: 100%;
    height: 200px;
    resize: none;
    border-radius: 10px;
    border: 1px solid #dddddd;
    background-color: #eeeeee;
    color: #111;
}
.danger {
    color: #ff4136;
    font-weight: bold;
    font-size: 0.75rem;
}
.booking {
    display: inline-block;
    width: 250px;
    height: 50px;
    border-radius: 10px;
    background-color: #89535a;
    color: #fff;
    font-weight: bold;
    font-size: 1.25rem;
    border: none;
    cursor: pointer;
    &[disabled] {
        color: rgba(16, 16, 16, 0.3);
        background-color: rgba(239, 239, 239, 0.3);
        border-color: rgba(118, 118, 118, 0.3);
        cursor: not-allowed;
    }
}
</style>