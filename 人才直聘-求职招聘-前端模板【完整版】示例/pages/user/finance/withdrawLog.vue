<template>
	<yzb-page :loadStatus="loadStatus">
		<view class="body">
			<view class="item" v-for="(item, index) in list" :key="index">
				<view class="space-between item-top">
					<text>用户提现</text>
					<text>
						{{ item.money }}元
					</text>
				</view>
				<view class="space-between item-bottom">
					<text>{{item.createTime}}</text>
					<text v-if="item.status==0" style="color: chocolate;">待审核</text>
					<text v-if="item.status==1" style="color: darkgreen;">审核通过</text>
					<text v-if="item.status==2" style="color: darkred;">审核失败：{{ item.reason }}</text>
				</view>
			</view>
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
export default {
	data() {
		return {
			items: ['全部', '收入记录', '提现记录'],
			current: 0,
			styleType: 'text',
			activeColor: '#12ae85',
			normalColor: '#666',
			list: [],
			query: {
				page: 1,
				limit: 10,
				type: 0
			},
			status:'',
			loadStatus: 'loading' //loading、fail、success
		};
	},
	onLoad(options) {
		this.getList();
	},
	onReachBottom() {
		this.query.page++;
		this.getList();
	},

	onPullDownRefresh() {
		this.query.page = 1;
		this.list = [];
		this.getList();
	},
	methods: {
		async getList() {
			// 提现状态:0-待审核，1-审核通过，2-审核失败
			let res = await this.$apis.getWithdrawList(this.query);
			console.log('res=====', res);
			if (res) {
				let data = res.data;
				this.list = this.list.concat(data || []);
				this.changeStatus(res);
				this.loadStatus = 'success';
			} else {
				this.loadStatus = 'fail';
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
			console.log('this.status', this.status);
		},
	}
};
</script>

<style lang="scss">
.body {
	padding: 20upx;
	width: 100%;
	box-sizing: border-box;
	.item {
		border-bottom: 1upx solid $border-color-light;
		padding: 15upx 0;
	}
	.space-between {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.item-top text {
		color: #000;
		font-size: 30upx;
	}
	.item-bottom {
		color: #666;
	}
}
</style>
