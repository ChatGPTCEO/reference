<template>
    <block>
        <cu-custom bgColor="bgmain" :isBack="true">
            <view slot="content">提现记录</view>
        </cu-custom>

        <view class="container">
            <view class="grid radius col-1">
                <view class="radius">
                    <view class="radius light">
                        <view class="cu-list menu">
                            <view class="cu-item" v-for="(item, index) in list" :key="index">
                                <view class="content" >
                                    <view>
                                        <text class="text-df" v-if="item.status==1">审核中</text>
                                        <text class="text-df" v-if="item.status==2">提现成功</text>
                                        <text class="text-df" v-if="item.status==3">提现拒绝</text>
                                    </view>
                                    <view>
                                        <text class="text-sm">{{ item.create_time | formatDate }}</text>
                                    </view>
                                </view>

                                <view class="action">
                                    <text class="text-grey text-df">¥{{ item.price }}</text>
                                </view>
                            </view>
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
            page: 1,
            showNodata: false,
            erranderId: 2,

            address: {
                available: []
            },

            loadmore: true,
            list: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
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
    onReachBottom: function () {
        this.setData({
            page: this.page + 1
        });

        if (this.loadmore) {
            this.getData();
        }
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {
		
		

        getData() {
            var self = this;
            app.globalData.util.request({
                url: 'UserWithdraw/index',
                data: {
					limit:20,
                    page: this.page,
                    s_id: uni.getStorageSync('schoolId'),
                },
                success(res) {
                    if (res.data.data.list.length < 20) {
                        self.setData({
                            loadmore: false
                        });
                    }

                    if (this.page == 1) {
                        self.setData({
                            list: res.data.data.list
                        });
                    } else {
                        for (var i = 0; i < res.data.data.list.length; i++) {
                            self.setData({
                                list: [...self.list, res.data.data.list[i]]
                            });
                        }
                    }
                }
            },true);
        },

        handleUser(e) {
            var pages = getCurrentPages(); //获取当前页面信息栈

            var prevPage = pages[pages.length - 2];

            if (prevPage.route == 'gc_school/pages/public/index') {
                uni.navigateBack({
                    cupon: e.currentTarget.dataset.id
                });
            } else {
                uni.navigateBack();
            }
        }
    },
};
</script>
<style>
.cuIcon-back {
    color: black;
}
</style>
