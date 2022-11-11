<template>
	<view class="newboss">
		<view class="addview">
			<button open-type="share" class="bf_but">
				<view style="height: 32px;line-height: 32px;">
				    <u-icon name="share" color="#fff" size="45"></u-icon>
				</view>
			</button>
		</view>
		<view class="newview1">
			<view style="padding: 0 30rpx;">
				<view class="top">
					<view class="topleftimg">
						<u-avatar :src="datas.logo" size="80"></u-avatar>	
					</view>
					<view class="topleftname">
						<p>{{datas.umame}}</p>
						<p>{{datas.ctime}}</p>
					</view>
					
				</view>
				<view class="content">
					<p>{{datas.content}}</p>
				</view>
				<view class="conimg">
					<u-row gutter="16" >
						<u-col span="4" v-if="datas.picture" v-for="(item,index) in datas.picture.split(',')" :key="index">
							<view class="demo-layout bg-purple" style="text-align: center;margin-bottom: 8rpx;"><u-avatar :src="item" mode="square" size="215" @click="imglook"></u-avatar></view>
						</u-col>
					</u-row>
				</view>
				<view class="plview">
					<u-section title="评论"  :right="false"  line-color="#2175F6" font-size="30"></u-section>
					<!-- @confirm  -->
					<view style="margin-top: 30rpx; background-color: #f9f9f9; padding: 10rpx; border-radius: 10rpx;">
						<input  @confirm="add" type="text" placeholder="发表你的评论吧" v-model="content" confirm-type="发表" v-if="userinfo"/>
						<text v-else>请先登录在发表评论吧</text>
					</view>
					<view class="" v-for="(item,index) in pldata" :key="index">
						<view class="plcontent">
							<view class="imgview">
								<u-avatar :src="item.logo" size="80"></u-avatar>	
							</view>
							<view class="conview">
								<view class="con1">
									<view class="">
										{{item.name}}
									</view>
									<view>
									<!-- 	<u-icon name="thumb-up" color="#666" size="30" style="margin-right: 30rpx;"></u-icon>
										<u-icon name="edit-pen" color="#666" size="30"></u-icon> -->
									</view>
								</view>
								<view class="con2">
									{{item.content}}
								</view>
								<view class="con3">
									<view>{{item.ctime}}</view>
									<!-- <view>
										<u-icon name="thumb-up" color="#666" size="30" style="margin-right: 30rpx;"></u-icon>
										<u-icon name="edit-pen" color="#666" size="30"></u-icon>
									</view> -->
									
								</view>
							</view>
						</view>
						<view style="width: 100%;background-color: #f9f9f9;height: 5rpx;margin-top: 20rpx;"></view>
						
					</view>
					<!-- <view class="" v-for="item in 2">
						<view class="plcontent">
							<view class="imgview">
								<u-avatar src="https://img1.baidu.com/it/u=964540772,1779533127&fm=26&fmt=auto" size="80"></u-avatar>	
							</view>
							<view class="conview">
								<view class="con1">
									<view class="">
										今夜不归来
									</view>
									<view>
										<u-icon name="thumb-up" color="#666" size="30" style="margin-right: 30rpx;"></u-icon>
										<u-icon name="edit-pen" color="#666" size="30"></u-icon>
									</view>
								</view>
								<view class="con2">
									这玩意骨裂打石膏和不打石膏影响大不，学校医务室说就裂了一点点
								</view>
								<view class="cons">
									<view class="">
										<text>如你所见是个美女：</text>
										<text>这玩意骨裂打石膏和不打石膏影响大不，学校医务室说就裂了一点点</text>
									</view>
									<view class="" style="margin-top: 10rpx;">
										<text>如你所见是个美女：</text>
										<text>这玩意骨裂打石膏和不打石膏影响大不，学校医务室说就裂了一点点</text>
									</view>
									
								</view>
								<view class="con3">
									<view>2021-10-03 13:15</view> -->
									<!-- <view>
										<u-icon name="thumb-up" color="#666" size="30" style="margin-right: 30rpx;"></u-icon>
										<u-icon name="edit-pen" color="#666" size="30"></u-icon>
									</view> -->
									
								<!-- </view>
							</view>
						</view>	
						<view style="width: 100%;background-color: #f9f9f9;height: 5rpx;margin-top: 20rpx;"></view>
					</view> -->
					<u-toast ref="uToast" />
				</view>
						
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				avatar:'https://img1.baidu.com/it/u=964540772,1779533127&fm=26&fmt=auto',
				id:'',
				datas:{},
				pldata:[],
				content:'',
				userinfo: uni.getStorageSync('userInfo')
			}
		},
		onLoad(e) {
			this.id = e.id
			this.xqlist()
			
		},
		methods:{
			xqlist(){
				this.$u.post('/Forum/bydata', {
					id:this.id
				})
				.then( res =>{
					// console.log(res)
					if(res.code ==200){
						this.datas = res.data
						// console.log('详情',this.datas)		
						this.pllist()
					}
				})			
			},
			//查看
			imglook(){
				 var urlList = this.datas.picture.split(',')
				uni.previewImage({
					indicator:"number",
					loop:true,
					urls: urlList
				})
			},
			//评论列表
			pllist(){
				this.$u.post('/Forum/pllist', {
					id:this.id
				})
				.then( res =>{
					// console.log(res)
					if(res.code ==200){
						this.pldata = res.data
						// console.log('评论',this.pldata)	
						
					}
				})	
			},
			//添加评论
			add(){
				// console.log(this.content)
				let telephone=uni.getStorageSync('userInfo').telephone;
				// console.log(telephone)
				if(telephone!=null){
					this.$u.post('/Forum/plAdd', {
						id:this.id,
						uid:uni.getStorageSync('userInfo').id,
						content:this.content
					})
					.then( res =>{
						// console.log(res)
						if(res.code ==200){
							this.$refs.uToast.show({
								title: res.msg,
								type: 'success'
							})
							this.content=''
							this.pllist()
						}
					})	
				}else{
					uni.showToast({
						title: '请先绑定手机号',
						icon: 'none'
					});					
				}	
			}
		}
	}
</script>

<style lang="scss" scoped>
	.addview{
		position: fixed;
		bottom: 10%;
		right: 3%;
		z-index: 9999;
		.bf_but{
			background-color: #2979FF;
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			z-index: 9999;
			color: #FFFFFF;
			display: flex;
			align-items: center;
			justify-content: center;
		}
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
					font-size: 15px;
					font-weight: bold;
					line-height: 50rpx;
					margin-top: -10rpx;
					margin-bottom: 5px;
				}
			}
			.content{
				width: 100%;
				margin-top: 110rpx;
				 text-overflow: -o-ellipsis-lastline;
				  // overflow: hidden;
				  text-overflow: ellipsis;
				  display: -webkit-box;
				  // -webkit-line-clamp: 3;
				  // line-clamp: 3;
				  -webkit-box-orient: vertical;
			}
			.conimg{
				margin-top: 30rpx;
				margin-bottom: 10rpx;
			}
			.plview{
				margin-top: 30rpx;
				// height: 70rpx;
				.plcontent{
					width: 100%;
					// height: 200rpx;
					display: flex;
					justify-content: flex-start;
					padding: 20rpx 30rpx;
					// background-color: #18B566;
					.imgview{
						margin-right: 20rpx;
					}
					.conview{
						.con1{
							color: #000;
							font-size: 15px;
							font-weight: bold;
							display: flex;
							justify-content: space-between;
						}
						.con2{
							color: #666;
							font-size: 13px;
							margin-top: 20rpx;
						}
						.con3{
							color: #999;
							font-size: 10px;
							margin-top: 15rpx;
							display: flex;
							justify-content: space-between;
						}
						.cons{
							width: 100%;
							background-color: #f7f6f6;
							margin: 20rpx 0;
							padding: 20rpx;
							font-size: 12px;
							color: #666;
							text:first-child{
								color: #2175F6;
								font-size: 12px;
								// font-weight: bold;
							}
						}
					}
				}
				
			}
			
		}
		
	}
</style>
