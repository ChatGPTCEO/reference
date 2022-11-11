<template>
    <view class="swiper-container" v-if="resourseFrom.length > 0">
        <swiper autoplay circular @change="currentHandle" class="swiper-box swiperMargin" :current="current" :indicatorDots="false">
            <swiper-item class="swiper-items" v-for="(item, index) in resourseFrom" :key="item.contentId">
                <view
                    @tap="_universalJump"
                    class="ptp_exposure"
                    :data-businessId="item.businessId"
                    :data-businessType="item.businessType"
                    :data-contentid="item.contentId"
                    :data-id="item.businessId"
                    :data-index="index"
                    :data-obj="item"
                    data-ptpid="dfj3-fk3j-2kfj-038f"
                    :data-sourceid="item.sourceId"
                >
                    <image lazyLoad class="slide-image" :src="item.image"></image>
                </view>
            </swiper-item>
        </swiper>
        <view class="swiper-dot" v-if="resourseFrom.length > 1">
            <view :class="'swiper-square ' + (current === index ? 'active' : '')" v-for="(item, index) in resourseFrom" :key="index"></view>
        </view>
    </view>
</template>

<script>

export default {
    data() {
        return {
            current: 0
        };
    },
    props: {
        resourseFrom: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        _universalJump: function (e) {
            var t = e.currentTarget.dataset.obj;
            r.universalJump(t);
        },
        currentHandle: function (r) {
            var e = r.detail.current;
            ('autoplay' !== r.detail.source && 'touch' !== r.detail.source) ||
                this.setData({
                    current: e
                });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
