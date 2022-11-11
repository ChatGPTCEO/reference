<template>
	<view class="cu-modal bottom-modal" :class="skuModal?'show':''">
		<view class="cu-dialog" style="height: 80%;">
			<view class="bg-white flex justify-between solid-bottom">
				<view class="flex align-center">
					<image style="width: 250rpx;height: 250rpx;"
						:src="specSelected.picUrl ? specSelected.picUrl : goodsSpu.spuUrls[0]"></image>
					<view class="padding-lr flex flex-direction align-start">
						<text
							class="text-price text-xxl text-red padding-bottom-xs">{{ specSelected.salesPrice ? specSelected.salesPrice : goodsSpu.lowPrice}}</text>
						<text class="padding-bottom-xs" v-if="specSelected.stock">库存：{{specSelected.stock}}</text>
						<view v-if="specSelected.spuSpecs" class="padding-bottom-xs">
							<text class="text-bold">已选：{{specSelected.spuSpecs}}</text>
						</view>
					</view>
				</view>
				<view @tap="changeSkuModal" class="text-xxl padding-xs">
					<text class="cuIcon-close text-red"></text>
				</view>
			</view>
			<view class="bg-white" style="height: 80%;">
				<view class="padding-bottom-xs" v-for="(item, index) in goodsSpuSpecsList" :key="index">
					<view class="cu-bar bg-white" style="min-height: 80rpx">
						<view class="action">
							<text class="text-black">{{item.specsName}}</text>
						</view>
					</view>
					<view class="grid bg-white margin-lr-sm">
						<button class="cu-btn margin-xs" style="padding-left: 10rpx;padding-right: 10rpx;"
							:class="item.checkedId == item2.id ? 'bg-red' : ''"
							v-for="(item2, index2) in item.goodsSkuSpecsValues" :key="index2"
							@tap="skuClick(item2, index2,index)" :disabled="item2.disabled" type="">
							<view class="flex align-center">
								<image v-if="item2.picUrl" :src="item2.picUrl" style="width: 40rpx;height: 40rpx;">
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
						<uni-number-box :min="1" :max="999" v-model="specSelected.quantity">
						</uni-number-box>
					</view>
				</view>
			</view>

			<!-- 底部操作栏 -->
			<view class="cu-bar bg-white tabbar border shop foot">
				<view class="btn-group">
					<button class="cu-btn round shadow-blur lg bg-red" style="width: 90%" @tap="onClick"
						type>确定</button>
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
			goodsSpu: {
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
				quantity: 1,
				checkSku: [],
				specSelected: {},
				specImg: ''
			}
		},
		methods: {
			skuClick(item2, index2, index) {
				if (index == 0 && item2.picUrl) {
					this.goodsSku.picUrl = item2.picUrl
					// 解决更改  this.goodsSpuSpecsList 数组信息 页面不渲染问题，也是网上查的解决方案
					this.$emit("changeGoodsSku", this.goodsSku)
				}
				if (item2.picUrl) {
					this.specImg = item2.picUrl;
				}

				this.goodsSpuSpecsList[index].goodsSkuSpecsValues.forEach(function(valueItem) {
					valueItem.disabled = false
				})
				this.goodsSpuSpecsList[index].checkedId = this.goodsSpuSpecsList[index].checkedId == item2.id ? '' : item2
					.id;
				this.$set(this.goodsSpuSpecsList[index].goodsSkuSpecsValues[index2], 'disabled', true)

				// 解决更改  this.goodsSpuSpecsList 数组信息 页面不渲染问题，也是网上查的解决方案
				this.checkSku[index] = this.goodsSpuSpecsList[index].goodsSkuSpecsValues[index2].id

				this.$emit("changeSpuSpecsValue", this.goodsSpuSpecsList)
				this.computeSku();
				this.$emit("changeSpecSelected", this.specSelected)
			},
			changeSkuModal() {
				this.$emit("changeSkuModal", false)
			},
			/**
			 * 确认按钮
			 */
			onClick() {
				console.log("最终数据----" + JSON.stringify(this.specSelected))
				for (let item of this.goodsSpuSpecsList) {
					if (!item.checkedId) {
						uni.showToast({
							title: '请选择' + item.specsName,
							icon: 'none',
							duration: 3000
						});
						return;
					}
				}
				let goodsList = [{
					goodsSku: this.specSelected,
					goodsSpu: this.goodsSpu,
					quantity: this.specSelected.quantity
				}]
				uni.navigateTo({
					url: '/pages/order/order-confirm/index?goodsList=' + encodeURIComponent(JSON.stringify(
						goodsList)),

				});
			},
			computeSku() {
				//本地的SKU属性集合应该和detail中的sku集合对比，可以因此获取到库存值
				//参照下方的数据格式，相当于是{"颜色":"红色","尺码":"L"} 与 {"尺码":"L"，"颜色":"红色"}进行匹配的过程
				//首先先获取本地属性集合的长度
				//对象获取属性名的数组集合通过Object.keys(对象)的方式获取，数组的长度通过length来获取
				let skuLength = Object.keys(this.checkSku).length;
				console.log("skuLength" + skuLength)
				//对象的for in 循环中，key值是属性名，for in 循环数组中的key是索引值
				for (let key in this.goodsSpu.goodsSkus) {
					// 此处的item 数据格式:{"尺码":"L","颜色":"红色"}
					let item = this.goodsSpu.goodsSkus[key].goodsSkuSpecsValues;
					let skul = 0;
					//对象的for in 循环中，key值是属性名
					for (let key in item) {
						if (item[key].specsValueId === this.checkSku[key]) {
							skul++;
						}
					}
					console.log("skul -" + skul)
					if (skul === skuLength) {
						//如果两者相等，则代表是找到了匹配的属性集合
						let itemSpecs = item;
						//此处的item 数据格式:{"尺码":"L","颜色":"红色"}
						let itemTitle = "";
						for (let specs in itemSpecs) {
							itemTitle += itemSpecs[specs].specsValueName + ';';
						}

						//此处的itemTile 展示形式是：L 红色 
						// 给detail 添加一个属性为 itemTitle 展示形式是：L 红色 
						// 给detail 添加一个属性为 number 就是选中的商品数量
						// this.goodsSpu.goodsSkus[key].number = 1;
						//将整合好的数据存储在本地参数  specSelected
						this.specSelected = this.goodsSpu.goodsSkus[key];
						this.specSelected.spuSpecs = itemTitle;
						this.specSelected.quantity = 1;
						this.specSelected.imageUrl = this.specImg;

					}
				}
			}
		}
	}
</script>

<style>
</style>
