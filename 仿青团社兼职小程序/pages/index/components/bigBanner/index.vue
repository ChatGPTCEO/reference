<template>
    <view class="big-banner-box" v-if="resourseFrom.length > 0">
        <swiper :autoplay="true" :circular="true" class="big-banner" duration="300" :indicatorDots="resourseFrom.length > 1">
            <swiper-item v-for="(item, index) in resourseFrom" :key="item.contentId">
                <image
                    lazyLoad
                    @tap="_universalJump"
                    class="ptp_exposure big-banner-image"
                    :data-businessId="item.businessId"
                    :data-businessType="item.businessType"
                    :data-contentid="item.contentId"
                    :data-index="index"
                    data-ptpid="bigBanner"
                    :data-remark="item.title"
                    :data-sourceid="item.sourceId"
                    :data-title="item.title"
                    :src="item.image"
                    v-if="item.image"
                ></image>
            </swiper-item>
        </swiper>
        <view class="swiper-dot" v-if="resourseFrom.length">
            <view :class="'swiper-square ' + (current === index ? 'active' : '')" v-for="(item, index) in resourseFrom.length" :key="index"></view>
        </view>
    </view>
</template>

<script>

export default {
    data() {
        return {
            current: ''
        };
    },
    props: {
        resourseFrom: {
            type: Array,
            default: () => ({
                type: Array,
                value: []
            })
        },
        indicatorDots: {
            type: Object,
            default: () => ({
                type: Boolean,
                value: true
            })
        }
    },
    methods: {
        _universalJump: function (r) {}
    }
};
</script>
<style lang="scss" scoped>
	@import './index.scss';
</style>
