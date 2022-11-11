<template>
    <view class="paging">
        <slot></slot>
        <view class="loading" v-if="isLoading">
            <view class="flexcenter">
                <image lazyLoad src="https://qiniu-image.qtshe.com/qtsloading.gif"></image>
                <view class="loadtips">加载中</view>
            </view>
        </view>
        <view class="is-end" v-if="isEnd">我是有底线的哦～</view>
    </view>
</template>

<script>

export default {
    data() {
        return {};
    },
    props: {
        isEnd: {
            type: Boolean,
            default: false
        },
        isLoading: {
            type: Boolean,
            default: false
        }
    }
};
</script>
<style>
@import './index.css';
</style>
