<template>
	<view   class="template-page">
		<u-navbar :is-back="false" 
				:title-bold="true" title-color="#ffffff" :title-size="34":title="navbarTitle" 
				:border-bottom="false" :background="backgrond">
		</u-navbar>
		
		 <view   style="padding: 30rpx 20rpx;background: linear-gradient(180deg,#ccaf8b,#fffefe)">
			 <u-swiper :bg-color="themeColor" :list="list" mode="dot"></u-swiper>
		 </view>

		<view   class="u-m-20">
			<view  class="u-flex u-row-between u-col-center u-p-b-20">
				<view   style="font-size: 34rpx;font-weight: bold;">
					<view   style="padding-left: 16rpx;border-left: 3px solid #ccaf8b;">公告</view>
				</view>
				<view  >MORE</view>
			</view>
			<view   class="u-p-t-20 u-p-l-10 u-p-r-10" style="border-radius: 10rpx;background-color: #FFFFFF;">
				<!--next-margin="20rpx" -->
				<swiper :display-multiple-items="5" style="height: 450rpx;width: 100%;"
						:vertical="true" :indicator-dots="false" :autoplay="true" 
						:interval="3000" :duration="500" :circular="true">
						<swiper-item  v-for="(notice,index) in  noticeList"
										:key="index">
							<view   style="background-color: #f2f2f2;width: 100%;border-radius: 10rpx;padding: 16rpx 10rpx;"
									class="u-flex u-row-left u-col-center">
								<view   class="u-line-1" style="text-align:center; font-weight: bold;color: #ccaf8b;width: 200rpx;">{{notice.title}}</view>
								<view   class="u-line-1" style="color: #55555;">{{notice.content}}</view>
							</view>
						</swiper-item>
				</swiper>
			</view>
		</view>

		<view   style="border: 1px solid #EDEDED; border-radius: 10rpx;background-color: #FFFFFF;
						height: 200rpx;padding: 20rpx;margin: 20rpx 20rpx;">
			<u-grid :col="3" hover-class="none" :border="false">
				<u-grid-item v-for="(girdItem,index) in girdList" :key="index">
					<u-icon :name="girdItem.icon" :size="50"></u-icon>
					<view   class="u-line-1">{{girdItem.title}}</view>
				</u-grid-item>
			</u-grid>
		</view>
			
		<view   class="u-m-20">
			<view   class="u-flex u-row-between u-col-center u-m-b-30">
				<view   style="font-size: 34rpx;font-weight: bold;">
					<view   style="padding-left: 20rpx;border-left: 3px solid #ccaf8b;">生活购物</view>
				</view>
			</view>
			<view  >
				<u-row>
					<u-col span="6">
						<view   @click="toMall" class="u-flex u-row-between u-col-center u-p-l-16 u-p-r-16"
								style="width: 100%; height: 200rpx;background-color: #FFFFFF;border-radius: 16rpx;border: 1px solid #EDEDED;">
							<view   style="text-align: left;height: 100%; display: flex;flex-direction: column;justify-content: center;align-items: flex-start;">
								<view   style="font-size: 30rpx;color:#606266;">商城</view>
								<view   style="font-size: 24rpx;color:#909399;margin-top: 10rpx;">有温度的关怀商城</view>
							</view>
							<view  >
								<u-image width="100rpx"
										 height="100rpx"
										 src="https://cdn.uviewui.com/uview/swiper/2.jpg"></u-image>
							</view>
						</view>
					</u-col>
				</u-row>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		name:"t1-home",
		props:{
			navbarTitle:{
				type:String,
				default:'首页'
			}
		},
		data() {
			return {
				backgrond:{
					backgroundColor:'#ccaf8b',
				},
				themeColor:'#ccaf8b',
				list: [
					{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				],
				noticeList:[
					{title:'公告资讯xx',content:'1暗示法很快乐大水井坊拉手孔绝代风华打飞机拉开'},
					{title:'公告资讯',content:'2暗示法很快乐大水井坊拉手孔绝代风华打飞机拉开'},
					{title:'公告资讯',content:'3暗示法很快乐大水井坊拉手孔绝代风华打飞机拉开'},
					{title:'公告资讯',content:'4暗示法很快乐大水井坊拉手孔绝代风华打飞机拉开'},
					{title:'公告资讯',content:'5暗示法很快乐大水井坊拉手孔绝代风华打飞机拉开'},
					{title:'公告',content:'6暗示法很快乐大水井坊拉手孔绝代风华打飞机拉开'},
				],
				girdList:[
					{
						icon:'gift',title:'礼品中心'
					}
				],
			};
		},
		methods:{
			toMall:function(){
				this.$emit("toMall","t1");
			}
		}
	}
</script>

<style lang="scss" scoped>
.template-page{
	background-color: #FFFFFF;
}
</style>
<style>
page{
	background-color: #FFFFFF;
}
</style>
