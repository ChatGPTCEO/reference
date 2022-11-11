<template>
	
	<view class="" style="width: 710rpx;">
		<text class="text-elli-two my-1">{{textElli}}</text>
		<view class="d-flex j-sb a-center">
			<!-- 左侧 -->
			<view class="my-1">
				<view class="border-dark d-flex " style="width: 140rpx;height: 32rpx; ">
					<text class="font-20 font-700 d-flex j-center" style="background: #403835;width: 36rpx;color: #efaa89;">V</text>
					<text class="font-20 text-dark d-flex j-center w-100">会员省2元</text>
				</view>
				<view class="d-flex font-20 mt-1">
					<text class="text-red font-700 font-25 mx-1">￥68.80</text>
					<!-- <text  class="text-red-light ">起</text> -->
					<text class="text-through text-muted mr-1">￥100.80</text>
					<!-- css写左箭头 -->
					<view class="text-red-light" style="
					width: 0;
					height: 0;
					border: 5px solid #fee9eb;
					border-color: transparent  #fee9eb transparent  transparent ;
					z-index: 99;
					"></view>
					<text class="text-red-light px-1" style="background: #fee9eb;">4.0折</text>
	
				</view>
			</view>
			<!-- 右侧 -->
			<view class="text-white bg-red rounded-8 px-2 d-flex a-center j-center" style="height: 60rpx">
				立即购买
			</view>
		</view>
	</view>
	
	
</template>

