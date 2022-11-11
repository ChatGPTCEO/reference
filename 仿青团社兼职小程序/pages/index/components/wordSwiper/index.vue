<template>
    <view class="top-swiper-box">
        <image lazyLoad class="logo" src="https://qiniu-image.qtshe.com/newHomePage/tuan.png"></image>
        <swiper autoplay circular disableScroll vertical class="swiper-text-scroll preventIndexDown" interval="2500">
            <swiper-item v-for="(item, index) in list" :key="item.title">
                <view class="swiper-info-box">
                    <view class="title ellipsis">{{ item.title }}</view>
                    <view class="sub-title ellipsis" v-if="item.subTitle">{{ item.subTitle }}</view>
                </view>
            </swiper-item>
        </swiper>
        <view class="cantMove"></view>
    </view>
</template>

<script>
export default {
    data() {
        return {};
    },
    props: {
        list: {
            type: Array,
            default: () => []
        }
    },
    methods: {}
};
</script>
<style lang="scss" scoped>
	@import './index.scss';
</style>
