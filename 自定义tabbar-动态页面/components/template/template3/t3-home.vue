<template>
	<view   class="t3-home-page">
		<!-- #ifndef APP-PLUS -->
			<view class="status-bar">
				
			</view>
		<!-- #endif -->
		<view   class="header-box">
			<view   class="u-flex u-row-right u-p-20">
				<view  @click="toMall">
					<u-image :width="160" :height="50" 
							 src="https://www.baidu.com/img/flexible/logo/pc/result@2.png"></u-image>
				</view>
			</view>
			<view   class="u-m-l-20 u-m-r-20">
				<u-swiper :height="300" :bg-color="backgroundColor" :list="bannnerList" mode="dot"></u-swiper>
			</view>
		</view>
		<view   class="" style="border-radius: 10rpx;margin: 10rpx 20rpx;">
			<u-gap height="40" bg-color="#f7f7f7"></u-gap>
		</view>
		<view   class="u-flex u-row-between u-col-center" style="margin: 0rpx 10rpx 0rpx 20rpx;">
			<view   style="width: 160rpx;">
				<view   class="u-flex u-row-center u-col-center"
						style="width: 150rpx;height: 150rpx;background-color:#3dcd58;color: #ffffff;">
					<view  >
						<u-icon name="rmb" size="30" color="#ffffff"></u-icon>
					</view>
					<view   class="u-font-22 u-m-l-4">积分搜索</view>
				</view>
			</view>
			<view  >
				<u-row>
					<u-col :span="4" text-align="center" v-for="(item,index) in integralList" :key="index">
						<view   class="u-line-1" @click="searchGoodByIntegral(item,index)"
							 style="text-align: center; font-size: 10px;max-width: 180rpx;border-bottom: 3px solid #3dcd58; 
									background-color: #F7F7F7;color:#3dcd58;margin: 16rpx 0rpx;padding:10rpx 4rpx;">
							{{item.title}}
						</view>
					</u-col>
				</u-row>
			</view>
		</view>
		
		<view   style="margin: 50rpx 20rpx 20rpx 20rpx;">
			<u-row justify="center">
				<u-col :span="4" text-align="center"v-for="(item,index) in menuList" :key="index">
					<view   class="u-p-b-10 custom-cursor" style="border-bottom: 3px solid #3dcd58;width: 200rpx;"
						@click="searchGoodByCategory(item,index)"	>
						<view  >
							<u-icon :name="item.icon" size="66" :color="themeColor"></u-icon>
						</view>
						<view   class="u-font-24 u-m-t-16" style="color: #333333;">
							{{item.title}}
						</view>
					</view>
				</u-col>
			</u-row>
		</view>
	</view>
</template>

<script>
	export default {
		name:"t3-home",
		data() {
			return {
				backgroundColor:'#ccaf8b',
				themeColor:'#3dcd58',
				bannnerList: [
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
				integralList:[
					{title:'100积分以下',min:'0',max:'100'},
					{title:'100-300积分',min:'100',max:'300'},
					{title:'300-500积分',min:'300',max:'500'},
					{title:'300-500积分',min:'500',max:'800'},
					{title:'300-500积分',min:'800',max:'1000'},
					{title:'1000积分以上',min:'1000',max:'1000+'},
				],
				menuList:[
					{title:'生日专区',icon:'calendar'},
					{title:'年节专区',icon:'bookmark'},
					{title:'电商专区',icon:'home'},
				]
			};
		},
		methods:{
			toMall:function(){
				this.$emit("toMall",'t3');
			},
			//积分搜索
			searchGoodByIntegral:function(integral,index){
				this.globalUtil.utilAlert("积分搜索:"+integral.title);
			},
			//专区搜索
			searchGoodByCategory:function(category,index){
				this.globalUtil.utilAlert("专区搜索:"+category.title);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.t3-home-page{
		.header-box{
			background: linear-gradient(180deg,#ccaf8b,#fffefe);
			height: 390rpx;
		}
	}
</style>
