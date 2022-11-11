<template>
    <block>
        <cu-custom bgColor="bgmain" :isBack="true">
            <view slot="content">商品列表</view>
        </cu-custom>
        <view class="store-container">
            <view class="food">
                <view class="food-class" :style="'height:' + listHeight + 'px'">
                    <scroll-view scroll-y scroll-with-animation :scroll-into-view="viewToLeft" :style="'height:' + listHeight + 'px'">
                        <view
                            :class="'food-class-item ' + (activeIndex == index ? 'active' : '')"
                            @tap="selectFood"
                            :data-index="index"
                            :data-titleId="item.titleId"
                            :id="item.titleId + 'left'"
                            v-for="(item, index) in food"
                            :key="item.title"
                        >
                            <view class="text" :data-index="index" :data-titleId="item.titleId">{{ item.goods_type_name }}</view>

                            <view class="dot" v-if="item.foodCount > 0">{{ item.foodCount }}</view>
                        </view>
                    </scroll-view>
                </view>
                <view class="food-detail">
                    <scroll-view scroll-y scroll-with-animation :style="'height:' + listHeight + 'px;padding-bottom:110rpx;'" :scroll-into-view="viewTo" @scroll="scroll">
                        <view class="title-group" v-for="(item, groupindex) in food" :key="item.name">
                            <view class="title" :id="item.titleId">{{ item.goods_type_name }}</view>

                            <view class="food-info" v-for="(item, index) in item.items" :key="item.goodId">
                                <view class="img">
                                    <image :src="item.goods_img" @tap="preview" :data-url="item.goods_img"></image>
                                    <!-- <image src='/images/store.png'></image> -->
                                </view>

                                <view class="info">
                                    <view class="name">{{ item.goods_name }}</view>
                                    <view class="price-count">
                                        <view class="price">￥{{ item.price }}</view>
                                        <view class="count">
                                            <view class="add btns" @tap="add" :data-item="item" :data-groupindex="groupindex" :data-index="index">+</view>
                                            <view class="num">{{ item.count }}</view>
                                            <view
                                                class="ruduce btns"
                                                @tap="reduce"
                                                :data-item="item"
                                                v-if="item.count > 0 ? true : false"
                                                :data-groupindex="groupindex"
                                                :data-index="index"
                                            >
                                                -
                                            </view>
                                        </view>
                                    </view>
                                </view>
                            </view>
                        </view>
                         <view class="notData" v-if="food.length==0">
                             <image
                                class="icon"
                                 src="/static/icon/notData.png"
                                 mode="widthFix"
                             />
                            暂无商品
                        </view>
                        <!-- <view wx:for="{{food}}" wx:key="item.name" class="title-group" wx:for-index="groupindex">
          <view class='title' id='{{item.titleId}}'>{{item.name}}</view>
          <view wx:for="{{item.items}}" wx:key="item.goodId" class='food-info' wx:for-index="index">
            <view class='img'>
              <image src='{{item.img}}' bindtap="preview" data-url="{{item.img}}"></image>
            </view>
            <view class='info'>
              <view class='name'>{{item.name}}</view>
              <view class='price-count'>
                <view class='price'>￥{{item.price}}</view>
                <view class='count'>
                  <view class='add btns' bindtap="add" data-item="{{item}}" data-groupindex="{{groupindex}}" data-index="{{index}}">+</view>
                  <view class='num'>{{item.count}}</view>
                  <view class='ruduce btns' bindtap="reduce" data-item="{{item}}" wx:if="{{item.count>0?true:false}}"
                    data-groupindex="{{groupindex}}" data-index="{{index}}">-</view>
                </view>
              </view>
            </view>
          </view>
        </view> -->
                    </scroll-view>
                </view>
            </view>
            <view class="cart">
                <view class="cart-container">
                    <view :class="'cart-img ' + (cart.length > 0 ? 'has-food' : '')" @tap="listCart">
                        <image :src="cart.length > 0 ? '/static/images/gouwuche-black.png' : '/static/images/gouwuche.png'"></image>
                    </view>
                    <view class="del-price-money">
                        <view class="money">￥{{ totalMoney }}</view>
                    </view>
                    <view v-if="status == 2 || time_status == 0" class="start-del end">已打烊</view>
					<!-- parseEventDynamicCode -->
                    <view v-else @click="check" :class="'start-del ' + (totalMoney >= starting_fee && cart.length > 0 ? 'has-food' : '')">
                        {{ totalMoney >= starting_fee && cart.length > 0 ? '去结算' : '起送费'+starting_fee }}
                    </view>
                </view>
                <view class="cart-list" v-if="showCart">
                    <view class="cart-list-header" @tap="listCart">关闭</view>
                    <view class="cart-list-item">
                        <view class="item" v-for="(item, index) in cart" :key="index">
                            <view class="cart-detail">{{ item.goods_name }}</view>

                            <view class="cart-detail" style="color: red">￥{{ item.price }}</view>

                            <view class="cart-detail cart-count">
                                <view class="add btns" @tap="reduce" :data-id="item.id" :data-groupindex="item.groupindex" :data-index="item.index">-</view>
                                {{ item.count }}
                                <view class="add btns" @tap="add" :data-id="item.id" :data-groupindex="item.groupindex" :data-index="item.index">+</view>
                            </view>
                        </view>
                       
                    </view>
                </view>
            </view>
        </view>
    </block>
</template>

<script>
// pages/store/store.js
var app = getApp();
let timer;
export default {
    data() {
        return {
            viewTo: '',
            viewToLeft: '',
            listHeight: 650,
            activeIndex: 0,
            tabIndex: 0,
            showModal: false,
            showCart: false,
            heigthArr: [],
            cart: [],
            result: [],
            totalMoney: 0,
            food: '',
            status: '',
            time_status: '',
            groupindex: 0,
			starting_fee:0
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        var that = this;
        uni.setStorageSync('store_id', options.id);
        app.globalData.util.request({
            url: 'ZhGoods/getBusinessGoods',
			method: 'GET',
            data: {
                business_id: options.id,
                type: 1,
				s_id: uni.getStorageSync('schoolId')
            },

            success(res) {
                console.log(res);
                that.setData({
                    food: res.data.data.goods,
                    status: res.data.data.status,
                    time_status: res.data.data.time_status,
					starting_fee: res.data.data.starting_fee,
                });
            }
        },true); // wx.setNavigationBarTitle({
        //   title: this.data.storeInfo.storeName
        // });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        let height1;
        let height2;
        let res = uni.getSystemInfoSync();
        let winHeight = res.windowHeight;
        let query = uni.createSelectorQuery();
        query.select('.cu-custom').boundingClientRect();
        console.log('这里', query.select('.cu-custom').boundingClientRect());
        this.setData({
            listHeight: winHeight - uni.getStorageSync('CustomBar') // listHeight: winHeight-170
            // listHeight: winHeight - height1 - height2
        }); // query.exec(res => {
        //   console.log("高度",res)
        //   height1 = res[0].height;
        //   let query1 = wx.createSelectorQuery();
        //   query1.select(".tab").boundingClientRect();
        //   query1.exec(res => {
        //     // height2 = res[0].height;
        //     this.setData({
        //       listHeight: winHeight-wx.getStorageSync('CustomBar')
        //       // listHeight: winHeight-170
        //       // listHeight: winHeight - height1 - height2
        //     });
        //     this.calculateHeight();
        //   });
        // });
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
        preview(e) {
            var tmp = [];
            tmp.push(e.target.dataset.url);
            var current = e.target.dataset.url;
            uni.previewImage({
                current: current,
                // 当前显示图片的http链接
                urls: tmp // 需要预览的图片http链接列表
            });
        },

        selectFood(e) {
            console.log('ji', e.target);
            this.setData({
                activeIndex: e.target.dataset.index,
                viewTo: e.target.dataset.titleid
            });
        },

        calculateHeight() {
            let heigthArr = [];
            let height = 0;
            heigthArr.push(height);
            var query = uni.createSelectorQuery();
            query.selectAll('.title-group').boundingClientRect();
            query.exec((res) => {
                for (let i = 0; i < res[0].length; i++) {
                    console.log(res[0][i]);
                    height += parseInt(res[0][i].height);
                    heigthArr.push(height);
                }

                this.setData({
                    heigthArr: heigthArr
                });
            });
        },

        // 手机端有延迟 节流函数效果不好 用防抖函数凑合
        scroll(e) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                let srollTop = e.detail.scrollTop;

                for (let i = 0; i < this.heigthArr.length; i++) {
                    if (srollTop >= this.heigthArr[i] && srollTop < this.heigthArr[i + 1] && this.activeIndex != i) {
                        this.setData({
                            activeIndex: i
                        });

                        if (i < 3) {
                            this.setData({
                                viewToLeft: 'title1left'
                            });
                        } else {
                            this.setData({
                                viewToLeft: 'title' + (i - 2) + 'left'
                            });
                        }

                        return;
                    }
                }
            }, 100);
        },

        add(e) {
            let groupindex = e.target.dataset.groupindex;
            let index = e.target.dataset.index;
            let countMsg = 'food[' + groupindex + '].items[' + index + '].count';
            let count = this.food[groupindex].items[index].count;
            let foodCountMsg = 'food[' + groupindex + '].foodCount';
            let foodCount = this.food[groupindex].foodCount;
            let foodId = this.food[groupindex].items[index].foodId;
            count += 1;
            foodCount += 1;
            this.food[groupindex].foodCount = foodCount;
            this.food[groupindex].items[index].count = count;
            let cart = this.cart;
            console.log('购物车', cart);
            let hasCart = false;
            var object = {};
            var result = this.result;

            for (var i = 0; i < cart.length; i++) {
                if (cart[i].foodId == foodId) {
                    hasCart = true;
                    break;
                }
            }

            if (hasCart) {
                cart[i].count++;
                result[i].nums++;
            } else {
                cart.push({ ...this.food[groupindex].items[index], groupindex, index });
                object.ids = this.food[groupindex].items[index].id;
                object.nums = this.food[groupindex].items[index].count;
                result.push(object);
            }

            let totalMoney = this.totalMoney;
            totalMoney = parseFloat(totalMoney) + parseFloat(this.food[groupindex].items[index].price);
            totalMoney = totalMoney.toFixed(2);
            console.log('商品', cart); // console.log("总额", totalMoney)
            // console.log("价格", this.data.food[groupindex].items[index].price);
            // console.log("单个商品", this.data.food[groupindex].items[index])
            // if (list[i].num > 0) {
            // }

            console.log(result);
            this.setData({
                cart: cart,
                totalMoney: totalMoney
            });
        },

        reduce(e) {
            let groupindex = e.target.dataset.groupindex;
            let index = e.target.dataset.index;
            var result = this.result;
            let countMsg = 'food[' + groupindex + '].items[' + index + '].count';
            let count = this.food[groupindex].items[index].count;
            let foodCountMsg = 'food[' + groupindex + '].foodCount';
            let foodCount = this.food[groupindex].foodCount;
            let foodId = this.food[groupindex].items[index].foodId;
            count -= 1;
            foodCount -= 1;
            this.food[groupindex].foodCount = foodCount;
            this.food[groupindex].items[index].count = count;
            let cart = this.cart;

            for (var i = 0; i < cart.length; i++) {
                if (cart[i].foodId == foodId) {
                    if (cart[i].count == 1) {
                        cart.splice(i, 1);
                        result.splice(i, 1);
                    } else {
                        cart[i].count--;
                        result[i].nums--;
                    }

                    break;
                }
            }

            if (cart.length == 0) {
                this.setData({
                    showCart: !this.showCart
                });
            }

            let totalMoney = this.totalMoney;
            totalMoney = (totalMoney - this.food[groupindex].items[index].price).toFixed(2);
            this.setData({
                cart: cart,
                totalMoney: totalMoney
            });
        },

        check() {
			if((Number(this.totalMoney) < Number(this.starting_fee)) || this.cart.length < 0){
				uni.showToast({
					title:'未满起送费',
					icon:'none'
				})
				return false
			}
            var that = this;
            uni.setStorageSync('json', that.result);
			uni.navigateTo({
				url:'/gc_school/pages/public/index?type=3&id='
			})
            // uni.navigateBack({
            //     delta: 2
            // });
            console.log('结算商品', that.result);
        },

        listCart() {
            if (this.cart.length > 0) {
                this.setData({
                    showCart: !this.showCart
                });
            }
        },

        selectTabItem(e) {
            if (e.target.dataset.index) {
                this.setData({
                    tabIndex: e.target.dataset.index
                });
            }
        },

        preventScrollSwiper() {
            return false;
        },

        showStoreDetail() {
            this.setData({
                showModal: true
            });
        },

        closeModal(e) {
            this.setData({
                showModal: false
            });
        }
    }
};
</script>
<style lang="scss">
    

page {
    background-color: #fff;
}
.notData{
    display:flex;
    align-items: center;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    .icon{
        width: 80%;
        filter:grayscale(100);
    }
}


.head {
    height: 0rpx;
    /* background: #333; */
    color: #fff;
    display: flex;
}

.head .head-img {
    width: 200rpx;
}

.head .head-img image {
    margin: 18rpx;
    width: 160rpx;
    height: 160rpx;
    border-radius: 20rpx;
}

.head .head-detail {
    flex-grow: 1;
    font-size: 26rpx;
}

.head .head-detail .info {
    height: 60rpx;
    line-height: 60rpx;
}

.head .head-detail .info text {
    border-right: 1rpx solid #eee;
    padding: 0 10rpx;
}

.head .head-detail .info text:last-child {
    border: none;
}

.head .head-detail .publicMsg {
    width: 500rpx;
    height: 60rpx;
    line-height: 60rpx;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.head .actives {
    height: 60rpx;
}

.head .item {
    width: 500rpx;
    height: 60rpx;
    line-height: 60rpx;
    display: flex;
    flex-wrap: wrap;
}

.head .active-icon {
    width: 40rpx;
    height: 40rpx;
    line-height: 40rpx;
    margin-top: 10rpx;
    color: #fff;
    text-align: center;
    margin-right: 10rpx;
}

.head .active-text {
    width: 450rpx;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.manjian {
    background-color: #ff8dc1;
}

.xindian {
    background-color: #75fb6d;
}

.zhekou {
    background-color: #ff111a;
}

.daijinquan {
    background-color: #fbd305;
}

.xinyonghu {
    background-color: #f93fe9;
}

.peisong {
    background-color: #67e1ef;
}

.lingdaijin {
    background-color: #56fb43;
}

.zengsong {
    background-color: #fd86ed;
}

.tab {
    height: 8rpx;
    border-bottom: 2rpx solid #eee;
    display: flex;
    position: relative;
}

.tab .tab-item {
    width: 160rpx;
    line-height: 78rpx;
    text-align: center;
}

.tab .border {
    position: absolute;
    width: 100rpx;
    height: 4rpx;
    background-color: #ffd161;
    top: 76rpx;
    left: 30rpx;
    transition: all 0.5s;
}

.food {
    display: flex;
    height: 100%;
    border-top: 1px solid #eee;
}

.food-class {
    background-color: #f5f9fc;
    /* background-color: #eee; */
    width: 180rpx;
}

.food-class .active {
    background-color: #fff;
}

.food-class .food-class-item {
    position: relative;
    height: 100rpx;
    box-sizing: border-box;
    padding: 10rpx 20rpx;
    font-size: 28rpx;
    line-height: 40rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 180rpx;
}

.food-class .food-class-item:last-child {
    margin-bottom: 120rpx;
}

.food-class .food-class-item .text {
    text-align: center;
    max-height: 80rpx;
    overflow: hidden;
}

.food-class .food-class-item .dot {
    position: absolute;
    width: 30rpx;
    height: 30rpx;
    text-align: center;
    line-height: 30rpx;
    background-color: red;
    right: 4rpx;
    top: 4rpx;
    border-radius: 50%;
    color: #fff;
    font-size: 20rpx;
}

.food-detail {
    flex-grow: 1;
    padding: 0 14rpx;
    font-size: 26rpx;
}

.food-detail .title {
    font-weight: 700;
    padding: 0 20rpx;
    margin-bottom: 20rpx;
    height: 50rpx;
    line-height: 50rpx;
    /* background-color: #eee; */
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-top: 30rpx;
}

.food-detail .title-group {
    padding-bottom: 30rpx;
}

.food-detail .title-group:last-child {
    margin-bottom: 120rpx;
}

::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
}

.food-info {
    margin-bottom: 30rpx;
    display: flex;
}

.food-info:last-child {
    margin-bottom: 0;
}

.food-info .img {
    width: 120rpx;
    text-align: center;
}

.food-info .img image {
    width: 100rpx;
    height: 100rpx;
    border-radius: 15rpx;
}

.food-info .info {
    flex-grow: 1;
    margin-left: 10rpx;
}

.info .name {
    font-size: 28rpx;
    /* font-weight: 700; */
}

.info .note {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.price-count {
    display: flex;
    height: 50rpx;
    line-height: 50rpx;
}

.price-count .price {
    font-size: 30rpx;
    flex-grow: 1;
    color: red;
}

.price-count .count {
    display: flex;
    line-height: 60rpx;
    flex-grow: 1;
    flex-direction: row-reverse;
}

.price-count .count .num {
    line-height: 50rpx;
    font-size: 30rpx;
}

.btns {
    width: 50rpx;
    height: 50rpx;
    border-radius: 50%;
    font-size: 40rpx;
    font-weight: 700;
    color: black;
    text-align: center;
    line-height: 50rpx;
    background-color: #ffd161;
    margin: 0 16rpx;
}

.cart {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 110rpx;
    line-height: 110rpx;
    background-color: black;
    /* background-color: #333; */
    /* background-color: #17A9EE; */
}

.cart .cart-container {
    display: flex;
    position: relative;
    color: #eee;
}

.cart .del-price-money {
    flex-grow: 1;
    font-size: 28rpx;
    padding-left: 140rpx;
    display: flex;
    flex-direction: column;
}

.cart .del-price-money .money {
    font-size: 36rpx;
    height: 60rpx;
    /* line-height: 60rpx; */
    line-height: 110rpx;
}

.cart .del-price-money .del-price {
    font-size: 24rpx;
    height: 30rpx;
    line-height: 30rpx;
}

.cart .start-del {
    width: 200rpx;
    font-weight: 700;
    font-size: 30rpx;
    text-align: center;
    color: gray;
    /* color: hsla(0,0%,40%,.5); */
    background-image: linear-gradient(-135deg, #fff5ca, #fff2cc);
    /* background-color: #2f2f2f; */
    /* background-color: #17A9EE; */
}

.cart .cart-img {
    position: absolute;
    top: -24rpx;
    left: 20rpx;
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    background-color: #666;
    text-align: center;
    z-index: 9;
}

.cart .cart-img image {
    width: 60rpx;
    height: 60rpx;
    vertical-align: middle;
    margin-bottom: 20rpx;
}

.cart .has-food {
    color: #333;
    background-image: linear-gradient(134deg, #ffde87, #ffc400);
    /* background-color: #ffd161; */
}

.cart .cart-list {
    position: absolute;
    bottom: 110rpx;
    background-color: #fff;
    width: 100%;
}

.cart .cart-list-header {
    height: 60rpx;
    line-height: 60rpx;
    background-color: #eee;
    text-align: right;
    font-size: 28rpx;
    padding: 0 30rpx;
    color: #333;
}

.cart-list-item {
    max-height: 400rpx;
    overflow: scroll;
}

.cart-list-item .item {
    display: flex;
	align-items: center;
	margin: 20rpx 0;
}

.cart-list-item .item .cart-detail {
    flex: 1;
    /* height: 100rpx; */
    line-height: 40rpx;
    text-align: center;
}

.cart-count {
    display: flex;
    align-items: center;
}

.modal {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    flex-direction: column;
}

.modal .top {
    flex-grow: 1;
}

.modal .bottom {
    font-size: 28rpx;
    background-color: #fff;
    padding: 30rpx;
}

.modal .modal-active {
    display: flex;
    margin-bottom: 10rpx;
}

.modal .modal-icon {
    height: 40rpx;
    width: 40rpx;
    line-height: 40rpx;
    color: #fff;
    text-align: center;
}

.modal .modal-text {
    margin-left: 10rpx;
}

.modal .info {
    margin-top: 40rpx;
}

.modal .info .title {
    font-size: 40rpx;
    font-weight: 700;
}

.modal .info text {
    border-right: 1rpx solid #eee;
    padding: 0 10rpx;
}

.modal .info text:first-child {
    padding-left: 0;
}

.modal .info text:last-child {
    border: none;
}
.bgmain {
    background-color: #ff6344;
    color: white;
}
.cuIcon-back {
    color: white;
}
.btns {
    width: 50rpx;
    height: 50rpx;
    border-radius: 50%;
    font-size: 40rpx;
    font-weight: 700;
    color: black;
    text-align: center;
    line-height: 50rpx;
    background-color: #ffd161;
    margin: 0 16rpx;
}
.end {
    background: gray;
    color: white;
}
</style>
