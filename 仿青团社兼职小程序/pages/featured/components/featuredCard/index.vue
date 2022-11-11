<template>
    <view
        @tap="jumpToDetail"
        class="cardBox ptp_exposure"
        :data-index="cardIndex"
        data-ptpid="e163-1f81-8ecb-a4dc"
        :style="'background: url(' + cardImage + ') no-repeat;background-size: 336rpx 200rpx;'"
    >
        <view class="cardTitle" :style="'color:' + cardFontStyle + ';'">{{ cardTitle }}</view>
        <view class="cardDes" :style="'color:' + cardFontStyle + ';'">{{ cardDes }}</view>
        <view class="cardButton" :style="'background:' + cardFontStyle + ';'">
            {{ cardIndex === 0 ? '立即瓜分' : '立即兑换' }}
            <image lazyLoad class="cardButton-image" src="https://qiniu-image.qtshe.com/featured/arrowRight.png"></image>
        </view>
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
        cardIndex: {
            type: Number,
            default: 0
        }
    },
    methods: {
        jumpToDetail: function () {
            if (1 == +this.cardIndex) {
                uni.navigateTo({
                    url: '/punch/stepRedemption/index/index'
                });
            } else {
                uni.navigateTo({
                    url: '/punch/earlyPlaycard/home/index?cardPunchId=14'
                });
            }
        }
    }
};
</script>
<style>
@import './index.css';
</style>
