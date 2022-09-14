<template>
	<view   class="template-page">
		<!-- #ifndef H5 -->
			<view class="status-bar">
				
			</view>
		<!-- #endif -->
		<scroll-view :scroll-x="false" :scroll-y="true" :style="'height:'+bodyHeight+'px;'">
		<view   class="navbar-box">
			<view   style="width: 200rpx;">
				<u-image src="https://www.baidu.com/img/flexible/logo/pc/result@2.png"
						mode="scaleToFill" width="200rpx" height="70">
				</u-image>
			</view>
			<view  >
				<u-search v-model="searchWord" @search="searchGood"
					placeholder="搜索你想要的商品" shape="square" :show-action="false" height="70"
					bg-color="#ffffff" :clearabled="true"></u-search>
			</view>
			<view   class="u-flex u-row-center u-col-center" 
					style="border-radius: 10rpx;background-color: #FFFFFF;width: 70rpx;height: 70rpx;">
					<view  >
						<u-badge v-if="tipFlag" :is-dot="true" type="error" :offset="[30,35]"></u-badge>
						<u-icon name="chat" color="#909399" size="50"></u-icon>
					</view>
			</view>
		</view>
		<!-- 轮播 -->
		<view   class="banner-box">
			<u-swiper :height="260" :list="bannerList" :interval="5000" mode="round" name="pictureUrl":border-radius="20"></u-swiper>
		</view>
		
		<view  class="u-m-20" v-if="girdList.length>0">
			<themeGird :column="5":themeGirdList="girdList" @themeGirdClick="girdClick" :titleShow="false" :bgColor="'#F1F1F1'"></themeGird>
		</view>
	<!-- 	<view  class="u-m-20" v-if="unionWelfareList.length>0">
			<themeGird  :column="4"
						:themeGirdList="unionWelfareList" 
						@themeGirdClick="girdClick" 
						:titleShow="true" 
						:girdTitle="'工会福利'"></themeGird>
		</view> -->
		
		<view  class="u-m-20">
			<view   style="width: 100%;">
				<u-image :height="156" mode="aspectFit"
						src="/static/mt.07de75f.png"></u-image>
			</view>
		</view>
		
		<!-- 限时抢购 -->
		<view  class="u-m-20" v-show="limitActivityList.length>0">
			<limitActivity :limitActivityList="limitActivityList" 	@toGoodDetail="toGoodDetail" @toActivity="toActivity"></limitActivity>
		</view>
		
		
		<view  class="u-m-20">
			<view   style="width: 100%;">
				<u-image :height="250"
						src="https://cdn.uviewui.com/uview/swiper/1.jpg"></u-image>
			</view>
		</view>
		
		<view  class="u-m-20" v-show="hotBrandList.length>0">
			<selected-brand :brandList="hotBrandList":titleAlign="'left'"></selected-brand>
		</view>
	
		</scroll-view>
	</view>
</template>

<script>
	import limitActivity from '@/components/common/limitActivity.vue'; //限时活动
	import themeGird from '@/components/common/themeGird.vue';	//主体精选
	import selectedApplication from '@/components/common/selectedApplication.vue'; //精选应用
	import selectedBrand from '@/components/common/selectedBrand.vue';	//精选品牌
	import marketingActivity from '@/components/common/marketingActivity.vue';//推荐活动
	export default {
		name:"t4-home",
		components:{
			limitActivity,themeGird,selectedApplication,selectedBrand,marketingActivity
		},
		props:{
			bodyHeight:{
				type:Number,
				default:0
			}
		},
		data() {
			return {
				searchWord:'',
				tipFlag:true,
				bannerList:[
					{
						pictureUrl:'https://cdn.uviewui.com/uview/swiper/1.jpg'
					}
				],
				customBtnStyle: {
					padding: '20rpx 40rpx'
				},
				
				girdList: [
					{
						iconPath: '/static/gird/Col_b7757ebe-de4b-43b1-b903-0d0bfcfd7710.jpg',
						title: "食品保健",
						category:'11001',
					},
					{
						iconPath: '/static/gird/Col_b4b3ac77-7a2f-4d83-8975-e7cc5ccdc401.jpg',
						title: "数码电子",
						category:'12001',
					},
					{
						iconPath: '/static/gird/Col_a7f5b2e1-f576-4d46-8a17-5c634a279ef3.jpg',
						title: "家用电器",
						category:'268',
					},
					{
						iconPath: '/static/gird/Col_17f45244-3949-4580-966f-155c79082101.jpg',
						title: "家居日用",
						category:'333',
					},
					{
						iconPath: '/static/gird/Col_d36b3a26-5e64-4df1-99dc-f9ca2d45b445.jpg',
						title: "个护化妆",
						category:'334',
					},
					{
						iconPath: '/static/gird/Col_42e1284b-9a0c-4870-974e-da7ee62405ca.jpg',
						title: "服饰箱包",
						category:'12032',
					},
					{
						iconPath: '/static/gird/Col_84dd52f3-32c6-4f4b-ab65-704bc5a82760.jpg',
						title: "母婴玩具",
						category:'12031',
					},
					{
						iconPath: '/static/gird/Col_ab30596b-ff23-421e-86de-75f4d0318512.jpg',
						title: "文体娱乐",
						category:'11008',
					},
					{
						iconPath: '/static/gird/Col_4359ebe5-5231-4999-997f-801cafc5e98a.jpg',
						title: "生活服务",
						category:'11008',
					},
					{
						iconPath: '/static/gird/Col_071c2cdf-8a37-4f2e-8cc4-224d7bd5211b.jpg',
						title: "健康关怀",
						category:'11008',
					}
				],
				unionWelfareList:[
					{
						iconPath: '/static/gird/Plan/Plan_d0eec8a5-9788-49ed-bf8c-7f8febae1ab8.jpg',
						title: "中粮直供",
						category:'334',
					},
					{
						iconPath: '/static/gird/Plan/Plan_cab0efc7-4095-4678-b39d-3e5665272fea.jpg',
						title: "踏青出游",
						category:'12032',
					},
					{
						iconPath: '/static/gird/Plan/Plan_15e799e7-fdd3-4ae3-8b32-05bd407e59b0.jpg',
						title: "靓丽伊人",
						category:'12031',
					},
					{
						iconPath: '/static/gird/Plan/Plan_2416e61c-8489-4962-975a-c2679382937e.jpg',
						title: "生日福利",
						category:'11008',
					}
				],
				limitActivityList:[],
				//人气品牌
				hotBrandList: [{
						id: 1,
						name: '京东商城',
						logo: '/static/logo.png'
					},
					{
						id: 1,
						name: '京东商城',
						logo: '/static/logo.png'
					},
					{
						id: 1,
						name: '京东商城',
						logo: '/static/logo.png'
					},
					{
						id: 1,
						name: '京东商城',
						logo: '/static/logo.png'
					},
					{
						id: 1,
						name: '京东商城',
						logo: '/static/logo.png'
					},
					{
						id: 1,
						name: '京东商城',
						logo: '/static/logo.png'
					},
				],
			};
		},
		mounted:function(){
			this.limitedTimeActivity();
		},
		
		methods:{
			searchGood:function(){},
			//获取首页限时抢购信息
			limitedTimeActivity:function(){
				let that=this;
				let limitActivityList=[];
			
			},
			//点击宫格
			girdClick:function(item){
				let that=this;
				let categoryCode=item.category;
				console.log("商品类别",categoryCode);
			
			},
			//去活动页
			toActivity:function(activityItem,type){
				let that=this;
				let item=activityItem;
				delete item.limitAcGoods;
			
			
			},
			toGoodDetail:function(goodDetail){
				console.log("去商品详情",goodDetail);
			
			},
			//去商城
			toMall:function(){
				this.$emit("toMall",'t2');
			}
		}
	}
</script>

<style lang="scss" scoped>
.template-page{
	.status-bar{
		 height: var(--status-bar-height);
		 width: 100%;
	}
	
	height: 100%;
	background-color: #F7F7F7;
	.navbar-box{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		width: 100%;
		padding: 20rpx;
	}
	.banner-box{
		margin:10rpx 20rpx;
	}
	.user-info-box{
		margin: 20rpx;
	}
}
</style>


