<template>
	<block >
		<!-- <cu-custom bgColor="bgmain" id="vont">
    <view slot="content">首页</view>
</cu-custom> -->
		<view class="school" :style="{'background-color': color,'padding-top':(StatusBar)+'px',height:CustomBar+'px'}">
			<picker @change="PickerChange" :value="index" :range="school" range-key="s_name">
				<view class="picker">
					<text class="cuIcon-locationfill"></text>
					{{ school[index].s_name ? school[index].s_name : '选择学校' }}
					<text class="cuIcon-unfold margin-left-xs"></text>
				</view>
			</picker>
		</view>
		<view :style="{'background-color': color,'padding-top':(StatusBar)+'px',height:CustomBar+'px'}"></view>
	<view >

		<view class="header">
			
			<view class="bang margin" v-if="text && rank_show">
				<image class="back-img" src="/static/icon/bang.png" mode="scaleToFill" />
				<!-- back-main -->
				<swiper autoplay="true" vertical="true" class="swiper" circular="true">
					<swiper-item v-for="(item,index) in rankList" :key="index">
						<!-- 爱吃猫的鱼 月赚1 <view class="money">￥187.4</view> -->
						<view class="">{{item.nickname}}总赚<text class="money">{{item.brokerage}}</text></view>
					</swiper-item>
				</swiper>
				<view class="" style="width: 75%;margin-left: 20%;padding-top: 14rpx;display: none;">
					<uni-notice-bar :scrollable="true" color="black" :speed="40" :single="true" :text="text" />
					<!-- 爱吃猫的鱼 月赚1 <view class="money">￥187.4</view> -->
				</view>
					<image @click="rank_show=false" class="close" src="/static/icon/close.png" mode="scaleToFill"  />
			</view>
			<!-- style="height: 180px; padding: 0 20rpx" -->
			<swiper class="banner margin-lr" :class="rank_show?'':'margin-top'" :autoplay="true" :current="current"  v-if="schoolInfo.slide.length>0">
				<block v-if="schoolInfo.slide.length > 0">
					<block v-for="(item, index) in schoolInfo.slide" :key="index">
						<swiper-item>
							<block v-if="item.img">
								<image :src="item.img" mode="widthFix" @tap="slideJump" :data-url="item.url"
									:data-type="item.url_type"></image>
							</block>
							<block v-else>
								<image src="/static/images/banners.jpg" mode="widthFix"></image>
							</block>
						</swiper-item>
					</block>
				</block>
				<block v-else>
					<swiper-item>
						<image src="/static/images/banners.jpg" mode="widthFix"></image>
					</swiper-item>
				</block>
			</swiper>

			<view class="flex-row equal-division menu" v-if="schoolInfo.modules.length>0">
				<block v-if="schoolInfo.modules.length == 0">
					<view class="equal-division-item_1 flex-col items-center" @tap="onJsEvent" data-type="1"
						data-url=" " data-urltype="1">
						<image src="/static/images/home/qu_icon.png" class="image_6" />
						<text decode="decode" class="text_4">取快递</text>
					</view>
					<view class="equal-division-item_1 flex-col items-center" @tap="onJsEvent" data-type="2"
						data-url=" " data-urltype="1">
						<image src="/static/images/home/ji_icon.png" class="image_6" />
						<text decode="decode" class="text_4">寄快递</text>
					</view>
					<view class="equal-division-item_1 flex-col items-center" @tap="onJsEvent" data-type="3"
						data-url=" " data-urltype="1">
						<image src="/static/images/home/shi_icon.png" class="image_6" />
						<text decode="decode" class="text_4">食堂超市</text>
					</view>
					<view class="equal-division-item_1 flex-col items-center" @tap="onJsEvent" data-type="4"
						data-url=" " data-urltype="1">
						<image src="/static/images/home/wan_icon.png" class="image_6" />
						<text decode="decode" class="text_4">万能任务</text>
					</view>
				</block>
				<block v-else>
					<block v-for="(item, index) in schoolInfo.modules" :key="index">
						<view class="equal-division-item_1 flex-col items-center" v-if="item.types != 2"
							@tap="onJsEvent" :data-urltype="item.types" :data-type="index + 1" :data-url="item.appid"
							:data-id="item.id">
							<image :src="item.image == '' ? '../../../images/home/wan_icon.png' : item.image"
								class="image_6" />
							<text decode="decode" class="text_4">{{ item.title }}</text>
						</view>

						<view class="equal-division-item_1 flex-col items-center" v-else @tap="toOther"
							:data-appid="item.appid">
							<image :src="item.image == '' ? '../../../images/home/wan_icon.png' : item.image"
								class="image_6" />
							<text decode="decode" class="text_4">{{ item.title }}</text>
						</view>
					</block>
				</block>
			</view>

		</view>

		<view class="quan margin">
			<view class="flex tit">
				<image src="/static/icon/quan.png" mode="scaleToFill" />
				热门圈子
				<view class="all" @click="goQuan()" v-if="schoolInfo.article_cate.length>0">更多+</view>
			</view>
		</view>
		<view class="quan_list flex margin-lr" v-if="schoolInfo.modules.length">
			<block v-if="schoolInfo.article_cate.length>0">
				<block v-for="(item,index) in schoolInfo.article_cate" :key="index">
					<view class="quan" v-if="index<3"
						@click="go(item.link?item.link:('/gc_school/pages/article/list?class_id='+item.class_id+'&class_name='+item.class_name))">
						<image :src="item.img" class="quan_img" />
						<view class="tag">{{item.class_name}}</view>
					</view>
				</block>
			</block>
			<block v-else>
				<block v-for="(item,index) in article_cate" :key="index">
					<view class="quan">
						<image :src="item.img" class="quan_img" />
						<view class="tag">{{item.class_name}}</view>
					</view>
				</block>
			</block>
		</view>

	
</view>

		<view class="quan margin" v-if="schoolInfo.store.length>0">
			<view class="flex tit">
				<image src="/static/icon/shop.png" mode="scaleToFill" />
				商家推荐
				<view class="all" @click="go('/gc_school/pages/canteen/canteen')">更多+</view>
			</view>
		</view>
		<view class="store_list" v-if="schoolInfo.store.length>0">
			<block v-for="(item,index) in schoolInfo.store" :key="index">
				<view class="store margin-lr margin-bottom flex"
					@click="go('/gc_school/pages/foold/foold?id='+item.business_id)">
					<image class="main_img" :src="(item.business_image==''||item.business_image=='undefined/undefined')?'https://test.fkynet.net/wximage/empty.jpg':item.business_image" mode="" />
					<view class="store_info padding">
						<view class="tit">{{item.business_name}}</view>
						<image class="store_close" v-if="!item.is_open" src="/static/icon/store_closes.png" mode="" />
						<!-- {{item.start_time.split(":")[0]*60+item.start_time.split(":")[0]*1>date.date("h")*60+date.date("i")*1&&date.date("h")*60+date.date("i")*1}}
                {{item.end_time.split(":")[0]*60+item.end_time.split(":")[0]*1}}
                {{date.date("h")*60+date.date("i")*1}} -->
						<view class="flex margin-top-xs">
							<!-- <view class="fen">4.6分</view> -->
							<view class="sale">已售:{{item.sale_num}}</view>
							<!-- <view class="time">45分钟</view> -->
							<view class="mi" style="margin-left:auto;">{{item.juli}}km</view>
						</view>
						<view class="tags flex margin-top-sm">
							<view class="typenei" v-if="item.type == 1">校内</view>
							<view class="typewai" v-else>校外</view>
							<view class="tag">起送￥{{item.starting_fee}}</view>
							<!-- <view class="tag">配送￥0.9</view> -->
						</view>

					</view>
				</view>

			</block>
		</view>



		<view class="cover" v-if="is_show_toast && sysparment.index_toast_switch == 1">
			<view class="toast">
				<!-- <template is="wxParse" :data="wxParseData:toast_content.nodes"/> -->
				<mp-html :content="article_toast_content"></mp-html>
			</view>
			<view class="sure" @tap="close">我知道了</view>
		</view>
		<block v-if="sysparment.home_adv_id">
			<view v-if="sysparment.home_adv_type == 0">
				<ad :unit-id="sysparment.home_adv_id"></ad>
			</view>
			<view v-else>
				<ad :unit-id="sysparment.home_adv_id" ad-type="video" ad-theme="white"></ad>
			</view>
		</block>
		<official-account></official-account>
		<view style="margin-bottom:100rpx;"></view>
		<view class="official_account row padding-lr" v-if="sys.mp_name&&userInfo&&!userInfo.mp_openid&&!isHomeAuth">
			<image class="logo margin-right" :src="sys.mp_logo" mode="" />
			关注{{sys.mp_name}}公众号 
			<view class="auth padding-sm-lr" @click="go('/gc_school/pages/webview/indexs')">去授权
				<view class="cuIcon-right"></view>
				</view>
			<view class="cuIcon-close" @click="closeAuth"></view>
		</view>
		<view style="padding-bottom:100rpx">
		</view>
		<pt-footer flg="0"></pt-footer>
		<!-- <import src="/gc_school/pages/templates/footer.wxml" />
<template is="footerWx" data="{{...tabBar}}" /> -->
	</block>
</template>

<script>
	import methods from './methods'
	var app = getApp();

	export default {
		data() {
			return {
				article_cate: [
					{'class_name':'游戏代练','img':'https://test.fkynet.net/wximage/youxi.png'},
					{'class_name':'影视摄影','img':'https://test.fkynet.net/wximage/yingshi.png'},
					{'class_name':'吃货联盟','img':'https://test.fkynet.net/wximage/chihuo.png'},
				],
				...this.configInfo,
				indicatorDots: false,
				autoplay: true,
				interval: 5000,
				duration: 1000,
				showText: true,
				getUseInfo: false,
				status: 0,
				page: 1,
				url: app.globalData.siteInfo.appimg,
				index: 0,
				address: {},
				schooindex: 0,
				s_id: '',
				rank: [],
				slide: [],
				top: uni.getStorageSync('CustomBar'),
				StatusBar: uni.getStorageSync('StatusBar'),
				list: [],

				location: {
					lng: '1',
					lat: '1'
				},
				// color:this.color,
				current: 0,
				modules: [],

				schoolInfo: {
					modules: [],
					slide: [],
					school: {},
					rank: []
				},

				is_show_toast: true,
				dataList: [],
				order_index: 0,
				history: [],
				modules_load: false,

				// color:wx.getStorageSync('color')


				city: {},
				downloadFile: '',
				note: '',
				school: '',
				sys: '',

				sysparment: {
					is_modules_show: 0,
					is_luntan_show: 0,
					is_rank_show: 0,
					is_history_show: 0,
					is_show_toast: 0,
					home_adv: '',
					home_adv_type: 0
				},

				tmps: {},
				userInfo: '',
				article_toast_content: '',
				text:'',
				rank_show:true,
				rankList:[],
				isHomeAuth:false
			};
		},
		async onLoad(options) {
			// this.login().then((res)=>{
			//     console.log("您已登陆！");
			// })
			this.isHomeAuth=uni.getStorageSync('isHomeAuth')||false
			let that=this
			uni.setStorageSync('user_identity', 0);
			await this.getLocations()
			console.log(this.configInfo);
			if (uni.getStorageSync('token')) {
				app.globalData.util.request({
					url: 'WechatUser/view',
					data: {},
					success(res) {
						console.log("用户信息", res.data.data)
						that.userInfo=res.data.data
						if (res.data.data.run_status == 2) {
							uni.setStorageSync('user_identity', 1);
						}


					}
				}, true);
			} // app.util.request({
			// 	url: 'entry/wxapp/Sysparment',
			// 	data: {},
			// 	success(res){
			// 			// wx.setStorageSync('color', res.data.data.sys.color)
			// 	}
			// })
			// if(!wx.getStorageSync("city"))
			// {

			this.setData({
				city: {
					location: this.location
				}
			});
			uni.setStorageSync('city', this.city); // }

			console.log(this.city);
			let schoolList=uni.getStorageSync("schoolList")
			if (schoolList) {
				let self=this
				this.school=schoolList
				this.sys=uni.getStorageSync('sys');
				var index = uni.getStorageSync('schoolIndex') ? uni.getStorageSync('schoolIndex') : 0;

					this.setData({
						// school: res.data.data.list,
						index: uni.getStorageSync('schoolIndex') ? uni.getStorageSync('schoolIndex') :
							0,
						s_id: uni.getStorageSync("schoolList")[index].s_id,
						// sys: res.data.data.sys
					}); // console.log("学校信息",res.data.data.list[index])
					// console.log("学校信息",res.data.data.list[index].thums)
					if (uni.getStorageSync('token')) {
						self.userChangeSchool(schoolList[index].s_id)
					}
					uni.setStorageSync('schoolId', schoolList[index].s_id);
					self.getSchoolInfo(schoolList[index].s_id);
					// self.getOrderData();
					// self.getHistoryList();
					self.getRank();
					self.getSysparment(); 
					this.getSchool();
			} else{
				this.getSchool();
				
			}
			// this.getPage()
			var timestamp = Date.parse(new Date());
			timestamp = timestamp / 1000;
			var n = timestamp * 1000;
			var date = new Date(n);

			if (uni.getStorageSync('last_time')) {
				//一天之内不再弹出
				if (uni.getStorageSync('last_time') + 86400 < timestamp) {
					this.setData({
						is_show_toast: true
					});
					console.log('过时了');
					uni.setStorageSync('last_time', timestamp);
				} else {
					console.log('没过时');
					this.setData({
						is_show_toast: false
					});
				}
			} else {
				this.setData({
					is_show_toast: true
				});
				uni.setStorageSync('last_time', timestamp);
			}

			console.log('当前时间戳为：' + timestamp);
			console.log('当前时间戳为：' + (timestamp - 3600 * 24 * 7)); // app.util.request({
			// 	url:'entry/wxapp/alymsg',
			// 	success(res){
			// 		console.log(res)
			// 	}
			// })

			console.log(app.globalData.siteInfo.appimg); // 页面初始化 options为页面跳转所带来的参数
			 // self.getPage()

			that.setData({
				address: uni.getStorageSync('city')
			}); // this.getSysparment()
			// wx.getStorage({
			// 	key: "useInfo",
			// 	success: function (data) {
			// 		"true" == data.data && self.setData({
			// 			getUseInfo: false
			// 		});
			// 		if (!wx.getStorageSync('openid')) {
			// 			self.getGetUid(data.data)
			// 		} else {
			// 			// self.getPage()
			// 		}
			// 	},
			// 	fail: function () {
			// 		self.setData({
			// 			getUseInfo: true
			// 		});
			// 	}
			// })
		},
		onReady: function() {
			// 页面渲染完成
		},
		onShareAppMessage: function() {
			// return {
			//   title: '自定义标题',
			//   path: '/page/user?id=123',
			// }
		},
		onShareTimeline: function() {},
		onShow: function() {
			uni.removeStorageSync('module_id')
			if (uni.getStorageSync('schoolId')) {
				// this.getOrderData();	//获取最新数据
				// this.getHistoryList(); // 获取历史数据
			}

			uni.removeStorage({
				key: 'json'
			});
			uni.removeStorage({
				key: 'store_id'
			});
		},
		onHide: function() {
			// 页面隐藏
		},
		onUnload: function() {
			// 页面关闭
		},
		onReachBottom: function() {
			// this.getOrderData()
		},
		methods:{
			...methods,
			async closeAuth(){
				await this.tips.tips("如果想重新授权，请前往设置！")
				this.isHomeAuth=true
				uni.setStorageSync('isHomeAuth', true)
			},
		}
	};
</script>
<style>
	page {
		width: 100vw;
		height: 100vh;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'Microsoft Yahei',
			sans-serif;
	}
	.swiper{
		position: absolute;
		left: 25%;
		height: 80rpx;
		width: 450rpx;
		line-height: 80rpx;
		z-index: 99;
		font-size: 28rpx;
	}
	.quan_img{
		border-radius: 20rpx;
	}
	.school {
		/* background-color:#FFF0D8; */
		/* background-color: #F1D14D; */
		background-color: #ff6444;
		/* background-color: white; */
		padding: 30rpx;
		font-size: 30rpx;
		padding-top: 80rpx;
		color: white;
		/* position: absolute;
    top: 10rpx;
    z-index: 99; */
	}

	view,
	image,
	text {
		box-sizing: border-box;
		flex-shrink: 0;
	}

	.flex-row {
		display: flex;
		flex-direction: row;
	}

	.flex-col {
		display: flex;
		flex-direction: column;
	}

	.justify-start {
		display: flex;
		justify-content: flex-start;
	}

	.justify-center {
		display: flex;
		justify-content: center;
	}

	.justify-end {
		display: flex;
		justify-content: flex-end;
	}

	.justify-evenly {
		display: flex;
		justify-content: space-evenly;
	}

	.justify-around {
		display: flex;
		justify-content: space-around;
	}

	.justify-between {
		display: flex;
		justify-content: space-between;
	}

	.items-start {
		display: flex;
		align-items: flex-start;
	}

	.items-center {
		display: flex;
		align-items: center;
	}

	.items-end {
		display: flex;
		align-items: flex-end;
	}

	van-field {
		--cell-background-color: transparent;
	}

	van-field .van-field__body {
		width: 100%;
	}

	van-checkbox .van-checkbox__label,
	van-radio .van-radio__label {
		padding-left: 0;
		flex: 1 1 auto;
	}

	van-checkbox .van-checkbox--horizontal,
	van-radio .van-radio--horizontal {
		margin-right: 0;
	}

	van-search {
		--search-padding: 0;
	}

	.equal-division-item_1 {
		width: 25%;
		/* flex: 1 1 188rpx; */
		padding: 10rpx 0;
	}

	.left-group {
		width: 57rpx;
		height: 79rpx;
	}

	.image_6 {
		width: 100rpx;
		height: 100rpx;
		/* border-radius: 50%; */
	}

	.icon_1 {
		width: 12rpx;
		height: 20rpx;
	}

	.list-item {
		padding: 30rpx;
		/* padding: 31rpx 9rpx 32rpx 24rpx; */
	}

	.divider {
		margin-right: 24rpx;
		align-self: flex-end;
		background-color: rgb(249, 249, 249);
		width: 606rpx;
		height: 2rpx;
	}

	.image_18 {
		width: 54rpx;
		height: 54rpx;
	}

	.text_11 {
		color: rgb(245, 245, 245);
		font-size: 54rpx;
		line-height: 54rpx;
		white-space: nowrap;
		text-transform: uppercase;
	}

	.right-group_1 {
		align-self: center;
		white-space: nowrap;
		height: 29rpx;
		font-weight: bold;
	}

	.center-text-wrapper {
		padding-top: 7rpx;
		background-color: rgb(255, 255, 255);
		border-radius: 16rpx;
		width: 74rpx;
	}

	.left-text-wrapper {
		/* padding: 22rpx 0 18rpx; */
		align-self: center;
		color: rgb(255, 255, 255);
		font-size: 32rpx;
		line-height: 32rpx;
		white-space: nowrap;
		/* background-image: linear-gradient(0deg, #26ca94, #05a778); */
		border-radius: 6rpx;
		width: 72rpx;
		height: 72rpx;
	}

	.right-group {
		margin-left: 24rpx;
	}

	.text_36 {
		color: rgb(253, 93, 8);
		font-size: 28rpx;
		line-height: 20rpx;
	}

	.text_38 {
		color: rgb(253, 93, 8);
		font-size: 40rpx;
		line-height: 30rpx;
	}

	.text_28 {
		text-shadow: 0px 2rpx 0px rgba(5, 167, 120, 0.5);
	}

	.text_30 {
		color: rgb(20, 20, 20);
		font-size: 32rpx;
		/* line-height: 32rpx; */
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 450rpx;
		height: 40rpx;
	}

	.bottom-group {
		margin-top: 21rpx;
		color: rgb(153, 153, 153);
		font-size: 22rpx;
		line-height: 22rpx;
		white-space: nowrap;
	}

	.left-text-wrapper_1 {
		padding: 7rpx 0 9rpx;
		background-color: rgb(255, 255, 255);
		height: 40rpx;
		border: solid 1rpx rgb(221, 221, 221);
	}

	.right-text-wrapper {
		margin-left: 15rpx;
		padding: 7rpx 0 9rpx;
		background-color: rgb(255, 255, 255);
		height: 40rpx;
		border: solid 1rpx rgb(221, 221, 221);
	}

	.text_32 {
		margin-left: 10rpx;
		margin-right: 5rpx;
	}

	.text_34 {
		margin: 0 10rpx;
		/* margin-right: 5rpx; */
	}

	.text_5 {
		margin-top: 21rpx;
	}

	.container {
		text-transform: none;
		background-color: rgb(249, 249, 249);
		width: 100vw;
		/* height: 100vh; */
		overflow-y: auto;
	}

	.section_5 {
		padding-bottom: 42rpx;
		flex: 1 1 auto;
		background-color: rgb(255, 255, 255);
		overflow-y: auto;
	}

	.tab-bar {
		background-color: rgb(255, 255, 255);
	}

	.group_4 {
		/* padding-top: 29rpx; */
		border-top: solid 5rpx rgb(255, 255, 255);
	}

	.equal-division {
		/* margin-top: 50rpx; */
		color: rgb(20, 20, 20);
		font-size: 24rpx;
		line-height: 24rpx;
		white-space: nowrap;
	}

	.equal-division_1 {
		margin: 30rpx 24rpx 0;
		color: rgb(255, 255, 255);
		font-size: 24rpx;
		line-height: 23rpx;
		white-space: nowrap;
		flex-wrap: wrap;
	}

	.group_8 {
		margin-top: 40rpx;
		padding: 0 23rpx;
	}

	.group_16 {
		margin-top: 61rpx;
	}

	.group_27 {
		padding: 9rpx 42rpx 7rpx 45rpx;
		border-top: solid 2rpx rgb(249, 249, 249);
	}

	.image-wrapper {
		margin: 0 24rpx;
		padding: 192rpx 0 16rpx;
		/* background-image: url("https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/610d0ce185e9bd00112839ac/6153e5add1ba840011ccf191/16328883372269608605.png"); */
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}

	.equal-division-item {
		padding: 10rpx 44rpx 11rpx;
		flex: 1 1 188rpx;
	}

	.equal-division-item_2 {
		padding: 40rpx 29rpx 41rpx;
		flex: 1 1 340rpx;
		background-image: url('https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/610d0ce185e9bd00112839ac/6153e5add1ba840011ccf191/16328883379595403515.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		height: 150rpx;
	}

	.equal-division-item_3 {
		margin-left: 22rpx;
		padding: 40rpx 28rpx 41rpx;
		flex: 1 1 340rpx;
		background-image: url('https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/610d0ce185e9bd00112839ac/6153e5add1ba840011ccf191/16328883380875291559.png');
		background-position: 0px 0px;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		height: 150rpx;
	}

	.group_11 {
		margin-top: 28rpx;
		padding-top: 59rpx;
		position: relative;
	}

	.group_17 {
		padding: 0 24rpx;
	}

	.list {
		margin-top: 16rpx;
	}

	.view_29 {
		color: rgb(255, 99, 68);
		font-size: 24rpx;
		line-height: 24rpx;
		white-space: nowrap;
	}

	.view_30 {
		color: rgb(184, 190, 203);
		font-size: 24rpx;
		line-height: 24rpx;
		white-space: nowrap;
	}

	.group_28 {
		color: rgb(184, 190, 203);
		font-size: 24rpx;
		line-height: 24rpx;
		white-space: nowrap;
		width: 57rpx;
		height: 80rpx;
	}

	.image_5 {
		width: 52rpx;
		height: 12rpx;
	}

	.text_4 {
		margin-right: 3rpx;
		margin-top: 20rpx;
		font-size: 28rpx;
	}

	.image_11 {
		width: 131rpx;
		height: 32rpx;
	}

	.text_9 {
		margin-top: 15rpx;
	}

	.image_12 {
		width: 132rpx;
		height: 32rpx;
	}

	.text_10 {
		margin-top: 15rpx;
	}

	.group_10 {
		padding-bottom: 7rpx;
		position: relative;
	}

	.image_13 {
		margin-top: 33rpx;
	}

	.image_14 {
		width: 128rpx;
		height: 128rpx;
		position: absolute;
		left: 22rpx;
		top: 50rpx;
		border-radius: 50%;
	}

	.image_15 {
		width: 128rpx;
		height: 128rpx;
		position: absolute;
		left: 262rpx;
		top: 0;
		border-radius: 50%;
	}

	.image_16 {
		width: 128rpx;
		height: 128rpx;
		position: absolute;
		left: 502rpx;
		top: 60rpx;
		border-radius: 50%;
	}

	.group_18 {
		padding-bottom: 9rpx;
		position: relative;
		width: 130rpx;
	}

	.image_17 {
		margin-top: 34rpx;
	}

	.text_12 {
		margin-left: 3rpx;
	}

	.text_13 {
		color: rgb(20, 20, 20);
		font-size: 36rpx;
		line-height: 36rpx;
		white-space: nowrap;
		position: absolute;
		left: 0;
		top: 25rpx;
	}

	.equal-division-item_4 {
		margin-top: 50rpx;
		padding: 90rpx 13rpx 0 28rpx;
		/* flex: 1 1 222rpx; */
		background-image: url('https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/610d0ce185e9bd00112839ac/6153e5add1ba840011ccf191/16328883387007532916.png');
		background-position: 0px 0px;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		height: 258rpx;
	}

	.equal-division-item_5 {
		margin-left: 18rpx;
		padding: 90rpx 18rpx 19rpx 28rpx;
		/* flex: 1 1 222rpx; */
		background-image: url('https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/610d0ce185e9bd00112839ac/6153e5add1ba840011ccf191/16328883384200799336.png');
		background-position: 0px 0px;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		height: 308rpx;
	}

	.equal-division-item_6 {
		margin-left: 18rpx;
		margin-top: 60rpx;
		padding: 89rpx 18rpx 0 28rpx;
		/* flex: 1 1 222rpx; */
		background-image: url('https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/610d0ce185e9bd00112839ac/6153e5add1ba840011ccf191/16328883389480510147.png');
		background-position: 0px 0px;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		height: 246rpx;
	}

	.text_27 {
		color: rgb(20, 20, 20);
		font-size: 36rpx;
		line-height: 36rpx;
		white-space: nowrap;
		position: absolute;
		left: 0;
		top: 27rpx;
	}

	.text_14 {
		color: rgb(255, 255, 255);
		font-size: 28rpx;
		line-height: 28rpx;
		white-space: nowrap;
	}

	.view {
		margin-top: 14rpx;
		color: rgb(49, 185, 100);
		font-size: 24rpx;
		line-height: 24rpx;
		white-space: nowrap;
	}

	.group_12 {
		padding: 35rpx 0 19rpx;
	}

	.group_14 {
		margin-top: 85rpx;
	}

	.text_22 {
		color: rgb(255, 255, 255);
		font-size: 28rpx;
		line-height: 28rpx;
		white-space: nowrap;
	}

	.view_1 {
		margin-top: 15rpx;
		color: rgb(33, 113, 255);
		font-size: 24rpx;
		line-height: 24rpx;
		white-space: nowrap;
	}

	.group_15 {
		padding: 26rpx 0 16rpx;
	}

	.text_16 {
		margin: 6rpx 0 10rpx;
		color: rgb(255, 255, 255);
		font-size: 24rpx;
		line-height: 24rpx;
		white-space: nowrap;
	}

	.text_17 {
		margin-left: 33rpx;
		color: rgb(255, 255, 255);
		font-size: 38rpx;
		line-height: 40rpx;
		white-space: nowrap;
	}

	.text_18 {
		color: rgb(255, 255, 255);
		font-size: 28rpx;
		line-height: 28rpx;
		white-space: nowrap;
	}

	.text-wrapper {
		margin-top: 14rpx;
		padding: 6rpx 0 2rpx;
		color: rgb(255, 99, 68);
		font-size: 24rpx;
		line-height: 24rpx;
		white-space: nowrap;
		background-color: rgb(255, 255, 255);
		border-radius: 16rpx;
		width: 74rpx;
	}

	.text_20 {
		margin: 6rpx 0 10rpx;
		color: rgb(255, 255, 255);
		font-size: 24rpx;
		line-height: 24rpx;
		white-space: nowrap;
	}

	.text_21 {
		margin-left: 33rpx;
		color: rgb(255, 255, 255);
		font-size: 38rpx;
		line-height: 40rpx;
		white-space: nowrap;
	}

	.text_24 {
		margin: 6rpx 0 10rpx;
		color: rgb(255, 255, 255);
		font-size: 24rpx;
		line-height: 24rpx;
		white-space: nowrap;
	}

	.text_25 {
		color: rgb(255, 255, 255);
		font-size: 38rpx;
		line-height: 40rpx;
		white-space: nowrap;
	}

	.item_imgs {
		width: 340rpx;
	}

	.item_img {
		width: 220rpx;
		/* width: 340rpx; */
		/* height: 160rpx; */
	}

	.icon_item {
		width: 70rpx;
		height: 70rpx;
	}

	.rank_item {
		width: 32%;
	}

	.nickname {
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.menu {
		flex-wrap: wrap;
		margin-top: 10rpx;
		/* margin-top: 20rpx; */
	}

	.equal-division-item_1 {
		margin: 10rpx 0;
	}

	.cover {
		position: fixed;
		background: rgba(0, 0, 0, 0.7);
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		z-index: 999;
		padding: 160rpx 40rpx 40rpx;
	}

	.toast {
		max-height: 80%;
		overflow-y: scroll;
		color: white;
	}

	.sure {
		background: #ff6444;
		color: white;
		padding: 20rpx;
		margin: 100rpx auto;
		width: 200rpx;
		text-align: center;
		border-radius: 10rpx;
	}

	.text-orange {
		color: orange !important;
	}
</style>

<style lang="scss">
	@import "./main.scss";
</style>
