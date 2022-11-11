<template>
	<view class="u-page">
		<view class="ben">
			<u-steps :current="current">
				<u-steps-item title="我的相册"></u-steps-item>
				<u-steps-item title="基本信息"></u-steps-item>
				<u-steps-item title="工作信息"></u-steps-item>
				<u-steps-item title="兴趣爱好"></u-steps-item>
			</u-steps>
		</view>
		<view class="ben">


			<u--form :model="form" ref="uForm">
				<u-form-item label="相册" prop="name" v-if="current==0">
					<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple
						:maxCount="9"></u-upload>
				</u-form-item>
				<u-form-item label="性别" prop="name" borderBottom v-if="current==1">
					<u-radio-group v-model="form.sex">
						<u-radio :customStyle="{marginRight: '16px'}" label="男" :name="0">
						</u-radio>
						<u-radio :customStyle="{marginRight: '16px'}" label="女" :name="1">
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item label="生日" prop="name" borderBottom @click="showBirthday = true; hideKeyboard()"
					v-if="current==1">
					<u--input v-model="form.year" disabled disabledColor="#ffffff" placeholder="请选择生日" border="none">
					</u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="星座" prop="name" borderBottom @click="showSex = true; hideKeyboard()"
					v-if="current==1">
					<u--input v-model="form.constellation" disabled disabledColor="#ffffff" placeholder="请选择星座"
						border="none"></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="身高" prop="name" borderBottom v-if="current==1">
					<u-input v-model="form.height" placeholder="请输入身高/cm" />
				</u-form-item>
				<u-form-item label="体重" prop="name" borderBottom v-if="current==1">
					<u-input v-model="form.weight" placeholder="请输入体重/kg" />
				</u-form-item>
				<u-form-item label="单位" prop="name" borderBottom v-if="current==2">
					<u-input v-model="form.company" placeholder="请输入单位" />
				</u-form-item>
				<u-form-item label="职位" prop="name" borderBottom v-if="current==2">
					<u-input v-model="form.position" placeholder="请输入职位" />
				</u-form-item>
				<u-form-item label="现住地址" prop="name" borderBottom v-if="current==2">
					<u-input v-model="form.address" placeholder="请输入现住地址" />
				</u-form-item>
				<u-form-item label="微信号" prop="name" borderBottom v-if="current==2&&userInfo.bid==1">
					<u-input v-model="form.wx" placeholder="请输入微信号" />
				</u-form-item>
				<u-form-item label="自我描述" prop="name" borderBottom v-if="current==3">
					<u--textarea placeholder="不低于3个字" v-model="form.description" count height="60"></u--textarea>
				</u-form-item>
				<u-form-item label="兴趣爱好" prop="name" borderBottom v-if="current==3">
					<u--textarea placeholder="不低于3个字" v-model="form.hobby" count height="60"></u--textarea>
				</u-form-item>
				<u-form-item label="爱情观" prop="name" borderBottom v-if="current==3">
					<u--textarea placeholder="不低于3个字" v-model="form.love" count height="60"></u--textarea>
				</u-form-item>
				<u-form-item label="理想的另一半" prop="name" v-if="current==3">
					<u--textarea placeholder="不低于3个字" v-model="form.half" count height="60"></u--textarea>
				</u-form-item>

			</u--form>
			<u-button @click="submit" type="primary" v-if="current==3">提交</u-button>
			<u-button @click="zhuan" type="primary" v-if="current<3">下一页</u-button>
		</view>


		<u-datetime-picker :show="showBirthday" :value="year" mode="date" closeOnClickOverlay @confirm="birthdayConfirm"
			@cancel="birthdayClose" @close="birthdayClose"></u-datetime-picker>
		<u-action-sheet :show="showSex" :actions="xingzuo" title="请选择星座" @close="showSex = false" @select="sexSelect">
		</u-action-sheet>
	</view>
</template>

<script>
	import debounces from '../../util/debounces.js'
	export default {

		data() {

			return {
				userInfo: null,
				current: 0,
				showBirthday: false,
				showSex: false,
				form: {
					uid: 0,
					sex: 0,
					year: "",
					constellation: "",
					height: '',
					weight: '',
					address: '',
					company: '',
					position: '',
					description: '',
					hobby: '',
					love: '',
					half: '',
					wx: '',
					album: ''

				},
				fileList1: [],
				xingzuo: [{
					name: "白羊座"
				}, {
					name: "金牛座"
				}, {
					name: "双子座"
				}, {
					name: "巨蟹座"
				}, {
					name: "狮子座"
				}, {
					name: "处女座"
				}, {
					name: "天秤座"
				}, {
					name: "天蝎座"
				}, {
					name: "射手座"
				}, {
					name: "魔羯座"
				}, {
					name: "水瓶座"
				}, {
					name: "双鱼座"
				}]

			};
		},
		onLoad(e) {
			uni.hideShareMenu({
				menus: ['shareAppMessage', 'shareTimeline']
			})
		},
		onShow() {
			this.userInfo = uni.getStorageSync('userInfo');
			this.form.uid = uni.getStorageSync('userInfo').id;
		},
		methods: {
			zhuan() {

				if (this.current < 3) {
					if (this.current == 0) {
						if (this.fileList1.length > 0) {
							let picture = "";
							for (let i = 0; i < this.fileList1.length; i++) {
								if (i == 0) {
									picture = this.fileList1[i].url
								} else(
									picture = picture + "," + this.fileList1[i].url
								)
							}
							this.form.album = picture;
							this.current = this.current + 1
						} else {
							uni.$u.toast('相册不可为空')
						}

					} else {
						this.current = this.current + 1
					}

				}

			},
			submit() {
				uni.showLoading({
					title: '提交中',
					mask: true
				});
				debounces(() => {
					uni.$u.http.post('Encounter/add', this.form)
						.then(res => {
							// console.log(res)
							if (res.code == 200) {
								uni.hideLoading();
								uni.showToast({
									title: "提交成功,等待审核！"
								})
								setTimeout(() => {
									// 返回上一页并刷新数据方法
									let pages = getCurrentPages(); // 当前页面
									let beforePage = pages[pages.length - 2]; // 上一页
									beforePage.data.refreshIfNeeded = true;
									// 返回上一页 delta返回的页面数 如果delta大于现有页面数，则返回首页
									uni.navigateBack({
										delta: 1
									})
								}, 800);

							} else {
								uni.showToast({
									title: res.msg
								})
							}
						})
				}, 1500)
			},
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
					const result = await this.uploadFilePromise(lists[i].url)
					// console.log("result",result)
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
						url: 'https://www.xiexinfeng.top/testb/upload/imges', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						success: (res) => {
							setTimeout(() => {
								// console.log("111",JSON.parse(res.data).data)
								resolve(JSON.parse(res.data).data)
							}, 1000)
						}
					});
				})
			},
			birthdayClose() {
				this.showBirthday = false
				// this.$refs.form1.validateField('userInfo.birthday')
			},
			birthdayConfirm(e) {
				this.showBirthday = false
				this.form.year = uni.$u.timeFormat(e.value, 'yyyy-mm-dd')
				// this.$refs.form1.validateField('userInfo.birthday')
			},
			sexSelect(e) {
				this.form.constellation = e.name
			},
			hideKeyboard() {
				uni.hideKeyboard()
			}
		},
	};
</script>
<style lang="scss">
	page {
		background-color: #f2f2f247;
	}

	.ben {
		background-color: #fff;
		border-radius: 15rpx;
		padding: 30rpx 20rpx;
		margin-bottom: 40rpx;
		box-shadow: 10rpx 10rpx 20rpx #bababa;
	}

	.u-form-item__body__left {
		width: 67px !important;
	}
</style>
