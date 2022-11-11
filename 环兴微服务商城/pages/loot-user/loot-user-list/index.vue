<template>
	<view>
		<z-paging ref="paging" v-model="list" @query="getList" :auto="false">
			<cu-custom slot="top" :isBack="true" bgColor="bg-red">
				<block slot="backText">返回</block>
				<block slot="content">夺宝参与列表</block>
			</cu-custom>
			<scroll-view slot="top" scroll-x class="bg-white nav">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="index==tabCur?'text-red cur':''" v-for="(item,index) in tabList"
						:key="index" @tap="tabSelect" :data-id="index">
						{{item}}
					</view>
				</view>
			</scroll-view>
		</z-paging>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				theme: getApp().globalData.theme,
				list: [],
				tabList: ['全部', '待开奖', '开奖中', '已开奖', '已过期'],
				status: 0,
				tabCur: 0
			}
		},
		onLoad(option) {
			this.getOrderById(option.id);
		},
		onShow() {
			this.$nextTick(function() {
				this.$refs.paging.reload();
			})
		},
		methods: {
			getList(pageNo, pageSize) {
				uni.$myRequest.lootUserPage({
					current: pageNo,
					size: pageSize,
					descs: 'create_time'
				}).then(res => {
					this.$refs.paging.complete(res.data.records);
				});
			},
			tabSelect(e){
				this.tabCur = e.currentTarget.dataset.id;
				this.status = e.currentTarget.dataset.id;
				this.$refs.paging.reload();
			}
		}
	}
</script>

<style lang="scss">
</style>
