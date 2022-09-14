<template>
	<view   class="home-notice-item">
		<view   class="u-flex u-row-between u-col-center u-m-b-10">
			<view  >最新动态</view>
			<view  >
				<text class="u-m-r-4">更多</text>
				<u-icon name="play-right-fill"></u-icon>
			</view>
		</view>
		<view  style="padding: 20rpx 0rpx;" class="u-border-bottom" 
			v-for="(notice,noticeIndex) in noticeList"	:key="noticeIndex">
			<u-row>
				<u-col :span="8">
					<view   style="height: 120rpx;display: flex;flex-direction: column;justify-content: space-between;align-items: flex-start;">
						<view  >{{notice.title}}</view>
						<view   style="color: #909399;">
							<u-icon name="eye"></u-icon>
							<text class="u-m-l-10">{{notice.viewNumber}}</text>
						</view>
					</view>
				</u-col>
				<u-col :span="4">
					<view  >
						<u-image width="200rpx" height="100rpx" :src="notice.image" :border-radius="4"></u-image>
					</view>
				</u-col>
			</u-row>
		</view>
	</view>
</template>

<script>
	export default {
		name:"notice",
		props:{
			noticeList:{
				type:Array,
				default:[]
			}
		},
		data() {
			return {
		
			};
		},
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
.home-notice-item{
	background-color: #FFFFFF;
	padding: 20rpx;
	color: #000000;
	border-radius: 20rpx;
}
</style>
