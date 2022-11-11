<template>
    <view class="container">
        <view>
            <map
                id="map"
                :longitude="detail.order.longitude"
                :latitude="detail.order.latitude"
                scale="10"
                @controltap="controltap"
                :markers="markers"
                show-location
                controls=""
                style="width: 100%; height: 300px"
            ></map>
        </view>

        <form @submit="formSubmit" v-if="detail.order.start_status == '1'">
            <input v-if="false" name="openid" :value="openid" />
            <button class="submit" formType="submit" size="mini">支付{{ detail.order.divi }},立即抢单</button>
        </form>
    </view>
</template>

<script>
var app = getApp();
export default {
    data() {
        return {
            markers: [
                {
                    iconPath: '/static/wx_tx/resource/images/location.png',
                    id: 0,
                    latitude: 23.099994,
                    longitude: 113.32452,
                    width: 50,
                    height: 50
                }
            ],

            detail: {
                order: {
                    longitude: '',
                    latitude: '',
                    start_status: '',
                    divi: ''
                }
            },

            options: '',
            polyline: [],
            openid: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        console.log(options);
        this.getData(options);
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
        formSubmit(e) {
            console.log(e);
            app.globalData.util.request({
                url: 'entry/wxapp/OrderGet',
                data: {
                    id: this.options.id,
                    openid: uni.getStorageSync('openid'),
                    lon: uni.getStorageSync('city').location.lng,
                    lat: uni.getStorageSync('city').location.lat
                },

                success(res) {
                    uni.showToast({
                        title: res.data.message
                    });
                    uni.navigateTo({
                        url: '/wx_tx/pages/myorder/index'
                    });
                }
            });
        },

        getData(options) {
            const self = this;
            this.setData({
                options: options
            });
            app.globalData.util.request({
                url: 'entry/wxapp/Orderinfo',
                data: {
                    id: options.id,
                    openid: uni.getStorageSync('openid'),
                    lon: uni.getStorageSync('city').location.lng,
                    lat: uni.getStorageSync('city').location.lat
                },

                success(res) {
                    console.log(res.data.data);
                    self.setData({
                        detail: res.data.data,
                        markers: [
                            {
                                iconPath: '/static/wx_tx/resource/images/location.png',
                                id: 0,
                                latitude: res.data.data.latitude,
                                longitude: res.data.data.longitude,
                                width: 50,
                                height: 50
                            }
                        ],
                        polyline: [
                            {
                                points: [
                                    {
                                        latitude: res.data.data.latitude,
                                        longitude: res.data.data.longitude
                                    },
                                    {
                                        latitude: res.data.data.latitude - 10,
                                        longitude: res.data.data.longitude
                                    }
                                ],
                                color: '#FF0000DD',
                                width: 2,
                                dottedLine: true
                            }
                        ]
                    });
                }
            });
        },

        controltap() {
            console.log('占位：函数 controltap 未声明');
        }
    }
};
</script>
<style>
page {
    background: #f3f3f3;
}
.container .block {
    padding: 20rpx;
    margin-top: 10rpx;
    position: relative;
    z-index: 200;
    background-color: #fff;
}
.container .block.top {
    margin-top: -30rpx;
    border-radius: 10rpx 10rpx 0 0;
}
.title {
    display: flex;
    justify-content: space-between;
    font-size: 28rpx;
}

.title .status {
    color: #64edac;
}
.price {
    color: #64edac;
    font-size: 32rpx;
    margin: 20rpx 0;
}
.footer {
    display: flex;
    justify-content: space-between;
}
.footer .sm {
    flex: 1;
}
.footer .sm .ct {
    font-size: 24rpx;
    color: #ccc;
    margin-bottom: 5rpx;
}
.footer .sm .cw {
    font-size: 32rpx;
    color: #000;
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
.useinfo {
    display: flex;
}
.useinfo .head {
    width: 80rpx;
    height: 80rpx;
    background-size: cover;
    background-position: center;
    margin-right: 20rpx;
    border-radius: 50%;
}
.useinfo .user .t1 {
    font-size: 28rpx;
}
.useinfo .user .t2 {
    color: #ccc;
}

.detail .sm {
    margin: 10rpx 0;
    font-size: 28rpx;
}
.detail .item {
    margin-bottom: 15rpx;
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
