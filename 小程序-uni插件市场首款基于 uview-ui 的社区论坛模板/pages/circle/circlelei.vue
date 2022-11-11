<template>
	<view class="newboss">
		<view class="" style="text-align: center;" v-if="listdata.length<=0">
			<!-- <image src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01248c55425fbd0000019ae9af0b57.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636206710&t=b4033bcb536a694170c08f062dfe6320" mode="aspectFill" width="100%" height="100%"></image> -->
			<view style="color: #999;font-size: 16px;margin-top: 100px;">暂无数据</view>	
		</view>
		<view class="newview1" v-else v-for="(item,index) in listdata" :key="index">
			<view style="padding: 0 30rpx;">
				<view class="" @click="newxqclick(item.id)">
					<view class="top">
						<view class="topleftimg">
							<u-avatar :src="item.logo" size="80"></u-avatar>	
						</view>
						<view class="topleftname">
							<p>{{item.umame}}</p>
							<p>{{item.ctime}}</p>
						</view>			
					</view>
					<view class="content">
						<p>{{item.content}}</p>
					</view>
					<view class="conimg">
						<u-row gutter="16" >
							<u-col span="4" v-for="(_item,_index) in item.picture.split(',') " :key="_index">
								<view class="demo-layout bg-purple" style="text-align: center;margin-bottom: 8rpx;"><u-avatar :src="_item" mode="square" size="215"></u-avatar></view>
							</u-col>
						</u-row>
					</view>	
				</view>			
				<view class="plview">
					<u-row gutter="16">
						<u-col span="4">
							<view class="demo-layout bg-purple"style="text-align: center;" v-if="item.dz==0" @click="dzlist(item,index)">
								<u-icon name="thumb-up" color="#000" size="30"></u-icon>
								<text style="margin-left: 10rpx;font-size: 13px;" >点赞({{item.dzmun}})</text>
								
							</view>
							<view class="demo-layout bg-purple" style="text-align: center;" v-if="item.dz==1">
								<u-icon name="thumb-up-fill" color="#2B85E4" size="30"></u-icon>
								<text style="margin-left: 10rpx;font-size: 13px; color: #2B85E4;">已点赞({{item.dzmun}})</text>
							</view>
						</u-col>
						<u-col span="4">
							<view class="demo-layout bg-purple-light" style="text-align: center;" @click="newxqclick(item.id)">
								<u-icon name="chat" color="#000" size="30"></u-icon>
								<text style="margin-left: 10rpx;font-size: 13px;">评论({{item.plmun}})</text>
							</view>
						</u-col>
						
						<u-col span="4">
							<view class="demo-layout bg-purple-dark" style="text-align: center;" v-if="item.sc==0" @click="scclick(item,index)">
								<u-icon name="star" color="#000" size="30"></u-icon>
								<text style="margin-left: 10rpx;font-size: 13px;">收藏</text>
							</view>
							<view class="demo-layout bg-purple-dark" style="text-align: center;" v-if="item.sc==1"  @click="cleaclick(item,index)">
								<u-icon name="star-fill" color="#2B85E4" size="30"></u-icon>
								<text style="margin-left: 10rpx;font-size: 13px;color:#2B85E4;">已收藏</text>
							</view>
						</u-col>
					</u-row>
				</view>
						
			</view>
			
			<view style="width: 100%;background-color: #f9f9f9;height: 10rpx;">
				
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				avatar:'https://img1.baidu.com/it/u=964540772,1779533127&fm=26&fmt=auto',
				listdata:[],
				page:1,
				limit:10,
				datas:[],
				picture:[],
				labelsid:'',
				userinfo:''	
			}
		},
		created() {
		
		},
		onLoad(e) {	
			this.labelsid =e.labelsid
			this.listdata=[]
			this.quanlist()
			
		},
		onShow() {
			this.userinfo = uni.getStorageSync('userInfo')
		},
		methods:{
			//伤圈列表
			quanlist(){
				let labelsid = parseInt(this.labelsid)
				
				this.$u.post('/Forum/list', {
					title:'',
					lx:0,
					page:this.page,
					limit:this.limit,
					labelsid: labelsid,
					uid:uni.getStorageSync("userInfo").id
				})
				.then( res =>{
					// console.log(res)
					// this.listdata=[]
					if(res.code ==200){
						if(res.data){
							this.datas = res.data
							this.listdata = this.listdata.concat(res.data)
							// res.data.picture.split(',')
							// console.log('伤圈列表',this.listdata)
						}			
					}
				})		
			},
			
			//点赞
			dzlist(item,index){
				if(this.userinfo){
					this.$u.post('/Forum/dz', {
						id:item.id,
						uid:uni.getStorageSync('userInfo').id
					})
					.then( res =>{
						// console.log(res)
						if(res.code ==200){
							let listdata=this.listdata;
							listdata[index].dz=1;
							listdata[index].dzmun=listdata[index].dzmun+1;						
							this.listdata=listdata;
							// console.log(item,index)
							// console.log(this.listdata)		
						}
					})	
					
				}else{
					uni.showToast({
						title: '请先登录',
						icon: 'none'
					});					
				}	
			},
			//收藏
			scclick(item,index){
				if(this.userinfo){
					this.$u.post('/Forum/sc', {
						id:item.id,
						uid:uni.getStorageSync('userInfo').id
					})
					.then( res =>{
						// console.log(res)
						if(res.code ==200){
							let sclist = this.listdata
							sclist[index].sc = 1
							this.listdata = sclist	
						}
					})	
					
				}else{
					uni.showToast({
						title: '请先登录',
						icon: 'none'
					});					
				}			
			},
			//取消收藏
			cleaclick(item,index){
				if(this.userinfo){
					this.$u.post('/Forum/scdel', {
						id:item.id,
						uid:uni.getStorageSync('userInfo').id
					})
					.then( res =>{
						// console.log(res)
						if(res.code ==200){
							let sclist = this.listdata
							sclist[index].sc = 0
							this.listdata = sclist	
						}
					})	
					}else{
					uni.showToast({
						title: '请先登录',
						icon: 'none'
					});					
				}			
				
			},
			//详情
			newxqclick(id){
				// console.log(id)
				uni.navigateTo({
					url:'./circlenxq?id='+id
				})
				
			}
		
		},
		//滚动到底部
		onReachBottom(){
			if(this.datas.length>0){
				this.page  = this.page+1
				this.quanlist()
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.addview{
		position: fixed;
		bottom: 10%;
		right: 3%;
		background-color: #2979FF;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		z-index: 999;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.newboss{
		width: 100%;
		margin-top: 40rpx;
		.newview1{
			width: 100%;
			// height: 600rpx;
			padding: 20rpx 0;
			// background-color: #18B566;
			.topleftimg{
				float: left;
				margin-right: 20rpx;
			}
			.topleftname{
				float: left;
				line-height: 30rpx;
				color: #999;
				font-size: 12px;
				p:first-child{
					color: #000;
					font-size: 14px;
					font-weight: bold;
					line-height: 50rpx;
					margin-top: -10rpx;
					margin-bottom: 5px;
				}
			}
			.content{
				// background-color: #18B566;
				width: 100%;
				margin-top: 110rpx;
				text-overflow: ellipsis;
				text-overflow: -o-ellipsis-lastline;
				  overflow: hidden;
				  text-overflow: ellipsis;
				  display: -webkit-box;
				  -webkit-line-clamp: 3;
				  line-clamp: 3;
				  -webkit-box-orient: vertical;
			}
			.conimg{
				margin-top: 30rpx;
				margin-bottom: 10rpx;
			}
			.plview{
				height: 70rpx;
				
			}
			
		}
		
	}
</style>
