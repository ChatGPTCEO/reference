<template>
	<yzb-page class="">
		<view class="body">
			<view class="top">
				<view class="space-between">
					<text class="post">{{ position.postName }}</text>
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
			<view class="share-money" v-if="position.shareMoney>0">
				<view class="money">
					推荐佣金：<text>{{position.shareMoney}}</text>元
				</view>
				<text class="tips">通过分享职位，好友点击您分享的链接职位发起报名，入职成功后佣金将进入账户余额，余额可申请提现。</text>
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
				<text class="desc">{{ position.descr }}</text>
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
		</view>
		<view class="bottom">
			<button class="edit" @click="toEdit">编辑</button>
			<button v-if="position.status == 1" class="close" @click="toOpen">开放职位</button>
			<button v-if="position.status == 2" class="open-close" @click="toClose">关闭职位</button>
			<button v-if="position.status == 3" class="close" @click="toOpen">开放职位</button>
			<button v-if="position.status == 4" class="close" @click="toOpen">开放职位</button>
		</view>
	</yzb-page>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { formatDate } from '@/common/date';
export default {
	computed: {
		...mapGetters({
			userInfo: 'user/info',
			hasLogin: 'user/hasLogin'
		})
	},
	data() {
		return {
			position: {},
			status: '',
			covers: [],
			id: null
		};
	},
	async onLoad(query) {
		console.log(query);
		if (query.id) {
			this.id = query.id;
		}
	},
	
	onShow() {
		this.getDetail(this.id );
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
				this.covers.push(marker);
			}
			uni.hideLoading();
		},

		toEdit() {
			this.$mRouter.push({
				route: this.$mRoutesConfig.positionEdit,
				query: {
					id: this.position.id
				}
			});
		},
		async toOpen() {
			// 1-待开放、2-已开放、3-已关闭、4-审核失败
			let param = {
				id: this.id,
				status: 2
			};
			let res = await this.$apis.updatePosition(param);
			if (res) {
				uni.showToast({
					icon: 'none',
					title: '操作成功'
				});
				this.getDetail(this.id);
			}
		},

		async toClose() {
			// 1-待开放、2-已开放、3-已关闭、4-审核失败
			let param = {
				id: this.id,
				status: 3
			};
			let res = await this.$apis.updatePosition(param);
			if (res) {
				uni.showToast({
					icon: 'none',
					title: '操作成功'
				});
				this.getDetail(this.id);
			}
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
			} else if (e.index == 2) {
				//收藏
			}
		},
		buttonClick(e) {
			console.log(e);
			let that = this;
			if (e.index == 0) {
				//在线聊聊
			} else {
				if (e.content.text == '申请职位') {
					//申请职位
					uni.showModal({
						title: '提示',
						content: '确定申请该职位吗？',
						success: res => {
							if (res.confirm) {
							}
						}
					});
				}
			}
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
			let date = new Date(time);
			return formatDate(date, 'MM月dd日');
		}
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
	box-sizing: border-box;
	background-color: $bgcolor_white;
	margin-bottom: 100upx;
}

.top {
	padding: 30upx 0;
	.post {
		font-size: $font-size-40;
		font-weight: bold;
		color: $font-color-000;
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

.share-money{
	border-top: 1upx solid $border-color-base;
	padding: 30upx 0;
	.money{
		font-size: $uni-font-size-lg;
		font-weight: bold;
		text{
			color: $font-color-red;
			font-size: 40upx;
			padding: 0 20upx;
		}
	}
	.tips{
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

	.bottom {
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
}
.bottom {
	position: fixed;
	display: flex;
	flex-direction: row;
	bottom: 0;
	width: 100%;
	padding: 15upx 0;
	background-color: $bgcolor_white;
	border-top: 1upx solid $border-color-base;
	.edit {
		background-color: $bg-grey;
		width: 30%;
	}
	.open-close {
		background-color: $main-color;
		color: $font-color-white;
		width: 62%;
	}
	.close {
		background-color: $bg-grey;
		width: 62%;
	}
	button::after {
		border: none;
	}
}
</style>
