<template>
	<view class="wrap">
		<u-toast ref="uToast" />
		<u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
		<view v-if="current == 0" class="content" v-for="(res,index) in fans" @click="userinfo(res.fid)">
			<view class="left">
				<u-avatar :src="res.fava"></u-avatar>
			</view>
			<view class="right">
				<view class="name">{{res.fname}}
					<u-icon v-if="res.gender == '女'" size="30" name="../../../static/girl.png"></u-icon>
					<u-icon v-if="res.gender == '男'" size="30" name="../../../static/boy.png"></u-icon>
				</view>
			</view>
		</view>

		<view v-if="current == 1" class="content" v-for="(res,index) in follow" @click="userinfo(res.fid)">
			<view class="left">
				<u-avatar :src="res.fava"></u-avatar>
			</view>
			<view class="right">
				<view class="name">{{res.fname}}
					<u-icon v-if="res.gender == '女'" size="30" name="../../../static/girl.png"></u-icon>
					<u-icon v-if="res.gender == '男'" size="30" name="../../../static/boy.png"></u-icon>
				</view>
				<view class="btn">
					<u-button type="warning" size="mini" shape="circle" @click="ufocus(res.fid)">取消关注</u-button>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import * as api from '@/api/api.js'
	export default {
		data() {
			return {
				openid: '',
				f_id: '',
				fans: [

				],
				follow: [

				],
				//src: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
				list: [{
					name: '我的粉丝'
				}, {
					name: '我的关注'
				}],
				current: 0
			}
		},
		onLoad(res) {
			this.current = res.current
		},
		onShow() {
			this.init();
		},
		methods: {
			//个人中心
			userinfo(res) {
				uni.navigateTo({
					url: './userinfo/userinfo?uid=' + res
				})
			},
			//取消关注
			ufocus(res) {
				this.f_id = res
				api.request({
					url: '/follow/cancelFollowYuePaiById',
					method: 'GET',
					data: {
						fid: this.f_id,
						uid: this.openid
					}

				})
				this.$refs.uToast.show({
					title: '您已取消关注',
					type: 'warning'
				})
				this.init();
			},
			//列表切换
			change(index) {
				this.current = index;
				//console.log(this.current)
			},
			//信息初始化
			init() {
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						this.openid = res.data.userId;
						api.request({
							url: '/follow/findFollowByid',
							method: 'GET',
							data: {
								userId: this.openid
							},
						}).then(res=>{
							this.follow = res.data
						})
						api.request({
							url: '/follow/findFansByid',
							method: 'GET',
							data: {
								userId: this.openid
							},
						}).then(res=>{
							this.fans = res.data
						})
					},
					fail: (res) => {
						uni.showLoading({
							title: '获取数据失败'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 25rpx;
		display: flex;

		.right {
			width: 100%;
			position: relative;

			.name {
				position: absolute;
				top: 20rpx;
				left: 20rpx;
				font-size: 35rpx;
			}

			.btn {
				position: absolute;
				right: 0;
				top: 20rpx;
			}
		}
	}
</style>
