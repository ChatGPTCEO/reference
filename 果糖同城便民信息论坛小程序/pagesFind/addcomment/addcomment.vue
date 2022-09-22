<template>
	<view>
		<view class="combox">
			<view class="store">
				<u-image width="150rpx" height="150rpx" :src="store.cover_image"></u-image>
				<text class="name">{{store.name}}</text>
			</view>
			<view class="score">
				<text>综合评分：</text>
				<u-rate size="40" :count="count" v-model="form.score"></u-rate>
			</view>
			<view class="content">
				<text class="title">评论内容：</text>
				<u-input style="margin-top: 20rpx;" placeholder="请输入点评内容(不超过300字)" v-model="form.content"
					type="textarea" maxlength="300" :border="true" height="200" :auto-height="true" />
			</view>
			<view class="images">
				<u-upload width="160" height="160" :action="action" max-count="6" :file-list="imglist"
					@on-success="imgSuccess" @on-remove="imgRemove"></u-upload>
			</view>
		</view>
		<view style="height: 120rpx;"></view>
		<botbtn btntext="发布" @confirem="submit"></botbtn>
	</view>
</template>

<script>
	import {
		API_URL
	} from '@/env.js'
	import botbtn from '@/components/Botbtn/Botbtn.vue'
	export default {
		components: {
			botbtn,
		},
		data() {
			return {
				form: {
					images: '',
					score: 0,
					content: '',
					store_id: '',
				},
				store: {},
				count: 5,
				action: API_URL + '/addons/hicity/index/upload',
				imglist: [],
			};
		},
		onLoad(e) {
			let params = JSON.parse(decodeURIComponent(e.params));
			this.store = params;
			this.form.store_id = params.id;
		},
		methods: {
			imgRemove(index, lists, name) {
				let banner = [];
				lists.map((item) => {
					banner.push(item.response.data.url);
				})
				if (banner.length > 0) {
					this.form.images = banner.join(',');
				} else {
					this.form.images = '';
				}
			},
			imgSuccess(data, index, lists, name) {
				let banner = [];
				lists.map((item) => {
					banner.push(item.response.data.url);
				})
				if (banner.length > 0) {
					this.form.images = banner.join(',');
				}
			},
			submit() {
				if (this.form.store_id == '') {
					return this.$u.toast('请选择店铺');
				}
				if (this.form.score == 0) {
					return this.$u.toast('请先评分');
				}
				if (this.form.content == '') {
					return this.$u.toast('请输入评价内容');
				}
				uni.showLoading({
					title:'提交中'
				})
				this.$u.post('/addons/hicity/store/addComment', this.form).then(res => {
					uni.hideLoading();
					this.$u.toast('点评成功');
					setTimeout(() => {
						uni.navigateBack({

						})
					}, 1500)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.combox {
		margin: 20rpx;
		background-color: white;
		padding: 20rpx;

		.store {
			display: flex;
			flex-direction: row;
			align-items: center;

			.name {
				margin-left: 20rpx;
				font-size: 32rpx;
				color: #333333;
			}
		}

		.score {
			margin-top: 30rpx;
			margin-bottom: 30rpx;
			font-size: 30rpx;
		}

		.content {
			.title {
				font-size: 30rpx;
			}
		}

		.images {
			margin-top: 20rpx;

			.title {
				font-size: 30rpx;
			}
		}
	}
</style>
