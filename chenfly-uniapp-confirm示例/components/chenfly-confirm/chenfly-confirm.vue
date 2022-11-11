<template>
	<view class="confirmBox" :class="{padding0: this.componentNames.length == 0}">
		<template v-for="(name,index) in componentNames">
			<component
				:is="name.type==='success'?name.type:'confirms'" 
				:id="index" 
				:type="name.type" 
				:message="name.message" 
				:confirmText="name.confirmText"
				:cancelText="name.cancelText"
				:closed="name.closed"
				:key="`${new Date().getTime()}-${index}`"
				@confirm="name.confirm"
				@cancel="name.cancel"
				@closeFunc="name.close"
				class="component"
				></component>
			<view class="mask" v-if="name.mask" :key="index"></view>
		</template>
	</view>
</template>

<script>
	/**
	 * confirm 确认框
	 * @description 包括确认、警告、错误、成功
	 * @event {Function(param)} $confirm(param)
			@param {Object{type,message}} {
								name,				值类型为 String，取唯一名称，避免多次弹出
								type,         		值为'info/warning/error/success'
								mask,		  		值类型为 Boolean（为true时为透明遮罩，进行其他操作无效，只能操作确认框）
								message,      		值类型为 String
								closed: true, 		值类型为 Boolean（type值为warning/error时使用，closed为true时可使用@close方法）
								confirmText,  		值类型为 String（type值为info时使用，更改确定按钮文字）
								cancelText,   		值类型为 String（type值为info时使用，更改取消按钮文字）
								confirm: () => {},  type='info'，确认方法
								cancel: () => {},   type='info'，取消方法
								close: () => {}		type='warning/error'，关闭方法
							}  
	 * @example 
	 * 		template:
	 * 		<confirm-box></confirm-box>
	 * 		javascript:
	 * 		this.$confirm({ type: 'info', message: '当前警告内容' });
	 */
	import success from './components/success.vue'
	import confirms from './components/confirms.vue'
	import { mapGetters } from 'vuex'
	export default{
		name: 'confirm',
		data(){
			return {
				
			}
		},
		components:{
			success,confirms
		},
		computed:{
			...mapGetters({
				componentNames: 'confirm/componentNames'
			})
		},
		methods:{}
	}
</script>

<style lang="less" scoped>
	.confirmBox{
		position: fixed;
		bottom: 120rpx;
		right: 0rpx;
		z-index: 1001;
		max-height: 70%;
		overflow: hidden;
		padding: 64rpx;
		.component{
			position: relative;
			z-index: 1;
		}
		.mask{
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: transparent;
			z-index: 0;
		}
	}
	.padding0{
		padding: 0 !important;
	}
</style>
