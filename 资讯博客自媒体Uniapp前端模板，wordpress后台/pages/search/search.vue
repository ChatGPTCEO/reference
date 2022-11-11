<template>
	<view class="content">
		<view class="search-form-inner">
			<view class="search-box">
				<view class="search-icon"></view>
				<input :focus="true" @confirm="onSearchConfirm" @input="onSearchInput" class="input"
					confirmType="search" maxlength="maxLen" name="keyword" :placeholder="preKeyword||'搜素你感兴趣的'"
					placeholderClass="placeholder" type="text" :value="keyword"></input>
				<view @click="clean" class="delete-icon" v-if="keyword.length>0"></view>
			</view>
			<button class="search-btn" @tap="onSearchConfirm" v-if="keyword">搜索</button>
			<button @tap="onCancelBtnClick" class="search-btn" v-else>取消</button>
		</view>
		<view class="hit_search" v-if="searchViewVisible">
			<view class="section-title">
				搜索推荐
			</view>
			<view class="hit_words">
				<view @tap="searchStat(item.name)" class="relative" v-for="(item,index) in tags" :key="index">
					<view class="keywords">{{item.name}}</view>
				</view>
			</view>
		</view>
		<view class="resulut" v-if="!searchViewVisible">
			<view class="list-wrapper">
				<block v-for="(item,index) in posts" :key="index">
					<view @click="bindDetail(item.id)" class="item-container">
						<view class="source-top">
							<image alt class="logo" :src="item.category[0].cover" v-if="item.category[0].cover">
							</image>
							<view class="categoryName">{{item.category[0].name}}</view>
						</view>
						<view class="centent-box">
							<view class="text-box">
								<view class="title-box">
									<label class="title">{{item.title.rendered}}</label>
								</view>
								<view class="content text-overflow--2">
									{{item.excerpt.rendered}}
								</view>
							</view>
							<view class="pic-box" v-if="item.meta.thumbnail">
								<image alt class="_image" mode="aspectFill" :src="item.meta.thumbnail">
								</image>
							</view>
						</view>
						<view class="footer">
							<view class="time">{{item.date}}</view>
							<view class="circle" v-if="item.meta.views"></view>
							<view class="comment">{{item.meta.views}}阅读</view>
						</view>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	import API from '@/api/api.js'
	export default {
		data() {
			return {
				keyword: '',
				tags: [],
				posts: [],
				page: 1,
				preKeyword: '搜索你感兴趣的内容',
				searchViewVisible: true,
			}
		},
		onLoad() {
			this.getTags();
		},
		onReachBottom() {
			if (!this.isLastPage) {
				this.getPostsList({
					search: this.keyword,
					page: this.page
				})
			}
		},
		methods: {
			getTags: function(args) {
				API.getTags(args).then(res => {
						this.tags = this.tags.concat(res)
					})
					.catch(err => {})
			},
			onSearchInput: function(e) {
				this.keyword = e.detail.value
			},
			searchStat: function(keyword) {
				this.keyword = keyword;
				this.onSearchConfirm();
			},
			onSearchConfirm: function() {
				this.posts = [];
				this.page = 1;
				this.isLastPage = false;
				this.status = "loading";
				this.searchViewVisible = false;
				this.getPostsList({
					search: this.keyword,
					page: this.page
				})
			},
			getPostsList: function(args) {
				API.getPostsList(args).then(res => {
					if (res.length < 10) {
						this.isLastPage = true
						this.status = "nomore"
					}
					this.posts = this.posts.concat(res)
					this.page = this.page + 1
					this.isLoading = false
				}).catch(err => {
					console.log(err)
				})
			},
			clean: function() {
				this.keyword = '';
				this.posts = [];
				this.page = 1;
				this.isLastPage = false;
				this.status = "loading";
				this.searchViewVisible = true;
			},
			onCancelBtnClick: function() {
				uni.navigateBack({
					delta: 1
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.search-form-inner {
		position: fixed;
		left: 0;
		padding: 30rpx;
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		background-color: #fff;
		z-index: 11;

		.search-box {
			flex: 1;
			width: 550rpx;
			height: 60rpx;
			padding: 0 14rpx 0 30rpx;
			border-radius: 30rpx;
			display: flex;
			align-items: center;
			background-color: #f4f3f7;

			.search-icon {
				width: 28rpx;
				height: 28rpx;
				background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcBAMAAACAI8KnAAAAMFBMVEVHcEzPzNrPzNrOzdvPzNrPzNnOzNrNzf/PzdnPzNnPzNrPzNnW1tbPzNrT09PPzNmGgbnPAAAAD3RSTlMAbfce1uUoAqd3uUUGWws8T62yAAAAvklEQVQY02NgwASWS5W8JsN5Fv9BoBnKq9YHcz9dgHDl/0PARzCP9///L2JnEv3//wdLG/3/JA6kCvX/K4O4/f+1wao2/f8BJJn//xcAcxn//zdgYOD8/6UAzGX3/z+BgYELaiLIhgUMDKz/v0G5+f8DGBiY/v+Bcs//V0Dmvgdx0RSjGYVmEZoz0ByJ7gWwB8+BPPgRxftQQ7ihgQOVZocGnTw0PEABGzUZZFMAPHTZQYY4IIc+b8gGZC5QAQDBUYA46nAy4gAAAABJRU5ErkJggg==') no-repeat 0 0;
				background-size: contain;
				margin-right: 18rpx;
			}

			.delete-icon {
				width: 38rpx;
				height: 38rpx;
				background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAD6klEQVRYR8WXTWwbVRDH578fxLFoUSsoAloqhJDaQqE9UKLgrHnPiloKHOCQiiMCIY5UlRAFri2IAwKJEx9nEIdyoFSgyPvWm40VoQChtAeEeoj4DKAiNyjBsXcHvcqJvJtde50G9d28npn/b+fNm50Hus4L11mfNgQwOztrLy4u3kpEO4mobRjGwsLCwq8TExPhoC+UG0AptRPA01EUPU5EJQBGtxgza/FpwzDOMvNHQoif88D0BZiZmdm6vLx8koheJKJCnqBE9C8RvW3b9ulSqbTYy6cnQLVavRtAFcDunMIxM2b+xbKspxzH+SrLPxPAdd2HiOgcgO0bEe/yaRPRC0KID9PipALUarVdURR9R0TbrlH8qnunPg5LKavJeOsAlFIFZv4awL7NEF+NwcwNy7L2Oo7zW3fcNICXiej1hPgXzPwBEb0E4FAvMGbW+/0mgOeI6EjipLwvpXw+E2Bqampbu92eJ6ItCcdjUspPlFI3MvM0gPvTIDqZe0QI8Y9S6hgRfZyIExHRPinlD6vPYxnwPO84M7+VDM7M3xSLRTEyMnKlXq9vbzabARHtTQQ/H4ahMz4+3ugcXY+IDqaAnhJCvJYK4LpuDYCTkeK54eHhsobwff+WMAynieieju2Ppmk+7DjOnx3xGhEdyMjSRSnlfesAgiDY0mq1GkQ923M3xG1hGNZ1INM0R3VxdbbQzRJfFTVNc4eG1b/XtqBWq+2Pouh8jsqfsyxLjo2N/V2tVndblhWVy+WftHir1ZoCcG+OGAeFEHMxANd1jwL4PIezPtcXbdse0xDaXil1MzN7OcW1/2NSynMxAM/zHmXmqw/7LQ0AQFf7XxsEOCKl/DIGoJTSRfNtHvHVtw+C4M5ms4lKpTI/4BbsF0JciAF0KvuPPgBr++/7/kaLkIloq+4VMQD9w3VdndqsFtzzGA4NDY2Mjo5eznEMfSllObUPKKV0C9atOLZ0hysWi3KQRrS0tOQDeCAl1gkp5Vqzi3VCpdSeToHFph0iekIIcXZycvIm0zR14L6t2PO8J5n5TDcAM18pFAp36UylZqBT0fqj82yC/NMoit4FcBqAnhN6rZkoil4FcALA0YThSSHEG93P1n0NgyC4fWVl5ftNGESSkLrqHxRC6HFtbaUOJEqpUqexmP2OZZ7/mfmyaZoHdMdM2meOZJ7nPcPM7xGRlUcky0aLAzgshJhNs+k5lPq+f6jdbp8BcMdGIJh5npkrlUrlUpZ/3rH8FWY+DuCGnCB6n9+xbfvUNY3l3WJ5LiYA6gA+29SLSdob66tZo9HYYRjGLgAhgN//96tZztQPbNa3BgaOOKDDf+ESDj90wCYAAAAAAElFTkSuQmCC') no-repeat 0 0;
				background-size: contain;
				margin-right: 18rpx;
				z-index: 999;
			}


			.input {
				flex: 1;
				font-size: 28rpx;
				color: #252628;
			}

			.placeholder {
				font-size: 28rpx;
				color: #b7b5c2;
			}
		}

		.search-btn,
		.cancel-btn {
			width: 120rpx;
			height: 60rpx;
			margin-left: 30rpx;
			line-height: 60rpx;
			padding: 0;
			border: none;
			font-size: 28rpx;
			background: #fff;
			color: #434343;
		}

	}

	.hit_search {
		padding: 133rpx 32rpx 0;

		.hit_words,
		.relative {
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-start;
		}

		.keywords {
			color: #6b6a72;
			display: inline-block;
			background: #f4f3f7;
			border-radius: 100rpx;
			padding: 14rpx 33rpx;
			margin: 20rpx 20rpx 0 0;
			max-width: 260rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			font-size: 22rpx;
		}
	}

	.resulut {
		padding: 100rpx 0rpx;
	}
	.list-wrapper {
		padding: 0 30rpx;
	}
</style>
