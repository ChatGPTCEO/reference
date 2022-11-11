<template>
	<yzb-page class="">
		<view class="body">
			<view class="top">
				<view class="space-between">
					<!-- <text class="post">{{ position.postName }}</text> -->
					<view class="left">
						<text class="post" user-select="true">{{ position.postName }}</text>
						<text class="title-share" v-if="position.positionType == 2">灵活用工</text>
						<text class="title-share" v-if="position.positionType == 3">共享用工</text>
					</view>
					<text class="salary">{{ position.salary }}</text>
				</view>
				<view class="require">
					<!-- <view class="item">
						<text class="yzb yzb-location top-icon"></text>
						<text>{{position.pcity}}-{{position.city}}</text>
					</view> -->
					<view class="item">
						<text class="yzb yzb-gongzuobao top-icon"></text>
						<text>{{ position.expRequire }}</text>
					</view>
					<view class="item">
						<text class="yzb yzb-xueli top-icon"></text>
						<text>{{ position.minEducation }}</text>
					</view>
				</view>
				<view class="position-share" v-if="position.positionType == 3">
					空闲{{ position.shareNumber }}人
					<view class="height-line"></view>
					{{ formatCreateTime(position.startDate) }}-{{ formatCreateTime(position.endDate) }}
					<view class="height-line"></view>
					最多{{ position.workDays }}天
				</view>
			</view>
			<view class="share-money" v-if="position.shareMoney > 0">
				<view class="money">
					推荐佣金：
					<text>{{ position.shareMoney }}</text>
					元
				</view>
				<text class="tips">通过分享职位，好友点击您分享的链接职位发起报名，入职成功后佣金将进入您的账户余额，余额可申请提现。</text>
			</view>
			<view class="user space-between">
				<view class="left">
					<image class="img-head" :src="position.memberAvatar"></image>
					<view class="info">
						<view class="name">
							<text class="user-name">{{ position.memberName }}</text>
							<!-- <text class="last-status">刚刚活跃</text> -->
						</view>
						<text class="position">{{ position.companyName }} · {{ position.memberPostName }}</text>
					</view>
				</view>
				<!-- <text class="yzb yzb-next icon-next"></text> -->
			</view>
			<view class="detail">
				<text class="title">职位详情</text>
				<text class="desc" user-select="true">{{ position.descr }}</text>
				<view class="skill" v-if="position.skill && position.skill != undefined">
					<text v-for="(item, index) in position.skill.split(',')" :key="index">{{ item }}</text>
				</view>
			</view>

			<view class="company">
				<view class="company-info space-between" @click="toCompany()">
					<view class="left">
						<image class="img-head" :src="position.companyLogo"></image>
						<view class="info">
							<view class="name">
								<text class="user-name">{{ position.companyName }}</text>
							</view>
							<text class="position">{{ position.industryName }} · {{ position.companyStaffSize }}</text>
						</view>
					</view>
					<text class="yzb yzb-next icon-next"></text>
				</view>
				<view class="company-location" @click="toMap">
					<map style="width: 100%; height: 250px;" :enable-scroll="false" :latitude="position.latitude" :longitude="position.longitude" :markers="covers"></map>
					<view class="cover"></view>
				</view>
			</view>
			<view class="warn">
				<view class="top">
					<text class="yzb yzb-anquan icon-warn"></text>
					<text class="title">安全提示</text>
				</view>
				<view class="warn-info">
					<text class="">该公司承诺名下所有职位不向您收取任何费用</text>
					<!-- <text class="report">请立即举报</text> -->
				</view>
			</view>
			<view class="others">
				<text class="title">该公司其他岗位</text>
				<yzb-position v-if="positionList.length > 0" :positions="positionList" @click="positionDetail"></yzb-position>
				<text v-else class="noPositions">暂无其他岗位</text>
				<view class="load-more-box">
					<uni-load-more v-if="status == '请求中'" status="正在加载..." :showIcon="true"></uni-load-more>
					<uni-load-more v-if="status == '没有更多'" status="没有更多了" :showIcon="false"></uni-load-more>
					<uni-load-more v-if="status == '暂无数据'" status="暂无数据" :showIcon="false"></uni-load-more>
					<uni-load-more v-if="status == '请求失败'" status="加载失败，点我重试" :showIcon="false" @click="reLoad"></uni-load-more>
				</view>
			</view>
		</view>
		<view class="bottom"><uni-goods-nav :fill="true" :options="options" :button-group="customButtonGroup" @click="onClick" @buttonClick="buttonClick" /></view>
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
	</yzb-page>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { formatDate } from '@/common/date';
import yzbPosition from '@/components/yzb/yzb-position.vue';
export default {
	components: {
		yzbPosition
	},
	computed: {
		...mapState(['userInfo']),
		...mapGetters(['hasLogin'])
	},
	data() {
		return {
			position: {},
			positionList: [],
			status: '',
			covers: [],
			id: null,
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
					backgroundColor: 'linear-gradient(90deg, #1E83FF, #12ae85)',
					color: '#fff'
				},
				{
					text: '申请职位',
					backgroundColor: 'linear-gradient(90deg, #f0ad4e, #FE6035)',
					color: '#fff'
				}
			],
			query: {
				limit: 10,
				page: 1,
				id: '',
				companyId: ''
			},
			tcode:'',//推广者编码
		};
	},
	async onLoad(query) {
		console.log(query);
		if (query.id) {
			this.id = query.id;
		}
		if(query.tcode){
			this.tcode=query.tcode;
		}
	},
	onReachBottom() {
		this.query.page++;
		this.getPositionList();
	},

	onShow() {
		this.getDetail(this.id);
	},
	methods: {
		/**
		 * 查询职位详情
		 */
		async getDetail(id) {
			uni.showLoading({
				mask: true
			});
			let res = await this.$apis.getPositionDetail({ id: id });
			console.log('res====', res);
			if (res) {
				this.position = res;
				if (res.skill) {
					this.keys = res.skill.split(',');
				}
				let marker = {
					id: 1,
					latitude: res.latitude,
					longitude: res.longitude
				};
				this.updateCollectViewState(res.ifCollect);
				this.updateApplyViewState(res.ifApply);
				this.covers.push(marker);
				this.getPositionList();
				this.addBrowse();
			}
			uni.hideLoading();
		},

		async getPositionList() {
			this.query.id = this.position.id;
			this.query.companyId = this.position.companyId;
			this.status = '请求中';
			let res = await this.$apis.getCompanyPositionList(this.query);
			if (res) {
				let data = res.data;
				for (let i in data) {
					if (data[i].skill) {
						data[i].skill = data[i].skill.split(',');
					}
				}
				this.positionList = this.positionList.concat(data || []);
				this.changeStatus(res);
			}
		},

		// 修改请求状态
		changeStatus(data) {
			if (this.positionList.length === 0) {
				this.status = '暂无数据';
			} else if (this.query.page >= Math.ceil(data.count / this.query.limit)) {
				this.status = '没有更多';
			} else {
				this.status = '请求更多';
			}
		},

		updateApplyViewState(applyed) {
			if (applyed) {
				this.customButtonGroup[1].text = '已申请';
				this.customButtonGroup[1].backgroundColor = 'linear-gradient(90deg, #666, #999)';
			} else {
				this.customButtonGroup[1].text = '申请职位';
				this.customButtonGroup[1].backgroundColor = 'linear-gradient(90deg, #f0ad4e, #FE6035)';
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
		 * 职位收藏
		 */
		async doCollect() {
			let param = {
				type: 0,
				positionId: this.id,
				companyId: this.position.companyId,
				comMemberId:this.position.memberId
			};
			let res = await this.$apis.updateCollect(param);
			if (res) {
				uni.showToast({
					icon: 'none',
					title: '操作成功'
				});
				this.getDetail(this.id);
			}
		},
		/**
		 * 职位申请
		 */
		async doApply() {
			let param = {
				positionId: this.id,
				companyId: this.position.companyId,
				comMemberId:this.position.memberId,
				tcode:this.tcode,//推广码
			};
			let res = await this.$apis.updateApply(param);
			if (res) {
				uni.showToast({
					icon: 'none',
					title: '操作成功'
				});
				this.getDetail(this.id);
			}
		},
		
		/**
		 * 添加浏览记录
		 */
		async addBrowse() {
			if(!this.hasLogin){
				return;
			}
			let param = {
				type: 0,
				positionId: this.id,
				companyId: this.position.companyId,
				comMemberId:this.position.memberId,
				tcode:this.tcode,//推广码
			};
			let res = await this.$apis.updateBrowse(param);
			if (res) {
				console.log("addBrowse success !!!");
			}
		},

		toEdit() {
			this.$mRouter.push({
				route: this.$mRoutesConfig.positionEdit,
				query: {
					id: this.position.id
				}
			});
		},

		onqueryload(val) {
			console.log('onqueryload==', val);
		},
		onqueryerror(val) {
			console.log('onqueryerror==', val);
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
				if (this.hasLogin) {
					this.doCollect();
				} else {
					this.$mRouter.push({
						route: this.$mRoutesConfig.login
					});
				}
			}
		},
		buttonClick(e) {
			console.log(e);
			let that = this;
			if (this.hasLogin) {
				if (e.index == 0) {
					//在线聊聊
					this.toChat();
				} else {
					if (e.content.text == '申请职位') {
						//申请职位
						uni.showModal({
							title: '提示',
							content: '确定申请该职位吗？',
							success: res => {
								if (res.confirm) {
									that.doApply();
								}
							}
						});
					}
				}
			} else {
				this.$mRouter.push({
					route: this.$mRoutesConfig.login
				});
			}
		},

		toChat() {
			console.log('this.position==', this.position);
			this.$mRouter.push({
				route: this.$mRoutesConfig.privateChat,
				query: {
					id: this.position.memberSn,
					avatar: this.position.memberAvatar,
					name: this.position.memberName,
					companyId: this.position.companyId,
					positionId: this.position.id
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

		positionDetail(item) {
			this.$mRouter.push({
				route: this.$mRoutesConfig.positionDetail,
				query: {
					id: item.id
				}
			});
		},

		toCompany() {
			this.$mRouter.push({
				route: this.$mRoutesConfig.companyDetail,
				query: {
					id: this.position.companyId
				}
			});
		},

		toMap() {
			var that = this;
			uni.openLocation({
				latitude: parseFloat(that.position.latitude),
				longitude: parseFloat(that.position.longitude),
				success: function() {
					console.log('success');
				}
			});
		},

		formatCreateTime(time) {
			if (time == null || time === '') {
				return null;
			}
			let str = time.replace(/-/g,'/');
			let date = new Date(str);
			return formatDate(date, 'MM月dd日');
		},
		
		
		onShareAppMessage: function(e) {
			console.log('点击分享',e.from);
			this.addShare();
			return {
				title: this.position.postName,
				path:'/pages/position/detail?id='+this.id+"&tcode="+this.userInfo.memberSn,
				// imageUrl: '/static/logo.png'
			};
		},
		
		onShareTimeline(res) {
			console.log(res);
			return {
				title: this.position.postName,
				path:'/pages/position/detail?id='+this.id+"&tcode="+this.userInfo.memberSn,
				// imageUrl: '/static/logo.png'
			};
		},
		
		/**
		 * 添加分享记录
		 */
		async addShare() {
			let param = {
				type: 0,
				dataId: this.id,
				companyId: this.position.companyId,
				comMemberId:this.position.memberId
			};
			let res = await this.$apis.updateShare(param);
			if (res) {
				console.log("addShare success !!!");
			}
		},
		
	}
};
</script>

<style lang="scss" scoped>
.space-between {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.center-align {
	display: flex;
	align-items: center;
}

.img-head {
	width: 140upx;
	height: 140upx;
	border-radius: 70upx;
}

.body {
	padding: 20upx;
	margin-bottom: 100upx;
	box-sizing: border-box;
	background-color: $bgcolor_white;
}

.top {
	padding: 30upx 0;
	.post {
		font-size: $font-size-40;
		font-weight: bold;
		color: $font-color-000;
	}
	.title-share {
		color: $main-color;
		border: 1upx solid $main-color;
		border-radius: 20upx 0upx;
		font-size: $uni-font-size-sm;
		margin-left: 20upx;
		padding: 0upx 10upx;
	}
	.salary {
		font-size: $font-size-34;
		font-weight: bold;
		color: $main-color;
	}
	.position-share {
		color: $main-color;
		margin-top: 5upx;
		display: flex;
		font-size: 30upx;
		flex-direction: row;
		align-items: center;
		.height-line {
			height: 20upx;
			width: 4upx;
			background-color: $font-color-ccc;
			margin: 0 15upx;
		}
	}
	.require {
		display: flex;
		flex-direction: row;
		margin-top: 15upx;
		.item {
			margin-right: 30upx;
		}
		.top-icon {
			font-size: $font-lg;
			margin-right: 10upx;
		}
	}
}

.share-money {
	border-top: 1upx solid $border-color-base;
	padding: 30upx 0;
	.money {
		font-size: $uni-font-size-lg;
		font-weight: bold;
		text {
			color: $font-color-red;
			font-size: 40upx;
			padding: 0 20upx;
		}
	}
	.tips {
		font-size: $uni-font-size-sm;
		color: $font-color-999;
		line-height: 1.5;
		display: flex;
	}
}

.user {
	padding: 35upx 0;
	border-top: 1upx solid $border-color-base;
	border-bottom: 1upx solid $border-color-base;
	.left {
		display: flex;
		flex-direction: row;
		align-items: center;
		.info {
			margin-left: 30upx;
			display: flex;
			flex-direction: column;
			.name {
				display: flex;
				align-items: baseline;
				.user-name {
					font-size: $uni-font-size-lg;
					font-weight: bold;
				}
				.last-status {
					margin-left: 10upx;
					font-size: $uni-font-size-sm;
					color: $font-color-999;
				}
			}
			.position {
				font-size: $uni-font-size-base;
				margin-top: 15upx;
				color: $font-color-666;
			}
		}
	}
	.icon-next {
		color: $font-color-666;
		font-size: $uni-font-size-lg;
	}
}

.detail {
	display: flex;
	flex-direction: column;
	padding-bottom: 40upx;
	.title {
		font-size: $uni-font-size-lg;
		font-weight: bold;
		padding: 40upx 0;
	}
	.desc {
		line-height: 1.8;
	}
	.skill {
		margin-top: 25upx;
		flex-wrap: wrap;
		text {
			font-size: $uni-font-size-base;
			padding: 10upx 20upx;
			margin-right: 15upx;
			background-color: $border-color-base;
			border-radius: 5upx;
			color: $font-color-666;
		}
	}
}

.company {
	display: flex;
	flex-direction: column;
	padding: 35upx 0;
	border-top: 1upx solid $border-color-base;
	border-bottom: 1upx solid $border-color-base;
	.company-info {
		padding: 0 0 35upx 0;
		// border-top: 1upx solid $border-color-base;
		// border-bottom: 1upx solid $border-color-base;
		.left {
			display: flex;
			flex-direction: row;
			align-items: center;
			.info {
				margin-left: 30upx;
				display: flex;
				flex-direction: column;
				.name {
					display: flex;
					align-items: baseline;
					.user-name {
						font-size: $uni-font-size-lg;
					}
					.last-status {
						margin-left: 10upx;
						font-size: $uni-font-size-sm;
						color: $font-color-999;
					}
				}
				.position {
					font-size: $uni-font-size-base;
					margin-top: 15upx;
					color: $font-color-666;
				}
			}
		}
		image {
			width: 120upx;
			height: 120upx;
		}
		.icon-next {
			color: $font-color-666;
			font-size: $uni-font-size-lg;
		}
	}

	.company-location {
		position: relative;
		.cover {
			top: 0;
			width: 100%;
			height: 250px;
			position: absolute;
		}
	}
}

.warn {
	padding: 10upx 0 40upx 0;
	border-bottom: 1upx solid $border-color-base;
	.top {
		display: flex;
		flex-direction: row;
		align-items: center;
		.icon-warn {
			color: $main-color;
		}
		.title {
			margin-left: 10upx;
			font-size: $uni-font-size-lg;
			font-weight: bold;
		}
	}
	.warn-info {
		font-size: $uni-font-size-base;
	}
	.report {
		color: $main-color;
	}
}

.others {
	display: flex;
	flex-direction: column;
	.title {
		font-size: $font-size-36;
		font-weight: bold;
		padding: 20upx;
	}
	.noPositions {
		padding: 20upx 20upx 50upx 20upx;
		color: #666;
	}
}
.bottom {
	position: fixed;
	bottom: 0;
	width: 100%;
	padding: 10upx 0;
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
