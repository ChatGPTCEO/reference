<template>
    <view>
        <view
            class="navigation-bar"
            :style="
                'padding-top:' +
                paddingTop +
                'px;height:' +
                height +
                'px;line-height:' +
                height +
                'px;background:' +
                background +
                ';color:' +
                color +
                ';font-size:' +
                fontSize +
                ';position:' +
                (fixed && 'fixed') +
                ';transform:translateY(' +
                (!show ? -paddingTop - height + 'px' : '0') +
                ');z-index:' +
                zIndex
            "
        >
            <view class="back" :style="'padding-top:' + paddingTop + 'px;height:' + height + 'px;line-height:' + height + 'px;'" v-if="back">
                <view class="style-simple">
                    <view @tap="navigateBackHome" class="iconfont iconhome1" style="" v-if="showHomeButton"></view>
                    <view @tap="navigateBack" class="iconfont iconarrow_left" v-else></view>
                </view>
            </view>
            <view class="title">{{ title != 'none' ? title : '' }}</view>
        </view>
        <view
            class="navigation-bar-holder"
            :style="'background:' + placeholderBg + ';padding-top:' + paddingTop + 'px;height:' + height + 'px;line-height:' + height + 'px;width:750rpx;'"
            v-if="fixed && show && hasHei"
        ></view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            height: 44,
            paddingTop: 20,
            showHomeButton: false,
            show: true,
            navigationBarTextStyle: 'black'
        };
    },
    props: {
        back: {
            type: Boolean,
            default: true
        },
        hasHei: {
            type: Boolean,
            default: false
        },
        zIndex: {
            type: Number,
            default: 99
        },
        background: {
            type: String,
            default: '#ffffff'
        },
        placeholderBg: {
            type: String,
            default: 'transparent'
        },
        color: {
            type: String,
            default: '#000000'
        },
        fontSize: {
            type: String,
            default: '16px'
        },
        title: {
            type: String,
            default: 'none'
        },
        fixed: {
            type: Boolean,
            default: true
        },
        backEvent: {
            type: Boolean,
            default: false
        },
        backHomeEvent: {
            type: Boolean,
            default: false
        }
    },
    beforeMount: function (t) {
        var e = getCurrentPages();
        var a = false;
        if (e.length < 2 && e[0].route != __wxConfig.pages[0]) {
            a = true;
        }

        var n = uni.getSystemInfoSync();
        var o = uni.getMenuButtonBoundingClientRect();
        var i = 20;
        var r = 44;
        i = n.statusBarHeight;
        r = o.top + o.bottom - 2 * n.statusBarHeight;
        var s = __wxConfig.global.window.navigationBarTextStyle;
        this.setData({
            height: r,
            paddingTop: i,
            showHomeButton: a,
            navigationBarTextStyle: s
        });
    },
    methods: {
        navigateBack: function () {
            if (this.backEvent) {
                this.$emit('back');
            } else {
                this.runBack();
            }
        },
        runBack: function () {
            var t = getCurrentPages();

            if (t.length < 2 && t[0].route != __wxConfig.pages[0]) {
                uni.reLaunch({
                    url: '/' + __wxConfig.pages[0]
                });
            } else {
                uni.navigateBack({
                    delta: 1
                });
            }
        },
        navigateBackHome: function () {
            if (this.backHomeEvent) {
                this.$emit('backHome');
            } else {
                this.runBackHome();
            }
        },
        runBackHome: function () {
            if (getCurrentPages()[0].route === __wxConfig.pages[0]) {
                uni.navigateBack({
                    delta: 10
                });
            } else {
                uni.reLaunch({
                    url: '/' + __wxConfig.pages[0]
                });
            }
        },
        toggleShow: function () {
            this.show ||
                this.setData({
                    show: true
                });
        },
        toggleHide: function () {
            if (this.show) {
                this.setData({
                    show: false
                });
            }
        }
    },
    watch: {
        zIndex: {
            handler: function (t, e, a) {
                if (!t) {
                    var n = {};
                    n[a[0]] = e;
                    this.setData(n);
                }
            },

            immediate: true
        },

        background: {
            handler: function (t, e, a) {
                if (!t) {
                    var n = {};
                    n[a[0]] = e;
                    this.setData(n);
                }
            },

            immediate: true
        },

        placeholderBg: {
            handler: function (t, e, a) {
                if (!t) {
                    var n = {};
                    n[a[0]] = e;
                    this.setData(n);
                }
            },

            immediate: true
        },

        color: {
            handler: function (t, e, a) {
                if (!t) {
                    var n = {};
                    n[a[0]] = e;
                    this.setData(n);
                }
            },

            immediate: true
        },

        fontSize: {
            handler: function (t, e, a) {
                if (!t) {
                    var n = {};
                    n[a[0]] = e;
                    this.setData(n);
                }
            },

            immediate: true
        },

        title: {
            handler: function (t, e, a) {
                if (!t) {
                    var n = {};
                    n[a[0]] = e;
                    this.setData(n);
                }
            },

            immediate: true
        },

        fixed: {
            handler: function (t, e, a) {
                if (false !== t && true !== t) {
                    var n = {};
                    n[a[0]] = e;
                    this.setData(n);
                }
            },

            immediate: true
        },

        backEvent: {
            handler: function (t, e, a) {
                if (false !== t && true !== t) {
                    var n = {};
                    n[a[0]] = e;
                    this.setData(n);
                }
            },

            immediate: true
        },

        backHomeEvent: {
            handler: function (t, e, a) {
                if (false !== t && true !== t) {
                    var n = {};
                    n[a[0]] = e;
                    this.setData(n);
                }
            },

            immediate: true
        }
    }
};
</script>
<style>
@import './index.css';
</style>
