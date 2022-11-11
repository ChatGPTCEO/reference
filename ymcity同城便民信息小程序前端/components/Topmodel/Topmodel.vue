<template>
	<u-popup v-model="topShow" mode="bottom">
		<view class="topmodel">
			<view class="tophead">
				<text @click="topShow = false">取消</text>
				<text>请选择置顶时间</text>
				<text @click="confirem">确定</text>
			</view>
			<scroll-view scroll-y style="height: 680rpx;">
				<view class="toplist" v-for="(item,index) in topList" :key="index" @click="selitem(index)">
					<view style="flex: 1;">
						<text>{{item.top_day}}天</text>
					</view>
					<view style="display: flex;flex-direction: row;align-items: center;">
						<text v-if="item.id==0" style="margin-right: 20rpx;color:#f44c01;">不置顶</text>
						<text v-else style="margin-right: 20rpx;color:#f44c01;">￥{{item.price}}</text>
						<u-icon name="checkmark-circle-fill" :color="item.active?'#f44c01':'#999999'" size="40">
						</u-icon>
					</view>
				</view>
			</scroll-view>
		</view>
	</u-popup>
</template>

<script>
	export default {
		name: "Topmodel",
		props: {
			//初始选中值
			selectValue: {
				type: Number,
				default: 0
			},
			//选择数据
			listData: {
				type: Array,
				default: () => {
					return [];
				}
			}
		},
		data() {
			return {
				topShow: false,
				topList: JSON.parse(JSON.stringify(this.listData)),
			};
		},
		watch: {
			listData: {
				handler(newName, oldName) {
					this.topList = JSON.parse(JSON.stringify(newName))
					this.topList.map((item, index) => {
						if (item.id == this.selectValue) {
							item.active = true;
						}
					})
				},
				deep: true,
			}
		},
		methods: {
			show() {
				this.topShow = true;
			},
			hide() {
				this.topShow = false;
			},
			selitem(index) {
				this.topList.map((item, idx) => {
					if (index !== idx) {
						item.active = false;
					}
				})
				let item = this.topList[index];
				item.active = true;
				this.$set(this.topList, index, item);
			},
			confirem() {
				this.topList.map((item, index) => {
					if (item.active) {
						this.$emit('confirem', item);
						this.topShow = false;
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.topmodel {
		.tophead {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			padding: 0 20rpx;
			height: 100rpx;
			border-bottom: 1rpx solid #e6e6e6;
		}

		.toplist {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: 0 20rpx;
			height: 100rpx;
			border-bottom: 1rpx solid #e6e6e6;
			font-size: 28rpx;
			color: #555555;
		}
	}
</style>
