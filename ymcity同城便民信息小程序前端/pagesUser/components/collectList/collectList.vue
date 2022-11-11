<template>
	<view class="content">
		<z-paging ref="paging" @query="queryList" :list.sync="dataList" :mounted-auto-call-reload="false"
			:refresher-angle-enable-change-continued="false" :touchmove-propagation-enabled="true"
			style="height: 100%;">
			<view slot="loading">
				<view class="ymref">
					<view class="">
						<u-loading mode="circle" color="#f44c01" size="80"></u-loading>
					</view>
				</view>
			</view>
			<view>
				<view class="houseList" v-for="(item,index) in dataList" :key="index"
					@click="$u.route('/pagesIndex/farmingmain/farmingmain',{id:item.id})">
					<u-image width="220rpx" height="160rpx" :src="item.image">
					</u-image>
					<view class="cont">
						<view style="display: flex;flex-direction: row;flex: 1;align-items: flex-start;">
							<u-icon v-if="item.is_top=='1'" name="/static/images/top.png" size="40"
								style="margin-right: 10rpx;"></u-icon>
							<text class="title">{{item.title}}</text>
						</view>
						<text class="info">{{item.createtime_text}}</text>
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
				dataList: [],
				firstLoaded: false,
				search: {
					type: '',
					page: '',
				}
			}
		},
		props: {
			tabIndex: {
				type: Number,
				default: function() {
					return 0
				}
			},
			currentIndex: {
				type: Number,
				default: function() {
					return 0
				}
			},
			tabs: {
				type: Array,
				default: function() {
					return [];
				}
			},
		},
		watch: {
			currentIndex: {
				handler(newVal) {
					if (newVal === this.tabIndex) {
						this.search.type = this.tabs[this.tabIndex].type;
						//懒加载，当滑动到当前的item时，才去加载
						if (!this.firstLoaded) {
							// #ifdef MP-TOUTIAO
							setTimeout(() => {
								this.$refs.paging.reload();
							}, 10)
							// #endif
							// #ifndef MP-TOUTIAO
							this.$nextTick(() => {
								this.$refs.paging.reload();
							})
							// #endif
						}
					}
				},
				immediate: true
			},
		},
		methods: {
			queryList(pageNo, pageSize) {
				this.search.page = pageNo;
				this.$u.get('/addons/hicity/user/getCollect', this.search).then(res => {
					this.$refs.paging.complete(res)
					this.firstLoaded = true;
				}).catch(err => {
					this.$refs.paging.complete(false)
					this.firstLoaded = true;
				})
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	/* 注意，1、父节点需要固定高度，z-paging的height:100%才会生效 */
	/* 注意，2、请确保z-paging与同级的其他view的总高度不得超过屏幕宽度，以避免超出屏幕高度时页面的滚动与z-paging内部的滚动冲突 */
	.content {
		height: 100%;
		/* 父节点建议开启flex布局 */
		display: flex;
		flex-direction: column;
	}

	.houseList {
		display: flex;
		flex-direction: row;
		padding: 20rpx;
		background-color: white;
		border-bottom: 1rpx solid #e6e6e6;

		.cont {
			display: flex;
			flex-direction: column;
			flex: 1;
			margin-left: 20rpx;

			.title {
				font-size: 32rpx;
				color: #333333;
				flex: 1;
				font-weight: 600;
				word-break: break-all;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				overflow: hidden;
			}

			.info {
				font-size: 26rpx;
				color: #999999;
				margin-top: 20rpx;
			}
		}
	}

	.ymref {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 10;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: white;
	}
</style>
