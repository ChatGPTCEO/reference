<template>
	<view class="u-p-30">
		<u-alert-tips type="warning" v-if="freenum>=0" :title="'本月免费发布'+freenum+'条'" borderColor="#fdf6ec"
			:title-style="{'color':'#FE9C01'}">
		</u-alert-tips>
		<view class="form">
			<u-form-item label="标题" label-width="150rpx" label-position="top">
				<u-input v-model="form.title" type="text" placeholder="请输入" />
			</u-form-item>
			<u-form-item label="售价" label-width="150rpx">
				<view style="display: flex;flex-direction: row;align-items: center;flex: 1;">
					<u-input v-model="form.price" placeholder="请输入" />
					<text>元</text>
					<view class="face">
						<u-checkbox-group active-color="#f44c01">
							<u-checkbox @change="checkboxChange" v-model="checked" shape="circle">面议</u-checkbox>
						</u-checkbox-group>
					</view>
				</view>
			</u-form-item>
			<u-form-item label="标签" label-width="150rpx">
				<view class="rowcell" @click="showLabel()">
					<text style="color: rgb(192, 196, 204);flex: 1;" v-if="label_names.length===0">请选择</text>
					<block v-else>
						<view class="cell">
							<text class="item" v-for="(item,index) in label_names" :key="index">{{item}}</text>
						</view>
					</block>
					<u-icon name="arrow-down-fill" color="#999999" size="28"></u-icon>
				</view>
			</u-form-item>
			<u-form-item label="物品图片" prop="photo" label-width="150">
				<u-upload width="160" height="160" :action="action" max-count="6" :file-list="imglist"
					@on-success="imgSuccess" @on-remove="imgRemove"></u-upload>
			</u-form-item>
			<u-form-item label="物品描述" label-width="200rpx" label-position="top">
				<u-input v-model="form.content" type="textarea" height="200" :maxlength="-1" placeholder="请输入物品描述" />
			</u-form-item>
			<u-form-item label="联系人" label-width="150rpx">
				<u-input v-model="form.person_name" placeholder="请输入" />
			</u-form-item>
			<u-form-item label="联系电话" label-width="150rpx">
				<u-input v-model="form.person_mobile" placeholder="请输入" />
			</u-form-item>
			<u-form-item v-if="is_top" label="信息置顶" label-width="150rpx">
				<view class="rowcell" @click="openTop()">
					<text style="color: #F44C01;flex: 1;">{{seltop.text}}</text>
					<u-icon name="arrow-down-fill" color="#999999" size="28"></u-icon>
				</view>
			</u-form-item>
		</view>
		<mulselect ref="mulselect" :listData="mulData" :is_mult="true" @confirem="confiremLabel"></mulselect>
		<topmodel ref="topmodel" :listData="topList" @confirem="confiremTop"></topmodel>
		<view style="height: 120rpx;"></view>
		<botbtn btntext="发布" @confirem="submit"></botbtn>
	</view>
</template>

<script>
	import {
		API_URL
	} from '@/env.js'
	import topmodel from '@/components/Topmodel/Topmodel.vue'
	import botbtn from '@/components/Botbtn/Botbtn.vue'
	import mulselect from '@/components/yunmiao-mulselect/yunmiao-mulselect.vue'
	export default {
		components: {
			topmodel,
			botbtn,
			mulselect
		},
		data() {
			return {
				freenum: -1,
				form: {
					title: '',
					price: '',
					is_face: 0,
					label_ids: '',
					banner_images: '',
					content: '',
					person_name: '',
					person_mobile: '',
					top_id: 0,
				},
				checked: false,
				label_names: [],
				labelShow: false,
				mulData: [],
				seltop: {
					id: 0,
					text: '不置顶'
				},
				radioList: [{
						name: 'house',
						label: '住宅',
					},
					{
						name: 'shop',
						label: '商铺',
					}
				],
				topList: [{
					id: 0,
					top_day: 0,
					price: 0,
				}],
				action: API_URL + '/addons/hicity/index/upload',
				imglist: [],
				is_top:false,
			};
		},
		onLoad() {
			this.getTopConfig()
			this.getLabels()
			this.getCateFreeNum()
		},
		methods: {
			getCateFreeNum() {
				this.$u.get('/addons/hicity/user/getCateFreeNum', {
				}).then(res => {
					this.freenum = res.vipConfig.commodity_free_num;
					this.is_top = res.opentop;
				})
			},
			getLabels() {
				this.$u.get('/addons/hicity/house/getLabels', {
					type: 'commodity_label'
				}).then(res => {
					this.mulData = res;
				})
			},
			getTopConfig() {
				this.$u.get('/addons/hicity/index/getTopConfig', {

				}).then(res => {
					this.topList = this.topList.concat(res)
				})
			},
			showLabel() {
				this.$refs.mulselect.show()
			},
			confiremLabel(e) {
				this.form.label_ids = e.ids.join(',');
				this.label_names = e.labels;
			},
			openTop() {
				this.$refs.topmodel.show()
			},
			confiremTop(e) {
				this.form.top_id = e.id;
				if (e.top_day == 0) {
					e.text = '不置顶';
				} else {
					e.text = e.top_day + '天-￥' + e.price;
				}
				this.seltop = e;
			},
			// 选中某个单选框时，由radio时触发
			checkboxChange(e) {
				if (e.value) {
					this.form.is_face = 1
				} else {
					this.form.is_face = 0
				}
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
			submit() {
				if (this.form.title == '') {
					return this.$u.toast('请输入标题')
				}
				if (this.form.is_face == '' && this.form.price == '') {
					return this.$u.toast('填完善价格')
				}
				if (this.form.banner_images == '') {
					return this.$u.toast('请上传物品图片')
				}
				if (this.form.content == '') {
					return this.$u.toast('请输入物品描述')
				}
				if (this.form.person_name == '') {
					return this.$u.toast('请输入联系人')
				}
				if (this.form.person_mobile == '') {
					return this.$u.toast('请输入联系电话')
				}
				if (!this.$u.test.mobile(this.form.person_mobile)) {
					return this.$u.toast('请输入正确的联系电话')
				}
				this.$u.post('/addons/hicity/commodity/add', this.form).then(res => {
					if (res.status == '1') {
						this.$u.route({
							type: 'redirectTo',
							url: '/pagesPush/pay/pay',
							params: {
								order_no: res.order_no,
								type: 'commodity'
							},
						});
					} else {
						this.$u.route({
							type: 'redirectTo',
							url: '/pagesPush/push_result/push_result',
							params: {
								type: 'push'
							}
						});
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

		.face {
			flex: 1;
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
		}
	}

	.rowcell {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex: 1;

		.cell {
			display: flex;
			flex-direction: row;
			align-items: center;
			flex-wrap: wrap;
			flex: 1;

			.item {
				font-size: 25rpx;
				background-color: #F8F8F8;
				padding: 0rpx 15rpx;
				border-radius: 5rpx;
				margin: 5rpx;
				height: 50rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
			}
		}
	}
</style>
