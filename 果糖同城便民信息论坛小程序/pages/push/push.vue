<template>
	<view>
		<view class="gird">
			<u-grid :col="4" :border="false">
				<u-grid-item v-if="opentop" style="background: rgba(0,0,0,0);" @click="openModel('job')">
					<u-image width="80rpx" height="80rpx" src="@/static/images/menu1.png"></u-image>
					<view class="grid-text">招聘求职</view>
				</u-grid-item>
				<u-grid-item style="background: rgba(0,0,0,0);" @click="openModel('house')">
					<u-image width="80rpx" height="80rpx" src="@/static/images/menu2.png"></u-image>
					<view class="grid-text">房产交易</view>
				</u-grid-item>
				
				<u-grid-item style="background: rgba(0,0,0,0);" @click="navTo('/pagesPush/commodity/commodity')">
					<u-image width="80rpx" height="80rpx" src="@/static/images/menu3.png"></u-image>
					<view class="grid-text">物品交易</view>
				</u-grid-item>
				
				<u-grid-item style="background: rgba(0,0,0,0);" @click="navTo('/pagesPush/promote/promote')">
					<u-image width="80rpx" height="80rpx" src="@/static/images/menu4.png"></u-image>
					<view class="grid-text">本地推广</view>
				</u-grid-item>
			</u-grid>
		</view>
		<u-popup v-model="modelshow" mode="center" border-radius="15">
			<view class="modelcont">
				<view class="cont">
					<block v-if="showType==='job'">
						<view class="cell" @click="navTo('/pagesPush/job/job')">
							<text>发职位找人才</text>
						</view>
						<view class="cell" @click="navTo('/pagesPush/resume/resume')">
							<text>发简历找工作</text>
						</view>
					</block>
					<block v-if="showType==='house'">
						<view class="cell" @click="navTo('/pagesPush/house_rent/house_rent')">
							<text>房屋出租</text>
						</view>
						<view class="cell" @click="navTo('/pagesPush/house_sell/house_sell')">
							<text>房屋出售</text>
						</view>
					</block>
					
					
				</view>
				<view class="close" @click="modelshow=false">
					<u-icon name="close" color="#333333" size="35"></u-icon>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		APP_NAME
	} from '../../env.js'
	import {
		mapActions,
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				modelshow: false,
				showType: '',
				opentop: false,
			}
		},
		onLoad() {
			this.getVerify()
		},
		onShareAppMessage() {
			return {
				title: APP_NAME,
				path: '/pages/index/index'
			}
		},
		computed: {
			...mapState({
				isLogin: state => state.user.isLogin,
			})
		},
		methods: {
			getVerify() {
				this.$u.get('/addons/hicity/index/getVerify', {}).then(res => {
					this.opentop = res.opentop;
				})
			},
			openModel(type) {
				this.showType = type;
				this.modelshow = true;
			},
			navTo(path) {
				this.modelshow = false;
				if (this.isLogin) {
					this.$u.route(path)
				} else {
					this.$u.route('/pages/login/login')
				}
			}
		}
	}
</script>
<style>
	page {
		background-color: white;
	}
</style>
<style lang="scss" scoped>
	.gird {
		background-color: white;
		border-radius: 20rpx;
	}

	.modelcont {
		padding: 30rpx;
		width: 500rpx;

		.cont {
			.cell {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				height: 80rpx;
				font-size: 30rpx;
				color: #333333;
				background-color: #F1F1F1;
				border-radius: 10rpx;
				margin-bottom: 20rpx;
			}
		}

		.close {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			height: 50rpx;
		}
	}
</style>
