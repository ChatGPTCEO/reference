<!--
 * @name: 设置
 * @version: 1.1.1
 * @Author: 刘大可
 * @Date: 2022-03-28 18:56:18
 * @LastEditors: 刘大可
 * @LastEditTime: 2022-03-28 19:12:54
-->
<template>
	<view>
		<cu-custom bgColor="bgmain" :isBack="true">
			<view slot="content">设置管理</view>
		</cu-custom>
		<view class="" v-if="1==1">
			<view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg radius">
				<!-- <view class="cu-item arrow">
                                <navigator class="content" url="/gc_school/pages/address/index" hover-class="none">
                                    <image src="/images/order.png"></image>
                                    <text class="text-black">我的订单</text>
                                </navigator>
                            </view> -->
				<!-- <ad unit-id="adunit-496cd379bf264f59"></ad>
                    <ad unit-id="adunit-d1416c5143299de9" ad-type="video" ad-theme="white"></ad>
                <video unit-id="adunit-a1a4176a42453e4f"></video> -->
				<!-- <view class="cu-item arrow" bindtap="msg">
                                <navigator class="content" url="" hover-class="none">
                                    <image src="/images/phone.png"></image>
                                    <text class="text-black">获取手机号</text>
                                </navigator>
                            </view> -->
				<!-- v-if="userInfo.has_store == 1" -->
				<!-- <view class="cu-item arrow"  @tap="dian" :data-url="'/gc_school/pages/shop/my?id=' + userInfo.store_id">
                        <navigator class="content" hover-class="none">
                            <image src="/static/images/dianpu.png"></image>
                            <text class="text-black">我的小店</text>
                        </navigator>
                    </view> -->
				<!-- v-if="userInfo.run_status == '2'" -->


				<!-- v-if="sysparment.user_vip_switch == 1" -->
				<!-- <view class="cu-item arrow">
                        <navigator class="content" url="/gc_school/pages/vip/index" hover-class="none">
                            <image src="/static/images/vips.png"></image>
                            <text class="cuIcon-writefill text-main"></text>
                            <text class="text-black">VIP会员</text>
                        </navigator>
                    </view> -->

				<!-- <view class="cu-item arrow" @tap="msg">
                        <navigator class="content" url="" hover-class="none">
                            <image src="/static/images/msg1.png"></image>
                            <text class="text-black">订阅消息</text>
                        </navigator>
                    </view> -->
				<!-- <view class="cu-item arrow">
                        <navigator class="content" url="/gc_school/pages/address/index" hover-class="none">
                            <image src="/static/images/address.png"></image>
                            <text class="cuIcon-formfill text-main"></text>
                            <text class="text-black">我的地址</text>
                        </navigator>
                    </view> -->

				<view class="cu-item arrow">
					<navigator class="content" url="/gc_school/pages/replaylist/index" hover-class="none">
						<image src="/static/images/cashout.png"></image>
						<!-- <text class="cuIcon-formfill text-main"></text> -->
						<text class="text-black">我的提现</text>
					</navigator>
				</view>
				<view class="cu-item arrow">
					<navigator class="content" url="/gc_school/pages/webview/indexs" hover-class="none">
						<!-- <text class="cuIcon-formfill text-main"></text> -->
						<image src="/static/images/auth1.png"></image>
						<text class="text-black">公众号授权</text>
					</navigator>
				</view>
				<view class="cu-item arrow">
					<navigator class="content" url="/gc_school/pages/help/index" hover-class="none">
						<image src="/static/images/help.png"></image>
						<text class="text-black">帮助中心</text>
					</navigator>
				</view>
				<!-- <view class="cu-item arrow">
                        <button class="cu-btn content" open-type="contact">
                            <image src="/static/images/contact.png"></image>
                            <text class="cuIcon-writefill text-main"></text>
                            <text class="text-black">在线客服</text>
                        </button>
                    </view>
                    -->

				<!-- <view class="cu-item arrow" v-if="userInfo.run_status == '2'">
                        <navigator class="content" url="/gc_school/pages/grab/index" hover-class="none">
                           <text class="cuIcon-formfill text-main"></text> 
                            <image src="/static/images/order.png"></image>
                            <text class="text-black">抢单中心</text>
                        </navigator>
                    </view>  -->
				<!-- <view class="cu-item arrow" v-if="userInfo.run_status == '2'">
                        <navigator class="content" url="/gc_school/pages/mygrab/index" hover-class="none">
                            <image src="/static/images/order.png"></image>
                            <text class="text-black">我的抢单</text>
                        </navigator>
                    </view> -->

				<!-- <view class="cu-item arrow" bindtap='link' data-url='/gc_school/pages/register/index' wx:if="{{islogin  && userInfo.run_status=='0'}}">
              <view class="content">
                    <text class="cuIcon-formfill text-main"></text>
                    <text class="text-black">认证跑腿</text>
              </view>
            </view> -->
				<image src="https://13477601127a.limeixinjy.com/images/1004/2021/03/AYP8ySYpeCPOcOD0Fe863DGP8B260E.png">
				</image>
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
	}
</script>

<style>
	page {
		background: white;
	}

	.UCenter-bg {
		background: white;
		/* background-image: url("http://gc-paotui.mync.xyz/web/resource/images/index.jpg"); */
		background-size: cover;
		/* height: 550rpx; */
		display: flex;
		/* justify-content: center; */
		padding-top: 40rpx;
		overflow: hidden;
		position: relative;
		flex-direction: row;
		align-items: center;
		color: black;
		font-weight: 300;
		/* text-shadow: 0 0 3px rgba(0, 0, 0, 0.3); */
		/* line-height: 550rpx; */
		padding: 50rpx 60rpx;
		border-top: 1px solid #f5f5f5;
		border-bottom: 1px solid #f5f5f5;
	}

	.contents {
		padding: 70rpx 0 30rpx 0;
		color: white;
		font-size: 30rpx;
		text-align: center;
		background: #ff6444;
		/* background-image: linear-gradient(to right, #0396FF, #23AFE4, #ABDCFF) !important; */
	}

	.two_flex image {
		width: 2em !important;
		height: 2em !important;
		margin-right: 20rpx !important;
	}

	.flex-direction {
		text-align: left;
	}

	.middle {
		padding-left: 60rpx;
	}

	.isrun {
		padding: 0 20rpx;
	}

	.content image {
		width: 1.3em !important;
		height: 1.3em !important;
		margin-right: 20rpx !important;
	}

	.UCenter-bg text {
		opacity: 0.8;
	}

	.UCenter-bg image {
		width: 140rpx;
		height: 140rpx;
		margin-right: 30rpx;
		/* margin: 135rpx 30rpx 0 50rpx; */
		flex-shrink: 0;
	}

	.UCenter-bg .gif-wave {
		position: absolute;
		width: 100%;
		bottom: 0;
		left: 0;
		z-index: 99;
		mix-blend-mode: screen;
		height: 100rpx;
	}

	map,
	.mapBox {
		left: 0;
		z-index: 99;
		mix-blend-mode: screen;
		height: 100rpx;
	}

	map,
	.mapBox {
		width: 750rpx;
		height: 300rpx;
	}

	#cuIcon-homefills {
		width: 48rpx !important;
		position: relative !important;
		display: block !important;
		height: 48rpx !important;
		margin: 0 auto 10rpx !important;
		text-align: center !important;
		font-size: 40rpx !important;
	}

	#cuIcon-homefillt {
		width: 72rpx !important;
		position: absolute !important;
		display: block !important;
		height: 72rpx !important;
		margin: 0 auto 10rpx !important;
		text-align: center !important;
		font-size: 40rpx !important;
		top: 0;
		left: 0;
	}

	.indedx {
		color: #010101;
		font-size: 22rpx;
		padding: 10rpx 0 10rpx 0;
	}

	.indedxs {
		color: #010101;
		font-size: 22rpx;
		margin-top: 10rpx;
		padding: 10rpx 0 10rpx 0;
		/* padding: -1rpx 0 10rpx 0; */
		box-sizing: border-box;
	}

	.indedxt {
		color: #ff6444;
		font-size: 22rpx;
		padding: 10rpx 0 10rpx 0;
	}

	.bgmains {
		background-color: #fff !important;
	}

	.menu {
		margin: 0 !important;
	}
</style>
