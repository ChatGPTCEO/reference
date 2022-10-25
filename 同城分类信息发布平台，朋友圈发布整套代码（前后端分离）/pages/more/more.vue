<template>
	<view >
		<u-swiper :list="swipers" effect3d @click="clickSwiper"></u-swiper>
		<view class="u-p-20  u-tips-color text-bold" style="background: #F1F1F1;">
			<text style="border-left: #1296DB solid 6rpx;padding-left: 10rpx;">全部分类</text>
		</view>
		<view class="u-p-10">
			<u-grid :col="4" >
				<block v-for="(item,index) in category" :key="index">
					<u-grid-item  @click="tomore(item.id,item.name)">
						<view class="text-blue">{{item.name}}</view>
					</u-grid-item>
				</block>
			</u-grid>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				category: [],
				swipers: [],
				}
			},
			async onLoad(e) {
						const res = await this.$u.api.category()
						this.category = res.data.category
						this.swipers = res.data.swiper
						this.swipers.forEach(item => {
						item.image = this.$u.http.config.baseUrl + item.image })
				},
				methods: {
					async clickSwiper(index){
						const res = await this.$u.api.bannerCount({
							id: this.swipers[index].id
						})
						if (res.code == 1) {
							if (this.$u.test.isEmpty(this.swipers[index].url)) 
							return false;
							uni.navigateTo({
								url: '/pages/browser/browser?url=' + this.swipers[index].url
							})
						}
					},
					tomore(id,name) {
						uni.navigateTo({
							url:'./list?pid='+id+'&topic='+name
						})
					},
				
				}
		}
</script>

<style lang="scss">

	
</style>
