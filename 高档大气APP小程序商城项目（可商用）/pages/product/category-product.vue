<template>
	<view class="w-100">
		<view class="flex-1" style="height: 420rpx;">
			<image :src="categoryCover" mode="aspectFill"></image>
		</view>
		<view class="flex-1 head-scroll">
			<view class="flex-1 mx-3 row-ac" style="height: 88rpx;">
				<scroll-view scroll-x class="scroll-row" :scroll-into-view="scrollInto">
					<view class="scroll-row-item category-item" v-for="(item,index) in categoryTopList" :key="index"
						@click="clickTab(item,index)" :class="{active: tabIndex == index}">
						<view class="category-cname ">{{ item.cname }}</view>
						<view class="under-line"></view>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="flex-1 row-ac-fw mt-4">
			<view class="category-children row-a-j-fc" v-for="(item,index) in otherCategoryList" :key="index"
				:class="classState == true ?  'category-w25' : 'category-w20'" v-if="index < 10">
				<view class="category-icon">
					<image :src="item.icon" mode=""></image>
				</view>
				<view class="font-s-2 mt-1">{{ item.cname }}</view>
			</view>
		</view>
		<product-list :list="productList"></product-list>
	</view>
</template>

<script>
	import productList from '@/components/common/product-list'
	import {
		getCategoryIndex,
		getCategoryList,
		getCategory
	} from '@/api/index'

	export default {
		components: {
			productList
		},
		data() {
			return {
				tabIndex: 0,
				scrollInto: '',
				catagoryQueryInfo: {
					categoryId: '',
					pageSize: 10,
					page: 1
				},
				categoryTopList: [],
				otherCategoryList: [],
				productList: [],
				categoryCover: '',
				classState: true
			}
		},
		onLoad() {
			this.initData()
		},
		created() {

		},
		methods: {
			initData() {
				this.getCategoryIndexItem()
				this.getCategoryItem()
			},
			clickTab(item, index) {
				if (this.tabIndex === index) {
					return
				}
				this.tabIndex = index
				this.scrollInto = 'tab' + index;
				this.otherCategoryList = this.categoryItem[index].children;
				if (this.otherCategoryList.length < 8) {
					this.classState = true
				} else {
					this.classState = false
				}
				console.log(this.classState);
				this.catagoryQueryInfo = {
					categoryId: this.categoryItem[index].id
				};
				this.categoryCover = this.categoryItem[index].cover
				this.getCategoryProduct()
			},
			getCategoryIndexItem() {
				this.$R.get(getCategoryIndex).then(res => {
					this.categoryTopList = res.data
					this.catagoryQueryInfo = {
						categoryId: this.categoryTopList[0].id,
						pageSize: 10,
						page: 1
					}
					this.getCategoryProduct()
				})
			},
			getCategoryItem() {
				this.$R.get(getCategory).then(res => {
					this.categoryItem = res.data
					this.otherCategoryList = this.categoryItem[0].children
					this.categoryCover = this.categoryItem[0].cover
					if (this.otherCategoryList.length < 8) {
						this.classState = true
					} else {
						this.classState = false
					}
				})
			},
			getCategoryProduct() {
				this.$R.get(getCategoryList, this.catagoryQueryInfo).then(res => {
					this.productList = res.data.list
					console.log("88888888888");
					console.log(this.productList);
				})
			},
			toProduct(id) {
				uni.navigateTo({
					url: '/pages/product/product?productId=' + id
				});
			},
		}
	}
</script>

<style lang="scss">
	page {}

	.head-scroll {
		height: 88rpx;
		background-color: #E9E9E9;

		.category-item {
			margin-right: 40rpx;

			.under-line {
				width: 80rpx;
				height: 6rpx;
				margin: 7rpx auto;
			}
		}

		.active .category-cname {
			color: red;
		}

		.active .under-line {
			background-color: red;
		}
	}

	.category-children {
		width: 25%;
		height: 150rpx;

		.category-icon {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			background-color: #D7D7D7;

			image {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
			}
		}
	}

	.category-w25 {
		width: 25%;
	}

	.category-w20 {
		width: 20%;
	}

	
</style>
