<template>
	<view class="pd16_15">
		<view class="ft16 cl-main ftw500">求购信息</view>
		<view class="box noshadow pd16_15 mt16">
			<view class="flex alcenter space">
				<text class="ft14 cl-main">选择城市</text>
				<plugin-select-city :city_id="form.city_id" :pro_id="form.pro_id" @change="changeCity" ></plugin-select-city>
			</view>
			<view class="bd-line mt16 mb16"></view>
			<view class="flex alcenter space">
				<text class="ft14 cl-main">选择分类</text>
				<plugin-select-category :categorys="categorys" v-model="form.category_id"></plugin-select-category>
			</view>
			<view class="bd-line mt16 mb16"></view>
			<view class="flex alcenter space">
				<text class="ft14 cl-main">求购标题</text>
				<view>
					<input  style="width: 400rpx;" class="ft14 cl-info text-right" placeholder="请输入求购标题"
						placeholder-class="cl-main" />
				</view>
			</view>
			<view class="bd-line mt16 mb16"></view>
			<view>
				<view class="ft14 cl-main">求购说明</view>
				<view class="mt16">
					<textarea class="ft14 cl-info" placeholder-class="cl-info" :auto-height="true" placeholder="请输入要求购的说明"></textarea>
				</view>
				<view class="bd-line mt16 mb16"></view>
				<view class="ft14 cl-main">求购清单</view>
				
				<view class="mt16">
					<view class="flex alcenter" style="background: #E2E2E2;">
						<view class="ft14 cl-main ftw500 pd10 text-center" style="width: 40%;">产品</view>
						<view class="ft14 cl-main ftw500 pd10 text-center" style="width: 25%;">数量</view>
						<view class="ft14 cl-main ftw500 pd10 text-center" style="width: 25%;">单位</view>
						<view class="ft14 cl-main ftw500 pd10 text-center" style="width: 10%;"></view>
					</view>
					<view class="flex alcenter mt12">
						<view class="ft14 cl-main ftw500" style="width: 40%;padding: 0 10rpx;">
							<input style="width: 100%;border:1px solid #e2e2e2" placeholder="请输入产品名称" class="ft14 cl-main" />
						</view>
						<view class="ft14 cl-main ftw500" style="width: 25%;padding: 0 10rpx;">
							<input style="width: 100%;border:1px solid #e2e2e2" placeholder="请输入数量" class="ft14 cl-main" />
						</view>
						<view class="ft14 cl-main ftw500" style="width: 25%;padding: 0 10rpx;">
							<input style="width: 100%;border:1px solid #e2e2e2" placeholder="请输入单位" class="ft14 cl-main" />
						</view>
						<view class="ft14 cl-red ftw500 text-center" style="width: 10%;">X</view>
					</view>
				</view>
				
				<view class="flex center mt16">
					<button class="btn-small plan" :style="getBtnPlanStyle">+添加清单</button>
				</view>
			</view>
			
			
			
			<view class="bd-line mt16 mb16"></view>
			
			<view class="flex alcenter space">
				<text class="ft14 cl-info">联系人</text>
				<view>
					<input  style="width: 400rpx;" class="ft14 cl-mian text-right" placeholder="请输入联系人"
						placeholder-class="cl-info" />
				</view>
			</view>
			<view class="bd-line mt16 mb16"></view>
			<view class="flex alcenter space">
				<text class="ft14 cl-info">手机号码</text>
				<view>
					<input type="number" style="width: 400rpx;" class="ft14 cl-mian text-right" placeholder="请输入手机号码"
						placeholder-class="cl-info" />
				</view>
			</view>
		</view>
		
		<view class="form-footer-h">
			<view class="form-footer-h form-footer pd10_15">
				<view class="btn-big" @click="memberLinkTo" :style="getBtnStyle">我要求购</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					category_id: 0,
					city_id:0,
					pro_id:0,
					title:'',
					info:'',
					detail:[],
				},
				categorys: [
					{category_id: 101,name: '男装'},
					{category_id: 102,name: '女装'},
					{category_id: 103,name: '其他'},
				],
				
			}
		},
		onLoad() {

		},
		methods: {
			memberAct(){
				
			},
			changeCity(e){
				this.form.city_id = e.city_id;
				this.form.pro_id  = e.pro_id;
			},
			
		}
	}
</script>

<style>
	.trade-table{
		border:2rpx solid #E2E2E2;
	}
</style>
