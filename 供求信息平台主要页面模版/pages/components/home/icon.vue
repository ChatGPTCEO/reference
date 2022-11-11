<template>
	<view>
		<view class="flex alcenter">
			<view v-for="(item,index) in icons" :key="index" class="icon-default-item">
				<navigator :url="item.link">
				<view>
					<image class="icon-image" :src="item.icon"></image>
				</view>
				<view class="mt5 ft14 ftw500 cl-main">{{item.name}}</view>
				</navigator>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		
		data(){
			return {
				icons:[
					{name:'找商家',link:'/pages/store/index',icon: this.$config.staticUrl + 'b2b_store.png'},
					{name:'找产品',link:'/pages/product/index',icon:this.$config.staticUrl + 'b2b_product.png'},
					{name:'找需求',link:'/pages/trade/index',icon:this.$config.staticUrl + 'b2b_trade.png'},
					{name:'品牌商家',link:'/pages/brand/index',icon:this.$config.staticUrl + 'b2b_brand.png'},
					{name:'免费入驻',link:'/pages/store/apply',icon:this.$config.staticUrl + 'b2b_regsiter.png'},
				],
				
			}
		}
	}
</script>

<style>
	.icon-default-item{
		width: 20%;
		text-align: center;
	}
	.icon-category-item{
		width: 20%;
		text-align: center;
		height: 120rpx;
	}
	.icon-image{
		width: 64rpx;
		height:64rpx;
	}

</style>