<template>
	<yzb-page class="">
		<view class="top">
			<view class="search">
				<view class="search-input">
					<text class="yzb yzb-search"></text>
					<input class="text-normal" type="text" :value="searchValue" :placeholder="placeholder" @input="searchInput" />
				</view>
				<view class="btn-cancel" @click="cancelSearch">取消</view>
			</view>
			<yzbfilterDropdown
				:menuTop="0"
				:filterData="filterData"
				:defaultSelected="defaultSelected"
				:updateMenuName="true"
				@confirm="confirm"
				dataFormat="Object"
			></yzbfilterDropdown>
		</view>
		<view class="body">
			<m-position :positions="positionList" @click="positionDetail"></m-position>
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
import mSwiper from '@/components/m-swiper/m-swiper.vue';
import mPosition from '@/components/m-position/m-position.vue';
import mAd from '@/components/m-ad/m-ad.vue';
import yzbfilterDropdown from '@/components/yzb/yzb-filterDropdown.vue';
export default {
	components: {
		mSwiper,
		mPosition,
		mAd,
		yzbfilterDropdown
	}, 
	computed: {
		...mapState(['forcedLogin']),
		...mapGetters(['hasLogin'])
	},
	data() {
		return {
			positionList: [],
			status: '',
			page: 1,
			limit: 10,
			banner: [],
			grid: [],
			ka: [],
			adList: [],
			type:1,
			bgImg:"",
			
			searchValue: '',
			placeholder: '请输入关键词搜索相关内容',
			filterData: [
				{
					name: '职位筛选',
					type: 'hierarchy',
					children: []
				},
				{
					name: '行业筛选',
					type: 'hierarchy',
					children: []
				},
				{
					name: '薪资范围',
					type: 'hierarchy',
					children: [
						{
							name: '不限',
							_id: '不限'
						},
						{
							name: '面议',
							_id: '面议'
						},
						{
							name: '1-3K',
							_id: '1-3K'
						},
						{
							name: '3-5K',
							_id: '3-5K'
						},
						{
							name: '5-8K',
							_id: '5-8K'
						},
						{
							name: '8-12K',
							_id: '8-12K'
						},
						{
							name: '12-15K',
							_id: '12-15K'
						},
						{
							name: '15-20K',
							_id: '15-20K'
						},
						{
							name: '20K以上',
							_id: '20K以上'
						}
					]
				},
				{
					name: '企业性质',
					type: 'hierarchy', //filter
					children: [
						{
							name: '不限',
							_id: '不限'
						},
						{
							name: '外资企业',
							_id: '外资企业'
						},
						{
							name: '中外合资企业',
							_id: '中外合资企业'
						},
						{
							name: '私营/民营企业',
							_id: '私营/民营企业'
						},
						{
							name: '国有企业',
							_id: '国有企业'
						},
						{
							name: '国内上市公司',
							_id: '国内上市公司'
						},
						{
							name: '跨国公司',
							_id: '跨国公司'
						},
						{
							name: '政府/非盈利机构',
							_id: '政府/非盈利机构'
						},
						{
							name: '事业单位',
							_id: '事业单位'
						},
						{
							name: '其他',
							_id: '其他'
						}
					]
				}
			]
		};
	},
	async onLoad(query) {
		console.log(query);
		this.type=query.type;
		if(this.type==1){
			uni.setNavigationBarTitle({
				title:query.text
			})
			console.log(this.bgImg);
		}else if(this.type==2){
			uni.setNavigationBarTitle({
				title:"高薪优选"
			})
		}
		this.getPositionList();
	},
	
	onReachBottom() {
		this.page++;
		this.getPositionList();
	},
	
	methods: {
		
		async getPositionList() {
			let param = {
				page: this.page,
				limit: this.limit,
				type:this.type,
			};
			this.status = '请求中';
			let res = await this.$apis.getPositionList(param);
			if (res) {
				let data = res.data;
				for (let i in data) {
					if (data[i].skill) {
						data[i].skill = data[i].skill.split(',');
					}
				}
				this.positionList = this.positionList.concat(data || []);
				this.changeStatus(res);
			}
		},
		
		// 修改请求状态
		changeStatus(data) {
			if (this.positionList.length === 0) {
				this.status = '暂无数据';
			} else if (this.page >= Math.ceil(data.count / this.limit)) {
				this.status = '没有更多';
			} else {
				this.status = '请求更多';
			}
		},
		
		positionDetail(item) {
			this.$mRouter.push({
				route: this.$mRoutesConfig.positionDetail,
				query: {
					id: item.id
				}
			});
		},
		
		searchInput(e) {
			this.searchValue = e.detail.value;
			console.log('searchInput', this.searchValue);
			if (this.searchValue) {
			} else {
			}
		},
		// 取消搜索
		cancelSearch() {
			this.searchValue = '';
			// this.where = this.originWhere;
		}
	}
};
</script>

<style lang="scss" scoped>

.body {
	margin-top: 170upx;
}

.top {
	width: 100%;
	// height: 180upx;
	position: fixed;
	top: 0;
	z-index: 999;
	display: flex;
	flex-direction: column;
}

.search {
	width: 100%;
	display: flex;
	height: 90upx;
	z-index: 999;
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
.notice {
	width: 100%;
	// padding: 3%;
	margin-top: 20upx;
	padding: 20upx 0;
	background-color: #ffffff;
	.content {
		width: 90%;
		padding: 20upx 15upx;
		margin: 0 auto;
		border-radius: $uni-border-radius-lg;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		.notice-icon {
			color: $main-color;
			font-size: $font-size-36;
		}
		.notice-text {
			color: $font-color-light;
			text {
				color: $font-color-dark;
				font-weight: bold;
				padding: 0 15upx;
			}
		}
		.notice-next {
			font-size: $font-size-34;
			color: $font-color-light;
		}
	}
}

.post {
	margin-top: 2upx;
	background-color: #ffffff;
	padding: 20upx;
	.title {
		font-weight: bold;
		font-size: $uni-font-size-lg;
	}

	.post-list {
		overflow: hidden;
		white-space: nowrap;
		flex-wrap: wrap;
		width: 96%;
		padding: 2%;
	}
	.post-item {
		// background-color: #F7F7F7;
		border: 1upx solid $border-color-base;
		font-size: $uni-font-size-sm;
		float: left;
		width: 22%;
		padding: 15upx 0upx;
		border-radius: 8upx;
		margin-top: 20upx;
		text-align: center;
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
		width: 80%;
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
</style>
