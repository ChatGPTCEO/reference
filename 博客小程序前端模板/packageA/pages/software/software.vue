<template>
	<view>
		<navigationBar text="软件中心" backgroundColor="#5af" :back="true"></navigationBar>
		<loading v-if="loading"></loading>
		<view v-if="!loading">
			<u-notice-bar :text="text1" :fontSize="28" mode="closable"></u-notice-bar>
			<view class="index-search" style="position: relative;">
				<u-search placeholder="日照香炉生紫烟" :height="64" :searchIconSize="44" :showAction="false" v-model="keyword"
					@clear="clear" @search="search">
				</u-search>
			</view>
			<view class="waterfall-box h-flex-x h-flex-2">
				<view>
					<helangWaterfall v-for="(item,index) in leftList" :key="index" :params="item" tag="left"
						:index="index" @height="onHeight"></helangWaterfall>
				</view>
				<view>
					<helangWaterfall v-for="(item,index) in rightList" :key="index" :params="item" @height="onHeight"
						tag="right" :index="index"></helangWaterfall>
				</view>
			</view>
			<view class="load-txt">{{ajax.loadTxt}}</view>
		</view>
	</view>
</template>

<script>
	import softwareApi from '@/api/softwareApi.js'

	export default {
		data() {
			return {
				loading: false,
				text1: '所有软件基于百度网盘下载,点击复制链接下载即可~',
				leftHeight: 0,
				rightHeight: 0,
				leftList: [],
				rightList: [],
				keyword: "",
				ajax: {
					// 是否可以加载
					load: true,
					// 加载中提示文字
					loadTxt: '',
					// 每页的请求条件
					rows: 10,
					// 页码
					page: 1,
				}
			}
		},
		onReady() {
			this.loading = true
			this.getList();
			this.loading = false
		},
		// 触底触发
		onReachBottom() {
			this.getList();
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.refresh()
		},
		methods: {
			refresh() {
				this.ajax.page = 1;
				this.leftHeight = 0;
				this.rightHeight = 0;
				this.ajax.load = true;
				this.getList();
			},
			clear() {
				this.keyword = ''
				this.refresh()
			},
			search() {
				this.leftList = []
				this.rightList = []
				this.refresh()
			},
			toSearch() {
				uni.navigateTo({
					url: '/packageA/pages/search/search?type=2'
				})
			},
			// 监听高度变化
			onHeight(height, tag) {
				if (tag == 'left') {
					this.leftHeight += height;
				} else {
					this.rightHeight += height;
				}
			},
			// 组件点击事件
			onClick(index, tag) {
				// 对应的数据
				if (tag == 'left') {
					console.log(this.leftList[index]);
				} else {
					console.log(this.rightList[index]);
				}

			},
			// 获取数据
			async getList() {
				if (!this.ajax.load) {
					return;
				}
				this.ajax.load = false;
				this.ajax.loadTxt = '加载中';
				let param = {}
				if (this.keyword) {
					param.softwareName = this.keyword
				}
				let res = await softwareApi.softwarePage(this.ajax.page, param)
				this.addList(res.data.records)

			},
			addList(res) {
				if (!res || res.length < 1) {
					this.ajax.loadTxt = '没有更多了';
					return;
				}
				// 左右列表高度的差
				let differ = this.leftHeight - this.rightHeight;
				// 计算差值，用于确定优先插入那一边
				let differVal = 0;
				// 初始化左右列表的数据
				let i = differ > 0 ? 1 : 0;
				let [left, right] = [
					[],
					[]
				];
				// 获取插入的方向
				let getDirection = (index) => {
					/* 左侧高度大于右侧超过 600px 时，则前3条数据都插入到右边 */
					if (differ >= 600 && index < 3) {
						differVal = 1;
						return 'right';
					}

					/* 右侧高度大于左侧超过 600px 时，则前3条数据都插入到左边 */
					if (differ <= -600 && index < 3) {
						differVal = -1;
						return 'left';
					}

					/* 左侧高度大于右侧超过 350px 时，则前2条数据都插入到右边 */
					if (differ >= 350 && index < 2) {
						return 'right';
					}
					/* 右侧高度大于左侧超过 350px 时，则前2条数据都插入到左边 */
					if (differ <= -350 && index < 2) {
						differVal = -1;
						return 'left';
					}

					/* 当前数据序号为偶数时，则插入到左边 */
					if ((i + differVal) % 2 == 0) {
						return 'left';
					} else {
						/* 当前数据序号为奇数时，则插入到右边 */
						return 'right';
					}
				}
				// 将数据源分为左右两个列表，容错差值请自行根据项目中的数据情况调节
				res.forEach((item, index) => {
					if (getDirection(index) == 'left') {
						//console.log(`差值：${differ},方向：left，序号${index}`)
						left.push(item);
					} else {
						//console.log(`差值：${differ},方向：right，序号${index}`)
						right.push(item);
					}
					i++;
				});

				// 将左右列表的数据插入，第一页时则覆盖
				if (this.ajax.page == 1) {
					this.leftList = left;
					this.rightList = right;
					uni.stopPullDownRefresh();
				} else {
					this.leftList = [...this.leftList, ...left];
					this.rightList = [...this.rightList, ...right];
				}

				this.ajax.load = true;
				this.ajax.loadTxt = '上拉加载更多';
				this.ajax.page++;
			}
		}
	}
</script>
<style lang="scss" scoped>
	.waterfall-box {
		padding: 20rpx 10rpx;
		box-sizing: border-box;

		>view {
			padding: 0 10rpx;
		}
	}

	.h-flex-x {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: flex-start;
		align-content: flex-start;

		&.h-flex-2 {
			>view {
				width: 50%;
			}
		}
	}

	.load-txt {
		padding: 0 0 20rpx 0;
		text-align: center;
		color: #999;
		font-size: 24rpx;
	}
</style>
