<template>
	<view class="container" v-if="characterTag.length !== 0">
		<view class="label-data">
			<view class="label-title">性格标签</view>
			<view
				@tap="handleToolger"
				:class="'label-item ' + (item.select ? 'active' : '') + ' ptp_exposure'"
				:data-id="item.userTagId"
				:data-index="index"
				data-ptpid="e3eb-1a08-8d85-bfbc"
				:data-tag="characterTag"
				data-tagname="characterTag"
				v-for="(item, index) in characterTag"
				:key="item.userTagId"
			>
				{{ item.name }}
			</view>
		</view>
		<view class="label-data">
			<view class="label-title">技能标签</view>
			<view
				@tap="handleToolger"
				:class="'label-item ' + (item.select ? 'active' : '') + ' ptp_exposure'"
				:data-id="item.userTagId"
				:data-index="index"
				data-ptpid="773c-13d4-8d5d-b926"
				:data-tag="skillTag"
				data-tagname="skillTag"
				v-for="(item, index) in skillTag"
				:key="item.userTagId"
			>
				{{ item.name }}
			</view>
		</view>
		<view class="label-data">
			<view class="label-title">形象标签</view>
			<view
				@tap="handleToolger"
				:class="'label-item ' + (item.select ? 'active' : '') + ' ptp_exposure'"
				:data-id="item.userTagId"
				:data-index="index"
				data-ptpid="baad-1dcd-9190-ec2d"
				:data-tag="figureTag"
				data-tagname="figureTag"
				v-for="(item, index) in figureTag"
				:key="item.userTagId"
			>
				{{ item.name }}
			</view>
		</view>
		<view @tap="handleSaveResume" class="save-btn ptp_exposure" data-ptpid="88e2-1682-9af7-dc48">保存</view>
	</view>
</template>

<script>
var app = getApp();
export default {
	data() {
		return {
			characterTag: [
				{
					userTagId: 762,
					name: '吃苦耐劳',
					select: false
				},
				{
					userTagId: 761,
					name: '团队协作',
					select: false
				},
				{
					userTagId: 760,
					name: '内向安静',
					select: false
				},
				{
					userTagId: 759,
					name: '善于沟通',
					select: false
				},
				{
					userTagId: 758,
					name: '外向开朗',
					select: false
				},
				{
					userTagId: 756,
					name: '认真负责',
					select: false
				}
			],
			skillTag: [
				{
					userTagId: 799,
					name: '美食兼职',
					select: false
				},
				{
					userTagId: 773,
					name: '数理化',
					select: false
				},
				{
					userTagId: 772,
					name: '手绘',
					select: false
				},
				{
					userTagId: 771,
					name: '街舞',
					select: false
				},
				{
					userTagId: 770,
					name: '十佳歌手',
					select: false
				},
				{
					userTagId: 769,
					name: '乐器',
					select: false
				},
				{
					userTagId: 768,
					name: '游戏达人',
					select: false
				},
				{
					userTagId: 767,
					name: '英语',
					select: false
				},
				{
					userTagId: 766,
					name: '文笔出众',
					select: false
				},
				{
					userTagId: 765,
					name: '销售精英',
					select: false
				},
				{
					userTagId: 764,
					name: 'PS达人',
					select: false
				},
				{
					userTagId: 763,
					name: '摄影达人',
					select: false
				}
			],
			figureTag: [
				{
					userTagId: 776,
					name: '声音好听',
					select: false
				},
				{
					userTagId: 775,
					name: '模特身材',
					select: false
				},
				{
					userTagId: 774,
					name: '礼仪气质',
					select: false
				},
				{
					userTagId: 757,
					name: '颜值上镜',
					select: false
				}
			],
			tagIds: [],
			tags: '',
			isClick: true,
			d: ''
		};
	},
	onLoad: function() {
		this.initData();
	},
	methods: {
		initData: function() {},

		handleToolger: function(s) {},

		handleSaveResume: function() {}
	}
};
</script>
<style>
@import './labeldata.scss';
</style>
