<template>
	<view class="circleboss">
		<u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>	
		<view class="" v-if="current==0">
			<circlenew :listdata = "listdata" :userinfo="userinfo"></circlenew>
		</view>
		<view class="" v-if="current==1">
			<circlexuan :listdata = "listdata" :userinfo="userinfo"></circlexuan>
		</view>
		<view class="" v-if="current==2">
			<circlejian :listdata = "listdata"  :userinfo="userinfo" ></circlejian>
		</view>
		<view class="" v-if="current==3">
			<circlequan></circlequan>
		</view>
		
	</view>
</template>

<script>
	import circlenew from './circlenew'
	import circlexuan from './circlexuan'
	import circlejian from './circlejian'
	import circlequan from './circlequan'
	export default {
		data() {
			return {
				list: [{
					name: '最新'
				}, {
					name: '推荐'
				}, {
					name: '精选'
				},{
					name: '找伤圈'
				}],
				current: 0,
				listdata:[],
				page:1,
				limit:10,
				lx:1,
				datas:[],
				userinfo:''
			}
		},
		components:{
			circlenew,
			circlexuan,
			circlejian,
			circlequan
		},
		onShow() {
			this.userinfo = uni.getStorageSync('userInfo')
		},
		onLoad() {
			// console.log("hhh")
			this.page = 1
			this.tielist()
		},
		methods:{
			tielist(){
				if(this.lx<=3){
					// if(this.userinfo){
						this.$u.post('/Forum/list', {
							title:'',
							lx:this.lx,
							page:this.page,
							limit:this.limit,
							labelsid:0,
							uid:uni.getStorageSync("userInfo").id
						})
						.then( res =>{
							
							if(res.code ==200){
								if(res.data){
									this.datas = res.data
									this.listdata = this.listdata.concat(res.data)
									// res.data.picture.split(',')
									// console.log('zong',this.listdata)
								}			
							}
						})							
					
								
				}
			},
			change(index) {
				this.lx= index+1
				this.listdata=[]
				this.page = 1
				// console.log(this.lx)
				this.tielist()
				this.current = index;
			},
		},
		//滚动到底部
		onReachBottom(){
			if(this.datas.length>0){
				this.page  = this.page+1
				this.tielist()
			}
			
		},
		//下拉刷新
		onPullDownRefresh() {
			this.listdata=[]
			this.page = 1
			// console.log(this.lx)
			this.tielist()
			// setTimeout(() => {
			//     uni.stopPullDownRefresh()
			// },1000)
		},			
	}
	
</script>

<style lang="scss" scoped>
	.circleboss{
		width: 100%;
		
	}
</style>
