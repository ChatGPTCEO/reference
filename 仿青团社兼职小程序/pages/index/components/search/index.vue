<template>
    <view class="search-box-container">
        <view :class="'search-box ' + (isSearchFixed ? 'fixed' : '')" :style="'top: ' + (isSearchFixed ? fixedHeight : '') + 'px'">
            <view @tap="skipToCityList" class="position ptp_exposure_static" data-ptpid="38hf-2dfk-2fk2-fl4m" id="pid=38hf-2dfk-2fk2-fl4m">
                <view class="iconfont iconlocation_fill1"></view>
                <view class="city-box ellipsis">{{ cityName }}</view>
            </view>
            <view @tap="skipsearch" class="search ellipsis ptp_exposure_static" data-ptpid="fken-3rjg-o4kg-fk3w">
                <view class="iconfont iconsearch_2"></view>
                <view class="info ellipsis">{{ list[now].name }}</view>
            </view>
            <view
                @tap="sign"
                class="sign ptp_exposure_static ignoreT2"
                :data-ptpid="isSign ? '2dh2-fn3f-fj21-134f' : 'djfh-foj2-fh38-fjh3'"
                :id="'pid=' + (isSign ? '2dh2-fn3f-fj21-134f' : 'djfh-foj2-fh38-fjh3')"
            >
                <view class="sigin-text">
                    {{ isSign ? '赚青豆' : '签到' }}
                    <view class="red-point" v-if="!isSign"></view>
                </view>
            </view>
            <view class="login-mask" v-if="!isLogin">
                <open-button @initData="loginSuccess" openType="getPhoneNumber" ptpId="signLogin"></open-button>
            </view>
        </view>
    </view>
</template>

<script>
import openButton from '@/pages/components/openButton/openButton';

export default {
    components: {
        openButton
    },
    data() {
        return {
            now: 0,
            timer: null,
        };
    },
    props: {
        cityName: {
            type: String,
            default: '杭州'
        },
        isSign: {
            type: Boolean,
            default: false
        },
        clearWordChange: {
            type: Boolean,
            default: true
        },
        list: {
            type: Array,
            default: () => []
        },
        isLogin: {
            type: Boolean,
            default: false
        },
        isSearchFixed: {
            type: Boolean,
            default: false
        },
        fixedHeight: {
            type: Number,
            default: 72
        }
    },
    mounted: function () {
        this.startAnimate();
        // (0, t.elementObserver)('.ptp_exposure_static', this);
    },
    destroyed: function () {
        clearInterval(this.timer);
    },
    methods: {
        loginSuccess: function () {},
        startAnimate: function () {},
        skipToCityList: function () {},
		// 搜索点击
        skipsearch: function () {
			console.log('点击搜索');
		},
        sign: function () {}
    },
    watch: {
        clearWordChange: {
            handler: function (t) {
                if (t) {
                    clearInterval(this.timer);
                } else {
                    this.startAnimate();
                }
            },

            immediate: true
        },

        list: {
            handler: function () {
                this.startAnimate();
            },

            immediate: true,
            deep: true
        }
    }
};
</script>
<style lang="scss" scoped>
	@import './index.scss';
</style>
