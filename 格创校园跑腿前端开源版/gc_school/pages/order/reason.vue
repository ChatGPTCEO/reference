<template>
    <block>
        <cu-custom bgColor="bgmains" :isBack="true">
            <view slot="content">原因填写</view>
        </cu-custom>

        <view class="box">
            <textarea @input="getVal" rows="5" :placeholder="placeholder"></textarea>
            <view @tap="submit" class="submit">提交</view>
        </view>
    </block>
</template>

<script>
var app = getApp();
export default {
    data() {
        return {
            placeholder: '请在此填写理由',
            o_id: '',
            type: '',
            input: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        console.log(options);
        this.setData({
            o_id: options.id,
            type: options.type
        });

        if (options.type == 1) {
            this.setData({
                placeholder: '请填写申请取消订单的理由，并等待对方是否同意，如果对方1小时内未操作，系统将自动取消'
            });
        } // this.getData(options)
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function (options) {},
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
    // onShareAppMessage: function () {
    // }
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */ methods: {
        getVal(e) {
            this.setData({
                input: e.detail.value.replace(/\s+/g, '')
            });
        },

        submit() {
            var self = this;

            if (!this.input) {
                uni.showToast({
                    title: '请输入内容',
                    icon: 'none'
                });
                return;
            } else {
                app.globalData.util.request({
                    url: 'Order/CancelGrab',
                    data: {
                        o_id: self.o_id,
						type:self.type,
                        reason: self.input,
                    },

                    success(result) {
                        if (result.data.status == 200) {
                            uni.showToast({
                                title: result.data.message
                            });
                            setTimeout(function () {
                                uni.redirectTo({
                                    url: '/gc_school/pages/order/detail?id=' + self.o_id
                                });
                            }, 2000);
                        }
                    }
                },true);
            }

            console.log(this.input);
        },

        cancel(e) {
            var self = this;
            uni.showModal({
                title: '温馨提示',
                content: '如若取消抢单，订单将恢复到待接单状态，如需取消订单请在订单列表操作',

                success(res) {
                    if (res.confirm) {
                        console.log('确认');
                        uni.navigateTo({
                            url: '/gc_school/pages/order/reason'
                        }); // app.util.request({
                        //     url: 'entry/wxapp/cancelGet',
                        //     data: {
                        //         o_id: self.data.detail.order.o_id,
                        //         openid:wx.getStorageSync('openid')
                        //     },
                        //     success(result)
                        //     {
                        //         if(result.data.ennor==0)
                        //         {
                        //             wx.showToast({
                        //               title: result.data.message,
                        //             })
                        //         }
                        //     }
                        // })
                    } else {
                        console.log('取消');
                    }
                }
            });
        }
    }
};
</script>
<style>
page {
    background: white;
}
.box {
    padding: 40rpx 5%;
}
textarea {
    width: 100%;
    border: 1rpx solid lightgray;
    border-radius: 10rpx;
    font-size: 30rpx;
    padding: 10rpx 0;
}
.submit {
    background: #ff6444;
    width: 200rpx;
    margin: 20rpx auto;
    padding: 20rpx;
    text-align: center;
    color: white;
    font-size: 32rpx;
    border-radius: 10rpx;
}
</style>
