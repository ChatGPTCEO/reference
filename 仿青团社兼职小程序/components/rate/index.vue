<template>
    <view class="rate-box">
        <block v-for="(item, index) in limit" :key="index">
            <image class="rate-icon" mode="scaleToFill" src="https://qiniu-image.qtshe.com/20201203_rate_full.png" v-if="index <= rate - 1"></image>

            <image class="rate-icon" mode="scaleToFill" src="https://qiniu-image.qtshe.com/20201203_rate_half.png" v-else-if="index > rate - 1 && index < rate"></image>

            <image class="rate-icon" mode="scaleToFill" src="https://qiniu-image.qtshe.com/20201203_rate_blank.png" v-else></image>
        </block>
    </view>
</template>

<script>
export default {
    data() {
        return {};
    },
    props: {
        rate: {
            type: Number,
            default: 0
        },
        limit: {
            type: Number,
            default: 5
        }
    }
};
</script>
<style>
@import './index.css';
</style>
