<template>
	<view>
		<u-navbar title="果糖同城" :is-back="false" :background="background" title-color="#222222" :border-bottom="false">
			<view class="slot-wrap">
				<view class="slot-left">
					<text class="slot-left-text" v-if="initData">{{initData.app_name}}</text>
					<text class="slot-left-text" v-else>{{appName}}</text>
				</view>
			</view>
		</u-navbar>
		<view class="ym-search">
			<u-search placeholder="搜索一下" @click="$u.route('/pages/search/search')" disabled v-model="keyword"
				:show-action="false" shape="square"></u-search>
		</view>
		<view style="height: 100rpx;"></view>
		<view class="banner" v-if="initData">
			<u-swiper :list="initData.home_banner" height="260"></u-swiper>
		</view>

		<view class="gird" v-if="initData">
			<u-grid :col="5" :border="false">
				<u-grid-item style="background: rgba(0,0,0,0);" @click="$u.route(item.path)"
					v-for="(item,index) in initData.home_menu" :key="index">
					<u-image width="80rpx" height="80rpx" :src="item.image"></u-image>
					<view class="grid-text">{{item.name}}</view>
				</u-grid-item>
			</u-grid>
		</view>


		<view class="ad u-m-t-30 u-m-b-30" v-if="initData">
			<u-image :border-radius="10" width="100%" height="200rpx" :src="initData.home_ad.image" :lazy-load="true">
			</u-image>
		</view>

		
		<view class="tabs">
			<u-tabs :list="list" @change="changeTag" :current="current" active-color="#ff5d37" bg-color="#f3f4f6" ></u-tabs>
		</view>


		<!--信息-->

		<block v-if="opentop">
			<view class="home-list">
				<block v-if="current == 0">
					<view class="info-margin">
						<!-- 房源信息列表 -->
						<HouseList :houseData="houseRentData"></HouseList>
						<view style="background-color: #F3F4F6;" v-if="houseRentData.length==0">
							<u-empty text="暂无数据" mode="list"></u-empty>
						</view>
					</view>
				</block>
				<block v-if="current == 1">
					<view class="info-margin">
						<!-- 房源信息列表 -->
						<HouseList :houseData="houseSellData"></HouseList>
						<view style="background-color: #F3F4F6;" v-if="houseSellData.length==0">
							<u-empty text="暂无数据" mode="list"></u-empty>
						</view>
					</view>
				</block>
				<block v-if="current == 2">
					<view class="info-margin">
						<!-- 招聘信息列表 -->
						<JobList :JobData="JobData"></JobList>
						<view style="background-color: #F3F4F6;" v-if="JobData.length==0">
							<u-empty text="暂无数据" mode="list"></u-empty>
						</view>
					</view>
				</block>
			</view>
		</block>



		<!-- #ifdef H5 -->
		<view style="height: 44px"></view>
		<!-- #endif -->
	</view>
</template>

<script>
	import {
		APP_NAME
	} from '../../env.js'
	import HeadCell from '@/components/HeadCell/HeadCell.vue';
	import JobList from '@/components/JobList/JobList.vue';
	import HouseList from '@/components/HouseList/HouseList.vue';
	import CarList from '@/components/CarList/CarList.vue'
	export default {
		components: {
			HeadCell,
			JobList,
			HouseList,
			CarList
		},
		data() {
			return {
				appName: APP_NAME,
				background: {
					backgroundColor: '#ffffff'
				},
				keyword: '',
				offsetTop: 0,
				list: [{
					name: '房屋出租'
				}, {
					name: '房屋出售'
				}, {
					name: '好工作'
				}],
				current: 0,
				initData: null,
				opentop: false,
				houseRentData: [],
				houseSellData: [],
				jobData: []
			}
		},
		onLoad() {
			var that = this;
			//#ifndef H5
			uni.getSystemInfo({
				success: function(res) {
					let windowWidth = res.windowWidth;
					let statusBarHeight = res.statusBarHeight ? res.statusBarHeight : 0;
					that.offsetTop = (44 + statusBarHeight) * 750 / windowWidth;
				}
			});
			//#endif
			this.$u.get('/addons/hicity/index/init', {

			}).then(res => {
				this.initData = res;
				uni.setStorageSync('initData', res);
			})
			this.getVerify()
		},
		onShareAppMessage() {
			return {
				title: APP_NAME,
				path: '/pages/index/index'
			}
		},
		methods: {
			//
			getVerify() {
				this.$u.get('/addons/hicity/index/getVerify', {}).then(res => {
					this.opentop = res.opentop;
					if (this.opentop) {
						this.getHouseRentList();
					} else {
						this.getJobList();
					}
				})
			},
			changeTag(index) {
				if (this.opentop) {
					this.current = index;
					console.log(index);
					switch (index) {
						case 0:
							this.getHouseRentList();
							break;
						case 1:
							this.getHouseSellList();
							break;
						case 2:
							this.getJobList();
							break;
					}
				}
			},

			getHouseRentList() {
				this.$u.get('/addons/hicity/house/list', {
					info_type: 'rent',
				}).then(res => {
					this.houseRentData = res;
				})
			},
			getHouseSellList() {
				this.$u.get('/addons/hicity/house/list', {
					info_type: 'sell',
				}).then(res => {
					this.houseSellData = res;
				})
			},
			getJobList() {
				this.$u.get('/addons/hicity/job/list', {

				}).then(res => {
					this.JobData = res;
				})
			},




		}
	}
</script>
<style lang="scss" scoped>
	.ym-search {
		padding: 20rpx;
		background-color: white;
		position: fixed;
		left: 0;
		right: 0;
		z-index: 1000;
	}

	.slot-wrap {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 750rpx;
		//加入搜索框时去掉
		justify-content: center;
	}

	.slot-left {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin: 0 20rpx;
		/* #ifdef MP */
		margin-bottom: 10rpx;

		/*  #endif  */
		.slot-left-text {
			font-size: 35rpx;
			color: white;
			margin-right: 10rpx;
		}
	}

	.search-wrap {
		margin: 0 20rpx;
		/*  #ifndef MP */
		flex: 1;
		/*  #endif  */
		/* #ifdef MP */
		width: 380rpx;
		margin-bottom: 10rpx;
		/*  #endif  */
	}

	.banner {
		margin: 20rpx;
	}

	.gird {
		margin: 0 20rpx;
		background-color: white;
		border-radius: 20rpx;
	}

	.ad {
		margin: 20rpx;
	}

	.info-margin {
		margin: 0 20rpx 20rpx 20rpx;
		padding-top: 40rpx;
	}
	.u-grid-item {
		background-color: rgba(0, 0, 0, 0) !important;
	}
	.home-list {
		background-color: #F3F4F6;
		height: 100vh;
	}
</style>

