<template>
	<view class="paymoney_view">
		<view class="pay_parent uni-flex uni-column text">
			<!-- 付款对象节点 -->
			<view class="pay-obj-view uni-flex uni-row">
				<view class="pay-obj-info uni-flex uni-column">
					<view class="name">
						<text>付款给</text>
						<text>{{ pay_obj.pay_obj_name }}</text>
					</view>
					<view class="phone">{{ pay_obj.pay_obj_phone }}</view>
				</view>
				<view class="obj-title"><!-- 暂不放东西 --></view>
			</view>
			<!-- 付款金额节点 -->
			<view class="pay_form_parent">
				<form @submit="formSubmit">
					<view class="money_label">金 额</view>
					<view class="money_parant uni-flex uni-row">
						<view class="yb_ionc"><image src="/static/jinbi.png" mode="aspectFit"></image></view>
						<view class="yinbi_num">
							<input @input="input_num" type="digit" name="num" adjust-position="true" placeholder-class="yinbi-num-place" placeholder="输入金额" />
						</view>
					</view>
					<text style="padding-left: 40upx;color: #647484;">* 金额范围[1~100000]</text>
					<view class="btn-area"><button type="primary" formType="submit" :disabled="submit_readonly">付 款</button></view>
				</form>
			</view>
		</view>
		<!-- 支付插件 -->
		<pay-pwd @completed="done" @input="inputPwd"  ref="keyboard"></pay-pwd>
	</view>
</template>

<script>
import payPwd from '@/components/pay-pwd/pay-pwd.vue'
export default {
	components: {
		payPwd
	},
	data() {
		return {
			pay_obj: {
				/* 收款人姓名 */
				pay_obj_name: '李顺',
				/* 收款人电话 */
				pay_obj_phone: '15115168954',
				/* 收款人钱包地址 */
				pay_addr: 'A2285FDSF4545FDF454415'
			},
			submit_readonly: true
		};
	},
	methods: {
		/* 密码输入组件回调函数 start===== */
		inputPwd(args){
			console.log(args);
		},
		// 输入完 自动关闭 并回调此函数
		done(password) {
			console.log(password);
		},
		/* 密码输入组件回调函数 end===== */
		
		/* 金额监听 */
		input_num(evt) {
			var num = evt.target.value;
			if (num > 0 && num <= 100000) {
				this.submit_readonly = false;
			} else {
				this.submit_readonly = true;
			}
		},
		/* 表单提交事件 */
		formSubmit(evt) {
			var a = this;
			var form_val = evt.target.value;
			/* 金额验证 */
			if (!Number(form_val.num) > 0 || Number(form_val.num) > 100000 || isNaN(form_val.num)) {
				uni.showToast({
					title: '单笔金额范围[0~100000]',
					mask: true,
					icon: 'none',
					duration: 1500
				});
				return false;
			}
			/* 收款地址验证 */
			if (a.pay_obj.pay_addr.length < 15) {
				uni.showToast({
					title: '收款码异常,请重新尝试',
					mask: true,
					icon: 'none',
					duration: 1500
				});
				return false;
			}
			/* 拉起支付页面*/
			this.$refs.keyboard.show();
		}
	}
};
</script>

<style>
	page,view{
		display: flex;
	}
/* 父节点 */
.paymoney_view {
	flex: 1;
	display: flex;
	width: 750upx;
}
.pay_parent {
	width: 670upx;
	height: 800upx;
	line-height: 800upx;
	margin: 40upx auto;
	text-align: center;
}
.pay-obj-view {
	height: 170upx;
	background-color: #f7f5f5;
}
.pay-obj-view > view {
	height: 170upx;
}
.pay-obj-view > view:nth-child(1) {
	width: 500upx;
}
.pay-obj-view > view:nth-child(2) {
	width: 170upx;
}
.pay-obj-info {
	justify-content: center;
	height: 170upx;
}
.pay-obj-info > view {
	line-height: ;
	padding-left: 10%;
}
.pay-obj-info > .name > text:nth-child(2) {
	text-indent: 1em;
}
.pay-obj-info > .phone {
	color: #9b9b9b;
}
.pay_form_parent {
	padding-top: 40upx;
	padding-left: 40upx;
	padding-right: 40upx;
	height: 630upx;
	background-color: #ffffff;
}
/* 提交按钮 */
.btn-area {
	margin: 60upx 0px;
}
.btn-area > button {
	width: 590upx;
	height: 85upx;
	line-height: 85upx;
	background-color: #3690a2;
}
.money_parant {
	height: 110upx;
	margin: 20upx 0upx 0upx 0upx;
	border-bottom: #e1e1e1 solid 5upx;
	box-sizing: border-box;
}
.yb_ionc {
	width: 120upx;
	height: 110upx;
	line-height: 110upx;
	align-items: center;
}
.yb_ionc > image {
	width: 90upx;
	height: 90upx;
}
.yinbi_num {
	text-align: left;
	height: 110upx;
	align-items: center;
	flex: 1;
	justify-content: flex-start;
}
.yinbi_num > input {
	height: 110upx;
	letter-spacing: 5upx;
	font-weight: 600;
	font-size: 60upx;
}
.yinbi-num-place {
	font-size: 35upx;
	font-weight: 400;
}
</style>
