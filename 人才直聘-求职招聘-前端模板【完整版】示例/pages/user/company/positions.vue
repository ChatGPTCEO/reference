<template>
	<view class="content">
		<view class="QS-tabs-box">
			<uni-segmented-control :current="current" :values="items" :style-type="styleType" :active-color="activeColor" :normalColor="normalColor" @clickItem="onClickItem" />
			<!-- <yzbfilterDropdown
				:menuTop="0"
				:filterData="filterData"
				:defaultSelected="defaultSelected"
				:updateMenuName="true"
				@confirm="confirm"
				dataFormat="Object"
			></yzbfilterDropdown> -->
		</view>
		<view class="body">
			<view class="scroll-items" v-if="list.length > 0">
				<view class="item bottom-line" v-for="(item2, index2) in list" :key="index2" @click="toDetail(item2)">
					<view class="title space-between">
						<text :class="true ? 'left' : 'left-close'">{{ item2.postName }}</text>
						<!-- 启用状态: 1-待开放、2-已开放、3-已关闭、4-审核失败 -->
						<text class="right" v-if="item2.status == 1">待开放</text>
						<text class="right-yellow" v-if="item2.status == 2">已开放</text>
						<text class="right" v-if="item2.status == 3">已关闭</text>
						<text class="right" v-if="item2.status == 4">审核失败</text>
					</view>
					<view class="company">
						{{ item2.expRequire }}
						<view class="height-line"></view>
						{{ item2.minEducation }}
						<view class="height-line"></view>
						{{ item2.salary }}
					</view>
					<view class="desc">
						<!-- <text class="position-type" v-if="item2.positionType == 1">普通职位</text> -->
						<text class="position-type" v-if="item2.positionType == 2">灵活用工</text>
						<text class="position-type2" v-if="item2.positionType == 3">共享用工</text>
						<text class="position-type3" v-if="item2.shareMoney >0 ">佣金¥{{item2.shareMoney}}</text>
						<text v-for="(item3, index3) in item2.skill" :key="index3">{{ item3 }}</text>
					</view>
					<view class="company" v-if="item2.positionType==3">
						空闲{{ item2.shareNumber }}人
						<view class="height-line"></view>
						{{ formatCreateTime(item2.startDate) }}-{{ formatCreateTime(item2.endDate) }}
						<view class="height-line"></view>
						最多{{ item2.workDays }}天
					</view>
				</view>
			</view>
			<template v-else>
				<m-empty-data :coverUrl="no_order_1" noTxt="空空如也"></m-empty-data>
			</template>
		</view>
		<view class="btn-row top-line"><button type="primary" class="btn-save" @tap="addNew()">发布新职位</button></view>
	</view>
</template>

<script>
import QSTabs from '@/components/QS-tabs/QS-tabs.vue';
import mEmptyData from '@/components/m-empty-data/m-empty-data.vue';
import yzbfilterDropdown from '@/components/yzb/yzb-filterDropdown2.vue';
import { formatDate } from '@/common/date';
const Sys = uni.getSystemInfoSync();
const wH = Sys.windowHeight;
let n = 1;

export default {
	components: {
		QSTabs,
		mEmptyData,
		yzbfilterDropdown
	},
	data() {
		return {
			items: ['全部', '开放中', '待开放', '已关闭'],
			current: 0,
			styleType: 'text',
			activeColor: '#ffff',
			normalColor: '#f4f4f4',

			no_order_1: this.$mAssetsPath.no_order_1,

			status: '',
			query: {
				limit: 10,
				page: 1,
				status: 0,
				positionType: 0
			},
			list: [],
			triggered: false,

			filterData: [
				{
					name: '职位状态',
					type: 'hierarchy',
					children: [
						{
							name: '全部',
							id: 0
						},
						{
							name: '已开放',
							id: 2
						},
						{
							name: '待开放',
							id: 1
						},
						{
							name: '已关闭',
							id: 3
						}
					]
				},
				{
					name: '职位类型',
					type: 'hierarchy', //filter
					children: [
						{
							name: '全部',
							id: 0
						},
						{
							name: '普通职位',
							id: 1
						},
						{
							name: '灵活用工',
							id: 2
						},
						{
							name: '共享用工',
							id: 3
						}
					]
				}
			]
		};
	},
	onLoad() {},

	onShow() {
		this.getList('refresh');
	},

	onPullDownRefresh() {
		this.getList('refresh',true);
	},
	onReachBottom() {
		this.getList('add');
	},

	methods: {
		confirm(options) {
			console.log('--confirm--', options);
			if (options.value[0][0] != null) {
				this.query.status = options.value[0][0];
			}
			if (options.value[1][0] != null) {
				this.query.positionType = options.value[1][0];
			}
			this.getList('refresh');
		},

		onClickItem(item) {
			// 生效状态：1-待开放、2-已开放、3-已关闭、4-审核失败
			console.log('onClickItem', item);
			if(item.currentIndex==0){
				this.query.status=0;
			}else if(item.currentIndex==1){
				this.query.status=2;
			}else if(item.currentIndex==2){
				this.query.status=1;
			}else if(item.currentIndex==3){
				this.query.status=3;
			}
			this.getList('refresh');
		},

		addNew() {
			this.$mRouter.push({
				route: this.$mRoutesConfig.positionEdit
			});
		},

		toDetail(item) {
			this.$mRouter.push({
				route: this.$mRoutesConfig.positionPreview,
				query: {
					id: item.id
				}
			});
		},

		async getList(type = 'refresh',loadtop=false) {
			try {
				if(type=='refresh'){
					this.query.page=1;
				}else{
					this.query.page++;
				}
				let data = await this.$apis.getCompanyPositionList(this.query);
				if(type=='refresh'){
					this.list=[];
				}
				if(loadtop){
					uni.stopPullDownRefresh();
				}
				this.list = this.list.concat(data.data || []);
				for (let i = 0; i < this.list.length; i++) {
					if (this.list[i].skill) {
						this.list[i].skill = this.list[i].skill.split(',');
					}
				}
				console.log(this.list);
				this.changeStatus(data);
			} catch (e) {}
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
		formatCreateTime(time) {
			if (time == null || time === '') {
				return null;
			}
			let str = time.replace(/-/g,'/');
			let date = new Date(str);
			return formatDate(date, 'MM月dd日');
		}
	}
};
</script>

<style scoped lang="scss">
.content {
	// height: 100vh;
}
.body {
	margin-bottom: 110upx;
	margin-top: 80upx;
}
.QS-tabs-box {
	position: fixed;
	width: 100%;
	top: 0;
	z-index: 1000;
	background-color: $main-color;
}
.swiper-item {
	background-color: #fff;
}
.scroll-items {
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 10upx 20rpx;
	box-sizing: border-box;
	.item {
		padding: 20upx;
	}
}
.scroll-item {
	margin-top: 15rpx;
	padding: 25rpx;
	background-color: white;
	border-radius: 8rpx;
	width: 100%;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	/* border: 1px solid #f8f8f8; */
}
.space-between {
	display: flex;
	justify-content: space-between;
	flex-direction: row;
}
.title {
	.left {
		font-weight: bold;
		font-size: $uni-font-size-lg;
	}
	.left-close {
		font-weight: bold;
		color: $font-color-999;
		font-size: $uni-font-size-lg;
	}
	.right {
		color: $font-color-999;
		font-weight: bold;
	}
	.right-yellow {
		color: $main-color;
		font-weight: bold;
	}
}

.company {
	color: $font-color-666;
	margin-top: 5upx;
	font-size: $uni-font-size-base;
	display: flex;
	flex-direction: row;
	align-items: center;
	.height-line {
		height: 20upx;
		width: 4upx;
		background-color: $font-color-ccc;
		margin: 0 15upx;
	}
}
.desc {
	margin: 10upx 0;
	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;
	align-content: flex-start;
	flex-direction: row;
	justify-content: flex-start;
	text {
		font-size: $uni-font-size-base;
		padding: 0upx 10upx;
		margin-right: 15upx;
		margin-bottom: 8upx;
		background-color: $border-color-base;
		border-radius: 5upx;
		color: $font-color-666;
	}
	.position-type {
		border: $main-color 1upx solid;
		background-color: #fff;
		color: $main-color;
	}
	.position-type2 {
		border: $uni-color-success 1upx solid;
		background-color: #fff;
		color: $uni-color-success;
	}
	.position-type3 {
		border: $uni-color-primary 1upx solid;
		background-color: #fff;
		color: $uni-color-primary;
	}
}

.user {
	margin-top: 35upx;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	image {
		width: 60upx;
		height: 60upx;
	}
	.left {
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: $uni-font-size-base;
		.name {
			margin: 0 20upx;
		}
		.post {
			// color: $font-color-666;
		}
	}
	.right {
		display: flex;
		flex-direction: row;
		align-items: center;
		color: $font-color-666;
		font-size: $uni-font-size-base;
		.area {
			margin-right: 15upx;
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
