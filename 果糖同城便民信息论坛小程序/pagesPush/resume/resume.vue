<template>
	<view class="u-p-30">
		<view class="form">
			<u-form :model="form" ref="uForm">
				<u-form-item label="姓名" label-width="150rpx">
					<u-input v-model="form.name" placeholder="请输入姓名" />
				</u-form-item>
				<u-form-item label="性别" label-width="150rpx">
					<u-input v-model="gender_text" type="select" @click="genderShow=true" placeholder="请选择" />
				</u-form-item>
				<u-form-item label="年龄" label-width="150rpx">
					<u-input v-model="form.age" type="number" placeholder="请输入" />
				</u-form-item>
				<u-form-item label="学历" label-width="150rpx">
					<u-input v-model="edu_text" type="select" @click="eduShow=true" placeholder="请选择" />
				</u-form-item>
				<u-form-item label="工作经验" label-width="150rpx">
					<u-input v-model="work_exp_text" type="select" @click="expShow=true" placeholder="请选择" />
				</u-form-item>
				<u-form-item label="联系电话" label-width="150rpx">
					<u-input v-model="form.person_mobile" placeholder="请输入" />
				</u-form-item>
				<u-form-item label="期望职位" label-width="150rpx">
					<u-input v-model="job_category_code_name" @click="show()" type="select" placeholder="请选择" />
				</u-form-item>
				<u-form-item label="自我介绍" label-width="150rpx" label-position="top">
					<u-input v-model="form.content" type="textarea" height="200" :maxlength="-1"
						placeholder="请填写工作经验和特长，描述您在工作中具体负责事项和业绩，清晰具体的工作经历更容易获得求职机会。(最少不小于10个字)" />
				</u-form-item>
			</u-form>
		</view>
		<u-select v-model="genderShow" :list="genderData" @confirm="confirmGender"></u-select>
		<u-select v-model="eduShow" :list="eduData" @confirm="confirmEdu"></u-select>
		<u-select v-model="expShow" :list="expData" @confirm="confirmExp"></u-select>
		<jobSelect ref="jobSelect" :listData="listData" @confirem="confiremJob"></jobSelect>
		<view style="height: 120rpx;"></view>
		<botbtn :btntext="nodata?'立即创建':'编辑简历'" @confirem="submit"></botbtn>
	</view>
</template>

<script>
	import jobSelect from '@/components/yunmiao-jobSelect/yunmiao-jobSelect.vue'
	import botbtn from '@/components/Botbtn/Botbtn.vue'
	export default {
		components: {
			jobSelect,
			botbtn
		},
		data() {
			return {
				form: {
					name: '',
					gender: '',
					age: '',
					edu: '',
					work_exp: '',
					person_mobile: '',
					job_category_code: '',
					content: '',
				},
				edu_text: '',
				work_exp_text: '',
				genderShow: false,
				genderData: [{
					value: '1',
					label: '男'
				}, {
					value: '2',
					label: '女'
				}],
				eduShow: false,
				eduData: [{
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
				listData: [],
				job_category_code_name: '',
				gender_text: '',
				nodata: false,
			}
		},
		onLoad() {
			this.getJobCategory()
			this.getResume()
		},
		methods: {
			getJobCategory() {
				this.$u.get('/addons/hicity/resume/getJobCategory', {

				}).then(res => {
					this.listData = res;
				})
			},
			getResume() {
				this.$u.get('/addons/hicity/resume/resume', {

				}).then(res => {
					if (res) {
						this.nodata = false;
						this.form = {
							name: res.name,
							gender: res.gender,
							age: res.age,
							edu: res.edu,
							work_exp: res.work_exp,
							person_mobile: res.person_mobile,
							job_category_code: res.job_category_code,
							content: res.content,
						};
						this.gender_text = res.gender_text;
						this.edu_text = res.edu_text;
						this.work_exp_text = res.work_exp_text;
						this.job_category_code_name = res.jobcategory.name;
					} else {
						this.nodata = true;
					}
				})
			},
			show() {
				this.$refs.jobSelect.show()
			},
			confiremJob(e) {
				this.form.job_category_code = e.code;
				this.job_category_code_name = e.name;
			},
			confirmEdu(e) {
				this.edu_text = e[0].label;
				this.form.edu = e[0].value;
			},
			confirmExp(e) {
				this.work_exp_text = e[0].label;
				this.form.work_exp = e[0].value;
			},
			confirmGender(e) {
				this.gender_text = e[0].label;
				this.form.gender = e[0].value;
			},
			submit() {
				if (this.form.name == '') {
					return this.$u.toast('请输入姓名')
				}
				if (this.form.gender == '') {
					return this.$u.toast('填选择性别')
				}
				if (this.form.edu == '') {
					return this.$u.toast('请选择学历')
				}
				if (this.form.work_exp == '') {
					return this.$u.toast('请选择工作经验')
				}
				if (this.form.person_mobile == '') {
					return this.$u.toast('请输入联系电话')
				}
				if (!this.$u.test.mobile(this.form.person_mobile)) {
					return this.$u.toast('请输入正确的联系电话')
				}
				if (this.form.job_category_code == '') {
					return this.$u.toast('请选择期望职位')
				}
				if (this.form.content == '') {
					return this.$u.toast('请输入职位描述')
				}
				this.$u.post('/addons/hicity/resume/add', this.form).then(res => {
					this.$u.route({
						type: 'redirectTo',
						url: '/pagesPush/push_result/push_result',
						params: {
							type: 'resume'
						}
					});
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.form {
		padding: 20rpx;
		background-color: white;

		.form-label {
			padding-bottom: 20rpx;
		}
	}
</style>
