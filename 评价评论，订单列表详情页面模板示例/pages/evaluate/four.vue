<template>
	<view class="page_pingjia4">
		<view class="kuang">
			<view class="biaoti" v-for="(item,index) in por">{{item.title}}</view>
			<view class="xx">
				<start :count="count" v-model="value" size="35" activeColor="#ffaa00"></start>
			</view>
			<view class="xkuang">
				<view style="display: flex;" v-for="(item,index) in rate">
					<view class="ziti">{{item.name}}</view>
					<start :count="item.count" style="margin-top: 15px; margin-left: 50px;" size="35"
						activeIcon="heart-fill" inactiveIcon="heart" activeColor="#ffaa00" v-model="item.value1">
					</start>
				</view>
			</view>
			<view>
				<u--textarea style="margin-top: 20px;" background-color="#6d6d6d" v-model="value3" placeholder="请输入内容">
				</u--textarea>
			</view>
			<u-upload :fileList="fileList1" style="margin-top: 10px;" @afterRead="afterRead" @delete="deletePic"
				name="1" multiple :maxCount="10" action='链接地址'></u-upload>
			<view class="niming">
				<u-radio-group v-model="radiovalue1" placement="column" @change="groupChange">
					<u-radio :customStyle="{marginBottom: '8px'}" v-for="(item, index) in hidden" :key="index"
						:label="item.name" :name="item.name">
					</u-radio>
				</u-radio-group>
			</view>
		</view>
		<view class="anniu" v-for="(item,index) in button">
			<u-button type="warning">{{item.name}}</u-button>
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
				count: "5",
				value: '',
				value3: '',
				radiovalue1: '',
				fileList1: [],
				por: [{
					title: '"无可挑剔"',
				}],
				rate: [{
						name: "口味",
						count: "5",
						value1: '',
					},
					{
						name: "包装",
						count: "5",
						value1: '',
					}
				],
				button: [{
					name: '提交'
				}],

				hidden: [{
					name: '匿名评论',
					disabled: false
				}],
			}
		},
		methods: {
			groupChange(n) {
				console.log('groupChange', n);
			},
			radioChange(n) {
				console.log('radioChange', n);
			},
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
			}
		}
	}
</script>

<style lang="scss">
	.page_pingjia4 {
		width: 100vw;
		height: 80vh;
		background-color: #ffffff;

		.anniu {
			margin-top: 48px;
			width: 90vw;
			margin-left: 20px;
		}

		.niming {
			margin-top: 20px;
		}

		.ziti {
			color: #909090;
			margin-top: 23px;
		}

		.xkuang {
			margin-top: 20px;
			height: 18vh;
			background-color: #FAFAFA;
			padding-left: 30px;
		}

		.xx {
			margin-left: 24%;
			padding-top: 10px;
		}

		.biaoti {
			width: 80%;
			margin: 0 auto;
			text-align: center;
			margin-top: 20px;
		}

		.kuang {
			width: 90vw;
			height: 75vh;
			background-color: #ffffff;
			margin-left: 20px;
		}
	}
</style>
