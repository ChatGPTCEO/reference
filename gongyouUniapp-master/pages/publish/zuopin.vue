<template>
	<view>
		<u-toast ref="uToast" />
		<view class="content">
			<view style="margin-bottom: 15rpx;">作品相册名称/描述:</view>
			<u-line color="#eeeeee" />
			<u-input v-model="model.content" :type="type" placeholder="请描述你的作品(5字以上)" :border="border" :height="height"
				:auto-height="autoHeight" />
		</view>
		<u-gap height="15" bg-color="#eeeeee"></u-gap>
		<view style="margin-left: 20rpx;margin-top: 15rpx;">上传照片(最多6张)</view>
		<view style="padding: 20rpx;">
			<u-upload ref="uUpload" @on-success="bbb" @on-uploaded="aaa" :file-list="l" :action="action"
				:auto-upload="false" max-count="6"></u-upload>
		</view>
		<u-gap height="15" bg-color="#eeeeee"></u-gap>
		<view class="equipment">
			<view class="equipments">拍摄设备</view>
			<view class="input">
				<u-input type="text" v-model="model.equipment" placeholder="请输入使用设备 (选填)" :border="border" />
			</view>
		</view>
		<u-line color="#eeeeee" />
		<view class="place">
			<view class="places">拍摄地点</view>
			<view class="input">
				<u-input type="text" v-model="model.place" placeholder="请输入拍摄地点 (选填)" :border="border" />
			</view>
		</view>
		<u-line color="#eeeeee" />
		<u-gap height="15" bg-color="#eeeeee"></u-gap>
		<view class="taps">
			<view style="margin-bottom: 20rpx;">主题标签</view>
			<view class="skill-item" :class="{'active': isChange.indexOf(index)!=-1}" v-for="(item, index) in list"
				:key="index" @click="clickBtn(index)">
				{{item}}
			</view>
		</view>

		<view class="btn" @click="submit">
			<view class="btns">发布作品</view>
		</view>
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
					equipment: '',
					place: ''
				},
				action: http.baseUrl + '/upload/uploadZuopinImg',
				type: 'textarea',
				border: false,
				height: 100,
				autoHeight: true,
				checked: false,
				isChange: [],
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
			//图片上传完成后执行此方法
			aaa() {

				/* 	let files = [];
					// 通过filter，筛选出上传进度为100的文件(因为某些上传失败的文件，进度值不为100，这个是可选的操作)
					// files = this.$refs.uUpload.lists.filter(val => {
					// 	return val.progress == 100;
					// })
					// 如果您不需要进行太多的处理，直接如下即可
					files = this.$refs.uUpload.lists;
					let name = [];
					for (var i = 0; i < files.length; i++) {
						name[i] = files[i].url
					} */
				//console.log(name)
				api.request({
					url: '/zuopin/pulishZuopin',
					method: 'POST',
					data: {
						urls: JSON.stringify(this.fileName),
						zid: this.u_id,
						zname: this.u_name,
						zava: this.u_ava,
						zgender: this.u_gender,
						zplace: this.model.place,
						zcontent: this.model.content,
						zequipment: this.model.equipment,
						ztags: JSON.stringify(this.list2)
					},
				}).then(res => {
					if (res.data.data == 1) {
						uni.hideLoading();
						uni.reLaunch({
							url: 'successYuepai'
						})
					} else if (res.data.data == 0) {
						uni.hideLoading();
						this.$refs.uToast.show({
							title: '发表失败',
							type: 'error'
						})
					}
				});
			},

			//index   图片在数组中索引  data  是上传成功后服务器的回调
			bbb(data, index, lists, name) {
				this.fileName.push(data)
				console.log("进入BBBBBBB" + this.fileName);
				//	console.log(index + "index");
				//console.log(res.data + "data");
				//console.log(this.fileName + "fileName");
				//console.log("bbb执行"+data);
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
			//标签多选
			clickBtn(index) {
				//console.log(index)
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
				this.list2 = list2
				//console.log(list2)
			},
			//提交
			submit() {
				this.imgList = this.$refs.uUpload.lists;
				if (this.model.content == '') {
					this.$refs.uToast.show({
						title: '内容不能为空哦！',
						type: 'error'
					})
				} else if (this.imgList.length == 0) {
					this.$refs.uToast.show({
						title: '图片不能为空哦！',
						type: 'error'
					})
				} else if (this.list2.length == 0) {
					this.$refs.uToast.show({
						title: '标签不能为空哦！',
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

	.equipment {
		position: relative;
		height: 100rpx;

		.equipments {
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

	.switch {
		position: relative;
		height: 100rpx;

		.switchs {
			position: absolute;
			width: fit-content;
			top: 30rpx;
			left: 20rpx;
			display: flex;
		}

		.input {
			position: absolute;
			right: 20rpx;
			width: 75%;
			top: 15rpx;
		}
	}
</style>
