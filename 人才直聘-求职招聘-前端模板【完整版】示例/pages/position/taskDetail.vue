<template>
	<view class="content">
		<view class="body">
			<view class="title">
				<text class="name">{{task.name}}</text>
				<view class="info">
					<text class="label">匹配中</text>
					<text class="label-type">{{ task.type }}</text>
					<text class="label-type">{{ task.number }}人报名</text>
				</view>
			</view>
			<view class="item">
				<text>预算金额</text>
				<text>￥{{task.money}}</text>
			</view>
			<view class="item">
				<text>发布日期</text>
				<text>{{ formatCreateTime(task.createTime) }}</text>
			</view>
			<view class="desc">
				<text class="desc-title">需求描述</text>
				<text class="desc-content">{{task.content}}</text>
			</view>
		</view>
		<view class="bottom"><uni-goods-nav :fill="true" :options="options" :button-group="customButtonGroup" @click="onClick" @buttonClick="buttonClick" /></view>
		<view class="share-pro">
			<view class="share-pro-mask" v-if="deliveryFlag"></view>
			<view class="share-pro-dialog" :class="deliveryFlag ? 'open' : 'close'">
				<view class="close-btn" @tap="handleClose"><text class="yzb yzb-shanchu"></text></view>
				<view class="share-pro-title">分享</view>
				<view class="share-pro-body">
					<view class="share-item">
						<button open-type="share" plain="true" class="btn-share">
							<text class="yzb yzb-weixinhaoyou"></text>
							<view>分享给好友</view>
						</button>
					</view>
					<!-- <view class="share-item" @tap="handleShowPoster">
						<text class="yzb yzb-Photo-share"></text>
						<view>生成分享图片</view>
					</view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { formatDate } from '@/common/date';
export default {
	computed: {
		...mapState(['userInfo']),
		...mapGetters(['hasLogin'])
	},
	data() {
		return {
			task:{},
			deliveryFlag: false, //
			options: [
				{
					icon: 'home',
					text: '首页',
					color: '#646566'
				},
				{
					icon: 'redo',
					text: '分享',
					color: '#646566'
				},
			],
			customButtonGroup: [
				{
					text: '立即报名',
					backgroundColor: 'linear-gradient(90deg, #f0ad4e, #FE6035)',
					color: '#fff'
				}
			],
			id:null,
		};
	},
	
	
	onLoad(options) {
		this.id=options.id;
	},
	
	onShow() {
		this.getDetail(this.id);
	},
	
	methods: {
		
		async getDetail(id){
			let res = await this.$apis.getTaskDetail({ id: id });
			console.log('res====', res);
			if (res) {
				this.task=res;
				if(res.ifApply){
					this.customButtonGroup[0].text="你已报名";
					this.customButtonGroup[0].backgroundColor='linear-gradient(90deg, #999, #666)';
				}else{
					this.customButtonGroup[0].backgroundColor='linear-gradient(90deg, #f0ad4e, #FE6035)';
					this.customButtonGroup[0].text="立即报名"
				}
			}
		},
		
		formatCreateTime(time) {
			if (time == null || time === '') {
				return null;
			}
			let str = time.replace(/-/g,'/');
			let date = new Date(str);
			return formatDate(date, 'yyyy-MM-dd');
		},
		
		onClick(e) {
			console.log(e);
			if (e.index == 0) {
				//首页
				console.log('跳转首页');
				this.$mRouter.switchTab({
					route: this.$mRoutesConfig.index
				});
			} else if (e.index == 1) {
				//分享
				this.shareEvn();
			} else if (e.index == 2) {
			}
		},
		buttonClick(e) {
			console.log(e);
			let that = this;
			if (this.hasLogin) {
				if(this.task.ifApply){
					return;
				}
				this.$mRouter.push({
					route: this.$mRoutesConfig.taskApply,
					query: {
						id: this.id
					}
				});
			} else {
				this.$mRouter.push({
					route: this.$mRoutesConfig.login
				});
			}
		},
		
		/**
		 *  分享弹窗
		 */
		shareEvn() {
			console.log('分享弹窗');
			this.deliveryFlag = true;
		},
		
		/**
		 * 关闭分享弹窗
		 */
		handleClose() {
			this.deliveryFlag = false;
		},
		
		onShareAppMessage: function(e) {
			console.log('点击分享',e.from);
			this.addShare();
			return {
				title: this.task.name,
				path:'/pages/position/taskDetail?id='+this.id+"&tcode="+this.userInfo.memberSn,
			};
		},
		
		onShareTimeline(res) {
			console.log(res);
			return {
				title: this.task.name,
				path:'/pages/position/taskDetail?id='+this.id+"&tcode="+this.userInfo.memberSn,
			};
		},
		
		/**
		 * 添加浏览记录
		 */
		async addShare() {
			let param = {
				type: 2,//0-职位分享，1-课程分享，2-任务分享
				dataId: this.id
			};
			let res = await this.$apis.updateShare(param);
			if (res) {
				console.log("addShare success !!!");
			}
		},
	}
};
</script>

<style lang="scss">
	
.body{
	margin-bottom: 100upx;
	padding: 20upx;
	.title{
		padding-bottom: 20upx;
		border-bottom: 1upx solid $border-color-light;
		.name{
			font-weight: bold;
			font-size: $uni-font-size-lg;
		}
		.info{
			padding: 10upx 0;
			text{
				font-size: $uni-font-size-base;
				padding: 5upx 10upx;
				margin-right: 15upx;
				border-radius: 5upx;
			}
			.label-type {
				background-color: $border-color-base;
				color: $font-color-666;
			}
			.label {
				border: 1upx solid $font-color-orange;
				color: $font-color-orange;
			}
		}
	}
	
	.item{
		width: 100%;
		padding: 15upx 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1upx solid $border-color-light;
		
		text:first-child{
			font-weight: bold;
			font-size: $uni-font-size-lg;
		}
		text:nth-child(2){
			font-size: $uni-font-size-lg;
			color:$font-color-orange;
		}
	}
	.desc{
		display: flex;
		flex-direction: column;
		padding: 15upx 0;
		.desc-title{
			font-weight: bold;
			font-size: $uni-font-size-lg;
		}
		.desc-content{
			padding: 10upx 0;
			color: $font-color-666;
		}
	}
}

.bottom {
	position: fixed;
	bottom: 0;
	width: 100%;
	// padding: 10upx 0;
	background-color: $bgcolor_white;
	border-top: 1upx solid $border-color-base;
}

.share-pro {
	z-index: 1000;
	display: flex;
	line-height: 1;
	box-sizing: border-box;
	align-items: center;
	justify-content: flex-end;
	flex-direction: column;

	.share-pro-mask {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
	}

	.share-pro-dialog {
		position: relative;
		position: fixed;
		bottom: 0;
		width: 750rpx;
		height: 310rpx;
		overflow: hidden;
		background-color: #fff;
		border-radius: 24rpx 24rpx 0 0;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;

		.yzb-shanchu {
			font-size: 40upx;
		}

		.close-btn {
			position: absolute;
			top: 0rpx;
			right: 29rpx;
			padding: 20rpx 15rpx;
		}

		.share-pro-title {
			padding: 28rpx 41rpx;
			font-size: 28rpx;
			color: #1c1c1c;
			background-color: #f7f7f7;
		}

		.share-pro-body {
			display: flex;
			font-size: 28rpx;
			height: 100%;
			color: #1c1c1c;
			flex-direction: row;
			justify-content: space-around;

			.share-item {
				display: flex;
				flex-direction: column;
				justify-content: center;
				justify-content: center;
				align-items: center;

				.btn-share {
					background: #ffff;
					border: #ffffff;
					display: flex;
					flex-direction: column;
					align-items: center;
				}

				.share-icon {
					// margin-top: 30rpx;
					// margin-bottom: 16rpx;
					font-size: 70rpx;
					color: #42ae3c;
					text-align: center;
				}

				&:nth-child(2) {
					.share-icon {
						color: #ff5f33;
					}
				}

				.yzb {
					font-size: 60upx;
					line-height: 90upx;
				}

				.yzb-weixinhaoyou {
					color: $uni-color-success;
				}

				.yzb-Photo-share {
					color: $uni-color-error;
				}
			}
		}
	}

	/* 显示或关闭内容时动画 */

	.open {
		transform: translateY(0);
		transition: all 0.3s ease-out;
	}

	.close {
		transform: translateY(310rpx);
		transition: all 0.3s ease-out;
	}
}

</style>
