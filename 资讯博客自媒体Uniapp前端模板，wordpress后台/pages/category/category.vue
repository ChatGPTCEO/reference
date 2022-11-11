<template>
	<view class="contents">
		<view class="topic-container" v-if="!loading">
			<view class="topic" v-for="(data,index) in category" :key="index">
				<view @tap="bindCateByID(data.id)" class="content-box">
					<view class="content">
						<image alt class="_image data-v-00c43818" mode="aspectFill" :src="data.cover"></image>
						<view class="date-cover"
							:style="'border-top:'+'92rpx'+' solid '+bgColour+';'+'border-bottom:'+'20rpx '+' solid '+'transparent'+';'+'border-left:'+'92rpx'+' solid '+bgColour+';'">
							<view class="child-cover" :style="'border-right:'+'60rpx'+' solid '+bgColour+';'">
							</view>
						</view>
						<view class="date">
							<text class="text">{{data.count}}篇</text>
						</view>
						<view class="all-count">{{data.date}}</view>
					
					</view>
					<view class="name">
						{{data.name}}
					</view>
					<view class="desc">
						{{data.description}}
					</view>
				</view>
			</view>

		</view>
		<view class="sk-container" v-if="loading">
		    <view class="contents">
		      <view class="topic-container">
		        <view class="topic">
		          <view class="content-box" data-event-opts="tap,bindCateByID,$0,category,,0,id">
		            <view class="content">
		              <image class="_image data-v-00c43818 sk-image" mode="aspectFill"></image>
		              <view class="date-cover" style="border: none;">
		                <view class="child-cover" style="border: none;"></view>
		              </view>
		              <view class="date">
		                <text class="text sk-transparent sk-text-14-2857-103 sk-text" style="background-position-x: 50%;">11篇</text>
		              </view>
		              <view class="all-count sk-transparent sk-text-0-0000-112 sk-text">2021-08-09 10:09:57</view>
		            </view>
		            <view class="name sk-transparent sk-text-14-2857-817 sk-text">动漫星空</view>
		            <view class="desc sk-transparent sk-text-14-2857-116 sk-text">漫星空是以动漫资讯、动漫壁纸、动漫音乐、动漫周边产品等内容为主打的综合动漫内容</view>
		          </view>
		        </view>
		        <view class="topic">
		          <view class="content-box" data-event-opts="tap,bindCateByID,$0,category,,1,id">
		            <view class="content">
		              <image class="_image data-v-00c43818 sk-image" mode="aspectFill"></image>
		              <view class="date-cover" style="border: none;">
		                <view class="child-cover" style="border: none;"></view>
		              </view>
		              <view class="date">
		                <text class="text sk-transparent sk-text-14-2857-754 sk-text" style="background-position-x: 50%;">1篇</text>
		              </view>
		              <view class="all-count sk-transparent sk-text-0-0000-269 sk-text">2021-07-16 20:35:25</view>
		            </view>
		            <view class="name sk-transparent sk-text-14-2857-732 sk-text">游戏杂谈</view>
		          </view>
		        </view>
		      </view>
		    </view>
		  </view>
	</view>
</template>

<script>
	import API from '@/api/api.js';
	export default {
		data() {
			return {
				bgColour: '#ab0011',
				isBottom: false,
				category: [],
				loading:true,
			}
		},
		onLoad() {
			this.getCategories();
		},
		methods: {
			getCategories: function() {
				API.getCategories().then(res => {
						let args = {}
						if (res.length < 10) {
							this.isLastPage = true;
						}
						if (this.isBottom) {
							uni.showToast({
								title: '加载下一页',
								icon: 'loading',
								duration: 1000
							})
							this.category = this.category.concat(res)
							this.page = this.page + 1
						} else {
							this.category = res
							this.page = this.page + 1
						}
						this.loading=false;
						uni.stopPullDownRefresh()
					})
					.catch(err => {
						console.log(err)
						uni.stopPullDownRefresh()
					})
			},
			bindCateByID: function(id) {
				uni.navigateTo({
					url: '/pages/list/list?id=' + id
				})
			}
		}
	}
</script>

<style>
	
	.content-box {
	    background: #fff;
	    box-shadow: 0 10rpx 30rpx 0 rgba(139, 151, 164, .1);
	    border-radius: 20rpx;
	    margin-top: 32rpx;
	    overflow: hidden
	}
	.content {
		width: 100%;
		height: 384rpx;
		position: relative
	}

	.topic-container {
		padding-left: 28rpx;
		padding-right: 32rpx;
		padding-bottom: 80rpx;
	}

	.topic-container .title {
		height: 108rpx;
		text-align: center;
		line-height: 108rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #242a32;
	}

	.content image {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 1
	}

	.content .date {
		background: none;
		position: absolute;
		top: 0;
		left: 52rpx;
		width: 242rpx;
		height: 92rpx;
		z-index: 2;
		padding-top: 20rpx;
		opacity: 1;
		box-sizing: border-box
	}

	.content .date .text {
		font-size: 32rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 700;
		color: #fff;
		text-align: center
	}

	.content .date-cover {
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: 42rpx;
		opacity: 1;
		z-index: 2
	}

	.content .child-cover {
		width: 0;
		height: 0;
		border-top: 92rpxsolid transparent;
		border-bottom: 4rpxsolid transparent;
		right: 0;
		opacity: .5;
		z-index: 10;
		position: absolute;
		top: -82rpx
	}

	.content .all-count {
		left: 32rpx;
		bottom: 26rpx;
		font-size: 28rpx;
		line-height: 28rpx;
		text-shadow: 0 2rpx4rpxrgba(0, 0, 0, .5);
		opacity: .7
	}

	.content .all-count,
	.content .update-count {
		position: absolute;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #fff;
		z-index: 2;
		letter-spacing: 2rpx
	}

	.content .update-count {
		right: 20rpx;
		bottom: 20rpx;
		width: 128rpx;
		height: 40rpx;
		background: #ed3b2e;
		border-radius: 20rpx;
		font-size: 24rpx;
		line-height: 40rpx;
		text-align: center;
		opacity: .8
	}
	
	.name{
		padding:30rpx 20rpx;
		font-size: 36rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #242a32
	}

	.desc {
		height: 108rpx;
		padding: 0 20rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		color: #6d7279
	}
	
	.sk-transparent {
	    color: transparent !important;
	  }
	.sk-text-14-2857-103 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 42.6563rpx;
	    position: relative !important;
	  }
	.sk-text {
	    background-origin: content-box !important;
	    background-clip: content-box !important;
	    background-color: transparent !important;
	    color: transparent !important;
	    background-repeat: repeat-y !important;
	  }
	.sk-text-0-0000-112 {
	    background-image: linear-gradient(transparent 0.0000%, #EEEEEE 0%, #EEEEEE 100.0000%, transparent 0%) !important;
	    background-size: 100% 25.7813rpx;
	    position: absolute !important;
	  }
	.sk-text-14-2857-817 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 49.2188rpx;
	    position: relative !important;
	  }
	.sk-text-14-2857-116 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 36.0938rpx;
	    position: relative !important;
	  }
	.sk-text-14-2857-754 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 42.6563rpx;
	    position: relative !important;
	  }
	.sk-text-0-0000-269 {
	    background-image: linear-gradient(transparent 0.0000%, #EEEEEE 0%, #EEEEEE 100.0000%, transparent 0%) !important;
	    background-size: 100% 25.7813rpx;
	    position: absolute !important;
	  }
	.sk-text-14-2857-732 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 49.2188rpx;
	    position: relative !important;
	  }
	.sk-image {
	    background: #EFEFEF !important;
	  }
	.sk-container {
	    position: absolute;
	    left: 0;
	    top: 0;
	    width: 100%;
	    height: 100%;
	    overflow: hidden;
	    background-color: transparent;
	  }
</style>
