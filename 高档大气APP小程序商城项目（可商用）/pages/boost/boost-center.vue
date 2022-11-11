<template>
	<view>
		<view class="boost-center">

			<view class="help-box w-710 mt-2" v-if="fixBottomBtnIndex === 0">
				<boost-list :boostlist="boostCenterList"></boost-list>
			</view>
			<view class="boost-center-list mt-2 mx-2 flex-1" v-else>
				<view class="boost-center-item row-ac" v-for="item in myBoostList" :key="item.id" @click="toLaunchDetail(item)">
					<image :src="item.img.img" class="boost-goods-img ml-2"></image>
					<view class="flex-1 mx-2">
						<view class="product-name in2line font-w font-s-4">{{ item.productName }}</view>
						<view class="boost-price font-s-7 font-w mt-1"><text class="font-s-2">到手价：</text>{{ item.boostPrice }}</view>
						<view class="font-s-1 text-de text-light-grey mt-1">价格：{{ item.price }}</view>
						
						<view class="font-s-2 used-end-time">结束时间：{{ item.usedEndTime }}</view>
					</view>
					
				</view>
			</view>
		</view>
		<view class="fixed-bottom d-f">
			<view
				class="bottom-option"
				v-for="(item, index) in fixBottomOption"
				:class="fixBottomBtnIndex === index ? 'active' : ''"
				:key="index"
				@click="fixBottomBtnClick(index)"
			>
				{{ item }}
			</view>
		</view>
	</view>
</template>

<script>
import { boostCenterListUrl, myBoostListUrl } from '@/api/index';
import boostList from '@/components/common/boost-list';

export default {
	components: {
		boostList
	},
	data() {
		return {
			fixBottomOption: ['助力商品', '我的助力'],
			fixBottomBtnIndex: 0,
			boostCenterQueryInfo: {
				status: 1,
				page: 1,
				pageSize: 10
			},
			boostCenterListTotal: 0,
			boostCenterList: [],
			myBoostQueryInfo: {
				status: 1,
				page: 1,
				pageSize: 10
			},
			myBoostListTotal: 0,
			myBoostList: []
		};
	},
	onLoad() {
		this.initData();
	},
	// 上划加载
	onReachBottom() {
		this.onReachBottomHandle();
	},
	methods: {
		initData() {
			this.getBoostCenterList();
		},
		// 上滑加载
		onReachBottomHandle() {
			if (this.fixBottomBtnIndex === 0) {
				if (this.boostCenterListTotal != this.boostCenterList.length) {
					// 砍价商品上划
					this.boostCenterQueryInfo.page++;
					this.getBoostCenterList();
				}
			} else {
				if (this.myBoostListTotal != this.myBoostList.length) {
					// 我的砍价上划
					this.myBoostQueryInfo.page++;
					this.getMyBoostList();
				}
			}
		},
		// 获取砍价中心列表
		getBoostCenterList() {
			this.$R.get(boostCenterListUrl, this.boostCenterQueryInfo).then(res => {
				this.boostCenterList = [...this.boostCenterList, ...res.data.list];
				this.boostCenterListTotal = res.data.total;
			});
		},
		// 获取我的砍价列表
		getMyBoostList() {
			this.$R.get(myBoostListUrl, this.myBoostQueryInfo).then(res => {
				this.myBoostList = [...this.myBoostList, ...res.data.list];
				this.myBoostListTotal = res.data.total;
			});
		},
		// 跳转到商品详情页
		toProduct(boostInfo) {
			uni.navigateTo({
				url: `/pages/product/product?pageStatus=boost&boostId=${boostInfo.id}`
			});
		},
		// 跳转到助力详情页
		toLaunchDetail(boostInfo) {
			uni.navigateTo({
				url: `/pages/boost/boost-launch-detail?boostId=${boostInfo.id}`
			});
		},
		// 底部切换点击事件
		fixBottomBtnClick(index) {
			if (index === this.fixBottomBtnIndex) {
				return false;
			}
			if (index === 0) {
				this.boostCenterQueryInfo.page = 1;
				this.boostCenterList = [];
				this.getBoostCenterList();
			} else {
				this.myBoostQueryInfo.page = 1;
				this.myBoostList = [];
				this.getMyBoostList();
			}
			this.fixBottomBtnIndex = index;
		}
	}
};
</script>

<style lang="scss">
	page{
		background-color: #eeeeee;
	}

.help-box{
	border-radius: 15rpx;
	.help-all{
		width: 150rpx;
		height: 50rpx;
		border-radius: 25rpx;
		background-color: #EF2D23;
	}
}
.fixed-bottom {
	.bottom-option {
		width: 50%;
		border-top: 1px solid #dddddd;
		text-align: center;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 32rpx;
		background-color: #ffffff;
		color: #333333;

		&.active {
			background-color: $bg-main-color;
			color: #FFFFFF;
		}
	}
}

.boost-center {
	padding-bottom: 120rpx;
}
.boost-center-list{
	.boost-center-item{
		width: 100%;
		height: 300rpx;
		background: #FFFFFF;
		border-radius: 15rpx;
		.boost-goods-img{
			width: 220rpx;
			height: 220rpx;
			border-radius: 15rpx;
		}
		.product-name{
			width: 100%;
			height: 72rpx;
		}
		.boost-price{
			color: #E90000;
			text{
				color: #666;
			}
		}
		.used-end-time{
			color: #E90000;
		}
	}
}
</style>
