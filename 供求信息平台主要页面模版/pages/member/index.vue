<template>
	<view>
		<view class="pd24_15">
			<view v-if="checkLogin" class="member-header">
				<view class="flex alcenter space">
					<view>
						<view class="flex alcenter">
							<image class="member-face" :src="statics.defaultFace"></image>
							<view class="ml10">
								<view class="flex alcenter">
									<view class="ft14 ftw500 cl-main text-over" style="max-width: 140rpx;">小帅</view>
									<text class="ft14 ftw500 cl-main">,{{today.t}}好</text>
								</view>
								<view class="mt12">
									<image class="member-shop-vip-img" :src="statics.vipImg[0]"></image>
								</view>
							</view>
						</view>
						<view class="mt12">
							<text class="iconfont icon-shouji1" :style="{color:tempColor}"></text>
							<text class="ft14 cl-info ml5">150****2345</text>
						</view>
					</view>
					<view class="btn-mini" :style="getBtnStyle">退出</view>
				</view>
			</view>
			<view v-else  @click="toLogin" class="member-header">
				<view class="flex alcenter space">
					<view>
						<view class="flex alcenter">
							<image class="member-face" :src="statics.defaultFace"></image>
							<view class="ml10">
								<view class="flex alcenter">
									<view class="ft14 ftw500 cl-main text-over" style="max-width: 140rpx;">游客</view>
									<text class="ft14 ftw500 cl-main">,{{today.t}}好</text>
								</view>
								<view class="mt12">
									<image class="member-shop-vip-img" :src="statics.vipImg[1]"></image>
								</view>
							</view>
						</view>
					</view>
					<view class="btn-small" :style="getBtnDisStyle">请登录</view>
				</view>
			</view>
			
			<view @click="showVip = true" class="mt16 vip-open-notice" :style="getBtnStyle">
				<view class="flex alcenter space">
					<view class="flex alcenter">
						<image :src="statics.vipImg[2]"></image>
						<text class="ft14 cl-w ml10">开通会员商机先行一步</text>
					</view>
					<text class="iconfont icon-more ft18 cl-w"></text>
				</view>
			</view>
			
			<plugin-vip-dialog v-if="showVip" @closed="showVip = false"></plugin-vip-dialog>
			
			<view class="mt16 flex alcenter space">
				<view class="member-trade-item  flex alcenter center">
					<text class="iconfont icon-gongying2 ft24" style="color: #6092f3;"></text>
					<text class="ft16 ftw500 cl-main ml10">我的供应</text>
				</view>
				<view  class="member-trade-item  flex alcenter center">
					<text class="iconfont icon-qiugou ft24" style="color: #fe544b;"></text>
					<text class="ft16 ftw500 cl-main ml10">我的求购</text>
				</view>
			</view>
			
			<view class="mt16 box noshadow pd16_15">
				<view>
					<view  class="flex alcenter space">
						<view class="flex alcenter">
							<text class="iconfont icon-dianpu ft18" style="color: #ffb02a;"></text>
							<text class="ft14 cl-info ftw500 ml10">免费入驻</text>
						</view>
						<text class="iconfont icon-gengduo ft14 cl-info"></text>
					</view>
			
				</view>
				<view  class="bd-line mt16 mb16"></view>
				<view  class="flex alcenter space">
					<view class="flex alcenter">
						<text class="iconfont icon-xiansuocopy3 ft18" style="color: #fe544b;"></text>
						<text class="ft14 cl-info ftw500 ml10">我的线索</text>
					</view>
					<text class="iconfont icon-gengduo ft14 cl-info"></text>
				</view>
				<view class="bd-line mt16 mb16"></view>
				<view class="flex alcenter space">
					<view class="flex alcenter">
						<text class="iconfont icon-shoucang ft18" style="color: #587ff1;"></text>
						<text class="ft14 cl-info ftw500 ml10">我的收藏</text>
					</view>
					<text class="iconfont icon-gengduo ft14 cl-info"></text>
				</view>
				<view class="bd-line mt16 mb16"></view>
				<view    class="flex alcenter space">
					<view class="flex alcenter">
						<text class="iconfont icon-fangwen ft18" style="color: #587ff1;"></text>
						<text class="ft14 cl-info ftw500 ml10">我的访问</text>
					</view>
					<text class="iconfont icon-gengduo ft14 cl-info"></text>
				</view>
				<view class="bd-line mt16 mb16"></view>
				<view class="flex alcenter space">
					<view class="flex alcenter">
						<text class="iconfont icon-yaoqing_huaban1 ft18" style="color: #fe544b;"></text>
						<text class="ft14 cl-info ftw500 ml10">分享好友</text>
					</view>
					<text class="iconfont icon-gengduo ft14 cl-info"></text>
				</view>
				<view class="bd-line mt16 mb16"></view>
				<view @click="telAct" data-phone="0551-65560407" class="flex alcenter space">
					<view class="flex alcenter">
						<text class="iconfont icon-dianhua1 ft18" style="color: #587ff1;"></text>
						<text class="ft14 cl-info ftw500 ml10">联系客服</text>
					</view>
					<text class="iconfont icon-gengduo ft14 cl-info"></text>
				</view>
			</view>
			
		</view>
		<com-powerby></com-powerby>
		<com-footer model="member"></com-footer>
	</view>
</template>

<script>
	import helper from '../../static/js/helper.js';
	export default{
		data(){
			return {
				showVip:false,
				isLogin:false,
				today:null,
			}
		},
		onLoad(){
			this.today = helper.getTimeArr();
		},
		methods:{
			
		}
	}
</script>

<style>
	.member-header{
		width: 100%;
		border-radius: 32rpx;
	}
	.member-tag-company{
		height: 36rpx;
		border-radius: 16rpx;
		background: rgba(0,0,0,0.4);
		padding: 0 16rpx;
		color:#fff;
		font-size: 24rpx;
		line-height: 36rpx;
	}
	.member-trade-item{
		width: calc(50% - 10rpx);
		height: 100rpx;
		border-radius: 24rpx;
		background: #FFFFFF;
	}
	.member-shop-vip-img{
		width: 120rpx;
		height: 36rpx;
	}
	.vip-open-notice{
		border-radius: 24rpx;
		padding: 20rpx 30rpx;
	}
	.vip-open-notice image{
		width: 40rpx;
		height:40rpx;
	}
</style>