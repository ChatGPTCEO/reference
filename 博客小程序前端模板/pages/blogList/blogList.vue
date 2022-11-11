<!-- 滑动切换选项卡+吸顶演示(上一个tab数据不保留，滚动流畅) -->
<template>
	<view class="content">
		<z-paging ref="paging" refresher-only @onRefresh="onRefresh" :refresher-status.sync="refresherStatus"
			@scrolltolower="scrolltolower">
			<!-- 自定义下拉刷新view -->
			<custom-refresher slot="refresher" :status="refresherStatus"></custom-refresher>
			<view slot="top" class="search">
				<u-search placeholder="日照香炉生紫烟" :height="64" :searchIconSize="44" :showAction="false" :disabled="true"
					@click="searchClick">
				</u-search>
			</view>
			<view>
				<!-- 小程序中直接修改组件style为position: sticky;无效，需要在组件外层套一层view -->
				<view style="z-index: 100;position: sticky;top :0;">
					<tabs-view @change="tabsChange" :current="current" :items="tabList"></tabs-view>
				</view>
				<swiper class="swiper" :style="[{height:swiperHeight+'px'}]" :current="current"
					@animationfinish="animationfinish">
					<swiper-item class="swiper-item" v-for="(item, index) in typeList" :key="index">
						<sticky-swiper-next-item ref="swiperList" :tabIndex="index" :currentIndex="current"
							:objItem="item" @heightChanged="heightChanged">
						</sticky-swiper-next-item>
					</swiper-item>
				</swiper>
			</view>
		</z-paging>
	</view>
</template>

<script>
	import zPaging from '@/uni/z-paging/z-paging.vue'
	import customRefresher from '@/uni/custom-refresher/custom-refresher.vue'
	import stickySwiperNextItem from '@/uni/sticky-swiper-next-item/sticky-swiper-next-item.vue'
	import tabsView from "@/uni/tabs-view/tabs-view.vue"
	import blogApi from '@/api/blogApi.js'
	export default {
		components: {
			zPaging,
			customRefresher,
			stickySwiperNextItem,
			tabsView
		},
		data() {
			return {
				refresherStatus: 0,
				swiperHeight: 0,
				tabList: [],
				typeList: [],
				current: 0, // tabs组件的current值，表示当前活动的tab选项
			}
		},
		onLoad() {
			this.getTypeList()
		},
		methods: {
			searchClick() {
				uni.navigateTo({
					url: '/packageA/pages/search/search?type=0'
				})
			},
			async getTypeList() {
				let res = await blogApi.getBlogType()
				let data = res.data
				if (data && data.length > 0) {
					let arr = []
					for (let i in data) {
						arr.push(data[i].typeName)
					}
					this.typeList = res.data
					this.tabList = arr
				}
			},
			//tabs通知swiper切换
			tabsChange(index) {
				this._setCurrent(index);
			},
			//下拉刷新时，通知当前显示的列表进行reload操作
			onRefresh() {
				this.$refs.swiperList[this.current].reload(() => {
					this.$refs.paging.complete([]);
				});
			},
			//当滚动到底部时，通知当前显示的列表加载更多
			scrolltolower() {
				this.$refs.swiperList[this.current].doLoadMore();
			},
			// swiper滑动结束
			animationfinish(e) {
				let current = e.detail.current;
				this._setCurrent(current);
			},
			//设置swiper的高度
			heightChanged(height) {
				if (height === 0) {
					//默认swiper高度为屏幕可用高度-tabsView高度-slot="top"内view的高度
					height = uni.getSystemInfoSync().windowHeight - uni.upx2px(80);
				}
				this.swiperHeight = height;
			},
			_setCurrent(current) {
				if (current !== this.current) {
					//切换tab时，将上一个tab的数据清空
					this.$refs.swiperList[this.current].clear();
				}
				this.current = current;
			}
		}
	}
</script>

<style>
	.search {
		padding: 20rpx;
		background-color: #ffffff;
		width: calc(100vw - 40rpx);
		height: 64rpx;
	}

	.paging-content {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.swiper {
		height: 1000px;
	}
</style>
