<template>
	<view>
		<view class="form">
			<u-form-item label="店铺名称" label-width="150rpx">
				<u-input v-model="form.name" type="text" placeholder="请输入" />
			</u-form-item>
			<u-form-item label="店铺分类" label-width="150rpx">
				<u-input v-model="catename" @click="cateShow = true" type="select" placeholder="请选择" />
			</u-form-item>
			<u-form-item label="封面图" label-width="150rpx">
				<u-upload width="160" height="160" :action="action" max-count="1" :file-list="coverlist"
					@on-success="coverSuccess" @on-remove="coverRemove"></u-upload>
			</u-form-item>
			<u-form-item label="营业执照" label-width="150rpx">
				<u-upload width="160" height="160" :action="action" max-count="1" :file-list="cardlist"
					@on-success="cardSuccess" @on-remove="cardRemove"></u-upload>
			</u-form-item>
			<u-form-item label="店铺图片" label-width="150">
				<u-upload width="160" height="160" :action="action" max-count="6" :file-list="imglist"
					@on-success="imgSuccess" @on-remove="imgRemove"></u-upload>
			</u-form-item>
			<u-form-item label="营业时间" label-width="150rpx">
				<view class="openbox">
					<view class="opentime">
						<u-input v-model="form.open_stime" @click="stimeShow = true" type="select" placeholder="请选择" />
						<text style="margin-left: 20rpx;margin-right: 20rpx;">至</text>
						<u-input v-model="form.open_etime" @click="etimeShow = true" type="select" placeholder="请选择" />
					</view>
					<u-checkbox-group active-color="#f44c01" @change="checkboxGroupChange">
						<u-checkbox v-model="item.checked" v-for="(item, index) in list" :key="index" :name="item.name">
							{{item.label}}
						</u-checkbox>
					</u-checkbox-group>
				</view>
			</u-form-item>
			<u-form-item label="店铺地址" label-width="150rpx">
				<u-input v-model="form.address" @click="opensite" type="select" placeholder="请选择" />
			</u-form-item>
			<u-form-item label="店铺描述" label-width="200rpx" label-position="top">
				<u-input v-model="form.content" type="textarea" height="200" :maxlength="-1" placeholder="请输入店铺描述" />
			</u-form-item>
			<u-form-item label="联系人" label-width="150rpx">
				<u-input v-model="form.person_name" placeholder="请输入" />
			</u-form-item>
			<u-form-item label="联系电话" label-width="150rpx">
				<u-input v-model="form.person_mobile" placeholder="请输入" />
			</u-form-item>
		</view>
		<u-picker mode="time" v-model="stimeShow" :params="params" @confirm="stimeConfirm"></u-picker>
		<u-picker mode="time" v-model="etimeShow" :params="params" @confirm="etimeConfirm"></u-picker>
		<u-select v-model="cateShow" label-name="name" value-name="id" mode="mutil-column-auto" :list="catelist"
			@confirm="cateConfirm"></u-select>
		<view style="height: 120rpx;"></view>
		<botbtn btntext="提交资料" @confirem="submit"></botbtn>
	</view>
</template>

<script>
	import {
		API_URL
	} from '@/env.js'
	import botbtn from '@/components/Botbtn/Botbtn.vue'
	export default {
		components: {
			botbtn,
		},
		data() {
			return {
				type: 'add',
				form: {
					id: '',
					name: '',
					category_id: '',
					childcate_id: '',
					cover_image: '',
					open_stime: '',
					open_etime: '',
					lng: '',
					lat: '',
					address: '',
					card_image: '',
					openweeks: '',
					banner_images: '',
					content: '',
					person_name: '',
					person_mobile: '',
				},
				coverlist: [],
				imglist: [],
				cardlist: [],
				action: API_URL + '/addons/hicity/index/upload',
				list: [{
					label: '周一',
					name: '1',
					checked: false,
				}, {
					label: '周二',
					name: '2',
					checked: false,
				}, {
					label: '周三',
					name: '3',
					checked: false,
				}, {
					label: '周四',
					name: '4',
					checked: false,
				}, {
					label: '周五',
					name: '5',
					checked: false,
				}, {
					label: '周六',
					name: '6',
					checked: false,
				}, {
					label: '周日',
					name: '7',
					checked: false,
				}],
				params: {
					year: false,
					month: false,
					day: false,
					hour: true,
					minute: true,
					second: false
				},
				stimeShow: false,
				etimeShow: false,
				cateShow: false,
				catename: '',
				catelist: []
			};
		},
		onLoad(e) {
			uni.showLoading({
				title: '加载中'
			})
			this.$u.get('/addons/hicity/store/getCate').then(res => {
				this.catelist = res;
			})
			this.$u.get('/addons/hicity/store/getUserStore').then(res => {
				uni.hideLoading();
				if (res) {
					this.type = 'edit';
					this.form = {
						id: res.id,
						name: res.name,
						category_id: res.category_id,
						childcate_id: res.childcate_id,
						cover_image: res.cover_image,
						open_stime: res.open_stime,
						open_etime: res.open_etime,
						lng: res.lng,
						lat: res.lat,
						address: res.address,
						card_image: res.card_image,
						openweeks: res.openweeks,
						banner_images: res.banner_images,
						content: res.content,
						person_name: res.person_name,
						person_mobile: res.person_mobile,
					}
					this.catename = res.category.name + '/' + res.childcategory.name;
					this.coverlist = res.cover_image_full;
					this.cardlist = res.card_image_full;
					this.imglist = res.banner_images_full;
					this.list.map((item, index) => {
						if (res.openweeks.search(item.name) != -1) {
							this.list[index]['checked'] = true;
						}
					})
				} else {
					this.type = 'add';
				}
			})
		},
		methods: {
			// 选中任一checkbox时，由checkbox-group触发
			checkboxGroupChange(e) {
				let str = e.join(',');
				this.form.openweeks = str;
			},
			opensite() {
				var that = this;
				uni.chooseLocation({
					success: function(res) {
						that.form.lat = res.latitude;
						that.form.lng = res.longitude;
						that.form.address = res.address;
					}
				});
			},
			stimeConfirm(e) {
				this.form.open_stime = e.hour + ':' + e.minute;
			},
			etimeConfirm(e) {
				this.form.open_etime = e.hour + ':' + e.minute;
			},
			cateConfirm(e) {
				this.form.category_id = e[0].value;
				this.form.childcate_id = e[1].value;
				this.catename = e[0].label + '/' + e[1].label;
			},
			imgRemove(index, lists, name) {
				let banner = [];
				lists.map((item) => {
					banner.push(item.response.data.url);
				})
				if (banner.length > 0) {
					this.form.banner_images = banner.join(',');
				} else {
					this.form.banner_images = '';
				}
			},
			imgSuccess(data, index, lists, name) {
				let banner = [];
				lists.map((item) => {
					banner.push(item.response.data.url);
				})
				if (banner.length > 0) {
					this.form.banner_images = banner.join(',');
				}
			},
			coverRemove(index, lists, name) {
				let banner = [];
				lists.map((item) => {
					banner.push(item.response.data.url);
				})
				if (banner.length > 0) {
					this.form.cover_image = banner.join(',');
				} else {
					this.form.cover_image = '';
				}
			},
			coverSuccess(data, index, lists, name) {
				let banner = [];
				lists.map((item) => {
					banner.push(item.response.data.url);
				})
				if (banner.length > 0) {
					this.form.cover_image = banner.join(',');
				}
			},
			cardRemove(index, lists, name) {
				let banner = [];
				lists.map((item) => {
					banner.push(item.response.data.url);
				})
				if (banner.length > 0) {
					this.form.card_image = banner.join(',');
				} else {
					this.form.card_image = '';
				}
			},
			cardSuccess(data, index, lists, name) {
				let banner = [];
				lists.map((item) => {
					banner.push(item.response.data.url);
				})
				if (banner.length > 0) {
					this.form.card_image = banner.join(',');
				}
			},
			submit() {
				if (this.form.name == '') {
					return this.$u.toast('请输入店铺名称');
				}
				if (this.form.category_id == '' || this.form.childcate_id == '') {
					return this.$u.toast('请选择店铺分类');
				}
				if (this.form.cover_image == '') {
					return this.$u.toast('请上传封面图');
				}
				if (this.form.card_image == '') {
					return this.$u.toast('请上传营业执照');
				}
				if (this.form.banner_images == '') {
					return this.$u.toast('请上传店铺图片');
				}
				if (this.form.open_stime == '' || this.form.open_etime == '' || this.form.openweeks == '') {
					return this.$u.toast('请完善营业时间');
				}
				if (this.form.lng == '' || this.form.lat == '' || this.form.address == '') {
					return this.$u.toast('请选择店铺地址');
				}
				if (this.form.content == '') {
					return this.$u.toast('请输入店铺描述');
				}
				if (this.form.person_name == '') {
					return this.$u.toast('请输入联系人');
				}
				if (this.form.person_mobile == '') {
					return this.$u.toast('请输入联系电话');
				}
				if (!this.$u.test.mobile(this.form.person_mobile)) {
					return this.$u.toast('请输入正确的联系电话');
				}
				uni.showLoading({
					title: '提交中'
				})
				this.$u.post('/addons/hicity/store/addStore', this.form).then(res => {
					uni.hideLoading();
					this.$u.toast('提交成功');
					var that = this;
					if (this.type == 'add') {
						setTimeout(() => {
							that.$u.route({
								type: 'redirectTo',
								url: '/pagesFind/store_pay/store_pay',
								params: {
									id: res
								}
							});
						}, 1500)
					} else {
						setTimeout(() => {
							uni.navigateBack({

							})
						}, 1500)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.form {
		padding: 20rpx;
		background-color: white;

		.openbox {
			display: flex;
			flex-direction: column;

			.opentime {
				display: flex;
				flex-direction: row;
				align-items: center;
				margin-bottom: 20rpx;
			}
		}
	}
</style>
