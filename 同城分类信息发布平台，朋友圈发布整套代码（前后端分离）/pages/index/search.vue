<template>
	<view class="u-p-20">
		<u-search v-model="keyword" :show-action="true" action-text="搜索" :animation="true" @custom="toSearch" @search="toSearch"></u-search>
			<block v-for="(item,index) in results" :key="index">
				<navigator :url="'./detail?id='+item.id" class="u-flex u-col-bottom u-row-between u-p-20 u-border-bottom">
				<view class="u-line-1 text-blue">{{item.content}}</view>
				<u-icon name="photo" color="green" v-if="item.images"></u-icon>
				</navigator>
			</block>
	<u-loadmore :status="status" @loadmore="loadmore" v-if="show"/>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				keyword:'',
				results:[],
				status:'loadmore',
				page:0,
				show:true
			}
		},
		onLoad(e) {
			this.keyword = e.keyword
			if(this.$u.test.isEmpty(this.keyword)){
				return this.show = false
			}
			this.getData()
		},
	
		methods: {
			async getData(){
				const res = await this.$u.api.search({
					keyword:this.keyword,
					page:this.page
					})
					if(res.data.length<20){
						this.status = 'nomore'
					}
				this.results=[...this.results,...res.data]
			},
			toSearch(value){
				if(this.$u.test.isEmpty(value)) 
				return this.$u.toast('请输入关键词');
				if(!this.show){
					this.show = true
				}
				this.results=[]
				this.page=0
				this.status = 'loadmore'
				this.getData()
			},
			loadmore(){
				this.page++
				this.getData()
			}
		}
	}
</script>

<style>

</style>
