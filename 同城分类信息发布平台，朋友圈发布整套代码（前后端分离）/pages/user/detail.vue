<template>
	<view>
		<!--#ifdef H5-->
		<view class="bg-gradual-blue">
			<!--#endif-->
			<!--#ifdef MP-WEIXIN-->
			<view :style="'margin-top:'+customBarH+';background: linear-gradient(90deg, #1296DB, #1cbbb4);color:#fff'">
				<view :style="'height:'+customBarH+';position: fixed;top: 0;width: 100%;z-index: 10;background:inherit'" class="u-flex u-col-bottom ">
					<view class="u-p-20" @click="back">
						<u-icon name="arrow-left" size="36"></u-icon>
					</view>
				</view>
				<!--#endif-->
				<view class="text-center u-p-60">
					<u-avatar :src="user.avatar?(user.avatar.indexOf('https')==-1?baseUrl+user.avatar:user.avatar):''" size="110" @click="reviewAvatar"></u-avatar>
					<view class="u-p-30 u-font-lg">{{user.nickname}}</view>
				</view>
			</view>

			  <!--#ifdef MP-WEIXIN -->
			<view class="utabs" :style="'top:'+customBarH">
				<!--#endif-->
				<!--#ifdef H5 -->
				<view class="utabs" style="top:0">
				<!--#endif-->
					<u-tabs :list="list" :current="current" :is-scroll="false" @change="tabsChange"></u-tabs>
				</view>
					<block v-for="(item,index) in content" :key="index" >
						<view class="u-p-30 u-border-bottom u-light-color">
							<u-icon name="clock" :label="$u.timeFormat(item.updatetime,'yyyy-mm-dd hh:MM')" label-color="#c0c4cc"></u-icon>
						</view>
					<navigator :url="'../index/detail?id='+item.id" class="u-main-color u-font-lg u-m-30 u-line-3">{{item.content}}</navigator>
						<view v-if="item.images" class="u-p-30">
							<view class="u-m-b-10" v-for="(v,k) in utils.strToarr(item.images)" :key="k"><u-lazy-load :image="v" :loading-img="loadingImg" :error-img="errorImg" threshold="-700" border-radius="20"></u-lazy-load>
							</view>
						</view>
					</block>
			<u-empty src="/static/img/nodata.png" icon-size="500" v-if="current==2||content.length==0"></u-empty>
			<u-loadmore :status="status" @loadmore="loadmore"/>
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
					name: '动态',
				}, {
					name: '帖子',
				}, {
					name: '文章',
				}],

				current: 0,
				user: {},
				content: [],
				page:0,
				id:0,
				read:0,
				status:'loadmore'
			}
		},

		onLoad(e) {
			this.id = e.id
			this.read=e.read
			this.getData()
		},
		onReachBottom() {
			if(this.status=='loadmore'){
				this.status='loading'
			}
			if(this.status=='nomore') return;
			this.page++
			this.getData()
		},

		methods: {
			async getData(){
				const params = {
					page:this.page,
					id:this.id,
					type:Math.abs(this.current-2)
				}
				if(this.read==1){
					params.read=this.read
					delete params.type
				}
				
				const res = await this.$u.api.userDetail(params)
				if(res.data.content.length<10){
					this.status='nomore'
				}
					this.user = res.data.user
					this.content = [...this.content,...res.data.content]
			},
			loadmore(){
				this.page++
				this.getData()
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			tabsChange(index) {
				this.current = index
				this.content=[]
				this.page=0
				this.status='loadmore'
				this.getData()
			},
			reviewAvatar(){
				uni.previewImage({
					current:0,
					urls:[this.baseUrl+this.user.avatar]
				})
			},
		}
	}
</script>

<style>
	.utabs {
		position: sticky;
		z-index: 10;
	}
</style>
