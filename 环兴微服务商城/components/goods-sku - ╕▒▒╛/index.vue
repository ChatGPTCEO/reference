<template>
	<view class="cu-modal bottom-modal" :class="skuModal?'show':''">
		<view class="cu-dialog" style="height: 80%;">
			<view class="cu-bar bg-white" style="height: 15%;">
				<view class="action text-green">
					<view v-if="goodsSku.picUrl" class="cu-avatar xl round" :style="'background-image:url(' + goodsSku.picUrl  + ')'">
					</view>
					<view v-else class="cu-avatar xl round" :style="'background-image:url(' + goodsSpu.spuUrls[0]  + ')'">
					</view>
					<view class="padding-lr">
						<text class="text-price text-xxl text-red">{{ goodsSku.salesPrice ? goodsSku.salesPrice : goodsSpu.lowPrice}}</text>
					</view>
				</view>
				<view class="action" @tap="changeSkuModal">
					<text class="cuIcon-close text-red"></text>
				</view>
			</view>
			<view class="bg-white" style="height: 80%;">
				<view class="padding-bottom-xs solid-top" v-for="(item, index) in goodsSpuSpecsList" :key="index">
					<view class="cu-bar bg-white" style="min-height: 80rpx">
						<view class="action">
							<text class="text-black">{{item.specsName}}</text>
						</view>
					</view>
					<view class="grid bg-white margin-lr-sm">
						<button class="cu-btn margin-xs" style="padding-left: 10rpx;padding-right: 10rpx;" :class="item.checkedId == item2.id ? 'bg-red' : ''"
							v-for="(item2, index2) in item.goodsSkuSpecsValues" :key="index2"
							@tap="skuClick(item2, index2,index)" :disabled="item2.disabled" type="">
							<view class="flex align-center">
								<image
								v-if="item2.picUrl"
									:src="item2.picUrl"
									style="width: 40rpx;height: 40rpx;">
								</image>
								<view class="padding-lr-xs">
									{{item2.specsValueName}}
								</view>
							</view>
						</button>
					</view>
				</view>
				<view class="cu-bar bg-white solid-top">
					<view class="action">
						<text class="text-black">数量</text>
					</view>
					<view class="action">
						<uni-number-box :min="1" :max="999" v-model="quantity">
						</uni-number-box>
					</view>
				</view>
			</view>

			<!-- 底部操作栏 -->
			<view class="cu-bar bg-white tabbar border shop foot">
				<view class="btn-group">
					<button class="cu-btn round shadow-blur lg bg-red" style="width: 90%" @tap="onClick" type>确定</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			goodsSpuSpecsList: {
				type: Array,
				default: () => []
			},
			skuModal: {
				type: Boolean,
				default: false
			},
			goodsSpu:{
				type: Object,
				default: {}
			},
			goodsSku: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {
				selectedSku: {},
				quantity: 1
			}
		},
		methods: {
			skuClick(item2, index2, index) {
				if(index ==0){
					this.goodsSku.picUrl=item2.picUrl
					// 解决更改  this.goodsSpuSpecsList 数组信息 页面不渲染问题，也是网上查的解决方案
					this.$emit("changeGoodsSku", this.goodsSku)
				}
				let _this = this;
				this.goodsSpuSpecsList[index].checkedId = this.goodsSpuSpecsList[index].checkedId == item2.id ? '' : item2
					.id;
				this.$set(this.goodsSpuSpecsList[index].goodsSkuSpecsValues[index2], 'disabled', true)
				this.goodsSpuSpecsList[index].goodsSkuSpecsValues.forEach(function(valueItem) {
					if (valueItem.id != item2.id) {
						valueItem.disabled = false
					}
				})
				console.log(JSON.stringify(this.goodsSpuSpecsList))
				// 解决更改  this.goodsSpuSpecsList 数组信息 页面不渲染问题，也是网上查的解决方案
				this.$emit("changeSpuSpecsValue", this.goodsSpuSpecsList)
			},
			changeSkuModal() {
				this.$emit("changeSkuModal", false)
			}
		}
	}
</script>

<style>
</style>
