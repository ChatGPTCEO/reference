<template>
    <block>
        <!-- gc_school/pages/shop/goods.wxml -->
        <cu-custom bgColor="bgmain" :isBack="true">
            <view slot="content">商品管理</view>
        </cu-custom>

        <view class="padding">
            <view class="menu flex">
                <view :class="'menu_item ' + (tab_index == 1 ? 'active' : '')" @tap="changeTab" data-index="1">出售中</view>
                <view :class="'menu_item ' + (tab_index == 2 ? 'active' : '')" @tap="changeTab" data-index="2">未发布</view>
                <view :class="'menu_item ' + (tab_index == 0 ? 'active' : '')" @tap="changeTab" data-index="0">已下架</view>
            </view>

            <block v-if="goods.length > 0">
                <block v-for="(item, index) in goods" :key="item.indexs">
                    <view class="goods">
                        <view class="flex">
                            <image class="goods_img" :src="item.goods_img"></image>
                            <view style="" class="justify-between right_info">
                                <view class="name text-bold">{{ item.goods_name }}</view>
                                <!-- <view class="stock">库存：1200件</view> -->
                                <view class="flex align-center justify-between">
                                    <view class="price">￥{{ item.price }}</view>
                                    <view class="edit_box">
                                        <image
                                            class="xiajia"
                                            v-if="tab_index == 1"
                                            src="/static/images/store/xiajia_.png"
                                            @tap="changeStatus"
                                            :data-id="item.id"
                                            data-status="0"
                                        ></image>
                                        <image
                                            class="xiajia"
                                            v-if="tab_index == 2"
                                            src="/static/images/store/fabu_.png"
                                            @tap="changeStatus"
                                            :data-id="item.id"
                                            data-status="1"
                                        ></image>
                                        <image
                                            class="xiajia"
                                            v-if="tab_index == 0"
                                            src="/static/images/store/shangjia_.png"
                                            @tap="changeStatus"
                                            :data-id="item.id"
                                            data-status="1"
                                        ></image>
                                        <image class="edit" @tap="jump" :data-url="'/gc_school/pages/shop/addgoods?id=' + item.id" src="/static/images/store/edit.png"></image>
                                        <!-- 编辑 -->
                                    </view>
                                </view>
                            </view>
                        </view>
                        <!-- <view class="operate flex align-center text-center justify-center" wx:if="{{tab_index==0}}" bindtap="changeStatus" data-id="{{item.id}}" data-status="-1">
          <image class="" src="../../../images/store/xiajia.png"></image>下架
        </view> -->
                        <!-- <view class="operate flex align-center text-center justify-center fabu" wx:if="{{tab_index==1}}" bindtap="changeStatus" data-id="{{item.id}}" data-status="1">
          <image class="" src="../../../images/store/fabu.png"></image>发布
        </view>
        <view class="operate flex align-center text-center justify-center fabu" wx:if="{{tab_index==2}}" bindtap="changeStatus" data-id="{{item.id}}" data-status="1">
          <image class="" src="../../../images/store/shangjia.png"></image>上架
        </view> -->
                    </view>
                </block>
            </block>

            <block v-else>
                <view class="empty">
                    <image class="" src="/static/images/store/empty.png" mode="widthFix"></image>
                    <view>暂无相关数据~</view>
                </view>
            </block>

            <view class="text-df text-center margin-top" v-if="!is_loadmore[tab_index] && goods.length > 0">暂无更多数据~</view>
        </view>

        <image @tap="jump" data-url="/gc_school/pages/shop/addgoods" src="/static/images/store/add.png" class="add"></image>
    </block>
</template>

<script>
// gc_school/pages/shop/goods.js
var app = getApp();
export default {
    data() {
        return {
            tab_index: 1,
            page: 1,
            is_loadmore: [true, true, true],
            goods: []
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        this.getGoods();
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
    // onShareAppMessage: function () {
    // }
    onReachBottom: function () {
        // console.log()
        if (this.is_loadmore[this.tab_index]) {
            var page = this.page + 1;
            this.setData({
                page: page
            });
            console.log('页码', this.page);
            this.getGoods();
        }
    },
    /**
     * 用户点击右上角分享
     */ methods: {
        getGoods() {
            var that = this;
            app.globalData.util.request({
                url: 'ZhGoods/index',
				method: 'GET',
                data: {
                    s_id: uni.getStorageSync('schoolId'),
                    page: this.page,
                    status: this.tab_index
                },

                success(res) {
                    console.log(res.data.data);
                    console.log('长度', res.data.data.list.length);

                    if (res.data.data.list.length < 5) {
                        var loadmore = that.is_loadmore;
                        loadmore[that.tab_index] = false;
                        console.log('loadmore', loadmore);
                        that.setData({
                            is_loadmore: loadmore
                        });
                    }

                    var data = [...that.goods, ...res.data.data.list];
                    that.setData({
                        goods: data //   cate_id:res.data.data[0].id
                    });
                }
            },true);
        },

        changeTab(e) {
            console.log(e.currentTarget.dataset);
            this.setData({
                tab_index: e.currentTarget.dataset.index,
                page: 1,
                goods: [],
                is_loadmore: [true, true, true]
            });
            this.getGoods();
        },

        jump(e) {
            console.log(e.currentTarget.dataset.url);
            uni.navigateTo({
                url: e.currentTarget.dataset.url
            });
        },

        //改变商品状态
        changeStatus(e) {
            var that = this;
            console.log(e.currentTarget.dataset);
            uni.showModal({
                title: '温馨提示',
                content: '确定执行该操作吗？',

                success(confirm) {
                    if (confirm.confirm) {
                        app.globalData.util.request({
                            url: 'ZhGoods/goodShelves',
                            data: {
                                id: e.currentTarget.dataset.id,
                                status: e.currentTarget.dataset.status,
                                s_id: uni.getStorageSync('schoolId')
                            },

                            success(res) {
                                that.setData({
                                    page: 1,
                                    goods: [],
                                    is_loadmore: [true, true, true]
                                });
                                that.getGoods();
                            }
                        },true);
                        console.log('用户点了确认');
                    } else {
                        console.log('用户点了取消');
                    }
                }
            });
        }
    }
};
</script>
<style>
/* gc_school/pages/shop/goods.wxss */
page {
    background: #f9f9f9;
}
.menu {
    background: white;
    /* padding: 20rpx 0; */
    border-radius: 10rpx;
    justify-content: space-around;
}
.menu_item {
    line-height: 80rpx;
    width: 33.3%;
    font-size: 30rpx;
    text-align: center;
    text-align: center;
    color: #91a2ab;
}
.active {
    background: #ff6344;
    border-radius: 10rpx;
    color: white;
}

.goods {
    background: white;
    border-radius: 10rpx;
    margin-top: 40rpx;
    padding: 30rpx;
}
.goods .goods_img {
    width: 180rpx;
    height: 180rpx;
    border-radius: 20rpx;
    flex-shrink: 0;
    margin-right: 20rpx;
}
.goods .right_info {
    width: 100%;
    display: flex;
    flex-direction: column;
}
.goods .name {
    color: #141414;
    font-size: 31rpx;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.goods .stock {
    color: #91a2ab;
    font-size: 26rpx;
    line-height: 50rpx;
}
.goods .price {
    color: #ff6344;
    font-size: 38rpx;
    font-weight: bold;
}
.edit_box {
    /* background: #FFEEEA; */
    padding: 10rpx 20rpx;
    color: #ff6344;
    font-size: 28rpx;
    align-items: center;
    display: flex;
    border-radius: 10rpx;
}
.edit {
    width: 30rpx !important;
    height: 30rpx !important;
    /* margin-right: 10rpx !important; */
}
.operate {
    background: #00bb69;
    color: white;
    height: 80rpx;
    margin-top: 50rpx;
    text-align: center;
    font-size: 32rpx;
    line-height: 80rpx;
    border-radius: 10rpx;
}
.operate image {
    width: 33rpx;
    height: 33rpx;
    margin-right: 10rpx;
}
.fabu {
    background: #ff6344;
}
.add {
    width: 110rpx;
    height: 110rpx;
    position: fixed;
    right: 0;
    bottom: 40%;
}
.empty {
    margin: 100rpx auto;
    text-align: center;
    font-size: 30rpx;
    color: gray;
}
.empty image {
    width: 300rpx;
    /* height: 200rpx; */
}
.xiajia {
    width: 48rpx !important;
    height: 48rpx !important;
    margin-right: 30rpx;
}
</style>
