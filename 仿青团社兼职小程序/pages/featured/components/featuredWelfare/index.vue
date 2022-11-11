<template>
    <view class="featured-wrap">
        <scroll-view scrollX class="common-list">
            <view
                @tap="universalJump"
                class="common-list-item ptp_exposure"
                :data-benefitid="item.benefitId"
                :data-businessId="item.businessId"
                :data-businessType="item.businessType"
                :data-index="index"
                :data-jumpkey="item.jumpKey"
                data-ptpid="fda2-15fd-91e9-f840"
                :data-sourceid="item.sourceId"
                v-for="(item, index) in welfareTenBeansList"
                :key="item.title"
            >
                <view class="common-title ellipsis">{{ item.title }}</view>

                <view class="common-desc ellipsis">{{ item.subTitle }}</view>

                <image lazyLoad class="common-image" :src="item.image || item.bannerImages[0]"></image>

                <view class="getWelfare">我想做公益</view>
            </view>
        </scroll-view>
    </view>
</template>

<script>

export default {
    data() {
        return {};
    },
    props: {
        cardTitle: {
            type: String,
            default: ''
        },
        cardDes: {
            type: String,
            default: ''
        },
        cardImage: {
            type: String,
            default: ''
        },
        cardFontStyle: {
            type: String,
            default: ''
        },
        welfareTenBeansList: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        universalJump: function (t) {
            if (void 0 === t.currentTarget.dataset.jumpkey) {
                var a = t.currentTarget.dataset.benefitid;
                uni.navigateTo({
                    url: '/pages/activity/qtsBeanWelfare/index/index?benefitId=' + a
                });
            } else {
                var r = parseInt(t.currentTarget.dataset.index);
                e.universalJump(this.welfareTenBeansList[r]);
            }
        }
    }
};
</script>
<style>
@import './index.css';
</style>
