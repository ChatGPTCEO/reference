<template>
	<view class="content">
		<button @click="toggleMask('show')">发布评论</button>
		<text>发布内容：</text>
		<text>{{commentContent}}</text>
		<ygc-comment ref="ygcComment" 
		    :placeholder="'发布评论'" 
			@pubComment="pubComment"></ygc-comment>
	</view>
</template>

<script>
	import ygcComment from '@/components/ygc-comment/ygc-comment.vue';
	export default {
		components: {
			ygcComment
		},
		data() {
			return {
				commentContent: ''
			}
		},
		onLoad() {
		},
		methods: {
			toggleMask(type) {
				this.$refs.ygcComment.toggleMask(type);
			},
			pubComment(commentContent1) {
				this.$refs.ygcComment.toggleMask();
				console.log(commentContent1);
				this.commentContent = commentContent1;
				this.$refs.ygcComment.content = '';
			}
		}
	}
</script>

<style>
	page, .content{
		height: 100%;
		width: 100%;
	}
</style>
