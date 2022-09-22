<template>
	<view>
		<u-alert-tips type="warning" v-if="freenum>=0" :title="'本月免费发布'+freenum+'条'" borderColor="#fdf6ec"
			:title-style="{'color':'#FE9C01'}">
		</u-alert-tips>
		<view class="form">
			<u-form-item label="出发时间" label-width="150rpx">
				<u-input v-model="go_time_text" @click="gotimeShow=true" type="select" placeholder="请选择" />
			</u-form-item>
			<u-form-item label="出发城市" label-width="150rpx">
				<u-input v-model="form.start_area" @click="startAreaShow=true" type="select" placeholder="请选择" />
			</u-form-item>
			<u-form-item label="出发位置" label-width="150rpx">
				<u-input v-model="form.start_address" type="text" placeholder="请输入" />
			</u-form-item>
			<u-form-item label="到达城市" label-width="150rpx">
				<u-input v-model="form.end_area" @click="endAreaShow=true" type="select" placeholder="请选择" />
			</u-form-item>
			<u-form-item label="到达位置" label-width="150rpx">
				<u-input v-model="form.end_address" type="text" placeholder="请输入" />
			</u-form-item>
			<u-form-item label="乘车人数" label-width="150rpx">
				<u-input v-model="form.person_num" placeholder="请输入" />
			</u-form-item>
			<u-form-item label="备注信息" label-width="200rpx" label-position="top">
				<u-input v-model="form.content" type="textarea" height="200" :maxlength="-1" placeholder="请输入备注信息" />
			</u-form-item>
			<u-form-item label="联系人" label-width="150rpx">
				<u-input v-model="form.person_name" placeholder="请输入" />
			</u-form-item>
			<u-form-item label="联系电话" label-width="150rpx">
				<u-input v-model="form.person_mobile" placeholder="请输入" />
			</u-form-item>
		</view>
		<block v-if="areaSelector.length>0">
			<u-select v-model="startAreaShow" mode="mutil-column-auto" value-name="id" label-name="name"
				:list="areaSelector" @confirm="startAreaConfirm"></u-select>
			<u-select v-model="endAreaShow" mode="mutil-column-auto" value-name="id" label-name="name"
				:list="areaSelector" @confirm="endAreaConfirm"></u-select>
		</block>
		<u-picker v-model="gotimeShow" mode="time" :params="params" @confirm="confiremRegtime"></u-picker>
		<view style="height: 120rpx;"></view>
		<botbtn btntext="发布" @confirem="submit"></botbtn>
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
				freenum: -1,
				params: {
					year: true,
					month: true,
					day: true,
					hour: true,
					minute: true,
					timestamp: true,
				},
				form: {
					type: '2',
					go_time: '',
					start_area: '',
					start_area_id: '',
					start_address: '',
					end_area: '',
					end_area_id: '',
					end_address: '',
					person_num: '',
					content: '',
					person_name: '',
					person_mobile: '',
					top_id: 0,
				},
				go_time_text: '',
				gotimeShow: false,
				startAreaShow: false,
				endAreaShow: false,
				areaSelector: [],
			};
		},
		onLoad() {
			this.getCity()
			this.getCateFreeNum()
		},
		methods: {
			getCateFreeNum() {
				this.$u.get('/addons/hicity/user/getCateFreeNum', {}).then(res => {
					this.freenum = res.vipConfig.carpool_user_free_num;
					this.is_top = res.opentop;
				})
			},
			getCity() {
				this.$u.get('/addons/hicity/index/getCity', {

				}).then(res => {
					this.areaSelector = res;
				})
			},
			startAreaConfirm(e) {
				this.form.start_area_id = e[2].value;
				this.form.start_area = e[2].label;
			},
			endAreaConfirm(e) {
				this.form.end_area_id = e[2].value;
				this.form.end_area = e[2].label;
			},
			confiremRegtime(e) {
				this.form.go_time = e.timestamp;
				this.go_time_text = e.year + '-' + e.month + '-' + e.day + ' ' + e.hour + ':' + e.minute;
			},
			submit() {
				if (this.form.go_time == '') {
					return this.$u.toast('请选择出发时间')
				}
				if (this.form.start_area == '' || this.form.start_area_id == '') {
					return this.$u.toast('请选择出发城市')
				}
				if (this.form.start_address == '') {
					return this.$u.toast('请输入出发位置')
				}
				if (this.form.end_area == '' || this.form.end_area_id == '') {
					return this.$u.toast('请选择到达城市')
				}
				if (this.form.end_address == '') {
					return this.$u.toast('请输入到达位置')
				}
				if (this.form.person_num == '') {
					return this.$u.toast('请输入空余座位')
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
				this.$u.post('/addons/hicity/carpool/add', this.form).then(res => {
					if (res.status == '1') {
						this.$u.route({
							type: 'redirectTo',
							url: '/pagesPush/pay/pay',
							params: {
								order_no: res.order_no,
								type: 'carpool'
							}
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
