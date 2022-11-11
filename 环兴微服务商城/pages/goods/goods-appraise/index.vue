<template>
	<view>
		<z-paging ref="paging" v-model="list" @query="getList" :auto="false">
			<cu-custom slot="top" :isBack="true" bgColor="bg-red">
				<block slot="backText">返回</block>
				<block slot="content">商品评价</block>
			</cu-custom>
			<view v-if="list && list.length >0" v-for="(item,index) in list" :key="index">
				<view class="cu-item bg-white margin-bottom-sm">
					<view class="cu-list menu-avatar">
						<view class="cu-item">
							<view class="cu-avatar round lg" :style="'background-image:url(' + item.avatarUrl + ')'">
							</view>
							<view class="content flex-sub">
								<view>{{item.nickName}}</view>
								<view class="text-gray text-sm flex justify-between">
									{{item.createTime}}
								</view>
							</view>
						</view>
					</view>
					<view class="text-content padding-lr margin-tb-sm">
						{{item.content}}
					</view>
					<view class="grid flex-sub padding-lr col-3 grid-square">
						<view class="bg-img" :style="'background-image:url(' + itemPic + ')'"
							v-for="(itemPic,index) in item.picUrls" :key="index">
						</view>
					</view>
					<view v-if="item.replyTime && item.businessReply" class="light bg-grey padding-sm radius">
						<view>{{item.replyTime}}</view>
						卖家回复：{{item.businessReply}}
					</view>
				</view>


			</view>
		</z-paging>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				theme: getApp().globalData.theme,
				spuId: ''
			}
		},
		onLoad(option) {
			this.spuId = option.spuId
			getApp().initPage().then(res => {
				this.$nextTick(function() {
					this.$refs.paging.reload();
				})
			})
		},
		methods: {
			getList(pageNo, pageSize) {
				uni.$myRequest.goodsAppraisePage({
					current: pageNo,
					size: pageSize,
					spuId: this.spuId,
					decss: 'create_time'
				}).then(res => {
					this.$refs.paging.complete(res.data.records);
				})
			},

		}
	}
</script>

<style lang="scss">
</style>
