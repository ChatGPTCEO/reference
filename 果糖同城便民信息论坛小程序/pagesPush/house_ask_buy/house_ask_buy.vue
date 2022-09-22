<template>
	<view>
		<u-alert-tips type="warning" v-if="freenum>=0" :title="'需求类信息本月免费发布'+freenum+'条'" borderColor="#fdf6ec"
			:title-style="{'color':'#FE9C01'}">
		</u-alert-tips>
		<view class="form">
			<u-form-item label="标题" label-width="150rpx" label-position="top">
				<u-input v-model="form.title" type="text" placeholder="请输入" />
			</u-form-item>
			<u-form-item label="预算" label-width="150rpx">
				<view class="salary">
					<u-input class="input" v-model="form.price_min" type="number" placeholder="请输入" />
					<text>-</text>
					<u-input class="input" v-model="form.price_max" type="number" placeholder="请输入" />
					<text style="margin-left: 20rpx;">万元</text>
				</view>
			</u-form-item>
			<u-form-item label="描述" label-width="200rpx" label-position="top">
				<u-input v-model="form.content" type="textarea" height="200" :maxlength="-1" placeholder="请输入描述" />
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
		<topmodel ref="topmodel" :listData="topList" @confirem="confiremTop"></topmodel>
		<view style="height: 120rpx;"></view>
		<botbtn btntext="发布" @confirem="submit"></botbtn>
	</view>
</template>

<script>
	import botbtn from '@/components/Botbtn/Botbtn.vue'
	import topmodel from '@/components/Topmodel/Topmodel.vue'
	export default {
		components: {
			topmodel,
			botbtn
		},
		data() {
			return {
				freenum: -1,
				form: {
					title: '',
					type: '1',
					price_min: '',
					price_max: '',
					content: '',
					person_name: '',
					person_mobile: '',
					top_id: 0,
				},
				seltop: {
					id: 0,
					text: '不置顶'
				},
				topList: [{
					id: 0,
					top_day: 0,
					price: 0,
				}],
				is_top:false,
			};
		},
		onLoad() {
			this.getTopConfig()
			this.getCateFreeNum()
		},
		methods: {
			getCateFreeNum() {
				this.$u.get('/addons/hicity/user/getCateFreeNum', {
				}).then(res => {
					this.freenum = res.vipConfig.ask_free_num;
					this.is_top = res.opentop;
				})
			},
			getTopConfig() {
				this.$u.get('/addons/hicity/index/getTopConfig', {

				}).then(res => {
					this.topList = this.topList.concat(res)
				})
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
			submit() {
				if (this.form.title == '') {
					return this.$u.toast('请输入标题')
				}
				if (this.form.content == '') {
					return this.$u.toast('请输入描述')
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
				this.$u.post('/addons/hicity/ask/add', this.form).then(res => {
					if (res.status == '1') {
						this.$u.route({
							type: 'redirectTo',
							url: '/pagesPush/pay/pay',
							params: {
								order_no: res.order_no,
								type: 'ask'
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

		.salary {
			display: flex;
			flex-direction: row;
			align-items: center;
			color: #666666;
			flex: 1;

			.input {
				flex: 1;
				background-color: #F1F1F1;
			}
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
