<template>
	<view>
		<button @click="clickComment('1')">小心</button>
		<button @click="clickComment('2')">大呃呃</button>
		<qizai9527-input-comment
			:placeholder="placeholder" 
			:valueData="tmpCommentData" 
			:isShow="isShowComment" 
			:curKey="curCommentId"
			@submitComment="submitComment"  
			@clickOther="clickOther">
		</qizai9527-input-comment>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nameList:{
					1:'小心',
					2:'大呃呃',
					3:'小气鬼',
				},
				
				isShowComment:false,
				placeholder:"友善是交流的起点",
				tmpCommentData:[],
				curCommentId:"2",
			}
		},
		methods: {
			// 点击评论触发评论输入框
			clickComment(id){
				this.curCommentId = id;
				this.placeholder = "回复 "+ this.nameList[id] + "：";
				this.isShowComment=true;
			},
			// 提交评论并清除记忆
			submitComment(e){
				this.tmpCommentData[this.curCommentId] = '';
				this.isShowComment=false;
			},
			// 点击空白返回并保存记忆
			clickOther(e){
				this.tmpCommentData[this.curCommentId] = e;
				this.isShowComment=false;
			}
		}
	}
</script>

<style>
</style>
