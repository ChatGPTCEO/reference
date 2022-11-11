<template>
	<view class="content">
		<z-paging ref="paging" @query="queryList" :list.sync="dataList" :mounted-auto-call-reload="false"
			:refresher-angle-enable-change-continued="false" :touchmove-propagation-enabled="true"
			style="height: 100%;">
			<view slot="loading">
				<view class="ymref">
					<view class="">
						<u-loading mode="circle" color="#f44c01" size="80"></u-loading>
					</view>
				</view>
			</view>
			<view>
				<AskItem :askData="dataList"></AskItem>
			</view>
		</z-paging>
	</view>
</template>

<script>
	import AskItem from '@/components/askItem/askItem.vue';
	export default {
		components:{
			AskItem
		},
		data() {
			return {
				dataList: [],
				firstLoaded: false,
				search: {
					type: '1',
					page: 1,
				}
			}
		},
		props: {
			tabIndex: {
				type: Number,
				default: function() {
					return 0
				}
			},
			currentIndex: {
				type: Number,
				default: function() {
					return 0
				}
			},
			tabs: {
				type: Array,
				default: function() {
					return [];
				}
			},
		},
		watch: {
			currentIndex: {
				handler(newVal) {
					if (newVal === this.tabIndex) {
						this.search.type = this.tabs[this.tabIndex].type;
						//懒加载，当滑动到当前的item时，才去加载
						if (!this.firstLoaded) {
							// #ifdef MP-TOUTIAO
							setTimeout(() => {
								this.$refs.paging.reload();
							}, 10)
							// #endif
							// #ifndef MP-TOUTIAO
							this.$nextTick(() => {
								this.$refs.paging.reload();
							})
							// #endif
						}
					}
				},
				immediate: true
			},
		},
		methods: {
			queryList(pageNo, pageSize) {
				this.search.page = pageNo;
				this.$u.get('/addons/hicity/ask/list', this.search).then(res => {
					this.$refs.paging.complete(res)
					this.firstLoaded = true;
				}).catch(err => {
					this.$refs.paging.complete(false)
					this.firstLoaded = true;
				})
			},
			itemClick(item) {
				console.log('点击了', item.title);
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* 注意，1、父节点需要固定高度，z-paging的height:100%才会生效 */
	/* 注意，2、请确保z-paging与同级的其他view的总高度不得超过屏幕宽度，以避免超出屏幕高度时页面的滚动与z-paging内部的滚动冲突 */
	.content {
		height: 100%;
		/* 父节点建议开启flex布局 */
		display: flex;
		flex-direction: column;
	}
	.ymref {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 10;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: white;
	}
</style>
