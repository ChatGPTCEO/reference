<template>
	<view class="u-p-30">
		<block v-for="(item,index) in list" :key="index">
			<view class="u-flex u-col-top u-p-b-30 u-p-t-20 u-border-bottom ">
				<u-avatar :src="item.avatar.indexOf('https')==-1?baseUrl+item.avatar:item.avatar"  @click="toUser(item.user_id)"></u-avatar>
				<view class="u-m-l-20" @click="toDetail(item.pid,item.topic_id,index)">
					<view :class="item.status==0?'text-bold':'u-tips-color'">
						<text style="color: #00557f;">{{item.nickname}}</text>
						<block v-if="item.type==0">
							关注了你
						</block>
						<block v-if="item.type==1">
							给你点赞了
						</block>
						<block v-if="item.type==2">
							收藏了你的帖子
						</block>
						<block v-if="item.type==3">
							给你评论了
						</block>
					</view>
					<view class="u-tips-color" v-if="item.content">
						{{item.content.substr(0,6)+(item.content.length>6?' ···':'')}}</view>
					<view class="u-light-color u-m-b-20">{{$u.timeForm(item.createtime)}} </view>
				</view>
			</view>
		</block>
		<u-loadmore :status="status" v-if="show"/>
		<view class="refresh text-center" @click="refresh" v-if="vuex_token">
			<u-icon name="reload" size="60" color="green" :class="isRefresh?'xuanzhuan':''"></u-icon>
			<view>刷新</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseUrl: this.$u.http.config.baseUrl,
				list: [],
				page: 0,
				status: 'loadmore',
				show:true,
				isRefresh:false
			}
		},
		async onLoad() {
			if(!this.vuex_token){
				return this.show=false
			}
			this.getData()
		},
		onShow() {
			this.setBadge()
		},
		onReachBottom() {
			if(this.status=='loadmore'){
				this.status='loading'
			}
			if (this.status=='nomore') return;
			this.page++
			this.getData()
		},
		async onPullDownRefresh() {
			this.list=[]
			this.page=0
			this.list = await this.utils.unreadCount(2)
			uni.stopPullDownRefresh()
		},
		methods: {
			async getData(type) {
				const res = await this.$u.api.message({page: this.page})
						if (res.data.length < 20) {
							this.status = 'nomore'
						}
						this.list = [...this.list, ...res.data]
			},
			setBadge() {
				if (getApp().globalData.unread == 0) {
					 uni.removeTabBarBadge({
						index: 3
					})
					return;
				}
				uni.setTabBarBadge({
				 index: 3,
					text:getApp().globalData.unread.toString()
				})
			},
			toUser(uid) {
				uni.navigateTo({
					url: '../user/detail?id=' + uid
				})
			},
			toDetail(pid, topic_id, index) {
				if (this.list[index].status == 0) {
					this.list[index].status = 1
					getApp().globalData.unread--
				}
				uni.navigateTo({
					url: pid ? ('../user/detail?read=1&id=' + pid) : ('../index/detail?read=1&id=' + topic_id+'&user_id='+this.list[index].user_id)
				})
			},
			 refresh(){
				this.status='loading'
				this.list=[]
				this.page=0
				this.isRefresh=true
				setTimeout(async ()=>{
					const res = await this.utils.unreadCount(2)
					if(res.length<20){
						this.status = 'nomore'
					}
					this.list = res
					this.isRefresh=false
				},1000)
			}
		}
	}
</script>

<style scoped>
.refresh{
	position: fixed;
	bottom: 120rpx;
	right: 40rpx;
	background: #F1F1F1;
	padding: 20rpx;
	border-radius: 20rpx;
	opacity: 0.8;
}
.xuanzhuan{
	animation: round .5s linear infinite;
}
@keyframes round{
	from{
		transform: rotate(0deg);
	}
	to{
		transform: rotate(360deg);
	}
}
</style>
