<template>
	<view>
		<view class="u-p-20  u-flex" v-for="(item,index) in list" :key="index">
			<u-avatar  :src="item.avatar.indexOf('https')==-1?baseUrl+item.avatar:item.avatar"  size="80" v-if="key==3||key==4" @click="toUser(item.id)"></u-avatar>
			<view @click="toUser(item.id)" class="u-line-1 u-m-l-20 text-blue" v-if="key==3||key==4">{{item.nickname}}</view>
			<navigator :url="'../index/detail?id='+item.id" class="u-line-1 u-m-l-20 text-blue" v-else>{{item.content}}</navigator>
			<u-icon name="photo" color="green" v-if="item.images"></u-icon>
		</view>
		<u-empty src="/static/img/nodata.png" icon-size="500" v-if="list.length==0"></u-empty>
		<u-loadmore :status="status" @loadmore="loadmore"/>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseUrl: this.$u.http.config.baseUrl,
				key: null,
				list: [],
				page:0,
				status:'loadmore'
			}
		},
		onReachBottom() {
			if(this.status=='loadmore'){
				this.status='loading'
			}
			if(this.status=='nomore') return;
			this.page++
			this.getData()
		},

		async onLoad(e) {
			this.key = e.key
			this.getData()
			uni.setNavigationBarTitle({
				title: '我的' + ['收藏','点赞','评论','关注','粉丝'][this.key]
			})
		},

		methods: {
			async getData(){
				const res = await this.$u.api.getListData({
					page:this.page,
					key:this.key
				})
				if(res.data.length<20){
					this.status='nomore'
				}
				this.list = [...this.list,...res.data]
			},
			loadmore(){
				this.page++
				this.getData()
			},
			toUser(id){
				uni.navigateTo({
					url:'./detail?id='+id
				})
			}
			
		}
	}
</script>

