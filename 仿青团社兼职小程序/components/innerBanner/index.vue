<template>
    <view :class="'swiper-contain ' + className" v-if="list.length > 0">
        <swiper autoplay circular @change="currentHandle" class="swiper-box" :current="current" :indicatorDots="list.length > 1">
            <swiper-item class="swiper-item" v-for="(item, index) in list" :key="item.resourceId">
                <view
                    @tap="universalJump"
                    class="ptp_exposure"
                    :data-businessId="item.businessId"
                    :data-businessType="item.businessType"
                    :data-contentid="item.contentId"
                    :data-id="item.businessId"
                    :data-index="index"
                    :data-obj="item"
                    :data-ptpid="ptpId"
                    :data-sourceId="item.sourceId"
                >
                    <view class="relative">
                        <image lazyLoad class="slide-image" :src="item.image"></image>
                    </view>
                </view>
            </swiper-item>
        </swiper>
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
        list: {
            type: Array,
            default: () => []
        },
        ptpId: {
            type: String,
            default: ''
        },
        className: {
            type: String,
            default: ''
        }
    },
    methods: {
        universalJump: function (e) {},
        currentHandle: function (t) {}
    }
};
</script>
<style>
@import './index.css';
</style>
