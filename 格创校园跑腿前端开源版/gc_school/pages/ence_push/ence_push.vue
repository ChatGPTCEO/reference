<template>
    <view class="wrap">
        <view class="wrap_title">
            <view class="wrap_title_top topstyle">欢迎来到测试体验！</view>
            <view class="wrap_title_top">点击体验按钮，获取体验资格。</view>
        </view>
        <view class="wrap_middle">
            <image src="https://openapi.xiaoshentui.com/push_sdk_img/ence-push_test.png"></image>
        </view>
        <view class="wrap_bottom">
            <form class="form_box">
                <view class="wrap_bottom_img">
                    <view class="wrap_bottom_btn">
                        <button class="form_box_btn_" v-if="!nickname && !avatarurl" open-type="getUserInfo" @getuserinfo="onGotUserInfo">上报您的头像昵称</button>
                        <button class="form_box_btn" v-if="nickname && avatarurl" open-type="getUserInfo" @tap="subscribe">订阅</button>
                    </view>
                </view>
            </form>
        </view>
        <view class="ex_tip" v-if="isShowtip">
            {{ tip }}
        </view>
    </view>
</template>

<script>
let PUSH = require('../../../utils/push_conf.js');

let isOver = false;
let api = 'https://openapi2.xiaoshentui.com/';
export default {
    data() {
        return {
            avatarurl: '',
            nickname: '',
            isShowtip: false,
            tip: ''
        };
    },
    onShow() {
        let _this = this;

        if (uni.getStorageSync('push_avatarurl') && uni.getStorageSync('push_nickname')) {
            this.setData({
                avatarurl: uni.getStorageSync('push_avatarurl'),
                nickname: uni.getStorageSync('push_nickname')
            });
        }
    },
    methods: {
        onGotUserInfo: function (e) {
            this.setData({
                avatarurl: e.detail.userInfo.avatarUrl,
                nickname: e.detail.userInfo.nickName
            });
            uni.setStorageSync('push_avatarurl', e.detail.userInfo.avatarUrl);
            uni.setStorageSync('push_nickname', e.detail.userInfo.nickName);
        },

        subscribe: function (e) {
            if (!uni.getStorageSync('ald_push_openid')) {
                return this.debugModel('openid未上报');
            }

            if (isOver) {
                return;
            }

            isOver = true;

            if (!this.isSubscribe()) {
                return this.debugModel('基础库版本不支持订阅消息');
            }

            let that = this;
            let data = {
                avatarurl: this.avatarurl,
                nickname: this.nickname,
                app_key: PUSH.app_key,
                openid: uni.getStorageSync('ald_push_openid')
            };
            uni.request({
                url: api + 'api/v1/getpt',
                data: {
                    app_key: PUSH.app_key
                },
                method: 'POST',

                success(res) {
                    let tlis = res.data.data.list.map(function (item) {
                        return item.template_id;
                    });
                    uni.requestSubscribeMessage({
                        tmplIds: tlis,

                        success(_res) {
                            let tmplIdsArr = [];

                            for (let i in _res) {
                                if (_res[i] === 'accept') {
                                    tmplIdsArr.push(i);
                                }
                            }

                            if (!tmplIdsArr.length) {
                                isOver = false;
                                return that.debugModel('未订阅模版');
                            }

                            data.tlis = tmplIdsArr;
                            uni.request({
                                url: api + 'api/v1/reportdt',
                                data: data,
                                method: 'POST',
                                success: function (__res) {
                                    isOver = false;
                                    that.debugModel('订阅成功');
                                },

                                fail(e) {
                                    isOver = false;
                                    that.debugModel('订阅成功模版上报失败');
                                }
                            });
                        },

                        fail(e) {
                            isOver = false;
                            that.debugModel('订阅失败');
                        }
                    });
                },

                fail(e) {
                    isOver = false;
                    that.debugModel('获取模版ID请求失败');
                }
            });
        },

        isSubscribe() {
            var SyStemRes = uni.getSystemInfoSync();

            if (typeof SyStemRes.SDKVersion !== 'undefined') {
                let v = parseInt(SyStemRes.SDKVersion.split('.').join(''));
                console.log('版本', v);

                if (v >= 282) {
                    return true;
                }

                return false;
            }

            return false;
        },

        debugModel(msg) {
            uni.showModal({
                title: '小神推提示',
                content: msg
            });
        }
    }
};
</script>
<style>
.wrap {
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
}
.wrap_title {
    flex: 1;
    width: 100%;
    height: 150rpx;
    margin: 0 auto;
}
.wrap_title_top {
    width: 100%;
    height: 75rpx;
    line-height: 75rpx;
    text-align: center;
    font-size: 40rpx;
    color: #4687f7;
    font-weight: 600;
}
.topstyle {
    margin-top: 80rpx;
}
.wrap_middle {
    flex: 1;
    width: 100%;
    height: 450rpx;
}
.wrap_middle image {
    display: block;
    width: 530rpx;
    height: 100%;
    margin: 0 auto;
}
.wrap_bottom {
    flex: 1;
    width: 100%;
    padding-top: 90rpx;
}

.form_box {
    width: 100%;
    height: 300rpx;
    background-color: #999;
}
.form_box_btn_ {
    position: relative;
    background-color: #fff;
    width: 195rpx;
    height: 190rpx;
    color: #fff;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 34rpx;
    background: linear-gradient(to right, #5093ee, #06b4f1);
    background: -webkit-linear-gradient(top right, #06b4f1, #5093ee);
    border-radius: 100%;
    font-size: 24rpx;
    word-break: break-all;
}
.form_box_btn {
    position: relative;
    background-color: #fff;
    width: 195rpx;
    height: 190rpx;
    color: #fff;
    line-height: 190rpx;
    margin: 0 auto;
    background: linear-gradient(to right, #5093ee, #06b4f1);
    background: -webkit-linear-gradient(top right, #06b4f1, #5093ee);
    border-radius: 100%;
}
.wrap_bottom_img {
    width: 100%;
    height: 200rpx;
}
.wrap_bottom_img image {
    display: block;
    width: 200rpx;
    height: 200rpx;
    margin: 0 auto;
    margin-top: 50rpx;
}
.wrap_bottom_num {
    text-align: center;
    font-size: 24rpx;
    color: #999;
    margin-top: 50rpx;
}
.wrap_bottom_num .num {
    display: inline;
    color: #4687f7;
    font-size: 30rpx;
}
.form_box_btn text {
    position: absolute;
    top: 95rpx;
    left: 106rpx;
    color: #fff;
}
.form_box_btn::after {
    border: none;
}
.ex_tip {
    width: 650rpx;
    height: 40rpx;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    padding: 20rpx;
    background: rgba(0, 0, 0, 0.6);
    text-align: center;
    color: #fff;
    z-index: 100;
    border-radius: 6px;
}
</style>
