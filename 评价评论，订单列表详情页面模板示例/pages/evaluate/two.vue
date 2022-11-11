<template>
	<view class="page_pingjia2">
		<view class="zhuti" v-for="(item,index) in pro">
			<view class="touxiang">
				<u--image :showLoading="true" :src="item.src" width="80px" height="80px" @click="click"></u--image>
			</view>
			<view class="heti">
				<view class="name" style="font-size: 14px; font-weight: 600;">{{item.title}}</view>
				<view style="display: flex; margin-top: 20px;">
					<view class="miaoshu" style="font-size: 12px;">{{item.other}}</view>
					<view class="xx">
						<start :count="item.count" active-color="#4f007a" v-model="item.value"></start>
					</view>
				</view>
			</view>
		</view>
		<view class="dianping">
			<view class="kuang">
				<u--textarea height="200" v-model="value1" placeholder="请输入亲的评价">
				</u--textarea>
				<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple
					:maxCount="3" action='链接地址' style="position: absolute;top: 160px;left: 20px;"></u-upload>
			</view>
			<view v-for="(item,index) in rate">
				<view style="display: flex; margin-top: 20px;margin-left: 10px;">
					<view class="taidu">{{item.name}}</view>
					<view style="margin-left: 20px;">
						<start active-color="#4f007a" :count="item.count" v-model="item.value3"></start>
					</view>
				</view>
			</view>
			<view v-for="(item,index) in button">
				<u-button style="width: 80vw; margin-top: 100px;" type="info" color="#4f007a" shape="circle">
					{{item.name}}</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import start from '../../common/components/uni-rate.vue'
	export default {
		components: {
			start
		},
		data() {
			return {
				value1: '',//输入框
				fileList1: [],
				pro: [{
					src: require('@/tupian/touxiang.jpg'),
					title: "手绘斑马和狮子田园风创意棉麻抱枕 手绘风百搭撞色风抱枕",
					other: "相符描述:",
					value: ""
				}],
				rate: [{
						name: "物流服务:",
						count: 5,
						type: "",
						value3: ""
					},
					{
						name: "服务态度:",
						count: 5,
						type: "",
						value3: ""
					}
				],
				button: [{
					name: '发布'
				}],
				
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

		}
	}
</script>

<style lang="scss">
	$abc:#ffffff;

	.page_pingjia2 {
		height: 100vh;
		width: 100vw;
		background-color: #F4F4F6;

		.pingjia2 {
			color: $abc;

		}

		.xx {
			margin-left: 5px;
		}

		.kuang {
			padding-top: 30px;
			width: 95%;
			padding-left: 10px;
		}

		.dianping {
			margin-top: 20px;
			height: 80vh;
			width: 100vw;
			background-color: #ffffff;
			position: relative;
		}

		.miaoshu {
			margin-top: 3px;
			display: flex;
			color: #888888;
		}

		.heti {
			margin-left: 15px;
			margin-top: 10px;
		}

		.touxiang {
			margin-top: 10px;
			margin-left: 10px;
		}

		.zhuti {
			display: flex;
			height: 15vh;
			width: 100vw;
			background-color: #ffffff;
		}
	}
</style>
