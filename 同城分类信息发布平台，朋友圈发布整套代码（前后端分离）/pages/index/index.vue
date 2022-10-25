<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<view class="status-bar" :style="{height}">
			<view class="u-flex u-col-center u-row-between u-p-r-10 u-p-l-20" :style="{top,width,height:navbarHeight}">
				<u-icon name="map" size="40" color="red" :label="selectCity" label-color="#303133" label-size="34"
					@click="showPicker=true"></u-icon>
				<navigator url="./search" class="search-icon" :style="{width:searchHeight,height:searchHeight}">
					<u-icon name="search" size="36"></u-icon>
				</navigator>
			</view>
		</view>
		<view class="category" :style="{top:height}">
			<u-tabs :list="categories" :current="current" @change="changeTabs" height="70" active-color="#1296db">
			</u-tabs>
		</view>
		<view :style="{paddingTop:'5px',marginTop:height}">
			<!-- #endif -->
			<!--#ifdef H5 -->
			<view class="u-flex u-col-center"
				style="height: 80rpx;width: 100%;background: #1296DB;position: fixed;z-index: 9;">
				<view class="u-flex-1 u-flex u-col-center u-row-center" @click="showPicker=true">
					<u-icon name="map" size="36" color="red" :label="selectCity" label-color="#fff"></u-icon>
				</view>
				<view class="u-flex-3">
					<u-search height="50" :action-style="{color:'#eee'}" @custom="toSearch"></u-search>
				</view>
			</view>
			<view class="category" style="top:80rpx">
				<u-tabs :list="categories" :current="current" @change="changeTabs" height="70" active-color="#1296db">
				</u-tabs>
			</view>
			<view style="margin-top:90rpx">
				<!--#endif-->
				<u-swiper :list="swipers" effect3d @click="swiperDetail"></u-swiper>
			</view>
			<u-notice-bar :mode="noticeList.length>1?'vertical':'horizontal'" :list="noticeList" speed="100"
				v-if="noticeList.length>0"></u-notice-bar>
			<view class="topic" v-if="categories.length>0">
				<u-section :title="'最新'+categories[current].name+'信息'" lineColor="#1296db" @click="toMore"></u-section>
			</view>
			<view class="bg-white u-m-20">
				<forum-list-card :forum="forum"></forum-list-card>
			</view>
			<u-loadmore :status="status" @loadmore="loadmore" />
			<u-picker mode="region" v-model="showPicker" :params="{province:true,city:true,area:false}"
				@confirm="chooseCity"></u-picker>
			<u-mask :show="showCity" :zoom="false" :duration="400" :custom-style="{background: 'rgba(0, 0, 0, 0.5)'}">
				<view class="warp">
					<view class="rect u-flex-col u-col-center u-row-around u-rela" style="border-radius: 20rpx;">
						<view class="u-tips-color" style="position: absolute;top: -60rpx;right: -60rpx;"
							@click="closeTip">
							<u-icon name="close-circle" size="70"></u-icon>
						</view>
						<view class="text-center">
							<text class="text-xxl text-bold text-red">公告</text>
							<view class="u-p-40 text-left">
								当前选择的城市：<text class="text-blue">{{selectCity}}</text>，<br />该站点即将开通！敬请期待···</view>
						</view>
						<u-button type="primary" shape="circle" size="mini" @click="apply">申请该城市代理权</u-button>
					</view>
				</view>
			</u-mask>
			<u-back-top :scroll-top="scrollTop"></u-back-top>

		</view>
</template>

<script>
	export default {
		data() {
			return {
				baseUrl: this.$u.http.config.baseUrl,
				noticeList: [],
				categories: [],
				swipers: [],
				forum: [],
				searchHeight: '',
				navbarHeight: '',
				height: '',//自定义导航栏（标题栏加状态栏）高度
				top: '',
				width: '',
				current: 0,
				page: 0,

				showPicker: false,
				showCity: false,
				selectCity: '徐州',
				status: 'loadmore',
				scrollTop: 0
			}
		},
		// #ifdef MP-WEIXIN
		created() {
			let mpMenu = uni.getMenuButtonBoundingClientRect()
			this.top = mpMenu.top + 'px'
			this.width = mpMenu.left + 'px'
			this.searchHeight = mpMenu.height + 'px'
			var info = uni.getSystemInfoSync()
			this.height = mpMenu.bottom + (mpMenu.top - info.statusBarHeight) + 'px'
			this.navbarHeight = mpMenu.height + (mpMenu.top - info.statusBarHeight) * 2 + 'px'
			if(info.system.indexOf('iOS') != -1){
				this.height = 44 + info.statusBarHeight + 'px'
				this.navbarHeight = '44px'
			}
		},
		// #endif
		async onLoad(e) {
			this.getData()
			if (this.vuex_token) {
				this.utils.unreadCount(1)
			}
		},
		onReachBottom() {
			if (this.status == 'loadmore') {
				this.status = 'loading'
			}
			if (this.status == 'nomore') return;
			this.page++;
			this.getData();
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods: {
			async getData() {
				const res = await this.$u.api.index({
					page: this.page,
					pid: this.categories.length == 0 ? 'hot' : this.categories[this.current].id
				})
				if (res.data.forum.length < 15) {
					this.status = 'nomore';
				}
				if (this.categories.length == 0) {
					this.noticeList = res.data.notice
					res.data.swiper.forEach(item => {
						item.image = this.$u.http.config.baseUrl + item.image
					})
					this.swipers = res.data.swiper
					this.categories = [{
						name: '推荐',
						id: 'hot'
					}, ...res.data.category, {
						name: '更多',
						id: 'more'
					}]
				}
				res.data.forum.forEach(item => {
					item.isLike = false
				})
				this.forum = [...this.forum, ...res.data.forum];
			},
			chooseCity(e) {
				if (e.city.value != '3203') {
					this.showCity = true
					this.selectCity = e.city.label
					if (e.city.label == '市辖区') {
						this.selectCity = e.province.label
					}
				}
			},
			apply() {
				uni.navigateTo({
					url: '../user/apply?city=' + this.selectCity
				})
			},
			changeTabs(index) {
				this.current = index;
				if (this.categories[index].id == 'more') {
					return uni.navigateTo({
						url: '../more/more'
					})
				}
				this.status = 'loadmore'
				this.page = 0;
				this.forum = [];
				this.getData();
			},
			toSearch(value) {
				uni.navigateTo({
					url: './search?keyword=' + value
				})
			},
			loadmore() {
				this.page++
				this.getData()
			},
			toMore() {
				uni.navigateTo({
					url: "../more/more?id=" + this.categories[this.current].id
				})
			},
			async swiperDetail(index) {
				const res = await this.$u.api.bannerCount({
					id: this.swipers[index].id
				})
				if (res.code == 1) {
					if (this.$u.test.isEmpty(this.swipers[index].url))
						return false;
					uni.navigateTo({
						url: '/pages/browser/browser?url=' + this.swipers[index].url
					})
				}
			},

			closeTip() {
				this.showCity = false
				this.selectCity = '徐州'
			},

		}
	}
</script>

<style>
	page {
		background: #f1f1f1;
	}

	.status-bar {
		position: fixed;
		width: 100%;
		display: flex;
		align-items: flex-end;
		background: #1296DB;
		z-index: 9;
	}

	.search-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.6);
	}

	.category {
		margin-bottom: 10rpx;
		z-index: 2;
		box-shadow: 0 10rpx 20rpx 0 rgba(0, 0, 0, 0.1);
		position: sticky;
	}

	.topic {
		border-radius: 20rpx;
		margin: 20rpx;
	}

	.warp {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.rect {
		width: 70%;
		height: 50%;
		background: #FFFFFF;
	}
</style>
