<template>
	<view class="">
		<!--pages/rengou/rengou.wxml-->
		<view class="flexC mlr70">
			<view class="flexR c9 fs24">
				<view class="cf0000">*</view>
				<view class="flexauto">认购时间：</view>
				<view class="flexnone">{{time}}</view>
			</view>
			<view class="xian mt30"></view>
			
			<view class="flexR mt20 aic c9 fs24"  @click="clickShowName">
				<view class=" flexauto"><text style="color: red;">*</text> 请选择楼盘</view>
				<view class="mr10">{{name ? name : '请选择'}}</view>
				<image class="sanjiao" src="/static/haibao/sanjiao.png"></image>
			</view>
			<u-select v-model="showName" :list="houseName" @confirm="clickConfirmName"></u-select>
			
			<!-- <view class="flexR c9 mt20 fs24">
				<view class="cf0000">*</view>
				<view class="flexauto flexR">认购凭证 </view>
			</view>
			<view class="shoose">
				<view class="title">正面</view>
				<view class="img" v-show="!data[0]" @click="choose(1)">
					<view class="plus">+</view>
					<view class="sel">选择图片</view>
				</view>
				<view class="img" style="position: relative;" v-show="data[0]">
					<view style="font-size: 36px;z-index: 1;position: absolute;top: -10%;right: 0;" @click="data[0]=''">
						×
					</view>
					<image :src="data[0]"></image>
				</view>
			</view> -->
			<view class="xian mt30"></view>
			<view class="flexR c9 mt20 fs24">
				<view class="cf0000">*</view>
				<view class="flexauto flexR">认购单 </view>
			</view>
			
			<!-- <view class="flexR mt20 jcsa">
				<view class="contentImg">
					<image
						v-if="imageList" 
						class="img"
						v-for="(item,index) in imageList" :key="index"
						:src="imageList[index]"
					></image>
					<image  @click="changePhoto"  v-if="imageList.length < 9" class="img" src="/static/img.png" mode=""></image>
				</view> -->
				<!-- <u-upload ref="uUploads" :action="action" max-count="6" width="180"  height ="180" auto-upload="6"  :auto-upload="true" ></u-upload> -->
				<!-- <view class="he aic fwb  flexC jcc">
					<view class=" ys">+</view>
					<view class="ys fs30" style="">认购单</view>
				</view>
				<view class="he aic fwb  flexC jcc">
					<view class=" ys ">+</view>
					<view class="ys fs30" style="">交款凭证</view>
				</view>
				<view class="he aic fwb  flexC jcc">
					<view class=" ys">+</view>
					<view class="ys fs30" style="">认购单</view>
				</view> -->
			<!-- </view> -->
			<!-- <view class="flexR mt30 mlr10">
				<view class="he aic fwb  flexC jcc">
					<view class=" ys">+</view>
					<view class="ys fs20" style="">客户证件（反面）</view>
				</view>
				<view class="he aic fwb ml40  flexC jcc">
					<view class=" ys">+</view>
					<view class="ys fs20" style="">客户证件（反面）</view>
				</view>
			</view> -->
			
			<view class="flexR mt20 jcsa">
				<view class="contentImg">
					<image
						v-if="imageList1" 
						class="img"
						:src="imageList1"
						@click="changePhoto(1)"
					></image>
					<image  @click="changePhoto(1)"  v-if="imageList1==''" class="img" src="/static/img.png" mode=""></image>
				</view>
			</view>
			<view class="xian mt30"></view>
			<view class="flexR c9 mt20 fs24">
				<view class="cf0000">*</view>
				<view class="flexauto flexR">交款凭证 </view>
			</view>
			<view class="flexR mt20 jcsa">
				<view class="contentImg">
					<image
						v-if="imageList2" 
						class="img"
						:src="imageList2"
						@click="changePhoto(2)"
					></image>
					<image  @click="changePhoto(2)"  v-if="imageList2==''" class="img" src="/static/img.png" mode=""></image>
				</view>
			</view>
			
			<view class="xian mt30"></view>
			<view class="flexR c9 mt20 fs24">
				<view class="cf0000">*</view>
				<view class="flexauto flexR">客户证件(正面) </view>
			</view>
			<view class="flexR mt20 jcsa">
				<view class="contentImg">
					<image
						v-if="imageList3" 
						class="img"
						:src="imageList3"
						@click="changePhoto(3)"
					></image>
					<image  @click="changePhoto(3)"  v-if="imageList3==''" class="img" src="/static/img.png" mode=""></image>
				</view>
			</view>
			
			<view class="xian mt30"></view>
			<view class="flexR c9 mt20 fs24">
				<view class="cf0000">*</view>
				<view class="flexauto flexR">客户证件(反面) </view>
			</view>
			<view class="flexR mt20 jcsa">
				<view class="contentImg">
					<image
						v-if="imageList4" 
						class="img"
						:src="imageList4"
						@click="changePhoto(4)"
					></image>
					<image  @click="changePhoto(4)"  v-if="imageList4==''" class="img" src="/static/img.png" mode=""></image>
				</view>
			</view>
			<view class="xian mt30"></view>
			<view class="flexR c9 mt20 fs24">
				<view class="flexauto flexR">其他 </view>
			</view>
			<view class="flexR mt20 jcsa">
				<view class="contentImg">
					<image
						v-if="imageList5" 
						class="img"
						:src="imageList5"
						@click="changePhoto(5)"
					></image>
					<image  @click="changePhoto(5)"  v-if="imageList5==''" class="img" src="/static/img.png" mode=""></image>
				</view>
			</view>
			
			
			
			<view class="xian mt20"></view>
			<view class="flexR mt20 aic c9 fs24">
				<view class=" flexauto">合作公司</view>
				<input v-model="company" type="text" class="he1" placeholder-class="fs30" placeholder="请输入" />
			</view>
			<view class="xian mt20"></view>
			<view class="flexR mt20 aic c9 fs24">
				<view class=" flexauto">房号</view>
				<input v-model="room" type="text" class="he1" placeholder-class="fs30" placeholder="请输入" />
			</view>
			<view class="xian mt20"></view>
			<view class="flexR mt20 aic c9 fs24">
				<view class=" flexauto">面积</view>
					<input v-model="area" type="text" class="he1" placeholder-class="fs30" placeholder="请输入" />
			</view>
			<view class="xian mt20"></view>
			<view class="flexR mt20 aic c9 fs24">
				<view class=" flexauto">总价</view>
					<input v-model="price" type="text" class="he1" placeholder-class="fs30" placeholder="请输入" />
			</view>
			<view class="xian mt20"></view>
		</view>
		<view class="flexC jcc aic mt30">
			<view class="he3 tac aic cf mt30" @click="tiao()">提交</view>
			<view class="mt100"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				time:'',
				imageList1:'',
				imageList2:'',
				imageList3:'',
				imageList4:'',
				imageList5:'',
				company:'',
				room:'',
				area:'',
				price:'',
				id:'',
				member_id:'',
				showName:false,
				name:'',
				houseId:'',
				houseName:[],
				
				houses:false,
				data: {
					0: '',
					1: '',
					2: '',
					3: '',
					4: '',
				},
			}
		},
		onLoad(option) {
			this.id = option.id
			this.member_id = uni.getStorageSync('userdata')['id']
			this.getData()
			this.getTime()
		},
		onShow() {

		},
		methods: {
			tiao() {
				uni.navigateTo({
					url: "../my/my"
				})
			},
			getData(){
				this.api.request({
					url: 'look/lookname',
					method: 'get',
					data: {
						customer_id: this.id,
					},
					success: (res) => {
						console.log(res)
						res.data.forEach(item => {
							this.houseName.push({label:item.estatename,value:item.name})
						})
					}
				}) 
			},
			
			clickShowName(){
				this.showName = true
			},
			clickConfirmName(e){
				console.log(e)
				this.name = e[0].label
				this.houseId = e[0].value
			},
			getTime(){
				var date = new Date()
				var year = date.getFullYear();
				var m = date.getMonth() + 1
				var day = date.getDate()
				var hour = date.getHours()
				var min = date.getMinutes()
				this.time = `${year}-${m}-${day} ${hour}:${min}`
				
			},
			changePhoto(e){
				console.log(e)
				uni.chooseImage({
					count:1,
					sizeType:["compressed"],
					sourceType:["album","camera"],
					success: (res) => {
						// this.imageList.push(res.tempFilePaths[0])
						const tempFilePaths = res.tempFilePaths
						uni.uploadFile({
							url:'http://zhongzong.ilabe.com/api/Base/upload',
							filePath:tempFilePaths[0],
							name:'image',
							header:{Authorization:uni.getStorageSync('token')},
							success: (res) => {
								console.log(res)
								var obj = JSON.parse(res.data)
								if(obj.status == 101){
									uni.showToast({
										title:'登录过期，请重新登录',
										icon:'none',
									})
									setTimeout(() => {
										uni.navigateTo({
											url:'../denglu/denglu'
										})
									},1000)
									
									return false
								}
								if(e == 1){
									this.imageList1 = obj.data
								}
								if(e == 2){
									this.imageList2 = obj.data
								}
								if(e == 3){
									this.imageList3 = obj.data
								}
								if(e == 4){
									this.imageList4 = obj.data
								}
								if(e == 5){
									this.imageList5 = obj.data
								}
								// this.imageList.push(obj.data)
								// this.imageList.push({url:obj.data,title:''})
							}
						})
					}
				})
			},
			sendChecked(){
				if(this.houseId==''){
					uni.showToast({
						title:'请选择楼盘',
						icon:'none'
					})
					return false
				}
				if(this.imageList1==''){
					uni.showToast({
						title:'请上传认购单',
						icon:'none'
					})
					return false
				}
				if(this.imageList2 ==''){
					uni.showToast({
						title:'请上传交款凭证',
						icon:'none'
					})
					return false
				}
				if(this.imageList3 ==''){
					uni.showToast({
						title:'请上客户证件(正面)',
						icon:'none'
					})
					return false
				}
				if(this.imageList4 ==''){
					uni.showToast({
						title:'请上客户证件(反面)',
						icon:'none'
					})
					return false
				}
				return true
			},
			clickSend(){
				if(!this.sendChecked()){
					return false
				}
				 
				this.api.request({
					url: 'rengou/add',
					method: 'post',
					data: {
						time:this.time,
						estate_name:this.name,
						estate_id:this.houseId,
						rengoudan:this.imageList1,
						jiaokuanpingzheng:this.imageList2,
						zhengjianzheng:this.imageList3,
						zhengjianfan:this.imageList4,
						qita:this.imageList5,
						hezuo:this.company,
						room:this.room,
						area:this.area,
						price:this.price,
						customer_id:this.id,
						member:this.member_id
					},
					success: (res) => {
						uni.showToast({
							title:'提交成功'
						})
						setTimeout(() => {
							uni.navigateTo({
								url:'../kyxiangqing/kyxiangqing?id='+this.id
							})
						},500)
						
					}
				}) 
			},
		}
	}
</script>

<style scoped lang="scss">
	/* pages/rengou/rengou.wxss */
	.contentImg{
		display: flex;
		flex-wrap: wrap;
	}
	.img{
		color: #ccc;
		display: inline-block;
		border: 1rpx dotted #ccc;
		width: 200rpx;
		height: 200rpx;
		text-align: center;
		line-height: 200rpx;
		font-size: 50rpx;
		margin: 0 15rpx 20rpx 0;
		border-radius: 20rpx;
	}
	.biankuan3 {
		width: 654rpx;
		opacity: 1;
		background: #ffffff;
		border-radius: 10rpx;
		box-shadow: 3rpx 5rpx 16rpx 0rpx rgba(43, 43, 43, 0.27);
	}
	
	.biankuan4 {
		line-height: 30rpx;
		width: 106rpx;
		height: 30rpx;
		color: #EC6941;
		font-size: 20rpx;
		font-weight: 400;
		background: #fdf1ed;
	}
	
	.biankuan5 {
		line-height: 28rpx;
		width: 82rpx;
		height: 28rpx;
		font-size: 20rpx;
		color: #999999;
		background: #e6e6e6;
		border-radius: 14rpx;
	}
	.ys3 {
		line-height: 27rpx;
		width: 94rpx;
		height: 27rpx;
		opacity: 0.5;
		background: linear-gradient(58deg, #ff0000 0%, #ffffff 100%);
		border-radius: 3rpx;
	}
	.ys2 {
		width: 35rpx;
		height: 27rpx;
		opacity: 1;
		background-color: #ff0000;
		border-radius: 3rpx;
	}
	.ys4 {
		margin-bottom: 10rpx;
		color: #FF0000;
		line-height: 50rpx;
		width: 130rpx;
		height: 50rpx;
		opacity: 1;
		border: 1rpx solid #ff0000;
		border-radius: 20rpx;
	}
	
	.ys8 {
		line-height: 50rpx;
		width: 130rpx;
		height: 50rpx;
		opacity: 1;
		background: linear-gradient(65deg, rgba(255, 0, 46, 1.00) 0%, #ff98ab 100%);
		border-radius: 19rpx;
	}
	.tu3 {
		width: 251rpx;
		height: 158rpx;
		border-radius: 10rpx;
	}
	.xian {
		height: 2rpx;
		opacity: 0.15;
		background: #999999;
	}

	.he {
		width: 174rpx;
		height: 174rpx;
		opacity: 0.15;
		background-color: #999999;
	}

	.sanjiao {
		width: 12rpx;
		height: 19rpx;
	}

	.he1 {
		line-height: 40rpx;
		width: 20%;
		height: 40rpx;
		font-size: 30rpx;
	}

	.he3 {
		line-height: 75rpx;
		width: 464rpx;
		height: 75rpx;
		opacity: 1;
		background: #00479d;
		border-radius: 38rpx;
	}

	.shoose {
		margin: 30rpx;
		display: flex;
		flex-direction: row;

		.title {
			margin: 20rpx;
		}

		.img {
			display: flex;
			flex-direction: column;
			justify-content: center;
			background-color: #e1e1e1;
			width: 200rpx;
			height: 200rpx;

			.plus {
				font-size: 36px;
				display: flex;
				flex-direction: row;
				justify-content: space-around;
			}

			.sel {
				display: flex;
				flex-direction: row;
				justify-content: space-around;
			}

			image {
				height: 100%;
				width: 100%;
			}
		}
	}
</style>

