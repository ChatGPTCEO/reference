<template>
	<view class="body-wrap">
		<!-- 顶部日历组件 -->
		<attendCalendar :open="false" :scheduledaydates="scheduleDays" @turnMonth="turnMonth" @click="chooseDate"></attendCalendar>
		
		<!-- 日程列表 -->
		<view class="schedule-card-list">
			<view class="schedule-card-wrap box-shadow">
				<view class="date-info-wrap">
					<view class="date-info">
						<text class="date">10:30</text>
						<text class="sub">AM</text>
					</view>
					<u-avatar src="/static/img/avatar3.jpg" size="36"></u-avatar>
				</view>
				<u-line length="220rpx" direction="col" :hairline="false" color="#dadbde" margin="20rpx"></u-line>
				<view class="course-info-wrap">
					<view class="course-title">
						<u-avatar src="/static/icon/yingyu.png" size="48"></u-avatar>
						<view class="title-wrap">
							<text class="title u-line-1">夏日亲子DIY</text>
							<text class="school-name">马栏山国际幼儿园</text>
						</view>
					</view>
					<view class="course-info">
						<view class="teacher">
							<text class="sub">授课老师</text>
							<text class="name">张老师</text>
						</view>
						<view class="classroom">
							<text class="sub">上课教室</text>
							<text class="name">301教室</text>
						</view>
						<view class="duration">
							<text class="sub">课程时长</text>
							<text class="name">60分钟</text>
						</view>
					</view>
				</view>
			</view>
			<view class="schedule-card-wrap box-shadow">
				<view class="date-info-wrap">
					<view class="date-info">
						<text class="date">10:30</text>
						<text class="sub">AM</text>
					</view>
					<u-avatar src="/static/img/avatar3.jpg" size="36"></u-avatar>
				</view>
				<u-line length="220rpx" direction="col" :hairline="false" color="#dadbde" margin="20rpx"></u-line>
				<view class="course-info-wrap">
					<view class="course-title">
						<u-avatar src="/static/icon/yingyu.png" size="48"></u-avatar>
						<view class="title-wrap">
							<text class="title u-line-1">夏日亲子DIY</text>
							<text class="school-name">马栏山国际幼儿园</text>
						</view>
					</view>
					<view class="course-info">
						<view class="teacher">
							<text class="sub">授课老师</text>
							<text class="name">张老师</text>
						</view>
						<view class="classroom">
							<text class="sub">上课教室</text>
							<text class="name">301教室</text>
						</view>
						<view class="duration">
							<text class="sub">课程时长</text>
							<text class="name">60分钟</text>
						</view>
					</view>
				</view>
			</view>
			<view class="schedule-card-wrap box-shadow">
				<view class="date-info-wrap">
					<view class="date-info">
						<text class="date">10:30</text>
						<text class="sub">AM</text>
					</view>
					<u-avatar src="/static/img/avatar3.jpg" size="36"></u-avatar>
				</view>
				<u-line length="220rpx" direction="col" :hairline="false" color="#dadbde" margin="20rpx"></u-line>
				<view class="course-info-wrap">
					<view class="course-title">
						<u-avatar src="/static/icon/yingyu.png" size="48"></u-avatar>
						<view class="title-wrap">
							<text class="title u-line-1">夏日亲子DIY</text>
							<text class="school-name">马栏山国际幼儿园</text>
						</view>
					</view>
					<view class="course-info">
						<view class="teacher">
							<text class="sub">授课老师</text>
							<text class="name">张老师</text>
						</view>
						<view class="classroom">
							<text class="sub">上课教室</text>
							<text class="name">301教室</text>
						</view>
						<view class="duration">
							<text class="sub">课程时长</text>
							<text class="name">60分钟</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import attendCalendar from '../../components/attend-calendar/attend-calendar.vue';
	export default {
		components:{
			attendCalendar
		},
		data() {
			return {
				scheduleDays:['2022-3-1','2022-3-17','2022-3-21']
			}
		},
		methods: {
			// 选择日期
			chooseDate(e){
				console.log(e);
			},
			// 切换月份
			turnMonth(e){
				console.log(e);
			}
		}
	}
</script>

<style lang="scss">
.body-wrap {
	background-color: #FFFFFF;
	min-height: auto;
}

.schedule-card-list {
	padding: 32rpx;
	
	.schedule-card-wrap {
		padding: 24rpx;
		margin-bottom: 24rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-radius: 20rpx;
		border: 1rpx solid $u-border-color;
		border-left: 20rpx solid $u-success;
		
		.date-info-wrap {
			height: 250rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: flex-start;
			
			.date-info {
				.date {
					color: $u-main-color;
					font-size: $u-hd1;
					font-weight: bold;
					
				}
				.sub {
					color: $u-content-color;
					font-size: $u-sub;
				}
			}
		}
		
		.course-info-wrap {
			height: 250rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: flex-start;
			
			.course-title {
				display: flex;
				align-items: center;
				min-width: 400rpx;
				.title-wrap {
					display: flex;
					flex-direction: column;
					margin-left: 20rpx;
					.title {
						color: $u-main-color;
						font-size: $u-p;
						font-weight: bold;
					}
					.school-name {
						color: $u-tips-color;
						font-size: $u-p3;
					}
				}
			}
			
			.course-info {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.teacher,.classroom,.duration{
					display: flex;
					flex-direction: column;
					align-items: flex-start;
				}
				.name {
					color: $u-main-color;
					font-size: $u-p2;
				}
				.sub {
					color: $u-tips-color;
					font-size: $u-sub;
				}
			}
		}
	}
}
</style>
