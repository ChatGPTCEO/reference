<template>
	<view>
		<view class="footer-h">
			<view class="footer-box footer-h">
				<view class="footer-main flex space">
					<view class="item" @click="linkTo" data-model="index" :style="{color:model== 'index' ? tempColor : '#656A75'}">
						<text class="ft22 iconfont icon-tab01"></text>
						<view class="ft12 mt4 ftw600">首页</view>
					</view>
					<view class="item"  @click="linkTo" data-model="trade" :style="{color:model== 'trade' ? tempColor : '#656A75'}">
						<text class="ft22 iconfont icon-tab05 "></text>
						<view class="ft12 mt4 ftw600">求购</view>
					</view>
					<view class="item flex center">
						<view class="fabu">
							<view @click="showCreate = true" class="fabu-btn">
								<text class="iconfont icon-fabu ft24" :style="{color:tempColor}"></text>
							</view>
						</view>
					</view>
					<view class="item"  @click="linkTo" data-model="news" :style="{color:model== 'news' ? tempColor : '#656A75'}">
						<text class="ft22 iconfont icon-icon-test"></text>
						<view class="ft12 mt4 ftw600">资讯</view>
					</view>
					<view class="item"  @click="linkTo" data-model="member" :style="{color:model== 'member' ? tempColor : '#656A75'}">
						<text class="ft22 iconfont icon-tab04"></text>
						<view class="ft12 mt4 ftw600">我的</view>
					</view>
				</view>
			</view>
		</view>
		<com-create v-if="showCreate" @closed="showCreate = false"></com-create>
	</view>
</template>

<script>
	export default{
		props:{
			model:{
				type:String,
				default:'',
			},
		},
		computed:{
			
		},
		data(){
			return {
				showCreate:false,
			}
		},
		methods:{
			linkTo(e){
				let model = e.currentTarget.dataset.model;
				if(this.model == model) return;
				if(model == 'index'){
					let page = getCurrentPages();
					if(page.length > 1){
						uni.navigateBack({
							delta:page.length
						});
					}else{
						uni.reLaunch({
							url:'/pages/index'
						})
					}
					return;
				}
				let url = '';
				switch(model){
					case 'trade':
						url = '/pages/trade/index';
					break;
					case 'news':
						url = '/pages/news/index';
					break;
					case 'member':
						url = '/pages/member/index';
					break;
					
				}
				if(url == '') return;
				if(this.model == 'index'){
					uni.navigateTo({
						url:url
					})
				}else{
					uni.redirectTo({
						url:url
					})
				}
			}
		}
	}
</script>

<style>
	.footer-h {
		height: 100rpx;
		height: calc(100rpx + constant(safe-area-inset-bottom));
		height: calc(100rpx + env(safe-area-inset-bottom));
	}
	
	.footer-box {
		width: 100%;
		position: fixed;
		z-index: 100;
		left: 0;
		bottom: 0;
		background: #FFFFFF;
		box-shadow: 0rpx -4rpx 16rpx 0rpx rgba(0, 0, 0, 0.04);
	}
	
	.footer-main {
		height: 100rpx;
	}
	
	.footer-main .item{
		height: 100rpx;
		padding-top: 10rpx;
		text-align: center;
		width: 20%;
	}
	.footer-main .item .fabu{
		width: 100rpx;
		position: relative;
	}
	.footer-main .item .fabu .fabu-btn{
		width: 100rpx;
		height: 100rpx;
		border-radius: 50rpx;
		background: linear-gradient(to bottom, #ffffff 0%,#f9f9f9 100%);
		position: absolute;
		top: -40rpx;
		box-shadow: 0px -2px 8px rgba(0,0,0,.09);
		text-align: center;
		line-height: 100rpx;
	}
	
</style>