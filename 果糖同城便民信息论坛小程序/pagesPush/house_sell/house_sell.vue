<template>
	<view class="u-p-30">
		<u-alert-tips type="warning" v-if="freenum>=0" :title="'本月免费发布'+freenum+'条'" borderColor="#fdf6ec"
			:title-style="{'color':'#FE9C01'}">
		</u-alert-tips>
		<view class="form">
			<u-form-item label="标题" label-width="150rpx" label-position="top">
				<u-input v-model="form.title" type="text" placeholder="请输入" />
			</u-form-item>
			<u-form-item label="房屋类型" label-width="150rpx">
				<u-radio-group v-model="form.type" @change="radioGroupChange">
					<u-radio shape="circle" active-color="#f44c01" v-for="(item, index) in radioList" :key="index"
						:name="item.name">{{ item.label }}</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label="户型" label-width="150rpx">
				<u-input v-model="houseType_text" type="select" @click="houseTypeShow=true" placeholder="请选择" />
			</u-form-item>
			<u-form-item label="面积" label-width="150rpx">
				<view style="display: flex;flex-direction: row;align-items: center;flex: 1;">
					<u-input style="flex: 1;" v-model="form.acreage" placeholder="请输入" />
					<text>㎡</text>
				</view>
			</u-form-item>
			<u-form-item label="售价" label-width="150rpx">
				<view style="display: flex;flex-direction: row;align-items: center;flex: 1;">
					<u-input style="flex: 1;" v-model="form.rent" placeholder="请输入" />
					<text>万元</text>
				</view>
			</u-form-item>
			<u-form-item label="朝向" label-width="150rpx">
				<u-input v-model="form.towards" type="select" @click="towardsShow=true" placeholder="请选择" />
			</u-form-item>
			<u-form-item label="装修" label-width="150rpx">
				<u-input v-model="decoration_text" type="select" @click="decorationShow=true" placeholder="请选择" />
			</u-form-item>
			<u-form-item label="楼层" label-width="150rpx">
				<u-input v-model="form.floor" type="number" laceholder="请输入" />
			</u-form-item>
			<u-form-item label="房屋地址" label-width="150rpx">
				<u-input v-model="form.address" @click="opensite" type="select" placeholder="请选择" />
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
			<u-form-item label="房屋图片" label-width="150">
				<u-upload width="160" height="160" :action="action" max-count="6" :file-list="imglist"
					@on-success="imgSuccess" @on-remove="imgRemove"></u-upload>
			</u-form-item>
			<u-form-item label="房屋描述" label-width="200rpx" label-position="top">
				<u-input v-model="form.content" type="textarea" height="200" :maxlength="-1" placeholder="请输入房屋描述" />
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
		<u-select v-model="houseTypeShow" :list="houseTypeData" mode="mutil-column" @confirm="confirmHouseType">
		</u-select>
		<u-select v-model="towardsShow" :list="towardsData" @confirm="confirmTowards">
		</u-select>
		<u-select v-model="decorationShow" :list="decorationData" @confirm="confirmDecoration">
		</u-select>
		<mulselect ref="mulselect" :listData="mulData" :is_mult="true" @confirem="confiremLabel"></mulselect>
		<topmodel ref="topmodel" :listData="topList" @confirem="confiremTop"></topmodel>
		<view style="height: 120rpx;"></view>
		<botbtn btntext="发布" @confirem="submit"></botbtn>
	</view>
</template>

<script>
	import topmodel from '@/components/Topmodel/Topmodel.vue'
	import botbtn from '@/components/Botbtn/Botbtn.vue'
	import mulselect from '@/components/yunmiao-mulselect/yunmiao-mulselect.vue'
	import {
		API_URL
	} from '@/env.js'
	export default {
		components: {
			topmodel,
			botbtn,
			mulselect
		},
		data() {
			return {
				freenum:-1,
				form: {
					title: '',
					type: 'house',
					room: '',
					hall: '',
					loo: '',
					banner_images: '',
					acreage: '',
					rent: '',
					towards: '',
					floor: '',
					decoration: '',
					info_type: 'sell',
					label_ids: '',
					content: '',
					address: '',
					lat: '',
					lng: '',
					person_name: '',
					person_mobile: '',
					top_id: 0,
				},
				houseType_text: '',
				decoration_text: '',
				label_names: [],
				houseTypeShow: false,
				towardsShow: false,
				decorationShow: false,
				labelShow: false,
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
				seltop: {
					id: 0,
					text: '不置顶'
				},
				mulData: [],
				towardsData: [{
						value: '东',
						label: '东'
					}, {
						value: '西',
						label: '西'
					}, {
						value: '南',
						label: '南'
					}, {
						value: '北',
						label: '北'
					}, {
						value: '东南',
						label: '东南'
					},
					{
						value: '东北',
						label: '东北'
					},
					{
						value: '西南',
						label: '西南'
					},
					{
						value: '西北',
						label: '西北'
					},
					{
						value: '南北',
						label: '南北'
					},
					{
						value: '东西',
						label: '东西'
					},
				],
				decorationData: [{
					value: '1',
					label: '毛胚'
				}, {
					value: '2',
					label: '简装'
				}, {
					value: '3',
					label: '精装'
				}, ],
				houseTypeData: [
					[{
							value: 1,
							label: '1室'
						},
						{
							value: 2,
							label: '2室'
						}, {
							value: 3,
							label: '3室'
						}, {
							value: 4,
							label: '4室'
						}, {
							value: 5,
							label: '5室'
						}, {
							value: 6,
							label: '6室'
						}, {
							value: 7,
							label: '7室'
						}, {
							value: 8,
							label: '8室'
						}, {
							value: 9,
							label: '9室'
						}, {
							value: 10,
							label: '10室'
						},
					],
					[{
							value: 0,
							label: '0厅'
						}, {
							value: 1,
							label: '1厅'
						},
						{
							value: 2,
							label: '2厅'
						}, {
							value: 3,
							label: '3厅'
						}, {
							value: 4,
							label: '4厅'
						}, {
							value: 5,
							label: '5厅'
						}, {
							value: 6,
							label: '6厅'
						}, {
							value: 7,
							label: '7厅'
						}, {
							value: 8,
							label: '8厅'
						}, {
							value: 9,
							label: '9厅'
						}, {
							value: 10,
							label: '10厅'
						},
					],
					[{
							value: 0,
							label: '0卫'
						},
						{
							value: 1,
							label: '1卫'
						},
						{
							value: 2,
							label: '2卫'
						}, {
							value: 3,
							label: '3卫'
						}, {
							value: 4,
							label: '4卫'
						}, {
							value: 5,
							label: '5卫'
						}, {
							value: 6,
							label: '6卫'
						}, {
							value: 7,
							label: '7卫'
						}, {
							value: 8,
							label: '8卫'
						}, {
							value: 9,
							label: '9卫'
						}, {
							value: 10,
							label: '10卫'
						},
					],

				],
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
					this.freenum = res.vipConfig.house_free_num;
					this.is_top = res.opentop;
				})
			},
			getLabels() {
				this.$u.get('/addons/hicity/house/getLabels', {
					type: 'house_sell_label'
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
			confirmHouseType(e) {
				this.form.room = e[0].value;
				this.form.hall = e[1].value;
				this.form.loo = e[2].value;
				this.houseType_text = e[0].label + e[1].label + e[2].label;
			},
			confirmTowards(e) {
				this.form.towards = e[0].value;
			},
			confirmDecoration(e) {
				this.form.decoration = e[0].value;
				this.decoration_text = e[0].label;
			},
			showLabel() {
				this.$refs.mulselect.show()
			},
			confiremLabel(e) {
				this.form.label_ids = e.ids.join(',');
				this.label_names = e.labels;
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
			submit() {
				if (this.form.title == '') {
					return this.$u.toast('请输入标题')
				}
				if (this.form.type == '') {
					return this.$u.toast('请选择房屋类型')
				}
				if (this.form.room === '' || this.form.hall === '' || this.form.loo === '') {
					return this.$u.toast('请选择户型')
				}
				if (this.form.acreage == '') {
					return this.$u.toast('请输入面积')
				}
				if (this.form.rent == '') {
					return this.$u.toast('请输入租金')
				}
				if (this.form.towards == '') {
					return this.$u.toast('请选择朝向')
				}
				if (this.form.decoration == '') {
					return this.$u.toast('请选择装修')
				}
				if (this.form.floor == '') {
					return this.$u.toast('请输入楼层')
				}
				if (this.form.lat == '' || this.form.lng == '' || this.form.address == '') {
					return this.$u.toast('请选择房屋地址')
				}
				if (this.form.banner_images == '') {
					return this.$u.toast('请上传房屋图片')
				}
				if (this.form.content == '') {
					return this.$u.toast('请输入房屋描述')
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
				this.$u.post('/addons/hicity/house/add', this.form).then(res => {
					if (res.status == '1') {
						this.$u.route({
							type: 'redirectTo',
							url: '/pagesPush/pay/pay',
							params: {
								order_no: res.order_no,
								type: 'house'
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
