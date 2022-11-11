<template>
    <block>
        <cu-custom bgColor="bgmain" :isBack="true">
            <view slot="content">我的优惠券</view>
        </cu-custom>

        <view class="container">
            <view class="cu-bar bg-white">
                <view class="action">
                    <text class="cuIcon-title text-green"></text>
                    <text>可用优惠券</text>
                </view>
            </view>
            <view class="list bg-white">
                <view
                    @longpress="del"
                    class="yhj_cont mb20"
                    :data-title="item.c_name"
                    :data-y_money="item.price"
                    v-if="mylist.length != 0"
                    @tap="handleUser"
                    :data-id="item.id"
                    v-for="(item, index) in mylist"
                    :key="index"
                >
                    <view class="j_left">
                        <view class="j_l_top df">
                            <view class="tc" style="flex-shrink: 0; width: 200rpx">
                                <view>
                                    <text class="fs22">￥</text>
                                    <text class="fs50 fw">{{ item.price }}</text>
                                </view>
                                <view class="fs24">{{ item.yhq_yaoqiu }}</view>
                            </view>
                            <view class="" style="padding: 20rpx">
                                <view class="fw fs34">{{ item.c_name }}</view>
                                <view class="fs26">{{ item.yhq_shuoming }}</view>
                            </view>
                        </view>
                        <view class="j_l_bot df jsb" style="padding: 20rpx">
                            <view></view>
                            <view class="label">使用</view>
                        </view>
                    </view>
                </view>
            </view>

            <view class="cu-bar bg-white margin-top">
                <view class="action">
                    <text class="cuIcon-title text-green"></text>
                    <text>可用领取优惠券</text>
                </view>
            </view>
            <view class="list bg-white">
                <view class="yhj_cont mb20" :data-id="item.o_id" v-if="list.length != 0" @tap="handleGet" v-for="(item, index) in list" :key="index">
                    <view class="j_left">
                        <view class="j_l_top df">
                            <view class="tc" style="flex-shrink: 0; width: 200rpx">
                                <view>
                                    <text class="fs22">￥</text>
                                    <text class="fs50 fw">{{ item.price }}</text>
                                </view>
                                <view class="fs24">{{ item.yhq_yaoqiu }}</view>
                            </view>
                            <view class="" style="padding: 20rpx">
                                <view class="fw fs34">{{ item.c_name }}</view>
                                <view class="fs26">{{ item.yhq_shuoming }}</view>
                            </view>
                        </view>
                        <view class="j_l_bot df jsb" style="padding: 20rpx">
                            <view></view>
                            <view class="label">领取</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </block>
</template>

<script>
var app = getApp();
export default {
    data() {
        return {
            showNodata: false,
            erranderId: 2,

            address: {
                available: []
            },

            fee: '',
            mylist: '',
            list: '',
            form: {},
            yhj_list: []
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        console.log('接收的金额', options.fee);
        this.setData({
            fee: Number(options.fee).toFixed(2)
        });
        this.getData();
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
        getData() {
            var self = this;
            app.globalData.util.request({
                url: 'UserCoupon/index',
                data: {
                    s_id: uni.getStorageSync('schoolId'),
					use_status:0
                },

                success(res) {
                    console.log('21222', res);
                    self.setData({
                        mylist: res.data.data.list
                    });
                    self.getDataCupon();
                }
            },true);
        },

        getDataCupon() {
            var self = this;
            app.globalData.util.request({
                url: 'UserCoupon/couponindex',
                data: {
                    s_id: uni.getStorageSync('schoolId'),
                },
                success(res) {
					console.log("可领取",res.data.data)
                    self.setData({
                        list: res.data.data
                    });
                }
            },true);
        },

        handleGet(e) {
            var self = this;
            app.globalData.util.request({
                url: 'UserCoupon/add',
                data: {
                    o_id: e.currentTarget.dataset.id,
                    s_id: uni.getStorageSync('schoolId')
                },

                success(res) {
                    self.getData();
					self.getDataCupon()
					self.list = [];
                }
            },true);
        },

        handleUser(e) {
            var pages = getCurrentPages(); //获取当前页面信息栈

            var prevPage = pages[pages.length - 2];
			
            if (prevPage.route == 'gc_school/pages/public/index') {
                console.log("上个页面传过来的",this.fee);
                console.log('所选优惠券', e.currentTarget.dataset.y_money);

                if (Number(this.fee) < Number(e.currentTarget.dataset.y_money)) {
                    uni.showToast({
                        title: '优惠券不可用',
                        icon: 'none'
                    });
                } else {
                    prevPage.setData({
                        form: { ...prevPage.data.form, co_id: e.currentTarget.dataset.id, y_money: e.currentTarget.dataset.y_money, co_title: e.currentTarget.dataset.title }
                    });
                    uni.navigateBack({
                        cupon: e.currentTarget.dataset.id
                    });
                }
            } else {
                uni.navigateBack({
                    id
                });
            }
        },

        del() {
            console.log('占位：函数 del 未声明');
        }
    }
};
</script>
<style>
/* gc_school/pages/cupon/index.wxss */

.list {
    padding: 20rpx;
}

.yhj_cont {
    padding: 0 20rpx;
    color: #cdcccc;
}

.j_left {
    border-top: 10rpx solid #eca72c;
    border-radius: 10rpx;
    box-shadow: 0 10rpx 10px #f0f0f0;
    background: #fff;
}

.j_left .j_l_top {
    padding: 10rpx 0;
    border-bottom: 2rpx dashed #eca72c;
    color: #eca72c;
}

.j_l_bot {
    font-size: 24rpx;
    color: #a6a6a6;
    padding: 20rpx 0;
}

.dian {
    width: 10rpx;
    height: 10rpx;
    margin-right: 10rpx;
    background: #eca72c;
    border-radius: 50%;
    display: inline-block;
}

.j_right {
    width: 25%;
}

.label {
    background: #f0ac2d;
    color: #fff;
    padding: 5rpx 20rpx;
    border-radius: 10rpx;
    font-size: 24rpx;
}

.j_left.failure {
    border-top: 10rpx solid #cdcccc;
    box-shadow: 0 10rpx 10rpx #cdcccc;
    background: #f8f8f8;
}

.j_left.failure .j_l_top {
    border-bottom: 2rpx dashed #cdcccc;
    color: #cdcccc;
}

.j_left.failure .j_l_bot {
    color: #cdcccc;
}

.j_left.failure .dian {
    background: #cdcccc;
}

.j_left.failure .label {
    background: #cdcccc;
}
.action {
    color: #000 !important;
}
.bgmain {
    background-color: #ff6344;
    color: white;
}
.cuIcon-back {
    color: white;
}
</style>
