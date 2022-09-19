<template>
	<view>
		<u-collapse :item-style="itemStyle">
			<u-collapse-item  :title="item.head" v-for="(item, index) in itemList" :key="index">
				{{item.body}}
			</u-collapse-item>
		</u-collapse>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemList: [{
					head: "番职圈是什么？",
					body: "番职圈-为番职学生打造的社交圈子以及在线约拍平台。免费发布动态、约拍信息，分享大学校园生活，找到适合自己的约拍对象。",
				}, {
					head: "我不是模特，可以约拍吗？",
					body: "约拍上的模特，并不是专业模特的意思。在这里，任何想拍照的人都可以叫做模特，如果您想拍照，您可以在发布约拍需求时选择模特。",
					
				}, {
					head: "什么叫做互勉(互免)？",
					body: "互勉约拍，也叫互免约拍，是双方互相免费的意思。摄影师与模特双方以促进彼此的技能或者为出作品为目的，双方任何一方都不收取费用的约拍。",
					
				},
				{
					head:"我的联系方式会被别人看到吗？",
					body:"您的联系方式，只有您给某个人发送'约拍请求'后，对方才能查看您的联系方式。"
				},
				{
					head:"如何修改个人资料？",
					body:"进入个人中心，点击个人资料方可修改。"
				}
				
				
				
				],
				itemStyle:{
					marginLeft:'20rpx'
				}
			}
		}
	}
</script>

<style>
</style>
