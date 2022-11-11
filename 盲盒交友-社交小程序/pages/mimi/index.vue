<template>
	<view class="jianyu">
		<view class="ys" v-for="(item,index) in listData" :key="index">
			<view class="title">
				<text class="sh_st" v-if="item.states==0">审核中</text>
				<text class="st" v-if="item.states==1">审核通过</text>
				<text class="bo_st" v-if="item.states==2">驳回纸条</text>
				<text class="ctime">{{item.ctime}}</text>
				<text class="ctime" v-if="item.states==1">口令：{{item.aname}}</text>
				<text class="bo_st del" v-if="item.states==2" @click="del(item.id)">删除</text>
			</view>
			<u-line margin="10rpx 0rpx"></u-line>
			<view class="neri">{{item.contents}}</view>
			<view class="boneri" v-if="item.states==2">驳回原因：{{item.reason}}</view>
				
		</view>
		<view >
			<ad adpid="1552789692"></ad>
		</view>
		
		<view class="u-demo-block__content" v-if="show">
			<u-loadmore
				:line="true"
				status="loadmore"
				@loadmore="loadmore"
			></u-loadmore>
		</view>
		<view v-if="userInfo&&listData.length==0">
			<u-empty
			        mode="history"
			        icon="http://cdn.uviewui.com/uview/empty/history.png"
			>
			
			</u-empty>
		</view>
		
		<view class="tubua" @click="yian" v-if="userInfo && userInfo.bid==1">
			<u-icon name="plus" color="#fff" size="30" ></u-icon>
		</view>
		<view v-if="!userInfo" class="bu">
			用户未登录,前往个人中心登录
		</view> 
		<view v-if="userInfo&&listData.length==0&& userInfo.bid==0" class="bu">
			情绪发布，请联系客服，前往公众号发布！
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
		onShow() {
			// console.log('组件加载')  
			this.page=1;
			this.getlist();
			this.listData=[]
			let userInfo=uni.getStorageSync('userInfo')
			if(userInfo){
				this.userInfo=userInfo;
				
			}else{
				this.userInfo=null
			}
		},
		methods: {
			yian(){
				uni.$u.route({
					url: "/pages/garden/fabu"
				})
			},
			getlist(){
				
				let uid=uni.getStorageSync('userInfo').id;
				
				uni.$u.http.post('Note/userList',{
					uid:uid,
					page: this.page
				})
				 .then(res => {
					// console.log(res)
					// this.listData=res.data
					if (res.data.length > 0) {
					
						var sumData = [];
					
						sumData = sumData.concat(this.listData).concat(res.data);
						// than.listData.concat(res.data)
						console.log(sumData)
						this.listData = sumData;
						this.page = this.page + 1;
						this.show=true
					}else{
						this.show=false
					}
						
					
				})
			},
			loadmore() {
				this.getlist();
				uni.$u.toast('加载更多')
			},
			del(id){
				uni.$u.http.post('Note/del',{
					id:id
				})
				 .then(res => {
					uni.$u.toast('删除成功')
					this.page=1;
					this.getlist();
					
				})
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
		text-indent:2em;
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
	.bu{
		text-align: center;
		margin-top: 40vh;
		color: #8c8c8c;
	}
</style>
