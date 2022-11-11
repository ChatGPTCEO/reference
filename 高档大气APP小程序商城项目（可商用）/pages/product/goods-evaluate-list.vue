<template>
	<view>
		<view class="goods-evaluate-list">
			<!-- <view class="pl-2 pr-2" v-for="item in goodsEvaluateList" :key="item.id">
				<view class="row-ac pt-1 pb-1">
					<image :src="item.userImage" mode="" style="width: 60rpx;height: 60rpx;" class="rounded-50"></image>
					<view class="ml-1">{{ item.userName }}</view>
				</view>
				<view>
					星级：
					<xiaoStarComponent :starCount="item.productScore"></xiaoStarComponent>
				</view>
				<view class="flex-1 pt-2 font-s-4 text-light-grey font-s-4">{{ item.content }}</view>
				<view class="d-f mt-2 pb-3 justify-end">
					<view class="font-s-4 text-light-grey">规格:{{ item.skuName }}</view>
					<view class="text-light-grey font-s-4 ml-2">{{ item.createdAt }}</view>
				</view>
				<view v-if="item.images.length > 0">
					<view class="img-list" v-for="(imgItem, index) in item.images" :key="index"><images :src="imgItem"></images></view>
				</view>
			</view> -->
			<view class="px-2 mb-1 bg-white" v-for="item in goodsEvaluateList" :key="item.id">
				<view class="d-f pt-1 pb-1">
					<view v-if="item.userImage !== '匿名评价'"><image :src="item.userImage" mode="" class="evaluate-userImage rounded-50" /></view>
					<view v-else><image :src="userImg" mode="" class="evaluate-userImage rounded-50 border" /></view>
					<view class="ml-1">
						<view class="font-s-1 text-light-grey">{{ item.userName || '匿名评论' }}</view>
						<view class="mt"><xiaoStarComponent :starCount="item.productScore" :iconFontSize="10" :iconfMarginRight="1" /></view>
					</view>
				</view>
				<view class="flex-1 font-s-4 text-light-grey font-s-4">{{ item.content }}</view>
				<view class="d-f mt-2 pb-3 font-s-2 text-light-grey">
					<view class="">规格:{{ item.skuName }}</view>
					<view class=" ml-2">{{ item.createdAt }}</view>
				</view>
				<view class="row-ac flex-1 flex-wrap">
					<scroll-view scroll-x class="scroll-row">
						<view class="rounded mr-2 mb-2 scroll-row-item" v-for="item1 in item.images" :key="item1.id">
							<image :src="item1" mode="" style="width: 200rpx;height: 200rpx;" class="rounded"></image>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getOrderEvaluateListUrl } from '@/api/index.js';
import xiaoStarComponent from '@/components/xiao-star-component/xiao-star-component.vue';

export default {
	data() {
		return {
			goodsEvaluateList: [],
			goodsEvaluateListQueryInfo: {
				page: 1,
				size: 10,
				productId: ''
			},
			goodsEvaluateTotal: 0,
			userImg: '/static/img/header-img.png' //评论用户头像
		};
	},
	components: {
		xiaoStarComponent
	},
	onLoad(option) {
		this.initData(option);
	},
	// 上划加载
	onReachBottom() {
		this.onReachBottomHandle();
	},
	methods: {
		initData(option) {
			this.getGoodsEvaluateList(option);
		},
		// 获取评价列表
		getGoodsEvaluateList(option) {
			if (option) {
				this.goodsEvaluateListQueryInfo.productId = option.productId;
			}
			this.$R.get(getOrderEvaluateListUrl, this.goodsEvaluateListQueryInfo).then(res => {
				this.goodsEvaluateList = res.data.list;
				this.goodsEvaluateList.forEach(item => {
					item.productScore = Number(item.productScore);
					if (item.sku) {
						item.skuName = [];
						for (let i in item.sku) {
							item.skuName.push(item.sku[i]);
						}
						item.skuName = item.skuName.join('，');
					}
				});
				console.log(this.goodsEvaluateList);
				this.goodsEvaluateTotal = res.data.total;
			});
		},
		onReachBottomHandle() {
			if (this.goodsEvaluateTotal != this.goodsEvaluateListQueryInfo.length) {
				this.goodsEvaluateListQueryInfo.page++;
				this.getGoodsEvaluateList();
			}
		}
	}
};
</script>

<style lang="scss">
	page{
		background-color: #F5F5F5;
	}
	.evaluate-userImage {
		width: 60rpx;
		height: 60rpx;
	}
</style>
