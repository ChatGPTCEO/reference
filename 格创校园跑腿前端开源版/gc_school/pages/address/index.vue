<template>
    <block>
        <cu-custom bgColor="bgmain" :isBack="true">
            <view slot="content">我的地址</view>
        </cu-custom>
        <view class="container">
            <!-- <view class="titles">地址管理</view> -->
            <view class="content" v-if="address.available.length > 0">
                <scroll-view class="scroll" :scrollY="true">
                    <block v-if="sid > 0 || erranderId > 0">
                        <block v-if="address.available.length > 0">
                            <!-- <view class="block-title">可选收货地址</view> -->
                            <view class="addr_box" :class="'wui-cell ' + (index > 0 ? 'border-1px-t' : '')" v-for="(item, index) in address.available" :key="index">
                                <view class="wui-cell-bd">
                                    <view
                                        @tap="handleUser"
                                        :data-available="item.available"
                                        :data-id="item.a_id"
                                        :data-name="item.name"
                                        :data-addres="item.addres"
                                        :data-sid="item.s_id"
                                        :data-index="index"
                                        class="top"
                                    >
                                        <view class="more_info justify-between">
                                            <view class="name">{{ item.name }}</view>
                                            <view class="phone">{{ item.phone }}</view>
                                        </view>
                                        <view class="addres">{{ item.addres }}</view>
                                    </view>
                                    <view class="icon">
                                        <text
                                            @tap="onJsEvent"
                                            data-event-type="jsUrl"
                                            :data-url="'/gc_school/pages/address/addressPost?id=' + item.a_id"
                                            openType="navigate"
                                            class="cuIcon-edit"
                                        ></text>
                                        <text @tap="del" :data-id="item.a_id" class="cuIcon-delete"></text>
                                    </view>
                                </view>
                            </view>
                        </block>
                    </block>
                </scroll-view>
            </view>
            <view class="no-data" v-else>
                <image class="no-coupon" src="http://cos.lalawaimai.com/we7_wmall/wxapp/store_no_con.png"></image>
                <text class="no-record">您还没有收货地址</text>
            </view>
            <!-- <view class="bottom-fixed border-1px-t" v-if="islogin"> -->
                <view @tap="onJsEvent" class="margin btns" data-event-type="jsUrl" :data-url="'/gc_school/pages/address/addressPost?id=0'" >
                    添加地址
                </view>
                <!-- <button class="btn" bindtap="wxAddress">获取微信地址</button> -->
            <!-- </view> -->
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
                available: [],
                dis_available: []
            },

            islogin: false,
            color: uni.getStorageSync('color'),
            loginuserinfo: '',
            form: {},
            sid: 0,
            channel: '',
            input: ''
        };
    },
    onLoad() {
        if (uni.getStorageSync('userinfo')) {
            console.log('用户信息', uni.getStorageSync('userinfo'));
            this.setData({
                loginuserinfo: uni.getStorageSync('userinfo'),
                islogin: true
            });
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function (options) {
        this.getData();
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */

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
        handleUser(e) {
            var pages = getCurrentPages(); //获取当前页面信息栈

            var prevPage = pages[pages.length - 2];

            if (prevPage.route == 'gc_school/pages/public/index') {
                prevPage.setData({
                    form: { ...prevPage.data.form, a_id: e.currentTarget.dataset.id, a_name: e.currentTarget.dataset.name, a_addres: e.currentTarget.dataset.addres,a_s_id: e.currentTarget.dataset.sid}
                });
                uni.navigateBack({
                    address: e.currentTarget.dataset.id
                });
            } else {
                uni.navigateBack();
            }
        },

        onJsEvent(e) {
            console.log(e);
            uni.navigateTo({
                url: e.currentTarget.dataset.url
            });
        },

        //删除地址
        del(e) {
            var that = this;
            uni.showModal({
                title: '提示',
                content: '确定要删除该条地址吗？',
                success: function (res) {
                    if (res.confirm) {
                        app.globalData.util.request({
                            url: 'Address/delete',
                            data: {
                                a_ids: e.currentTarget.dataset.id,
                            },

                            success(res) {
                                that.getData();
                            }
                        },true);
                    } else {
                    }
                }
            });
        },

        getData() {
            var self = this;
            app.globalData.util.request({
                url: 'Address/index',
                data: {},
                success(res) {
                    if (res.data.data.list.length == 0) {
                        self.setData({
                            showNodata: true
                        });
                    }

                    self.setData({
                        address: {
                            available: res.data.data.list
                        }
                    });
                }
            },true);
        },

        //获取微信地址
        wxAddress: function () {
            var that = this;
            uni.chooseAddress({
                success: function (res) {
                    console.log('返回的地址', res);
                    app.globalData.util.request({
                        url: 'entry/wxapp/MyAddresAdd',
                        data: {
                            openid: uni.getStorageSync('openid'),
                            name: res.userName,
                            addres: res.detailInfo,
                            province: res.provinceName,
                            city: res.cityName,
                            district: res.countyName,
                            phone: res.telNumber
                        },

                        success(res) {
                            that.getData();
                        }
                    });
                }
            });
        },

        onSelectAddress() {
            console.log('占位：函数 onSelectAddress 未声明');
        }
    }
};
</script>
<style>
page {
	background-color: #F7F5F6;
    /* height: 100%; */
    /* overflow: hidden; */
}

.container {
    height: 100%;
    overflow: hidden;
    background-color: #f5f5f5;
}

.container .content {
    display: -webkit-flex;
    box-sizing: border-box;
    /* height: 100%; */
    padding-bottom: 80px;
}

.container .scroll {
    height: 100%;
    /* padding-bottom: 150rpx; */
}

.container .block-title {
    padding: 10px 15px;
    background-color: #f5f5f5;
    font-size: 14px;
    color: #999;
}
.addr_box{
	border-radius: 20rpx;
}

.container .content .wui-cell {
    padding: 30rpx 30rpx 0;
    line-height: 1;
    box-sizing: border-box;
    background-color: #fff;
    margin: 30rpx;
}

.container .content .wui-cell::after {
    border-top: 0;
}

.container .content .wui-cell .address {
    font-size: 14px;
    font-weight: 400;
    display: inline-block;
    width: 75%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.container .content .wui-cell .more {
    margin-top: 10px;
}

.container .content .wui-cell .more > view {
    display: inline-block;
    font-size: 14px;
    color: #919191;
}

.container .content .wui-cell .more .name {
    margin-right: 5px;
}

.container .content .wui-cell .change {
    position: absolute;
    top: 50%;
    right: 0px;
    padding: 25rpx;
    transform: translate(0, -50%);
}

.container .content .wui-cell .change .icon {
    font-size: 18px;
}

.container .bottom-fixed {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
    box-sizing: border-box;
    height: 50px;
    background-color: #fff;
}

.container .bottom-fixed > text {
    display: flex;
    width: 50%;
    height: 100%;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
}

.container .bottom-fixed > text:nth-child(2) {
    border-left: 1rpx solid #e5e5e5;
    color: #6cc143;
}

.container .bottom-fixed .icon {
    margin-right: 3px;
    font-size: 18px;
}

.no-data {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
}

.no-data .no-coupon {
    width: 100px;
    height: 100px;
    position: absolute;
    left: 50%;
    top: 150px;
    transform: translate(-50%, 0);
}

.no-data .no-record {
    position: absolute;
    left: 50%;
    top: 260px;
    transform: translate(-50%, 0);
    font-size: 16px;
    color: #656565;
}

.bottom-fixed {
    position: fixed;
    bottom: 0;
    width: 100%;
    min-height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 16px;
    color: #ffd56f;
}
.btns {
	position: fixed;
	bottom: 0;
	width: 90%;
    /* flex: 1; */
    border: none;
	background: linear-gradient(90deg, #FF484A 0%, #FF716C 100%);
    /* background-color: #1cb299; */
    color: white;
    font-size: 32rpx;
    outline: none;
	border-radius: 40rpx;
	height: 90rpx;
	line-height: 90rpx;
	text-align: center;
}
.bgm {
    background-color: #ff6344;
}
.text-xl {
    font-size: 36rpx !important;
}
.more_info {
    display: flex;
}
.more_info .name {
    font-size: 32rpx;
    font-weight: bold;
}
.more_info .phone {
    font-size: 30rpx;
}
.addres {
    line-height: 90rpx;
    color: #666666;
    font-size: 28rpx;
}
.top {
    border-bottom: 1rpx solid #f5f5f5;
}
.icon {
    display: flex;
    justify-content: flex-end;
    font-size: 40rpx;
    line-height: 80rpx;
}
.icon text:first-child {
    margin-right: 40rpx;
}
.titles {
    padding: 70rpx 0 30rpx 0;
    color: black;
    font-size: 30rpx;
    text-align: center;
    background: white;
    /* background-image: linear-gradient(to right, #0396FF, #23AFE4, #ABDCFF) !important; */
}
/* .bgmain {
    background-color: #ff6344;
    color: white;
}
.cuIcon-back {
    color: white;
} */
</style>
