<template>
	<view class="page_one">
		<view class="bian">
			<u--textarea v-model="value1" placeholder="请输入内容" border="none" height="120" style="padding-top: 15px;"></u--textarea >
			<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple :maxCount="10"
			action='链接地址' ></u-upload>
			<view class="biaoqian" style="display: flex;flex-wrap: wrap;height: 80px;">
			<view class="u-page__tag-item"  v-for="(item, index) in checkboxs" :key="index">
			<u-tag :text="item.name" :plain="!item.checked"  type="warning" :name="index" @click="checkboxClick" 
			shape="circle"  color="#000000"  plainFill>
			</u-tag>
			</view>
			</view>
			<view class="anniu" v-for="(item,index) in button">
			<u-button   color="#ff8c00"  type="info" >{{item.name}}</u-button>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				value1: '',//输入框
				fileList1: [],
				button:[{
					name:'发布'
				}],
				checkboxs: [{
						name: '#美丽主题周#',
						checked: false,
					},
					{
						name: '#智慧梳#',
						checked: false
					},
					{
						name: '#爱设计#',
						checked: false
					},
					{
						name: '#爱设计qrrqrq#',
						checked: false
					},
				]
			}
		},
		methods: {
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].thumb)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: 'http://192.168.2.21:7001/upload', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							setTimeout(() => {
								resolve(res.data.data)
							}, 1000)
						}
					});
				})
			},

			checkboxClick(name) {
				this.checkboxs[name].checked = !this.checkboxs[name].checked
			},

		}

	}
</script>

<style lang="scss">
	.page_one {
		width: 100vw;
		height: 100vh;
		background-color: #ffffff;
		.biaoqian{
			margin-top: 20px;
		
		}
		.anniu{
			margin-top: 100px;
		}
		.custom-style {
			color: #ff0000;
			width: 400rpx;
		}
		.u-page__tag-item {
			margin-right: 20px;
			height: 30px;
			
		}
		
		.bian {
			width: 90vw;
			height: 90vh;
			background-color: #ffffff;
			margin-left: 20px;
		}
	}
</style>
