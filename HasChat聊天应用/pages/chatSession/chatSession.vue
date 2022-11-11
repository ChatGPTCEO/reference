<template>
	<!--在线会话-->
	<view class="session_page">
		<scroll-view class="session_list" scroll-y>
			<block v-if="sessionList.length > 0">
				<view :key="index" v-for="(item,index) in sessionList" class="user_item"
					:data-index="index" @touchstart="drawStart($event)" @touchmove="drawMove($event)"
					@touchend="drawEnd($event)" :style="{ right: item.RightPadding + 'rpx' }">
					<view class="user_content" @click="selectSession(item)">
						<view class="user_left">
							<image :src="item.Avatar"></image>
							<view v-if="getUnReadCount(item.Id) > 0" class="un_read">
								{{getUnReadCount(item.Id)}}
							</view>
						</view>
						<view class="user_right">
							<view class="intername">{{ item.Name }}</view>
							<view class="infor overflow_1" v-html="getLastSession(item.Id)"></view>
						</view>
					</view>
					<view class="remove" @click.stop="delItem(item)">删除</view>
				</view>
			</block>
			<view v-else class="no_session">
				<view>
					<image class="no_session_img" src="../../static/img/noPeple.png" mode="widthFix">
					</image>
					<view>正等待被撩...</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import io from '@hyoga/uni-socket.io';
	export default {
		data() {
			return {
				startX: 0,
				isScroll: true,
				delBtnWidth: 160,
				sessionList:this.$store.state.sessionList
			}
		},
				mounted() {
					this.initSocket();					
				},
		watch:{
			"$store.state.sessionList":{
				deep:true,
				handler:function(newV){
					console.log("更新");
					this.sessionList = newV
				}
			}
		},
		computed: {
			getLastSession() {
				return (id) => {
					let currentContent = this.$store.state.conversitionList.filter(
						(x) =>
						(x.SendId == this.$store.state.sender.Id && x.ReciverId == id) ||
						(x.SendId == id && x.ReciverId == this.$store.state.sender.Id)
					);
					let result = "";
					if (currentContent.length > 0) {
						let len = currentContent.length - 1;
						switch (currentContent[len].Type) {
							case 0:
								result = currentContent[len].Content;
								break;
							case 1:
								result = "图片";
								break;
							case 2:
								result = "视频";
								break;
							case 3:
								result = "语音";
								break;
						}
					}
					return result;
				};
			},
			getUnReadCount() {
				return (id) => {
					let currentContent = this.$store.state.conversitionList.filter(
						(x) =>
						x.SendId == id && x.ReciverId == this.$store.state.sender.Id && !x.ReadFlag
					);
					return currentContent.length > 999 ? "999+" : currentContent.length;
				}
			}
		},
		methods: {
			initSocket() {
							const socket = io(this.$Config.SOCKETAPI, {
								query: {},
								transports: ['websocket', 'polling'],
								timeout: 5000,
							});
							this.$store.commit('setPropName', {
								propName: 'socket',
								value: socket
							});
							this.$store.state.socket.on("connect", () => {
								console.log("连接成功");
								this.$store.state.socket.emit("joinChat", {
									SendId: this.$store.state.sender.Id,
									SendName: this.$store.state.sender.Name,
									ReviceId: -1,
									ReviceName: "",
									NoCode: this.$store.state.noCode,
								});
							});
							this.$store.state.socket.on("disconnect", () => {
								console.log("连接已断开");
							});
							//修改信息状态
							this.$store.state.socket.on("changMsgState", (data) => {
								let conversitionList = this.$store.state.conversitionList;
								conversitionList.map((x) => {
									if (x.NoCode != null && x.NoCode == data.NoCode) {
										x.State = 1;
									}
								});
								this.$store.commit('setPropName', {
									propName: 'conversitionList',
									value: conversitionList
								});
							});
							// 加入会话成功
							this.$store.state.socket.on("joinSuccess", (data) => {
								this.$store.commit('setPropName', {
									propName: 'conversitionList',
									value: data.conversition
								});
								if (this.$store.state.sessionList.length == 0) {
									this.$store.commit('setPropName', {
										propName: 'sessionList',
										value: data.historySessionList
									});
								}
							});
							//接收信息
							this.$store.state.socket.on("reviceMsg", (data) => {
								console.log(data);
								if (data.ReciverId == this.$store.state.sender.Id) {
									// store.playMusic();
									for (let item of this.$store.state.sessionList) {
										if (item.Id == data.SendId && this.$store.state.sessionSelectId == data.SendId) {
											data.ReadFlag = true;
											let query = {
												SendId: data.SendId,
												ReciverId: this.$store.state.sender.Id,
											};
											this.$store.state.socket.emit("changeMsgRead", query);
											break;
										}
									}
								}
								this.$Common.sendLocal(data);
								let len = this.$store.state.sessionList.filter((x) => x.Id == data.SendId)?.length ?? 0;
								if (len === 0) {
									let item = this.$store.state.allSessionList.filter((x) => x.Id == data.SendId);
									let sessionList = this.$store.state.sessionList;
									sessionList.push(...item);
									this.$store.commit('setPropName', {
										propName: 'sessionList',
										value: sessionList
									});
								}
								this.$Common.toBottom();
							});
							//多设备在线时，强制旧设备下线
							this.$store.state.socket.on("squeezeOut", (data) => {
								if (data.noCode == this.$store.state.noCode) {
									this.$Common.logout();
									this.$Common.tipMsg("账户在其他地方登陆，会话已断开");
									this.$Common.redirectTo("/index/index");
								}
							});
						},
			//删除在线会话
			delItem(session) {
				console.log("删除会话");
			},
			selectSession(item){
				this.$store.commit("setPropName",{propName:'sessionSelectId',value:item.Id});
				this.$store.commit("setPropName",{propName:'reciver',value:item});
				this.$Common.toBottom();
				this.$Common.changeReaded(item.Id);
				this.$Common.navigateTo("/chatContent/chatContent");
			},
			drawStart: function(e) {
				let touch = e.touches[0];
				for (let index in this.$store.state.sessionList) {
					this.$store.state.sessionList[index].RightPadding = 0;
				}
				this.startX = touch.clientX;
			},
			drawMove: function(e) {
				let touch = e.touches[0];
				let disX = this.startX - touch.clientX;
				let sessionList = this.$store.state.sessionList;
				if (disX >= 20) {
					if (disX > this.delBtnWidth) {
						disX = this.delBtnWidth;
					}
					this.isScroll = false;
					sessionList[e.currentTarget.dataset.index].RightPadding = disX;
				} else {
					this.isScroll = true;
					sessionList[e.currentTarget.dataset.index].RightPadding = 0;
				}
				this.$store.commit('setPropName', {
					propName: 'sessionList',
					value: sessionList
				})
			},
			drawEnd: function(e) {
				let sessionList = this.$store.state.sessionList;
				let item = sessionList[e.currentTarget.dataset.index];
				if (item.RightPadding >= this.delBtnWidth / 2) {
					this.isScroll = true;
					sessionList[e.currentTarget.dataset.index].RightPadding = this.delBtnWidth;
				} else {
					this.isScroll = true;
					sessionList[e.currentTarget.dataset.index].RightPadding = 0;
				}
				this.$store.commit('setPropName', {
					propName: 'sessionList',
					value: sessionList
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.session_page {
		height: 100vh;
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
						.un_read {
							display: inline-block;
							position: absolute;
							top: 8px;
							right: 2px;
							height: 20px;
							width: 20px;
							border-radius: 50%;
							line-height: 10px;
							padding: 5px;
							text-align: center;
							background: #EE593C;
							color: #fff;
							font-size: 12px;
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
