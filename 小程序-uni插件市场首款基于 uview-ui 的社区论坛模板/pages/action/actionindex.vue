<template>
	<view class="actionboss">
		<view class="recoverylist" v-for="(item,index) in listdata" :key="index" @click="xqclick(index,item.id)">
			<view class="imgview">
				<image :src="item.ioc" mode="scaleToFill"></image>
			</view>
			<view class="textview">
				<p>{{item.title}}</p>
				<p>{{item.name}}</p>
			</view>			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:'',
				page:1,
				limit:10,
				listdata:[],
				datas:[]
			}
		},
		created() {
			this.list()
		},
		methods:{
			list(){
				this.$u.post('/Recovery/list', {
					title:this.title,
					page:this.page,
					limit:this.limit	
				})
				.then( res =>{
					if(res.code ==200){
						if(res.data){
							this.datas = res.data
							this.listdata = this.listdata.concat(res.data)
							// console.log(this.listdata)
						}
						
					}
				})		
			},
			xqclick(index,id){
				uni.navigateTo({
					url:'./actionxq?id='+id
				})
				
			}
		},
		//滚动到底部
		onReachBottom(){
			if(this.datas.length>0){
				this.page  = this.page+1
				this.list()
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.actionboss{
		width: 90%;
		margin-left: 5%;
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
					border-radius: 4px;
					// box-shadow: 0 0 20rpx #d9d9d9;
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
</style>
