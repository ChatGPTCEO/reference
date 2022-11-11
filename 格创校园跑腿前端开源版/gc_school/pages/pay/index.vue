<template>
    <view class="container">
        <form @submit="formSubmit">
            <view>
                <view class="list">
                    <view class="item border_bot_2">
                        <view class="input fs28">
                            <input maxlength="20" name="meny" placeholder="请输入金额" type="number" />
                        </view>
                    </view>
                </view>
            </view>
            <input v-if="false" name="openid" :value="openid" />
            <button class="submit" formType="submit" size="mini">充值</button>
        </form>
    </view>
</template>

<script>
var app = getApp();
export default {
    data() {
        return {
            openid: '',
            usernick: '',
            img: '',
            longitude: '',
            latitude: '',
            address: '',
            category: [
                {
                    id: '1',
                    name: '服务中心'
                },
                {
                    id: '2',
                    name: '飞手'
                },
                {
                    id: '3',
                    name: '农场主'
                },
                {
                    id: '4',
                    name: '合作社'
                },
                {
                    id: '5',
                    name: '作业中介'
                },
                {
                    id: '6',
                    name: '其它'
                }
            ],
            index: '',
            serverList: [],
            serverIndex: '',
            isWorker: false
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {},
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.setData({
            openid: uni.getStorageSync('openid'),
            usernick: uni.getStorageSync('userinfo').nickName,
            img: uni.getStorageSync('userinfo').avatarUrl
        }); // app.util.footer(this);
    },
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
        formSubmit(e) {
            console.log(e.detail.value);
            app.globalData.util.request({
                url: 'entry/wxapp/OrderPost',
                data: { ...e.detail.value },

                success(res) {
                    uni.showToast({
                        title: '提交成功',
                        icon: 'success',
                        duration: 2000
                    });
                    uni.redirectTo({
                        url: '/wx_tx/pages/mypublic/index'
                    });
                }
            });
        }
    }
};
</script>
<style>
page {
    background: #f3f3f3;
}
.container {
    margin-bottom: 80rpx;
}
.top {
    background: #fcf4d0;
    color: #94711c;
    padding: 20rpx 30rpx;
    font-size: 26rpx;
}

.arrow {
    width: 25rpx;
    height: 25rpx;
}

.list {
}

.list .item {
    padding: 20rpx;
    background: #fff;
}

.list .item .title {
    color: #333333;
    font-size: 24rpx;
    flex-shrink: 0;
}

.list .item .input {
    width: 100%;
    position: relative;
}

.list .item .arrow_r {
    width: 15rpx;
    height: 25rpx;
    margin-left: 10rpx;
}

.hqyzm {
    padding: 0rpx 20rpx;
    border-radius: 30rpx;
    margin-left: 10rpx;
    color: #64edac;
    border: 2rpx solid #64edac;
    flex-shrink: 0;
}

.list .item textarea {
    min-height: 150rpx;
}

.list .item .item_img {
    width: 120rpx;
    height: 120rpx;
    border: 2rpx solid #f5f5f5;
    margin-right: 40rpx;
    margin-bottom: 10rpx;
    position: relative;
}

.list .item .del {
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(50%, -50%);
    width: 30rpx;
    height: 30rpx;
}

.list .item .name_num {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}

.list .item textarea {
    width: 100%;
}

.submit[size='mini'] {
    color: #fff;
    background: #64edac;
    margin: 50rpx 0;
    width: 95%;
    padding: 10rpx 50rpx;
    font-size: 28rpx;
    border-radius: 10rpx;
    left: 50%;
    transform: translateX(-50%);
}

.content {
    background: #fff;
}

.content .part {
    padding: 20rpx;
}

.charge_item {
    color: #666666;
    margin-right: 150rpx;
    font-size: 28rpx;
}

.charge_item:nth-child(2) {
    margin-right: 0rpx;
}

.charge_item radio {
    transform: scale(0.8);
}

.diff_item {
    display: inline-block;
    width: 30rpx;
    height: 30rpx;
    border-radius: 50%;
    background: #f3f3f3;
    margin-right: 10rpx;
}

.diff_item.sel {
    background: #64edac;
}

.sure_btn {
    position: fixed;
    bottom: 50rpx;
    left: 50%;
    transform: translateX(-50%);
    width: 95%;
    background: #64edac;
    color: #fff;
    font-size: 28rpx;
    border-radius: 20rpx;
    text-align: center;
    padding: 20rpx 0;
}
</style>
