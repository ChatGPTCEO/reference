<template>
	<view>
		<block v-for="(item,index) in forum" :key="index">
			<navigator :url="'../index/detail?id='+item.id" hover-class="none"
				class="u-p-20 u-flex u-col-top u-border-bottom">
				<view @click.stop="toUser(item.user_id)">
					<u-avatar :src="item.avatar?(item.avatar.indexOf('https')==-1?baseUrl+item.avatar:item.avatar):''"
						size="mini"></u-avatar>
				</view>
				<view class="u-flex-1 u-p-l-20">
					<view class="u-flex u-col-bottom u-row-between">
						<view class="u-line-2 u-font-lg">{{item.content}}</view>
						<u-icon name="photo" color="green" v-if="item.images"></u-icon>
					</view>
					<view class="bottom u-m-t-30 u-flex u-row-between ">
						<view class="u-flex-2 u-light-color">
							<u-icon name="clock" label-color="#c0c4cc" :label="$u.timeForm(item.updatetime)"
								label-size="24"> </u-icon>
						</view>
						<view class="u-flex-1 u-flex u-row-between u-light-color">
							<view @click.stop="like(index)">
								<u-icon name="thumb-up" :label="item.likes==0?'点赞':item.likes"
									:color="item.isLike?'red':''" label-size="24" label-color="#c0c4cc"></u-icon>
							</view>
							<view @click.stop="comment(item.id)">
								<u-icon name="chat" :label="item.comments==0?'评论':item.comments" label-size="24"
									label-color="#c0c4cc"></u-icon>
							</view>
						</view>
					</view>
				</view>
			</navigator>
		</block>

	</view>
</template>

<script>
	export default {
		name: "forum-list-card",
		props: {
			forum: {
				type: Array,
				default () {
					return []
				}
			},


		},
		data() {
			return {
				baseUrl: this.$u.http.config.baseUrl,

			};
		},
	
		methods: {
			toUser(uid) {
				uni.navigateTo({
					url: '../user/detail?id=' + uid
				})
			},
			async like(index) {
				const params = {
					user_id: this.vuex_user.id,
					topic_id: this.forum[index].id,
					like: this.forum[index].isLike ? 0 : 1,
					type: 1
				}
				const res = await this.$u.api.like(params)
				this.$u.toast(res.msg)
				this.forum[index].isLike = !this.forum[index].isLike;
				if (this.forum[index].isLike) {
					this.forum[index].likes++;
				} else {
					this.forum[index].likes--;
				}
			},

			comment(id) {
				uni.navigateTo({
					url: '../index/detail?id=' + id
				})
			}
		}
	}
</script>

<style>

</style>
