<template>
	<view class="body">
		<view v-if="uid==userInfo.id">
			<u-notice-bar text="信息审核中,请耐心等待!" v-if="album.length>0&&did==0"></u-notice-bar>
			<u-notice-bar text="信息未通过,请前往身份认证修改信息!" v-if="did==2"></u-notice-bar> 
		</view>
		<view v-if="album.length==0">
			<u-notice-bar text="身份未认证,请前往身份认证!" ></u-notice-bar>
		</view>
		<view v-if="album.length>0">
			<image :src="album[px]" mode="aspectFill" class="image"></image>
		</view>
		<view class="xiangce" v-if="album.length>0">
					<scroll-view class="tab-scroll-view" :scroll-x="true">
						<view  class="tab-item" v-for="(itme,index) in album" :key="index">
							<image :src="itme" class="tuxiang" mode="aspectFill" @click="xun(index)"></image>
						</view>
					</scroll-view>
				</view>
		<view class="mo" v-if="album.length>0">
			<view class="biaodjia">基本信息</view>
			<view class="beni">
				<text class="cem">生日：{{uData.year}}</text>
			</view>
			<view class="beni">
				<text class="cem">身高：{{uData.height}}/CM</text>
			</view>
			<view class="beni">
				<text class="cem">体重：{{uData.weight}}/KG</text>
			</view>
			<view class="beni">
				<text class="cem">星座：{{uData.constellation}}</text>
			</view>
		</view>
		<view class="mo" v-if="album.length>0">
			<view class="biaodjia">单位信息</view>
			<view class="beni">
				<text class="cem">单位：{{uData.company}}</text>
			</view>
			<view class="beni">
				<text class="cem">职位：{{uData.position}}</text>
			</view>
			<view class="beni">
				<text class="cem">现住地址：{{uData.address}}</text>
			</view>
		</view>
		<view class="mod">
			<ad adpid="1552789692"></ad>
		</view>
		<view class="mod" v-if="album.length>0">
			<view class="biaodjia">关于我</view>
			<view class="neict">{{uData.description}}</view>
		</view>
		<view class="mod" v-if="album.length>0">
			<view class="biaodjia">兴趣爱好</view>
			<view class="neict">{{uData.hobby}}</view>
		</view>
		<view class="mod" v-if="album.length>0">
			<view class="biaodjia">爱情观</view>
			<view class="neict">{{uData.love}}</view>
		</view>
		<view class="mod " v-if="album.length>0">
			<view class="biaodjia">理想的另一半</view>
			<view class="neict">{{uData.half}}</view>
		</view>
		<view class="mod cdbh" v-if="album.length>0">
			<ad adpid="1552789692"></ad>
		</view>
		<view class="tongx" v-if="album.length>0&&uData.wx!='' && uid!=userInfo.id && userInfo.bid==1 &&huban==0" @click="jiesuo">
			10个花瓣可以解锁微信哦~
		</view>
		<view class="tongx" v-if="album.length>0&&huban==1" @click="copy(uData.wx)">
			复制微信：{{uData.wx}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:null,
				album:[],
				px:0,
				uid: 0,
				lx:0,
				did:0,
				uData:null,
				name:"",
				currentNum:0,
				huban:0
				
			}
		},
		onLoad(e) {
			const userInfo = uni.getStorageSync('userInfo');
			if (userInfo) {
				this.userInfo=userInfo;
			}
			if(e.id){
				this.uid=e.id;
				this.userData(e.id);
			}else{
				console.log(111)
				this.uid=userInfo.id;
				this.userData(userInfo.id);
			}
			
			
			
			uni.hideShareMenu({
			  menus: ['shareAppMessage', 'shareTimeline']
			})
		},
		methods: {
			userData(id){
				uni.$u.http.post('Encounter/userData', {
					"id":id
				})
				.then(res => {
					this.uData=res.data.userData;
					this.did=res.data.did;
					this.name=res.data.name;
					this.album=res.data.userData.album.split(',');
					console.log(res.data)
					
				})
			},
			xun(e){
				this.px=e
			},
			copy:function(value) {
				uni.setClipboardData({
					data: value,   // 要复制的文字
					success: function(res) {
						uni.getClipboardData({
							success: function(res) {
								uni.showToast({
									title: '复制成功'
								});
							}
						});
					}
				});
			},
			
			jiesuo(){
				let _this=this;
				uni.showModal({
				    title: '提示',
				    content: '解锁需要10个花瓣',
				    success: function (res) {
				        if (res.confirm) {
							_this.jiesuocd()
				          
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
				
			},
			jiesuocd(){
				const userInfo = uni.getStorageSync('userInfo');
				if (userInfo) {
					uni.$u.http.post('Detailed/jiesuo', {
						"uid":this.uid,
						"id":userInfo.id
					})
					.then(res => {
						if(res.code==200){
							this.huban=1
						}else{
							uni.$u.toast(res.msg)
						}
						console.log(res) 
						
					})
				} else {
					uni.$u.toast('未登录,不可解锁')
				}
			}
			
		},
	}
</script>

<style lang="scss" scoped>
	.body{
		margin: 20rpx;
	}
	 .indicator-num {
	        padding: 2px 5px;
	        background-color: rgba(0, 0, 0, 0.35);
	        border-radius: 100px;
	        /* width: 35px; */
	        justify-content: center;
	
			 color: #FFFFFF;
			 font-size: 12px;
	    }
	.image{
		width: 100%;
		height: 700rpx;
		border-radius: 30rpx;
	}
	.xiangce{
		margin-top: -140rpx;
		padding: 20rpx;
	}
	.tab-scroll-view {
		width: 90vw;
		height: 110rpx;
		flex-direction: row;
		white-space: nowrap;
		overflow:hidden;
		
	}
	.tab-item {
		display: inline-block;
		width: 110rpx;
		height: 110rpx;
	}
	.tuxiang{
		width: 100rpx;
		height: 100rpx;
		border-radius: 10rpx;
	}
	.gungbo{
		background-color: #f8f8f8;
		padding: 8rpx;
		border-radius: 5rpx;
		
	}
	.gingb{
		margin-left: 10rpx;
		color: #a5a5a5;
	}
	.mo{
		margin-top: 20rpx;
		border-radius:10rpx;
		border:1rpx solid  #e8e6e6;
		box-shadow: 3rpx 8rpx 5rpx #e8eae8;
		padding: 30rpx 20rpx;
	}
	.name{
		font-size: 32rpx;
		font-weight: 600;
	}
	.dizhi{
		float: right;
		color: #a5a5a5;
		font-size: 30rpx;
	}
	.beni{
		margin-top: 20rpx;
		padding-left: 10rpx;
	}
	.cem{
		margin-right: 20rpx;
		color: #919191;
		font-size: 30rpx;
	}
	.mod{
		margin-top: 20rpx;
		border-radius:10rpx;
		border:1rpx solid  #e8e6e6;
		padding: 20rpx;
	}
	.biaodjia{
		border-left: 10rpx solid  #0087ca;
		font-size: 32rpx;
		font-weight: 600;
		padding-left: 15rpx;
	}
	.neict{
		padding-top: 20rpx;
		color: #9f9f9f;
		font-size: 30rpx;
		letter-spacing:2rpx;
		line-height: 50rpx;
	}
	.cdbh{
		margin-bottom: 160rpx;
	}
	.tongx{
		position: fixed;
		bottom: 3vh;
		right:20vw;
		left: 20vw;
		text-align: center;
		background-color: #0087ca; 
		 padding: 20rpx;
		 box-shadow: 3rpx 8rpx 5rpx #0087ca;
		 color: #fff;
		 border-radius: 10rpx;
		/* padding-bottom: 40rpx; */
		
	}
	.xuanze{
		padding: 15rpx 0;
		margin-top: 20rpx;
		
	}
	.fuchis{
		
		font-size: 26rpx;
		width: 100rpx;
		height: 100rpx;
		background-color: #222;
		color: #fff;
		/* padding: 10rpx; */
		border-radius: 50%;
	}
	.fuchis1{
		padding: 18rpx 8rpx 0rpx 8rpx ;
		font-size: 24rpx;
		width: 100rpx;
		height: 100rpx;
		background-color: #222;
		color: #fff;
		/* padding: 10rpx; */
		border-radius: 50%;
	}
	.xuanzexs{
		width: 100%;
	}
	.xuanzexs button{
		font-size: 30rpx;
		width: 250rpx;
		background-color: #222;
		color: #fff;
	}
</style>
