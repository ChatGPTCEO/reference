<template>
	<view class="star-container">
		<view class="star-view row-ac" style="">
			<view class="row-ac">
				<view @tap="evaluateTap(item, index)" :class="item == 3 ? 'star-icon-item-font' : item == 1 ? 'star-icon-item-font icon-guanzhu2' : 'icon-shoucang1'" class=" iconfont" v-for="(item, index) in starArr" :key="index" :style="{ fontSize :  iconFontSize + 'px',marginRight : iconfMarginRight + 'px' }"></view>
			</view>
			<!-- <view class="star-count "><text class="iconfont icon-zan1"></text>{{ star_count }}</view> -->
		</view>
	</view>
</template>

<script>
/**
 *  starArr 数据说明
 *
 *  1  	实星
 *  2	空星
 * 	3	半空星
 */
export default {
	data() {
		return {
			starArr: [],
			star_count: 0,
			isTapZuihou: false
		};
	},
	props: {
		// 星评数量
		starCount: {
			type: Number,
			default: 5
		},
		// 是否开启手动评价
		isEvaluate: {
			type: Boolean,
			default: false
		},
		iconFontSize:{
			type: Number,
			default: 15
		},
		iconfMarginRight:{
			type: Number,
			default: 0
		}
		
	},
	watch: {
		starCount(newVal, oldVal) {
			this.star_count = JSON.parse(JSON.stringify(newVal));
		}
	},
	mounted() {
		this.star_count = JSON.parse(JSON.stringify(this.starCount));
		var star_count = this.star_count;
		if (String(this.starCount).indexOf('.') != -1) {
			// 小数
			var decimalsSatr = parseInt(star_count);
			this.starPushFn(false, decimalsSatr);
		} else {
			// 整数
			var intSatr = parseInt(star_count);
			this.starPushFn(true, intSatr);
		}
	},
	methods: {
		/**
		 *  手动评价
		 *
		 * @param {*} item  	点击的item
		 * @param {*} index		点击的index
		 */
		evaluateTap(item, index) {
			if (!this.isEvaluate) {
				return;
			}
			var sliceArr = this.starArr.slice(index);
			var starNewArr = this.starArr.slice(0, index);
			var optIndex = index + 1;
			if (item == 1) {
				let sliceNewArr = [];
				sliceArr.forEach((slItem, slIndex) => {
					sliceNewArr.push(2);
				});
				if (starNewArr.length <= 0 && this.isTapZuihou) {
					this.starArr = [];
					this.starFor(i => {
						this.starArr.push(2);
					});
					this.isTapZuihou = false;
					this.star_count = 0;

					return;
				}
				if (starNewArr.length <= 0) {
					this.isTapZuihou = true;
				}
				if (starNewArr.length == 3) {
					this.star_count = 4;
				} else if (starNewArr.length == 2) {
					this.star_count = 3;
				} else if (starNewArr.length == 1) {
					this.star_count = 2;
				} else if (starNewArr.length == 0) {
					this.star_count = 1;
				}
				// if(starNewArr)
				this.$emit('evaluateChange', this.star_count);
				this.starArr = [...starNewArr, ...sliceNewArr];
			} else {
				if (index == 4) {
					this.star_count = 5;
				} else if (index == 3) {
					this.star_count = 4;
				} else if (index == 2) {
					this.star_count = 3;
				} else if (index == 1) {
					this.star_count = 2;
				} else if (index == 0) {
					this.star_count = 1;
				}
			}

			this.starFor(i => {
				if (i < optIndex) {
					if (this.starArr[i] == 2) {
						this.starArr[i] = 1;
					}

					this.starArr = Object.assign([], this.starArr);
				}
			});
			this.$emit('evaluateChange', this.star_count);
		},
		/**
		 *  星数量循环
		 *
		 * @param {*} slotcallback
		 */
		starFor(slotcallback) {
			for (let i = 0; i < 5; i++) {
				slotcallback(i);
			}
		},
		/**
		 *  星数推送
		 *
		 * @param {*} isInt  		是否是整数
		 * @param {*} satrCount		星数量
		 */
		starPushFn(isInt, satrCount) {
			if (isInt) {
				this.starFor(i => {
					if (i < satrCount) {
						this.starArr.push(1);
					} else {
						this.starArr.push(2);
					}
				});
				return;
			}
			this.starFor(i => {
				if (i < satrCount) {
					this.starArr.push(1);
				} else if (i <= satrCount) {
					this.starArr.push(3);
				} else {
					this.starArr.push(2);
				}
			});
		}
	}
};
</script>

<style scoped lang="scss">
.star-container {
	.star-view {
		width: 400rpx;
		color: #FEB800;
		box-sizing: border-box;
		// .star-count {
		// 	margin-left: 20rpx;
		// 	font-weight: 600;
		// 	font-size: 33rpx;
		// 	// font-weight-600 font-33 d-flex a-center
		// }
	}
}
</style>
