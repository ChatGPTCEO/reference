<template>
	<view class="page">
		<view class="zr">
			<view class="water">
				<view class="water-c">
					<image class="customer_img" :src="sender.Avatar"></image>
					<view class="water-1"> </view>
					<view class="water-2"> </view>
				</view>
			</view>
		</view>
		
		<view class="info-more">
			<view class="more-item">
			    <view class="title">
			        昵称
			    </view>
			    <view class="value">
			        {{sender.NickName}}
			    </view>
			</view>
		    <view class="more-item">
		        <view class="title">
		            个性签名
		        </view>
		        <view class="value">
		            {{sender.PersonalitySign}}
		        </view>
		    </view>
		    <view class="more-item">
		        <view class="title">
		            地区
		        </view>
		        <view class="value">
		            {{sender.Region}}
		        </view>
		    </view>
		    <view class="more-item">
		        <view class="title">
		            手机
		        </view>
		        <view class="value">
		            {{sender.Mobile}}
		        </view>
		    </view>
		</view>
		<view class="exit-btn" @click="logout">
			退出
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sender: this.$store.state.sender,
			}
		},
		methods: {
			logout(){
				this.$Common.logout();
				this.$Common.navigateTo("/index/index");
			}
		},
		mounted() {
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		height: 100%;
		background-color: #fff;
		width: 100%;
		position: relative;
	}
	.exit-btn{
		width: 70%;
		height: 100rpx;
		line-height: 100rpx;
		background-color: #888;
		color: #fff;
		border-radius: 8rpx;
		text-align: center;
		margin: 40rpx auto;
	}
	.info-more {
	    background-color: #fff;
	    padding: 10rpx;
	    font-size: 26rpx;
		margin-top: 80rpx;
		text-align: left;
	
	    .more-item {
	        width: 100%;
	        display: flex;
	        padding: 14rpx 0;
	
	        .title {
	            width: 20%;
	        }
	
	        .value {
	            width: 80%;
	        }
	    }
	}
	.change_block{
		width: 100%;
		margin-top: 120rpx;
		.change_item{
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 10rpx 0;
			.icon-xiugai{
				margin-left: 20rpx;
				font-size: 40rpx;
			}
			.input_sy{
				border-bottom: 1px solid #3F536E;
				max-width: 200rpx;
			}
			.sure_btn {
				padding: 10rpx 20rpx;
				text-align: center;
				color: #fff;
				background-color: #618DFF;
				border-radius: 30rpx;
				font-size: 30rpx;
				margin-left: 20rpx;
			}
			.cancle_btn{
				padding: 10rpx 20rpx;
				text-align: center;
				color: #618DFF;
				border: 1px solid #618DFF;
				background-color: #fff;
				border-radius: 30rpx;
				font-size: 30rpx;
				margin-left: 20rpx;
			}
		}
	}
	.online_state{
		width: 100%;
		margin-top: 200rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		.title{
			width: 100%;
			text-align: center;
			margin-bottom: 20rpx;
			font-size: 40rpx;
			color: #ff9900;
		}
	}

	.customer_img {
		height: 200rpx;
		width: 200rpx;
		border-radius: 100%;
		margin-right: 30rpx;
		overflow: hidden;
		position: absolute;
		z-index: 99;
		left: 50%;
		bottom: -60px;
		transform: translateX(-50%);
		box-shadow: -1rpx -1rpx 10rpx #888;
	}

	/*组件背景颜色*/
	.zr {
		background: #292D32;
		width: 100%;
		height: 280rpx;
		position: relative;
	}

	.water {
		position: absolute;
		left: 0;
		bottom: -10px;
		height: 30px;
		width: 100%;
		z-index: 1
	}

	.water-c {
		position: relative
	}

	.water-1 {
		background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjYwMHB4IiBoZWlnaHQ9IjYwcHgiIHZpZXdCb3g9IjAgMCA2MDAgNjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjQgKDE1NTc1KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT53YXRlci0xPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IuaIkSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+CiAgICAgICAgPGcgaWQ9Ii0iIHNrZXRjaDp0eXBlPSJNU0FydGJvYXJkR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMjEuMDAwMDAwLCAtMTMzLjAwMDAwMCkiIGZpbGwtb3BhY2l0eT0iMC4zIiBmaWxsPSIjRkZGRkZGIj4KICAgICAgICAgICAgPGcgaWQ9IndhdGVyLTEiIHNrZXRjaDp0eXBlPSJNU0xheWVyR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyMS4wMDAwMDAsIDEzMy4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0wLDcuNjk4NTczOTUgTDQuNjcwNzE5NjJlLTE1LDYwIEw2MDAsNjAgTDYwMCw3LjM1MjMwNDYxIEM2MDAsNy4zNTIzMDQ2MSA0MzIuNzIxMDUyLDI0LjEwNjUxMzggMjkwLjQ4NDA0LDcuMzU2NzQxODcgQzE0OC4yNDcwMjcsLTkuMzkzMDMwMDggMCw3LjY5ODU3Mzk1IDAsNy42OTg1NzM5NSBaIiBpZD0iUGF0aC0xIiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIj48L3BhdGg+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==") repeat-x;
		background-size: 600rpx;
		-webkit-animation: wave-animation-1 3.5s infinite linear;
		animation: wave-animation-1 3.5s infinite linear
	}

	.water-2 {
		top: 5px;
		background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjYwMHB4IiBoZWlnaHQ9IjYwcHgiIHZpZXdCb3g9IjAgMCA2MDAgNjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjQgKDE1NTc1KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT53YXRlci0yPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IuaIkSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+CiAgICAgICAgPGcgaWQ9Ii0iIHNrZXRjaDp0eXBlPSJNU0FydGJvYXJkR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMjEuMDAwMDAwLCAtMjQ2LjAwMDAwMCkiIGZpbGw9IiNGRkZGRkYiPgogICAgICAgICAgICA8ZyBpZD0id2F0ZXItMiIgc2tldGNoOnR5cGU9Ik1TTGF5ZXJHcm91cCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTIxLjAwMDAwMCwgMjQ2LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAsNy42OTg1NzM5NSBMNC42NzA3MTk2MmUtMTUsNjAgTDYwMCw2MCBMNjAwLDcuMzUyMzA0NjEgQzYwMCw3LjM1MjMwNDYxIDQzMi43MjEwNTIsMjQuMTA2NTEzOCAyOTAuNDg0MDQsNy4zNTY3NDE4NyBDMTQ4LjI0NzAyNywtOS4zOTMwMzAwOCAwLDcuNjk4NTczOTUgMCw3LjY5ODU3Mzk1IFoiIGlkPSJQYXRoLTIiIHNrZXRjaDp0eXBlPSJNU1NoYXBlR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMwMC4wMDAwMDAsIDMwLjAwMDAwMCkgc2NhbGUoLTEsIDEpIHRyYW5zbGF0ZSgtMzAwLjAwMDAwMCwgLTMwLjAwMDAwMCkgIj48L3BhdGg+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==") repeat-x;
		background-size: 600rpx;
		-webkit-animation: wave-animation-2 6s infinite linear;
		animation: wave-animation-2 6s infinite linear
	}

	.water-1,
	.water-2 {
		position: absolute;
		width: 100%;
		height: 60rpx
	}

	.back-white {
		background: #fff
	}

	@keyframes wave-animation-1 {
		0% {
			background-position: 0 top
		}

		100% {
			background-position: 600rpx top
		}
	}

	@keyframes wave-animation-2 {
		0% {
			background-position: 0 top
		}

		100% {
			background-position: 600rpx top
		}
	}
</style>
