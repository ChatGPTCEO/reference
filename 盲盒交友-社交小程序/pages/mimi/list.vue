<template>
	<view class="jianyu">
		<view class="ys" v-for="(item,index) in listData" :key="index">
			<view class="title">
				<image :src="item.logo"></image>
				<text>{{item.name}}</text>
				<text>{{item.ctime}}</text>
				<text class="bo_st del" @click="del(item.id)">删除</text>
			</view>
			<u-line margin="10rpx 0rpx"></u-line>
			<view class="neri">{{item.contents}}</view>
		</view>

		<view class="u-demo-block__content" v-if="show">
			<u-loadmore :line="true" status="loadmore" @loadmore="loadmore"></u-loadmore>
		</view>
		<view v-if="listData.length==0">
			<u-empty mode="history" icon="http://cdn.uviewui.com/uview/empty/history.png">
				<u-button size="small" type="primary" text="去发现解锁吧!" @click="yian">
				</u-button>
			</u-empty>

		</view>

		<view class="tubua" @click="yian" v-if="userInfo && listData.length>0">
			<u-icon name="search" color="#fff" size="30"></u-icon>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				listData: [],
				show: false,
				userInfo: null
			}
		},
		onLoad() {

		},
		onShow() {
			console.log('组件加载')
			this.page = 1;
			this.listData = []
			this.getlist();

			this.userInfo = uni.getStorageSync('userInfo');
		},
		methods: {
			yian() {
				uni.switchTab({
					url: "/pages/garden/index"
				})
				// uni.$u.route({
				// 	url: "/pages/garden/index"
				// })
			},
			getlist() {

				let uid = uni.getStorageSync('userInfo').id;
				uni.$u.http.post('Unlock/userList', {
						uid: uid,
						page: this.page
					})
					.then(res => {
						// console.log(res)
						// this.listData=res.data
						if (res.data.length > 0) {

							var sumData = [];

							sumData = sumData.concat(this.listData).concat(res.data);
							// than.listData.concat(res.data)
							console.log(sumData)
							this.listData = sumData;
							this.page = this.page + 1;
							this.show = true
						} else {
							this.show = false
						}


					})
			},
			loadmore() {
				this.getlist();
				uni.$u.toast('加载更多')
			},
			del(id) {
				uni.$u.http.post('Unlock/del', {
						id: id
					})
					.then(res => {
						uni.$u.toast('删除成功')
						this.page = 1;
						this.getlist();

					})
			}
		},
	}
</script>

<style lang="scss">
	.jianyu {
		margin-top: 10rpx;
		padding: 20rpx;
	}

	.tubua {
		position: fixed;
		right: 30rpx;
		bottom: 15vh;
		border-radius: 50%;
		padding: 10rpx;
		background-color: #007affc7;
		display: block;
	}

	.ys {
		box-sizing: border-box;
		border-radius: 10rpx;
		/*避免在元素内部插入分页符*/
		box-sizing: border-box;
		margin-bottom: 20rpx;
		box-shadow: 0px 0px 28rpx 1rpx rgba(78, 101, 153, 0.14);
		padding: 20rpx;
	}

	.title {
		color: #3e3e3e;
		font-size: 30rpx;
	}

	.neri {
		text-indent: 2em;
		letter-spacing: 2rpx;
		font-size: 28rpx;
		color: #3e3e3e;
	}

	.title image {
		width: 70rpx;
		height: 70rpx;
		border-radius: 50%;
		vertical-align: middle;
	}

	.title text {
		margin-left: 10rpx;
		font-size: 26rpx;
		color: #3e3e3e;
	}

	.bo_st {
		font-size: 22rpx;
		// margin-left: 10rpx;
		border: 2rpx solid #F56c6c;
		padding: 7rpx 10rpx;
		border-radius: 15rpx;
		color: #F56c6c !important;
	}

	.del {
		float: right;
	}
</style>
