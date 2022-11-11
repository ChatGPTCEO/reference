<template>
	<yzb-page :loadStatus="loadStatus">
		<view class="search">
			<view class="search-input">
				<text class="yzb yzb-search"></text>
				<input class="text-normal" type="text" :value="searchValue" :placeholder="placeholder" @input="searchInput" />
			</view>
			<view class="btn-cancel" @click="cancelSearch">清空</view>
		</view>
		<view class="body">
			<m-swiper :list="banner"></m-swiper>
			<yzb-course :list="list" @click="toDetail"></yzb-course>
			<view class="load-more-box">
				<uni-load-more v-if="status == '请求中'" status="正在加载..." :showIcon="true"></uni-load-more>
				<uni-load-more v-if="status == '没有更多'" status="没有更多了" :showIcon="false"></uni-load-more>
				<uni-load-more v-if="status == '暂无数据'" status="暂无数据" :showIcon="false"></uni-load-more>
				<uni-load-more v-if="status == '请求失败'" status="加载失败，点我重试" :showIcon="false" @click="reLoad"></uni-load-more>
			</view>
		</view>
	</yzb-page>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import mSwiper from '@/components/m-swiper/m-swiper2.vue';
import yzbCourse from '@/components/yzb/yzb-course.vue';
import mAd from '@/components/m-ad/m-ad.vue';
import yzbfilterDropdown from '@/components/yzb/yzb-filterDropdown.vue';
export default {
	components: {
		mSwiper,
		yzbCourse,
		mAd,
		yzbfilterDropdown
	},
	computed: {
		...mapState(['forcedLogin']),
		...mapGetters(['hasLogin'])
	},
	data() {
		return {
			status: '',
			query:{
				page: 1,
				limit: 10,
				keyword:'',
				status:'ENABLE',
			},
			banner: [],
			list:[],
			loadStatus:'loading',//loading、fail、success

			searchValue: '',
			placeholder: '请输入关键词搜索相关内容'
		};
	},
	async onLoad(query) {
		console.log(query);
		this.getBanners();
	},
	
	onShow() {
		this.query.page=1;
		this.list=[];
		this.getCourseList();
	},

	onReachBottom() {
		this.query.page++;
		this.getCourseList();
	},
	
	onPullDownRefresh() {
		this.query.page=1;
		this.list=[];
		this.getCourseList();
	},

	methods: {
		async getBanners() {
			let data = await this.$apis.getBanners({apId:2});
			if (data) {
				this.banner = data;
			}
		},
		
		async getCourseList() {
			this.status = '请求中';
			let res = await this.$apis.getCourseList(this.query);
			if (res) {
				let data = res.data;
				this.list = this.list.concat(data || []);
				this.changeStatus(res);
				this.loadStatus='success';
			}else{
				this.loadStatus='fail';
			}
			uni.stopPullDownRefresh();
		},
		
		toDetail(item){
			this.$mRouter.push({
				route: this.$mRoutesConfig.courseDetail,
				query: {
					id: item.id,
				}
			});
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

		searchInput(e) {
			this.searchValue = e.detail.value;
			console.log('searchInput', this.searchValue);
			if (this.searchValue) {
				this.query.page=1;
				this.query.keyword=this.searchValue;
				this.list=[];
				this.getCourseList();
			} else {
				this.cancelSearch();
			}
		},
		// 取消搜索
		cancelSearch() {
			this.searchValue = '';
			this.query.keyword='';
			this.query.page=1;
			this.list=[];
			this.getCourseList();
		}
	}
};
</script>

<style lang="scss">
.body {
	margin-top: 80upx;
	background-color: #ffffff;
}

.search {
	position: fixed;
	top: 0;
	z-index: 999;
	width: 100%;
	display: flex;
	height: 90upx;
	flex-direction: row;
	background-color: $main-color;
	color: #ffffff;
	align-items: center;
	justify-content: center;
	.yzb-search {
		color: $font-color-999;
		font-size: $uni-font-size-base;
		margin: 0 15upx;
		margin-top: 8upx;
	}
	.search-input {
		width: 77%;
		height: 65upx;
		line-height: 65upx;
		border-radius: 50upx;
		display: flex;
		flex-direction: row;
		background-color: #ffffff;
		align-items: center;
	}
	.search-input image {
		width: 35upx;
		height: 35upx;
		margin-right: 10upx;
	}
	.search-input input {
		width: 65%;
		font-size: 28upx;
		color: $font-color-333;
	}
	.btn-search {
		margin-left: 20upx;
	}
	
	.btn-cancel {
		margin-left: 20upx;
	}
}
</style>
