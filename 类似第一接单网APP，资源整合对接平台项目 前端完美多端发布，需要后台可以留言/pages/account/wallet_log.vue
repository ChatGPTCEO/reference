<template>
	<view class="container">

    <view class="log_list luckbox">
    	<view class="items">
    		<view class="item">
    			<view class="info">
    				<view class="txt">支付担保交易</view>
    				<view class="ident">-100.00</view>
    			</view>
    			<view class="date">2022-06-20 15:16</view>
    		</view>
    		<view class="item">
    			<view class="info">
    				<view class="txt">购买金币</view>
    				<view class="ident">-10.00</view>
    			</view>
    			<view class="date">2022-06-16 17:35</view>
    		</view>
    		<view class="item">
    			<view class="info">
    				<view class="txt">充值</view>
    				<view class="ident">+0.50</view>
    			</view>
    			<view class="date">2022-05-15 01:53</view>
    		</view>
    		<view class="item">
    			<view class="info">
    				<view class="txt">充值</view>
    				<view class="ident">+1.00</view>
    			</view>
    			<view class="date">2022-05-15 01:48</view>
    		</view>
    		<view class="item">
    			<view class="info">
    				<view class="txt">充值</view>
    				<view class="ident">+0.50</view>
    			</view>
    			<view class="date">2022-05-15 01:47</view>
    		</view>
    	</view>
    </view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>
.luckbox {
  margin-top: 30rpx;
}
.log_list .items .item {
	border-bottom: 1px solid #f5f5f5;
  padding-bottom: 30rpx;
  margin-bottom: 30rpx;
}
.log_list .items .info {
	overflow: hidden;
}
.log_list .items .info .txt {
	float: left;
}
.log_list .items .info .ident {
	float: right;
	color: #61e7ce;
	font-weight: 600;
}
.log_list .items .item .date {
	font-size: 24rpx;
	color: #999;
	margin-top: 5px;
}
</style>
