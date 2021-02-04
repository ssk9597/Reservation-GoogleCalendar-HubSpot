<template>
    <div class="container">
        <h2 class="main-heading">ご予約ありがとうございます</h2>
        <h3 class="sub-heading">{{ start }}</h3>
        <p class="text">にご予約を承りました</p>

        <h3 class="sub-heading">当日担当するスタッフ</h3>
        <div v-for="content in employees.contents" :key="content.id">
            <div v-if="store === content.storeName.location">
                <div v-if="employeeEmail === content.calendar_Id">
                    <div class="staff-wrapper">
                        <img :src="content.image.url" :alt="content.name" />
                        <h3>{{ content.name }}</h3>
                        <p v-if="store === 'オンライン相談'">
                            メールにて当日のご案内をお送りいたします。
                        </p>
                        <p v-else>ご来店お待ちしております。</p>
                        <p class="margin-text">当日はよろしくお願いいたします。</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    layout: 'thanks',
    async asyncData({ $axios }) {
        const employees = await $axios.$get('https://meeting.microcms.io/api/v1/employee', {
            headers: {
                'X-API-KEY': process.env.API_KEY,
            },
        });
        return {
            employees,
        };
    },
    data() {
        return {
            employees: '',
        };
    },
    computed: {
        start() {
            const dateTime = `${this.$store.state.calendar.dayPicker}${this.$store.state.time.startTime}`;
            const date = `${dateTime.substr(0, 4)}年${dateTime.substr(5, 2)}月${dateTime.substr(
                8,
                2
            )}日`;
            const time = `${dateTime.substr(10, 5)}`;
            return `${date}  ${time}`;
        },
        store() {
            return this.$store.state.storeSelect.store;
        },
        employeeEmail() {
            return this.$store.state.staffSelect.employeeEmail;
        },
    },
};
</script>

<style lang="scss" scoped>
.container {
    height: 100vh;
}
.main-heading {
    font-size: 1.5rem;
    color: #111111;
    font-weight: bold;
    margin-bottom: 18px;
    text-align: center;
}
.sub-heading {
    font-size: 1.25rem;
    color: #111111;
    font-weight: bold;
    margin-bottom: 4px;
    text-align: center;
}

.text {
    color: #111111;
    margin-bottom: 40px;
    text-align: center;
}
.staff-wrapper {
    margin: 24px auto;
    text-align: center;
    max-width: 400px;
    width: 100%;
    display: block;
    line-height: 1;
    background-color: #fff;
    & img {
        max-width: 150px;
        padding: 20px 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
    & h3 {
        font-size: 1.25rem;
        font-weight: bold;
        padding-bottom: 16px;
    }
    & .margin-text {
        padding-bottom: 40px;
    }
}
</style>