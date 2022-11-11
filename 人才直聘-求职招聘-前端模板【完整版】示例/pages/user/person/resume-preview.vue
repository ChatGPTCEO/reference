<template>
	<view class="content">
		<view class="body">
			<view class="base-info space-between-algin bottom-line padding-height-20">
				<view class="column">
					<view class="align-height">
						<text class="name">{{ resume.name }}</text>
						<!-- <text class="yzb yzb-bianji2 margin-left-20"></text> -->
					</view>
					<text class="text-color">{{ formatAge(resume.timeToWork) }}年经验 · {{ formatAge(resume.birthday) }}岁 · {{ resume.education }}</text>
					<view class="phone" v-if="resume.phone">
						<text>{{ hidePhone(resume.phone) }}</text>
						<!-- <text class="yzb yzb-dianhua1"></text> -->
					</view>
				</view>
				<image class="header" :src="resume.avatar || '/static/img/head.png'"></image>
			</view>
			<view class="skill width-100 padding-height-30 column bottom-line">
				<view class="space-between-algin">
					<text class="text-title">个人优势</text>
				</view>
				<text class="item-content margin-height-20">{{ resume.personalSkill }}</text>
			</view>
			<view class="status width-100 space-between-algin padding-height-40 bottom-line">
				<text class="text-title">求职状态</text>
				<view class="align-height">
					<picker @change="bindPickerChange" disabled="true" :value="workStatus" :range="workStatusArray">
						<input disabled="true" class="padding-10" style="text-align: right;" placeholder="请选择求职状态" v-model="workStatus" />
					</picker>
				</view>
			</view>

			<view class="expect column width-100 padding-height-30 bottom-line">
				<view class="space-between-algin"><text class="text-title">求职期望</text></view>
				<view class="column margin-top-10">
					<view class="column margin-top-10" v-for="(item, index) in resume.jobExpectList" :key="index">
						<view class="space-between-algin">
							<text class="text-sub-title">{{ item.postName }}</text>
						</view>
						<text class="text-color">{{ item.expectSalary }} . {{ item.industryName }}</text>
					</view>
				</view>
			</view>

			<view class="work-exp column width-100 padding-height-30 bottom-line">
				<view class="space-between-algin"><text class="text-title">工作经历</text></view>
				<view class="column margin-top-10" :class="index > 0 ? 'top-line' : ''" v-for="(item, index) in resume.workExpList" :key="index">
					<view class="space-between-algin padding-height-10">
						<text class="text-sub-title">{{ item.companyName }}</text>
						<view class="align-height">
							<text class="text-color-grey">{{ formatDates(item.startDate) }}-{{ formatDates(item.endDate) }}</text>
						</view>
					</view>
					<text class="text-color">{{ item.postName }}</text>
					<text class="item-content margin-height-20">{{ item.jobContent }}</text>
					<view class="skill-item" v-if="item.skill">
						<text v-for="(item2, index2) in formatString(item.skill)" :key="index2">{{ item2 }}</text>
					</view>
				</view>
			</view>

			<view class="pro-exp column width-100 padding-height-30 bottom-line">
				<view class="space-between-algin"><text class="text-title">项目经历</text></view>
				<view class="column margin-top-10" :class="index > 0 ? 'top-line' : ''" v-for="(item, index) in resume.proExpList" :key="index">
					<view class="space-between-algin padding-height-10">
						<text class="text-sub-title">{{ item.name }}</text>
						<view class="align-height">
							<text class="text-color-grey">{{ formatDates(item.startDate) }}-{{ formatDates(item.endDate) }}</text>
						</view>
					</view>
					<text class="text-color">{{ item.role }}</text>
					<text class="item-content margin-top-20">内容：{{ item.descr }}</text>
					<text class="item-content margin-top-10" v-if="item.performance">业绩：{{ item.performance }}</text>
				</view>
			</view>

			<view class="edu-exp column width-100 padding-height-30">
				<view class="space-between-algin"><text class="text-title">教育经历</text></view>
				<view class="column margin-top-10 width-100" v-for="(item, index) in resume.eduExpList" :key="index">
					<view class="space-between-algin">
						<text class="text-sub-title">{{ item.school }}</text>
						<view class="align-height">
							<text class="text-color-grey">{{ formatDates(item.startTime) }}-{{ formatDates(item.endTime) }}</text>
						</view>
					</view>
					<text class="text-color">{{ item.major }} {{ item.education }}</text>
				</view>
			</view>
		</view>
		<!-- <view class="bottom"><uni-goods-nav :fill="true" :options="options" :button-group="customButtonGroup" @click="onClick" @buttonClick="buttonClick" /></view> -->
		<!-- 分享弹窗-->
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
import { mapState, mapGetters } from 'vuex';
import mCell from '@/components/m-cell/m-cell.vue';
import { formatDate, calCurrentYear } from '@/common/date';
export default {
	computed: {
		...mapState(['userInfo']),
		...mapGetters(['hasLogin'])
	},
	components: {
		mCell
	},
	data() {
		return {
			skillContent: '',
			statusIndex: 0,
			workStatusArray: ['在职-暂不考虑', '在职-考虑机会', '在职-月内到岗', '离职-随时到岗'],
			resume: {},
			workStatus: null,

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
				{
					icon: 'star', //star-filled
					text: '收藏',
					color: '#646566'
				}
			],
			customButtonGroup: [
				{
					text: '在线聊聊',
					backgroundColor: 'linear-gradient(90deg, #f0ad4e, #FE6035)',
					color: '#fff'
				}
			],
			id:null,
		};
	},
	onLoad(query) {
		console.log(query);
		if (query.id > 0) {
			this.id=query.id;
			this.getResume(query.id);
		}
	},
	methods: {
		
		async getResume(id) {
			let param = {
				id: id
			};
			this.resume = await this.$apis.getResume(param);
			this.workStatus = this.resume.jobStatus;
			// this.updateCollectViewState(this.resume.ifCollect);
			// this.addBrowse();
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
				//收藏
				this.doCollect();
			}
		},
		buttonClick(e) {
			console.log(e);
			let that = this;
			if (e.index == 0) {
				//在线聊聊
				this.toChat();
			} else {
			}
		},
		
		/**
		 * 简历收藏
		 */
		async doCollect() {
			let param = {
				type: 1,//收藏简历
				resumeId: this.id,
				memberId:this.resume.memberId
			};
			let res = await this.$apis.updateCollect(param);
			if (res) {
				uni.showToast({
					icon: 'none',
					title: '操作成功'
				});
				this.getResume(this.id);
			}
		},
		
		/**
		 * 更新收藏状态
		 */
		updateCollectViewState(collected) {
			if (collected) {
				this.options[2].icon = 'star-filled';
				this.options[2].color = '#12ae85';
			} else {
				this.options[2].icon = 'star';
				this.options[2].color = '#646566';
			}
		},
		
		/**
		 * 添加浏览记录
		 */
		async addBrowse() {
			let param = {
				type: 1,
				resumeId: this.id,
				memberId:this.resume.memberId,
				companyId:this.userInfo.companyId,
			};
			let res = await this.$apis.updateBrowse(param);
			if (res) {
				console.log("addBrowse success !!!");
			}
		},

		toChat() {
			this.$mRouter.push({
				route: this.$mRoutesConfig.privateChat,
				query: {
					id: this.resume.memberSn,
					avatar: this.resume.avatar,
					name: this.resume.name,
					resumeId:this.resume.id
				}
			});
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

		formatDates(time) {
			if (time == null || time === '') {
				return 'N/A';
			}
			let str = time.replace(/-/g,'/');
			let date = new Date(str);
			// return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
			return formatDate(date, 'yyyy.MM');
		},

		formatAge(birthday) {
			return calCurrentYear(birthday);
		},

		async bindPickerChange(e) {
			this.workStatus = this.workStatusArray[e.target.value];
			let param = {
				id: this.resume.id,
				jobStatus: this.workStatus
			};
			let res = await this.$apis.updateResumeBasic(param);
		},

		formatString(val) {
			return val.split(',');
		},
		
		hidePhone(phone) {
			return this.$mUtils.phoneHiden(phone);
		}

	}
};
</script>

<style lang="scss" scoped>
view {
	display: flex;
}

.text-title {
	font-size: $font-size-36;
	font-weight: bold;
	color: $font-color-000;
}

.text-sub-title {
	font-size: $font-base-more;
	font-weight: bold;
	color: $font-color-000;
}

.item-content {
	color: $uni-text-color;
}

.content {
	padding: 20upx;
	box-sizing: border-box;
}

.body {
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-bottom: 100upx;
}

.base-info {
	.name {
		font-size: 44upx;
		font-weight: bold;
	}

	.yzb-bianji2 {
		color: $font-color-000;
	}

	.header {
		width: 150upx;
		height: 150upx;
		border-radius: 50%;
	}
	
	.phone {
		color: $font-color-333;
		.yzb-dianhua1 {
			margin-left: 10upx;
			color: $main-color;
		}
	}
}

.yzb-jia1 {
	color: $font-color-333;
	font-weight: bold;
	font-size: 44upx;
}

.skill-item {
	margin-top: 20upx;
	padding-bottom: 10upx;
	flex-wrap: wrap;

	text {
		font-size: $uni-font-size-sm;
		padding: 5upx 20upx;
		margin-right: 15upx;
		margin-bottom: 15upx;
		background-color: $border-color-base;
		border-radius: 8upx;
		color: $font-color-666;
	}
}

.skill-item2 {
	margin-top: 20upx;
	padding-bottom: 10upx;
	flex-wrap: wrap;

	text {
		font-size: $uni-font-size-sm;
		padding: 10upx 20upx;
		margin-right: 15upx;
		margin-bottom: 15upx;
		background-color: $border-color-base;
		border-radius: 8upx;
		color: $font-color-666;
	}
}

.bottom {
	position: fixed;
	bottom: 0;
	width: 100%;
	padding: 10upx 0;
	background-color: $bgcolor_white;
	border-top: 1upx solid $border-color-base;

	uni-goods-nav {
		width: 100%;
	}
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
