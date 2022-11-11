<template>
	<yzb-page :loadStatus="loadStatus">
		<view class="top">
			<uni-segmented-control :current="current" :values="items" :style-type="styleType" :active-color="activeColor" :normalColor="normalColor" @clickItem="onClickItem" />
		</view>
		<view class="body">
			<view class="item" v-for="(item, index) in list" :key="index">
				<view class="space-between item-top">
					<text v-if="item.type == 1">分享佣金收入</text>
					<text v-else-if="item.type == 2">用户提现支出</text>
					<text>
						<text v-if="item.sign == 0">-</text>
						<text v-else>+</text>
						{{ item.money }}元
					</text>
				</view>
				<view class="space-between item-bottom">
					<text>{{item.createTime}}</text>
					<text v-if="item.type==2">{{ item.content }}</text>
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
		console.log(options);
		if (options.type == 1) {
			this.current = 1;
			this.query.type = 1; //收入
		} else if (options.type == 2) {
			this.current = 2;
			this.query.type = 2; //支出
		}
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
			let res = await this.$apis.getFinanceList(this.query);
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

		onClickItem(item) {
			console.log(item);
			if (item.currentIndex == 0) {
				this.query.type = 0;
			} else if (item.currentIndex == 1) {
				this.query.type = 1;
			} else if (item.currentIndex == 2) {
				this.query.type = 2;
			}
			this.query.page = 1;
			this.list = [];
			this.getList(this.query);
		}
	}
};
</script>

<style lang="scss">
.top {
	position: fixed;
	width: 100%;
	top: 0;
	z-index: 9999;
	background-color: $uni-bg-color-grey;
	padding: 5upx 0;
}

.body {
	margin-top: 90upx;
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
