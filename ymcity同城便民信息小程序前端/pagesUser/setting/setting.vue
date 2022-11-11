<template>
	<view>
		<u-cell-group>
			<u-cell-item title="个人资料" @click="$u.route('/pagesUser/userinfo/userinfo')"></u-cell-item>
			<u-cell-item title="隐私政策" @click="$u.route('/pagesUser/textmain/textmain',{id:2})"></u-cell-item>
			<u-cell-item title="用户协议" @click="$u.route('/pagesUser/textmain/textmain',{id:3})"></u-cell-item>
			<u-cell-item title="关于我们" @click="$u.route('/pagesUser/textmain/textmain',{id:1})"></u-cell-item>
		</u-cell-group>
		<view style="margin: 100rpx 20rpx 0rpx 20rpx;" v-if="isLogin">
			<u-button type="error" @click="toLoginOut">退出登录</u-button>
		</view>
	</view>
</template>

<script>
	import {
		mapActions,
		mapState
	} from 'vuex'
	export default {
		data() {
			return {

			}
		},
		computed: {
			...mapState({
				userInfo: state => state.user.userInfo,
				isLogin: state => state.user.isLogin,
			})
		},
		methods: {
			...mapActions([
				'loginOut',
			]),
			toLoginOut(){
				this.loginOut()
			}
		}
	}
</script>

<style>

</style>
