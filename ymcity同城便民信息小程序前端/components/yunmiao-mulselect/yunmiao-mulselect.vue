<template>
	<u-popup v-model="labelShow" mode="bottom">
		<view class="labelcont">
			<view class="head">
				<text @click="cancle">取消</text>
				<text>{{title}}</text>
				<text @click="confirem">确定</text>
			</view>
			<view class="labelbox">
				<view class="label" v-for="(item,index) in list" :key="index" @click="selLabel(index)"
					:style="{'background':item.active?'#f44c01':'#F1F1F1','color':item.active?'#FFFFFF':'#555555'}">
					<text>{{item[labelName]}}</text>
				</view>
			</view>
		</view>
	</u-popup>
</template>

<script>
	export default {
		name: "yunmiao-mulselect",
		props: {
			//标题
			title: {
				type: String,
				default: '请选择(多选)'
			},
			//label展示字段
			labelName: {
				type: String,
				default: 'name'
			},
			//value选中字段
			valueName: {
				type: String,
				default: 'id'
			},
			//是否多选
			is_mult: {
				type: Boolean,
				default: false
			},
			//初始选中值
			selectValue: {
				type: Array | String,
				default: () => {
					return []
				}
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
				labelShow: false,
				list: JSON.parse(JSON.stringify(this.listData)),
				listCopy: JSON.parse(JSON.stringify(this.listData)),
			};
		},
		watch: {
			listData: {
				handler(newName, oldName) {
					this.list = JSON.parse(JSON.stringify(newName))
					this.listCopy = JSON.parse(JSON.stringify(newName))
				},
				deep: true,
			}
		},
		mounted() {
			//初始化选中
			let selectData = this.list;
			if (this.is_mult) {
				for (let i = 0; i < this.selectValue.length; i++) {
					for (let y = 0; y < selectData.length; y++) {
						if (selectData[y][this.valueName] == this.selectValue[i]) {
							selectData[y].active = true;
						}
					}
				}
			} else {
				for (let y = 0; y < selectData.length; y++) {
					if (selectData[y][this.valueName] == this.selectValue) {
						selectData[y].active = true;
					}
				}
			}
		},
		methods: {
			show() {
				this.labelShow = true;
			},
			hide() {
				this.labelShow = false;
			},
			cancle() {
				this.labelShow = false;
				this.list = JSON.parse(JSON.stringify(this.listCopy))
			},
			confirem() {
				let labels = [];
				let ids = [];
				this.list.map((item, index) => {
					if (item.active) {
						ids.push(item[this.valueName]);
						labels.push(item[this.labelName]);
					}
				})
				this.$emit('confirem', {
					labels: labels,
					ids: ids
				});
				this.labelShow = false;
			},
			selLabel(index) {
				let item = this.list[index];
				item.active = !item.active;
				this.$set(this.list, index, item);
				if (!this.is_mult) {
					this.list.map((val, idx) => {
						if (index != idx) this.list[idx].active = false;
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.labelcont {
		display: flex;
		flex-direction: column;

		.head {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			height: 100rpx;
			border-bottom: 1rpx solid #e6e6e6;
			padding: 0 20rpx;
		}

		.labelbox {
			display: flex;
			flex-direction: row;
			align-items: center;
			flex-wrap: wrap;
			padding: 20rpx;

			.label {
				width: 226.6rpx;
				height: 80rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				border-radius: 10rpx;
				margin: 5rpx;
			}
		}
	}
</style>
