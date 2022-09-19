<template>
	<view class="wrap">
		<u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
		<view v-if="current==0" class="content" @click="detail(res.tid,res.name)" v-for="(res,index) in mes_list">
			<view class="ava">
				<u-avatar :src="res.uava"></u-avatar>
			</view>
			<view class="name">
				<view style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;width: 550rpx;"><text style="color: #2B85E4;">{{res.name}}</text>回复了你：{{res.content}}!</view>
				<view>{{res.date}}</view>
			</view>

		</view>

		<view v-if="current==1">
			<u-gap height="20" bg-color="#eeeeee"></u-gap>
			<view @click="receive" style="padding: 20rpx;display: flex;align-items: center;justify-content: space-between;">
				<view>收到的约拍请求</view>
				<view>
					<u-icon name="arrow-right" size="40"></u-icon>
				</view>
			</view>
			<u-gap height="20" bg-color="#eeeeee"></u-gap>
			<view @click="send" style="padding: 20rpx;display: flex;align-items: center;justify-content: space-between;">
				<view>发起的约拍请求</view>
				<view>
					<u-icon name="arrow-right" size="40"></u-icon>
				</view>
			</view>
			<u-gap height="20" bg-color="#eeeeee"></u-gap>
		</view>

	</view>
</template>

<script>
	import * as api from '@/api/api.js'
	export default {
		data() {
			return {
				u_id: '',
				mes_list: [],
				y_list: [],
				list: [{
						name: '回复'
					},
					{
						name: '约拍'
					}
				],
				current: 0
			}
		},
		onLoad() {
			this.get();
		},
		onShow() {
			this.get();
		},
		methods: {
			//约拍跳转
			receive() {
				uni.navigateTo({
					url: '../yuepai/receive'
				})
			},
			//我发起的约拍
			send() {
				uni.navigateTo({
					url: '../yuepai/send'
				})
			},
			//跳转到评论详情
			detail(res1, res2) {
				uni.navigateTo({
					url: '../quanzi/comment?id=' + res1 + '&name=' + res2
				})
			},
			//信息初始化
			get() {
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						this.u_id = res.data.userId;
						api.request({
							url: '/mes/findMesById/'+this.u_id,
							method: 'GET',
						/* 	data: {
								openid: this.u_id
							}, */
						}).then(res=>{
							this.mes_list = res.data
						})

					}
				})
			},
			change(index) {
				this.current = index;
				if (this.current == 0) {
					uni.request({
						url: api.baseUrl+'/message',
						method: 'GET',
						data: {
							openid: this.u_id
						},
						success: (res) => {
							
							this.mes_list = res.data
						}
					})
				} else if (this.current == 1) {
					return
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		align-items: center;
		
		padding: 20rpx;
		border-bottom: 0.5px solid #ebeaea;

		.name {
			margin-left: 15rpx;
		}
	}
</style>
