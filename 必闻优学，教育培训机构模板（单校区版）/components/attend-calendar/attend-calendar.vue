<template>
	<view class="calendar">
		<view class="top-bar" v-if="monthOpen">
			
			<view class="top-bar-ym">{{ y }}{{ text.year }}{{ m + 1 }}{{ text.month }}</view>
			<view class="btn-wrap">
				<u-icon name="arrow-left" size="18" color="#ffffff" @click="turning('prev')"></u-icon>
				<u-icon name="arrow-right" size="18" color="#ffffff" @click="turning('next')"></u-icon>
			</view>
			
		</view>

		<view class="week">
			<view class="week-day" v-for="(item, index) in weekDay" :key="index">{{ item }}</view>
		</view>

		<view :class="{ hide: !monthOpen }" class="content" :style="{ height: height }">
			<view :style="{ top: positionTop + 'rpx' }" class="days">
				<view class="item" v-for="(item, index) in dates" :key="index">
					<view class="day" @click="selectOne(item, $event)"
						:class="{ choose: choose == `${item.year}-${item.month + 1}-${item.date}`, nolm: !item.lm }">
						{{ item.date }}</view>
					<view class="late" v-if="isLateed(item.year, item.month + 1, item.date)"></view>
					<view class="truancy" v-if="isTruancyed(item.year, item.month + 1, item.date)"></view>
					<view class="scheduleday" v-if="isScheduleDay(item.year, item.month + 1, item.date) && !isToday(item.year, item.month, item.date)"></view>
					<view class="today-text" v-if="isToday(item.year, item.month, item.date)">今</view>
				</view>
			</view>
		</view>

		<view class="weektoggel">
			<u-icon :name="monthOpen ? 'arrow-up' : 'arrow-down'" size="20" color="#ffffff" @click="trgWeek()"></u-icon>
		</view>
		
	</view>
</template>

<script>
	export default {
		name: 'attend-calendar',
		props: {
			// 第一列星期几
			weekstart: {
				type: Number,
				default: 1
			},
			// 只有迟到的日期
			lateddates: {
				type: Array,
				default: () => []
			},
			// 有旷课的日期
			truancyeddates: {
				type: Array,
				default: () => []
			},
			// 有课程的日期
			scheduledaydates: {
				type: Array,
				default: () => []
			},
			// 是否展开
			open: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				text: {
					year: '年',
					month: '月',
					week: ['一', '二', '三', '四', '五', '六', '日'],
					today: '今'
				},
				y: new Date().getFullYear(), // 年
				m: new Date().getMonth(), // 月
				dates: [], // 当前月日期集合
				positionTop: 0,
				monthOpen: true,
				choose: ''
			}
		},
		created() {
		this.dates = this.monthDay(this.y, this.m)
		!this.open && this.trgWeek()
		},
		mounted() {
			let date = new Date()
			let y = date.getFullYear()
			let m = date.getMonth()
			let d = date.getDate()
			this.choose = `${y}-${m + 1}-${d}`
			console.log(this.choose)
		},
		computed: {
			// 顶部星期栏目
			weekDay() {
				return this.text.week.slice(this.weekstart - 1).concat(this.text.week.slice(0, this.weekstart - 1))
			},
			height() {
				return (this.dates.length / 7) * 80 + 'rpx'
			}
		},
		methods: {
			// 获取当前月份天数
			monthDay(y, m) {
				let firstDayOfMonth = new Date(y, m, 1).getDay() // 当月第一天星期几
				let lastDateOfMonth = new Date(y, m + 1, 0).getDate() // 当月最后一天
				let lastDayOfLastMonth = new Date(y, m, 0).getDate() // 上一月的最后一天
				let dates = [] // 所有渲染日历
				let weekstart = this.weekstart == 7 ? 0 : this.weekstart // 方便进行日期计算，默认星期从0开始
				let startDay = (() => {
					// 周初有几天是上个月的
					if (firstDayOfMonth == weekstart) {
						return 0
					} else if (firstDayOfMonth > weekstart) {
						return firstDayOfMonth - weekstart
					} else {
						return 7 - weekstart + firstDayOfMonth
					}
				})()
				let endDay = 7 - ((startDay + lastDateOfMonth) % 7) // 结束还有几天是下个月的
				for (let i = 1; i <= startDay; i++) {
					dates.push({
						date: lastDayOfLastMonth - startDay + i,
						day: weekstart + i - 1 || 7,
						month: m - 1 >= 0 ? m - 1 : 12,
						year: m - 1 >= 0 ? y : y - 1
					})
				}
				for (let j = 1; j <= lastDateOfMonth; j++) {
					dates.push({
						date: j,
						day: (j % 7) + firstDayOfMonth - 1 || 7,
						month: m,
						year: y,
						lm: true
					})
				}
				for (let k = 1; k <= endDay; k++) {
					dates.push({
						date: k,
						day: (lastDateOfMonth + startDay + weekstart + k - 1) % 7 || 7,
						month: m + 1 <= 11 ? m + 1 : 0,
						year: m + 1 <= 11 ? y : y + 1
					})
				}
				return dates
			},
			// 迟到处理
			isLateed(y, m, d) {
				let flag = false
				for (let i = 0; i < this.lateddates.length; i++) {
					let dy = `${y}-${m}-${d}`
					if (this.lateddates[i] == dy) {
						flag = true
						break
					}
				}
				return flag
			},
			// 旷课处理
			isTruancyed(y, m, d) {
				let flag = false
				for (let i = 0; i < this.truancyeddates.length; i++) {
					let dy = `${y}-${m}-${d}`
					if (this.truancyeddates[i] == dy) {
						flag = true
						break
					}
				}
				return flag
			},
			// 有课处理
			isScheduleDay(y, m, d) {
				let flag = false
				for (let i = 0; i < this.scheduledaydates.length; i++) {
					let dy = `${y}-${m}-${d}`
					if (this.scheduledaydates[i] == dy) {
						flag = true
						break
					}
				}
				return flag
			},
			isToday(y, m, d) {
				let date = new Date()
				return y == date.getFullYear() && m == date.getMonth() && d == date.getDate()
			},
			// 切换成周模式
			trgWeek() {
				this.monthOpen = !this.monthOpen
				if (this.monthOpen) {
					this.positionTop = 0
				} else {
					let index = -1
					this.dates.forEach((i, x) => {
						this.isToday(i.year, i.month, i.date) && (index = x)
					})
					this.positionTop = -((Math.ceil((index + 1) / 7) || 1) - 1) * 80
				}
			},
			// 点击回调
			selectOne(i, event) {
				let date = `${i.year}-${i.month + 1}-${i.date}`
				if (i.month != this.m) {
					console.log('不在可选范围内')
					return false
				}
				this.choose = date;
				this.$emit('click', date); // 原本写的有bug
			},
			// 切换月份，上个月，下个月
			turning(_action) {
				
				if (_action === 'next') {
					if (this.m + 1 == 12) {
						this.m = 0
						this.y = this.y + 1
					} else {
						this.m = this.m + 1
					}
				} else {
					if (this.m + 1 == 1) {
						this.m = 11
						this.y = this.y - 1
					} else {
						this.m = this.m - 1
					}
				}

				this.dates = this.monthDay(this.y, this.m);
				let month  = this.m+1;
				let date = this.y + '-' + month;
				this.$emit('turnMonth', date);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.calendar {
		color: #fff;
		font-size: 28rpx;
		text-align: center;
		background-color: #FFBE59;
		padding-bottom: 10rpx;
		.top-bar {
			display: flex;
			justify-content: space-between;
			height: 80rpx;
			padding: 0 32rpx;
			border-bottom: 1rpx solid #FFFFFF;
			.top-bar-ym{
				font-weight: bold;
				font-size: $u-p;
				height: 80rpx;
				line-height: 80rpx;
			}
			.btn-wrap {
				display: flex;
				justify-content: space-between;
				width: 100rpx;
			}
		}

		.week {
			display: flex;
			align-items: center;
			height: 80rpx;
			line-height: 80rpx;
			view {
				flex: 1;
			}
			.week-day{
				font-weight: bold;
				font-size: 24rpx;
				color: #FFFFFF;
			}
		}

		.content {
			position: relative;
			overflow: hidden;
			transition: height 0.4s ease;

			.days {
				transition: top 0.3s;
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				position: relative;

				.item {
					position: relative;
					display: block;
					height: 80rpx;
					line-height: 80rpx;
					width: calc(100% / 7);

					.day {
						font-style: normal;
						display: inline-block;
						vertical-align: middle;
						width: 60rpx;
						height: 60rpx;
						line-height: 60rpx;
						overflow: hidden;
						border-radius: 50%;

						&.choose {
							font-weight: bold;
							background-color: #dcf0e7;
							color: $u-success;
						}

						&.nolm {
							color: #fff;
							opacity: 0.3;
						}
					}

					.late {
						bottom: 0;
						left: 50%;
						font-style: normal;
						width: 12rpx;
						height: 12rpx;
						background: #F7B300;
						border-radius: 6rpx;
						position: absolute;
						margin-left: -6rpx;
						pointer-events: none;
					}
					.truancy {
						bottom: 0;
						left: 50%;
						font-style: normal;
						width: 12rpx;
						height: 12rpx;
						background: #FF2222;
						border-radius: 6rpx;
						position: absolute;
						margin-left: -6rpx;
						pointer-events: none;
					}
					.scheduleday {
						bottom: 0;
						left: 50%;
						font-style: normal;
						width: 12rpx;
						height: 12rpx;
						background: #dcf0e7;
						border-radius: 6rpx;
						position: absolute;
						margin-left: -6rpx;
						pointer-events: none;
					}
					.today-text {
						position: absolute;
						font-size: 20rpx;
						font-weight: normal;
						width: 20rpx;
						height: 20rpx;
						line-height: 20rpx;
						right: 0;
						top: 10rpx;
						color: #fff;
					}
				}
			}
		}

		.hide {
			height: 80rpx !important;
		}

		.weektoggel {
			width: 100%;
			display: flex;
			justify-content: center;
			padding-top: 10rpx;
		}
	}
</style>
