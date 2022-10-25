<template>
	<view>
		<!-- <view class="u-p-10 ">
			<u-cell-group>
				<u-cell-item title="消息通知" @click="more"></u-cell-item>
				<u-cell-item title="检查更新" value="v 1.1.0" @click="more"></u-cell-item>
				<u-cell-item title="清除缓存" @click="more"></u-cell-item>
			</u-cell-group>
		</view>
 -->
		<view class="u-p-10 ">
			<u-cell-group>
				<u-cell-item title="关于我们" index="0" @click="more"></u-cell-item>
				<u-cell-item title="帮助中心" index="1" @click="more"></u-cell-item>
				<u-cell-item title="意见反馈" index="2" @click="more"></u-cell-item>
				<u-cell-item title="隐私协议" index="3" @click="more"></u-cell-item>
			</u-cell-group>
		</view>

		<view class="u-p-30 u-m-t-20" v-if="vuex_token">
			<u-button type="error" shape="circle" @click="logout">退出登录</u-button>
		</view>
		<!--#ifdef MP-WEIXIN -->
		<view class="kefu" >
			<button  open-type="contact" style="background: inherit">
				<u-icon name="server-man" size="100" color="#1296DB" label="客服" label-pos="bottom"></u-icon>
			</button>
		</view>
		<!--#endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		
		methods: {
			more(index) {
				uni.navigateTo({
					url: '../other/' + ['about', 'help', 'feedback', 'protocol'][index]
				})
			},
			
			async logout() {
				const res = await this.$u.api.logout()
				if (res.code == 1) {
					this.$u.vuex('vuex_token', null)
					this.$u.vuex('vuex_user', {})
					uni.showToast({
						title: res.msg
					})
					setTimeout(() => {
						uni.reLaunch({
							url: './user'
						})
					}, 1500)
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #ededed;
	}
	button::after{
		border: none;
	}
	.kefu {
		position: fixed;
		bottom: 40rpx;
		right: 40rpx;
		z-index: 1;
	}
</style>
