<template>
	<view class="pd16_15">
		<view class="search-box flex alcenter">
			<text class="iconfont icon-search_gray cl-info"></text>
			<input class="search-input ft14 cl-main" v-model="keyword" type="text" confirm-type="search" @confirm="searchAct" :maxlength="32" placeholder-class="cl-info"  placeholder="请输入关键字搜索产品或商家" />
		</view>
		<view class="ft16 ftw500 cl-main mt16">共为您找到<text class="ft16 ftw500  ml5 mr5" :style="{color:tempColor}">100</text>条记录</view>
		
		<view class="box noshadow mt16">
			<view class="pd16_15 flex">
				<view class="search-list-l">
					<image></image>
				</view>
				<view class="search-list-r pl10">
					<view class="ft14 cl-main ftw500 text-over">
						<rich-text :nodes="title"></rich-text>
					</view>
					<view class="mt10 ft14 cl-info text-over2">
						<rich-text :nodes="contents"></rich-text>
					</view>
					<view class="mt10 ft12 cl-notice text-over">pages/normal/index?id=20191210A0C29X11</view>
				</view>
			</view>
			
		</view>
		
		
		<view class="box noshadow mt16">
			<view class="pd16_15">
				<view class="ft14 cl-main ftw500 text-over">
					<rich-text :nodes="title"></rich-text>
				</view>
				<view class="mt10 ft14 cl-info text-over2">
					<rich-text :nodes="contents"></rich-text>
				</view>
				<view class="mt10 ft12 cl-notice text-over">pages/normal/index?id=20191210A0C29X11</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				keyword:'',
				title:'<em class="highlight">微信</em>版本更新！',
				contents:'...今日，<em class="highlight">微信</em>官方发布<em class="highlight">微信</em>X.Y.Z版本...',
			}
		},
		onLoad(e){
			if(!e.keyword){
				uni.showToast({
					icon:'none',
					title:'关键字不能为空'
				});
				uni.navigateBack({
					delta:1,
				});
			}else{
				this.keyword = decodeURI(e.keyword);
			}
		},
		methods:{
			searchAct(){
				
			},
		}
	}
</script>

<style>
	.search-list-l{
		width: 190rpx;
	}
	.search-list-l image{
		width: 190rpx;
		height: 190rpx;
		background: #F2F2F2;
	}
	.search-list-r{
		width: calc(100% - 190rpx);
	}
	
	.search-box{
		width: 100%;
		height: 80rpx;
		border-radius: 40rpx;
		background: #FFFFFF;
		padding: 0 30rpx;
	}
	.search-input{
		width: calc(100% - 40rpx);
		padding-left: 20rpx;
	}
	.highlight{
		color: #FF0000;
		font-weight: 500;
	}
</style>