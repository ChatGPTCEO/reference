<template>
	<view class="u-p-30">
		<view class="comment-top">
			<view class="top u-flex u-row-between u-border-bottom">
				<view class="u-flex" @click="toUser(detail.user_id)">
					<view class="u-m-r-20" v-if="detail.avatar">
						<u-avatar :src="detail.avatar.indexOf('https')==-1?baseUrl+detail.avatar:detail.avatar" ></u-avatar>
					</view>
					<view>
						<view class="u-line-1" style="max-width: 40vw">{{detail.nickname}}</view>
						<view class="u-font-sm u-light-color">{{$u.timeForm(detail.updatetime)}}</view>
					</view>
				</view>
				<view class="text-right">
					<u-button :type="isFocus?'':'primary'" size="mini" @click="focus">{{isFocus?'已关注':'关注'}}</u-button>
				</view>
			</view>
			<view class="text-lg u-main-color u-p-b-20 u-m-t-20" style="line-height: 60rpx;white-space:pre-wrap;">{{detail.content}}</u-parse>
			</view>
			<block v-if="detail.images">
				<view class="u-m-b-10" v-for="(item,index) in utils.strToarr(detail.images)" :key="index"><u-lazy-load :image="item" :loading-img="loadingImg" :error-img="errorImg" threshold="-700" border-radius="20"  @click="review(index)"></u-lazy-load>
				</view>
			</block>
			<view class="u-flex u-row-between u-p-t-20 text-lg u-tips-color">
				<view class="u-flex-1">
					<u-icon name="star" label="收藏" :color="isCollect?'red':''" @click="collect" v-if="detail.type==1"></u-icon>
					<u-icon name="eye" :label="detail.pv" class="u-m-l-20"></u-icon>
				</view>
				<view class="u-flex-1 u-flex u-row-around">
					<u-icon name="heart" :label="detail.likes?detail.likes:'点赞'" :color="isLike?'red':''" @click="like">
					</u-icon>
					<u-icon name="chat" :label="detail.comments?detail.comments:'评论'" @click="focused=true">
					</u-icon>
					<u-icon name="zhuanfa" label="分享" @click="share"></u-icon>
				</view>
			</view>
		</view>
		<view class=" u-p-t-60 u-m-b-80">
			<u-section :title="'评论区（'+detail.comments+'）'" lineColor="#128b80"></u-section>
			<view class="u-m-t-20">
				<block v-for="(item,index) in comments" :key="index">
					<view class="u-flex u-col-top u-p-20 u-border-bottom"
						@click="placeholder = '回复' + item.nickname;to_id = item.user_id;focused = true;">
						<view class="u-flex-col u-col-center" @click="toUser(item.user_id)">
							<u-avatar :src="item.avatar.indexOf('https')==-1?baseUrl+item.avatar:item.avatar" ></u-avatar>
							<text class="u-p-t-10 u-light-color">{{index+1}}楼</text>
						</view>
						<view class="u-p-l-20">
							<view class=" u-tips-color">{{item.user_id==detail.user_id?'楼主':item.nickname}}</view>
							<view class="u-light-color">{{$u.timeForm(item.createtime)}}</view>
							<view class="u-main-color u-p-t-10">
								<text v-if="item.to_id>0">回复<text
										class="text-blue">{{item.to_nickname}}</text>：</text>{{item.content}}
							</view>
						</view>
					</view>
				</block>
<u-loadmore :status="status" @loadmore="loadmore"/>
			</view>
		</view>
			
			<view class="phone-icon u-flex u-col-center u-row-center bg-gradual-blue u-m-t-30 " v-if="detail.show_mobile==2?true:(detail.show_mobile==1&&vuex_token)?true:false" @click="call">
				<u-icon name="phone" size="40"></u-icon>
				<view class="phone-out"></view>
			</view>
		<view class="bottom">
			<u-search 
			ref="comment"
			v-model="content" 
			cursor-spacing="10"
			confirm-type="send"
			search-icon="chat" 
			:placeholder="placeholder?placeholder:'在此输入评论'" 
			bg-color="rgba(255,255,255,0.5)" 
			border-color="#1296bd" 
			:show-action="true" 
			action-text="评论" 
			:input-style="{background:'transparent'}" 
			:focus="focused"
			:action-style="{borderRadius:'30rpx',background:'#1296DB',height:'60rpx',lineHeight:'60rpx',color:'white'}" 
			:animation="true" 
			@custom="comment"
			@search="comment">
			</u-search>
		</view>
	</view>
</template>

<script>
	import {
		setClipboardData
	} from '@/common/clipboard'
	export default {
		data() {
			return {
				baseUrl: this.$u.http.config.baseUrl,
				loadingImg:'/static/img/loading.jpg',
				errorImg:'/static/img/err.png',
				detail: {},
				comments: [],
				placeholder: '',
				to_id: 0,
				focused: false,
				isFocus: false,
				isCollect: false,
				isLike: false,
				page:0,
				id:0,
				read:0,
				user_id:0,
				status:'loadmore',
				content:'',
			}
		},
		
		async onLoad(e) {
			this.id=e.id
			this.read=e.read
			this.user_id=e.user_id
			await this.getData()
			// this.$u.mpShare.title=this.detail.content.substr(0,20)
			this.$u.mpShare = {
				title: this.detail.content.substr(0,50), 
				path: '', 
				
				imageUrl: this.detail.images?this.utils.strToarr(this.detail.images)[0]:''
			}
		},

		methods: {
			loadmore(){
				this.page++
				this.getData()
			},
			async getData(){
				const params = {
					page:this.page,
					id:this.id,
				}
				if(this.read==1){
					params.read = this.read
				}
				if(this.user_id>0){
					params.user_id = this.user_id
				}
				const res = await this.$u.api.forumDetail(params)
				if(this.page==0){
					this.detail = res.data.detail
				}
				if(res.data.comment.length<10){
					this.status='nomore'
				}
				this.comments = [...this.comments,...res.data.comment]
			},
			toUser(uid) {//去用户
				uni.navigateTo({
					url: "../user/detail?id=" + uid
				})
			},
		
			async focus() { //关注
				if (this.vuex_user.id == this.detail.user_id)
					return this.$u.toast('不能关注自己')
				const params = {
					user_id: this.vuex_user.id,
					pid: this.detail.user_id,
					focus: this.isFocus ? 0 : 1,
					type: 0
				}
				const res = await this.$u.api.focus(params)
				this.isFocus = !this.isFocus
				this.$u.toast(res.msg)
			},
			async like() { //点赞
				const params = {
					user_id: this.vuex_user.id,
					topic_id: this.detail.id,
					like: this.isLike ? 0 : 1,
					type: 1
				}
				const res = await this.$u.api.like(params)
				this.$u.toast(res.msg)
				this.isLike = !this.isLike
				if (this.isLike) {
					this.detail.likes++;
				} else {
					this.detail.likes--;
				}
			},

			async collect() { //收藏
				const params = {
					user_id: this.vuex_user.id,
					topic_id: this.detail.id,
					collect: this.isCollect?0:1,
					type:2
				}
				const res = await this.$u.api.collect(params)
				this.isCollect = !this.isCollect
				this.$u.toast(res.msg)
			},
		async share() {
			const res = await setClipboardData(this.detail.content.substr(0,20)+'··· http://m.xidicom.cn/pages/index/detail?id='+this.detail.id);
			if (res != 'undefined') {
				this.$u.toast('分享链接已复制')
			}
		},
			review(e) { //预览
				uni.previewImage({
					current: e,
					urls: this.utils.strToarr(this.detail.images),
					indicator: 'number',
					loop: true
				})
			},

			async comment(value) { //评论
				if (this.$u.test.isEmpty(value))
					return this.$u.toast('评论内容不能为空');
				const params = {
					user_id: this.vuex_user.id,
					topic_id: this.detail.id,
					content: value,
					type: 3,
				}
				if (this.to_id > 0) params.to_id = this.to_id;
				const res = await this.$u.api.comment(params)
				if (res.code==1) {
					uni.showToast({
						title: res.msg
					})
					setTimeout(()=>{
						this.$refs.comment.clear()
						this.page=0
						this.status='loadmore'
						this.comments=[]
						this.getData()
						uni.createSelectorQuery().select(".comment-top").boundingClientRect(res => {
							uni.pageScrollTo({
								scrollTop: res.height + 15,
							})
						}).exec()
					},1500)
				}
			},
			async call() {
				const phone = await this.$u.api.getMobile({
					id: this.detail.user_id
				})
				uni.makePhoneCall({
					phoneNumber: phone.data
				})
			},
		}
	}
</script>
<style lang="scss" scoped>
	
	.bottom {
		position: fixed;
		bottom: 10rpx;
		left: 30rpx;
		right: 30rpx;
	}

	.phone-icon {
		position: fixed;
		bottom: 10%;
		right: 30rpx;
		z-index: 9;
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}

	.phone-out {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		z-index: -1;
		position: absolute;
		top: calc(50% - 40rpx);
		right: calc(50% - 40rpx);
		animation: wave 2s linear 1s infinite;
		background: rgba(255, 0, 0, 0.6);
	}

	@keyframes wave {
		0% {
			transform: scale(1);
			opacity: 1;
		}

		100% {
			transform: scale(1.5);
			opacity: 0;
		}
	}
</style>
