<template>
	<view>
		<cu-custom :isBack="true">
			<block slot="content">{{data.title}}</block>
		</cu-custom>
		<view>
		</view>
	</view>
</template>

<script>
	import core from "@/core.js"
	
	export default {
		data() {
			return {
				data:{
					title:"扫一扫"
				}
			}
		},
		onLoad() {
			if(typeof(plus)=='undefined') return core.toast('请在APP内使用扫一扫','back');
		},
		onShow() {
			if(typeof(inWhotalkPlus)=='undefined') return core.toast('请在APP内使用扫一扫','back');
			doPlusScan("scancontainer",this.scanresult);
		},
		onUnload() {
			if(typeof(inWhotalkPlus)!='undefined'){
				doPlusScanClose();
			}
		},
		onUnload() {
			if(Scaner){
				Scaner.close();
				Scaner = null;
			}
		},
		methods:{
			scanresult(res){
				if(res.result.indexOf('http')==0 || res.result.indexOf('/pages/')>-1){
					core.navito(res.result);
				}else{
					core.confirm(res.result,'扫描结果',function(){
						core.copy(res.result);
					},{confirmText:'复制到剪切板'});
				}
			}
		}
	}
</script>

<style>
</style>
