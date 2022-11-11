<template>
	<view class="body_big">
		<!-- 轮播1 -->
		<view class="wrap">
			<u-swiper :list="listdatalunbo" name="url" img-mode ="scaleToFill"></u-swiper>
		</view>
		<!-- 快讯 -->
		<view class="kuanxidiv" @click="lookclick" v-if="listdatakx.title">
			<view>
				<image src="../../static/uview/example/kuanxun.png" mode="aspectFit"></image>
				<text>{{listdatakx.title}}</text>
			</view>
			<view>
				<text style="color:#999;padding-right: 10rpx;">查看</text>
				<u-icon name="arrow-right" size="30" color="#999"></u-icon>
			</view>
		</view>
		<view class="zixun" @click="lookclick2" v-if="listdataxc.url">
			<image :src="listdataxc.url" mode="aspectFit"></image>		
		</view>
		<!-- 恢复动作推荐 -->
		<view class="recovery">
			<view class="" @click="sectionclick">
				<u-section title="恢复动作推荐" sub-title="查看更多" line-color="#2175F6" font-size="30"></u-section>
			</view>
			<view class="recoverylist" v-for="(item,index) in listdatahf" :key="index" @click="ldxxqclick(index,item.id)">
				<view class="imgview">
					<image :src="item.ioc" mode="scaleToFill"></image>
				</view>
				<view class="textview">
					<p>{{item.title}}</p>
					<p>{{item.name}}</p>
				</view>			
			</view>
		</view>
		<view style="width: 100%;background-color: #f9f9f9;height: 10rpx;margin-top: 50rpx;">
			
		</view>
		<!-- 伤圈 -->
		<view class="circle" style="margin-bottom: 30px;margin-top: 50rpx;">
			<view class="" @click="sectionclick2">
				<u-section title="最新伤圈" sub-title="查看更多" line-color="#2175F6" font-size="30"></u-section>
			</view>
			<view class="recoverylist" v-for="(item,index) in listdata" :key="index" @click='sqxqclick(item.id)'>
				<view class="textview">
					<p>{{item.name}}</p>
					<p>{{item.content}}</p>
				</view>			
				<view class="imgview2">
					<image :src="item.picture.split(',')[0]" mode="aspectFill"></image>
				</view>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	import app from '../../App.vue'
	export default {
		data() {
			return {
				//轮播数据
				listdatalunbo:[],
				//快讯数据
				listdatakx:{},
				//宣传数据
				listdataxc:{},
				//恢复动作
				listdatahf:{},
				userinfo: '',
				listdata:[],
				page:1,
				limit:10
				
			}
				
		},
		created() {
			//轮播数据
			// this.lunbolist()
			// //快讯数据
			// this.kxlist()
			// //宣传
			// this.xqlist()
			// //恢复动作
			// this.hflist()
			// //推荐帖子
			// this.listdata =[]
			// this.tjlist()

		},
		onLoad() {
			
		
		},
		onShow() {
			this.userinfo = uni.getStorageSync("userInfo");
			//轮播数据
			this.lunbolist()
			//快讯数据
			this.kxlist()
			//宣传
			this.xqlist()
			//恢复动作
			this.hflist()
			//推荐帖子
			// this.listdata =[]
			this.tjlist()
		},
		methods: {
			//轮播数据
			lunbolist(){
				this.$u.post('/Operate/List', {})
				.then( res =>{
					if(res.code ==200){
						this.listdatalunbo = res.data
					}
				})
			},
			//快讯数据
			kxlist(){
				this.$u.post('/Operate/zxData', {})
				.then( res =>{
					if(res.code ==200){
						this.listdatakx = res.data
					}
				})	
			},
			//宣传数据
			xqlist(){
				this.$u.post('/Operate/xxData', {})
				.then( res =>{
					if(res.code ==200){
						this.listdataxc = res.data
						// console.log(this.listdataxc)
					}
				})			
			},
			//快讯详情
			lookclick(){
				uni.navigateTo({
					url:"./indexxq"
				})
			},
			//宣传详情
			lookclick2(){
				uni.navigateTo({
					url:"./indexxq2"
				})
			},
			//推荐恢复动作查看更多
			sectionclick(){
				uni.switchTab({
					url:"../action/actionindex"
				})
			},
			//推荐恢复动作
			hflist(){
				this.$u.post('/Recovery/list', {
					title:"",
					page:1,
					limit:3	
				})
				.then( res =>{
					if(res.code ==200){
						this.listdatahf = res.data
						// console.log(this.listdatahf)
					}
				})		
			},
			//恢复动作详情
			ldxxqclick(index,id){
				uni.navigateTo({
					url:'../action/actionxq?id='+id
				})
			},
			//推荐帖子
			tjlist(){
				this.$u.post('/Forum/list', {
					title:'',
					lx:1,
					page:1,
					limit:5,
					labelsid:0,
					uid:uni.getStorageSync("userInfo").id
				})
				.then( res =>{
					// console.log(res)
					// this.listdata=[]
					if(res.code ==200){
						if(res.data){
							this.datas = res.data
							this.listdata = res.data
							// res.data.picture.split(',')
							// console.log('推荐',this.listdata)
						}			
					}
				})	
				
			},
			
			//帖子查看更多
			sectionclick2(){
				uni.switchTab({
					url:"../circle/circleindex"
				})
			},
			//帖子详情
			sqxqclick(id){
				// console.log(this.userinfo)
				uni.navigateTo({
					url:'../circle/circlenxq?id='+id
				})
			}

		},
		//滚动到底部
		onReachBottom(){
			if(this.datas.length>0){
				this.page  = this.page+1
				this.tjlist()
			}
			
		}

	}
</script>

<style lang="scss" scoped>
	.body_big{
		width: 100%;
		.wrap{
			width: 90%;
			margin-left: 5%;		
		}
		// 快讯
		.kuanxidiv{
			width: 90%;
			margin-left: 5%;
			margin-top: 30rpx;
			height: 100rpx;
			line-height: 100rpx;
			box-shadow: 0px 0px 25px #EAF5F4;
			display: flex;
			justify-content: space-between;
			padding: 0 20rpx 0 20rpx;
			image{
				width: 100rpx;
				height: 60rpx;
				vertical-align:middle;
				margin-right: 10rpx;
				
			}
		}
		.zixun{
			width: 100%;
			// margin-left: 5%;
			margin-top: 30rpx;
			image{
				width: 100%;
				height: 160rpx;
				
			}
		}
		//恢复动作
		
		.recovery{
			width: 90%;
			margin-left: 5%;
			margin-top: 30rpx;
			.recoverylist{
				margin-top: 30rpx;
				height: 200rpx;
				padding: 20rpx 0;
				display: flex;
				justify-content: flex-start;
				.imgview{
					margin-right: 30rpx;
					image{
						width: 180rpx;
						height: 180rpx;
					}
					
				}
				.imgview2{
					margin-left: 30rpx;
					image{
						width: 180rpx;
						height: 180rpx;
					}
				}
				.textview{
					p:first-child{
						font-size: 32rpx;
						margin-bottom: 20rpx;
						color: #333;
					}
					p:last-child{
						font-size: 24rpx;
						color: #666;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
				}
			}
		}
		
		.circle{
			width: 90%;
			margin-left: 5%;
			margin-top: 30rpx;
			.recoverylist{
				margin-top: 30rpx;
				height: 200rpx;
				padding: 20rpx 0;
				display: flex;
				justify-content: space-between;
				.imgview{
					margin-right: 30rpx;
					image{
						width: 180rpx;
						height: 180rpx;
					}
					
				}
				.imgview2{
					margin-left: 30rpx;
					image{
						width: 180rpx;
						height: 180rpx;
					}
				}
				.textview{
					p:first-child{
						font-size: 32rpx;
						margin-bottom: 20rpx;
						color: #333;
					}
					p:last-child{
						font-size: 24rpx;
						color: #666;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
				}
			}
		}
	}

</style>
