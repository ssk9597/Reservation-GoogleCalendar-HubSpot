<template>
    <div class="footer">
        <ol class="stepBar">
            <li @click="link1()" class="visited"><span>1</span><br />店舗選択</li>
            <li :class="{ visited: isVisible1 || isVisible2 || isVisible3 }" @click="link2()">
                <span>2</span><br />日時選択
            </li>
            <li :class="{ visited: isVisible2 || isVisible3 }" @click="link3()">
                <span>3</span><br />スタッフ選択
            </li>
            <li :class="{ visited: isVisible3 }" @click="link4()"><span>4</span><br />入力</li>
        </ol>
    </div>
</template>

<script>
export default {
    computed: {
        isVisible1() {
            return this.$store.state.isVisible1;
        },
        isVisible2() {
            return this.$store.state.isVisible2;
        },
        isVisible3() {
            return this.$store.state.isVisible3;
        },
    },
    methods: {
        link1() {
            this.$scrollTo('#area');
        },
        link2() {
            this.$scrollTo('#date');
        },
        link3() {
            this.$scrollTo('#staff');
        },
        link4() {
            this.$scrollTo('#input');
        },
    },
};
</script>

<style lang="scss" scoped>
.footer {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 100px;
    width: 100%;
    background: #fff;
}
.stepBar {
    display: flex;
    max-width: 600px;
    position: relative;
    text-align: center;
    margin: 15px auto;
}
.stepBar li {
    display: block;
    font-size: 14px;
    font-weight: bold;
    list-style: none;
    position: relative;
    flex-basis: 25%;
}
.stepBar li:after {
    background: #89535a;
    opacity: 0.33;
    content: '';
    width: calc(100% - 40px);
    height: 4px;
    position: absolute;
    left: calc(-50% + 20px);
    top: 20px;
}
.stepBar li:first-child:after {
    display: none;
}
.stepBar li span {
    background: #89535a;
    opacity: 0.33;
    color: #ffffff;
    display: inline-block;
    height: 40px;
    margin-bottom: 5px;
    line-height: 40px;
    width: 40px;
    border-radius: 50%;
}
.stepBar .visited:after {
    opacity: 1;
}
.stepBar .visited span {
    opacity: 1;
}
</style>
