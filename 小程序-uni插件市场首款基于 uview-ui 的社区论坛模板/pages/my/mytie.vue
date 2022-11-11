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
							<p><text>{{item.umame}}</text><text style="font-size: 25rpx; margin-left: 20rpx;color: #2979FF;">{{item.aid==1?'审核中，请耐心等待':''}}</text></p>
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
				
			}
		},
		created() {
			this.listdata = []
			this.mytielist()
		
		},
		methods:{
			//我的帖子列表
			mytielist(){		
				this.$u.post('/Forum/userlist', {
					uid:uni.getStorageSync('userInfo').id,
					page:this.page,
					limit:this.limit
				})
				.then( res =>{
					if(res.code ==200){
						this.datas = res.data
						this.listdata = this.listdata.concat(res.data)
					}
					// console.log(res)
				})
				
			},
			//详情
			newxqclick(id){
				// console.log(id)
				uni.navigateTo({
					url:'../circle/circlenxq?id='+id
				})
				
			}
		},
		//滚动到底部
		onReachBottom(){
			if(this.datas.length>0){
				this.page  = this.page+1
				this.mytielist()
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
