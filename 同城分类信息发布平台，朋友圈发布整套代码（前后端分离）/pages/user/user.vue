<template>
	<view>
		<!--#ifdef H5-->
		<view style="background: linear-gradient(90deg, #1296DB, #1cbbb4);color:#fff">
			<!--#endif-->
			<!--#ifdef MP-WEIXIN-->
			<view :style="'margin-top:'+customBarH+';background-image: linear-gradient(90deg, #1296DB, #1cbbb4);color:#fff'">
				<view :style="'height:'+customBarH+';position: fixed;top: 0;width: 100%;z-index: 20;background:inherit;'">
				</view>
				<!--#endif-->
				<view class="u-flex u-p-40 ">
					<u-avatar :src="vuex_user.avatar?(vuex_user.avatar.indexOf('https')==-1?baseUrl+vuex_user.avatar:vuex_user.avatar):''" size="110" class="u-m-r-10" @click="vuex_token?profile():login()"></u-avatar>
					<view class="u-flex-1" v-if="vuex_token">
						<view class="u-p-b-10 u-font-lg">{{vuex_user.nickname}}</view>
						<text class="bg-gradual-purple username" v-if="vuex_user.username">{{vuex_user.username}}</text>
						<text class="u-font-10 bg-gradual-purple username" @click="showmodel=true" v-else>设置用户名</text>
					</view>
					<view class="u-flex-1" v-else @click="login">请登录</view>
					<navigator url="./setting" class="u-p-20">
						<u-icon name="setting" color="#ccc" size="36"></u-icon>
					</navigator>
				</view>
				<view class="u-flex u-p-30 text-center">
					<view class="u-flex-1" @click="toList(0)">
						<view class="u-font-xl text-bold">{{getCount(this.total, 2)}}</view>
						<view class="u-font-xs">收藏</view>
					</view>
					<view class="u-flex-1" @click="toList(1)">
						<view class="u-font-xl text-bold">{{getCount(this.total, 1)}}</view>
						<view class="u-font-xs">点赞</view>
					</view>
					<view class="u-flex-1" @click="toList(2)">
						<view class="u-font-xl text-bold">{{getCount(this.total, 3)}}</view>
						<view class="u-font-xs">评论</view>
					</view>
					<view class="u-flex-1" @click="toList(3)">
						<view class="u-font-xl text-bold">{{getCount(this.total, 0)}}</view>
						<view class="u-font-xs">关注</view>
					</view>
					<view class="u-flex-1" @click="toList(4)">
						<view class="u-font-xl text-bold">{{fans}}</view>
						<view class="u-font-xs">粉丝</view>
					</view>
				</view>
			</view>
			<!--#ifdef MP-WEIXIN -->
			<view class="utabs" :style="'top:'+customBarH">
				<!--#endif-->
				<!--#ifdef H5 -->
				<view class="utabs" style="top:0px">
					<!--#endif-->
					<u-tabs :list="list" :current="current" :is-scroll="false" :show-bar="false" @change="tabsChange">
					</u-tabs>
				</view>
				<block v-for="(item,index) in content" :key="index">
					<view class="u-flex u-row-between u-p-30">
						<u-icon name="clock" :label="$u.timeFormat(item.updatetime, 'yyyy-mm-dd hh:MM')" label-color="#c0c4cc" class=""></u-icon>
						<u-icon name="more-dot-fill" size="40" color="#999" @click="show=true;select_id=item.id"></u-icon>
					</view>
					<view class="u-main-color u-font-lg u-border-bottom ">
						<navigator :url="'../index/detail?id='+item.id" class="u-line-3 u-m-30">{{item.content}}</navigator>
						<view class="u-flex u-p-20"  v-if="item.images">
						<u-lazy-load  v-for="(pic,key) in utils.strToarr(item.images)" :key="key" :image="pic" :height="utils.strToarr(item.images).length==1?500:utils.strToarr(item.images).length==2?300:200" :loading-img="loadingImg" :error-img="errorImg" border-radius="20"  threshold="-500"  img-mode="aspectFill" @click="review(index,key)" class="u-m-r-10 u-flex-1"></u-lazy-load>
						</view>
					</view>
				</block>
				<u-empty src="/static/img/nodata.png" icon-size="500" v-if="current==2||content.length==0"></u-empty>
				<u-loadmore :status="status" @loadmore="loadmore" v-if="showloader" />
				<u-action-sheet :list="options" v-model="show" @click="operate"></u-action-sheet>
				<u-modal v-model="showmodel" :show-cancel-button="true" title="请输入用户名" @confirm="setUserName">
			<view class="u-p-20 "><u-input inputAlign="center" v-model="username" :focus="true" placeholder="用户名为字母或数字组合,作为登录账号"></u-input></view>
				</u-modal>
			</view>
</template>

<script>
	export default {
		data() {
			return {
				loadingImg:'/static/img/loading.jpg',
				errorImg:'/static/img/err.png',
				baseUrl: this.$u.http.config.baseUrl,
				customBarH: getApp().globalData.customBar + 'px',
				list: [{
					name: '我的动态',
				}, {
					name: '我的帖子',
				}, {
					name: '我的文章',
				}],
				options: [{
						text: '刷新',
						color: 'blue'
					},
					{
						text: '删除'
					}
				],
				current: 0,
				content: [],
				show: false,
				showmodel: false,
				showloader: true,
				select_id: null,
				username: '',
				page: 0,
				status: 'loadmore',
				total: [],
				fans: 0
			}
		},

		onLoad() {
			if (!this.vuex_token) return this.showloader = false;
			this.getData()
		},
		onReachBottom() {
			if (this.status == 'loadmore') {
				this.status = 'loading'
			}
			if (this.status == 'nomore') return;
			this.page++
			this.getData()
		},
	
		methods: {
			tabsChange(index) {
				this.current = index
				if (!this.vuex_token) return;
				this.page = 0
				this.content = []
				this.status = 'loadmore'
				this.getData()
			},
			loadmore() {
				this.page++
				this.getData()
			},
			async getData() {
				if (this.current == 2) return this.status = 'nomore';
				const res = await this.$u.api.user({
					page: this.page,
					type: Math.abs(this.current - 2)
				})
				if (this.page == 0 && this.current == 0) {
					this.total = res.data.total
					this.fans = res.data.fans
				}
				if (res.data.content.length < 10) {
					this.status = 'nomore'
				}
				this.content = [...this.content, ...res.data.content]
			},
			getCount(total, type) {
				const count = total.filter(val => {
					return val.type == type
				})
				if (type == 3) {
					var arr = [];
					var newarr = [];
					count.forEach((item, index) => {
						arr.push(item.topic_id)
					})
					arr.forEach(val => {
						if (newarr.indexOf(val) == -1) {
							newarr.push(val)
						}
					})
					return newarr.length
				}
				return count.length
			},

			async setUserName() {
				var test = this.$u.test.enOrNum(this.username) && this.$u.test.rangeLength(this.username, [6, 20])
				if (!test) return this.$u.toast('用户名只能是字母或数字，长度为6~20位');
				const res = await this.$u.api.username({
					username: this.username
				})
				if (res.code == 1) {
					this.utils.updateUser()
					uni.showToast({
						title: res.msg
					})
				}else{
					this.$u.toast(res.msg)
				}
			},
			async operate(index) {
				let res = {}
				const param = {
					id: this.select_id
				}
				if (index == 0) {
					res = await this.$u.api.refresh(param)
				}
				if (index == 1) {
					res = await this.$u.api.delete(param)
				}
				if (res.code == 1) {
					uni.showToast({
						title: res.msg
					})
					setTimeout(() => {
						this.page = 0
						this.content = []
						this.status = 'loadmore'
						this.getData()
					}, 1200)
				}else{
					this.$u.toast('操作失败，请重试！')
				}
				
			},
		
			toList(index) {
				uni.navigateTo({
					url: './list?key=' + index
				})
			},
			profile() {
				uni.navigateTo({
					url: './profile'
				})
			},
			toset() {
				uni.navigateTo({
					url: './setting'
				})
			},
			login() {
				// #ifdef H5 
				this.$u.route({
					url: 'pages/user/login'
				})
				// #endif
				// #ifdef MP-WEIXIN
				this.utils.mpLogin()
				// #endif
			},
			review(index, key) {
				uni.previewImage({
					current: key,
					urls: this.utils.strToarr(this.content[index].images),
				})
			}
		}
	}
</script>

<style>
	.username {
		border-radius: 20rpx;
		padding: 4rpx 10rpx;
		color: #DCDFE6;
	}

	.utabs {
		box-shadow: 0 10rpx 10rpx 0 rgba(0, 0, 0, 0.1);
		position: sticky;
		z-index: 20;
	}
	.options {
		position: absolute;
		right: 0;
		top: 40rpx;
		z-index: 1;
		width: 100rpx;
		box-sizing: border-box;
	}

</style>
