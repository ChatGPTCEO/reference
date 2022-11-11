<template>
	<view class="container">
		<view class="statusBar-container" :style="{'height':statusBarHeight + 'px','background':backgroundColor}">
		</view>
		<view class='navbar-container' :style="{'top': navigationBarTop + 'px','background':backgroundColor,
		'height':navigationBarHeight + 'px','border-bottom':boderBottom}">
			<view class='left-container' v-if="myback || home"
				:style="{'left':baiduSpecialBack ? '40px':'5px','height':navigationBarHeight + 'px','background':backgroundColor}">
				<view class="left-icon-box"
					:style="{'margin-right':baiduSpecialBack ? '27px':'10px','background':backgroundColor}"
					v-if="myback && !baiduSpecialBack" @tap='backBefore'>
					<image v-if="!alipaySpecialBack" style="width:18rpx;height:30rpx;"
						src='https://code-grade-server-prd.oss-cn-shenzhen.aliyuncs.com/smart-config-img/back.png' lazy-load="true"></image>
					<view style="width:18rpx;height:30rpx;" v-else></view>
				</view>
				<view v-if="myback" class="back-text" @click="backBefore">{{backText}}</view>
				<view class="left-icon-box" v-if="home" @tap='backHome' :style="{'background':backgroundColor}">
					<image style="width:30rpx;height:32rpx;" src='https://code-grade-server-prd.oss-cn-shenzhen.aliyuncs.com/smart-config-img/home.png'
						lazy-load="true"></image>
				</view>
			</view>
			<view class='title-container-title' :style="{'height':navigationBarHeight + 'px','color':titleColor}">
				{{titText}}
			</view>
		</view>
		<!-- 因为设置fixed后页面元素整体上移了navigationBarHeight，所以在此组件里设置一个空白view元素占用最上面的navigationBarHeight这块高度 -->
		<view :style="{'height':statusBarHeight + navigationBarHeight + 'px','background': '#00000000'}"></view>
	</view>

</template>
<script>
	import util from '@/utils/util.js'
	export default {
		name: "navigationBar",
		props: {
			propName: { // 属性名
				type: String,
				value: 'val'
			},
			text: {
				type: String,
				value: ''
			},
			backText: {
				type: String,
				value: ''
			},
			back: {
				type: Boolean,
				value: false
			},
			home: {
				type: Boolean,
				value: false
			},
			backgroundColor: {
				type: String,
				value: '#F2F2F2'
			},
			titleColor: {
				type: String,
				value: '#F2F2F2'
			},
			boderBottom: {
				type: String,
				value: '1rpx solid #F0F2F5'
			},
			outSideBackPage: {
				type: Boolean,
				value: false
			}

		},
		computed: {
			titText() {
				return this.text;
			},
			myback() {
				return this.back;
			}
		},
		data() {
			return {
				statusBarHeight: 0,
				navigationBarTop: 0,
				navigationBarHeight: 0,
				navigationBar_factor: 0,
				baiduSpecialBack: false,
				alipaySpecialBack: false,
			};
		},


		mounted: function() {
			var res = util.uniqueGetSystemInfo()
			var temFactor = (res.navigationBarHeight || res.titleBarHeight || 44) / 44
			var tempTop = res.statusBarHeight
			var tempHeight = (res.navigationBarHeight || res.titleBarHeight || 44)
			this.statusBarHeight = res.statusBarHeight
			this.navigationBarTop = tempTop
			this.navigationBarHeight = tempHeight
			this.navigationBar_factor = temFactor
		},

		methods: {
			backHome() {
				uni.reLaunch({
					url: '/pages/index/index'
				});
			},
			backBefore() {
				if (!this.outSideBackPage) {
					uni.navigateBack({
						delta: 1
					});
				} else {
					this.$emit('backLastQ', Math.round(new Date()))
				}
			}
		}
	};
</script>
<style lang="scss" scoped>
	.navbar-container {
		left: 0;
		width: 100%;
		z-index: 9999;
		border-bottom: 1rpx solid #F0F2F5;
		position: fixed;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		background-color: white;
	}

	.statusBar-container {
		background-color: white;
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999;
	}

	.navbar-container .left-container {
		position: absolute;
		background: rgba(255, 255, 255, 0.6);
		//border: 1px solid #fff;
		border-radius: 16px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.left-container .left-icon-box {
		width: 22px;
		height: 22px;
		background-color: white;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.back-text {
		font-size: 24rpx;
		font-weight: 400;
		color: #29211D;
	}

	.navbar-container .title-container-title {
		color: #3B4144;
		width: 40%;
		text-align: center;
		font-size: 32rpx;
		line-height: 44px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-weight: bold;
	}
</style>
