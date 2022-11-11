<template>
	<view>
		<div class="dis-wrap">
			<u-input placeholder="请输入话题名称" border="bottom" @change="getDisList" clearable>
				<div slot="prefix" class="dis-prefix-icon">#</div>
			</u-input>
		</div>
		<div style="color: #999;margin: 30rpx;">热议话题</div>
		<view class="discuss-item" @click="chooseDiscuss(item)" v-for="(item, index) in disList" :key="index">
			#{{ item.title}}#
		</view>
		<!-- 加载状态 -->
		<block v-if="disList.length === 0 && loadStatus == 'nomore'">
			<u-empty text="暂无话题" icon="/static/empty.png"></u-empty>
		</block>
		<block v-else>
			<view style="margin: 30rpx 0;">
				<u-loadmore :status="loadStatus" />
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				disList: [],
				loadStatus: 'loadmore',
				page: 1,
				topicId: ""
			};
		},
		onLoad(options) {
			this.topicId = options.topic_id;
			this.getDisList();
		},
		onReachBottom() {
			this.page++;
			this.getDisList();
		},
		methods: {
			getDisList(keyword) {
				this.loadStatus = "loading";

				let form = {
					page: this.page,
				};

				if (this.topicId) {
					form.topic_id = this.topicId
				}

				if (keyword) {
					form.keyword = keyword
				}

				this.$H.get('discuss/list', form).then(res => {
					this.disList = res.result.data;
					if (res.result.current_page === res.result.last_page || res.result.last_page === 0) {

						if (keyword) {
							this.disList.push({
								title: keyword
							})
						}

						this.loadStatus = 'nomore';
					} else {
						this.loadStatus = 'loadmore';
					}
				});
			},
			chooseDiscuss(e) {
				let pages = getCurrentPages(); //获取所有页面栈实例列表
				let nowPage = pages[pages.length - 1]; //当前页页面实例
				let prevPage = pages[pages.length - 2]; //上一页页面实例
				prevPage.$vm.form.discuss_id = e.id ? e.id : '';
				prevPage.$vm.form.discuss_title = e.title;
				prevPage.$vm.discussName = e.title;
				uni.navigateBack();
			}
		}
	};
</script>

<style lang="scss" scoped>
	.dis-wrap {
		margin: 30rpx;

		.dis-prefix-icon {
			color: #999;
			font-weight: bold;
			margin: 0 20rpx;
		}
	}

	.discuss-item {
		margin: 30rpx;
		font-weight: bold;
	}
</style>
