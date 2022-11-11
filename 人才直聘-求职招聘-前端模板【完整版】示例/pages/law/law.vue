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
			<view class="law">
				<view class="item" v-for="(item,index) in list" :key="index" @click="toDetail(item)">
					<view class="left">
						<text class="title">
							{{item.name}}
						</text>
						<text class="summary">
							{{item.summary}}
						</text>
					</view>
					<text class="yzb yzb-next"></text>
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
import { mapState, mapGetters } from 'vuex';
export default {
	computed: {
		...mapState(['forcedLogin']),
		...mapGetters(['hasLogin'])
	},
	data() {
		return {
			status: '',
			query: {
				page: 1,
				limit: 10,
				keyword: '',
				status: 'ENABLE'
			},
			banner: [],
			list: [],
			loadStatus: 'loading', //loading、fail、success

			searchValue: '',
			placeholder: '请输入关键词搜索相关内容'
		};
	},
	async onLoad(query) {
		console.log(query);
	},

	onShow() {
		this.getLawList();
	},

	onReachBottom() {
		this.getLawList('add');
	},

	onPullDownRefresh() {
		this.getLawList('refresh',true);
	},

	methods: {
		async getLawList(type='refresh',loadtop=false) {
			this.status = '请求中';
			if(type=='refresh'){
				this.query.page=1;
			}else{
				this.query.page++;
			}
			let res = await this.$apis.getLawList(this.query);
			if(res){
				this.loadStatus = 'success';
			}else{
				this.loadStatus = 'fail';
			}
			if(type=='refresh'){
				this.list=[];
			}
			if(loadtop){
				console.log("---loadtop---")
				uni.stopPullDownRefresh();
			}
			this.list = this.list.concat(res.data || []);
			console.log(this.list);
			this.changeStatus(res);
			
			
		},

		toDetail(item) {
			this.$mRouter.push({
				route: this.$mRoutesConfig.lawDetail,
				query: {
					id: item.id
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
				this.query.keyword = this.searchValue;
				this.getLawList();
			} else {
				this.cancelSearch();
			}
		},
		// 取消搜索
		cancelSearch() {
			this.searchValue = '';
			this.query.keyword = '';
			this.getLawList();
		}
	}
};
</script>

<style lang="scss">
.body {
	margin-top: 90upx;
	background-color: #ffffff;
}

.law{
	.item{
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 20upx;
		border-bottom: 10upx solid $uni-bg-color-grey;
		.left{
			display: flex;
			flex-direction: column;
		}
		.yzb-next{
			margin-left: 15upx;
			color: $font-color-999;
		}
		.title{
			font-size: $uni-font-size-lg;
			font-weight: bold;
		}
		.summary{
			font-size: $uni-font-size-sm;
			color: $uni-text-color-grey;
			
			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
	}
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
