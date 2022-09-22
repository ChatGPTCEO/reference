<template>
	<view class="pageCont">
		<z-paging ref="paging" @query="queryList" :list.sync="JobData" :style="{height: scrollHeight+'px'}">
			<view slot="top">
				<u-dropdown style="background-color: white;" ref="uDropdown" active-color="#f44c01">
					<u-dropdown-item title="职位">
						<view class="slot-content">
							<view class="u-menu-wrap">
								<scroll-view scroll-y class="u-tab-view">
									<view v-for="(item,index) in list" :key="index" class="u-tab-item"
										:class="[job_current==index ? 'u-tab-item-active' : '']"
										:data-job_current="index" @tap.stop="swichMenu(index)">
										<text class="u-line-2">{{item.name}}</text>
									</view>
								</scroll-view>
								<block v-for="(item,index) in list" :key="index">
									<scroll-view scroll-y class="right-box" v-if="job_current==index">
										<view class="page-view">
											<view class="class-item">
												<view class="item-container">
													<view class="thumb-box" v-for="(item1, index1) in item.children"
														:key="index1" @click="selval(item1)">
														<view
															:class="[search.job_category_code==item1.code ? 'item-active' : '']">
															<text>{{item1.name}}</text>
														</view>
														<u-icon v-if="search.job_category_code==item1.code"
															name="checkbox-mark" :color="iconColor" size="28">
														</u-icon>
													</view>
												</view>
											</view>
										</view>
									</scroll-view>
								</block>
							</view>
						</view>
					</u-dropdown-item>
					<u-dropdown-item v-model="search.salary" title="薪资" :options="options2" @change="refload">
					</u-dropdown-item>
					<u-dropdown-item title="更多">
						<view class="slot-content">
							<view class="slot-cell">
								<text>福利待遇</text>
								<view class="gird">
									<view class="gitem" v-for="(item,index) in labelTag" :key="index"
										@click="seltag('label',item)"
										:class="{active:search.label_ids==item.value?true:false}">
										<text>{{item.label}}</text>
									</view>
								</view>
							</view>
							<view class="cellbtn">
								<view class="btn" @click="resSearch">
									<text>重置</text>
								</view>
								<view class="btn1" @click="subSearch">
									<text>查询</text>
								</view>
							</view>
						</view>
					</u-dropdown-item>
				</u-dropdown>
			</view>
			<view slot="loading">
				<view class="ymref">
					<view class="">
						<u-loading mode="circle" color="#f44c01" size="80"></u-loading>
					</view>
				</view>
			</view>
			<view>
				<JobList :JobData="JobData"></JobList>
			</view>
		</z-paging>
	</view>
</template>

<script>
	import JobList from '@/components/JobList/JobList.vue'
	export default {
		components: {
			JobList
		},
		data() {
			return {
				search: {
					salary: 'all',
					job_category_code: 'all',
					label_ids: 'all',
					page: 1,
				},
				options2: [{
					label: '不限',
					value: 'all',
				}, {
					label: '3000元以下',
					value: '0-3000',
				}, {
					label: '3000-5000元',
					value: '3000-5000',
				}, {
					label: '5000-8000元',
					value: '5000-8000',
				}, {
					label: '8000-12000元',
					value: '8000-12000',
				}, {
					label: '12000-20000元',
					value: '12000-20000',
				}, {
					label: '20000-25000元',
					value: '20000-25000',
				}, {
					label: '25000元以上',
					value: '25000-all',
				}],
				list: [{
					"code": 'all',
					"name": "不限",
					"children": [{
						"code": 'all',
						"name": "不限",
					}]
				}],
				job_current: '',
				iconColor: 'primary',
				labelTag: [{
					label: '五险一金',
					value: '1',
				}, {
					label: '包吃',
					value: '2',
				}, {
					label: '包住',
					value: '3',
				}],
				scrollHeight: 500,
				triggered: false, //下拉刷新
				_freshing: false, //下拉刷新状态
				JobData: []
			}
		},
		onLoad() {
			var that = this;
			uni.getSystemInfo({
				success: function(res) {
					let windowHeight = res.windowHeight;
					let windowWidth = res.windowWidth;
					let headHeight = 80 / 750 * windowWidth;
					let scrollHeight = (windowHeight - headHeight);
					that.scrollHeight = scrollHeight;
				}
			});
			this.getJobCategory()
		},
		methods: {
			getJobCategory() {
				this.$u.get('/addons/hicity/job/getJobCategory', {

				}).then(res => {
					this.list = this.list.concat(res);
				})
			},
			// 点击左边的栏目切换
			swichMenu(index) {
				if (index == this.job_current) return;
				this.job_current = index;
			},
			selval(item) {
				this.search.job_category_code = item.code;
				this.$refs.uDropdown.close();
				this.$refs.paging.reload();
			},
			seltag(type, item) {
				if (type === 'label') {
					this.search.label_ids = item.value;
				}
			},
			resSearch() {
				this.search.label_ids = 'all';
			},
			subSearch() {
				this.$refs.uDropdown.close();
				this.$refs.paging.reload();
			},
			refload(e) {
				this.$refs.paging.reload();
			},
			queryList(pageNo, pageSize) {
				//这里的pageNo和pageSize会自动计算好，直接传给服务器即可
				//通过this.$refs.paging.complete(请求回来的数组);将请求结果传给z-paging
				this.search.page = pageNo;
				this.$u.get('/addons/hicity/job/list', this.search).then(res => {
					this.$refs.paging.complete(res)
				}).catch(err => {
					this.$refs.paging.complete(false)
				})
			},
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

	.u-menu-wrap {
		flex: 1;
		display: flex;
		overflow: hidden;
		background-color: #F8F8F8;
		max-height: 600rpx;
	}

	.u-tab-view {
		width: 300rpx;
	}

	.u-tab-item {
		height: 100rpx;
		background: #f6f6f6;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		font-size: 26rpx;
		padding: 0 20rpx;
		color: #444;
		font-weight: 400;
	}

	.u-tab-item-active {
		position: relative;
		color: #333333;
		font-size: 28rpx;
		font-weight: 600;
		background: #fff;
	}

	.u-tab-item-active::before {
		content: "";
		position: absolute;
		border-left: 4px solid $u-type-primary;
		height: 32rpx;
		left: 0;
		top: 39rpx;
	}

	.right-box {
		background-color: white;
	}

	.page-view {
		background-color: white;
	}

	.class-item {
		background-color: #fff;
		border-radius: 8rpx;
	}

	.item-menu-name {
		font-weight: normal;
		font-size: 24rpx;
		color: $u-main-color;
	}

	.item-container {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.item-active {
		color: $u-type-primary;
	}

	.thumb-box {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		height: 100rpx;
		width: 100%;
		padding: 0 20rpx;
		align-items: center;
		font-size: 32rpx;
	}

	.slot-content {
		background-color: white;

		.slot-cell {
			display: flex;
			flex-direction: column;
			padding: 20rpx;

			.gird {
				display: flex;
				flex-direction: row;
				align-items: center;
				flex-wrap: wrap;
				margin-top: 20rpx;

				.gitem {
					width: 226.6rpx;
					height: 80rpx;
					background-color: #e1e1e1;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: center;
					margin: 5rpx;
					border-radius: 10rpx;
					font-size: 30rpx;
				}

				.active {
					background-color: #F44C01;
					color: white;
				}
			}
		}

		.cellbtn {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-around;
			padding: 20rpx;

			.btn {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				width: 260rpx;
				height: 90rpx;
				border-radius: 50rpx;
				border: 1rpx solid #e6e6e6;
				font-size: 32rpx;
			}

			.btn1 {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				width: 260rpx;
				height: 90rpx;
				border-radius: 50rpx;
				background-color: #F44C01;
				color: white;
				font-size: 32rpx;
			}
		}
	}
</style>
