<template>
	<view>
		<u-toast ref="uToast" />
		<view class="content">
			<view style="margin-bottom: 15rpx;">约拍要求：</view>
			<u-line color="#eeeeee" />
			<u-input v-model="model.content" :type="type" placeholder="请描述你的约拍要求(5字以上)" :border="border" :height="height"
			 :auto-height="autoHeight" />
		</view>
		<u-gap height="15" bg-color="#eeeeee"></u-gap>
		<view style="margin-left: 20rpx;margin-top: 15rpx;">上传照片(最多6张)</view>
		<view style="padding: 20rpx;">
			<u-upload ref="uUpload" @on-success="bbb" @on-uploaded="aaa" :file-list="l" :action="action" :auto-upload="false" max-count="6"></u-upload>
		</view>
		<u-gap height="15" bg-color="#eeeeee"></u-gap>

		<view class="time">
			<view class="times">上班时间</view>
			<view class="input">
				<u-input v-model="model.p_time" type="text" placeholder="您期望的上班时间  (选填)" :border="border" />
			</view>
		</view>
		<u-line color="#eeeeee" />
		<view class="place">
			<view class="places">工作地点</view>
			<view class="input">
				<u-input type="text" v-model="model.p_place" placeholder="您期望的上班地点  (选填)" :border="border" />
			</view>
		</view>
		<u-line color="#eeeeee" />
		<view class="cost">
			<view class="costs">时间工价</view>
			<view class="input">
				<u-input type="text" v-model="model.p_chengben" placeholder="期望多少小时,多少钱  (选填)" :border="border" />
			</view>
		</view>
		<u-gap height="15" bg-color="#eeeeee"></u-gap>

		<view class="identity">
			<view class="identity">您的角色</view>
			<view class="input">
				<u-input input-align="center" :border="border" v-model="model.identity" type="select" :select-open="actionSheetShow3"
				 @click="actionSheetShow3 = true"></u-input>
			</view>
		</view>

		<view class="price">
			<view class="prices">发布模式</view>
			<view class="input">
				<u-input input-align="center" :border="border" v-model="model.price" type="select" :select-open="actionSheetShow"
				 @click="actionSheetShow = true"></u-input>
			</view>
		</view>
		<u-line v-if="model.price == '找人干活' || model.price == '找人干活'" color="#eeeeee" />
		<view class="money" v-if="model.price == '找人干活' || model.price == '找人干活'">
			<view class="moneys">需要几人</view>
			<view class="input">
				<u-input type="text" v-model="model.money" placeholder="请输入具体人数(单位:个)" :border="border" />
			</view>
		</view>

		<u-line color="#eeeeee" />
		<view class="faceplace">
			<view class="faceplaces">面向地区</view>
			<view class="input">
				<u-input input-align="center" :border="border" v-model="model.faceplace" type="select" :select-open="actionSheetShow2"
				 @click="actionSheetShow2 = true"></u-input>
			</view>
		</view>
		<u-gap height="15" bg-color="#eeeeee"></u-gap>
		<view class="taps">
			<view style="margin-bottom: 20rpx;">主题标签</view>
			<view class="skill-item" :class="{'active': isChange.indexOf(index)!=-1}" v-for="(item, index) in list" :key="index"
			 @click="clickBtn(index)">
				{{item}}
			</view>
		</view>

		<view class="btn" @click="submit">
			<view class="btns">发布约拍</view>
		</view>

		<u-action-sheet :list="actionSheetList" v-model="actionSheetShow" @click="actionSheetCallback"></u-action-sheet>
		<u-action-sheet :list="actionSheetList2" v-model="actionSheetShow2" @click="actionSheetCallback2"></u-action-sheet>
		<u-action-sheet :list="actionSheetList3" v-model="actionSheetShow3" @click="actionSheetCallback3"></u-action-sheet>
	</view>
</template>

<script>
	import * as api from '@/api/api.js'
	import http from '@/api/http.js'
	export default {
		data() {
			return {
				fileName:[],
				imgList: [],
				u_id: '',
				u_ava: '',
				u_gender: '',
				u_name: '',
				model: {
					title: '',
					content: '',
					identity: 'boss',
					p_time: '',
					p_place: '',
					p_chengben: '',
					money: '0',
					price: '找人干活',
					faceplace: '国内',
				},
				action: http.baseUrl+'/upload/uploadYuepaiImg',
				l: [],
				value: '',
				type: 'textarea',
				border: false,
				height: 100,
				autoHeight: true,
				actionSheetShow: false,
				actionSheetShow2: false,
				actionSheetShow3: false,
				actionSheetList: [{
						text: '只招男工'
					},
					{
						text: '只招女工'
					},
					{
						text: '找人干活'
					},
					{
						text: '我要找活'
					}
				],
				actionSheetList2: [{
						text: '国内'
					},
					{
						text: '国外'
					}
				],
				actionSheetList3: [{
						text: '油工'
					},
					{
						text: '瓦工'
					},
					{
						text: '木工'
					},
					{
						text: '电工'
					},
					{
						text: 'boss'
					},
					{
						text: '水暖工'
					},
					{
						text: '杂工'
					}
				],
				isChange: [], //多选
				list2: [],
				list: ['骑行', '商务', '民国', '汉服', '日系', '儿童', '暗黑', '情绪', '夜景', '校园', '妆容', '古风', '淘宝', '时尚', '和服', '旗袍', '韩系', '欧美',
					'少女', '清新', '角色', '婚礼', '胶片', '黑白'
				]
			}
		},
		onLoad(res) {
			//console.log(res.title)
			this.model.title = res.title;
			this.init();
		},
		methods: {
			//index   图片在数组中索引  data  是上传成功后服务器的回调
			bbb(data, index, lists, name) {
				this.fileName.push(data)
				console.log("进入BBBBBBB"+this.fileName);
				//	console.log(index + "index");
				//console.log(res.data + "data");
				//console.log(this.fileName + "fileName");
				//console.log("bbb执行"+data);
			},
			//图片上传完成后执行此方法
			aaa() {
				console.log("进入AAAAAAAAAAA"+this.fileName);
				uni.hideLoading(); 
				//let files = [];
				// 通过filter，筛选出上传进度为100的文件(因为某些上传失败的文件，进度值不为100，这个是可选的操作)
				// files = this.$refs.uUpload.lists.filter(val => {
				// 	return val.progress == 100;
				// })
				// 如果您不需要进行太多的处理，直接如下即可
				//files = this.$refs.uUpload.lists;
				// let name = [];
				// for (var i = 0; i < files.length; i++) {
				// 	name[i] = files[i].url
				// }
				//console.log(name)
				api.request({
					url:'/yuePai/saveYuepaiInfo',
					method: 'POST',
					data: {
						//urls: name,//图片名称列表
						//urlsList: this.fileName,//图片名称列表
						urls: JSON.stringify(this.fileName),//图片名称列表
						pid: this.u_id,
						pname: this.u_name,
						pava: this.u_ava,
						pgender: this.u_gender,
						ptime: this.model.p_time,
						pplace: this.model.p_place,
						pchengben: this.model.p_chengben,
						title: this.model.title,
						identity: this.model.identity,
						content: this.model.content,
						faceplace: this.model.faceplace,
						payment: this.model.price,
						money: this.model.money,
						ptags: JSON.stringify(this.list2)
					},
				}).then(res=>{
					if (res.data.data == 1) {
						uni.reLaunch({
							url:'successYuepai'
						})
					} else if (res.data.data == 0) {
						uni.hideLoading()
						this.$refs.uToast.show({
							title: '发表失败',
							type: 'error'
						})
					}
				});
			},
			//信息初始化
			init() {
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						this.u_id = res.data.userId;
						this.u_ava = res.data.avatarUrl;
						this.u_name = res.data.username;
						this.u_gender = res.data.gender;
					}
				})
			},
			//选项确认
			actionSheetCallback(index) {
				uni.hideKeyboard();
				this.model.price = this.actionSheetList[index].text;
			},
			actionSheetCallback2(index) {
				uni.hideKeyboard();
				this.model.faceplace = this.actionSheetList2[index].text;
			},
			actionSheetCallback3(index) {
				uni.hideKeyboard();
				this.model.identity = this.actionSheetList3[index].text;
			},
			//标签多选
			clickBtn(index) {
				//console.log(this.isChange)
				// 多选
				if (this.isChange.indexOf(index) == -1) {
					if (this.isChange.length == 3) {
						uni.showToast({
							title: '最多选择三项',
							icon: 'none'
						})
					} else {
						this.isChange.push(index); //选中添加到数组里
					}
				} else {
					this.isChange.splice(this.isChange.indexOf(index), 1); //取消选中
				}
				let list2 = []
				for (let index in this.isChange) {
					list2.push(this.list[this.isChange[index]])
				}

				this.list2 = list2;
				//console.log(list2)
				//console.log(JSON.stringify(this.list2))

			},
			//提交
			submit() {
				this.imgList = this.$refs.uUpload.lists;
				//console.log(this.imgList)
				if (this.model.content == '') {
					this.$refs.uToast.show({
						title: '内容不能为空哦！',
						type: 'error'
					})
				}else if(this.imgList.length==0){
					this.$refs.uToast.show({
						title: '图片不能为空哦！',
						type: 'error'
					})
				}else if(this.list2.length==0){
					this.$refs.uToast.show({
						title: '标签不能为空哦！',
						type: 'error'
					})
				}else{
					api.request({
						url: '/mesCheck/getData',
						method: 'GET',
						data: {
							content: this.model.content,
						},
					}).then(res => {
						//console.log(res);
						
						if (res.data.errcode == 0) {
							console.log("内容检查成功");
							
							this.$refs.uUpload.upload();
							uni.showLoading({
								title: '发布中，请稍后'
							});
							
						} else {
							this.$refs.uToast.show({
								title: '内容包含敏感词汇!请检查!',
								type: 'error'
							})
							return;
						}
					});
				}





			}
		}

	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 20rpx;
	}

	.time {
		position: relative;
		height: 100rpx;

		.times {
			position: absolute;
			width: fit-content;
			top: 30rpx;
			left: 20rpx;
		}

		.input {
			position: absolute;
			right: 20rpx;
			width: 75%;
			top: 15rpx;
		}
	}

	.place {
		position: relative;
		height: 100rpx;

		.places {
			position: absolute;
			width: fit-content;
			top: 30rpx;
			left: 20rpx;
		}

		.input {
			position: absolute;
			right: 20rpx;
			width: 75%;
			top: 15rpx;
		}
	}

	.cost {
		position: relative;
		height: 100rpx;

		.costs {
			position: absolute;
			width: fit-content;
			top: 30rpx;
			left: 20rpx;
		}

		.input {
			position: absolute;
			right: 20rpx;
			width: 75%;
			top: 15rpx;
		}
	}

	.money {
		position: relative;
		height: 100rpx;

		.moneys {
			position: absolute;
			width: fit-content;
			top: 30rpx;
			left: 20rpx;
		}

		.input {
			position: absolute;
			right: 20rpx;
			width: 75%;
			top: 15rpx;
		}
	}


	.price {
		position: relative;
		height: 100rpx;

		.prices {
			position: absolute;
			width: fit-content;
			top: 30rpx;
			left: 20rpx;
		}

		.input {
			width: 70%;
			position: absolute;
			right: 60rpx;
			top: 15rpx;
		}
	}

	.faceplace {
		position: relative;
		height: 100rpx;

		.faceplaces {
			position: absolute;
			width: fit-content;
			top: 30rpx;
			left: 20rpx;
		}

		.input {
			width: 70%;
			position: absolute;
			right: 60rpx;
			top: 15rpx;
		}
	}

	.identity {
		position: relative;
		height: 100rpx;

		.identity {
			position: absolute;
			width: fit-content;
			top: 30rpx;
			left: 20rpx;
		}

		.input {
			width: 70%;
			position: absolute;
			right: 60rpx;
			top: 15rpx;
		}
	}




	.skill-item {
		display: inline-block;
		width: 100rpx;
		//height:50rpx;
		border: 2rpx solid #554d84;
		border-radius: 10rpx;
		font-size: 30rpx;
		//color:#555;
		text-align: center;
		line-height: 50rpx;
		margin-left: 15rpx;
		margin-bottom: 15rpx;
	}

	.active {
		//border:2rpx solid #DD524D;
		color: white;
		background: #554d84;
	}

	.taps {
		padding: 20rpx;
		//margin-bottom:80rpx ;
	}

	.btn {
		//position: fixed;
		width: 100%;
		height: 100rpx;
		text-align: center;
		background-image: linear-gradient(to bottom right, #81dde1, #88eec9);

		//bottom: 0;
		.btns {
			padding-top: 25rpx;
			font-size: 35rpx;
			color: white;
		}
	}
</style>
