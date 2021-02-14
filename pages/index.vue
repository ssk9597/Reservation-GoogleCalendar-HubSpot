<template>
    <div class="container">
        <!-- エリアソート -->
        <AreaSort :prefectures="prefectures" />
        <!-- 店舗選択 -->
        <StoreSelect :storeNames="storeNames" :employees="employees" />
        <!-- 日付選択 -->
        <DateSelect />
        <!-- スタッフ選択 -->
        <StaffSelect :employees="employees" />
        <!-- お客様情報入力 -->
        <Input />
    </div>
</template>

<script>
import AreaSort from '@/components/Element/AreaSort';
import StoreSelect from '@/components/Element/StoreSelect';
import DateSelect from '@/components/Element/DateSelect';
import StaffSelect from '@/components/Element/StaffSelect';
import Input from '@/components/Element/Input';

export default {
    async asyncData({ $axios }) {
        const prefectures = await $axios.$get('https://meeting.microcms.io/api/v1/prefectures', {
            headers: {
                'X-API-KEY': process.env.API_KEY,
            },
        });
        const storeNames = await $axios.$get('https://meeting.microcms.io/api/v1/storename', {
            headers: {
                'X-API-KEY': process.env.API_KEY,
            },
        });
        const employees = await $axios.$get('https://meeting.microcms.io/api/v1/employee', {
            headers: {
                'X-API-KEY': process.env.API_KEY,
            },
        });

        return {
            prefectures,
            storeNames,
            employees,
        };
    },
    components: {
        AreaSort,
        StoreSelect,
        DateSelect,
        StaffSelect,
        Input,
    },
    data() {
        return {
            prefectures: '',
            storeNames: '',
            employees: '',
        };
    },
};
</script>

<style lang="scss" scoped>
.container {
    padding: 0 30px;
    margin: 0 auto;
}
</style>
