<template>
	<view class="Qin-Question">
		<view class="qin_select">
			<input class="qin_input" placeholder="请输入搜索关键词" />
		</view>
		<view class="qin_header">
			<view>最新问答</view>
			<view>提问</view>
		</view>
		<view class="qin_content_list">
			<block v-for="(item, index) in dataList" :key="index">
				<qin-content :item="item" :index="index"></qin-content>
			</block>
		</view>
		<view class="qin_more">
			没有更多内容了...
		</view>
	</view>
</template>

<script>
	import qinContent from '@/components/qin_content/qin_content.vue'
	export default {
		name: 'Qin-Question',
		data() {
			return {
				dataList: [{
						id: 1,
						q_title: 'python3 字典合并问题?',
						q_count: 2,
						q_view: 898,
						q_tag: ['python'],
						is_solve: 1
					},
					{
						id: 2,
						q_title: '@FeignClient这个注解里面的name，全局都没有搜到，定义它有啥用，这个url有啥用啊？',
						q_count: 4,
						q_view: 1898,
						q_tag: ['springboot', 'java'],
						is_solve: 0
					},
					{
						id: 3,
						q_title: 'yarn install 一直处在Building fresh packages……waiting……？',
						q_count: 2,
						q_view: 2398,
						q_tag: ['yarm', '前端', 'javascript', 'node.js'],
						is_solve: 1
					},
					{
						id: 4,
						q_title: 'python3 字典合并问题?',
						q_count: 2,
						q_view: 898,
						q_tag: ['python'],
						is_solve: 0
					},
					{
						id: 5,
						q_title: '@FeignClient这个注解里面的name，全局都没有搜到，定义它有啥用，这个url有啥用啊？',
						q_count: 4,
						q_view: 1898,
						q_tag: ['springboot', 'java'],
						is_solve: 1
					},
					{
						id: 6,
						q_title: 'yarn install 一直处在Building fresh packages……waiting……？',
						q_count: 2,
						q_view: 2398,
						q_tag: ['yarm', '前端', 'javascript', 'node.js'],
						is_solve: 0
					},
					{
						id: 7,
						q_title: 'python3 字典合并问题?',
						q_count: 2,
						q_view: 898,
						q_tag: ['python'],
						is_solve: 0
					},
					{
						id: 8,
						q_title: '@FeignClient这个注解里面的name，全局都没有搜到，定义它有啥用，这个url有啥用啊？',
						q_count: 4,
						q_view: 1898,
						q_tag: ['springboot', 'java'],
						is_solve: 0
					},
					{
						id: 9,
						q_title: 'yarn install 一直处在Building fresh packages……waiting……？',
						q_count: 2,
						q_view: 2398,
						q_tag: ['yarm', '前端', 'javascript', 'node.js'],
						is_solve: 1
					}
				]
			}
		},
		components: {
			qinContent
		}
	}
</script>

<style scoped lang="less">
	.Qin-Question {
		.qin_more {
			margin: 20rpx 0;
			font-size: 20rpx;
			text-align: center;
			color: rgba(0, 0, 0, .55);
		}

		.qin_select {
			height: 80rpx;
			width: 100%;
			background-color: #fff;
			font-size: 30rpx;
			text-align: center;
			border: 1px solid rgba(0, 0, 0, .1)
		}

		.qin_input {
			height: 80rpx;
		}

		.uni-input-wrapper {
			align-items: center;
			justify-content: center;
		}

		.qin_header {
			margin-top: 30rpx;
			font-size: 35rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			& view {
				&:last-child {
					height: 70rpx;
					width: 130rpx;
					text-align: center;
					line-height: 70rpx;
					color: #fff;
					background-color: #00965e;
				}
			}
		}

		.qin_content_list {
			margin-top: 30rpx;
			background-color: #fff;
		}
	}
</style>
