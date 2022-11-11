<template>
    <view @tap="routingHandle" class="qts-at ptp_exposure" data-ptpid="efd9-11a6-a519-a08f" v-if="isShowClone">
        <image lazyLoad src="https://qiniu-image.qtshe.com/201890911callback.png"></image>
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
            default: true
        }
    },
    onPageShow: function () {
        if (getCurrentPages().length > 1) {
            this.isShowClone = false;
        } else {
			this.isShowClone = true;
        }
    },
    methods: {
        routingHandle: function () {
            uni.switchTab({
                url: '/pages/index/index'
            });
        },
        isTabPage: function (e) {}
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
<style lang="scss" scoped>
	@import './assistTouch.scss';
</style>
