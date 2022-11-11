<template>
	<view class="jianyu">
		<view class="ys" v-for="(item,index) in listData" :key="index">
			<view class="title">
				<text class="sh_st" v-if="item.status==0">申请中</text>
				<text class="st" v-if="item.status==1">申请通过</text>
				<text class="bo_st" v-if="item.status==2">驳回申请</text>
				<text class="ctime">{{item.ctime}}</text>
			</view>
			<u-line margin="10rpx 0rpx"></u-line>
			<view class="neri">姓名：{{item.name}}</view>
			<view class="neri">联系电话：{{item.telephone}}</view>
			<view class="neri">邮寄地址：{{item.address}}</view>
			<view class="neri"  v-if="item.status==1">邮寄时间：{{item.jtime}}</view>
			<view class="neri"  v-if="item.status==1">快递公司：{{item.express}}</view>
			<view class="neri"  v-if="item.status==1">物流单号：{{item.numbers}}</view>
		</view>
		
		
		<view class="u-demo-block__content" v-if="show">
			<u-loadmore
				:line="true"
				status="loadmore"
				@loadmore="loadmore"
			></u-loadmore>
		</view>
		<view v-if="listData.length==0">
			<u-empty
			        mode="history"
			        icon="http://cdn.uviewui.com/uview/empty/history.png"
			>
			</u-empty>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page:1,
				listData:[],
				show:false,
				userInfo:null
			}
		},
		mounted() {
			console.log('组件加载')  
			this.page=1;
			this.getlist();
			this.userInfo=uni.getStorageSync('userInfo')
		},
		methods: {
			getlist(){
				
				let uid=uni.getStorageSync('userInfo').id;
				
				uni.$u.http.post('Phonecard/userList',{
					uid:uid,
					page: this.page
				})
				 .then(res => {
					// console.log(res)
					this.listData=res.data
					if(res.data.length>0){
						this.listData.concat(res.data)
						if(res.data.length>19){
							this.page=this.page+1;
							this.show=true
						}else{
							this.show=false
						}
					}
						
					
				})
			},
			loadmore() {
				this.getlist();
				uni.$u.toast('加载更多')
			}
			
			
		},
		
	}
</script>

<style lang="scss">
	.jianyu{
		margin-top: 10rpx;
		padding: 20rpx;
		margin-bottom: 80rpx;
	}
	.tubua{
		position: fixed;
		right: 30rpx;
		bottom: 15vh;
		border-radius: 50%;
		padding: 10rpx;
		background-color: #007affc7;
		display:block;
	}
	.ys{
		box-sizing: border-box;
		border-radius: 10rpx;
		/*避免在元素内部插入分页符*/
		box-sizing: border-box;
		margin-bottom: 20rpx;
		box-shadow: 0px 0px 28rpx 1rpx rgba(78, 101, 153, 0.14);
		padding: 20rpx;
	}
	.title{
		color: #3e3e3e;
		font-size: 30rpx;
	}
	.neri{
		// text-indent:2em;
		 letter-spacing:2rpx;
		font-size: 28rpx;
		color: #3e3e3e;
	}
	.boneri{
		// text-indent:2em;
		 letter-spacing:2rpx;
		font-size: 28rpx;
		color: #F56c6c;
	}
	.st{
		font-size: 22rpx;
		// margin-left: 10rpx;
		border:2rpx solid #3c9cff;
		padding: 7rpx 10rpx;
		border-radius: 15rpx;
		color: #3c9cff;
	}
	.title .ctime{
		margin-left: 10rpx;
		font-size: 26rpx;
		color: #3e3e3e;
	}
	.bo_st{
		font-size: 22rpx;
		// margin-left: 10rpx;
		border:2rpx solid #F56c6c;
		padding: 7rpx 10rpx;
		border-radius: 15rpx;
		color: #F56c6c;
	}
	.sh_st{
		font-size: 22rpx;
		// margin-left: 10rpx;
		border:2rpx solid #F9ae3d;
		padding: 7rpx 10rpx;
		border-radius: 15rpx;
		color: #F9ae3d;
	}
	.del{
		float: right;
	}
</style>
