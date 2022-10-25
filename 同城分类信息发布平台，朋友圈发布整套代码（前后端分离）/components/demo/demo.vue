<template>
	<view :style="{background: color}" @click="childClick">
		<slot>这是子组件</slot>
		
	</view>
</template>

<script>
	export default {
		name:"demo",
		props:{
			color:{
				type:String,
				default:''
			},
			test:{
				type:Object,
				default() {
					return {};
				}
			}
		},
		data() {
			return {
				
			};
		},
		created() {
			console.log(this.test)
		},
		methods:{
			childClick(){
				console.log('点击了自定义组件'+test)
				this.$emit('fatherClick','子组件参数')
			}
		}
	}
</script>

<style>

</style>
