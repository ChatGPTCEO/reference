<template>
	<yzb-page :loadStatus="loadStatus">
		<view class="body" v-if="list.length>0">
			<yzb-course :list="list" @click="toDetail"></yzb-course>
			<view class="load-more-box">
				<uni-load-more v-if="status == '请求中'" status="正在加载..." :showIcon="true"></uni-load-more>
				<uni-load-more v-if="status == '没有更多'" status="没有更多了" :showIcon="false"></uni-load-more>
				<uni-load-more v-if="status == '暂无数据'" status="暂无数据" :showIcon="false"></uni-load-more>
				<uni-load-more v-if="status == '请求失败'" status="加载失败，点我重试" :showIcon="false" @click="reLoad"></uni-load-more>
			</view>
		</view>
		<m-empty-data v-else :coverUrl="no_order_1" noTxt="暂无记录"></m-empty-data>
	</yzb-page>
</template>

<script>
import yzbCourse from '@/components/yzb/yzb-mycourse.vue';
import mEmptyData from "@/components/m-empty-data/m-empty-data.vue"

export default {
	components: {
		yzbCourse,
		mEmptyData
	},
	data() {
		return {
			status: '',
			query:{
				page: 1,
				limit: 10,
				keyword:'',
			},
			banner: [],
			list:[],
			loadStatus:'loading',//loading、fail、success

			searchValue: '',
			placeholder: '请输入关键词搜索相关内容',
			no_order_1:this.$mAssetsPath.no_order_1,
		};
	},
	async onLoad(query) {
		console.log(query);
		this.getBanners();
	},
	
	onShow() {
		this.query.page=1;
		this.list=[];
		this.getApplyCourseList();
	},

	onReachBottom() {
		this.query.page++;
		this.getApplyCourseList();
	},
	
	onPullDownRefresh() {
		this.query.page=1;
		this.list=[];
		this.getApplyCourseList();
	},

	methods: {
		async getBanners() {
			let data = await this.$apis.getBanners({apId:2});
			if (data) {
				this.banner = data;
			}
		},
		
		async getApplyCourseList() {
			this.status = '请求中';
			let res = await this.$apis.getApplyCourseList(this.query);
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
					id: item.course.id,
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
				this.getApplyCourseList();
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
			this.getApplyCourseList();
		}
	}
};
</script>

<style lang="scss">
.body {
	background-color: #ffffff;
}
</style>
