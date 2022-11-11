<template>
    <block>
        <cu-custom bgColor="bgmain" :isBack="true">
            <view slot="content">抢单大厅</view>
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
                <view class="page-container">
                    <view class="grid flex-1 col-1 nodata" style="margin: 100rpx auto; text-align: center; width: 100%" v-if="list.length == 0">
                        <view class="padding-sm">
                            <view class="padding radius text-center light">
                                <text class="cuIcon-infofill lg text-lg" style="font-size: 50rpx"></text>
                                <view class="text-lg padding-tb-sm'">暂无数据</view>
                                <!-- <text class="cuIcon-infofill lg text-lg text-main" style='font-size:50rpx'></text>
                        <view class="text-main">暂无数据</view> -->
                            </view>
                        </view>
                    </view>

                    <view class="block" style="width: 100%" v-if="list.length > 0">
                        <view class="box bg-white padding align-center" v-for="(item, index) in list" :key="index" @tap="detail" :data-index="index">
                            <!-- <view class="flex justify-between" @tap="detail" :data-index="index"> -->
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
								<view class="flex margin-top operate_box">
									<view class="operate active" @click.stop="handleQd" :data-id="item.id">抢单</view>
								</view>
                                <!-- <view class="align-center text-center padding-tb-sm">
                                    <view class="margin-right-sm">
                                        <view class="text-yellow text-xl">¥{{ item.total }}</view>
                                        <view class="" v-if="item._status_txt == '待接单'">
                                            <button class="cu-btn">待抢单</button>
                                        </view>
                                        <view class="" v-if="item._status_txt != '待接单'">
                                            <button class="cu-btn">{{ item._status_txt }}</button>
                                        </view>
                                    </view>
                                </view> -->
                            <!-- </view> -->
                        </view>
                    </view>

                    <!-- <view class='block' style='width:100%' wx:if="{{list.length>0}}">
                <view class="grid col-1" style='width:100%' wx:if="{{list.length>0}}">

                    <view class="cu-list menu">
                        <view class="cu-item arrow" wx:for="{{list}}" wx:key="{{index}}">
							<navigator url='/gc_school/pages/order/detail?id={{item.o_id}}' hover-class='none'>
                            <view class='content padding-tb-sm' style='width:75%'> 
                                <view class='padding-tb-sm'  style='width:55%'>
                                    <view class="text-df text-cut" >{{item.desc}}</view>
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
                                
                                    <view>
                                        <text class="text-yellow text-xs">¥{{item.total}}</text>
                                    </view>
                                
                            </view>
							</navigator>
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
            type: 8,
            list: [],
            hasMoreData: false,
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
        if (this.hasMoreData) {
            this.getData();
        } else {
            uni.showToast({
                title: '没有更多数据',
                icon: 'none'
            });
        }
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {
        //详情跳转
        detail(e) {
            uni.navigateTo({
                url: '/gc_school/pages/order/detail?id=' + this.list[e.currentTarget.dataset.index].id
            });
        },

        getData() {
            const self = this;
            app.globalData.util.request({
                url: 'order/runOrderLst',
                data: {
                    s_id: uni.getStorageSync('schoolId'),
                    page: this.page,
					limit:10,
                },
				method:'GET',
                success(res) {
                    if (res.data.data.list.length < 10) {
                        if (res.data.data.list.length > 0) {
                            for (var i = 0; i < res.data.data.list.length; i++) {
                                var temp = res.data.data.list[i].remarks;
                                res.data.data.list[i].remarks.replace(/[0-9]*(\.[0-9]*)?/g, function (e) {
                                    var te = e;

                                    if (Number(e)) {
                                        if (e.toString().length > 3) {
                                            var d = e.substr(0, 2) + '****' + e.substr(6);
                                        } else {
                                            var d = e.substr(0, 1) + '**';
                                        }

                                        temp = temp.replace(te, d);
                                        console.log(temp);
                                    }
                                });
                                res.data.data.list[i].remarks = temp;
                            }

                            self.setData({
                                list: self.list.concat(res.data.data.list),
                                hasMoreData: false
                            });
                        }
                    } else {
                        for (var i = 0; i < res.data.data.list.length; i++) {
                            var temp = res.data.data.list[i].remarks;
                            res.data.data.list[i].remarks.replace(/[0-9]*(\.[0-9]*)?/g, function (e) {
                                var te = e;

                                if (Number(e)) {
                                    if (e.toString().length > 3) {
                                        var d = e.substr(0, 2) + '****' + e.substr(6);
                                    } else {
                                        var d = e.substr(0, 1) + '**';
                                    }

                                    temp = temp.replace(te, d);
                                    console.log(temp);
                                }
                            });
                            res.data.data.list[i].remarks = temp;
                        }

                        self.setData({
                            list: self.list.concat(res.data.data.list),
                            hasMoreData: true,
                            page: self.page + 1
                        });
                    } // if (this.data.page == 1) {
                    // 	self.setData({
                    // 		list: res.data.data.order
                    // 	})
                    // } else {
                    // 	for (var i = 0; i < res.data.data.list.length; i++) {
                    // 		self.setData({
                    // 			list: [
                    // 				...self.data.list,
                    // 				res.data.data.list[i]
                    // 			]
                    // 		})
                    // 	}
                    // }
                }
            },true);
        },
		
		//抢单
		handleQd(e) {
			console.log(e.currentTarget.dataset.id)
			// return;
		    var that = this;
		//     uni.requestSubscribeMessage({
		//         tmplIds: [that.sysparment.template_id, that.sysparment.cancel_template_id],
		//         // 此处可填写多个模板 ID，但低版本微信不兼容只能授权一个
		//         success(res) {
		//             console.log('已授权接收订阅消息');
		//         },
		
		//         complete() {
		            app.globalData.util.request({
		                url: 'Order/grab',
		                data: {
		                    o_id: e.currentTarget.dataset.id,
		                },
		
		                success(res) {
		                    uni.showToast({
		                        title: '抢单成功',
		                        // icon: 'none',
		                        duration: 2000,
								success() {
									uni.navigateTo({
										url: '/gc_school/pages/mygrab/index'
									});
								}
		                    });
		                }
		            },true);
		        // }
		    // });
		},
		
        tabSelect(e) {
            this.setData({
                TabCur: e.currentTarget.dataset.id,
                scrollLeft: e.currentTarget.dataset.id * 60,
                type: e.currentTarget.dataset.index
            });
            this.setData({
                page: 1
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
.page-container {
    display: flex;
}

page {
    background: #F7F5F6;
}

.content .ft {
    display: flex;
    margin-bottom: 5rpx;
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

.text-gray,
.line-gray,
.lines-gray {
    color: #e7e7e7 !important;
}
.text-white {
    color: #ff6344;
}
.box {
    /* box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1); */
    margin: 30rpx;
    border-radius: 10rpx;
}
.cu-tags {
    color: #ff6444;
    background: #fbf6f2;
}
.type_icon {
    width: 40rpx;
    height: 40rpx;
    margin-right: 10rpx;
}
.text-xl {
    color: #00bc6a;
    font-weight: bold;
}
.ft {
    margin-left: 50rpx;
}
.bg-del {
    /* background: white; */
    border: 1px solid #999999;
}
.margin-top-sm .cu-tag {
    padding: 20rpx;
}
.bg-yellows {
    border: 1px solid #ff6344;
    background: white;
    color: #ff6344;
}
.cu-btn {
    font-size: 26rpx;
}
.cu-btn:not([class*='bg-']) {
    background-color: white;
}
.text-cut {
    max-width: 400rpx;
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
