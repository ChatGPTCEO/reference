<template>
	<view class="pageCont">
		<z-paging ref="paging" @query="queryList" :list.sync="storeList" style="height: 100%;width: 100%;">
			<view slot="loading">
				<view class="ymref">
					<view class="">
						<u-loading mode="circle" color="#f44c01" size="80"></u-loading>
					</view>
				</view>
			</view>
			<view class="list">
				<view class="list-item" v-for="(item,index) in storeList" :key="index"
					@click="$u.route('/pagesFind/storemain/storemain',{id:item.id})">
					<view class="">
						<u-image width="185rpx" height="185rpx" :src="item.cover_image"></u-image>
					</view>
					<view class="list-item-left">
						<view class="list-item-title">
							<text>{{item.name}}</text>
						</view>
						<view class="list-item-bio">
							<view class="bio">
								<text>{{item.childcategory.name}}</text>
							</view>
							<view class="juli" v-if="item.distance">
								<text>{{item.distance}}km</text>
							</view>
						</view>
						<view class="list-item-site">
							<text>地址：{{item.address}}</text>
						</view>
					</view>
				</view>
			</view>
		</z-paging>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				storeList: [],
				search: {
					page: 1,
					lat: '',
					lng: '',
					category_id: '',
				}
			};
		},
		onLoad(e) {
			if (e.id) {
				this.search.category_id = e.id;
			}
			var that = this;
			//#ifdef MP
			uni.authorize({
				scope: 'scope.userLocation',
				success() {
					uni.getLocation({
						type: 'wgs84',
						success: function(res) {
							that.search.lat = res.latitude;
							that.search.lng = res.longitude;
							that.$refs.paging.reload();
						}
					});
				},
				fail() {
					uni.showModal({
						title: '提示',
						content: '您没有开启定位权限,请前往开启！',
						success: function(res) {
							if (res.confirm) {
								uni.openSetting({
									success(res) {
										console.log(res.authSetting)
									}
								});
							}
						}
					});
				}
			})
			//#endif
			//#ifdef H5
			uni.getLocation({
				type: 'wgs84',
				success: function(res) {
					that.search.lat = res.latitude;
					that.search.lng = res.longitude;
					that.$refs.paging.reload();
				}
			});
			//#endif
		},
		methods: {
			queryList(pageNo, pageSize) {
				//这里的pageNo和pageSize会自动计算好，直接传给服务器即可
				//通过this.$refs.paging.complete(请求回来的数组);将请求结果传给z-paging
				this.search.page = pageNo;
				this.$u.get('/addons/hicity/store/list', this.search).then(res => {
					this.$refs.paging.complete(res)
				}).catch(err => {
					this.$refs.paging.complete(false)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pageCont {
		height: 100%;
		width: 100%;
		/* 父节点建议开启flex布局 */
		display: flex;
		flex-direction: column;
		overflow: hidden;
		background-color: #F8F8F8;
	}

	.list {
		background-color: white;
		margin: 20rpx;
		border-radius: 20rpx;

		.list-item {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: 20rpx;
			border-bottom: 1rpx solid #e6e6e6;

			.list-item-left {
				display: flex;
				flex-direction: column;
				min-height: 185rpx;
				margin-left: 20rpx;
				justify-content: space-between;
				flex: 1;

				.list-item-title {
					font-size: 32rpx;
					color: #333333;
				}

				.list-item-bio {
					font-size: 25rpx;
					color: red;
					margin-top: 18rpx;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-between;

					.bio {
						background-color: #FBF4E5;
						padding: 2rpx 10rpx;
					}

					.juli {
						color: #999999;
					}
				}

				.list-item-site {
					word-break: break-all;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					overflow: hidden;
					margin-top: 18rpx;
					color: #666666;
					font-size: 28rpx;
				}
			}
		}
	}
</style>
