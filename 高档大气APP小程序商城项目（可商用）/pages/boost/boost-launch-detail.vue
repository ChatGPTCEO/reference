<template>
	<view>
		<view class="boost-launch-detail">
			<image src="https://www.chunfengbuy.com/image/boost-launch-detail-bgimg.png" class="boost-launch-detail-bgimg" mode=""></image>
			<view class="w-750 boost-launch-info">
				<view class="row-ac-sb flex-1">
					<view class="row-ac ml-3">
						<image :src="boostLaunchUser.userImage" mode=" " class="user-image"></image>
						<view class="font-s-4 ml-2 text-white">{{boostLaunchUser.name}}发起</view>
					</view>
					<view class="boost-rule row font-s-2">助力规则</view>
				</view>
				<view class="flex-1 row-a-j-fc mt-2">
					<view class="font-w font-s-7 zindex-1 text-white" v-if="boostLaunchActiveDetail.time.hou > 0">{{ boostLaunchActiveDetail.time.hou }}:{{ boostLaunchActiveDetail.time.min }}:{{ boostLaunchActiveDetail.time.sec }}后结束</view>
					<view class="font-w font-s-7 zindex-1 text-white" v-else>已经结束</view>
					<view class="boost-title in1line font-w mt-2">{{ boostLaunchActiveDetail.title }}</view>
					<view class="boost-price font-w font-s-9"><text class="font-s-5 mr-1">到手价:￥</text>{{ toGetMoney | num1Filter }}<text class="font-s-5">元</text>
					</view>
					<view class="font-s-4 text-de text-white zindex-1">原价:{{ boostLaunchActiveDetail.price | num1Filter }}</view>
					<view class="boost-goods-box">
						<image :src="boostLaunchActiveDetail.noColorImg" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="row-ac-sb my-1 flex-1 mx-5 text-white">
				<view class="row-a-j-fc ml-2">
					<view class="font-s-6 boost-money">{{ boostLaunchActiveDetail.boostMoney }}</view>
					<view class="font-s-1">已助力金额</view>
				</view>
				<view class="row-a-j-fc">
					<view class="font-s-6 boost-money">{{ boostLaunchActiveDetail.doPeople }}</view>
					<view class="font-s-1">已助力人数</view>
				</view>
				<view class="row-a-j-fc mr-2">
					<view class="font-s-6 boost-money">{{ boostLaunchActiveDetail.noPeople }}</view>
					<view class="font-s-1">还差助力人数 </view>
				</view>
			</view>
			<view class="flex-1 row-a-j-fc invitation-tobuy">

				<!-- #ifdef MP-WEIXIN -->
				<button class="invitation row" open-type="share">邀请好友助力</button>
				<!-- #endif -->
				<!-- #ifdef APP-PLUS || H5 -->
				<view class="invitation row mt-3" @click="shareActive">邀请好友助力</view>
				<!-- #endif -->
				<view class="invitation row mt-3" v-if="boostLaunchActiveDetail.nowUserId !== boostLaunchActiveDetail.userId" @click="helpKnife">助一臂之力</view>
                <view v-if="boostLaunchActiveDetail.nowUserId === boostLaunchActiveDetail.userId">
                    <view class="tobuy row mt-3"  v-if="boostLaunchActiveDetail.noPeople <= 0" @click="toCreateOrder">已完成，马上下单</view>
                    <view class="tobuy row mt-3" v-else>未完成</view>
                </view>

			</view>
			<view class="invitation-friend-box flex-1 mt-3 rounded mx-3">
				<view class="flex-1 row py-3">
					<view class="invitation-line"></view>
					<view class="mx-2 font-s-6 font-w invitation-title">好友助力榜</view>
					<view class="invitation-line"></view>
				</view>
				<view class="row-ac-sb flex-1 pb-3 mx-2">
					<view class="ml-1">助力成员</view>
					<view>助力时间</view>
					<view class="mr-1">助力金额</view>
				</view>
				<view class="row-ac-sb flex-1 pb-3 mx-2" v-for="(item,index) in boostLaunchActiveDetail.peopleList" :key="index">
					<view class="row-ac">
						<image :src="item.userImage" class="user-image-1" mode=""></image>
						<view class="font-s-3 in1line" style="width: 170rpx;">{{ item.name }}</view>
					</view>
					<view class="font-s-2">{{ item.helpTime }}</view>
					<view class="font-s-4">{{ item.helpAmount }}</view>
				</view>
			</view>


		</view>
		<!-- <view class="w-750" style="height: 300rpx;"><image :src="boostLaunchActiveDetail.noColorImg" mode=""></image></view>
		<view>{{ boostLaunchActiveDetail.title }}</view>
		<view>
			<view v-if="boostLaunchActiveDetail.skuList.length > 0">
				规格
				<text v-for="skuLabel in boostLaunchActiveDetail.skuList" :key="skuLabel.id">{{ skuLabel }}</text>
			</view>
			<view v-else>单规格</view>
		</view> -->
		<!-- <view>
			<view>已助力金额{{ boostLaunchActiveDetail.boostMoney }}</view>
			<view>已助力人数{{ boostLaunchActiveDetail.doPeople }}</view>
			<view>还差助力{{ boostLaunchActiveDetail.noPeople }}</view>
		</view> -->
		<!-- <view @click="generatePoster">生成分享海报</view> -->
		<!-- #ifdef MP-WEIXIN -->
		<!-- <button open-type="share">分享给好友</button> -->
		<!-- #endif -->
		<!-- #ifdef APP-PLUS -->
		<!-- <view @click="shareActive">分享给好友</view> -->
		<!-- #endif -->

		<!-- <view @click="helpKnife">砍一刀</view>
		<view>
			<view v-if="boostLaunchActiveDetail.noPeople <= 0" @click="toCreateOrder">已完成，马上下单</view>
			<view v-else>未完成</view>
		</view>
		<view>
			<view>好友助理列表</view>
			<view class="d-f justify-between">
				<view>成员</view>
				<view>助力时间</view>
				<view>助力金额</view>
			</view>
			<view class="d-f justify-between" v-for="item in boostLaunchActiveDetail.peopleList" :key="item.id">
				<view>
					<image style="width: 50rpx;height: 50rpx" :src="item.userImage"></image>
					<text>{{ item.name }}</text>
				</view>
				<view>{{ item.helpTime }}</view>
				<view>{{ item.helpAmount }}</view>
			</view>
		</view>

		<view class="my-canvas-box" @touchmove.stop.prevent :class="posterInfo.status ? 'show' : 'hide'" @click="posterInfo.status = false">
			<canvas class="my-canvas" canvas-id="myCanvas" @longpress.stop="saveSharePic"></canvas>
			<view class="canvas-tip">长按可保存海报</view>
		</view> -->
	</view>
</template>

<script>
import { boostLaunchActiveDetailUrl, boostShareDetailUrl, helpKnifeBoostUrl } from '@/api/index';
import { checkLogin,countDownUtil } from '@/utils/util';
export default {
	data() {
		return {
			boostLaunchActiveDetail: {
				skuList: [],
				time:{
					hou:'',
					min:'',
					sec:''
				}
			},
			helpKnifeMoney: 0.0,
			boostLaunchUser: {},
			posterInfo: {
				status: false
			},
			pageOptions:{},
			toGetMoney:0 
		};
	},
	onLoad(options) {
		this.initData(options);
	},
	filters: {
		numFilter(value) {
			let realVal = parseFloat(value).toFixed(0);
			return realVal;
		},
		num1Filter(value) {
			let realVal = parseFloat(value).toFixed(1);
			return realVal;
		}
	},
	methods: {
		initData(options) {
			this.pageOptions = options
			if (options.scene) {
				this.sceneInfo = options.scene;
				let obj = {
					boostId: options.scene
				};
				this.getBoostLaunchActiveDetail(obj);
				this.getBoostShareDetail(obj)
			} else if (options.boostId) {
				this.getBoostLaunchActiveDetail(options);
				this.getBoostShareDetail(options)
			}
		},
		// 获取助力详情
		getBoostLaunchActiveDetail(options) {
			this.$R.get(boostLaunchActiveDetailUrl + options.boostId, { id: options.boostId }).then(res => {
				this.boostLaunchActiveDetail = res.data;
				this.$set(this.boostLaunchActiveDetail, 'skuList', []);
				if (this.boostLaunchActiveDetail.skuName.length !== 0) {
					for (let i in this.boostLaunchActiveDetail.skuName) {
						this.boostLaunchActiveDetail.skuList.push(this.boostLaunchActiveDetail.skuName[i]);
					}
				}
				
				this.toGetMoney = this.boostLaunchActiveDetail.price - this.boostLaunchActiveDetail.boostInitiatePrice;
				let time = countDownUtil(this.boostLaunchActiveDetail.usedEndTime);
				this.$set(this.boostLaunchActiveDetail, 'time', time);
			});
		},
		// 获取助力人信息
		getBoostShareDetail(options){
			console.log(options)
			this.$R.get(boostShareDetailUrl + options.boostId, { id: options.boostId }).then(res => {
				this.boostLaunchUser = res.data;
				this.boostLaunchUser.path = this.appUrl + '/' + this.boostLaunchUser.path
				
			});
		},
		// 生成助力海报
		async generatePoster() {
			let loginStatus = checkLogin();
			if (!loginStatus) {
				return false;
			}
			uni.showToast({
				title: '正在生成海报，请稍后',
				icon: 'none',
				duration: 3000
			});

			let context = uni.createCanvasContext('myCanvas');

			let baseUrlUrl = this.$R.baseUrl();
			baseUrlUrl = baseUrlUrl.substring(0, baseUrlUrl.length - 4);

			// 给整个填充白色背景
			context.setFillStyle('#ffffff');
			context.fillRect(0, 0, 500, 900);
			context.draw();
			// 绘制用户昵称
			context.setFontSize(14);
			context.setFillStyle('#000000');
			context.fillText(this.boostLaunchUser.name, 100, 48);
			context.setFontSize(12);
			context.setFillStyle('#999999');
			context.fillText('帮我助力一下吧', 100, 68);
			// 绘制价格
			context.setFontSize(18);
			context.setFillStyle('red');
			context.fillText(`还差${this.boostLaunchActiveDetail.doPeople}人就完成了`, 20, 366);
			// 绘制商品名称
			this.drawText(this.boostLaunchActiveDetail.title, 20, 379, context);
			// 绘制头像
			await uni.downloadFile({
				url: this.boostLaunchUser.userImage,
				success: function(res) {
					context.save();
					context.beginPath();
					context.arc(50, 50, 30, 0, 2 * Math.PI);
					context.clip();
					context.drawImage(res.tempFilePath, 20, 20, 60, 60);
					context.restore();
					context.draw(true);
				}
			});
			// 绘制商品详情
			await uni.downloadFile({
				url: this.boostLaunchActiveDetail.img[0],
				success: function(res) {
					context.drawImage(res.tempFilePath, 15, 92, 245, 245);
					context.draw(true);
				}
			});
			// 绘制小程序码
			await uni.downloadFile({
				url: baseUrlUrl + '/' + this.boostLaunchUser.path,
				success: function(res) {
					context.drawImage(res.tempFilePath, 165, 360, 100, 100);
					context.draw(true);
				}
			});

			// 绘制完成，关闭动画
			setTimeout(() => {
				this.posterInfo.status = true;
			});
		},
		// canvas文字换行
		drawText(context, x, y, canvas) {
			let strArr = [];
			let n = 11;
			for (let i = 0, l = context.length; i < l / n; i++) {
				let a = context.slice(n * i, n * (i + 1));
				strArr.push(a);
			}
			strArr.forEach((item, index) => {
				// 限制只能显示5行
				if (index > 3) {
					return;
				}
				y += 20;
				canvas.setFontSize(12);
				canvas.setFillStyle('#333333');
				canvas.fillText(item, x, y);
			});
		},
		// 微信小程序分享分享给好友
		onShareAppMessage(res) {
			if (res.from === 'button') {
				// 来自页面内分享按钮
				console.log(res.target);
			}
			return {
				title: '帮我助力吧,到手价仅需' + this.toGetMoney.toFixed(2) + '元' ,
				path: '/pages/boost/boost-launch-detail?boostId=' + this.boostLaunchActiveDetail.id
			};
		},
		// 保存生成的海报
		saveSharePic() {
			let that = this;
			let url = this.$R.baseUrl();
			let canvasImg = '';
			uni.showModal({
				title: '提示',
				content: '确定要保存分享海报吗？',
				success: function(res) {
					if (res.confirm) {
						// canvas生成图片
						uni.canvasToTempFilePath({
							fileType: 'jpg',
							canvasId: 'myCanvas',
							quality: 1,
							success: function(res) {
								// 保存带哦本地
								uni.saveImageToPhotosAlbum({
									filePath: res.tempFilePath,
									success: function() {
										uni.showToast({
											title: '保存海报成功',
											icon: 'none',
											duration: 3000
										});
									},
									fail: function() {
										uni.showToast({
											title: '保存海报失败',
											icon: 'none',
											duration: 3000
										});
									}
								});
							}
						});
					}
				}
			});
		},
		// APP分享到微信
		shareActive() {
			uni.share({
				provider: 'weixin',
				scene: 'WXSceneSession',
				type: 5,
				imageUrl: this.boostLaunchActiveDetail.img[0],
				title: this.appUrl,
				miniProgram: {
					id: 'wx7ca4d49be107d312',
					path: 'pages/boost/boost-launch-detail?boostId=' + this.boostLaunchActiveDetail.id,
					type: 0,
					webUrl: this.appUrl
				},
				success: ret => {
					console.log(JSON.stringify(ret));
				}
			});
		},
		// 帮忙砍一刀
		helpKnife() {
			let loginStatus = checkLogin();
			if (!loginStatus) {
				return false;
			}
			this.$R.put(helpKnifeBoostUrl + this.boostLaunchActiveDetail.id, { id: this.boostLaunchActiveDetail.id }).then(res => {
				console.log(res);
				this.helpKnifeMoney = res.data.money;
				uni.showToast({
				  title: '助力成功助力了'+this.helpKnifeMoney,
				  icon: 'none',
				  duration: 3000
				})
				this.initData(this.pageOptions)
				/* let timer = setInterval(() => {
					this.helpKnifeMoney = (Math.random() * 10).toFixed(2);
				}, 100);
				setTimeout(() => {
					clearInterval(timer);
					this.helpKnifeMoney = res.data.money;
					uni.showToast({
					  title: '助力成功助力了'+this.helpKnifeMoney,
					  icon: 'none',
					  duration: 3000
					})
					this.initData(this.pageOptions)
				}, 1500); */
			});
		},
		// 创建订单
		async toCreateOrder() {
			let loginStatus = checkLogin();
			if (!loginStatus) {
				return false;
			}
			uni.navigateTo({
				url: '/pages/order/establishorder?orderType=boost&boostId=' + this.boostLaunchActiveDetail.id
			});
		}
	},
	computed: {
		appUrl() {
			let url = this.$R.baseUrl();
			return `${url.substring(0, url.length - 4)}`;
		}
	}
};
</script>

<style lang="scss">
	page{
		background-color: #D71C25;
	}
	.boost-launch-detail{
		background: -webkit-gradient(linear, 0 30%, 0 100%,from(#F74951), to(#D71C25));
		.boost-launch-detail-bgimg{
			width: 750rpx;
			height: 555rpx;
			position: absolute;
		}
		.boost-launch-info{
			.user-image{
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
				border: 3rpx solid #DEE2E6;
			}
			.boost-rule{
				width: 138rpx;
				height: 43rpx;
				background-color: #FFDB48;
				border-radius: 22rpx 0 0 22rpx;
				color: #682507;
				box-shadow: 0rpx 0rpx 15rpx rgba(0, 0, 0, 0.5);;
			}
			.boost-title{
				width: 500rpx;
				height: 60rpx;
				font-size: 38rpx;
				color: #FFFBCD;
				z-index: 1;
			}
			.boost-price{

				color: #FFFBCD;
				z-index: 1;
				margin-top: 20rpx;
			}
			.boost-goods-box{
				width: 750rpx;

			}
		}
		.boost-percentage{
			width: 420rpx;
			height: 40rpx;
			border-radius: 20rpx;
			background-color: #FEDADC;
			.boost-percentage-1{
				height: 40rpx;
				border-radius: 20rpx;
				background-color: #D71C25;
			}
		}
		.boostInitiate-Price{
			color: #D71C25;
		}
		.invitation-tobuy{
			margin-top: 80rpx;
			.invitation{
				width: 340rpx;
				height: 80rpx;
				border-radius: 40rpx;
				background-color: #FADDAA;
				color: #721D00;
			}
			.tobuy{
				width: 340rpx;
				height: 80rpx;
				border-radius: 40rpx;
				background-color: #FADDAA;
				color: #721D00;
			}
		}
		.invitation-friend-box{
			background-color: #FADDAA;
			color: #721D00;
			.invitation-line{
				width: 80rpx;
				height: 6rpx;
				border-radius: 3rpx;
				background-color: #721D00;
			}
			.invitation-title{
				color: #721D00;
			}
			.user-image{
				width: 90rpx;
				height: 90rpx;
				border-radius: 50%;
				border: 2rpx solid #C0C0C0;
			}
		}
		.user-image-1{
			width: 45rpx;
			height: 45rpx;
			border: 2rpx solid #CBD3DA;
			border-radius: 50%;
		}

	}
.my-canvas-box {
	width: 750rpx;
	height: 100%;
	position: fixed;
	background-color: rgba(0, 0, 0, 0.6);
	z-index: 99;
	top: 0;
	left: 0;
	&.hide {
		display: none;
	}

	&.show {
		display: block;
	}

	.canvas-tip {
		color: #ffffff;
		font-size: 24rpx;
		margin-top: 30rpx;
		text-align: center;
	}

	/* #ifdef MP-WEIXIN */
	.my-canvas {
		width: 500rpx;
		height: 900rpx;
		background-color: #ffffff;
		margin-left: 125rpx;
		margin-top: 300rpx;
	}

	/* #endif */

	/* #ifdef APP-PLUS || H5 */
	.my-canvas {
		width: 500rpx;
		height: 900rpx;
		background-color: #ffffff;
		margin-left: 125rpx;
		margin-top: 220rpx;
	}

	/* #endif */
}
</style>
