<template>
	<yzb-page class="">
		<view class="body">
			<view class="top">
				<view class="space-between">
					<view class="company">
						<text class="name" user-select="true">{{ company.name }}</text>
						<text class="require">{{ company.industryName }} · {{ company.staffSize }}</text>
					</view>
					<image class="logo" :src="company.logo"></image>
				</view>
			</view>
			<view class="time">
				<!-- <text class="title">福利待遇</text> -->
				<view class="require">
					<view class="item">
						<text class="yzb yzb-shijian top-icon"></text>
						<text>{{ company.startTime }}-{{ company.endTime }}</text>
					</view>
					<view class="item">
						<text class="yzb yzb-gongzuobao top-icon"></text>
						<text>{{ company.restTime }}</text>
					</view>
					<view class="item">
						<text class="yzb yzb-xueli top-icon"></text>
						<text>{{ company.workOvertime }}</text>
					</view>
				</view>
				<view class="welfare">
					<text class="items" v-for="(item, index) in company.welfare" :key="index">{{ item }}</text>
					<!-- <text class="items">包吃包住</text>
					<text class="items">五险一金</text>
					<text class="items">节日福利</text> -->
				</view>
			</view>

			<!-- <view class="welfare">
				<text class="title">福利待遇</text>
				<view class="item">
					<text>社保</text>
					<text>包吃包住</text>
					<text>五险一金</text>
					<text>节日福利</text>
				</view>
			</view> -->

			<view class="unlike space-between">
				<text class="note">设置不感兴趣将不会推送其职位给您。</text>
				<view class="btn-unlike" @click="unlike()">
					<text class="yzb yzb-buganxingqu"></text>
					<text class="txt">不感兴趣</text>
				</view>
			</view>
			<view class="address">
				<text class="title">公司地址</text>
				<view class="space-between">
					<view class="column">
						<text class="info">{{ company.addressName }}{{ company.addressHouse }}</text>
						<text class="margin-left-10 text-color-grey">{{ company.address }}</text>
					</view>
					<view class="nav" @click="toMap()">
						<text class="yzb yzb-daohang"></text>
						<text style="margin-left: 5upx;">导航</text>
					</view>
				</view>
			</view>
			<view class="detail">
				<text class="title">公司介绍</text>
				<view class="desc">
					<sunui-grand :content="company.companyProfile" color="#1D82FE" bg="#fff" :clamp="3" expandText="点击展开全文" shinkText="收起"></sunui-grand>
				</view>
			</view>

			<view class="detail">
				<text class="title">公司照片</text>
				<view class="margin-top-20"><m-swiper :list="ablumList" @clickImg="clickImg"></m-swiper></view>
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
	</yzb-page>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import sunUiGrand from '@/components/sunui-grand/sunui-grand.vue';
import mSwiper from '@/components/m-swiper/m-swiper2.vue';
import yzbPosition from '@/components/yzb/yzb-position.vue';
export default {
	components: {
		sunUiGrand,
		mSwiper,
		yzbPosition
	},
	computed: {
		...mapState(['userInfo']),
		...mapGetters(['hasLogin'])
	},
	data() {
		return {
			company: {},
			ablumList: [],
			list: [],
			positionList: [],
			id: '',
			status: '',
			query: {
				limit: 10,
				page: 1,
				companyId: ''
			},
			desc: ''
		};
	},
	async onLoad(query) {
		console.log('APP进入首页');
		if (query.id > 0) {
			this.id = query.id;
			this.getDetail(query.id);
		} else {
			this.id = this.userInfo.companyId;
			this.getDetail(this.userInfo.companyId);
		}
	},

	onReachBottom() {
		this.query.page++;
		this.getPositionList();
	},

	methods: {
		async getDetail(id) {
			let res = await this.$apis.getCompanyDetail({ id: id });
			if (res) {
				this.company = res;
				if (this.company.welfare) {
					this.company.welfare = this.company.welfare.split(',');
				}
				this.list = res.album.split(',');
				for (let i in this.list) {
					let item = {
						pic: ''
					};
					item.pic = this.list[i];
					this.ablumList.push(item);
				}
				this.getPositionList();
			}
		},

		async getPositionList() {
			this.query.companyId = this.id;
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

		clickImg(index) {
			console.log(index);
			this.previewImg(index);
		},

		// 查看图片
		previewImg(index) {
			console.log('预览==' + index);
			uni.previewImage({
				indicator: 'number',
				loop: true,
				current: this.list[index],
				urls: this.list
			});
		},

		toCompany() {
			this.$mRouter.push({
				route: this.$mRoutesConfig.companyDetail,
				query: {
					id: 1
				}
			});
		},

		unlike() {
			uni.showModal({
				title: '提示',
				content: '设置后将不会推荐该公司职位等信息，确定操作？',
				success: res => {
					if (res.confirm) {
						let param = {
							type: 1,
							companyId: this.company.id
						};
						this.$apis.updateShield(param).then(() => {
							uni.showToast({
								title: '操作成功'
							});
						});
					}
				}
			});
		},

		toMap() {
			console.log('地图');
			// let latitude=this.company.latitude;
			// let longitude=this.company.longitude;
			uni.openLocation({
				latitude: parseFloat(this.company.latitude),
				longitude: parseFloat(this.company.longitude),
				success: function() {
					console.log('success');
				}
			});
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

.body {
	padding: 20upx;
	box-sizing: border-box;
	background-color: $bgcolor_white;
}

.unlike {
	border-top: 1rpx solid #ebeef5;
	padding: 20upx 0;
	.note {
		color: $uni-text-color-grey;
	}
	.btn-unlike {
		border: 1upx solid $uni-color-warning;
		border-radius: 10upx;
		padding: 0upx 10upx;
		.yzb-buganxingqu {
			margin-right: 5upx;
			color: $uni-color-warning;
		}
		.txt {
			color: $uni-color-warning;
		}
	}
}

.top {
	padding: 30upx 0;
	.company {
		display: flex;
		flex-direction: column;
	}
	.name {
		font-size: $font-size-40;
		font-weight: bold;
		color: $font-color-000;
	}
	.logo {
		width: 150upx;
		height: 150upx;
		border: 1upx solid $border-color-base;
		border-radius: 10upx;
	}
	.require {
		font-size: $uni-font-size-base;
		margin-top: 15upx;
		color: $font-color-666;
	}
}

.time {
	display: flex;
	flex-direction: column;
	padding-bottom: 30upx;
	padding-top: 20upx;
	border-top: 1upx solid $border-color-base;
	.title {
		font-size: $uni-font-size-lg;
		font-weight: bold;
		padding: 30upx 0 20upx 0;
	}
	.require {
		display: flex;
		flex-direction: row;
		margin-top: 15upx;
		.item {
			margin-right: 30upx;
			display: flex;
			flex-direction: row;
			align-items: center;
		}
		.top-icon {
			font-size: $font-lg;
			margin-right: 10upx;
			color: $font-color-666;
		}
	}

	.welfare {
		display: flex;
		flex-direction: row;
		margin-top: 25upx;
		flex-wrap: wrap;
		.items {
			font-size: $uni-font-size-base;
			padding: 10upx 20upx;
			margin-right: 15upx;
			background-color: $border-color-base;
			border-radius: 5upx;
			color: $font-color-666;
			margin-top: 15upx;
		}
	}
}
.address {
	display: flex;
	flex-direction: column;
	padding-bottom: 30upx;
	border-top: 1upx solid $border-color-base;
	.title {
		font-size: $uni-font-size-lg;
		font-weight: bold;
		padding: 30upx 0 20upx 0;
	}
	.info {
		font-size: $uni-font-size-lg;
		padding: 10upx;
		line-height: 1.5;
	}
	.nav {
		width: 20%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border: 1upx solid $border-color-base;
		padding: 0upx 20upx;
		height: 70upx;
		border-radius: 35upx;
	}
}

.detail {
	display: flex;
	flex-direction: column;
	padding-bottom: 30upx;
	border-top: 1upx solid $border-color-base;
	.title {
		font-size: $uni-font-size-lg;
		font-weight: bold;
		padding: 30upx 0 0 0;
	}
	.desc {
		line-height: 1.8;
	}
	.skill {
		margin-top: 25upx;
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
</style>
