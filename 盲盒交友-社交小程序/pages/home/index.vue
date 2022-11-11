<template>
	<view>
		<view>
			<image src="https://shopimges.oss-cn-hangzhou.aliyuncs.com/mimi/ben1.jpg" mode="aspectFill" class="image">
			</image>
		</view>
		<view class="bojing">
			<view>
				<u-grid :border="false" col="4">
					<u-grid-item v-for="(listItem,listIndex) in lists" :key="listIndex" @click="jon(listItem.path)">
						<u-icon :customStyle="{paddingTop:20+'rpx'}" :name="listItem.name" :size="30"></u-icon>
						<text class="grid-text">{{listItem.title}}</text>
					</u-grid-item>
				</u-grid>
			</view>
			<view class="huodong">
				<u-swiper :list="list3"></u-swiper>
			</view>

			<view class="feng_flow">
				<view class="flow_block">
					<view class="flow_item" v-for="(item, i1) in lists1" :key="i1"
						@click="jon('/pages/user/userData?id='+item.uid)">
						<image :src="item.aname" mode="widthFix" style="width: 100%;"></image>
						<view class="flow_item_con">
							<!-- <view class="flow_item_des">{{item.half}}</view> -->
							<view class="flow_item_des">
								<u-icon :label="item.name" size="20" labelSize="10" :name="item.logo"></u-icon>
							</view>
						</view>
					</view>
				</view>
				<view class="flow_block">
					<view class="flow_item" v-for="(item2, i2) in lists2" :key="i2"
						@click="jon('/pages/user/userData?id='+item2.uid)">
						<image :src="item2.aname" mode="widthFix" style="width: 100%;"></image>
						<view class="flow_item_con">
							<!-- <view class="flow_item_des">{{item2.half}}</view> -->
							<view class="flow_item_des">
								<u-icon :label="item2.name" size="20" labelSize="10" :name="item2.logo"></u-icon>
							</view>
						</view>

					</view>
				</view>
			</view>

		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					imgUrl: 'https://shopimges.oss-cn-hangzhou.aliyuncs.com/mimi/bejing.jpg'
				}],
				list3: [
					'https://shopimges.oss-cn-hangzhou.aliyuncs.com/mimi/bendon.jpg',
					'https://shopimges.oss-cn-hangzhou.aliyuncs.com/mimi/bendon1.jpg'
				],
				listData: [],
				userInfo: null,
				lists: [{
						name: 'https://shopimges.oss-cn-hangzhou.aliyuncs.com/mimi/hua.png',
						title: '兴趣圈',
						path: "/pages/garden/huatilist",
						lx: 0
					},
					{
						name: 'https://shopimges.oss-cn-hangzhou.aliyuncs.com/mimi/faxian.png',
						title: '我的发现',
						path: "/pages/mimi/list",
						lx: 0
					},
					{
						name: 'https://shopimges.oss-cn-hangzhou.aliyuncs.com/mimi/xiehou.png',
						title: '邂逅',
						path: "/pages/mimi/xiehou",
						lx: 0
					},
					{
						name: 'https://shopimges.oss-cn-hangzhou.aliyuncs.com/mimi/renzheng.png',
						title: '认证',
						path: "/pages/user/user",
						lx: 0
					},
					{
						name: 'https://shopimges.oss-cn-hangzhou.aliyuncs.com/mimi/xiaocao.png',
						title: '校草',
						path: "/pages/garden/xiaolist?lx=0",
						lx: 0
					},
					{
						name: 'https://shopimges.oss-cn-hangzhou.aliyuncs.com/mimi/xiaohua.png',
						title: '校花',
						path: "/pages/garden/xiaolist?lx=1",
						lx: 0
					},
					{
						name: 'https://shopimges.oss-cn-hangzhou.aliyuncs.com/mimi/lianai.png',
						title: '恋爱',
						path: "/pages/garden/data?id=1",
						lx: 0
					},
					{
						name: 'https://shopimges.oss-cn-hangzhou.aliyuncs.com/mimi/mimi.png',
						title: '认证信息',
						path: "/pages/user/userData",
						lx: 0
					}
				],
				lists1: [],
				lists2: [],
				list1Height: 0,
				list2Height: 0,
			}
		},
		onLoad() {
			this.getlist();
		},
		onShow() {
			this.userInfo = uni.getStorageSync('userInfo');
		},
		methods: {
			getlist() {
				const that = this
				uni.$u.http.post('Encounter/homelist', {})
					.then(res => {
						let listdata = res.data
						listdata.map((da, di) => {
							// console.log(da, di)
							if (that.list1Height > that.list2Height) {
								that.list2Height += 1
								that.lists2.push(da)
							} else {
								that.list1Height += 1
								that.lists1.push(da)
							}

						})

					})
			},
			jon(e) {
				if (e) {
					const userInfo = uni.getStorageSync('userInfo');
					if (userInfo) {
						uni.$u.route({
							url: e
						})

					} else {
						uni.$u.toast('未登录')
					}

				} else {
					uni.$u.toast('正在建设中')
				}



			},
			yian(itme) {
				const userInfo = uni.getStorageSync('userInfo');
				if (userInfo) {
					uni.$u.route({
						url: "/pages/garden/data?id=" + itme.item.id
					})

				} else {
					uni.$u.toast('未登录')
				}


			},
			onadload(e) {
				console.log('广告数据加载成功');
			},
			onadclose(e) {
				console.log("onadclose", e);
			},
			onaderror(e) {
				// 广告加载失败
				console.log("onaderror: ", e.detail);
			}


		}
	}
</script>

<style>
	.image {
		width: 100%;
		height: 55vh;
	}

	.bojing {
		background-color: #fff;
		padding: 20rpx;
		border-top-left-radius: 40rpx;
		border-top-right-radius: 40rpx;
		margin-top: -200rpx;
		position: relative;
		width: 94.8vw;
	}

	.grid-text {
		font-size: 24rpx;
		color: #545252;
	}

	.bode_y {
		padding: 10rpx 20rpx;
	}

	.huodong {
		margin-top: 30rpx;
		width: 100%;
		border-radius: 15rpx;
		box-shadow: 10rpx 10rpx 20rpx #bababa;
	}

	.feng_flow {
		display: flex;
		/* padding:15upx; */
		margin-top: 20rpx;
	}

	.flow_block {
		display: flex;
		flex: 1;
		flex-direction: column;
	}

	.flow_item {
		margin: 15upx;
		border-radius: 20upx;
		background: #f4f4f4;
		overflow: hidden;
	}

	.flow_item_con {
		padding: 10upx 20upx 20upx;
	}

	.flow_item_title {
		position: relative;
		font-size: 32upx;
		font-weight: 700;
		margin-bottom: 5upx;
	}

	.flow_item_des {
		font-size: 24upx;
	}
</style>
