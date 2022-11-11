<template>
	<view>
		<cu-custom bgColor="bgmain">
			<view slot="content">我的订单</view>
		</cu-custom>
    <view class="container">
        <!-- <view class="content bgmain bg-white" >我的订单</view> -->
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
            <scroll-view scroll-x class="nav text-center bg-white" scroll-with-animation :scroll-left="scrollLeft" :style="{top:CustomBar+'px'}">
                <view class="flex text-center ">
                    <view :class="'cu-item text-df flex-sub ' + (0 == TabCur ? 'text-white cur' : '')" @tap="tabSelect" data-id="0" data-index=" ">全部</view>
                    <view :class="'cu-item text-df flex-sub ' + (7 == TabCur ? 'text-white cur' : '')" @tap="tabSelect" data-id="7" data-index="1">待付款</view>
                    <view :class="'cu-item text-df flex-sub ' + (6 == TabCur ? 'text-white cur' : '')" @tap="tabSelect" data-id="6" data-index="2">待接单</view>
                    <view :class="'cu-item text-df flex-sub ' + (9 == TabCur ? 'text-white cur' : '')" @tap="tabSelect" data-id="9" data-index="3">待取货</view>
                    <view :class="'cu-item text-df flex-sub ' + (5 == TabCur ? 'text-white cur' : '')" @tap="tabSelect" data-id="5" data-index="7">待送达</view>
                    <!-- <view class="cu-item text-df flex-sub {{1==TabCur?'text-white cur':''}}" bindtap="tabSelect" data-id="1" data-index="7">
                    已送达
                </view>
                <view class="cu-item  text-df flex-sub {{2==TabCur?'text-white cur':''}}" bindtap="tabSelect" data-id="2" data-index="6">
                    未完成
                </view> -->
                    <view :class="'cu-item text-df flex-sub ' + (3 == TabCur ? 'text-white cur' : '')" @tap="tabSelect" data-id="3" data-index="4">已完成</view>
                    <view :class="'cu-item  text-df flex-sub ' + (4 == TabCur ? 'text-white cur' : '')" @tap="tabSelect" data-id="4" data-index="5">已过期</view>
                </view>
            </scroll-view>
            <view
                :style="{'padding-top':80+'rpx' ,background:'#fff'}"
            ></view>
            <view class="page-container">
                <view class="grid col-1 nodata" style="margin: 100rpx auto; text-align: center; width: 100%" v-if="list.length == 0">
                    <view class="padding-sm">
                        <view class="padding radius text-center light">
                            <text class="cuIcon-infofill lg text-lg" style="font-size: 50rpx"></text>
                            <view class="text-lg padding-tb-sm'">暂无数据</view>
                        </view>
                    </view>
                </view>
                <!-- <view class='block' style='width:100%' wx:if="{{list.length>0}}">
                <view class="grid col-1" style='width:100%' wx:if="{{list.length>0}}">

                    <view class="cu-list menu">
                        <view class="cu-item arrow" wx:for="{{list}}" wx:key="{{index}}">
                            <view class='content padding-tb-sm'>
                                <view class='padding-tb-sm'>
                                    <text class="text-df">{{item.desc}}</text>
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
                                <navigator url='/schoolrun/pages/order/detail?id={{item.o_id}}' hover-class='none'>
                                    <view>
                                        <text class="text-yellow text-xs">{{item.total}} / {{item.status}}</text>
                                    </view>
                                </navigator>
                            </view>
                        </view>
                    </view>

                </view>
            </view> -->
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
						<view class="flex margin-top operate_box">
							<view class="operate" v-if="item._status_txt == '待接单' || item._status_txt == '未支付'" @click.stop="handleQX" :data-index="index">取消订单</view>
							<view class=" operate active margin-left" v-if="item._status_txt == '未支付'" @click.stop="handleZF" :data-index="index">付款</view>
							<view class=" operate" v-if="item._status_txt == '已取消' || item._status_txt == '已过期'" @click.stop="handleDel" :data-index="index">删除</view>
						</view>
                        <!-- <view class="flex justify-between" @tap="detail" :data-index="index">
                            <view style="width: 65%">
                                <view class="padding-tb-sm" style="display: flex">
                                    <image v-if="item.type == '1'" src="/static/images/quicon.png" class="type_icon"></image>
                                    <image v-else-if="item.type == '2'" src="/static/images/jiicon.png" class="type_icon"></image>
                                    <image v-else-if="item.type == '3'" src="/static/images/shiicon.png" class="type_icon"></image>
                                    <image v-else-if="item.type == '4'" src="/static/images/waiicon.png" class="type_icon"></image>
                                    <view class="text-df text-cut" id="text-df" v-if="item.type == '4' && item.title">{{ item.title }}</view>
                                    <view class="text-df text-cut" id="text-df" v-else>{{ item.remarks }}</view>
                                </view>
                                <view class="ft">
                                    <view class="cu-tag sm radius cu-tags">
                                        {{ item._create_time }}
                                    </view>
                                    <view class="cu-tag sm radius cu-tags" v-if="item.type == '无所不能/饮品' && item.is_start_show == 1">服务时间：{{ item.start_time }}</view>
                                    <view class="cu-tag sm radius cu-tags" v-if="item.type != '无所不能/饮品'">送达时间：{{ item.start_time | formatDateDay }}</view>
                                </view>
                            </view>
                            <view class="flex align-end text-right">
                                <view class="margin-right-sm">
                                    <view class="text-yellow text-xl">¥{{ item.total }}</view>
                                    <view class="flex justify-end text-sm margin-top-sm">{{ item._status_txt }}</view>
                                </view>
                            </view>
                        </view>

                        <view class="flex justify-end">
                            <view class="margin-top-sm" v-if="item._status_txt == '待接单' && TabCur == 0">
                                <view class="cu-tag sm radius bg-yellows">{{ item._status_txt }}</view>
                            </view>
                            <view class="margin-top-sm" v-if="item._status_txt != '待接单' && TabCur == 0">
                                <view class="cu-tag sm radius bg-del">{{ item._status_txt }}</view>
                            </view>
                            <view class="margin-top-sm margin-left-sm" v-if="item._status_txt == '未支付' || item._status_txt == '已过期'" @tap="handleDel" :data-index="index">
                                <view class="cu-tag sm radius bg-del">删除</view>
                            </view>
                            <view class="margin-top-sm margin-left-sm" @tap="handleQX" :data-index="index" v-if="item._status_txt == '未支付'">
                                <view class="cu-tag sm radius bg-del">取消订单</view>
                            </view>
                            <view class="margin-top-sm margin-left-sm" @tap="handleQX" :data-index="index" v-if="item._status_txt == '待接单' && TabCur == 0">
                                <view class="cu-tag sm radius bg-del">取消订单</view>
                            </view>
                        </view> -->
                    </view>
                </view>
            </view>
        </view>
        <view class="cu-tabbar-height"></view>
         <pt-footer flg="2"></pt-footer>
    </view>
    <!-- <import src="/schoolrun/pages/templates/footer.wxml" />
<template is="footerWx" data="{{...tabBar}}" /> -->
    <!-- <view class="cu-tabbar-height"></view>
<view class="cu-bar tabbar foot bgmain bgmains">
    <view class="action text-gray">
        <navigator url='/gc_school/pages/home/index' open-type="redirect" hover-class='none'>
           	<image id="cuIcon-homefills" src="/images/home.png"></image> 
               <view class="indedx">首页</view>
        </navigator>
    </view>
    <view class="action text-white">
		<navigator url='/gc_school/pages/second/index' open-type="redirect" hover-class='none'>
			<image id="cuIcon-homefills" src="/images/seconds.png"></image> 
			<view class="indedxt">二手市场</view>
		</navigator>
    </view>
    <view class="action text-gray">
            <image id="cuIcon-homefills" src="/images/myorders.png"></image> 
            <view class="indedxt">订单</view>
	</view>
    <view class="action text-gray">
        <navigator url='/gc_school/pages/user/index' open-type="redirect" hover-class='none'>
            <image id="cuIcon-homefills" src="/images/my.png"></image>
            <view class="indedxt">我的</view>
        </navigator>
    </view>
</view> -->
</view>
</template>

<script>
var app = getApp();
export default {
    data() {
        return {
            TabCur: 0,
            scrollLeft: 0,
            page: 1,
            type: '',
				...this.configInfo,

            // color:wx.getStorageSync('color')
            color: '#FF6444',

            list: '',
            getUseInfo: '',
			is_loadmore:true
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        var pages = getCurrentPages(); //获取当前页面信息栈

        var prevPage = pages[pages.length - 2];
        console.log('options', options.type);
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
    async onShow() {
		await this.login().then((res)=>{
		    console.log("您已登陆！");
		})
        this.getData();
        console.log('全局', app.globalData.issub);

        if (app.globalData.issub) {
            app.globalData.util.request({
                url: 'Setting/view',
                success(res) {
                    console.log('获取配置', res.data.data);
                    uni.showModal({
                        title: '提示',
                        content: '允许接收订阅消息',

                        success(con) {
                            if (con.confirm) {
                                uni.requestSubscribeMessage({
                                    tmplIds: [res.data.data.sys.template_grab, res.data.data.sys.template_cancel],

                                    // 此处可填写多个模板 ID，但低版本微信不兼容只能授权一个
                                    success(resu) {
                                        console.log('已授权接收订阅消息');
                                    }
                                });
                            }
                        }
                    });
                }
            });
            console.log('支付成功的');
        }

        app.globalData.issub = false;
    },
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
		if(this.is_loadmore)
		{
			this.setData({
				page: this.page + 1
			});
			this.getData();
		}
		else{
			uni.showToast({
				title:'没有更多数据了~',
				icon:'none'
			})
		}
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {
        getData() {
            const self = this;
            app.globalData.util.request({
                url: 'order/orderLst',
                data: {
					limit:10,
                    page: this.page,
                    status: this.type,
                },
				'method':'GET',
                success(res) {
                    console.log('21212332', res);

                    for (var i = 0; i < res.data.data.list.length; i++) {
                        // res.data.data.order[i].start_time = self.getDateTimeStamp(res.data.data.order[i].start_time)
                        res.data.data.list[i].createtime = self.getDateTimeStamp(res.data.data.list[i].createtime);
                    }
					if(res.data.data.list.length<10)
					{
						self.is_loadmore = false;
					}
                    if (self.page == 1) {
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
        msg() {
            console.log('弹出框');
            var self = this; // wx.showModal({
            // 	title:"提示",
            // 	content:'允许接收订阅消息',
            // 	success(res){
            // 		if(res.confirm){
            
            // 		else{
            // 		}
            // 	}
            // })
        },
        tabSelect(e) {
            this.setData({
                TabCur: e.currentTarget.dataset.id,
                scrollLeft: e.currentTarget.dataset.id * 60,
                type: e.currentTarget.dataset.index
            });
            this.setData({
                page: 1,
				list:[],
				is_loadmore:true
            });
            this.getData();
        },
		
		//支付
		handleZF(e) {
			var self = this;
		    app.globalData.util.request({
		        url: 'Order/pay',
		        data: {
		            o_id: this.list[e.currentTarget.dataset.index].id,
		        },
		
		        success(res) {
					console.log(res)
		            uni.requestPayment({
		                timeStamp: res.data.data.paydata.timestamp.toString(),
		                nonceStr: res.data.data.paydata.nonceStr,
		                package: res.data.data.paydata.package,
		                signType: 'MD5',
		                paySign: res.data.data.paydata.paySign,
		                success: function (resu) {
		                    console.log('success');
		                    app.globalData.issub = true;
							self.setData({
							    page: 1,
								list:[],
								is_loadmore:true
							});
							self.getData();
							app.globalData.util.request({
							    url: 'MsgSubscribe/toAllRider',
							    data: {
							        ordersn: res.data.data.order.ordersn
							    }
							});
		                    // uni.navigateTo({
		                    //     url: '/gc_school/pages/order/index'
		                    // });
		                },
		                fail: function (res) {
		                    console.log('fail');
		                }
		            });
		        }
		    },true);
		},
		
        handleDel(e) {
            const self = this;
            app.globalData.util.request({
                url: 'Order/del',
                data: {
                    o_id: this.list[e.currentTarget.dataset.index].id,
                },
				
                success(res) {
                    uni.showToast({
                        title: res.data.msg
                    });
                    setTimeout(() => {
                        self.setData({
                            page: 1,
							list:[],
							is_loadmore:true
                        });
                        self.getData();
                    }, 2000);
                }
            },true);
        },

        //取消订单
        handleQX(e) {
            const self = this;
            app.globalData.util.request({
                url: 'order/userCancelOrder',
                data: {
                    o_id: this.list[e.currentTarget.dataset.index].id,
                },

                success(res) {
                    if (res.data.status == 200) {
                        uni.showToast({
                            title: '取消成功',
                            // icon: 'none',
                            duration: 2000
                        });
                        setTimeout(() => {
                            self.setData({
                                page: 1,
								is_loadmore:true,
								list:[]
                            });
                            self.getData();
                        }, 2000);
                    } else {
                        uni.showToast({
                            title: '取消失败',
                            icon: 'none'
                        });
                    } // wx.navigateTo({
                    //   url: '/gc_school/pages/order/index'
                    // })
                }
            },true);
        },

        //详情跳转
        detail(e) {
            let sys=uni.getStorageSync('sys')   
            console.log(sys.template_cancel);    
            uni.requestSubscribeMessage({
                tmplIds: [sys.template_cancel, sys.template_grab],
                // 此处可填写多个模板 ID，但低版本微信不兼容只能授权一个
                success:(res) =>{
                    uni.navigateTo({
                        url: '/gc_school/pages/order/detail?id=' + this.list[e.currentTarget.dataset.index].id
                    });
                }
            }); // 		}
           
        },

        getDateDiff(dateTimeStamp) {
            var result = '';
            var minute = 1000 * 60;
            var hour = minute * 60;
            var day = hour * 24;
            var halfamonth = day * 15;
            var month = day * 30;
            var now = new Date().getTime();
            var diffValue = now - dateTimeStamp;

            if (diffValue < 0) {
                return;
            }

            var monthC = diffValue / month;
            var weekC = diffValue / (7 * day);
            var dayC = diffValue / day;
            var hourC = diffValue / hour;
            var minC = diffValue / minute;

            if (monthC >= 1) {
                result = '' + parseInt(monthC) + '月前';
            } else {
                if (weekC >= 1) {
                    result = '' + parseInt(weekC) + '周前';
                } else {
                    if (dayC >= 1) {
                        result = '' + parseInt(dayC) + '天前';
                    } else {
                        if (hourC >= 1) {
                            result = '' + parseInt(hourC) + '小时前';
                        } else {
                            if (minC >= 1) {
                                result = '' + parseInt(minC) + '分钟前';
                            } else {
                                result = '刚刚';
                            }
                        }
                    }
                }
            }

            return result;
        },

        getDateTimeStamp(dateStr) {
            dateStr = dateStr;
            var da = Date.parse(dateStr.replace(/-/gi, '/'));
            return this.getDateDiff(da);
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
.bgmains {
    background-color: #fff !important;
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
    border-radius: 20rpx;
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
.contents {
    padding: 70rpx 0 30rpx 0;
    /* color: white; */
    font-size: 30rpx;
    text-align: center;
    /* background: #ff6444; */
    /* background-image: linear-gradient(to right, #0396FF, #23AFE4, #ABDCFF) !important; */
}
.bg-yellows {
    border: 1px solid #ff6344;
    background: white;
    color: #ff6344;
}
.text-cut {
    max-width: 350rpx;
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
.nav{
    position:fixed;
    
}
</style>
