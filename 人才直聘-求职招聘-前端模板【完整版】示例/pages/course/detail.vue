<template>
	<view class="content">
		<m-swiper :list="banner"></m-swiper>
		<view class="body">
			<view class="name">
				<text>课程名称</text>
				<text>{{ data.number }}人报名</text>
			</view>
			<view class="title">
				<text>{{ data.name }}</text>
				<text>{{ data.brief }}</text>
			</view>
			<view class="name"><text>开课时间</text></view>
			<text class="time">{{ formatCreateTime(data.startTime)}}</text>
			<view class="name"><text>授课老师</text></view>
			<text class="teacher">{{ data.teachers }}</text>
			<view class="name"><text>上课地点</text></view>
			<text class="address">{{ data.address }}</text>
			<view class="name"><text>课程介绍</text></view>
			<view class="detail"><rich-text style="word-wrap: break-word;word-break: break-all;" :nodes="data.content"></rich-text></view>
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
import mSwiper from '@/components/m-swiper/m-swiper2.vue'
import { formatDate } from '@/common/date';;
export default {
	components: {
		mSwiper
	},
	computed: {
		...mapState(['userInfo']),
		...mapGetters(['hasLogin'])
	},
	data() {
		return {
			banner: [
				{
					pic: 'https:\/\/bendao.oss-cn-shenzhen.aliyuncs.com\/job\/20211107\/92ad7898b00e4eea967a29cf41850b03.png',
					url: 'http:\/\/www.gqhsps.com',
					urlType: 0
				},
				{
					pic: 'https:\/\/bendao.oss-cn-shenzhen.aliyuncs.com\/job\/20211107\/710a8d8f690f4ff095ce456060158202.png',
					url: 'http:\/\/www.gqhsps.com',
					urlType: 0
				},
				{
					pic: 'https:\/\/bendao.oss-cn-shenzhen.aliyuncs.com\/job\/20211107\/710a8d8f690f4ff095ce456060158202.png',
					url: 'http:\/\/www.gqhsps.com',
					urlType: 0
				}
			],

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
				}
			],
			customButtonGroup: [
				{
					text: '立即报名',
					backgroundColor: 'linear-gradient(90deg, #f0ad4e, #FE6035)',
					color: '#fff'
				}
			],
			data: {}
		};
	},

	onLoad(options) {
		this.id = options.id;
		this.getCourseDetail();
	},

	methods: {
		async getCourseDetail() {
			let res = await this.$apis.getCourseDetail({ id: this.id });
			if (res) {
				this.data = res;
				if(res.ifApply){
					this.customButtonGroup[0].text="你已报名";
					this.customButtonGroup[0].backgroundColor='linear-gradient(90deg, #999, #666)';
				}else{
					this.customButtonGroup[0].backgroundColor='linear-gradient(90deg, #f0ad4e, #FE6035)';
					this.customButtonGroup[0].text="立即报名"
				}
			}
		},

		onClick(e) {
			if (e.index == 0) {
				//首页
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
			let that = this;
			if (this.hasLogin) {
				if(!this.data.ifApply){
					//申请职位
					uni.showModal({
						title: '提示',
						content: '确定立即报名？',
						success: res => {
							if (res.confirm) {
								that.doApply();
							}
						}
					});
				}
			} else {
				this.$mRouter.push({
					route: this.$mRoutesConfig.login
				});
			}
		},
		
		async doApply(){
			let param={
				courseId:this.id
			};
			let res = await this.$apis.applyCourse(param);
			if(res){
				uni.showToast({
					icon:'none',
					title:'报名成功'
				})
			}else{
				uni.showToast({
					icon:'none',
					title:'报名成功'
				})
			}
		},
		
		/**
		 *  分享弹窗
		 */
		shareEvn() {
			this.deliveryFlag = true;
		},

		/**
		 * 关闭分享弹窗
		 */
		handleClose() {
			this.deliveryFlag = false;
		},
		
		formatCreateTime(time) {
			if (time == null || time === '') {
				return null;
			}
			let str = time.replace(/-/g,'/');
			let date = new Date(str);
			return formatDate(date, 'yyyy-MM-dd hh:mm');
		},
		
		onShareAppMessage: function(e) {
			this.addShare();
			return {
				title: this.data.name,
				path:'/pages/course/detail?id='+this.id+"&tcode="+this.userInfo.memberSn,
			};
		},
		
		onShareTimeline(res) {
			return {
				title: this.data.name,
				path:'/pages/course/detail?id='+this.id+"&tcode="+this.userInfo.memberSn,
			};
		},
		
		/**
		 * 添加浏览记录
		 */
		async addShare() {
			let param = {
				type: 1,//0-职位分享，1-课程分享，2-任务分享
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
.body {
	margin-bottom: 100upx;
	width: 100%;
	box-sizing: border-box;
	padding: 20upx;
	display: flex;
	flex-direction: column;

	.name {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin-top: 10upx;
		text:first-child {
			font-weight: bold;
			font-size: $uni-font-size-lg;
			padding: 10upx 0;
		}
		text:nth-child(2) {
			color: $font-color-orange;
		}
	}

	.title {
		display: flex;
		flex-direction: column;
		text:first-child {
			font-weight: bold;
			font-size: $font-base-more;
			padding: 10upx 0;
			color: $font-color-333;
		}
		text:last-child {
			color: $font-color-666;
			line-height: 1.4;
		}
	}
	.time {
		padding: 10upx 0;
		font-size: $font-base-more;
		color: $font-color-orange;
	}
	.teacher {
		font-size: $font-base-more;
		color: $font-color-orange;
	}
	.address {
		font-size: $font-base-more;
		color: $font-color-orange;
	}
	.detail {
		font-size: $font-base-more;
		color: $font-color-666;
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
