<template>
	<view>
		<u-toast ref="uToast" />
		<view class="content">
			<view style="margin-bottom: 15rpx;">场地名称：</view>
			<u-line color="#eeeeee" />
			<u-input type="text" v-model="model.content" placeholder="请输入场地名称(至少3个字)"></u-input>
		</view>
		<u-gap height="15" bg-color="#eeeeee"></u-gap>
		<view class="introduce">
			<view style="margin-bottom: 15rpx;">场地介绍：</view>
			<u-line color="#eeeeee" />
			<u-input v-model="model.introduce" :type="type" placeholder="请输入场地介绍(5字以上)" :border="border"
				:height="height" :auto-height="autoHeight" />
		</view>
		<u-gap height="15" bg-color="#eeeeee"></u-gap>
		<view class="traffic">
			<view style="margin-bottom: 15rpx;">地址与交通：</view>
			<u-line color="#eeeeee" />
			<u-input v-model="model.traffic" :type="type" placeholder="请输入地址与交通(5字以上)" :border="border" :height="height"
				:auto-height="autoHeight" />
		</view>
		<u-line color="#eeeeee" />
		<view class="type">
			<view class="types">所属类型</view>
			<view class="input">
				<u-input input-align="center" :border="border" v-model="model.type" type="select"
					:select-open="actionSheetShow" @click="show = true"></u-input>
			</view>
		</view>
		<view class="faceplace">
			<view class="faceplaces">面向地区</view>
			<view class="input">
				<u-input input-align="center" :border="border" v-model="model.faceplace" type="select"
					:select-open="actionSheetShow2" @click="show2 = true"></u-input>
			</view>
		</view>
		<u-gap height="15" bg-color="#eeeeee"></u-gap>
		<view style="margin-left: 20rpx;margin-top: 15rpx;">上传照片(最多6张)</view>
		<view style="padding: 20rpx;">
			<u-upload ref="uUpload" @on-success="bbb" @on-uploaded="aaa" :file-list="l" :action="action"
				:auto-upload="false" max-count="6"></u-upload>
		</view>
		<u-gap height="15" bg-color="#eeeeee"></u-gap>
		<view class="taps">
			<view style="margin-bottom: 20rpx;">主题标签</view>
			<view class="skill-item" :class="{'active': isChange.indexOf(index)!=-1}" v-for="(item, index) in list"
				:key="index" @click="clickBtn(index)">
				{{item}}
			</view>
		</view>

		<view class="btn" @click="submit">
			<view class="btns">发布场地</view>
		</view>

		<u-select v-model="show" mode="single-column" :list="List" @confirm="confirm"></u-select>
		<u-select v-model="show2" mode="single-column" :list="List2" @confirm="confirm2"></u-select>

	</view>
</template>

<script>
	import * as api from '@/api/api.js'
	import http from '@/api/http.js'
	export default {
		data() {
			return {
				fileName: [],
				imgList: [],
				u_id: '',
				u_ava: '',
				u_name: '',
				u_gender: '',
				model: {
					content: '',
					introduce: '',
					faceplace: '校内',
					traffic: '',
					type: '景点'
				},
				action: http.baseUrl + '/upload/uploadChangdiImg',
				type: 'textarea',
				border: false,
				height: 100,
				autoHeight: true,
				show: false,
				show2: false,
				actionSheetShow: false,
				actionSheetShow2: false,
				List: [{
						value: 1,
						label: '景点'
					},
					{
						value: 2,
						label: '影棚'
					},
					{
						value: 3,
						label: '街道'
					},
					{
						value: 4,
						label: '校园'
					},
					{
						value: 5,
						label: '郊外'
					},
					{
						value: 6,
						label: '图书馆'
					},
					{
						value: 7,
						label: '咖啡厅'
					},
					{
						value: 8,
						label: '游乐场'
					},
					{
						value: 9,
						label: '商场'
					},
					{
						value: 10,
						label: '酒店'
					},
					{
						value: 11,
						label: '其他'
					}
				],
				List2: [{
						value: 1,
						label: '校内'
					},
					{
						value: 2,
						label: '校外'
					}
				],
				isChange: [], //多选
				list2: [],
				list: ['情侣', '商务', '民国', '汉服', '日系', '儿童', '暗黑', '情绪', '夜景', '校园', '妆容', '古风', '淘宝', '时尚', '和服', '旗袍',
					'韩系', '欧美',
					'少女', '清新', '角色', '婚礼', '胶片', '黑白'
				]
			}
		},
		onLoad() {
			this.init();
		},
		methods: {
			//index   图片在数组中索引  data  是上传成功后服务器的回调
			bbb(data, index, lists, name) {
				this.fileName.push(data)
				console.log("进入BBBBBBB" + this.fileName);
				//	console.log(index + "index");
				//console.log(res.data + "data");
				//console.log(this.fileName + "fileName");
				//console.log("bbb执行"+data);
			},
			//图片上传完成后执行此方法
			aaa() {
				/* let files = [];
				files = this.$refs.uUpload.lists;
				let name = [];
				for (var i = 0; i < files.length; i++) {
					name[i] = files[i].url
				} */
				api.request({
					url: '/changdi/pulishChangdi',
					method: 'POST',
					data: {
						urls: JSON.stringify(this.fileName),
						cid: this.u_id,
						cname: this.u_name,
						cava: this.u_ava,
						cgender: this.u_gender,
						ccontent: this.model.content,
						cintroduce: this.model.introduce,
						ctraffic: this.model.traffic,
						ctype: this.model.type,
						cfaceplace: this.model.faceplace,
						ctags: JSON.stringify(this.list2)
					},
				}).then(res => {
					if (res.data.data == 1) {
						uni.hideLoading();
						uni.reLaunch({
							url: 'successYuepai'
						})

					} else if (res.data.data == 0) {
						uni.hideLoading()
						this.$refs.uToast.show({
							title: '发表失败',
							type: 'error'
						})
					}
				})
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
			//标签确认
			confirm(res) {
				uni.hideKeyboard();
				this.model.type = res[0].label;
			},
			//标签确认
			confirm2(res) {
				uni.hideKeyboard();

				this.model.faceplace = res[0].label;
			},
			//标签多选
			clickBtn(index) {

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
				this.list2 = list2

			},
			//提交
			submit() {
				this.imgList = this.$refs.uUpload.lists;
				if (this.model.content == '') {
					this.$refs.uToast.show({
						title: '内容不能为空！',
						type: 'error'
					})
				} else if (this.model.introduce == '') {
					this.$refs.uToast.show({
						title: '介绍不能为空！',
						type: 'error'
					})

				} else if (this.model.traffic == '') {
					this.$refs.uToast.show({
						title: '地址不能为空！',
						type: 'error'
					})

				} else if (this.imgList.length == 0) {
					this.$refs.uToast.show({
						title: '图片不能为空!',
						type: 'error'
					})

				} else if (this.list2.length == 0) {
					this.$refs.uToast.show({
						title: '标签不能为空！',
						type: 'error'
					})
				} else {
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

	.introduce {
		padding: 20rpx;
	}

	.traffic {
		padding: 20rpx;
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
			position: absolute;
			right: 20rpx;
			width: 75%;
			top: 15rpx;
		}
	}

	.type {
		position: relative;
		height: 100rpx;

		.types {
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
