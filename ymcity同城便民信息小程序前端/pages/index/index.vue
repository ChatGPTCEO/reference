<template>
	<view>
		<u-navbar :is-back="false" :background="background">
			<view class="slot-wrap">
				<view class="slot-left">
					<text class="slot-left-text" v-if="initData">{{initData.app_name}}</text>
					<text class="slot-left-text" v-else>{{appName}}</text>
					<!-- <u-icon name="arrow-down-fill" color="#ffffff" size="25"></u-icon> -->
				</view>
				<!-- <view class="search-wrap">
					<u-search v-model="keyword" :disabled="true" :show-action="false" :action-style="{color: '#fff'}">
					</u-search>
				</view> -->
			</view>
		</u-navbar>
		<view class="ym-search">
			<u-search placeholder="搜索一下" @click="$u.route('/pages/search/search')" disabled v-model="keyword"
				:show-action="false"></u-search>
		</view>
		<view style="height: 100rpx;"></view>
		<view class="banner" v-if="initData">
			<u-swiper :list="initData.home_banner" height="300"></u-swiper>
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
		<view class="ad" v-if="initData">
			<u-image :border-radius="10" width="100%" height="200rpx" :src="initData.home_ad.image">
			</u-image>
		</view>
		<u-sticky :offset-top="offsetTop">
			<view style="background-color: #F8F8F8;">
				<!-- 标题栏 -->
				<HeadCell :leftShow="false" :tabs="opentop?tabs:tabs1" :rightShow="false" @tabChange="tabChange">
				</HeadCell>
			</view>
		</u-sticky>
		<block v-if="opentop">
			<block v-if="tabCurrent==0">
				<view class="info-margin">
					<!-- 招聘信息列表 -->
					<JobList :JobData="JobData"></JobList>
					<view style="background-color: white;" v-if="JobData.length==0">
						<u-empty text="暂无数据" mode="list"></u-empty>
					</view>
				</view>
			</block>
			<block v-if="tabCurrent==1">
				<view class="info-margin">
					<!-- 房源信息列表 -->
					<HouseList :houseData="houseRentData"></HouseList>
					<view style="background-color: white;" v-if="houseRentData.length==0">
						<u-empty text="暂无数据" mode="list"></u-empty>
					</view>
				</view>
			</block>
			<block v-if="tabCurrent==2">
				<view class="info-margin">
					<!-- 房源信息列表 -->
					<HouseList :houseData="houseSellData"></HouseList>
					<view style="background-color: white;" v-if="houseSellData.length==0">
						<u-empty text="暂无数据" mode="list"></u-empty>
					</view>
				</view>
			</block>
			<block v-if="tabCurrent==3">
				<view class="info-margin">
					<!-- 车信息列表 -->
					<CarList :carData="carData"></CarList>
					<view style="background-color: white;" v-if="carData.length==0">
						<u-empty text="暂无数据" mode="list"></u-empty>
					</view>
				</view>
			</block>
			<block v-if="tabCurrent==4">
				<view class="info-margin">
					<!-- 生意信息列表 -->
					<TransferList :transferData="transferData"></TransferList>
					<view style="background-color: white;" v-if="transferData.length==0">
						<u-empty text="暂无数据" mode="list"></u-empty>
					</view>
				</view>
			</block>
			<block v-if="tabCurrent==5">
				<view class="info-margin">
					<!-- 本地信息列表 -->
					<PromoteItem :promoteData="promoteData"></PromoteItem>
					<view style="background-color: white;" v-if="promoteData.length==0">
						<u-empty text="暂无数据" mode="list"></u-empty>
					</view>
				</view>
			</block>
			<block v-if="tabCurrent==6">
				<view class="info-margin">
					<!-- 打听信息列表 -->
					<AskItem :askData="askData"></AskItem>
					<view style="background-color: white;" v-if="askData.length==0">
						<u-empty text="暂无数据" mode="list"></u-empty>
					</view>
				</view>
			</block>
			<block v-if="tabCurrent==7">
				<view class="info-margin">
					<!-- 人才信息列表 -->
					<view class="resumeList" v-for="(item,index) in resumeData" :key="index"
						@click="$u.route('/pagesIndex/resumemain/resumemain',{id:item.id})">
						<view class="user">
							<u-image width="130rpx" height="130rpx" :src="item.user.avatar" shape="circle"></u-image>
							<view class="uinfo">
								<text class="name">{{item.name}}</text>
								<text class="age">{{item.age}}岁 · {{item.work_exp_text}} · {{item.edu_text}}</text>
							</view>
						</view>
						<view class="bot">
							<view class="">
								<text>期望职位：</text>
								<text class="text">{{item.jobcategory.name}}</text>
							</view>
							<u-icon name="arrow-right" color="#999999" size="28"></u-icon>
						</view>
					</view>
					<view style="background-color: white;" v-if="resumeData.length==0">
						<u-empty text="暂无数据" mode="list"></u-empty>
					</view>
				</view>
			</block>
		</block>
		<block v-else>
			<block v-if="tabCurrent==0">
				<view class="info-margin">
					<!-- 房源信息列表 -->
					<HouseList :houseData="houseRentData"></HouseList>
					<view style="background-color: white;" v-if="houseRentData.length==0">
						<u-empty text="暂无数据" mode="list"></u-empty>
					</view>
				</view>
			</block>
			<block v-if="tabCurrent==1">
				<view class="info-margin">
					<!-- 房源信息列表 -->
					<HouseList :houseData="houseSellData"></HouseList>
					<view style="background-color: white;" v-if="houseSellData.length==0">
						<u-empty text="暂无数据" mode="list"></u-empty>
					</view>
				</view>
			</block>
			<block v-if="tabCurrent==2">
				<view class="info-margin">
					<!-- 车信息列表 -->
					<CarList :carData="carData"></CarList>
					<view style="background-color: white;" v-if="carData.length==0">
						<u-empty text="暂无数据" mode="list"></u-empty>
					</view>
				</view>
			</block>
			<block v-if="tabCurrent==3">
				<view class="info-margin">
					<!-- 生意信息列表 -->
					<TransferList :transferData="transferData"></TransferList>
					<view style="background-color: white;" v-if="transferData.length==0">
						<u-empty text="暂无数据" mode="list"></u-empty>
					</view>
				</view>
			</block>
			<block v-if="tabCurrent==4">
				<view class="info-margin">
					<!-- 本地信息列表 -->
					<PromoteItem :promoteData="promoteData"></PromoteItem>
					<view style="background-color: white;" v-if="promoteData.length==0">
						<u-empty text="暂无数据" mode="list"></u-empty>
					</view>
				</view>
			</block>
			<block v-if="tabCurrent==5">
				<view class="info-margin">
					<!-- 打听信息列表 -->
					<AskItem :askData="askData"></AskItem>
					<view style="background-color: white;" v-if="askData.length==0">
						<u-empty text="暂无数据" mode="list"></u-empty>
					</view>
				</view>
			</block>
			<block v-if="tabCurrent==6">
				<view class="info-margin">
					<!-- 人才信息列表 -->
					<view class="resumeList" v-for="(item,index) in resumeData" :key="index"
						@click="$u.route('/pagesIndex/resumemain/resumemain',{id:item.id})">
						<view class="user">
							<u-image width="130rpx" height="130rpx" :src="item.user.avatar" shape="circle"></u-image>
							<view class="uinfo">
								<text class="name">{{item.name}}</text>
								<text class="age">{{item.age}}岁 · {{item.work_exp_text}} · {{item.edu_text}}</text>
							</view>
						</view>
						<view class="bot">
							<view class="">
								<text>期望职位：</text>
								<text class="text">{{item.jobcategory.name}}</text>
							</view>
							<u-icon name="arrow-right" color="#999999" size="28"></u-icon>
						</view>
					</view>
					<view style="background-color: white;" v-if="resumeData.length==0">
						<u-empty text="暂无数据" mode="list"></u-empty>
					</view>
				</view>
			</block>
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
	import CarList from '@/components/CarList/CarList.vue';
	import TransferList from '@/components/TransferList/TransferList.vue'
	import PromoteItem from '@/components/promoteItem/promoteItem.vue'
	import AskItem from '@/components/askItem/askItem.vue';
	export default {
		components: {
			HeadCell,
			JobList,
			HouseList,
			CarList,
			TransferList,
			PromoteItem,
			AskItem,
		},
		data() {
			return {
				appName: APP_NAME,
				background: {
					backgroundColor: '#f44c01',
				},
				keyword: '',
				offsetTop: 0,
				JobData: [],
				houseRentData: [],
				houseSellData: [],
				tabs: [{
					name: '好工作'
				}, {
					name: '好房出租'
				}, {
					name: '好房出售'
				}, {
					name: '品质好车'
				}, {
					name: '生意转让'
				}, {
					name: '本地推广'
				}, {
					name: '打听'
				}, {
					name: '人才'
				}],
				tabs1: [{
					name: '好房出租'
				}, {
					name: '好房出售'
				}, {
					name: '品质好车'
				}, {
					name: '生意转让'
				}, {
					name: '本地推广'
				}, {
					name: '打听'
				}, {
					name: '人才'
				}],
				carData: [],
				transferData: [],
				promoteData: [],
				askData: [],
				resumeData: [],
				tabCurrent: 0,
				initData: null,
				opentop: false,
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
			getVerify() {
				this.$u.get('/addons/hicity/index/getVerify', {}).then(res => {
					this.opentop = res.opentop;
					if (this.opentop) {
						this.getJobList()
					} else {
						this.getHouseRentList();
					}
				})
			},
			tabChange(index) {
				if (this.opentop) {
					this.tabCurrent = index;
					switch (index) {
						case 0:
							this.getJobList();
							break;
						case 1:
							this.getHouseRentList();
							break;
						case 2:
							this.getHouseSellList();
							break;
						case 3:
							this.getCarList();
							break;
						case 4:
							this.getTransferList();
							break;
						case 5:
							this.getPromoteList();
							break;
						case 6:
							this.getAskList();
							break;
						case 7:
							this.getResumeList();
							break;
					}
				} else {
					this.tabCurrent = index;
					switch (index) {
						case 0:
							this.getHouseRentList();
							break;
						case 1:
							this.getHouseSellList();
							break;
						case 2:
							this.getCarList();
							break;
						case 3:
							this.getTransferList();
							break;
						case 4:
							this.getPromoteList();
							break;
						case 5:
							this.getAskList();
							break;
						case 6:
							this.getResumeList();
							break;
					}
				}
			},
			getJobList() {
				this.$u.get('/addons/hicity/job/list', {

				}).then(res => {
					this.JobData = res;
				})
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
			getCarList() {
				this.$u.get('/addons/hicity/car/list', {}).then(res => {
					this.carData = res;
				})
			},
			getTransferList() {
				this.$u.get('/addons/hicity/transfer/list', {}).then(res => {
					this.transferData = res;
				})
			},
			getPromoteList() {
				this.$u.get('/addons/hicity/promote/list', {}).then(res => {
					this.promoteData = res;
				})
			},
			getAskList() {
				this.$u.get('/addons/hicity/ask/list', {}).then(res => {
					this.askData = res;
				})
			},
			getResumeList() {
				this.$u.get('/addons/hicity/resume/list', {}).then(res => {
					this.resumeData = res;
				})
			}
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
	}
	
	.resumeList {
		display: flex;
		flex-direction: column;
		background-color: white;
		padding: 20rpx;
		margin-bottom: 20rpx;
		.user {
			display: flex;
			flex-direction: row;
			align-items: center;
			flex: 1;
	
			.uinfo {
				display: flex;
				flex-direction: column;
				line-height: 60rpx;
				margin-left: 20rpx;
	
				.name {
					font-size: 32rpx;
					color: #333333;
					font-weight: 600;
				}
	
				.age {
					font-size: 30rpx;
					color: #666666;
				}
			}
		}
	
		.bot {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			padding: 20rpx 0;
			color: #666666;
	
			.text {
				color: #40c6bf;
			}
		}
	}
</style>
<style>
	.u-grid-item {
		background-color: rgba(0, 0, 0, 0) !important;
	}
</style>
