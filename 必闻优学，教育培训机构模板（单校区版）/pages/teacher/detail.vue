<template>
	<view class="body-wrap">

		<!-- 形象照片 -->
		<view class="avatar-wrap box-shadow">
			<image src="/static/img/teacher3.jpg" class="avatar" mode="aspectFill"></image>
			<view class="teacher-info-wrap">
				<view class="top-info-wrap">
					<view class="relname">
						张老师
					</view>
					<text>教学总监</text>
				</view>
				<view class="info">教龄17年</view>
				<view class="sub-info">张老师从教17年，育人无数，擅长学龄前儿童英语启蒙。</view>
			</view>
		</view>
		
		<!-- 教授课程 -->
		<view class="course-card-list-wrap">
			<!-- 课程卡片 -->
			<view class="course-card-list">
				<view class="course-card-wrap box-shadow" @click="$u.route('pages/course/detail')">
					<view class="course-image-wrap">
						<u-image src="/static/img/school_logo2.png" mode="aspectFill" width="250rpx" height="200rpx"
							radius="10">
						</u-image>
					</view>
					<view class="course-info-wrap">
						<view class="course-title-wrap">
							<text class="course-title u-line-1">津舞门舞蹈培训</text>
						</view>
						<view class="des-warp">
							这里是一段课程简介文字
						</view>
		
						<view class="course-tags-wrap">
							<text class="tag">标签</text>
							<text class="tag">标签2</text>
							<text class="tag">标签3</text>
							<text class="tag">标签4</text>
						</view>
					</view>
				</view>
				<view class="course-card-wrap box-shadow" @click="$u.route('pages/course/detail')">
					<view class="course-image-wrap">
						<u-image src="/static/img/school_logo1.png" mode="aspectFill" width="250rpx" height="200rpx"
							radius="10">
						</u-image>
					</view>
					<view class="course-info-wrap">
						<view class="course-title-wrap">
							<text class="course-title u-line-1">马栏山国际幼儿园</text>
						</view>
						<view class="des-warp">
							这里是一段课程简介文字
		
						</view>
		
						<view class="course-tags-wrap">
							<text class="tag">标签</text>
							<text class="tag">标签2</text>
							<text class="tag">标签3</text>
							<text class="tag">标签4</text>
						</view>
					</view>
				</view>
				<view class="course-card-wrap box-shadow" @click="$u.route('pages/course/detail')">
					<view class="course-image-wrap">
						<u-image src="/static/img/school_logo2.png" mode="aspectFill" width="250rpx" height="200rpx"
							radius="10">
						</u-image>
					</view>
					<view class="course-info-wrap">
						<view class="course-title-wrap">
							<text class="course-title u-line-1">津舞门舞蹈培训</text>
						</view>
						<view class="des-warp">
							这里是一段课程简介文字
		
						</view>
		
						<view class="course-tags-wrap">
							<text class="tag">标签</text>
							<text class="tag">标签2</text>
							<text class="tag">标签3</text>
							<text class="tag">标签4</text>
						</view>
					</view>
				</view>
				<view class="course-card-wrap box-shadow" @click="$u.route('pages/course/detail')">
					<view class="course-image-wrap">
						<u-image src="/static/img/school_logo1.png" mode="aspectFill" width="250rpx" height="200rpx"
							radius="10">
						</u-image>
					</view>
					<view class="course-info-wrap">
						<view class="course-title-wrap">
							<text class="course-title u-line-1">马栏山国际幼儿园</text>
						</view>
						<view class="des-warp">
							这里是一段课程简介文字
		
						</view>
		
						<view class="course-tags-wrap">
							<text class="tag">标签</text>
							<text class="tag">标签2</text>
							<text class="tag">标签3</text>
							<text class="tag">标签4</text>
						</view>
					</view>
				</view>
				<view class="course-card-wrap box-shadow" @click="$u.route('pages/course/detail')">
					<view class="course-image-wrap">
						<u-image src="/static/img/school_logo2.png" mode="aspectFill" width="250rpx" height="200rpx"
							radius="10">
						</u-image>
					</view>
					<view class="course-info-wrap">
						<view class="course-title-wrap">
							<text class="course-title u-line-1">津舞门舞蹈培训</text>
						</view>
						<view class="des-warp">
							这里是一段课程简介文字
		
						</view>
		
						<view class="course-tags-wrap">
							<text class="tag">标签</text>
							<text class="tag">标签2</text>
							<text class="tag">标签3</text>
							<text class="tag">标签4</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 对冲工具栏高度 -->
		<u-gap height="50"></u-gap>

		<!-- 底部工具栏 -->
		<view class="toolbar-wrap" style="margin: 0 -32rpx;">
			<view class="left">
				<view class="favorite-btn">
					<u-icon name="star" size="22" color="#FFBE59"></u-icon>
					<text>收藏</text>
				</view>
				<view class="like-btn">
					<u-icon name="share" size="22" color="#FFBE59"></u-icon>
					分享
				</view>
			</view>
			<view class="right">
				<u-button text="联系Ta" type="success" size="normal" shape="circle" :customStyle="{width: '100%'}">
				</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				commentToggle: true,
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.body-wrap {
		padding: 32rpx;
		min-height: 90vh;
	}

	.avatar-wrap {
		border: 1rpx solid $u-border-color;
		border-radius: 20rpx;
		// border-top-right-radius: 20rpx;
		background-color: #FFFFFF;
		margin-bottom: 20rpx;
		.avatar {
			width: 100%;
			height: 500rpx;
			border-top-left-radius: 20rpx;
			border-top-right-radius: 20rpx;
		}

		.teacher-info-wrap {
			padding: 32rpx;

			.top-info-wrap {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 10rpx;
				color: $u-main-color;

				.relname {
					font-weight: bold;
					font-size: 36rpx;
				}
			}

			.info {
				color: $u-content-color;
				font-size: $u-p;
				margin-bottom: 10rpx;
			}

			.sub-info {
				color: $u-content-color;
				font-size: $u-p2;
				margin-bottom: 10rpx;
			}
		}
	}
	
	
	.school-card-wrap {
		padding: 24rpx;
		display: flex;
		align-items: flex-start;
		border-radius: 20rpx;
		background-color: #ffffff;
		margin-bottom: 24rpx;
		
		.school-image-wrap {
			margin-right: 24rpx;
		}
	
		.school-info-wrap {
			height: 195rpx;
			display: flex;
			flex-direction: column;
			align-items: left;
			justify-content: space-between;
	
			.school-title-wrap,
			.school-rate-wrap,
			.school-location-wrap {
				display: flex;
				align-items: center;
				justify-content: left;
	
				.school-title {
					font-size: $u-p;
					font-weight: bold;
				}
			}
	
			.school-rate-wrap {
				display: flex;
				justify-content: left;
				text {
					color: $u-content-color;
				}
			}
	
			.school-location-wrap {
				text {
					color: $u-content-color;
				}
			}
	
			.school-tags-wrap {
				
				.tag {
					padding: 4rpx 8rpx;
					border-radius: 20rpx;
					border: 1px solid $u-tips-color;
					color: $u-tips-color;
					font-size: 20rpx;
					margin-right: 10rpx;
					
					&:last-child {
						margin-right: 0;
					}
				}
			}
		}
	}
	
	// 课程列表外包裹
	.course-card-list-wrap {
	
		.course-card-list {
			// padding: 24rpx;
			position: relative;
	
			.course-card-wrap {
				padding: 24rpx;
				display: flex;
				align-items: flex-start;
				border-radius: 20rpx;
				background-color: #ffffff;
				margin-bottom: 24rpx;
	
				.course-image-wrap {
					margin-right: 24rpx;
				}
	
				.course-info-wrap {
					height: 195rpx;
					width: 100%;
					position: relative;
					align-items: left;
	
					.course-title-wrap,
					.des-warp {
						display: flex;
						align-items: center;
						justify-content: left;
	
						.course-title {
							font-size: $u-p;
							font-weight: bold;
						}
					}
	
					.course-title-wrap {
						margin-bottom: 20rpx;
					}
	
					.des-warp {
						display: flex;
						justify-content: left;
						font-size: $u-p3;
						color: $u-content-color;
					}
	
					.course-tags-wrap {
						position: absolute;
						left: 0;
						bottom: 0;
	
						.tag:last-child {
							margin-right: 0;
						}
	
						.tag {
							padding: 4rpx 8rpx;
							border-radius: 20rpx;
							border: 1px solid $u-tips-color;
							color: $u-tips-color;
							font-size: 20rpx;
							margin-right: 10rpx;
						}
					}
				}
			}
		}
	}
</style>
