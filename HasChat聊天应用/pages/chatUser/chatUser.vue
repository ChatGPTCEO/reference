<template>
	<view class="session_page">
		<scroll-view class="session_list" scroll-y>
			<block v-if="users.length > 0">
				<view v-for="(item, index) in users" :key="index" class="user_item" :data-index="index">
					<view class="user_content" @click="selectSession(item)">
						<view class="user_left">
							<image :src="item.Avatar"></image>
						</view>
						<view class="user_right">
							<view class="intername">{{ item.Name }}</view>
							<view class="infor">{{ item.NickName }}</view>
						</view>
					</view>
				</view>
			</block>
			<view v-else class="no_session">
				<image class="no_session_img" src="../../static/img/noSession.png" mode="widthFix"></image>
				<view>赶快添加新好友吧</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				users: this.$store.state.allSessionList,
				page: {
					pageIndex: 1,
					pageSize: 30
				}
			}
		},
		mounted() {
			
			if (this.users.length == 0) {
				this.getUserList();
			}
		},
		methods: {
			
			getUserList() {
				this.$Request.post(this.$Config.APIURL + "/api/userList", {
					id: this.$store.state.sender.Id,
					pageIndex: this.page.pageIndex,
					pageSize: this.page.pageSize
				}, "application/x-www-form-urlencoded", false).then(res => {
					if (res?.code == 200) {
						this.users.push(...res.data);
						if (res?.data.length < this.page.pageSize) {
							this.$store.commit("setPropName", {
								propName: 'allSessionList',
								value: this.users
							});
						} else {
							this.page.pageIndex += 1;
							this.getUserList();
						}

					} else {
						this.users = [];
						this.$Common.tipMsg(res.message)
					}
				})
			},
			// 选择会话用户
			selectSession(item) {
				this.$store.commit('setPropName', {
					propName: 'allSessionSelectId',
					value: item.Id
				});
				this.$store.commit('setPropName', {
					propName: 'readyReciver',
					value: item
				});
				this.$Common.navigateTo("/userDetail/userDetail");
			}
		}
	}
</script>

<style scoped lang="scss">
	.session_page {
		height: 100%;
		width: 100%;

		.session_list {
			height: 100%;
			width: 100%;
			overflow: auto;

			.user_item {
				height: 150rpx;
				width: 100%;
				position: relative;
				box-sizing: border-box;

				.user_content {
					height: 100%;
					width: 100%;
					display: flex;

					.user_left {
						width: 18%;
						height: 100%;
						display: flex;
						justify-content: center;
						align-items: center;
						position: relative;

						image {
							height: 100rpx;
							width: 100rpx;
						}
					}

					.user_right {
						width: 82%;
						height: 100%;
						border-bottom: 1px solid #EFEFEF;
						text-align: left;

						.intername {
							height: 40px;
							line-height: 40px;
						}

						.infor {
							font-size: 12px !important;
							color: #707070;
							width: 98%;
							overflow: hidden;
							text-overflow: ellipsis;
						}
					}
				}

				.remove {
					width: 160rpx;
					height: 100%;
					background-color: #FF5252;
					color: white;
					position: absolute;
					top: 0;
					right: -160rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					box-sizing: border-box;
				}
			}

			.no_session {
				height: 80rpx;
				line-height: 80rpx;
				width: 100%;
				text-align: center;
				font-size: 34rpx;
				color: #C8C7CC;

				.no_session_img {
					width: 200rxp;
					height: auto;
				}
			}

		}
	}
</style>
