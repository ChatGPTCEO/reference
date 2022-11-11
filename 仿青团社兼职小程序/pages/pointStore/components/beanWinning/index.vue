<template>
    <view v-if="showClone">
        <view @touchmove.stop.prevent="nomove" class="bean-winning">
            <view @tap="close" class="close ptp_exposure" data-ptpid="8805-19d2-b8bb-35f9"></view>
            <view class="title">恭喜你10豆夺宝中奖</view>
            <view class="text">开奖日期：{{ info.winTime }}</view>
            <view class="text">奖品：{{ info.goodsName }}</view>
            <view @tap="gotoDetail" class="btn ptp_exposure" :data-id="info.robActivityId" data-ptpid="0f21-1245-9e3a-e92b">立即领奖</view>
            <view class="tip">请于开奖后7日内领奖，过期视为放弃中奖机会</view>
        </view>
        <view @touchmove.stop.prevent="nomove" class="mask"></view>
        <view
            :animation="item.ani"
            class="dot"
            :style="'background: ' + item.color + ';top: ' + item.top + ';left: ' + item.left + ';transform:rotate(' + item.deg + ')'"
            v-for="(item, index) in list"
            :key="index"
        ></view>
    </view>
</template>

<script>
var app = getApp();
export default {
    data() {
        return {
            color: ['#FED50E', '#FF8534', '#FF8AB1'],
            list: [],
            number: 90,
            page: 0,
            showClone: false
        };
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        info: {
            type: Object,
            default: () => ({})
        }
    },
    methods: {
        init: function () {
			this.list = [];
			this.page = 0;
			
            this.animation();
        },
        animation: function () {},
        gotoDetail: function (t) {},
        close: function () {
			this.showClone = false;
        },
        nomove: function () {
            return false;
        }
    },
    watch: {
        show: {
            handler: function (t) {
                // this.showClone = this.deepClone(this.show);
                // if (t) {
                //     this.init();
                // }
            },

            immediate: true
        }
    }
};
</script>
<style lang="scss" scoped>
	@import './index.scss';
</style>
