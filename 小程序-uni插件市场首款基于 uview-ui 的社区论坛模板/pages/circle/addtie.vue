<template>
	<view class="addboss">
		<view class="dropview" @click="xuanclick">
			<text style="color:#2B85E4">#{{name}}</text>
			<!-- <u-select v-model="show" mode="mutil-column-auto" :list="options1" @confirm="confirm"></u-select> -->
			<!-- <u-dropdown>
				<u-dropdown-item v-model="value1" :title="value1" options=""></u-dropdown-item>
			</u-dropdown> -->
		</view>
		<view class="addcontent">
			<textarea type="text" v-model="fromlist.content" maxlength="100" placeholder-class="line" placeholder="请输入你想发表的内容吧(最大字数100)" />
			
		</view>
		<!-- 上传 -->
		<view class="unloadview">
			<u-upload :action="action" :file-list="fileList" max-count="9" ref="uUpload" :show-progress="showd" :before-remove="beforeRemove"  @on-success="onSuccess">
			</u-upload>
		</view>
		<view class="shancuan" @click = "adddata">
			发布
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:"请选择标签",
				showd:false,
				// show:false,
				fileList: [],
				action:'https://www.zhaoyuntian.top/XCX/update/imges',
				value1: "身外圈",
				values:'',
				options1: [{
						label: '身外圈',
						value: "身外圈",
					},
					{
						label: '膝部',
						value: "膝部",
					},
					{
						label: '踝部',
						value: '踝部',
					},
					{
						label: '下肢',
						value: '下肢',
					},
					{
						label: '腰部',
						value: '腰部',
					}
				],
				fromlist:{
					labelsid:'',
					uid:uni.getStorageSync("userInfo").id,
					title:'',
					content:'',
					picture:'',
				},
				lists:[],
				list2 :[]
			}
			},
			created() {
				// this.labellist()
			},
			onLoad(e){
				if(e){
					this.name = e.name
					this.fromlist.labelsid = e.id
					// console.log(e)
				}
				
			},
			methods:{
				//标签列表Labels/List
				// 选择标签
				xuanclick(){
					uni.navigateTo({
						url:'./lebel'
					})
					
				},
				
				//删除上传图片
				   beforeRemove(index, lists) {
				    this.lists = lists;
				    return true;
				   },
				   //上传
				   onSuccess(data, index, lists) {
				    this.lists = lists;			
				   },				
				//添加帖子
				adddata(){
					if(this.fromlist.labelsid){
						//图片
						for (var i = 0; i < this.lists.length; i++) {
							this.list2.push(this.lists[i].response.data)										
						}
						this.fromlist.picture = this.list2.join(',')
						// console.log(this.fromlist)		
						let telephone=uni.getStorageSync('userInfo').telephone;
						// console.log(telephone)
						if(telephone!=null){		
							this.$u.post('/Forum/add', {
							  labelsid:this.fromlist.labelsid,  //'伤圈标签主键',
							  uid:this.fromlist.uid,// '发布人主键',
							  title:this.fromlist.title, // '标题',
							  content:this.fromlist.content, // '内容',
							  picture:this.fromlist.picture,  // '图片信息',
							  recommend:0,   //'是否推荐  0不推荐  1推荐',
							  choice:0  // '是否精选  0不是  1是',
							})
							.then( res =>{
								console.log(res)
								if(res.code ==200){		
									let pages = getCurrentPages(); //获取当前页面栈
									let beforePage = pages[0]; //上一页
									// console.log(beforePage)
									uni.switchTab({
										url:'./circleindex',
										success: function() {
										 beforePage.onLoad();
										},
										
									})
									uni.showToast({
										title: res.msg,
										icon: 'none'
									});			
								}
							})	
						}else{
							uni.showToast({
								title: '请先绑定手机号',
								icon: 'none'
							});	
						}
						
					}else{
						uni.showToast({
							title: '请选择标签',
							icon: 'none'
						});	
						
					}
					
					
					
				}
			}
	}
</script>

<style lang="scss" scoped>
	.addboss{
		width: 90%;
		margin-left: 5%;
		.dropview{
			margin-bottom: 10rpx;
		}
		.addcontent{
			width: 100%;
			border-radius: 5px;
			background-color: #f9f9f9;
			height: 350rpx;
			overflow: scroll;
			padding: 30rpx;
		}
		.unloadview{
			margin-top: 20px;
			margin-bottom: 300rpx;
		}
		.shancuan{
			width: 90%;
			height: 100rpx;
			background-color: #5B9CF9;
			color: #fff;
			letter-spacing: 2px;
			text-align: center;
			line-height: 100rpx;
			border-radius: 4px;
			font-size: 16px;
			position: fixed;
			bottom: 30px;
			z-index: 999;
		}
	}
</style>
