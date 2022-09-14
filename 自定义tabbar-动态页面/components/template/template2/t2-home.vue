<template>
	<view   class="template-page">
		<!-- #ifndef H5 -->
			<view class="status-bar">
				
			</view>
		<!-- #endif -->
		
		<scroll-view :scroll-x="false" :scroll-y="true" :style="'height:'+bodyHeight+'px;'">
		<view   class="navbar-box">
			<view   style="width: 80%;">
				<u-search v-model="searchWord"
					placeholder="搜索你想要的商品" shape="round" :show-action="false" height="80"
					bg-color="#ffffff" :clearabled="true"></u-search>
			</view>
			<view   class="u-flex u-row-center u-col-center" 
					style="border-radius: 10rpx;background-color: #FFFFFF;width: 80rpx;height: 80rpx;">
					<view  >
						<u-badge v-if="tipFlag" :is-dot="true" type="error" :offset="[30,45]"></u-badge>
						<u-icon name="chat" color="#909399" size="50"></u-icon>
					</view>
			</view>
		</view>
		<!-- 轮播 -->
		<view   class="banner-box">
			<u-swiper :height="300" :list="bannerList" :interval="5000" mode="round" name="pictureUrl":border-radius="20"></u-swiper>
		</view>
		
		<view   class="user-info-box" style="background-color: #FFFFFF;border-radius: 20rpx;">
			<view   class="u-border-bottom" 
				style="text-align: left; font-size: 32rpx;font-weight: bold;color: #606266;padding:30rpx 20rpx;">
				<text>甜诺烘焙</text>
			</view>
			<view   class="u-flex u-row-between u-col-center u-p-20">
				<view   class="u-flex u-row-left u-col-center">
					<view   class="u-flex u-row-center u-col-center"
						style="width: 100rpx;height: 100rpx;border-radius: 50%;background: linear-gradient(0deg, #D3335B 0%, #EA8D6E 100%);;">
						<view v-if="vuex_userInfo.avatar">
							<u-icon :name="vuex_userInfo.avatar" size="46" color="#ffffff"></u-icon>
						</view>
						<view   v-else>
							<u-icon name="account" size="46" color="#ffffff"></u-icon>
						</view>
					</view>
					<view   style="color: ##333333;margin-left: 30rpx;font-size: 30rpx;font-weight: bold;">
						<view>{{vuex_userInfo.name}}</view>
						<view   v-if="vuex_userInfo.mobile">
							{{vuex_userInfo.mobile.substring(vuex_userInfo.mobile.indexOf("-")+1,vuex_userInfo.mobile.length)}}
						</view>
					</view>
				</view>
				<view  >
					<u-button @click="toMyWallet()" type="error" shape="circle" size="medium"
						:custom-style="customBtnStyle">查看积分余额</u-button>
				</view>
			</view>
		</view>
		
		
	
	
		<view   class="u-m-20" v-if="noticeList.length>0">
			<homeNotice :noticeList="noticeList"></homeNotice>
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
	import homeNotice from '@/components/common/notice.vue' //最新动态
	export default {
		name:"t2-home",
		components:{
			limitActivity,themeGird,selectedApplication,selectedBrand,marketingActivity,homeNotice
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
				limitActivityList:[],
				//最新动态
				noticeList:[
					{title:'最新物流动态',viewNumber:10,image:'https://cdn.uviewui.com/uview/swiper/1.jpg'},
					{title:'最新财务动态',viewNumber:1000,image:'https://cdn.uviewui.com/uview/swiper/1.jpg'}
				]
			
			};
		},
		mounted:function(){
			console.log("vuex_userInfo",this.vuex_userInfo);	
		},
		
		methods:{
			
			
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


