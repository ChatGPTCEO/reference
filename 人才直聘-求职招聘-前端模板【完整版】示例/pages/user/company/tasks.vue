<template>
	<view class="content">
		<view class="QS-tabs-box">
			<uni-segmented-control :current="current" :values="items" :style-type="styleType" :active-color="activeColor" :normalColor="normalColor" @clickItem="onClickItem" />
		</view>
		<view class="body">
			<view class="list" v-if="list.length > 0">
				<view class="item" v-for="(item, index) in list" :key="index" @click="toDetail(item)">
					<view class="top">
						<text class="title">{{ item.name }}</text>
						<text class="price">￥{{ item.money }}</text>
					</view>
					<text class="desc">{{ item.content }}</text>
					<view class="bottom">
						<view>
							<!-- 启用状态: 1-待开放、2-已开放、3-已关闭、4-审核失败 -->
							<text class="label-close " v-if="item.status == 1">待开放</text>
							<text class="label" v-else-if="item.status == 2">已开放</text>
							<text class="label-close" v-else-if="item.status == 3">已关闭</text>
							<text class="label-close" v-else-if="item.status == 4">审核失败</text>
							<text class="label-type">{{ item.type }}</text>
							<text class="label-type">{{ item.number }}人报名</text>
						</view>
						<text class="time">{{formatCreateTime(item.createTime)}}</text>
					</view>
				</view>
				<view class="load-more-box">
					<uni-load-more v-if="status == '请求中'" status="正在加载..." :showIcon="true"></uni-load-more>
					<uni-load-more v-if="status == '没有更多'" status="没有更多了" :showIcon="false"></uni-load-more>
					<uni-load-more v-if="status == '暂无数据'" status="暂无数据" :showIcon="false"></uni-load-more>
					<uni-load-more v-if="status == '请求失败'" status="加载失败，点我重试" :showIcon="false" @click="reLoad"></uni-load-more>
				</view>
			</view>
			<template v-else>
				<m-empty-data :coverUrl="no_order_1" noTxt="空空如也"></m-empty-data>
			</template>
		</view>
		<view class="btn-row top-line"><button type="primary" class="btn-save" @tap="addNew()">发布外包任务</button></view>
	</view>
</template>

<script>
import QSTabs from '@/components/QS-tabs/QS-tabs.vue';
import mEmptyData from '@/components/m-empty-data/m-empty-data.vue';
import { formatDate } from '@/common/date';
const Sys = uni.getSystemInfoSync();
const wH = Sys.windowHeight;
let n = 1;

export default {
	components: {
		QSTabs,
		mEmptyData
	},
	data() {
		return {
			items: ['全部', '开放中', '待开放', '已关闭'],
			current: 0,
			styleType: 'text',
			activeColor: '#ffff',
			normalColor: '#f4f4f4',
			no_order_1: this.$mAssetsPath.no_order_1,
			query: {
				limit: 15,
				page: 1,
				status:0,
			},
			status: '',
			list: [],
			triggered: false
		};
	},
	onLoad() {
	},

	onShow() {
		this.list = [];
		this.initPage();
	},

	onPullDownRefresh() {
		this.loadTop();
	},
	onReachBottom() {
		this.loadBottom();
	},

	methods: {
		
		
		formatCreateTime(time) {
			if (time == null || time === '') {
				return null;
			}
			let str = time.replace(/-/g,'/');
			let date = new Date(str);
			return formatDate(date, 'yyyy-MM-dd');
		},
		
		onClickItem(item) {
			// 生效状态：1-待开放、2-已开放、3-已关闭、4-审核失败
			console.log('onClickItem', item);
			if (item.currentIndex == 0) {
				this.query.status=0;
			} else if (item.currentIndex == 1) {
				this.query.status=2;
			} else if (item.currentIndex == 2) {
				this.query.status=1;
			} else if (item.currentIndex == 3) {
				this.query.status=3;
			} else if (item.currentIndex == 4) {
				this.query.status=4;
			}
			this.list=[];
			this.initPage();
		},

		onRefresh() {
			this.triggered = false;
			console.log('onRefresh');
			if (this._freshing) return;
			// this._freshing = true;
			// setTimeout(() => {
			// 	this.triggered = false;
			// 	this._freshing = false;
			// }, 3000);
		},
		onRestore() {
			// this.triggered = 'restore'; // 需要重置
			this.triggered = false;
			console.log('onRestore');
		},
		change(index) {
			this.swiperCurrent = index;
		},
		transition({ detail: { dx } }) {
			this.$refs.tabs.setDx(dx);
		},
		animationfinish({ detail: { current } }) {
			this.$refs.tabs.setFinishCurrent(current);
			this.swiperCurrent = current;
			this.current = current;
		},

		addNew() {
			this.$mRouter.push({
				route: this.$mRoutesConfig.taskEdit
			});
		},

		toDetail(item) {
			console.log(item);
			this.$mRouter.push({
				route: this.$mRoutesConfig.taskPreview,
				query: {
					id: item.id
				}
			});
		},

		async initPage() {
			try {
				this.query.page = 1;
				let data = await this.$apis.getMyTaskList(this.query);
				this.list = this.list.concat(data.data || []);
				for (let i = 0; i < this.list.length; i++) {
					if (this.list[i].skill) {
						this.list[i].skill = this.list[i].skill.split(',');
					}
				}
				console.log(this.list);
				this.changeStatus(data);
				// this.joyPageStatus = 'success';
			} catch (e) {
				// this.joyPageStatus = 'fail';
			}
		},

		//下拉刷新操作
		async loadTop() {
			try {
				this.query.page = 1;
				let data = await this.$apis.getMyTaskList(this.query);
				setTimeout(() => {
					this.list = data.data || [];
					this.changeStatus(data);
					uni.stopPullDownRefresh();
				}, 500);
			} catch (e) {
				uni.stopPullDownRefresh();
			}
		},

		//上拉加载操作
		async loadBottom() {
			console.log('infiniteDisabled:', this.infiniteDisabled);
			if (this.infiniteDisabled) {
				return;
			}
			if (this.status == '请求失败') {
				this.reLoad();
				return;
			}
			try {
				this.query.page++;
				this.status = '请求中';
				let data = await this.$apis.getMyTaskList(this.query);
				this.list = this.list.concat(data.data || []);
				this.changeStatus(data);
			} catch (error) {
				this.status = '请求失败';
			}
		},

		// 网络错误 重新加载
		async reLoad() {
			try {
				if (this.query.page == 1) this.query.page++;
				this.status = '请求中';
				let data = await this.$apis.getMyTaskList(this.query);
				this.list = this.list.concat(data.data || []);
				this.changeStatus(data);
			} catch (error) {
				this.status = '请求失败';
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
		}
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
