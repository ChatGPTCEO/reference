<template>
    <view>
        <view class="winning-modal" v-if="show">
            <view class="title">10豆夺宝消息通知</view>
            <view class="text">由于夺宝人次不足，本期不开奖，你夺宝消耗的青豆，将返还到你的账号中，请注意查收哦！</view>
            <view class="text block">开奖日期：{{ info.winTime }}</view>
            <view @tap="close" class="btn ptp_exposure" :data-id="info.robActivityId" data-ptpid="21eb-1067-8e83-e7b1">我知道了</view>
        </view>
        <view @touchmove.stop.prevent="nomove" class="mask" v-if="show"></view>
    </view>
</template>

<script>
export default {
    data() {
        return {};
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
        nomove: function () {
            return false;
        },
        close: function (e) {
            this.$emit('close', {
                detail: e.currentTarget.dataset.id
            });
        }
    }
};
</script>
<style lang="scss" scoped>
	@import './index.scss';
</style>
