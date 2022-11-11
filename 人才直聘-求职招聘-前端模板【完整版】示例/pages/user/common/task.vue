<template>
	<yzb-page :loadStatus="loadStatus">
		<yzb-task  v-if="list.length>0" :list="list" @click="toDetail"></yzb-task>
		<m-empty-data v-else :coverUrl="no_order_1" noTxt="暂无记录"></m-empty-data>
		<view class="load-more-box">
			<uni-load-more v-if="status == '请求中'" status="正在加载..." :showIcon="true"></uni-load-more>
			<uni-load-more v-if="status == '没有更多'" status="没有更多了" :showIcon="false"></uni-load-more>
			<uni-load-more v-if="status == '暂无数据'" status="暂无数据" :showIcon="false"></uni-load-more>
			<uni-load-more v-if="status == '请求失败'" status="加载失败，点我重试" :showIcon="false" @click="reLoad"></uni-load-more>
		</view>
	</yzb-page>
</template>

<script>
import mEmptyData from '@/components/m-empty-data/m-empty-data.vue';
import yzbTask from '@/components/yzb/yzb-mytask.vue';
export default {
	components: {
		mEmptyData,
		yzbTask
	},
	data() {
		return {
			no_order_1: this.$mAssetsPath.no_order_1,
			list:[],
			status: '',
			query:{
				page: 1,
				limit: 10,
			},
			loadStatus:'loading',//loading、fail、success
		};
	},
	onLoad() {
		this.getApplyTaskList();
	},
	
	onReachBottom() {
		this.query.page++;
		this.getApplyTaskList();
	},
	
	onPullDownRefresh() {
		this.query.page=1;
		this.list=[];
		this.getApplyTaskList();
	},
	
	methods: {
		async getApplyTaskList() {
			this.status = '请求中';
			let res = await this.$apis.getApplyTaskList(this.query);
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
		
		toDetail(item) {
			console.log(item);
			this.$mRouter.push({
				route: this.$mRoutesConfig.taskDetail,
				query: {
					id: item.outtask.id
				}
			});
		},
	}
};
</script>

<style lang="scss" scoped>
	.content{
		background-color: #fff;
	}
</style>
