<template>
	<view class="content">
		
		<waterfallsFlow  :list="list">
			<view @click="detail(item.id)"  v-for="(item, index) of list" :key="index" slot="slot{{index}}">
				<u-modal v-model="show" :show-cancel-button="true" :content="content" @confirm="confirm" @cancel="cancel"></u-modal>
				<view class="cnt">
					<view class="title">{{ item.zcontent }}
					<view>
						<u-button type="error" size="mini" shape="circle" @click="shanchu(item.id)">删除</u-button>
					</view>
					</view>
					<view class="text">
					<view>
						<u-avatar style="margin-right: 10rpx;" size="40" :src="item.zava"></u-avatar></view>
					
					<view>{{ item.zname }}</view>
					<view style="margin-left: 5rpx;"><u-icon size="25" name="../../../static/boy.png"></u-icon></view>
					<view style="position: absolute;right: 0;"><u-icon name="eye" size="25"></u-icon>{{item.view}}</view>
					</view>
				</view>
			</view>
		</waterfallsFlow>
	</view>
</template>

<script>
	import * as api from '@/api/api.js'
	import waterfallsFlow from "@/components/maramlee-waterfalls-flow/maramlee-waterfalls-flow.vue";
	export default {
		components: {
			waterfallsFlow
		},
		data() {
			return {
				u_id:'',
				list: [],
				src:'https://hbimg.huabanimg.com/b90fa94f6218e6aa6b66b67291bdaec69053051258d5d-GiZ3gi_fw658/format/webp',
				id:'',
				show:false,
				content:'您确认要删除该内容吗？'
			};
		},
		onLoad(res){
			this.u_id = res.id;
			this.get();
		},
		methods:{
			shanchu(res){
			    	this.id = res
					this.show = true;
			},
			confirm(){
				//let that = this;
				api.request({
					url:'/zuopin/delZuopinById',
					method:'GET',
					data:{
						id:this.id
					},
				})
				this.get();
			},
			get(){
				api.request({
					url:'/zuopin/getZuopinInfoById',
					method:'GET',
					data:{
						uid:this.u_id
					},
				}).then(res=>{
					this.list = res.data
				});
			},
			detail(res){
				uni.navigateTo({
					url:'../yuepai/photo/detail?id='+res
				})
			}
		}
	};
</script>
<style>
	page {
		background-color: #eee;
	}
</style>
<style lang="scss" scoped>
	.content {
		padding: 10px;

		.cnt {
			padding: 10px;
			position: relative;

			.title {
				font-size: 12px;
				display: flex;
				justify-content: space-between;
			}

			.text {
				font-size: 12px;
				margin-top: 5px;
				display: flex;
				position: relative;
			}

			
		}
	}
</style>
