<template>
	<yzb-page :loadStatus="loadStatus">
		<view class="body">
			<view class="title">
				<text class="name">{{task.name}}</text>
				<view class="info">
					<text class="label-close " v-if="task.status == 1">待开放</text>
					<text class="label" v-else-if="task.status == 2">已开放</text>
					<text class="label-close" v-else-if="task.status == 3">已关闭</text>
					<text class="label-close" v-else-if="task.status == 4">审核失败</text>
					<text class="label-type">{{ task.type }}</text>
					<text class="label-type">{{ task.number }}人报名</text>
				</view>
			</view>
			<view class="item">
				<text>预算金额</text>
				<text>￥{{task.money}}</text>
			</view>
			<view class="item">
				<text>发布日期</text>
				<text>{{task.createTime}}</text>
			</view>
			<view class="desc">
				<text class="desc-title">需求描述</text>
				<text class="desc-content">
					{{task.content}}
				</text>
			</view>
			<view class="sign-up">
				<view class="sign-title">
					<text>报名列表</text>
					<text>{{task.number}}人报名</text>
				</view>
				<view class="sign-list">
					<view class="sign-item" v-for="(item, index) in list" :key="index">
						<view class="head"><image :src="item.avatar"></image></view>
						<view class="right">
							<view class="space-between">
								<text class="nickname">{{item.username}}</text>
								<text class="create-time">{{item.createTime}}</text>
							</view>
							<view class="applys">
								<text class="">报价{{item.price}}元</text>
								<view class="height-line"></view>
								<text class="">工期{{item.timeLimit}}天</text>
								<view class="height-line"></view>
								<text>{{item.phone}}</text>
							</view>
						</view>
					</view>
					<view class="load-more-box">
						<uni-load-more v-if="status == '请求中'" status="正在加载..." :showIcon="true"></uni-load-more>
						<uni-load-more v-if="status == '没有更多'" status="没有更多了" :showIcon="false"></uni-load-more>
						<uni-load-more v-if="status == '暂无数据'" status="暂无数据" :showIcon="false"></uni-load-more>
						<uni-load-more v-if="status == '请求失败'" status="加载失败，点我重试" :showIcon="false" @click="reLoad"></uni-load-more>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom">
			<button class="edit" @click="toEdit">编辑</button>
			<button class="open-close" v-if="task.status==2" @click="toClose">关闭职位</button>
			<button class="close" v-else @click="toOpen">开放职位</button>
		</view>
	</yzb-page>
</template>

<script>
export default {
	data() {
		return {
			list: [],
			task:{},
			id:null,
			status: '',
			query:{
				page: 1,
				limit: 30,
			},
			loadStatus:'loading',//loading、fail、success
		};
	},
	
	onLoad(options) {
		console.log(options);
		this.id=options.id;
		this.getDetail(options.id);
		this.getApplyTaskList();
	},
	
	onReachBottom() {
		this.query.page++;
		this.getApplyTaskList();
	},
	
	methods: {
		async getDetail(id){
			let res = await this.$apis.getTaskDetail({ id: id });
			console.log('res====', res);
			if (res) {
				this.task=res;
				this.loadStatus='success';
			}else{
				this.loadStatus='fail';
			}
		},
		
		async getApplyTaskList() {
			this.status = '请求中';
			this.query.taskId=this.id;
			let res = await this.$apis.getApplyTaskList(this.query);
			if (res) {
				let data = res.data;
				this.list = this.list.concat(data || []);
				this.changeStatus(res);
			}else{
				this.loadStatus='fail';
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
		
		toEdit() {
			this.$mRouter.push({
				route: this.$mRoutesConfig.taskEdit,
				query: {
					id: this.id
				}
			});
		},
		async toOpen() {
			 // 1-待开放、2-已开放、3-已关闭、4-审核失败
			let param={
				id:this.id,
				status:2
			}
			let res = await this.$apis.updateTask(param);
			if(res){
				uni.showToast({
					icon:"none",
					title:'操作成功'
				})
				this.getDetail(this.id);
			}
		},

		async toClose() {
			let param={
				id:this.id,
				status:3
			}
			let res = await this.$apis.updateTask(param);
			if(res){
				uni.showToast({
					icon:"none",
					title:'操作成功'
				})
				this.getDetail(this.id);
			}
		}
	}
};
</script>

<style lang="scss">
.body {
	margin-bottom: 100upx;
	padding: 20upx;
	.title {
		padding-bottom: 20upx;
		border-bottom: 1upx solid $border-color-light;
		.name {
			font-weight: bold;
			font-size: $uni-font-size-lg;
		}
		.info {
			padding: 10upx 0;
			text {
				font-size: $uni-font-size-base;
				padding: 5upx 10upx;
				margin-right: 15upx;
				border-radius: 5upx;
			}
			.label-type {
				background-color: $border-color-base;
				color: $font-color-666;
			}
			.label {
				border: 1upx solid $font-color-orange;
				color: $font-color-orange;
			}
			.label-close {
				border: 1upx solid $font-color-999;
				color: $font-color-999;
			}
		}
	}

	.item {
		width: 100%;
		padding: 15upx 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1upx solid $border-color-light;

		text:first-child {
			font-weight: bold;
			font-size: $uni-font-size-lg;
		}
		text:nth-child(2) {
			font-size: $uni-font-size-lg;
			color: $font-color-orange;
		}
	}
	.desc {
		display: flex;
		flex-direction: column;
		padding: 15upx 0;
		.desc-title {
			font-weight: bold;
			font-size: $uni-font-size-lg;
		}
		.desc-content {
			padding: 10upx 0;
			color: $font-color-666;
		}
	}

	.sign-up {
		padding: 20upx 0;
		border-top: 1upx solid $border-color-light;
		.sign-title {
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1upx solid $border-color-light;
			text:first-child{
				padding: 30upx 0;
				font-size: $uni-font-size-lg;
				font-weight: bold;
			}
			text:last-child{
				padding: 30upx 0;
				font-size: $uni-font-size-base;
				font-weight: bold;
			}
		}
		.sign-list {
			margin-top: 20upx;
			display: flex;
			flex-direction: column;
			.sign-item {
				padding: 10upx 0;
				display: flex;
				flex-direction: row;
				align-items: center;
				border-bottom: 1upx solid $border-color-light;
				.head image {
					width: 120upx;
					height: 120upx;
					border-radius: 60upx;
					border: 1upx solid $border-color-light;
				}
				.right {
					padding: 0 20upx;
					width: 100%;
					.nickname {
						font-weight: bold;
						font-size: $uni-font-size-lg;
					}
					.create-time {
						color: $font-color-666;
					}
					.height-line {
						height: 20rpx;
						width: 4rpx;
						background-color: #cccccc;
						margin: 0 15rpx;
					}
					.applys {
						display: flex;
						flex-direction: row;
						align-items: center;
						color: $font-color-666;
					}
				}
				.space-between {
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-between;
				}
			}
		}
	}
}

.bottom {
	position: fixed;
	display: flex;
	flex-direction: row;
	bottom: 0;
	width: 100%;
	padding: 15upx 0;
	background-color: $bgcolor_white;
	border-top: 1upx solid $border-color-base;
	.edit {
		background-color: $bg-grey;
		width: 30%;
	}
	.open-close {
		background-color: $main-color;
		color: $font-color-white;
		width: 62%;
	}
	.close{
		background-color: $bg-grey;
		width: 62%;
	}
	button::after {
		border: none;
	}
}
</style>
