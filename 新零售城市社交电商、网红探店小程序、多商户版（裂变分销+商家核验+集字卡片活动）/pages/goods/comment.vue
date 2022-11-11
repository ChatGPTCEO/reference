<template>
	<view>
		<view class="" v-for="(item, index) in commentList" :key="item.id">
			<comment-item :src="item.avatar" :name="item.nickname" :rate="item.rate" :content="item.comment" :like-num="item.likeNum"
			 :is-like="item.isLike" :pics="item.pics" @like="getLike(index)">
			</comment-item>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				commentList: []
			};
		},
		onLoad(options) {
			this.id = options.id
			this.getComment();
		},
		methods: {
			// 点赞
			getLike(index) {
				this.commentList[index].isLike = !this.commentList[index].isLike;
				if (this.commentList[index].isLike == true) {
					this.commentList[index].likeNum++;
				} else {
					this.commentList[index].likeNum--;
				}
			},
			// 评论列表
			getComment() {
				this.$u.get(`/api/store/product/reply/lst/${this.id}`)
					.then(({
						data
					}) => {
						this.commentList = data.list
					})
			},
		}
	};
</script>

<style lang="scss">
</style>
