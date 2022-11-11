<template>
	<view class="m-position">
		<view class="item" v-for="(item, index) in list" :key="index" @click="onClick(item)">
			<!-- 用户端 -->
			<view v-if="item.type == 1" class="job">
				<view class="company" v-if="item.company">
					<view><image class="logo" :src="item.company.logo"></image></view>
					<view style="display: flex;flex-direction: row;justify-content: space-between;align-items: center;width:100%;">
						<view class="info">
							<view>
								<!-- <text v-if="item.company.realname_auth.auth_status == 3" class="yzb yzb-yirenzheng1"></text> -->
								<text class="name">{{ item.company.name }}</text>
							</view>
							<text class="require">{{ item.company.industryName }} · {{ item.company.staffSize }}</text>
							<view class="post">
								<view class="post-item">
									<text class="yzb yzb-location top-icon"></text>
									<text>{{ item.company.startTime }}-{{ item.company.endTime }}</text>
								</view>
								<view class="post-item">
									<text class="yzb yzb-gongzuobao top-icon"></text>
									<text>{{ item.company.restTime }}</text>
								</view>
							</view>
							<!-- <view class="welfare">
								<text class="items" v-for="(item2, index2) in item.company_id[0].welfare.split(',')" :key="index2">{{ item2 }}</text>
							</view> -->
						</view>
						<text class="yzb yzb-next"></text>
					</view>
				</view>
			</view>
			<view v-else class="resume">
				<view class="title space-between">
					<view class="left">
						<view class="">
							<!-- <text v-if="item.person_id[0].realname_auth.auth_status==3" class="yzb yzb-yirenzheng1"></text> -->
							<text class="name">{{ item.resume.name }}</text>
							<!-- <text class="yzb yzb-nan" v-if="item.resume_id[0].sex==1"></text> -->
							<!-- <text class="yzb yzb-nv" v-if="item.resume_id[0].sex==2"></text> -->
						</view>
						<view class="skill">
							{{ formatAge(item.resume.timeToWork) }}年
							<view class="height-line"></view>
							{{ item.resume.education }}
							<view class="height-line"></view>
							{{ item.expectSalary == undefined ? '面议' : item.expectSalary }}
						</view>
					</view>
					<image class="right" v-if="item.memberAvatar" :src="item.memberAvatar"></image>
					<image class="right" v-else src="/static/img/head.png.png"></image>
				</view>
				<view class="exp">
					<view class="exp-item" :class="item.ifRead ? 'exp-item-read' : ''">
						<text class="yzb yzb-gongzuobao top-icon"></text>
						<text v-if="item.companyName">{{ item.companyName }} · {{ item.companyPostName }}</text>
					</view>
				</view>
				<view class="desc">
					<text v-if="item.workSkill" v-for="(item2, index2) in formatString(item.workSkill)" :key="index2">{{ item2 }}</text>
					<text v-else>暂无工作经验</text>
					<!-- <text class="yzb yzb-shanchu" @click.stop="deleteItem(item)"></text> -->
				</view>
				<view class="position">
					<view class="left">
						<text>看过的岗位：</text>
						<text class="title">{{ item.postName }}</text>
					</view>
					<text class="right">{{ formatDate(item ? item.create_time : '2022') }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import mEmptyData from '@/components/m-empty-data/m-empty-data.vue';
import { formatDate, calCurrentYear } from '@/common/date';
export default {
	name: 'yzb-visitme',
	props: {
		list: Array
	},
	components: {
		mEmptyData
	},
	data() {
		return {
			no_order_1: this.$mAssetsPath.no_order_1
		};
	},

	methods: {
		onClick(item) {
			this.$emit('click', item);
		},
		deleteItem(item) {
			this.$emit('onDelete', item);
		},
		formatAge(birthday) {
			return calCurrentYear(birthday);
		},
		formatString(val) {
			return val.split(',');
		}
	}
};
</script>

<style lang="scss">
.m-position {
	.item {
		background-color: $bgcolor_white;
		padding: 15upx 20upx;
		// margin-bottom: 20upx;
		// border-bottom: 3upx solid $border-color-light;
	}

	.job {
		background-color: $bgcolor_white;
		padding: 20upx 0;
		border-bottom: 3upx solid $border-color-light;
		.company {
			display: flex;
			flex-direction: row;
			align-items: center;
		}
		.logo {
			width: 120upx;
			height: 120upx;
			border-radius: 10upx;
			border: 1upx solid $border-color-base;
		}
		.info {
			margin-left: 20upx;
			display: flex;
			flex-direction: column;
			.yzb-yirenzheng1 {
				color: $uni-color-success;
				margin-right: 10upx;
			}
			.name {
				font-size: $font-size-34;
				font-weight: bold;
			}
			.require {
				color: $font-color-666;
				margin-top: 5upx;
			}
			.post {
				display: flex;
				flex-direction: row;
				.post-item {
					margin-right: 20upx;
					color: $font-color-666;
				}
				.top-icon {
					font-size: $uni-font-size-base;
					margin-right: 10upx;
				}
			}
			.welfare {
				display: flex;
				flex-direction: row;
				margin-top: 5upx;
				flex-wrap: wrap;
				.items {
					font-size: $uni-font-size-sm;
					padding: 5upx 10upx;
					margin-right: 5upx;
					background-color: $border-color-base;
					border-radius: 5upx;
					color: $font-color-666;
					margin-top: 5upx;
				}
			}
		}
		.yzb-next {
			color: $font-color-999;
		}
	}

	.resume {
		padding: 20upx 0;
		border-bottom: 3upx solid $border-color-light;
		.title {
			.left {
				display: flex;
				flex-direction: column;
				.name {
					font-weight: bold;
					font-size: $uni-font-size-lg;
				}
				.yzb-yirenzheng1 {
					font-weight: bold;
					font-size: 34upx;
					color: $uni-color-success;
					margin-right: 10upx;
				}
				.yzb-nan {
					color: #12ae85;
					font-weight: bold;
					font-size: 34upx;
					margin-left: 10upx;
				}
				.yzb-nv {
					color: #ff6a6a;
					font-weight: bold;
					font-size: 34upx;
					margin-left: 10upx;
				}
				.skill {
					color: $font-color-666;
					margin-top: 5upx;
					font-size: $uni-font-size-base;
					display: flex;
					flex-direction: row;
					align-items: center;
					.height-line {
						height: 20upx;
						width: 4upx;
						background-color: $font-color-ccc;
						margin: 0 15upx;
					}
				}
			}
			.right {
				width: 120upx;
				height: 120upx;
				border-radius: 60upx;
			}
		}

		.company {
			color: $font-color-666;
			margin-top: 15upx;
			font-size: $uni-font-size-base;
			.left {
				margin-right: 15upx;
			}
		}

		.exp {
			line-height: 1.2;
			.exp-item {
				display: flex;
				flex-direction: row;
				align-items: center;
				line-height: 1.2;
				.top-icon {
					margin-right: 10upx;
					margin-top: 3upx;
				}
			}
		}

		.desc {
			margin-top: 15upx;
			flex-wrap: wrap;
			text {
				font-size: $uni-font-size-base;
				padding: 5upx 10upx;
				margin-right: 15upx;
				background-color: $border-color-base;
				border-radius: 5upx;
				color: $font-color-666;
			}
		}

		.position {
			margin-top: 5upx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			color: $font-color-666;
			.title {
				font-size: $uni-font-size-lg;
				color: $font-color-orange;
			}
		}

		.user {
			margin-top: 35upx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			image {
				width: 60upx;
				height: 60upx;
			}
			.left {
				display: flex;
				flex-direction: row;
				align-items: center;
				font-size: $uni-font-size-base;
				.name {
					margin: 0 20upx;
				}
				.post {
					// color: $font-color-666;
				}
			}
			.right {
				display: flex;
				flex-direction: row;
				align-items: center;
				color: $font-color-666;
				font-size: $uni-font-size-base;
				.area {
					margin-right: 15upx;
				}
			}
		}
	}
}
.space-between {
	display: flex;
	justify-content: space-between;
	flex-direction: row;
}
</style>
