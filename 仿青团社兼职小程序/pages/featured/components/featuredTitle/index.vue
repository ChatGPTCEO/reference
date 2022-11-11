<template>
    <view class="title-wrap">
        <view class="main-title">{{ featuredTitle }}</view>
        <view @tap="goMore" class="title-button ptp_exposure" data-ptpid="a0ef-1b4e-becd-08fd" v-if="hasMore">更多</view>
    </view>
</template>

<script>
export default {
    data() {
        return {};
    },
    props: {
        featuredTitle: {
            type: String,
            default: ''
        },
        hasMore: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        goMore: function () {
            this.$emit('handlerMore');
        }
    }
};
</script>
<style>
@import './index.css';
</style>
