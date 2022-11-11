<template>
	<yzb-page :loadStatus="loadStatus">
		<view class="QS-tabs-box">
			<uni-segmented-control :current="current" :values="items" :style-type="styleType" :active-color="activeColor" :normalColor="normalColor" @clickItem="onClickItem" />
		</view>
		<view class="body">
			<yzb-share  v-if="list.length>0" :list="list" @click="toDetail" @onDelete="toDelete"></yzb-share>
			<m-empty-data v-else :coverUrl="no_order_1" noTxt="暂无记录"></m-empty-data>
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
import QSTabs from '@/components/QS-tabs/QS-tabs.vue';
import mEmptyData from '@/components/m-empty-data/m-empty-data.vue';
import { formatDate } from '@/common/date';
import yzbShare from '@/components/yzb/yzb-share.vue';
const Sys = uni.getSystemInfoSync();
const wH = Sys.windowHeight;
let n = 1;

export default {
	components: {
		QSTabs,
		mEmptyData,
		yzbShare
	},
	data() {
		return {
			items: ['职位分享', '课程分享', '外包分享'],
			current: 0,
			styleType: 'text',
			activeColor: '#ffff',
			normalColor: '#f4f4f4',
			no_order_1: this.$mAssetsPath.no_order_1,
			query: {
				limit: 15,
				page: 1,
				type:0,
			},
			status: '',
			list: [],
			loadStatus:'loading',//loading、fail、success
		};
	},
	onLoad() {
		this.getList();
	},
	
	onReachBottom() {
		this.query.page++;
		this.getList();
	},

	methods: {
		async getList() {
			try {
				let res = await this.$apis.getShareList(this.query);
				console.log("getList==",res);
				if (res) {
					let data = res.data;
					this.list = this.list.concat(data || []);
					this.changeStatus(res);
					this.loadStatus='success';
				}else{
					this.loadStatus='fail';
				}
				uni.stopPullDownRefresh();
			} catch (e) {
			}
		},
		
		// 修改请求状态
		changeStatus(data) {
			if (this.list.length === 0) {
				this.status = '';
			} else if (this.query.page >= Math.ceil(data.count / this.query.limit)) {
				this.status = '没有更多';
			} else {
				this.status = '请求更多';
			}
		},
		
		formatCreateTime(time) {
			if (time == null || time === '') {
				return null;
			}
			let str = time.replace(/-/g,'/');
			let date = new Date(str);
			return formatDate(date, 'yyyy-MM-dd');
		},
		
		onClickItem(item) {
			// 生效状态：0-职位分享、1-课程分享、2-外包分享
			if (item.currentIndex == 0) {
				this.query.type=0;
			} else if (item.currentIndex == 1) {
				this.query.type=1;
			} else if (item.currentIndex == 2) {
				this.query.type=2;
			}
			this.query.page=1;
			this.list=[];
			this.getList();
		},
		
		
		toDetail(item) {
			console.log(item);
			if(item.type==0){
				this.$mRouter.push({
					route: this.$mRoutesConfig.positionDetail,
					query: {
						id: item.dataId
					}
				});
			}else if(item.type==1){
				this.$mRouter.push({
					route: this.$mRoutesConfig.courseDetail,
					query: {
						id: item.dataId
					}
				});
			}else if(item.type==2){
				this.$mRouter.push({
					route: this.$mRoutesConfig.taskDetail,
					query: {
						id: item.dataId
					}
				});
			}
		},
		
	}
};
</script>

<style scoped lang="scss">
.content {
	// height: 100vh;
}

.QS-tabs-box {
	position: fixed;
	width: 100%;
	// position: sticky;
	top: 0;
	z-index: 1000;
	background-color: $main-color;
}

.body{
	margin-top: 80upx;
	margin-bottom: 100upx;
}

.list {
	padding: 20upx;
	.item {
		padding: 10upx;
		border-bottom: 1upx solid $border-color-light;
	}
	.top {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 5upx 0;
		.title {
			font-size: $uni-font-size-lg;
			font-weight: bold;
		}
		.price {
			font-size: $uni-font-size-lg;
			color: $main-color;
		}
	}
	.desc {
		color: $font-color-666;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.bottom {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 10upx 0upx;
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
		.time {
			color: $font-color-666;
		}
	}
}

.btn-row {
	position: fixed;
	z-index: 999;
	bottom: 0upx;
	padding: 20upx 0;
	background-color: #ffffff;
	width: 100%;
	box-sizing: border-box;

	.btn-save {
		background-color: $main-color;
		height: 80upx;
		line-height: 80upx;
		font-size: $font-size-34;
		width: 90%;
	}
}
</style>
