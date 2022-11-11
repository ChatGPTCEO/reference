<template>
	<view>
		<view class="search" @click="$u.route('/pages/search/search',{type:'house'})">
			<u-icon name="search" color="#999999" size="28"></u-icon>
			<text style="margin-left: 20rpx;">搜索相关房源</text>
		</view>
		<view class="gird">
			<u-grid :col="4" :border="false">
				<u-grid-item style="background: rgba(0,0,0,0);"
					@click="$u.route('/pagesIndex/houselist/houselist',{type:'house',info_type:'sell'})">
					<u-image width="80rpx" height="80rpx" src="@/static/images/menu7.png"></u-image>
					<view class="grid-text">房屋出售</view>
				</u-grid-item>
				<u-grid-item style="background: rgba(0,0,0,0);"
					@click="$u.route('/pagesIndex/houselist/houselist',{type:'house',info_type:'rent'})">
					<u-image width="80rpx" height="80rpx" src="@/static/images/menu8.png"></u-image>
					<view class="grid-text">房屋出租</view>
				</u-grid-item>
				<u-grid-item style="background: rgba(0,0,0,0);"
					@click="$u.route('/pagesIndex/storehouse/storehouse',{type:'shop'})">
					<u-image width="80rpx" height="80rpx" src="@/static/images/menu3.png"></u-image>
					<view class="grid-text">商铺</view>
				</u-grid-item>
				<u-grid-item style="background: rgba(0,0,0,0);" @click="$u.route('/pagesIndex/ask/ask')">
					<u-image width="80rpx" height="80rpx" src="@/static/images/menu5.png"></u-image>
					<view class="grid-text">求租求购</view>
				</u-grid-item>
			</u-grid>
		</view>
		<view class="ad">
			<u-image :border-radius="10" width="100%" height="200rpx" :src="banner">
			</u-image>
		</view>
		<!-- 标题栏 -->
		<HeadCell title="出售推荐" :leftIcon="require('@/static/images/menu1.png')"
			@rigthClick="$u.route('/pagesIndex/houselist/houselist',{type:'house',info_type:'sell'})"></HeadCell>
		<view style="margin: 0 20rpx;">
			<HouseList :houseData="sell_list"></HouseList>
			<u-empty v-if="sell_list.length==0" text="暂无数据" mode="list" style="background-color: white;"></u-empty>
		</view>
		<view style="height: 20rpx;"></view>
		<!-- 标题栏 -->
		<HeadCell title="出租推荐" :leftIcon="require('@/static/images/menu1.png')"
			@rigthClick="$u.route('/pagesIndex/houselist/houselist',{type:'house',info_type:'rent'})"></HeadCell>
		<view style="margin: 0 20rpx;">
			<HouseList :houseData="rent_list"></HouseList>
			<u-empty v-if="rent_list.length==0" text="暂无数据" mode="list" style="background-color: white;"></u-empty>
		</view>
		<view style="height: 20rpx;"></view>
		<!-- 标题栏 -->
		<HeadCell title="商铺推荐" :leftIcon="require('@/static/images/menu1.png')"
			@rigthClick="$u.route('/pagesIndex/storehouse/storehouse',{type:'shop'})"></HeadCell>
		<view style="margin: 0 20rpx;">
			<HouseList :houseData="shop_list"></HouseList>
			<u-empty v-if="shop_list.length==0" text="暂无数据" mode="list" style="background-color: white;"></u-empty>
		</view>
	</view>
</template>

<script>
	import HeadCell from '@/components/HeadCell/HeadCell.vue';
	import HouseList from '@/components/HouseList/HouseList.vue';
	export default {
		components: {
			HeadCell,
			HouseList
		},
		data() {
			return {
				houseData: [{
					id: 1,
					title: '航天小区住房出租',
					houseType: '3室1厅1卫',
					acreage: '98㎡',
					lables: ['押一付一', '精装修', '拎包入住'],
					price: '3000元/月'
				}, {
					id: 1,
					title: '航天小区住房出租',
					houseType: '3室1厅1卫',
					acreage: '98㎡',
					lables: ['押一付一', '精装修', '拎包入住'],
					price: '3000元/月'
				}, {
					id: 1,
					title: '航天小区住房出租',
					houseType: '3室1厅1卫',
					acreage: '98㎡',
					lables: ['押一付一', '精装修', '拎包入住'],
					price: '3000元/月'
				}, {
					id: 1,
					title: '航天小区住房出租',
					houseType: '3室1厅1卫',
					acreage: '98㎡',
					lables: ['押一付一', '精装修', '拎包入住'],
					price: '3000元/月'
				}, {
					id: 1,
					title: '航天小区住房出租',
					houseType: '3室1厅1卫',
					acreage: '98㎡',
					lables: ['押一付一', '精装修', '拎包入住'],
					price: '3000元/月'
				}],
				rent_list: [],
				sell_list: [],
				shop_list: [],
				banner: '',
			}
		},
		onLoad() {
			this.getIndex()
		},
		methods: {
			getIndex() {
				this.$u.get('/addons/hicity/house/index', {

				}).then(res => {
					this.rent_list = res.rent_list;
					this.sell_list = res.sell_list;
					this.shop_list = res.shop_list;
					if (res.banner) {
						this.banner = res.banner.image;
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.search {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin: 20rpx;
		height: 80rpx;
		border-radius: 50rpx;
		background-color: white;
		padding-left: 20rpx;
	}

	.ad {
		margin: 20rpx;
	}

	.gird {
		margin: 0 20rpx;
		background-color: white;
		border-radius: 20rpx;
	}
</style>
<style>
	.u-grid-item {
		background-color: rgba(0, 0, 0, 0) !important;
	}
</style>
