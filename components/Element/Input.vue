<template>
    <div class="input-container" v-observe-visibility="visibilityChanged3" id="input">
        <h2 class="heading">お客様の情報を入力してください</h2>
        <ValidationObserver v-slot="{ invalid }">
            <div class="input-wrapper">
                <div class="input-heading">
                    <h3 class="input-title">お名前</h3>
                    <label class="require-label">必須</label>
                </div>
                <ValidationProvider rules="required" v-slot="{ errors }" name="お名前">
                    <input class="input" type="text" v-model="username" />
                    <span class="danger">{{ errors[0] }}</span>
                </ValidationProvider>
            </div>
            <div class="input-wrapper">
                <div class="input-heading">
                    <h3 class="input-title">メールアドレス</h3>
                    <label class="require-label">必須</label>
                </div>
                <ValidationProvider
                    rules="required|email"
                    v-slot="{ errors }"
                    name="メールアドレス"
                >
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
        username: {
            get() {
                return this.$store.state.username;
            },
            set(value) {
                this.$store.commit('username', value);
            },
        },
        userEmail: {
            get() {
                return this.$store.state.userEmail;
            },
            set(value) {
                this.$store.commit('userEmail', value);
            },
        },
        userText: {
            get() {
                return this.$store.state.userText;
            },
            set(value) {
                this.$store.commit('userText', value);
            },
        },
        summary() {
            return `【A社】${this.username}様のご予約を承りました`;
        },
        location() {
            return this.$store.state.store;
        },
        description() {
            return `ご予約者のお名前：${this.username}, メールアドレス：${this.userEmail}, お悩み内容：${this.userText}`;
        },
        start() {
            return `T${this.$store.state.startTime}:00`;
        },
        end() {
            return `T${this.$store.state.endTime}:00`;
        },
        attendees1() {
            return this.$store.state.userEmail;
        },
        attendees2() {
            return this.$store.state.employeeEmail;
        },
    },
    methods: {
        visibilityChanged3() {
            this.$store.commit('visibilityChanged3');
        },
        async reserve() {
            let data = new FormData();
            data.append('summary', this.summary);
            data.append('location', this.location);
            data.append('description', this.description);
            data.append('start', this.start);
            data.append('end', this.end);
            data.append('attendees1', this.attendees1);
            data.append('attendees2', this.attendees2);
            console.log(...data.entries());

            await this.$axios.$post('http://localhost:5000/api/reserve', data);
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
    &[disabled] {
        color: rgba(16, 16, 16, 0.3);
        background-color: rgba(239, 239, 239, 0.3);
        border-color: rgba(118, 118, 118, 0.3);
        cursor: not-allowed;
    }
}
</style>