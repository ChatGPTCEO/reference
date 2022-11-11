<template>
	<view class="bigboos">
		<u-action-sheet @click="set_showSex" :list="sexList" v-model="showSex"></u-action-sheet>
		<view class="logo">
			<u-upload :action="action" :file-list="fileList" max-count="1" ref="uUpload"  :before-remove="beforeRemove"  @on-success="onSuccess">
			</u-upload>
			<!-- <u-avatar :src="userinfo.logo" size="150" v-if="userinfo"></u-avatar>	 -->
		</view>
		<view class="content">
			<u-form :model="form" ref="uForm">
				<u-form-item label="姓名"><u-input v-model="form.name" /></u-form-item>
				<u-form-item label="性别" >
					<u-radio-group v-model="form.sex" @change="radioGroupChange">
						<u-radio 
							@change="radioChange" 
							v-for="(item, index) in sexList" :key="index" 
							:name="item.value">
							{{item.text}}
						</u-radio>
					</u-radio-group>
				</u-form-item>				
			</u-form>
		</view>
		<view class="but" @click="undate">
			提交		
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				showSex:false,
				fileList: [{
					url:uni.getStorageSync('userInfo').logo
				}],
				action:'https://www.zhaoyuntian.com/test/update/imges',
				userinfo:'',
				lists:[],
				sexList:[
					{
						text:'男',
						value:1
					},
					{
						text:'女',
						value:2
					},
				],
				form:{
					id:uni.getStorageSync('userInfo').id,
					logo:uni.getStorageSync('userInfo').logo,
					name:uni.getStorageSync('userInfo').name,
					sex:uni.getStorageSync('userInfo').sex
					
				}
				
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.userinfo = uni.getStorageSync('userInfo')
			
		},
		methods:{
			//删除上传图片
			   beforeRemove(index, lists) {
				   
				   if(this.lists.length<=0){
					   this.lists = []
				   }else{
					   this.lists = lists[0].response.data;
				   }
				   
			    return true;
			   },
			   //上传
			   onSuccess(data, index, lists) {
			    this.lists = lists[0].response.data;	
				this.form.logo =  this.lists
				// console.log( this.lists)
			   },	
			   
			   radioGroupChange(){
				   
			   },
			   radioChange(i){
				   this.form.sex = i
				   // console.log(this.form.sex)
			   },
			   
			   //修改
			   undate(){
				   this.$u.post('/User/update', {
				    id:this.form.id,
					logo:this.form.logo,
					name:this.form.name,
					sex:this.form.sex
				   })
				   .then( res =>{
				   	// console.log(res)
				   	if(res.code ==200){		
						uni.setStorageSync("userInfo", res.data)
				   		let pages = getCurrentPages(); //获取当前页面栈
				   		let beforePage = pages[0]; //上一页
				   		// console.log(beforePage)
				   		uni.switchTab({
				   			url:'./myindex',
				   			success: function() {
				   			 beforePage.onLoad();
				   		},
				   			
				   		})
				   		uni.showToast({
				   			title: '修改成功',
				   			icon: 'none'
				   		});			
				   	}
				   })	
				   
				   // console.log(this.form)
				   
			   }
			
		}
	}
</script>

<style lang="scss" scoped>
	.bigboos{
		width: 100%;
		.logo{
			width: 100%;
			height: 400rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.content{
			width: 80%;
			margin-left: 10%;
		}
		.but{
			width: 70%;
			margin-left: 15%;
			height: 80rpx;
			text-align: center;
			line-height: 80rpx;
			background-color: #5B9CF9;
			color: #fff;
			font-size: 16px;
			position: fixed;
			bottom: 15%;
			border-radius: 10rpx;
			
		}
	}
	
</style>
