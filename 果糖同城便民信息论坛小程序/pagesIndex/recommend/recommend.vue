<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				house: '',
				commodity:'',
				job:'',
				promote:'',
				resume:''
			}
		},
		onLoad(e) {
			//房屋详情
			this.$u.get('/addons/hicity/top/houseDetail', {
				id: e.id,
			}).then(res => {
				//this.main = res;
				this.house = res;
			})
			
			//闲置详情
			this.$u.get('/addons/hicity/top/commodityDetail', {
				id: e.id,
			
			}).then(res => {
				//this.main = res;
				this.commodity = res;
			})
			
			//工作详情
			this.$u.get('/addons/hicity/top/jobDetail', {
				id: e.id,
			
			}).then(res => {
				//this.main = res;
				this.job = res;
			})
			
			//本地推广详情
			this.$u.get('/addons/hicity/top/promoteDetail', {
				id: e.id,
			
			}).then(res => {
				//this.main = res;
				this.promote = res;
			})
			
			//简历
			this.$u.get('/addons/hicity/top/resumeDetail', {
				id: e.id,
			
			}).then(res => {
				//this.main = res;
				this.resume = res;
			})
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
