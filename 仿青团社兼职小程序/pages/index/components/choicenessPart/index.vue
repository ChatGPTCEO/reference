<template>
    <view class="choiceness-part-container">
        <view
            @tap="_universalJump"
            class="item ptp_exposure"
            :data-businessId="item.businessId"
            :data-businessType="item.businessType"
            :data-contentid="item.contentId"
            :data-index="index"
            data-ptpid="channels"
            :data-remark="item.title"
            :data-sourceid="item.sourceId"
            :data-title="item.title"
            v-if="index <= 4"
            v-for="(item, index) in list"
            :key="item.title"
        >
            <view class="formBox">
                <view>
                    <image lazyLoad class="isSignTag" src="https://qiniu-image.qtshe.com/2526/index/isSignTagNew.png" v-if="item.title === '每日签到' && !isSignClone"></image>
                    <image lazyLoad class="img choiceness-item skeletons-circle ptp_exposure" :src="item.image"></image>
                </view>
            </view>

            <view class="title ellipsis choiceness-item skeletons-rect">{{ item.title }}</view>

            <view
                @tap="loginHandle"
                class="login-button new-user"
                :data-businessId="item.businessId"
                :data-businessType="item.businessType"
                :data-contentid="item.contentId"
                :data-index="index"
                data-ptpid="channels"
                :data-remark="item.title"
                :data-sourceid="item.sourceId"
                :data-title="item.title"
                v-if="!isLogin && fliter.fliter(item)"
            ></view>
        </view>
    </view>
</template>
<script module="fliter" lang="wxs">
var fliter = (function(item) {
    return (item && item.param && item.param.indexOf('pages/noviceArea/index') > -1)
});
module.exports.fliter = fliter;
</script>
<script>

export default {
    data() {
        return {
            list: [],
            isSignClone: false
        };
    },
    props: {
        resourseFrom: {
            type: Array,
            default: () => []
        },
        isLogin: {
            type: Boolean,
            default: false
        },
        isSign: {
            type: Boolean,
            default: false
        }
    },
    mounted: function () {
        this.list = this.resourseFrom;
    },
    methods: {
        addFormId: function () {},
        _universalJump: function (t) {},
        loginHandle: function () {}
    },
    watch: {
        resourseFrom: {
            handler: function (e) {
				this.list = e;
            },
            immediate: true,
            deep: true
        },

        isSign: {
            handler: function (e) {
				this.isSignClone = e;
            },
            immediate: true
        }
    }
};
</script>
<style lang="scss" scoped>
	@import './index.scss';
</style>
