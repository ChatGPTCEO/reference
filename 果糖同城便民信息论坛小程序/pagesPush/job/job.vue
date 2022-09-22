<template>
	<view class="u-p-30">
		<u-alert-tips type="warning" v-if="freenum>=0" :title="'本月免费发布'+freenum+'条'" borderColor="#fdf6ec"
			:title-style="{'color':'#FE9C01'}">
		</u-alert-tips>
		<view class="form">
			<u-form :model="form" ref="uForm">
				<u-form-item label="职位类别" label-width="150rpx">
					<u-input v-model="job_category_code_name" @click="show()" type="select" placeholder="请选择" />
				</u-form-item>
				<u-form-item label="薪资" label-width="150rpx">
					<view style="display: flex;flex-direction: row;align-items: center;flex: 1;">
						<view class="salary">
							<u-input class="input" placeholder="请输入" v-model="form.salary_min" type="number" />
							<text>-</text>
							<u-input class="input" placeholder="请输入" v-model="form.salary_max" type="number" />
							<text>元/月</text>
						</view>
						<view class="face">
							<u-checkbox-group>
								<u-checkbox active-color="#f44c01" @change="checkboxChange" v-model="checked"
									shape="circle">面议</u-checkbox>
							</u-checkbox-group>
						</view>
					</view>
				</u-form-item>
				<u-form-item label="福利待遇" label-width="150rpx">
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
				<u-form-item label="学历要求" label-width="150rpx">
					<u-input v-model="edu_text" type="select" @click="eduShow=true" placeholder="请选择" />
				</u-form-item>
				<u-form-item label="工作经验" label-width="150rpx">
					<u-input v-model="work_exp_text" type="select" @click="expShow=true" placeholder="请选择" />
				</u-form-item>
				<u-form-item label="工作地址" label-width="150rpx">
					<u-input v-model="form.work_address" @click="opensite" type="select" placeholder="请选择" />
				</u-form-item>
				<u-form-item label="招聘标题" label-width="150rpx" label-position="top">
					<u-input v-model="form.title" type="text" maxlength="50" placeholder="请输入" />
				</u-form-item>
				<u-form-item label="职位描述" label-width="150rpx" label-position="top">
					<u-input v-model="form.content" type="textarea" height="200" :maxlength="-1"
						placeholder="请如实填写岗位职责和要求，不可出现电话/微信等联系方式。不可出现夸大、虚假等文字描述；严禁发布信用卡套现、刷信誉、手工活等招聘信息。若违反相关平台规定，信息将会被删除/驳回/下架处理。（最少10个字）" />
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
			</u-form>
		</view>
		<jobSelect ref="jobSelect" :listData="listData" @confirem="confiremJob"></jobSelect>
		<mulselect ref="mulselect" :listData="mulData" :is_mult="true" @confirem="confiremLabel"></mulselect>
		<u-select v-model="eduShow" :list="eduData" @confirm="confirmEdu"></u-select>
		<u-select v-model="expShow" :list="expData" @confirm="confirmExp"></u-select>
		<topmodel ref="topmodel" :listData="topList" @confirem="confiremTop"></topmodel>
		<view style="height: 120rpx;"></view>
		<botbtn btntext="发布" @confirem="submit"></botbtn>
	</view>
</template>

<script>
	import jobSelect from '@/components/yunmiao-jobSelect/yunmiao-jobSelect.vue'
	import mulselect from '@/components/yunmiao-mulselect/yunmiao-mulselect.vue'
	import topmodel from '@/components/Topmodel/Topmodel.vue'
	import botbtn from '@/components/Botbtn/Botbtn.vue'
	export default {
		components: {
			jobSelect,
			mulselect,
			topmodel,
			botbtn
		},
		data() {
			return {
				freenum: -1,
				listData: [],
				form: {
					title: '',
					is_face: 0,
					salary_min: '',
					salary_max: '',
					job_category_code: '',
					work_exp: '',
					label_ids: '',
					edu: '',
					content: '',
					work_address: '',
					work_lat: '',
					work_lng: '',
					person_name: '',
					person_mobile: '',
					top_id: 0,
				},
				job_category_code_name: '',
				label_names: [],
				edu_text: '',
				work_exp_text: '',
				mulData: [],
				checked: false,
				eduShow: false,
				eduData: [{
						value: '0',
						label: '不限'
					},
					{
						value: '1',
						label: '初中'
					},
					{
						value: '2',
						label: '高中/中专'
					},
					{
						value: '3',
						label: '大专'
					},
					{
						value: '4',
						label: '本科'
					},
					{
						value: '5',
						label: '本科以上'
					}
				],
				expShow: false,
				expData: [{
					value: '0',
					label: '不限'
				}, {
					value: '1',
					label: '1年以下'
				}, {
					value: '2',
					label: '1-3年'
				}, {
					value: '3',
					label: '3-5年'
				}, {
					value: '4',
					label: '5-8年'
				}, {
					value: '5',
					label: '8年以上'
				}],
				topShow: true,
				topList: [{
					id: 0,
					top_day: 0,
					price: 0,
				}],
				seltop: {
					id: 0,
					text: '不置顶'
				},
				is_top:false,
			};
		},
		onLoad() {
			this.getJobCategory()
			this.getLabels()
			this.getTopConfig()
			this.getCateFreeNum()
		},
		methods: {
			getCateFreeNum() {
				this.$u.get('/addons/hicity/user/getCateFreeNum', {
				}).then(res => {
					this.freenum = res.vipConfig.job_free_num;
					this.is_top = res.opentop;
				})
			},
			getJobCategory() {
				this.$u.get('/addons/hicity/job/getJobCategory', {

				}).then(res => {
					this.listData = res;
				})
			},
			getLabels() {
				this.$u.get('/addons/hicity/job/getLabels', {

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
			show() {
				this.$refs.jobSelect.show()
			},
			showLabel() {
				this.$refs.mulselect.show()
			},
			confiremJob(e) {
				this.form.job_category_code = e.code;
				this.job_category_code_name = e.name;
			},
			// 选中某个单选框时，由radio时触发
			checkboxChange(e) {
				if (e.value) {
					this.form.is_face = 1
				} else {
					this.form.is_face = 0
				}
			},
			confiremLabel(e) {
				this.form.label_ids = e.ids.join(',');
				this.label_names = e.labels;
			},
			confirmEdu(e) {
				this.edu_text = e[0].label;
				this.form.edu = e[0].value;
			},
			confirmExp(e) {
				this.work_exp_text = e[0].label;
				this.form.work_exp = e[0].value;
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
			openTop() {
				this.$refs.topmodel.show()
			},
			opensite() {
				var that = this;
				uni.chooseLocation({
					success: function(res) {
						that.form.work_lat = res.latitude;
						that.form.work_lng = res.longitude;
						that.form.work_address = res.address;
					}
				});
			},
			submit() {
				if (this.form.job_category_code == '') {
					return this.$u.toast('请选择职位')
				}
				if (this.form.is_face == '' && (this.form.salary_min == '' || this.form.salary_max == '')) {
					return this.$u.toast('填完善薪资')
				}
				if (this.form.edu == '') {
					return this.$u.toast('请选择学历要求')
				}
				if (this.form.work_exp == '') {
					return this.$u.toast('请选择工作经验')
				}
				if (this.form.work_lat == '' || this.form.work_lng == '' || this.form.work_address == '') {
					return this.$u.toast('请选择工作地址')
				}
				if (this.form.title == '') {
					return this.$u.toast('请输入标题')
				}
				if (this.form.content == '') {
					return this.$u.toast('请输入职位描述')
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
				this.$u.post('/addons/hicity/job/add', this.form).then(res => {
					if (res.status == '1') {
						this.$u.route({
							type: 'redirectTo',
							url: '/pagesPush/pay/pay',
							params: {
								order_no: res.order_no,
								type: 'job'
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

		.salary {
			display: flex;
			flex-direction: row;
			align-items: center;
			color: #666666;

			.input {
				width: 120rpx;
				background-color: #F1F1F1;
			}
		}

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
