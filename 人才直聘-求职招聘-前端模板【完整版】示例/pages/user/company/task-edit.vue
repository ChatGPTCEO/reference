<template>
	<view class="content reg-page">
		<view class="input-group">
			<view class="input-column border-bottom-1px">
				<text class="title">项目名称</text>
				<view class="input-item">
					<m-input type="text"  v-model="task.name" placeholder="请输入项目名称" :maxLength="30"></m-input>
					<!-- <text class="yzb yzb-next"></text> -->
				</view>
			</view>

			<view class="input-column border-bottom-1px">
				<text class="title">预算资金</text>
				<view class="input-item">
					<m-input type="text"  v-model="task.money" placeholder="请输入预算资金(元)" :maxLength="30"></m-input>
					<!-- <text class="yzb yzb-next"></text> -->
				</view>
			</view>
			
			<view class="input-column border-bottom-1px">
				<text class="title">软件类型</text>
				<view class="picker">
					<picker @change="bindPickerChange" :value="task.type" :range="array">
						<input class="padding-10" disabled="true" placeholder="请选择软件类型" :value="task.type" />
					</picker>
					<text class="yzb yzb-next"></text>
				</view>
			</view>
			<view class="input-column border-bottom-1px">
				<text class="title">需求详情</text>
				<view class="picker">
					<textarea v-model="task.content" maxlength="500" placeholder="请输入内容"></textarea>
					<view class="r-top-t">
					 	<view></view>
						<view> {{contentLength}}/{{len}}</view>
					 </view>
				</view>
			</view>
		</view>

		<view class="btn-row"><button type="primary" class="primary" @tap="update">保存</button></view>
	</view>
</template>

<script>
import mInput from '@/components/m-input/m-input.vue';
import graceChecker from '@/common/graceChecker.js';
import formRuleConfig from '@/config/formRule.config.js';
export default {
	components: {
		mInput,
	},
	computed: {
		contentLength(){
			return this.task.content.length;
		}
	},

	data() {
		return {
			array: ['小程序开发', 'App开发', '管理系统', '工具软件', '网站开发', '办公软件', '软件定制', '其他软件'],
			task:{
				name:null,
				money:null,
				type:null,
				content:'',
			},
			len:500,
		};
	},
	onLoad(options) {
		if(options.id){
			this.getTaskDetail(options.id);
		}
	},
	methods: {
		
		async getTaskDetail(id){
			let param={
				id:id
			}
			let re = await this.$apis.getTaskDetail(param);
			if(re){
				this.task=re;
				console.log("getTaskDetail",this.task);
			}
		},
		
		bindPickerChange: function(e) {
			this.task.type = this.array[e.target.value];
		},

		async update() {
			let checkRes = graceChecker.check(this.task, formRuleConfig.addTaskRule);
			if (!checkRes) {
				uni.showToast({
					title: graceChecker.error,
					icon: 'none'
				});
				return;
			}
			let res = await this.$apis.updateTask(this.task);
			if(res){
				uni.navigateBack({
					delta:1
				})
			}
		},
	}
};
</script>

<style lang="scss">
.input-group {
	border-radius: 10upx;
	margin-top: 10upx;
	overflow: hidden;
	margin-bottom: 100upx;
}

.input-row .title {
	width: 25%;
	padding: 20upx 0;
	padding-left: 20upx;
	line-height: 50upx;
}

.border-bottom-1px {
	position: relative;

	&::after {
		position: absolute;
		z-index: 1;
		right: 0;
		bottom: 0;
		left: 20upx;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		background-color: #e2e2e2;
	}
}
.input-column {
	display: flex;
	flex-direction: column;
	background-color: $bgcolor_white;
	padding: 20upx 20upx 10upx 20upx;

	.title {
		margin-left: 10upx;
		font-size: $uni-font-size-lg;
		font-weight: bold;
	}

	.input-item {
		// display: flex;
		// flex-direction: row;
		// justify-content: space-between;
		// align-items: center;
	}

	.picker {
		padding: 30upx 0 20upx 0;
		margin-left: 10upx;
		position: relative;
		picker {
			font-size: $uni-font-size-lg;
			width: 100%;
			position: absolute;
		}
	}
	.yzb-next {
		float: right;
		color: $font-color-999;
	}
}

.content {
	background: $bgcolor_white;
}

.btn-row {
	position: fixed;
	bottom: 10upx;
	width: 100%;
	box-sizing: border-box;
	button {
		background-color: $main-color;
		height: 90upx;
		line-height: 90upx;
		font-size: $font-size-34;
	}
}

textarea{
	width: 98%;
	border: 1upx solid $border-color-light;
	padding: 20upx;
	box-sizing: border-box;
	height: 230px;
}
.r-top-t{
	display: flex;
	justify-content: space-between;
	font-family:PingFang SC;
	font-weight:400;
	line-height:20px;
	color:rgba(153,153,153,1);
	opacity:1;
}
</style>
