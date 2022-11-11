<template>
	<view class="content">
		<view class="top">
			<view class="navbar" :style="{ height: navBarHeight + 'px' }"><text style="font-size: 32upx;">人才直聘</text></view>
			<view class="mp-search">
				<view class="location" @click="toSelectCity">
					<text class="yzb yzb-location"></text>
					<text class="city ellipsis-oneline">{{ location.city }}</text>
					<text class="yzb yzb-xiangxia"></text>
				</view>
				<view class="mp-search-input" @click="search">
					<text class="yzb yzb-search" style="font-size: 36upx;margin-right: 15upx;"></text>
					<text>搜索职位或关键词</text>
				</view>
			</view>
		</view>
		<view :style="{ 'margin-top': topHeight + 'px' }">
			<m-swiper :list="banner" :previousMargin="30" :nextMargin="30"></m-swiper>
			<!-- <m-ad :list="adList"></m-ad> -->
			<template v-if="hasLogin == false || (hasLogin && userInfo.memberRole == 0)">
				<view style="padding: 20upx 0;background-color: #FFFFFF;"><yzb-grid :columnNum="5" :data="grid" show-border="false" @click="handleClickGrid"></yzb-grid></view>
				<view class="notice">
					<yzb-notice theme="primary" :list="noticeList" theKey="summary" :showIcon="true" :showMore="true" @goItem="goItem" @goMore="goMore"></yzb-notice>
				</view>
				<view class="post">
					<view class="title"><text class="name">热门职位</text></view>
					<view class="post-list">
						<view v-for="(item, index) in postList" :key="index" @click="toPost(item)">
							<text class="post-item" :class="index % 4 != 0 ? 'post-item-left' : ''">{{ item.name }}</text>
						</view>
					</view>
					<view class="all" @click="toAllPost">
						<text class="all-text">查看全部职位</text>
						<text class="yzb yzb-next post-next"></text>
					</view>
				</view>
				<!-- <view class="expect" v-if="JobExpectList.length>0">
					<scroll-view class="items" :scroll-x="true">
						<text v-for="(item, index) in JobExpectList" :key="index" :class="item.selected ? 'selected' : ''" @click="selectExpect(index)">{{ item.postName }}</text>
					</scroll-view>
					<text class="yzb yzb-bianji1 expect-icon"></text>
				</view> -->
				<view class="title"><text class="name">附近职位</text></view>
				<yzb-position :positions="list" @click="positionDetail"></yzb-position>
			</template>
			<template v-if="hasLogin && userInfo.memberRole == 1">
				<view class="title"><text class="name">人才列表</text></view>
				<!-- <view class="expect" v-if="JobExpectList.length>0">
					<scroll-view class="items" :scroll-x="true">
						<text v-for="(item, index) in JobExpectList" :key="index" :class="item.selected ? 'selected' : ''" @click="selectExpect(index)">{{ item.postName }}</text>
					</scroll-view>
					<text class="yzb yzb-bianji1 expect-icon"></text>
				</view> -->
				<yzb-resume :list="list" @click="resumeDetail"></yzb-resume>
			</template>
			<view class="load-more-box">
				<uni-load-more v-if="status == '请求中'" status="正在加载..." :showIcon="true"></uni-load-more>
				<uni-load-more v-if="status == '没有更多'" status="没有更多了" :showIcon="false"></uni-load-more>
				<uni-load-more v-if="status == '暂无数据'" status="暂无数据" :showIcon="false"></uni-load-more>
				<uni-load-more v-if="status == '请求失败'" status="加载失败，点我重试" :showIcon="false" @click="reLoad"></uni-load-more>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import mSwiper from '@/components/m-swiper/m-swiper.vue';
import yzbPosition from '@/components/yzb/yzb-position.vue';
import yzbResume from '@/components/yzb/yzb-resume.vue';
import yzbGrid from '@/components/yzb/yzb-grid.vue';
import mAd from '@/components/m-ad/m-ad.vue';
import IMService from '@/lib/imservice';
import amap from '@/common/amap-wx.js';
export default {
	components: {
		mSwiper,
		yzbPosition,
		mAd,
		yzbResume,
		yzbGrid
	},
	computed: {
		...mapState(['userInfo']),
		...mapGetters(['hasLogin'])
	},
	data() {
		return {
			statusBarHeight: 0,
			navBarHeight: 0,
			topHeight: 0,

			status: '',
			query: {
				page: 1,
				limit: 10
			},
			banner: [],
			grid: [],
			ka: [],
			adList: [],
			postList: [],
			JobExpectList: [],
			list: [],
			selectExpected: null,

			key: '102dcab15e743584f73d383dea7530e7', //高德地图key
			location: { city: '未定位' }, //定位信息

			loadStatus: 'loading', //loading、fail、success
			noticeList: []
		};
	},
	created() {
		//获取手机状态栏高度
		this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight'];
		//#ifdef MP-WEIXIN
		this.navBarHeight = uni.getMenuButtonBoundingClientRect().bottom;
		this.topHeight = this.navBarHeight + uni.upx2px(80);
		//#endif
	},
	async onLoad(query) {
		await this.$AppEntryController.main(query);
		this.getBanners();
		this.getGrids();
		this.getNoticeList();
		let loc = this.$db.get('location');
		console.log('loc===', loc);
		if (loc) {
			this.location = loc;
		}
		//#ifdef MP-WEIXIN
		this.locationAuth();
		//#endif
		//#ifdef H5
		this.getPosition();
		//#endif

		this.listenCitySelect();
		// this.initHotPostData();
		this.getPostPageList();
	},

	onShow() {
		if (this.hasLogin && this.userInfo.memberRole == 1) {
			this.roleChange();
		}
		this.getDatasByLoc();
		this.initChat();
	},

	onReady() {
		if (this.userInfo.memberRole != 1) {
			uni.setTabBarItem({
				index: 1,
				text: '职位'
			});
		} else {
			uni.setTabBarItem({
				index: 1,
				text: '简历'
			});
		}
	},

	onPullDownRefresh() {
		this.getDatasByLoc('refresh', true);
	},

	onReachBottom() {
		this.getDatasByLoc('add');
	},
	methods: {
		//需要位置信息的
		getDatasByLoc(type = 'refresh', pulldown = false) {
			console.log('memberRole===', this.userInfo.memberRole);
			if (this.location.pcitycode) {
				this.query.latitude = this.location.latitude;
				this.query.longitude = this.location.longitude;
				this.query.pcitycode = this.location.pcitycode;
				if (this.userInfo.memberRole == 1) {
					this.getResumeList(type, pulldown);
				} else {
					this.getPositionList(type, pulldown);
				}
			} else {
				console.log('位置不能为空哦');
			}
		},

		async roleChange() {
			//用户未绑定企业，角色切换
			if (this.userInfo.companyId == 0) {
				let res = await this.$apis.switchRole({ role: 0 });
				this.getUserInfo();
			}
		},

		// 获取用户信息
		async getUserInfo() {
			let userInfo = await this.$apis.getUserInfo();
			if (userInfo == true) {
				uni.clearStorageSync();
				this.$store.commit('SET_LOGOUT');
				if (this.goEasy.getConnectionStatus() === 'connected') {
					console.log('do  disconnect');
					getApp().globalData.imService.disconnect();
				}
				return;
			}
			this.$store.commit('SET_USERINFO', userInfo);
			this.getDatasByLoc();
		},

		async initHotPostData() {
			let postList = await this.$apis.getHotPostList();
			console.log('postList==', postList);
			this.postList = postList || [];
		},

		initChat() {
			//注册
			if (this.hasLogin) {
				console.log('this.goEasy.getConnectionStatus()==' + this.goEasy.getConnectionStatus());
				if (this.goEasy.getConnectionStatus() === 'disconnected') {
					getApp().globalData.imService = new IMService(this.goEasy, this.GoEasy);
					getApp().globalData.imService.connect(this.userInfo);
				} else {
					//加载会话列表
					this.goEasy.im.latestConversations({
						onSuccess: function(result) {
							let content = result.content;
							console.log('最新会话列表', content);
							let unreadTotal = content.unreadTotal;
							if (unreadTotal > 0) {
								uni.setTabBarBadge({
									index: 2,
									text: unreadTotal.toString()
								});
							} else {
								uni.removeTabBarBadge({
									index: 2
								});
							}
						},
						onFailed: function(error) {
							//获取失败
							console.log('失败获取最新会话列表, code:' + error.code + ' content:' + error.content);
						}
					});
				}
			}
		},

		async getPostPageList() {
			let param = {
				page: 1,
				limit: 12,
				hot: 1
			};
			let res = await this.$apis.getPostPageList(param);
			if (res) {
				this.postList = res.data;
			}
		},

		async getBanners() {
			let data = await this.$apis.getBanners({ apId: 1 });
			if (data) {
				this.banner = data;
			}
		},

		async getJobExpectList() {
			let data = await this.$apis.getJobExpectList();
			if (data) {
				for (let i in data) {
					data[i].selected = false;
					if (i == 0) {
						data[i].selected = true;
					}
				}
				this.JobExpectList = data;
				this.selectExpected = this.JobExpectList[0];
				this.getPositionList();
			}
		},

		async getPositionList(type = 'refresh', pulldown = false) {
			this.status = '请求中';
			if (type == 'refresh') {
				this.query.page = 1;
			} else {
				this.query.page++;
			}
			let res = await this.$apis.getPositionList(this.query);
			if (res) {
				if (type == 'refresh') {
					this.list = [];
				}
				if (pulldown) {
					uni.stopPullDownRefresh();
				}
				let data = res.data;
				for (let i in data) {
					if (data[i].skill) {
						data[i].skill = data[i].skill.split(',');
					}
				}
				this.list = this.list.concat(data || []);
				this.changeStatus(res);
			}
		},

		async getCompanyPositionList() {
			let param = {
				page: 1,
				limit: 30
			};
			let res = await this.$apis.getCompanyPositionList(param);
			if (res) {
				let data = res.data;
				for (let i in data) {
					data[i].selected = false;
					if (i == 0) {
						data[i].selected = true;
					}
				}
				this.JobExpectList = data;
				this.selectExpected = this.JobExpectList[0];
				this.getResumeList();
			}
		},

		async getResumeList(type = 'refresh', pulldown = false) {
			this.status = '请求中';
			if (type == 'refresh') {
				this.query.page = 1;
			} else {
				this.query.page++;
			}
			let res = await this.$apis.getResumeList(this.query);
			if (res) {
				if (type == 'refresh') {
					this.list = [];
				}
				if (pulldown) {
					uni.stopPullDownRefresh();
				}
				let data = res.data;
				this.list = this.list.concat(data || []);
				this.changeStatus(res);
			}
		},

		// 修改请求状态
		changeStatus(data) {
			if (this.list.length === 0) {
				this.status = '暂无数据';
			} else if (this.query.page >= Math.ceil(data.count / this.query.limit)) {
				this.status = '没有更多';
			} else {
				this.status = '请求更多';
			}
		},

		getGrids() {
			this.grid = [
				{
					image: this.$mAssetsPath.grid_1,
					text: '最新发布',
					path: this.$mRoutesConfig.positionList,
					type: 1
				},
				{
					image: this.$mAssetsPath.grid_2,
					text: '热招职位',
					path: this.$mRoutesConfig.positionList,
					type: 2
				},
				{
					image: this.$mAssetsPath.grid_3,
					text: '高薪职位',
					path: this.$mRoutesConfig.positionList,
					type: 3
				},
				{
					image: this.$mAssetsPath.grid_4,
					text: '兼职招聘',
					path: this.$mRoutesConfig.positionList,
					type: 4
				},
				{
					image: this.$mAssetsPath.grid_5,
					text: '公司列表',
					path: this.$mRoutesConfig.companyList,
					type: 5
				},
				{
					image: this.$mAssetsPath.grid_6,
					text: '法律知识',
					path: this.$mRoutesConfig.lawList,
					type: 4
				},
				{
					image: this.$mAssetsPath.grid_7,
					text: '特色课程',
					path: this.$mRoutesConfig.courseList,
					type: 4
				},
				{
					image: this.$mAssetsPath.grid_8,
					text: '外包任务',
					path: this.$mRoutesConfig.taskList,
					type: 5
				},
				{
					image: this.$mAssetsPath.grid_9,
					text: '联系客服',
					path: this.$mRoutesConfig.contactUs,
					type: 5
				},
				{
					image: this.$mAssetsPath.grid_10,
					text: '公告信息',
					path: this.$mRoutesConfig.notices,
					type: 5
				}
			];
		},

		handleClickGrid(o) {
			if (this.grid[o.index].type == 999) {
				uni.switchTab({
					url: '../type/type'
				});
				return;
			}
			this.$mRouter.push({
				route: this.grid[o.index].path,
				query: {
					type: this.grid[o.index].type,
					text: this.grid[o.index].text
				}
			});
		},

		selectExpect(index) {
			for (let i in this.JobExpectList) {
				if (index == i) {
					this.JobExpectList[i].selected = true;
				} else {
					this.JobExpectList[i].selected = false;
				}
			}
			this.selectExpected = this.JobExpectList[index];
			this.getDatasByLoc();
		},

		positionDetail(item) {
			this.$mRouter.push({
				route: this.$mRoutesConfig.positionDetail,
				query: {
					id: item.id
				}
			});
		},

		resumeDetail(item) {
			this.$mRouter.push({
				route: this.$mRoutesConfig.resumeDetail,
				query: {
					id: item.id
				}
			});
		},

		toAllPost() {
			uni.switchTab({
				url: '/pages/type/type'
			});
		},
		toPost(item) {
			//跳转到岗位筛选页面
			getApp().globalData.postId = item.id;
			uni.switchTab({
				url: '/pages/type/type'
			});
		},

		search() {
			this.$mRouter.push({
				route: this.$mRoutesConfig.search
			});
		},

		toSelectCity() {
			console.log('toSelectCity');
			if (this.location.city == '未定位') {
				//#ifdef MP-WEIXIN
				this.locationAuth();
				//#endif
			} else {
				uni.navigateTo({
					url: '/pages/index/selectCity'
				});
			}
		},

		/**
		 * 位置授权
		 */
		locationAuth() {
			let that = this;
			uni.getSetting({
				success(res) {
					if (res.authSetting['scope.userLocation']) {
						console.log('userLocation位置功能已授权');
						that.getLocation();
						// 如果已授权,直接获取对应参数
					} else if (!res.authSetting['scope.userLocation']) {
						// 说明此时要获取的位置功能尚未授权,
						// 则设置进入页面时主动弹出，直接授权
						uni.authorize({
							scope: 'scope.userLocation',
							success(res) {
								// 授权成功
								console.log(res);
								that.getLocation();
								// 成功后获取对应的位置参数
							},
							fail() {
								console.log('位置授权失败');
								uni.showModal({
									content: '检测到您没打开获取信息功能权限，是否去设置打开？',
									confirmText: '确认',
									cancelText: '取消',
									success: res => {
										console.log(res);
										if (res.confirm) {
											uni.openSetting({
												success: res => {
													console.log('res', res);
													that.getLocation();
												},
												fail: err => {
													console.log(err);
												}
											});
										} else {
											console.log('取消');
										}
									}
								});
							}
						});
					}
				},
				fail() {
					console.log('获取授权信息授权失败');
				}
			});
		},

		getLocation() {
			//高德地图插件
			this.myAmapFun = new amap.AMapWX({
				key: this.key
			});
			let that = this;
			this.myAmapFun.getRegeo({
				success: function(data) {
					//成功回调
					console.log('定位信息：', data);
					let mlocation = {
						latitude: data[0].latitude,
						longitude: data[0].longitude,
						pcity: data[0].regeocodeData.addressComponent.city,
						city: data[0].regeocodeData.addressComponent.district,
						citycode: data[0].regeocodeData.addressComponent.adcode + '000000',
						pcitycode: data[0].regeocodeData.addressComponent.adcode.substr(0, 4) + '00000000'
					};
					that.location = mlocation;
					getApp().globalData.location = mlocation;
					getApp().globalData.currentLocation = JSON.parse(JSON.stringify(mlocation));
					//保存到本地
					that.$db.set('location', mlocation);
					that.getDatasByLoc();
				},
				fail: function(info) {
					//失败回调
					console.log(info);
				}
			});
		},

		//获取定位信息
		getPosition() {
			console.log("=========获取定位信息========================")
			const that = this;
			uni.getLocation({
				type: 'gcj02',
				success: function(lb) {
					console.log('位置信息', lb);
					console.log('当前位置的经度：' + lb.longitude);
					console.log('当前位置的纬度：' + lb.latitude);
					that.latitude = lb.latitude;
					that.longitude = lb.longitude;
					console.log(lb.longitude, lb.latitude);
					let key = '845d7a0716db36b612ce8e13369c4e09'; //高德地图key
					uni.request({
						// url: '/gaode?output=json&location=' + lb.longitude + ',' + lb.latitude + '&key=' + key + '&radius=1000&extensions=all',
						url:'/qq?output=json&location=' + lb.latitude + ',' + lb.longitude + '&key=TZCBZ-R333W-T27RS-OX3SB-RRJET-AWFVF&radius=1000&get_poi=1',
						data: {},
						header: {
							'Content-Type': 'application/json',
							'Access-Control-Allow-Origin': '*'
						},
						success: function(res) {
							console.log('高德地图API接口返回信息', res);
							// that.area = res.data.regeocode.addressComponent.city;
							console.log('定位信息：', res);
							let mlocation = {
								latitude: res.data.result.ad_info.location.latitude,
								longitude: res.data.result.location.longitude,
								pcity: res.data.result.ad_info.city,
								city: res.data.result.ad_info.district,
								citycode: res.data.result.ad_info.adcode + '000000',
								pcitycode: res.data.result.ad_info.adcode.substr(0, 4) + '00000000'
							};
							that.location = mlocation;
							getApp().globalData.location = mlocation;
							getApp().globalData.currentLocation = JSON.parse(JSON.stringify(mlocation));
							//保存到本地
							that.$db.set('location', mlocation);
							that.getDatasByLoc();
						}
					});
				},
				fail: function(error) {
					console.log('=======error=========', error);
				}
			});
		},

		listenCitySelect() {
			let that = this;
			uni.$on('city', res => {
				console.log('city', res);
				getApp().globalData.location.city = res.city;
				getApp().globalData.location.citycode = res.code;
				if (res.level == 2) {
					getApp().globalData.location.pcity = res.city;
					getApp().globalData.location.pcitycode = res.code;
				} else {
					getApp().globalData.location.pcity = res.pcity;
					getApp().globalData.location.pcitycode = res.pcode;
				}
				this.location = getApp().globalData.location;
				this.$db.set('location', this.location);
				this.getDatasByLoc();
			});
		},

		async getNoticeList() {
			let param = {
				page: 1,
				limit: 10
			};
			let res = await this.$apis.getNoticeList(param);
			console.log('getNoticeList===', res);
			if (res.data.length > 0) {
				this.noticeList = res.data;
				console.log('noticeList===', this.noticeList);
			}
		},

		goItem(item) {
			console.log('goItem', item);
			this.$mRouter.push({
				route: this.$mRoutesConfig.noticeDetail,
				query: {
					id: item.noticeId
				}
			});
		},

		goMore(item) {
			console.log('goMore', item);
			this.$mRouter.push({
				route: this.$mRoutesConfig.notices
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.top {
	position: fixed;
	top: 0;
	z-index: 100;
	width: 100%;
	background-color: $main-color;
	// background-image: linear-gradient(#12ae85, #3995f9);
}

.navbar {
	height: 100upx;
	display: flex;
	align-items: flex-end;
	justify-content: center;
	text {
		color: #ffffff;
		margin-left: 20upx;
	}
}
// 搜索框
.mp-search {
	// background: $main-color;
	height: 80upx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding: 0 20upx;
	box-sizing: border-box;
	// border-bottom: 1upx solid #eeeeee;

	.location {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 30%;
		color: $uni-bg-color-grey;
		padding: 0 10upx 0 0;
		font-weight: bold;
		.city {
			// width: 100upx;
		}
		.yzb-location {
			margin-right: 15upx;
			color: $uni-bg-color-grey;
		}
		.yzb-xiangxia {
			color: $uni-bg-color-grey;
			margin-left: 5upx;
			font-size: $uni-font-size-sm;
		}
	}

	.mp-search-input {
		font-size: 28upx;
		background: #f5f5f5;
		// background: #FFFFFF;
		height: 60upx;
		width: 70%;
		border-radius: 50upx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #909399;
	}
}

.notice {
	width: 100%;
	// padding: 3%;
	margin-top: 10upx;
	// padding: 20upx 0;
	// background-color: #fff;
}

.post {
	margin-top: 10upx;
	background-color: #ffffff;
	border-bottom: 20upx solid $border-color-light;
	// border-top: 20upx solid $border-color-light;
	padding-bottom: 20upx;
	.title {
		// font-weight: bold;
		// font-size: $uni-font-size-lg;
		border-bottom: 1rpx solid #f8f8f8;
	}
	.post-list {
		overflow: hidden;
		white-space: nowrap;
		flex-wrap: wrap;
		width: 96%;
		padding: 2%;
	}
	.post-item {
		// background-color: #EEF2FE;
		border: 1upx solid $border-color-base;
		font-size: 28upx;
		float: left;
		width: 20%;
		padding: 10upx 1%;
		border-radius: 8upx;
		margin-top: 20upx;
		text-align: center;

		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.post-item-left {
		margin-left: 3%;
	}

	.all {
		margin-top: 10upx;
		display: flex;
		justify-content: center;
		align-items: center;
		.all-text {
			color: $main-color;
			font-weight: bold;
		}
		.post-next {
			font-size: $font-size-34;
			color: $main-color;
			margin-left: 5upx;
		}
	}
}

.title {
	background-color: #ffffff;
	// border-top: 15upx solid $border-color-light;
	padding: 30upx 20upx;
	border-bottom: 1upx solid $border-color-light;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	.name {
		font-weight: bold;
		font-size: $font-size-34;
	}
}

.expect {
	padding: 25upx 2%;
	margin-top: 20upx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: row;
	background-color: $bgcolor_white;
	border-bottom: 1upx solid $border-color-base;
	.items {
		width: 85%;
		padding: 0 3%;
		flex-wrap: wrap;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		white-space: nowrap;
		align-items: center;
		text {
			padding: 0 10upx;
			font-size: $uni-font-size-lg;
			color: $font-color-base;
		}
		.selected {
			font-weight: bold;
			color: $font-color-000;
			font-size: $font-size-34;
		}
	}
	.expect-icon {
		size: $uni-font-size-lg;
		color: $font-color-gray;
		margin-right: 10upx;
	}
}
.load-more-box {
	// height: 120upx;
}
</style>
