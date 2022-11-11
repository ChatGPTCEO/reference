<template>
    <block>
        <cu-custom bgColor="bgmain" :isBack="true">
            <view slot="content">分类列表</view>
        </cu-custom>

        <view class="search_bg">
            <view class="search_box">
                <input @input="inputVal" placeholder="输入您要搜索的内容" />
                <view class="search_icon">
                    <text class="cuIcon-titles" style="font-size: 36rpx !important; color: #d2d2d2"></text>
                    <text @tap="search" class="cuIcon-search text-black"></text>
                </view>
            </view>
        </view>
        <!-- 分类列表 -->
        <view class="cate_box">
            <view :class="'cate_item ' + (current_cate == 9999 ? 'cate_active' : '')" @tap="changeTab" data-index="9999" data-id="9999">全部</view>
            <block v-for="(item, index) in cateList" :key="index">
                <view :class="'cate_item ' + (current_cate == item.id ? 'cate_active' : '')" @tap="changeTab" :data-index="index" :data-id="item.id">
                    {{ item.title }}
                </view>
            </block>
        </view>

        <!-- 商品列表 -->
        <view class="goods_line">
            <block v-for="(item, index) in goodsList" :key="index">
                <view class="goods_item" @tap="toDetail" :data-id="item.m_id">
                    <image :src="item.image" mode="aspectFill"></image>
                    <view class="name">{{ item.title }}</view>
                    <view class="price">
                        <view class="price_item">￥{{ item.pay }}</view>
                        <view class="">￥{{ item.price }}</view>
                    </view>
                    <view class="userInfo">
                        <view class="left">
                            <image :src="item.avatar" class="avatar"></image>
                            <view class="nickname">{{ item.nickname }}</view>
                        </view>
                        <view>
                            <text class="cuIcon-likefill text-orange"></text>
                            {{ item.con }}人喜欢
                        </view>
                    </view>
                </view>
            </block>
        </view>

        <view v-if="!loadmore" class="nomore">暂无更多数据~</view>
    </block>
</template>

<script>
// gc_school/pages/secondhand/cate.js
var app = getApp();
export default {
    data() {
        return {
            currentIndex: 0,
            goodsList: [],
            loadmore: true,
            page: 1,
            current_cate: 9999,
            name: '',
            cateList: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        if (options.id) {
            this.setData({
                current_cate: options.id
            });
        }

        console.log(options);
        this.getCate();
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
        this.setData({
            page: this.page + 1
        });

        if (this.loadmore) {
            this.getGoods();
        }
    },
    /**
     * 用户点击右上角分享
     */ methods: {
        //分类切换
        changeTab(e) {
            this.setData({
                current_cate: e.currentTarget.dataset.id,
                page: 1,
                loadmore: true,
				goodsList:[]
            });
            this.getGoods();
        },

        //文本框输入
        inputVal(e) {
            console.log(e.detail.value);
            this.setData({
                name: e.detail.value
            });
        },

        //进入详情
        toDetail(e) {
			console.log(e)
            uni.navigateTo({
                url: '/gc_school/pages/secondhand/detail?id=' + e.currentTarget.dataset.id
            });
        },

        //搜索
        search() {
            this.setData({
                current_cate: -1,
                loadmore: true,
                page: 1,
				goodsList:[]
            });
            this.getGoods();
        },

        //获取分类列表
        getCate() {
            var self = this;
            app.globalData.util.request({
                url: 'Dmhmarketcategory/index',
                data: {
                    s_id: uni.getStorageSync('schoolId')
                },

                success(res) {
                    console.log(res.data.data);
                    self.setData({
                        cateList: res.data.data.list
                    });
                    self.getGoods();
                }
            });
        },

        //获取商品列表
        getGoods() {
            var self = this;

            if (self.current_cate == 9999) {
                var param = {
                    page: self.page,
                    s_id: uni.getStorageSync('schoolId'),
                    type: 1
                };
            } else {
                if (self.current_cate == -1) {
                    var param = {
                        page: self.page,
                        s_id: uni.getStorageSync('schoolId'),
                        keywords: self.name,
                        type: 3
                    };
                } else {
                    var param = {
                        page: self.page,
                        s_id: uni.getStorageSync('schoolId'),
                        cid: self.current_cate,
                        // cid:self.data.cateList[self.data.current_cate].id,
                        type: 2
                    };
                }
            }

            app.globalData.util.request({
                url: 'Dmhmarketgoods/index',
                data: param,

                success(res) {
					console.log("打印列表",res.data.data)
                    if (res.data.data.list.length < 10) {
                        self.setData({
                            loadmore: false
                        });
                    }

                    // if (this.page == 1) {
                    //     self.setData({
                    //         goodsList: res.data.data.list
                    //     });
                    // } else {
						// self.goodsList = [];
                        for (var i = 0; i < res.data.data.list.length; i++) {
                            self.setData({
                                goodsList: [...self.goodsList, res.data.data.list[i]]
                            });
                        // }
                    } // console.log(res.data.data)
                    // self.setData({
                    //   goodsList:res.data.data
                    // })
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
.bgmain {
    background-color: #ff6444;
    color: white;
}
.search_bg {
    /* background-color: #FF6444; */
    padding: 30rpx;
}
.search_box {
    display: flex;
    background: white;
    border-radius: 10rpx;
    justify-content: space-around;
    line-height: 70rpx;
    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.07);
}
.search_box input {
    background-color: white;
    border-radius: 10rpx;
    line-height: 70rpx;
    height: 70rpx;
    padding-left: 10rpx;
    width: 80%;
}
.cuIcon-search {
    font-size: 34rpx;
}
/* 分类列表 */
.cate_box {
    display: flex;
    overflow: scroll;
}
.cate_item {
    width: 25%;
    text-align: center;
    flex-shrink: 0;
    font-size: 30rpx;
}

/* 商品列表 */
.goods_line {
    display: flex;
    justify-content: space-between;
    margin-top: 20rpx;
    flex-flow: wrap;
    padding: 0 30rpx 30rpx;
}
.goods_item {
    /* padding: 20rpx 20rpx 30rpx; */
    width: 48%;
    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.07);
    border: 10rpx;
    margin-top: 20rpx;
    border-radius: 10rpx;
}
.goods_item image {
    width: 100%;
    height: 300rpx;
    border-top-left-radius: 10rpx;
    border-top-right-radius: 10rpx;
}
.goods_item .name {
    padding: 10rpx 20rpx 10rpx;
    font-size: 30rpx;
}
.goods_item .price {
    padding: 0rpx 20rpx 10rpx;
    display: flex;
    justify-content: space-between;
    color: #919191;

    font-size: 28rpx;
}
.goods_item .price view {
    text-decoration: line-through;
}
.goods_item .price .price_item {
    color: #ff6344 !important;
    text-decoration: none !important;
    font-weight: bold;
    font-size: 30rpx !important;
}
.goods_item .userInfo {
    padding: 10rpx 20rpx 10rpx;
    display: flex;
    font-size: 22rpx;
    align-items: center;
    justify-content: space-between;
}
.goods_item .userInfo .left {
    display: flex;
    align-items: center;
}
.goods_item .userInfo .avatar {
    width: 35rpx;
    height: 35rpx;
    border-radius: 50%;
    margin-right: 10rpx;
}

.cate_active {
    color: #ff6344;
}

.nomore {
    text-align: center;
    font-size: 30rpx;
}
</style>
