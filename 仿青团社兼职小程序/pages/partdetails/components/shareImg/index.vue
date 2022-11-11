<template>
    <view>
        <painter use2D @imgOK="onImgOK" :palette="imgDraw" scaleRatio="3" style="position: absolute; left: -9999rpx"></painter>
    </view>
</template>

<script>
import painter from '@/pages/components/painter/painter';
getApp();
export default {
    components: {
        painter
    },
    data() {
        return {
            imgDraw: {},
            sharePath: ''
        };
    },
    props: {
        jobInfo: {
            type: Object,
            default: () => ({})
        },
        startDraw: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        welfareSplit: function () {
            var that = this;
            var e = (this.jobInfo && this.jobInfo.labels) || [];
            this.welfareList = [];
            e.map(function (e, i) {
                that.welfareList.push({
                    type: 'text',
                    text: e.labelName,
                    css: {
                        top: '156rpx',
                        lineHeight: '24rpx',
                        width: '116rpx',
                        left: 116 * i + 44 + 12 * i + 'rpx',
                        textAlign: 'center',
                        fontSize: '22rpx',
                        borderRadius: '4rpx',
                        padding: '8rpx',
                        background: '#EFF2F4',
                        color: '#838D99',
                        maxLines: 1
                    }
                });
            });
            this.drawPic();
        },
        drawPic: function () {
            var that = this;
            var e = this.jobInfo;
            var i = e.salary;
            var r = void 0 === i ? 0 : i;
            var o = e.jobLineType;
            var p = void 0 === o ? 0 : o;
            var a = e.labels;
            var s = void 0 === a ? [] : a;
            var n = e.jobDesc;
            var h = void 0 === n ? '' : n;
            var x = e.publishTown;
            var l =
                void 0 === x
                    ? {
                          townName: '杭州'
                      }
                    : x;
            var g = e.addressDetail;
            var d = void 0 === g ? '不限工作地址' : g;
            this.setData(
                {
                    imgDraw: {
                        width: '500rpx',
                        height: '400rpx',
                        background: 'https://qiniu-image.qtshe.com/20210107_background.png',
                        views: [
                            {
                                type: 'text',
                                text: r,
                                css: {
                                    top: '44rpx',
                                    fontSize: '42rpx',
                                    left: '44rpx',
                                    fontWeight: 'bold',
                                    color: '#FD5350'
                                }
                            },
                            {
                                type: 'image',
                                url: 2 === p ? 'https://qiniu-image.qtshe.com/20201229_02.png' : 'https://qiniu-image.qtshe.com/20201229_01.png',
                                css: {
                                    top: '108rpx',
                                    left: '44rpx',
                                    width: '30rpx',
                                    height: '30rpx'
                                }
                            },
                            {
                                type: 'text',
                                text: 2 === p ? l.townName + '·' + d : '线上兼职·不限工作地点',
                                css: {
                                    top: '108rpx',
                                    left: '84rpx',
                                    fontSize: '24rpx',
                                    color: '#838D99',
                                    width: '414rpx',
                                    maxLines: 1
                                }
                            },
                            this.welfareList[0],
                            this.welfareList[1],
                            this.welfareList[2],
                            {
                                type: 'text',
                                text: '岗位详情',
                                css: {
                                    top: s.length ? '210rpx' : '156rpx',
                                    left: '44rpx',
                                    fontWeight: 'bold',
                                    fontSize: '28rpx',
                                    color: '#101D37'
                                }
                            },
                            {
                                type: 'text',
                                text: h,
                                css: {
                                    width: '414rpx',
                                    top: s.length ? '258rpx' : '200rpx',
                                    left: '44rpx',
                                    height: '50rpx',
                                    lineHeight: '40rpx',
                                    fontSize: '24rpx',
                                    color: '#101D37',
                                    maxLines: s.length ? 3 : 4
                                }
                            },
                            {
                                type: 'image',
                                url: 'https://qiniu-image.qtshe.com/20210107liners.png',
                                css: {
                                    width: '500rpx',
                                    height: '400rpx',
                                    bottom: 0
                                }
                            }
                        ]
                    }
                },
                function () {
                    console.log(that.imgDraw);
                }
            );
        },
        onImgOK: function (t) {
            uni.hideLoading();
            this.$emit('sharePath', {
                detail: {
                    path: t.detail.path,
                    startDraw: false
                }
            });
        }
    },
    watch: {
        startDraw: {
            handler: function (t, e) {
                if (t) {
                    this.welfareSplit();
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
