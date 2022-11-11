<template>
	<view class="pd16_15">
		<view class="flex alcenter space">
			<view class="store-type-box flex center alcenter" @click="formTypeChange" :data-type="0"
				:style="{borderColor:form.type == 0 ? tempColor: '#ffffff',color:form.type == 0 ? tempColor: '#656A75'}">
				<text class="iconfont icon-dianpu1"></text>
				<text class="ft16  ftw500 ml10">批发门店</text>
			</view>
			<view class="store-type-box flex center alcenter" @click="formTypeChange" :data-type="1"
				:style="{borderColor:form.type == 1 ? tempColor: '#ffffff',color:form.type == 1 ? tempColor: '#656A75'}">
				<text class="iconfont icon-gongchang"></text>
				<text class="ft16  ftw500 ml10">工厂加工</text>
			</view>
		</view>

		<view class="ft16 cl-main ftw600 mt16">基本资料</view>

		<view class="box noshadow pd16_15 mt16">
			<view class="flex center">
				<upload-upload></upload-upload>
			</view>
			<view class="mt12 ft12 cl-notice text-center">
				上传LOGO （建议尺寸240x240）
			</view>
			<view class="bd-line mt16 mb16"></view>
			<view class="flex alcenter space">
				<text class="ft14 cl-info">选择城市</text>
				<plugin-select-city :city_id="form.city_id" :pro_id="form.pro_id" @change="changeCity" ></plugin-select-city>
			</view>
			<view class="bd-line mt16 mb16"></view>
			<view class="flex alcenter space">
				<text class="ft14 cl-info">商家全称</text>
				<view>
					<input style="width: 400rpx;" class="ft14 cl-mian text-right" placeholder="请输入商家全称"
						placeholder-class="cl-info" />
				</view>
			</view>
			<view class="bd-line mt16 mb16"></view>
			<view class="flex alcenter space">
				<text class="ft14 cl-info">商家简称</text>
				<view>
					<input style="width: 400rpx;" class="ft14 cl-mian text-right" placeholder="请输入商家简称"
						placeholder-class="cl-info" />
				</view>
			</view>

			<view class="bd-line mt16 mb16"></view>

			<view v-if="form.type == 0" class="flex alcenter space">
				<view class="ft14 cl-info">经营模式</view>
				<view class="flex alcenter">
					<view class="flex alcenter ft14 cl-info">
						<text class="iconfont icon-shoosed mr5" :style="{color:tempColor}"></text>
						经销批发
					</view>
					<view class="flex alcenter ft14 cl-info ml10">
						<text class="iconfont icon-choose_no mr5" :style="{color:'#656A75'}"></text>
						一件代发
					</view>
				</view>
			</view>
			<view v-else class="flex alcenter space">
				<view class="ft14 cl-info">工厂模式</view>
				<view class="flex alcenter">
					<view class="flex alcenter ft14 cl-info">
						<text class="iconfont icon-shoosed mr5" :style="{color:tempColor}"></text>
						生产加工
					</view>
					<view class="flex alcenter ft14 cl-info ml10">
						<text class="iconfont icon-choose_no mr5" :style="{color:'#656A75'}"></text>
						OEM贴牌
					</view>
				</view>
			</view>

			<view class="bd-line mt16 mb16"></view>
			<view class="flex alcenter space">
				<text class="ft14 cl-info">经营分类</text>
				<plugin-select-category :categorys="categorys" @change="changeCategory" v-model="form.category_id"></plugin-select-category>
			</view>
			<view v-if="form.category_id > 0" class="mt12">
				<view class="ft12 cl-notice">*二级分类最多可以选择3个</view>
				<view class="flex wrap mt12">
					<view v-for="(item,index) in getChildren" :key="index" class="child-category-item">
						<view @click="selectChildAct" :data-id="item.category_id" class="content flex alcenter center ft14 ftw500" :style="{borderColor:form.childCategory.indexOf(item.category_id) > -1 ? tempColor : '#656A75',color:form.childCategory.indexOf(item.category_id) > -1 ? tempColor : '#656A75'}">
							{{item.name}}
						</view>
					</view>
				</view>
			</view>

		</view>
		
		<view class="ft16 cl-main ftw600 mt16">联系方式</view>

		<view class="box noshadow pd16_15 mt16">
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
			<view class="bd-line mt16 mb16"></view>
			<view class="flex alcenter space">
				<text class="ft14 cl-info">微信号码</text>
				<view>
					<input  style="width: 400rpx;" class="ft14 cl-mian text-right" placeholder="请输入微信号码"
						placeholder-class="cl-info" />
				</view>
			</view>
			<view class="bd-line mt16 mb16"></view>
			<view class="flex alcenter space">
				<text class="ft14 cl-info">公司详细地址</text>
				<view>
					<input  style="width: 400rpx;" class="ft14 cl-mian text-right" placeholder="请输入公司详细地址"
						placeholder-class="cl-info" />
				</view>
			</view>
		</view>

		<view class="form-footer-h">
			<view class="form-footer-h form-footer pd10_15">
				<view class="btn-big" @click="memberLinkTo" :style="getBtnStyle">免费入驻</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		computed:{
			getChildren(){
				for(var a  in this.categorys){
					if(this.categorys[a].category_id == this.form.category_id){
						return this.categorys[a].children;
					}
				}
				return new Array;
			}
		},
		data() {
			return {
				form: {
					type: 0, //0店铺 1 工厂
					category_id: 0,
					childCategory: [],
					city_id:0,
					pro_id:0
				},
				categorys: [{
						category_id: 1,
						name: '女装',
						children: [{
								category_id: 101,
								name: '内衣'
							},
							{
								category_id: 102,
								name: '长裤'
							},
							{
								category_id: 103,
								name: '休闲装'
							},
						]
					},
					{
						category_id: 2,
						name: '男装',
						children: [{
								category_id: 101,
								name: '男士内衣'
							},
							{
								category_id: 102,
								name: '男士长裤'
							},
							{
								category_id: 103,
								name: '男士休闲装'
							},
						]
					},
					{
						category_id: 3,
						name: '童装',
						children: [{
								category_id: 101,
								name: '儿童内衣'
							},
							{
								category_id: 102,
								name: '儿童长裤'
							},
							{
								category_id: 103,
								name: '儿童休闲装'
							},
						]
					},
				],
			}
		},
		onLoad() {
			if (this.checkStore == true) { //如果已经注册过 就跳转到自己的商铺地址
				uni.redirectTo({
					url: '/pages/store/detail'
				})
			}
		},
		methods: {
			memberAct() {
				console.log(111);
			},
			changeCity(e){
				this.form.city_id = e.city_id;
				this.form.pro_id  = e.pro_id;
			},
			changeCategory(e){
				this.form.childCategory = new Array;
			},
			selectChildAct(e){
				let id = parseInt(e.currentTarget.dataset.id);
				let index =this.form.childCategory.indexOf(id);
				if(index > -1){
					this.form.childCategory.splice(index,1);
				}else{
					this.form.childCategory.push(id);
				}
			},
			formTypeChange(e) {
				let type = parseInt(e.currentTarget.dataset.type);
				this.form.type = type;
			},
		}
	}
</script>

<style>
	.store-type-box {
		width: calc(50% - 15rpx);
		height: 100rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		border: 1px solid #FFFFFF;
	}
	.child-category-item{
		width: 33.33%;
		padding: 16rpx 10rpx 0rpx 10rpx;
	}
	.child-category-item .content{
		width: 100%;
		height: 64rpx;
		border:1px solid #656A75;
		color:#656A75;
		border-radius: 8rpx;
	}
</style>
