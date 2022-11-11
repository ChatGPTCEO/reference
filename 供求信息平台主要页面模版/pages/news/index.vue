<template>
	<view>
		<view>
			<swiper class="news-header" :autoplay="true" :indicator-dots="true" :interval="3000" :duration="500">
					<swiper-item>
						<navigator url="/pages/news/detail">
						<view class="news-header-item">
							<image mode="aspectFill"></image>
							<view class="tit text-over">支付宝小程序如何在onLaunch中获取外来参数 - 百度知道</view>
						</view>
						</navigator>
					</swiper-item>
					<swiper-item>
						<view class="news-header-item">
							<image mode="aspectFill"></image>
							<view class="tit text-over">支付宝小程序如何在onLaunch中获取外来参数 - 百度知道</view>
						</view>
					</swiper-item>
			</swiper>
		</view>
		<view>
			<sub-tabnav :scrollTop="scrollTop" :tabs="tabs" :selectIndex="selectIndex" @change="changeIndex"></sub-tabnav>
		</view>
		<view class="bg-w pd16_15" style="min-height:800rpx;border-top: 1px solid #E2E2E2;">
			<view>
				<navigator url="/pages/news/detail">
				<view class="flex">
					<view class="news-img">
						<image></image>
					</view>
					<view class="news-content pl15">
						<view class="ft16 cl-price ftw600 text-over">庆祝中国共产党成立100周年文艺演出在京举行</view>
						<view class="mt12 ft14 cl-notice text-over2">
							6月28日晚，庆祝中国共产党成立100周年文艺演出《伟大征程》在国家体育场盛大举行。习近平、李克强、栗战书、汪洋、王沪宁、赵乐际、韩正、王岐山等党和国家领导人，同约2万名观众一起观看演出。新华社记者 鞠鹏 摄
						</view>
						<view class="flex alcenter space mt12">
							<text class="ft12 cl-info">2021-06-29</text>
							<view>
								<text class="ft14 cl-notice iconfont icon-fangwen1"></text>
								<text class=" ft12 cl-info ml5">200</text>
							</view>
						</view>
					</view>
				</view>
				</navigator>
				<view class="bd-line mt16"></view>
			</view>
			<view class="mt16">
				<view class="flex">
					
					<view class="news-content pr15">
						<view class="ft16 cl-main ftw600 text-over">庆祝中国共产党成立100周年文艺演出在京举行</view>
						<view class="mt12 ft14 cl-notice text-over2">
							6月28日晚，庆祝中国共产党成立100周年文艺演出《伟大征程》在国家体育场盛大举行。习近平、李克强、栗战书、汪洋、王沪宁、赵乐际、韩正、王岐山等党和国家领导人，同约2万名观众一起观看演出。新华社记者 鞠鹏 摄
						</view>
						<view class="flex alcenter space mt12">
							<text class="ft12 cl-info">2021-06-29</text>
							<view>
								<text class="ft14 cl-notice iconfont icon-fangwen1"></text>
								<text class=" ft12 cl-info ml5">200</text>
							</view>
						</view>
					</view>
					<view class="news-img">
						<image></image>
					</view>
				</view>
				<view class="bd-line mt16"></view>
			</view>
			
			<view class="mt16">
				<view class="ft16 cl-main ftw600 text-over">庆祝中国共产党成立100周年文艺演出在京举行</view>
				<view class="mt12 ft14 cl-notice text-over2">
					6月28日晚，庆祝中国共产党成立100周年文艺演出《伟大征程》在国家体育场盛大举行。习近平、李克强、栗战书、汪洋、王沪宁、赵乐际、韩正、王岐山等党和国家领导人，同约2万名观众一起观看演出。新华社记者 鞠鹏 摄
				</view>
				<view class="flex alcenter space mt12">
					<text class="ft12 cl-info">2021-06-29</text>
					<view>
						<text class="ft14 cl-notice iconfont icon-fangwen1"></text>
						<text class=" ft12 cl-info ml5">200</text>
					</view>
				</view>
				<view class="bd-line mt16"></view>
			</view>
			<!-- <com-empty title="暂无内容"></com-empty> -->
		</view>
		<com-footer model="news"></com-footer>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				selectIndex:0,
				tabs:['推荐','服装','五金','美妆','招商加盟','行业资讯'],
				scrollTop:0,
			}
		},
		onLoad(){
			
		},
		onPageScroll(e){
			this.scrollTop = e.scrollTop;
		},
		methods:{
			changeIndex(e){
				this.selectIndex = parseInt(e);
			}
		}
	}
</script>

<style>
	.news-img{
		width: 220rpx;
		height: 220rpx;
	}
	.news-img image{
		width: 220rpx;
		height: 220rpx;
		border-radius: 8rpx;
		background: #F2F2F2;
	}
	.news-content{
		width: calc(100% - 220rpx);
	}
	.news-header{
		height: 480rpx;
		width: 100%;
	}
	.news-header-item{
		width: 100%;
		height: 480rpx;
		position: relative;
	}
	.news-header-item image{
		width: 100%;
		height: 480rpx;
		background: #F2F2F2;
	}
	.news-header-item .tit{
		height: 60rpx;
		width: 100%;
		background: rgba(0,0,0,.5);
		color:#FFFFFF;
		position: absolute;
		left: 0;
		bottom: 0;
		line-height: 60rpx;
		padding: 0 20rpx;
		font-size: 28rpx;
	}
</style>