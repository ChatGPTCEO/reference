<template>
    <view @touchmove.stop.prevent="preventTouchMove" class="simpleModel" v-if="isShowClone">
        <view class="simpleBack"></view>
        <view class="simpleCont">
            <image lazyLoad :src="imageContent"></image>
            <view @tap="closeModel" class="iKnowit ptp_exposure" data-ptpid="638b-1d32-a06d-dd36">确定</view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {};
    },
    props: {
        isShow: {
            type: Boolean,
            default: false
        },
        imageContent: {
            type: String,
            default: ''
        }
    },
    methods: {
        preventTouchMove: function () {},
        closeModel: function () {
            this.setData({
                isShowClone: false
            });
        }
    },
    watch: {
        isShow: {
            handler: function (newVal, oldVal) {
                this.isShowClone = newVal;
            },

            immediate: true
        }
    }
};
</script>
<style>
@import './simpleModel.css';
</style>
