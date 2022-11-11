<template>
    <block>
        <scroll-view scroll-y class="scrollPage">
            <cu-custom bgColor="bgmain" :isBack="true">
                <view slot="content">提现</view>
            </cu-custom>

            <form @submit="formSubmit">
                <view class="padding padding-bottom-sm bg-white">
                    <view class="title text-grey text-lg">可提现金额 ￥{{ userInfo.balance }}</view>
                </view>
                <view class="cu-form-group">
                    <input placeholder="点此输入提现金额" @input="moneyinput" name="price" :value="money" type="digit" />
                </view>

                <view class="padding padding-bottom-sm bg-white margin-top" v-if="is_pay == 0">
                    <view class="title text-grey text-lg">提现方式</view>
                </view>
                <view class="cu-form-group" v-if="is_pay == 0">
                    <view class="title">姓名</view>
                    <input placeholder="输入姓名" name="name" :value="form.name" />
                </view>
                <view class="cu-form-group" v-if="is_pay == 0">
                    <view class="title">{{ sys.withdraw_tips ? sys.withdraw_tips : '手机号' }}</view>
                    <input placeholder="请输入" name="account" :value="form.account" />
                </view>

                <view class="submit margin-top">
                    <view class="padding flex flex-direction">
                        <button class="cu-btn bg-yellow lg round" form-type="submit">提交申请</button>
                        <view v-if="is_pay == 1" class="notice">提现的钱将会到账微信余额，请注意查收</view>
                    </view>
                </view>
            </form>
        </scroll-view>
    </block>
</template>

<script>
// natatorium/regsiter/index.js
var app = getApp();
export default {
    data() {
        return {
            is_pay: 0,
            system: {},

            sys: {
                tixian_word: false
            },

            money: '',

            userInfo: {},

            form: {
                name: '',
                account: ''
            }
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        // this.setData({
        // 	is_pay:options.type
        // })
        console.log(options);
        this.getUser();
        this.getConfig();
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {
        moneyinput(e) {
            var text;
            var reg = /^(\.*)(\d+)(\.?)(\d{0,2}).*$/g;

            if (reg.test(e.detail.value)) {
                //正则匹配通过，提取有效文本
                text = e.detail.value.replace(reg, '$2$3$4');
            }

            this.setData({
                money: text
            });
        },

        formSubmit(e) {
            var self = this;
			console.log("提现金额",self.sys)
            if (!e.detail.value.price) {
                app.globalData.util.message('请输入提现金额', '', 'error');
                return false;
            }

            if (Number(e.detail.value.price) > self.userInfo.balance) {
                app.globalData.util.message('余额不足', '', 'error');
                return false;
            }

            if (Number(e.detail.value.price) < self.sys.withdraw_min) {
                app.globalData.util.message('提现金额不能低于' + self.sys.withdraw_min, '', 'error');
                return false;
            }
			var type = self.is_pay==0?1:2
            app.globalData.util.request({
                url: 'UserWithdraw/add',
                data: { ...e.detail.value, openid: uni.getStorageSync('openid'), type: type },

                success(res) {
                    uni.showToast({
                        title: res.data.msg
                    });
                    setTimeout(function () {
                        uni.navigateBack({});
                    }, 2000);
                }
            },true);
        },

        //获取列表
        getUser() {
            const self = this;
            app.globalData.util.request({
                url: 'WechatUser/view',
                data: {},
                success(res) {
					console.log(res.data.data)
                    self.setData({
                        userInfo: res.data.data
                    });
                }
            },true);
        },

        getConfig() {
            var self = this;
            app.globalData.util.request({
                url: 'Setting/view',
                data: {},
		
                success(res) {
                    self.setData({
                        sys: res.data.data.sys,
                        is_pay: res.data.data.sys.company_pay_switch
                    });
                }
            });
        }

    }
};
</script>
<style>
/* gc_school/pages/replay/index.wxss */
page {
    background-color: white;
}
.bgmain {
    background-color: #ff6344;
    color: white;
}
.cuIcon-back {
    color: white;
}
.bg-yellow {
    background-color: #ff6344;
}
.notice {
    font-size: 30rpx;
    margin: 30rpx auto;
}
</style>
