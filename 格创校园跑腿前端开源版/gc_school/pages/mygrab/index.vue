<template>
    <block>
        <cu-custom bgColor="bgmain" :isBack="true">
            <view slot="content">我的抢单</view>
        </cu-custom>
        <view class="container">
            <view class="modal" v-if="getUseInfo">
                <view class="m_box tc">
                    <view class="title">提示</view>
                    <view class="fs30 p20">请先开启用户授权</view>
                    <view class="border_top_2">
                        <button @getuserinfo="getUsetInfo" class="m_btn" openType="getUserInfo">确定</button>
                    </view>
                </view>
            </view>

            <view class="page">
                <scroll-view scroll-x class="nav text-center bg-white" scroll-with-animation :scroll-left="scrollLeft">
                    <view class="flex text-center" style="flex: 1">
                        <view :class="'cu-item  flex-sub ' + (0 == TabCur ? 'text-white cur' : '')" @tap="tabSelect" data-id="0" data-index="3">待取货</view>
                        <view :class="'cu-item flex-sub ' + (1 == TabCur ? 'text-white cur' : '')" @tap="tabSelect" data-id="1" data-index="7">待送达</view>
                        <view :class="'cu-item flex-sub ' + (2 == TabCur ? 'text-white cur' : '')" @tap="tabSelect" data-id="2" data-index="4">已完成</view>
                        <view :class="'cu-item flex-sub ' + (9 == TabCur ? 'text-white cur' : '')" @tap="tabSelect" data-id="9" data-index="9">取消中</view>
                    </view>
                </scroll-view>

                <view class="page-container">
                    <view class="block" style="width: 100%" v-if="list.length == 0">
                        <view class="col-1 nodata" style="margin: 100rpx auto; text-align: center; width: 100%" v-if="list.length == 0">
                            <view class="padding-sm" style="flex: 1">
                                <view class="padding radius text-center light">
                                    <text class="cuIcon-infofill lg text-lg" style="font-size: 50rpx"></text>
                                    <view class="text-lg padding-tb-sm'">暂无数据</view>
                                </view>
                            </view>
                        </view>
                    </view>
                    <view class="block" style="width: 100%" v-if="list.length > 0">
                        <view class="box bg-white padding align-center" v-for="(item, index) in list" :key="index" @tap="detail" :data-index="index">
                            <view class="flex align-center justify-between">
                            	<view class="text-lg text-bold text-black">{{item._type_txt}}-{{item.type!=4?item.remarks:item.title}}</view>
                            	<view class="status_btn">{{item._status_txt}}</view>
                            </view>
                            <view class="time">{{item.create_time}}</view>
                            <view class="flex addr_box align-center">
                            	<view class="" style="width: 80%;">
                            		<view class="flex align-center">
                            			<view class="blue circle"></view>
                            			<view class="addr margin-left">{{item.type!=4?item.qu_addres:item.remarks}}</view>
                            		</view>
                            		<text class="cuIcon-moreandroid" v-if="item.type!=4 || item.sh_addres!=''"></text>
                            		<view class="flex align-center" v-if="item.type!=4 || item.sh_addres!=''">
                            			<view class="orange circle"></view>
                            			<view class="addr margin-left">{{item.sh_addres}}</view>
                            		</view>
                            	</view>
                            	<view class="text-lg text-red text-bold">￥{{item.total}}</view>
                            </view>

                            <!-- <view class="address padding-left" v-if="item.type == '超市食堂'">商品信息：{{ item.good_details }}</view> -->

                            <!-- <view class="address padding-left" v-if="item.qu_addres">取货地址：{{ item.qu_addres }}</view> -->

                            <!-- <view class="address padding-left" v-if="item.sh_addres">收货地址：{{ item.sh_addres }}</view> -->
                        </view>
                    </view>

                    <!-- <view class='block' style='width:100%'  wx:if="{{list.length>0}}">
                <view class="grid col-1" style='width:100%' wx:if="{{list.length>0}}">

                    <view class="cu-list menu">
                        <view class="cu-item arrow" wx:for="{{list}}" wx:key="{{index}}">
                            <view class='content padding-tb-sm'>
                                <view class='padding-tb-sm' >
                                    <view class="text-df text-cut" style='width:55%'>{{item.desc}}</view>
                                </view>
                                <view class='ft'>
                                    <view class="cu-tag sm bgmain radius">
                                        {{item.type}}
                                    </view>
                                    <view class="cu-tag sm radius">
                                        {{item.createtime}}
                                    </view>
                                    <view class="cu-tag sm radius">
                                        {{item.start_time}}
                                    </view>
                                </view>
                            </view>
                            <view class='action'>
                                <navigator url='/gc_school/pages/order/detail?id={{item.o_id}}' hover-class='none'>
                                    <view>
                                        <text class="text-yellow text-xs">{{item.total}} / {{item.status}}</text>
                                    </view>
                                </navigator>
                            </view>
                        </view>
                    </view>

                </view>
            </view> -->
                </view>
            </view>
            <view class="cu-tabbar-height"></view>
        </view>
        <!-- <import src="/gc_school/pages/templates/footer.wxml" />
<template is="footerWx" data="{{...tabBar}}" /> -->

        <view class="cu-tabbar-height"></view>
        <!-- <view class="cu-bar tabbar foot bgmains" >
    <view class="action text-gray">
        <navigator url='/gc_school/pages/home/index' open-type="redirect" hover-class='none'>
           	<image id="cuIcon-homefills" src="/images/home.png"></image> 
               <view class="indedx">首页</view>
        </navigator>
    </view>
    <view class="action text-white  add-action">
        <navigator url='/gc_school/pages/order/index' open-type="redirect" hover-class='none'>
            <button class="cu-btn cuIcon-add bgmain shadow"><image id="cuIcon-homefillt" src="/images/publish.png"></image></button>
           <view style="color:black">我的发布</view>
        </navigator>
    </view>
    <view class="action text-gray">
        <navigator url='/gc_school/pages/user/index' open-type="redirect" hover-class='none'>
            <image id="cuIcon-homefills" src="/images/my.png"></image>
            <view class="indedxt">我的</view>
        </navigator>
    </view>
</view> -->
    </block>
</template>

<script>
var app = getApp();
export default {
    data() {
        return {
            TabCur: 0,
            scrollLeft: 0,
            page: 1,
            type: 3,
            loadmore: true,
            list: '',
            getUseInfo: ''
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
    onReady: function () {
        app.globalData.util.footer(this);
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
        //详情跳转
        detail(e) {
            var that = this;

            if (uni.getStorageSync('user_identity') == 1) {
                uni.requestSubscribeMessage({
                    tmplIds: [uni.getStorageSync('template_id'), uni.getStorageSync('cancel_template_id')],

                    // 此处可填写多个模板 ID，但低版本微信不兼容只能授权一个
                    success(res) {
                        console.log('已授权接收订阅消息');
                    },

                    complete() {
                        uni.navigateTo({
                            url: '/gc_school/pages/order/detail?id=' + that.list[e.currentTarget.dataset.index].id
                        });
                    }
                });
            } else {
                uni.navigateTo({
                    url: '/gc_school/pages/order/detail?id=' + that.list[e.currentTarget.dataset.index].id
                });
            }
        },

        getData() {
            const self = this;
            app.globalData.util.request({
                url: 'order/myOrderLst',
                data: {
                    page: this.page,
					status:this.type,
					limit:10
                },
				method:'GET',
                success(res) {
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

                    if (res.data.data.list.length == 0) {
                        self.setData({
                            loadmore: false
                        });
                    }
                }
            },true);
        },

        tabSelect(e) {
            this.setData({
                TabCur: e.currentTarget.dataset.id,
                scrollLeft: e.currentTarget.dataset.id * 60,
                type: e.currentTarget.dataset.index
            });
            this.setData({
                page: 1,
                loadmore: true,
				list:[]
            });
            this.getData();
        },

        getUsetInfo() {
            console.log('占位：函数 getUsetInfo 未声明');
        }
    }
};
</script>
<style lang="scss">
page {
    background: #F7F5F6;
}
.page-container {
    display: flex;
}
#cuIcon-homefills {
    width: 48rpx !important;
    position: relative !important;
    display: block !important;
    height: 48rpx !important;
    margin: 0 auto 10rpx !important;
    text-align: center !important;
    font-size: 40rpx !important;
}
#cuIcon-homefillt {
    width: 72rpx !important;
    position: absolute !important;
    display: block !important;
    height: 72rpx !important;
    margin: 0 auto 10rpx !important;
    text-align: center !important;
    font-size: 40rpx !important;
    top: 0;
    left: 0;
}
.indedx {
    color: #010101;
    font-size: 22rpx;
    padding: 10rpx 0 10rpx 0;
}
.indedxs {
    color: #12a6ee;
    font-size: 22rpx;
    margin-top: 10rpx;
    padding: -1rpx 0 10rpx 0;
    box-sizing: border-box;
}
.indedxt {
    color: #010101;
    font-size: 22rpx;
    padding: 10rpx 0 10rpx 0;
}
.text-white {
    color: #ff6344;
}
.cu-item {
    font-size: 30rpx;
}
.address {
    font-size: 28rpx;
}
.box {
    margin: 30rpx;
    border-radius: 10rpx;
}
.status_btn{
	background-color: #FEF5F5;
	color: #FF4C4D;
	font-size: 24rpx;
	width: 100rpx;
	text-align: center;
	padding: 10rpx 0;
	border-radius: 20rpx;
}
.time{
	color: #666666;
	font-size: 26rpx;
	margin-top: 10rpx;
}
.addr_box{
	background-color: #F9F9F9;
	border-radius: 20rpx;
	padding: 30rpx;
	margin-top: 20rpx;
}
.addr{
	font-size: 30rpx;
	font-weight: bold;
}
.circle{
	border: 6rpx solid #3792F5;
	background-color: white;
	width: 22rpx;
	height: 22rpx;
	border-radius: 50%;
	flex-shrink: 0;
}
.bule{
	border: 6rpx solid #3792F5;
}
.orange{
	border: 6rpx solid #FB4119;
}
.cuIcon-moreandroid{
	margin-left: -5rpx;
	color: grey;
}
.operate_box{
	.operate:first-child
	{
		margin-left: auto;
	}
}
.operate{
	border: 1rpx solid #E5E5E5;
	padding: 10rpx 30rpx;
	border-radius: 28rpx;
	color: #323232;
	// margin-left: auto;
}
.active{
	background-color: #FF4C4D;
	border: none;
	color: white;
}
</style>
