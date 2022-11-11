<template>
	<view>
		<z-paging ref="paging" v-model="list" @query="getPage" :auto="false">
			<cu-custom slot="top" bgColor="bg-red" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">我的足迹</block>
			</cu-custom>
			<view class="bg-white radius">
				<view v-for="(item,index) in list">
					<navigator hover-class="none" :url="'/pages/goods/goods-detail/index?id='+item.spuId"
						class="flex solid-bottom padding-sm">
						<view class="basis-xs margin-xs radius">
							<view class="cu-avatar radius xl"
								:style="'background-image:url(' + item.goodsSpu.spuUrls[0] + ')'">
							</view>
						</view>
						<view class="basis-xl margin-xs padding-lr-sm radius">
							<view class="hx-overflow-2">
								{{item.goodsSpu.name}}
							</view>
							<view class="flex justify-between align-end">
								<view class="text-bold text-df text-price text-red">{{item.goodsSpu.salesPrice}}</view>
								<view>{{'已售'+numberFormat(item.goodsSpu.salesVolume)}}</view>
							</view>
						</view>
					</navigator>
				</view>
			</view>
		</z-paging>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				theme: getApp().globalData.theme,
				list: [],
			};
		},
		onLoad() {
			getApp().initPage().then(res => {
				this.$nextTick(function() {
					this.$refs.paging.reload();
				})
			})
		},
		methods: {
			numberFormat(value) {
				let unit = '';
				var k = 10000,
					sizes = ['', '万', '亿', '万亿'],
					i;
				if (value < k) {
					value = value;
				} else {
					i = Math.floor(Math.log(value) / Math.log(k));
					value = ((value / Math.pow(k, i))).toFixed(2);
					unit = sizes[i];
				}
				return value + unit;
			},
			getPage(pageNo, pageSize) {
				uni.$myRequest.userFootprintPage({
					current: pageNo,
					size: pageSize,
					descs:'create_time'
				}).then(res => {
					this.$refs.paging.complete(res.data.records);
				})
			},
			/**
			 * 滑动单元格 删除事件
			 */
			swipeAction(e) {
				// 获取数组中选中数据
				let data = this.list[e.name];
				if (e.index == 0) { //删除
					uni.$myRequest.userFootprintDel(data.id).then(res => {
						// this.list.splice(e.name, 1);
						this.$refs.paging.reload();
					})
				}
			},
		}
	}
</script>

<style>
</style>
