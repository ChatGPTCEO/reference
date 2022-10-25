<template>
	<view class="u-p-30">
		<block v-for="(item,index) in shares" :key="index">
			<view class="u-flex u-col-top u-border-bottom u-m-t-20">
				<u-avatar :src="item.avatar.indexOf('https')==-1?baseUrl+item.avatar:item.avatar" size="80"	:show-sex="item.gender==0?false:true" :sex-icon="item.gender==1?'man':'woman'" @click="toUser(item.user_id)"></u-avatar>
				<view class="u-flex-1 u-p-l-20">
					<view class="u-flex u-row-between ">
						<view>
							<view class="u-tips-color">{{item.nickname.substr(0,10)+(item.nickname.length>10?' ···':'')}}</view>
							<view class="u-font-sm u-light-color">{{$u.timeForm(item.updatetime)}}</view>
						</view>
						<u-icon name="more-dot-fill" class="u-p-20" @click="show=true;uid=item.user_id"></u-icon>
					</view>
					<navigator :url="'../index/detail?id='+item.id" class="u-line-3 u-m-b-30 u-p-t-30 u-font-lg" style="line-height: 50rpx;">{{item.content}}</navigator>
					<view class="u-flex" v-if="item.images">
					<u-lazy-load v-for="(v,k) in utils.strToarr(item.images)" :key="k"  class="u-m-r-10 u-flex-1" :image="v" :height="utils.strToarr(item.images).length==1?500:utils.strToarr(item.images).length==2?300:200" :loading-img="loadingImg" :error-img="errorImg" threshold="-500" border-radius="20" img-mode="aspectFill" @click="review(index,k)"></u-lazy-load>
					
					</view>
					<view class="u-p-t-30 u-p-b-30 u-flex u-light-color">
						<u-icon class="u-flex-1 " name="zhuanfa" label="分享" label-color="#c0c4cc" @click="share(item.content,item.id)"></u-icon>
						<view class="u-flex-1 u-flex u-row-around ">
							<u-icon name="heart" :color="item.isLike?'red':''" :label="item.likes?item.likes:'点赞'" label-color="#c0c4cc" @click="like(index)"></u-icon>
							<u-icon name="chat" :label="item.comments?item.comments:'评论'" label-color="#c0c4cc" @click="comment(item.id)"></u-icon>
						</view>
					</view>
				</view>
			</view>
		</block>
		<u-action-sheet :list="moreList" v-model="show" @click="choose"></u-action-sheet>
		<u-loadmore :status="status"></u-loadmore>
		<u-back-top :scroll-top="scrollTop" :duration="50"></u-back-top>
		<view class="add"  @click="toPublish">
			<u-icon name="plus-circle-fill" size="96" color="red"></u-icon>
		</view>
	</view>
</template>

<script>
	import {setClipboardData} from '@/common/clipboard'
	export default {
		data() {
			return {
				baseUrl: this.$u.http.config.baseUrl,
				loadingImg:'/static/img/loading.jpg',
				errorImg:'/static/img/err.png',
				scrollTop: 0,
				shares: [],
				moreList: [{
					text: '私信',
					color: 'blue'
				}, {
					text: '关注',
				}],
				show: false,
				status: 'loadmore',
				page: 0,
				uid: 0,
				refreshCount:0
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		async onPullDownRefresh() {
			const res = await this.$u.api.pullDown({page:this.refreshCount})
			this.shares = [...res.data,...this.shares]
			if(res.code==1){
				this.refreshCount++
				uni.stopPullDownRefresh()
			}
		},
		onReachBottom() {
			if (this.status == 'loadmore') {
				this.status = 'loading'
			}
			if (this.status == 'nomore') return;
			this.page++
			this.getData()
		},
		onLoad() {
				this.getData()
		},
		methods: {
			async getData() {
				const res = await this.$u.api.square({
					page: this.page
				})
				if (res.data.length < 10) {
					this.status = 'nomore'
				}
				res.data.forEach(item => {
					item.isLike = false;
				})
				this.shares = [...this.shares, ...res.data]
			},
			toUser(uid) {
				uni.navigateTo({
					url: '../user/detail?id=' + uid
				})
			},
			async like(index) { //点赞
				const params = {
					user_id: this.vuex_user.id,
					topic_id: this.shares[index].id,
					like: this.shares[index].isLike ? 0 : 1,
					type: 1
				}
				const res = await this.$u.api.like(params)
				this.shares[index].isLike = !this.shares[index].isLike;
				this.$u.toast(res.msg)
				if (this.shares[index].isLike) {
					this.shares[index].likes++;
				} else {
					this.shares[index].likes--;
				}
			},
			comment(id) {
				uni.navigateTo({
					url: '../index/detail?id=' + id
				})
			},
			async share(content,id) {
				const res = await setClipboardData(content.substr(0,20)+'··· http://m.xidicom.cn/pages/index/detail?id='+id);
				if (res != 'undefined') {
					this.$u.toast('分享链接已复制')
				}
			},
			async choose(index) {
				if (index == 0) {
					if (this.vuex_user.id == this.uid)
						return this.$u.toast('不能私信自己');
					return this.$u.toast('互关后方可私信');
					uni.navigateTo({
						url: '../message/send' + this.$u.queryParams({})
					})
				}
				if (index == 1) {
					if (this.vuex_user.id == this.uid)
						return this.$u.toast('不能关注自己')
					const param = {
						user_id: this.vuex_user.id,
						pid: this.uid,
						focus: 1,
						type: 0
					}
					const res = await this.$u.api.focus(param)
					this.$u.toast(res.msg)
				}
			},
			toPublish(){
				if(!this.vuex_token){
					return this.utils.isLogin()
				}
				uni.navigateTo({
					url:'../add/create?type=2'
				})
			},
			review(index, k) {
				uni.previewImage({
					current: k,
					urls: this.utils.strToarr(this.shares[index].images),
				})
			}
		}
	}
</script>
<style scoped>
	.add {
		position: fixed;
		bottom: 280rpx;
		right: 30rpx;
		border-radius: 50%;
		opacity: 0.8;
		z-index: 9;
	}
</style>
