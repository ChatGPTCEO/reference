<template>
	<view>
		<cu-custom :isBack="true" bgColor="bg-red">
			<block slot="backText">返回</block>
			<block slot="content">商品详情</block>
		</cu-custom>
		<swiper class="screen-swiper round-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
			duration="500" style="height: 600rpx;">
			<swiper-item v-for="(item,index) in dataObj.spuUrls" :key="index">
				<image :src="item" mode="scaleToFill"></image>
			</swiper-item>
		</swiper>
		<view class="padding-sm margin-top-xs bg-white">
			<view class="flex">
				<text
					class="text-price text-red text-xl padding-right-xs">{{dataObj.highPrice != dataObj.lowPrice ? dataObj.lowPrice+"起": dataObj.highPrice}}</text>
			</view>
			<view>
				<view class="text-black ">{{dataObj.name}}</view>
				<view class="text-grey padding-tb-xs" v-if="dataObj.subTitle">{{dataObj.subTitle}}</view>
			</view>
		</view>
		<view class="bg-white margin-top-xs" v-if="dataObj.enableSpecs == '1'">
			<view class="flex flex-wrap">
				<view class="basis-xs padding flex align-center"> <text>选择</text></view>
				<view class="basis-xl padding-lr padding-tb-xs" @tap="selectSku">
					<view class="flex justify-between align-center">
						<view>
							<view class="margin-xs text-bold">
								<text v-for="(item,index) in goodsSpuSpecsList" :key="index" v-if="!selectedSku">
									{{item.specsName}}{{index == goodsSpuSpecsList.length-1 ?'' :' / '}}
								</text>
								<text v-if="selectedSku" class="text-bold">
									已选：{{selectedSku.spuSpecs}}
								</text>
							</view>

							<view>
								<view class="cu-avatar radius  margin-left-xs"
									v-for="i in goodsSpuSpecsList[0].goodsSkuSpecsValues.length >=4 ? 4: goodsSpuSpecsList[0].goodsSkuSpecsValues.length"
									:key="i"
									:style="'background-image:url(' + goodsSpuSpecsList[0].goodsSkuSpecsValues[i].picUrl + ')'">
								</view>
								<text
									class="bg-grey margin-left-xs padding-xs radius text-sm">共{{goodsSpuSpecsList.length}}种{{goodsSpuSpecsList[0].specsName}}可选</text>
							</view>
						</view>
						<view>
							<text class="cuIcon-right"></text>
						</view>
					</view>

				</view>
			</view>
		</view>
		<view class="flex padding justify-between margin-top-xs bg-white">
			<view>
				<text>发货</text>
				<view>
					{{freightTemplate.sendTime}}
				</view>
			</view>
			<view>
				<view>{{freightTemplate.address}}</view>
				<text class="text-bold">{{'快递费：'+getPostage}}</text>
			</view>
		</view>
		<view class="cu-card bg-white margin-top-xs">
			<view class="flex solid-bottom padding justify-between">
				<text>商品评价</text>
				<text v-if="goodsAppraiseList && goodsAppraiseList.length >0" @tap="tapGoodsAppraise">查看更多 <text
						class="cuIcon-right"></text></text>
			</view>
			<view v-if="goodsAppraiseList && goodsAppraiseList.length >0" v-for="(item,index) in goodsAppraiseList"
				:key="index">
				<view class="cu-item">
					<view class="cu-list menu-avatar">
						<view class="cu-item">
							<view class="cu-avatar round lg" :style="'background-image:url(' + item.avatarUrl + ')'">
							</view>
							<view class="content flex-sub">
								<view>{{item.nickName}}</view>
								<view class="text-gray text-sm flex justify-between">
									{{item.createTime}}
								</view>
							</view>
						</view>
					</view>
					<view class="text-content padding-lr margin-tb-sm">
						{{item.content}}
					</view>
					<view class="grid flex-sub padding-lr col-3 grid-square solid-bottom">
						<view class="bg-img" :style="'background-image:url(' + itemPic + ')'"
							v-for="(itemPic,index) in item.picUrls " v-if="index<3" :key="index">
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="bg-white margin-top-xs">
			<view class="flex justify-center padding-tb-lg">
				<text>商品详情</text>
			</view>
			<u-parse :content="dataObj.description" />
		</view>
		<view class="cu-tabbar-height"></view>
		<!-- 底部操作栏 -->
		<view class="cu-bar bg-white tabbar border shop foot">
			<button class="action" @tap="toHome">
				<view class="cuIcon-home text-red">
				</view>
				<text>首页</text>
			</button>
			<view class="action" @tap="toCart">
				<view class="cuIcon-cart text-red">
					<view class="cu-tag badge">99</view>
				</view>
				<text>购物车</text>
			</view>
			<view class="btn-group">
				<button class="cu-btn bg-orange round shadow-blur" @tap="addCart">加入购物车</button>
				<button class="cu-btn bg-red round shadow-blur" @tap="selectSku">立即购买</button>
			</view>
		</view>
		<GoodsSku :goodsSpuSpecsList="goodsSpuSpecsList" :goodsSpu="dataObj" :goodsSku="selectedSku"
			:skuModal="skuModal" @changeSpuSpecsValue="goodsSpuSpecsList =$event" @changeSkuModal="skuModal = $event"
			@changeGoodsSku="selectedSku = $event" @changeSpecSelected="changeSpecSelected"></GoodsSku>
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue'
	import GoodsSku from '@/components/goods-sku/index.vue'
	export default {
		components: {
			uParse,
			GoodsSku
		},
		data() {
			return {
				theme: getApp().globalData.theme,
				dataObj: {}, // 商品详情
				freightTemplate: {}, //运费模版
				goodsAppraiseList: [], // 商品评论
				goodsSpuSpecsList: [],
				skuModal: false,
				selectedSku: null

			};
		},
		onLoad(props) {
			getApp().initPage().then(res => {
				if (props.id) {
					this.getDetail(props.id);
				}
			})
		},
		computed: {
			getPostage() {
				if (this.freightTemplate.isInclPostage == '1') {
					return '包邮';
				} else if (this.freightTemplate.isInclPostageByIf == '1') {
					return '满' + this.freightTemplate.fullAmount + '元包邮';
				} else {
					return this.freightTemplate.firstFreight + "元起";
				}
			}
		},
		methods: {
			/**
			 * 查询商品详情
			 */
			getDetail(id) {
				uni.$myRequest.goodsSpuById(id).then(res => {
					this.dataObj = res.data
					this.getFreightTemplate(res.data.freightTemplateId)
					this.getGoodsAppraise();
					this.getGoodsSpusPecsList(this.dataObj.id)

				});
			},
			getGoodsSpusPecsList(id) {
				let params = {
					spuId: id
				}
				uni.$myRequest.goodsSpuSpecsList(params).then(res => {
					let goodsSpecss = res.data;
					goodsSpecss.forEach(function(item) {
						item.checkedId = ''
						item.goodsSkuSpecsValues.forEach(function(item2) {
							item2.disabled = false
						})
					})
					this.goodsSpuSpecsList = goodsSpecss
				});
			},
			/**
			 * 查询运费模版
			 * @param {Object} ii
			 */
			getFreightTemplate(id) {
				uni.$myRequest.freightTemplateById(id).then(res => {
					this.freightTemplate = res.data
					this.dataObj.freightTemplate = this.freightTemplate

				});
			},
			/**
			 * 查询最近两条商品评论
			 */
			getGoodsAppraise() {
				let page = {
					current: 1,
					size: 2,
					spuId: this.dataObj.id,
					descs: 'create_time'
				}
				uni.$myRequest.goodsAppraisePage(page).then(res => {
					this.goodsAppraiseList = res.data.records
				})
			},
			/**
			 * 加入购物车
			 */
			addCart() {
				let data = {
					spuId: this.dataObj.id,
					quantity: 1,
					spuName: this.dataObj.name,
					picUrl: this.dataObj.spuUrls[0],
					salesPrice: this.dataObj.salesPrice,
				};
				uni.$myRequest.saveOrUpdateCart(data).then(res => {
					uni.showToast({
						title: '添加成功',
						icon: 'none',
						duration: 3000
					});
				})

			},
			/**
			 * 跳转商品评论列表
			 */
			tapGoodsAppraise() {
				uni.navigateTo({
					url: "/pages/goods/goods-appraise/index?spuId=" + this.dataObj.id
				})
			},
			/**
			 * 跳转首页
			 */
			toHome() {
				uni.reLaunch({
					url: '/pages/home/index'
				})
			},
			/**
			 * 跳转购物车
			 */
			toCart() {
				uni.switchTab({
					url: '/pages/shopping-cart/index'
				});
			},
			/**
			 * sku选择
			 */
			selectSku() {
				this.skuModal = true
				// this.selectedSku = this.dataObj.goodsSkus[0]
			},
			changeSpecSelected(data) {
				this.selectedSku = data
			}

		}
	}
</script>

<style lang="scss">

</style>
