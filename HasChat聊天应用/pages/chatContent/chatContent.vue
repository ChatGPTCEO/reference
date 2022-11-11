<template>
	<view class="chat-box" id="body">
		<scroll-view scroll-y class="chat-content" :style="{height:contentHeight + 'px'}"
			:scroll-top="$store.state.scrollTop">
			<view v-for="(item, index) in getConversitionList" :key="index">
				<view v-if="item.SendId == sender.Id">
					<view class="myself_item">
						<view v-if="item.State == 0">
							<image v-if="item.Type == 1" class="loadingIcon myselfImageLoad"
								src="../../static/img/loading.gif" mode="widthFix"></image>
							<image v-else class="loadingIcon myselfLoad" src="../../static/img/loading.gif"
								mode="widthFix">
							</image>
						</view>
						<view v-else-if="item.State == -1">
							<text v-if="item.Type == 1" class="sendImageError">!</text>
							<text v-else class="sendError">!</text>
						</view>
						<view v-if="item.Type == 0" class="myselfContent" v-html="item.Content">
						</view>
						<image v-else-if="item.Type == 1" class="mineSendImage" @tap="previewImg"
							:data-imgurl="item.Content" preview="1" v-bind:src="item.Content" mode="widthFix" />
						<video v-else-if="item.Type == 2" id="myvideo" class="mineSendVideo" :src="item.Content"
							@fullscreenchange="screenChange" controls="false" />
						<view v-else-if="item.Type == 3" class="mineSound" @click="playSound(item)">
							<Loading v-if="item.SoundStatus == 1" class="sound-icon"></Loading>
							<li v-else class="iconfont icon-yingpin sound-icon"></li>
							<view class="desc">{{item.Description}}<text>"</text></view>
						</view>
						<view v-if="item.Type == 2" class="videoBtn" @click="videoshow(item.Content)"></view>

						<view class="myselfImage">
							<image :src="item.Avatar"></image>
						</view>
					</view>
					<view style="clear: both"></view>
				</view>
				<view v-else-if="item.SendId == reciver.Id">
					<view class="customerServiceBlock">
						<view class="customerServiceImage">
							<image v-bind:src="item.Avatar" />
						</view>
						<view v-if="item.Type == 0" class="otherContent" v-html="item.Content"></view>
						<image v-else-if="item.Type == 1" class="yourSendImage" v-bind:src="item.Content"
							@tap="previewImg" :data-imgurl="item.Content" preview="1" mode="widthFix" />
						<video v-else-if="item.Type == 2" id="myvideo" class="yourSendVideo" :src="item.Content"
							@fullscreenchange="screenChange" controls="false" />
						<view v-else-if="item.Type == 3" class="yourSound" @click="playSound(item)">
							<Loading v-if="item.SoundStatus == 1" class="sound-icon"></Loading>
							<li v-else class="iconfont icon-yingpin sound-icon"></li>
							<view class="desc">{{item.Description}}<text>"</text></view>
						</view>
						<view v-if="item.Type == 2" class="yourVideoBtn" @click="videoshow(item.Content)"></view>
					</view>
					<view style="clear: both"></view>
				</view>
			</view>
		</scroll-view>
		<view class="chat-botton" :style="{height:bottomHeight + 'px'}">
			<!-- 输入框 -->
			<view class="input-box" :class="popupLayerClass">
				<view class="textbox">
					<view class="text-mode">
						<view class="box">
							<textarea id="ta" auto-height="true" v-model="sendContent" @focus="textareaFocus()"
								@keydown="savePos()" @keyup="savePos()" @onmousedown="savePos()"
								@onmouseup="savePos()" />
						</view>
						<view class="em" @tap="chooseEmoji">
							<view class="icon biaoqing"></view>
						</view>
					</view>
				</view>
				<view class="more" @tap="showMore">
					<view class="icon add"></view>
				</view>
				<view class="send" @tap="sendVerify">
					<view class="btn">发送</view>
				</view>
			</view>

			<!-- 底部弹框 -->
			<view class="popup-layer" :class="popupLayerClass">
				<!-- 表情包 -->
				<view class="face" :class="{hidden:hideEmoji}">
					<ul>
						<template v-for="(item, index) in expressions">
							<li :key="index">
								<image v-bind:src="item.icon" v-bind:title="item.title"
									v-on:click.stop="insertEmo(item.title)" mode="widthFix" />
							</li>
						</template>
					</ul>
				</view>
				<!-- 工具 -->
				<ul class="toolUl" :class="{hidden:hideMore}">
					<template v-for="(item, index) in toolBox">
						<li :key="index">
							<view class="item" v-on:click.stop="index == 1 ? (showServiceTool = true) : ''">
								<view class="toolIcon">
									<li :class="['iconfont',item.icon]" />
									<input v-if="index == 0" class="FileImage" type="file" value=""
										v-on:click="uploadImage" />
									<input v-if="index == 1" class="FileImage" type="file" value=""
										v-on:click="selectVedio" />
									<view v-if="index == 2" class="FileImage" @click="openSoundRecord" />
								</view>
							</view>
							<text class="totalName">{{ item.name }}</text>
						</li>
					</template>
				</ul>
			</view>
		</view>
		<view v-if="soundRecord" class="cover">
			<view class="sound-box a-c d-c">
				<view class="close-btn" @click="closeSound">
					X
				</view>
				<li v-if="soundStep == 0" class="iconfont icon-luyin2" @click="startRecord"></li>
				<li v-else-if="soundStep == 1" class="iconfont icon-zanting" @click="endRecord"></li>
				<li v-else-if="soundStep == 2 && !isPlaySound" class="iconfont icon-bofang" @click="playVoice"></li>
				<image v-else-if="soundStep == 2 && isPlaySound" class="icon-bofang2"
					src="../../static/img/sounding.gif">
					</li>
					<view class="d-c tip-box">
						<view v-if="soundStep == 0" class="tip" @click="startRecord">
							开始
						</view>
						<view v-else-if="soundStep == 1" class="tip" @click="endRecord">
							暂停
						</view>
						<template v-else-if="soundStep == 2">
							<view v-show="!isPlaySound" class="tip" @click="playVoice">
								播放
							</view>
							<view class="tip" @click="sendSound">
								发送
							</view>
						</template>

					</view>
			</view>
		</view>
		<w-compress ref='wCompress' />
	</view>
</template>

<script>
	import expressions from "@/static/json/expressions.json"
	import WCompress from '@/components/common/w-compress.vue'
	import Loading from "@/components/common/loading13.vue";

	export default {
		components: {
			WCompress,
			Loading
		},
		data() {
			return {
				expressions: expressions,
				popupLayerClass: "",
				toolBox: this.$Config.SERVICETOOLBOX,
				hideMore: true,
				hideEmoji: true,
				windowHeight: 0,
				contentHeight: 0,
				bottomHeight: 50,
				scrollTop: 0,
				sender: this.$store.state.sender,
				reciver: this.$store.state.reciver,
				sendContent: "",
				start: 0,
				end: 0,
				imageList: [],
				videoUrl: "",
				soundRecord: false,
				recorderManager: {},
				innerAudioContext: null,
				voicePath: '',
				soundStep: 0,
				isPlaySound: false,
				soundDuration: 0,
				soundObj: {
					Id: null
				}
			}
		},
		watch: {
			popupLayerClass(newV) {
				if (newV == 'showLayer') {
					this.bottomHeight = 240;
				} else {
					this.bottomHeight = 50;
				}
				this.contentHeight = this.windowHeight - this.bottomHeight;
			},
		},
		mounted() {
			uni.setNavigationBarTitle({
				title: this.reciver.Name
			})
			this.getTelephoneInfo();
			this.videoContext = uni.createVideoContext("myvideo", this);
		},
		computed: {
			getConversitionList() {
				let result = this.$store.state.conversitionList.filter(
					(x) =>
					(x.SendId == this.sender.Id &&
						x.ReciverId == this.reciver.Id) ||
					(x.ReciverId == this.sender.Id &&
						x.SendId == this.reciver.Id)
				);
				return result;
			}
		},
		methods: {
			// 发送语音
			async sendSound() {
				let noCode = +new Date() + "";
				let conversition = {
					SendId: this.sender.Id,
					ReciverId: this.reciver.Id,
					Content: this.voicePath,
					Type: 3,
					State: 0,
					NoCode: noCode,
					CreateDateUtc: '',
					Title: '',
					Description: this.soundDuration,
					Label: '',
					Thumbnail: '',
					ReadFlag: false,
					Avatar: this.sender.Avatar,
					SoundStatus: 0
				}
				if (this.$store.state.socket == null) {
					store.tipMsg("socket实例为空");
					return;
				}
				this.sendLocal(conversition);
				let result = await this.uploadFile(this.voicePath);
				if (result.code == 200) {
					conversition.Content = result.content;
					this.sendInfo(conversition);
					this.closeSound();
				} else {
					this.$Common.tipMsg("发送语音失败");
				}
			},
			// 关闭语音弹出层
			closeSound() {
				this.soundRecord = false;
				this.voicePath = '';
				this.soundStep = 0;
				this.isPlaySound = false;
				this.innerAudioContext.destroy();
			},
			// 打开语音弹出层
			openSoundRecord() {
				// #ifdef H5
				this.$Common.tipMsg("h5暂不支持");
				// #endif

				// #ifndef H5
				this.soundRecord = true;
				// 为了防止苹果手机静音无法播放
				uni.setInnerAudioOption({
					obeyMuteSwitch: false
				})
				this.recorderManager = uni.getRecorderManager();
				this.innerAudioContext = uni.createInnerAudioContext();
				this.innerAudioContext.autoplay = true;
				this.recorderManager.onStop((res) => {
					console.log('recorder stop' + JSON.stringify(res));
					this.voicePath = res.tempFilePath;
					this.soundStep = 2;
					this.soundDuration = (res.duration / 1000).toFixed(0);
				});
				// #endif

			},
			// 开始录音
			startRecord() {
				console.log('开始录音');
				const options = {
					duration: 60000
				}
				this.recorderManager.start(options);
				this.soundDuration = 0;
				this.soundStep = 1;
			},
			// 结束录音
			endRecord() {
				console.log('录音结束');
				this.recorderManager.stop();
			},
			// 播放用户的录音
			playVoice() {
				if (this.voicePath) {
					this.innerAudioContext.src = this.voicePath;
					this.innerAudioContext.play();
					this.isPlaySound = true;
					this.innerAudioContext.onEnded((res) => {
						this.isPlaySound = false;
					})
				}
			},
			// 点击用户发送/接收的录音
			playSound(item) {
				// debugger
				if (item.Id != this.soundObj.Id) {
					console.log(this.innerAudioContext);
					if (this.innerAudioContext != null) {
						this.innerAudioContext.destroy();
						this.soundObj.SoundStatus = 2;
					}
					if (item.SoundStatus != 1) {
						this.soundObj = item;
						this.innerAudioContext = uni.createInnerAudioContext();
						this.innerAudioContext.autoplay = true;
						this.innerAudioContext.src = item.Content;
						this.innerAudioContext.play();
						item.SoundStatus = 1;
						this.innerAudioContext.onEnded((res) => {
							item.SoundStatus = 2;
						})
					}
				} else {
					if (item.SoundStatus != 1) {
						this.soundObj = item;
						this.innerAudioContext = uni.createInnerAudioContext();
						this.innerAudioContext.autoplay = true;
						this.innerAudioContext.src = item.Content;
						this.innerAudioContext.play();
						item.SoundStatus = 1;
						this.innerAudioContext.onEnded((res) => {
							item.SoundStatus = 2;
						})
					} else {
						this.innerAudioContext.destroy();
						item.SoundStatus = 2;
					}
				}

			},
			// 切换视频全屏
			screenChange(e) {
				let fullScreen = e.detail.fullScreen; //值true为进入全屏，false为退出全屏
				if (!fullScreen) {
					this.videoContext.pause();
				}
			},
			// 播放视频
			videoshow(e) {
				this.videoUrl = e;
				this.videoContext.requestFullScreen({
					direction: 90
				}); //direction: 90  控制全屏的时候视屏旋转多少度 
				this.videoContext.play();
			},
			//查看大图
			previewImg(e) {
				let imgArr = [];
				for (let i = 0; i < this.$store.state.conversitionList.length; i++) {
					if (this.$store.state.conversitionList[i].Type === 1) {
						imgArr.push(this.$store.state.conversitionList[i].Content)
					}
				}
				let index = 0;
				for (let i = 0; i < imgArr.length; i++) {
					if (imgArr[i] == e.currentTarget.dataset.imgurl) {
						index = i;
						break;
					}
				}
				uni.previewImage({
					current: index,
					urls: imgArr
				})
			},
			// 发送校验
			sendVerify() {
				let sendContent = this.sendContent.trim();
				if (sendContent.length == 0) {
					this.$Common.tipMsg("不能发送空白消息")
					return;
				} else {
					let pattern = /\[.*?\]/g;
					let matchResult = sendContent.match(pattern);
					if (matchResult != null) {
						matchResult.map(x => {
							let name = x.substr(0, x.length - 1).substr(1)
							let url =
								`<img src="https://howcode.online/emo/${name}.png" class="emo-image"/>`
							sendContent = sendContent.replace(x, url)
						})
					}
					sendContent = "<p>" + sendContent + "</p>"
					let noCode = +new Date() + "";
					let conversition = {
						SendId: this.sender.Id,
						ReciverId: this.reciver.Id,
						Content: sendContent,
						Type: 0,
						State: 0,
						NoCode: noCode,
						CreateDateUtc: '',
						Title: '',
						Description: '',
						Label: '',
						Thumbnail: '',
						ReadFlag: false,
						Avatar: this.sender.Avatar,
						SoundStatus: 0
					}
					if (this.$store.state.socket == null) {
						store.tipMsg("socket实例为空");
						return;
					}
					this.sendLocal(conversition);
					this.sendInfo(conversition);
				}
				this.sendContent = '';
			},
			// 发送信息到本地显示
			sendLocal(conversition) {
				let conversitionList = this.$store.state.conversitionList;
				conversitionList.push(conversition);
				this.$store.commit('setPropName', {
					propName: 'conversitionList',
					value: conversitionList
				});
				this.$Common.toBottom();
				console.log(this.$store.state.scrollTop);
			},
			// 真实发送消息
			sendInfo(conversition) {
				let data = {
					Conversition: conversition,
					ReciverId: this.reciver.Id,
					Sender: this.sender,
				};
				this.$store.state.socket.emit("sendMsg", data);
			},
			//获取设备信息
			async getTelephoneInfo() {
				uni.getSystemInfo({
					success: (res) => {
						// 设置滚动高度
						const query = wx.createSelectorQuery();
						query.select('#body').boundingClientRect();
						query.exec(res => {
							res.map((item, index) => {
								this.windowHeight = item.height;
							})
						})
						this.contentHeight = this.windowHeight - this.bottomHeight;
					}
				})
			},
			// 打开表情
			chooseEmoji() {
				this.hideMore = true;
				if (this.hideEmoji) {
					this.hideEmoji = false;
					this.openDrawer();
				} else {
					this.hideDrawer();
				}
			},
			// 展示更多
			showMore() {
				this.hideEmoji = true;
				if (this.hideMore) {
					this.hideMore = false;
					this.openDrawer();
				} else {
					this.hideDrawer();
				}
			},
			// 打开抽屉
			openDrawer() {
				this.popupLayerClass = 'showLayer';
			},
			// 隐藏抽屉
			hideDrawer() {
				this.popupLayerClass = '';
				setTimeout(() => {
					this.hideMore = true;
					this.hideEmoji = true;
				}, 150);
			},
			//获取焦点，如果不是选表情ing,则关闭抽屉
			textareaFocus(textBox) {
				this.expressionShow = false;
				this.moreTool = false;
				this.popupLayerClass = '';
				this.savePos()
			},
			// 插入表情
			insertEmo(content) {
				if (this.start != undefined && this.end != undefined) {
					var pre = this.sendContent.substr(0, this.start);
					var post = this.sendContent.substr(this.end);
					this.sendContent = pre + content + post;
					this.start += content.length;
					this.end += content.length;
				} else {
					this.sendContent += content;
				}
			},
			// 保存焦点位置
			savePos() {
				uni.getSelectedTextRange({
					complete: res => {
						this.start = res.start;
						this.end = res.end;
					}
				});
			},
			//上传图片
			async uploadImage() {
				uni.chooseImage({
					count: 1, //默认9
					sourceType: ['camera', 'album'],
					success: (res) => {
						let type = "jpg";
						let rate = "0.8";
						if (res.tempFiles[0].path.indexOf("png") >= 0) {
							type = "png"
						} else if (res.tempFiles[0].path.indexOf("jpeg") >= 0) {
							type = "jpeg"
						}
						if (res.tempFiles[0].size < 1024000) {
							rate = "0.9"
						} else if (res.tempFiles[0].size > 1024000 && res.tempFiles[0].size <= 2048000) {
							rate = "0.8"
						} else if (res.tempFiles[0].size > 2048000 && res.tempFiles[0].size <= 5120000) {
							rate = "0.5"
						} else if (res.tempFiles[0].size > 5120000 && res.tempFiles[0].size < 10240000) {
							rate = "0.4"
						} else if (res.tempFiles[0].size > 10240000) {
							this.$Common.tipMsg("图片大小不得超过10M")
							return;
						}
						uni.showLoading({
							title: '上传图片中...',
							mask: true
						})
						this.$refs.wCompress.start(res.tempFilePaths[0], {
								pixels: 4000000, // 最大分辨率，默认二百万
								quality: rate, // 压缩质量，默认0.8
								type: type, // 图片类型，默认jpg
								base64: false, // 是否返回base64，默认false，非H5有效
							})
							.then(async res  =>  {
								uni.hideLoading();
								let result = await this.uploadFile(res);
								console.log(result);
								if (result.code == 200) {
									this.imageList.push(result.content);
									this.sendImage(result.content, 1);
								}
							})
							.catch(e => {
								uni.hideLoading()
							})
					}
				});
			},
			// 打开视频
			selectVedio() {
				uni.chooseVideo({
					count: 1, //默认9
					sourceType: ['camera', 'album'],
					success: (res) => {
						this.sendVideo(res, 2);
					}
				});
			},
			// 发送图片
			sendImage(content, type) {
				let noCode = +new Date() + "";
				let conversition = {
					SendId: this.sender.Id,
					ReciverId: this.reciver.Id,
					Content: content,
					Type: type,
					State: 0,
					NoCode: noCode,
					CreateDateUtc: '',
					Title: '',
					Description: '',
					Label: '',
					Thumbnail: '',
					ReadFlag: false,
					Avatar: this.sender.Avatar,
					SoundStatus: 0
				}
				if (this.$store.state.socket == null) {
					store.tipMsg("socket实例为空");
					return;
				}
				this.sendLocal(conversition);
				this.sendInfo(conversition);
			},
			// 发送视频
			async sendVideo(res, type) {
				let noCode = +new Date() + "";
				let conversition = {
					SendId: this.sender.Id,
					ReciverId: this.reciver.Id,
					Content: res.tempFilePath,
					Type: type,
					State: 0,
					NoCode: noCode,
					CreateDateUtc: '',
					Title: '',
					Description: '',
					Label: '',
					Thumbnail: '',
					ReadFlag: false,
					Avatar: this.sender.Avatar,
					SoundStatus: 0
				}
				if (this.$store.state.socket == null) {
					store.tipMsg("socket实例为空");
					return;
				}
				this.sendLocal(conversition);
				let result = await this.uploadFile(res.tempFilePath);
				if (result.code == 200) {
					conversition.Content = result.content;
					this.sendInfo(conversition);
				}
			},
			// 上传文件
			uploadFile(tempFilePath) {
				return new Promise((resolve, reject) => {
					uni.uploadFile({
						url: this.$Config.APIURL + '/api/uploadFile', //接口地址
						filePath: tempFilePath,
						name: 'file',
						success: (uploadFileRes) => {
							let result = {
								code: 500,
								content: ""
							}
							if (uploadFileRes.statusCode == 200) {
								let data = JSON.parse(uploadFileRes.data);
								result.code = 200;
								result.content = this.$Config.APIURL +
									`/api/getFile?url=${data[0].filename}${data[0].originalname}`
								resolve(result)
							} else {
								resolve(result)
							}
						},

					});
				})
			}
		},
	}
</script>

<style scoped lang="scss">
	@import "@/static/css/chat.scss";
	@import "@/static/css/icon.css";

	li {
		list-style: none;
	}

	.close-btn {
		position: absolute;
		left: 50%;
		top: -50px;
		transform: translateX(-50%);
		height: 30px;
		width: 30px;
		font-size: 12px;
		color: #000;
		background-color: #fff;
		text-align: center;
		line-height: 30px;
		border-radius: 50%;
	}

	.sound-box {
		width: 80%;
		height: 200rpx;
		background-color: #fff;
		flex-wrap: wrap;
		border-radius: 10rpx;
		position: relative;

		.icon-luyin2,
		.icon-zanting,
		.icon-bofang {
			font-size: 80rpx;
			color: #1CD66C;
			width: 100%;
			text-align: center;
		}

		.icon-bofang2 {
			width: 100%;
			height: 100rpx;
		}

		.tip-box {
			justify-content: space-around;
			width: 100%;

			.tip {
				font-size: 28rpx;
			}
		}

	}

	.chat-box {
		height: 100vh!important;
		width: 100%;

		.chat-content {
			background: #272A2F;
			width: 100%;
			height: calc(100vh - 100rpx);
			overflow-y: auto;

			.customerServiceBlock {
				float: left;
				margin: 40rpx 0;
				display: flex;
				position: relative;

				.customerServiceImage>image {
					height: 100rpx;
					width: 100rpx;
				}

				.customerServiceImage {
					position: absolute;
					left: 16rpx;
					height: 100rpx;
					width: 100rpx;
					overflow: hidden;
				}

				.yourSendImage {
					padding: 10rpx;
					border-radius: 11px;
					max-width: 400rpx;
					margin-right: 120rpx;
					margin-left: 120rpx;
					overflow: hidden;
					max-height: 500rpx;
					width: 400rpx;
					height: auto;
				}

				.yourSendVideo,
				.yourVideoBtn {
					padding: 10rpx;
					border-radius: 11px;
					margin-left: 128rpx;
					overflow: hidden;
					width: 400rpx;
					height: 400rpx;
				}

				.yourVideoBtn {
					z-index: 99;
					position: absolute;
					top: 5px;
					left: 5px;
				}

				.otherContent {
					background: #eeeeee;
					padding: 20rpx 20rpx;
					border-radius: 40rpx;
					border-top-left-radius: 0;
					max-width: 400rpx;
					margin-left: 140rpx;
					position: relative;
					min-height: 100rpx;
					align-items: center;
				}

				.yourSound {
					background: #eeeeee;
					padding: 20rpx 20rpx;
					border-radius: 40rpx;
					border-top-left-radius: 0;
					width: 200rpx;
					margin-left: 140rpx;
					position: relative;
					min-height: 100rpx;
					display: flex;
					align-items: center;

					.desc {
						width: 60rpx;
						text-align: center;
					}

					.sound-icon {
						width: 70rpx;
						text-align: left;
					}
				}
			}

			.sendImageError {
				position: absolute;
				top: 50%;
				left: -60rpx;
				background: red;
				color: #fff;
				display: inline-block;
				width: 40rpx;
				text-align: center;
				height: 40rpx;
				border-radius: 50%;
				transform: translateY(-50%);
			}

			.sendError {
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				left: -50rpx;
				background: red;
				color: #fff;
				display: inline-block;
				width: 40rpx;
				text-align: center;
				height: 40rpx;
				border-radius: 50%;
				font-size: 28rpx;
			}

			.loadingIcon {
				width: 60rpx;
				height: auto;
			}

			.mineSendImage,
			.yourSendImage {
				padding: 10rpx;
				border-radius: 11px;
				max-width: 400rpx;
				margin-right: 120rpx;
				overflow: hidden;
				max-height: 500rpx;
				width: 400rpx;
				height: auto;
			}

			.mineSendVideo,
			.videoBtn {
				padding: 10rpx;
				border-radius: 11px;
				margin-right: 128rpx;
				overflow: hidden;
				width: 400rpx;
				height: 400rpx;
			}

			.mineSound {
				background: #635C5B;
				color: #fff;
				padding: 20rpx 20rpx;
				border-radius: 40rpx;
				border-top-right-radius: 0;
				width: 200rpx;
				margin-right: 140rpx;
				position: relative;
				min-height: 100rpx;
				display: flex;
				align-items: center;

				.desc {
					width: 60rpx;
					text-align: center;
				}

				.sound-icon {
					width: 70rpx;
					text-align: left;
				}
			}

			.videoBtn {
				z-index: 99;
				position: absolute;
				top: 5px;
				left: 5px;
			}

			.myself_item {
				float: right;
				margin: 40rpx 0;
				display: flex;
				position: relative;

				.myselfImage {
					height: 100rpx;
					width: 100rpx;
					position: absolute;
					right: 16rpx;
					overflow: hidden;
				}

				.myselfImage>image {
					height: 100rpx;
					width: 100rpx;
				}

				.myselfContent {
					background: #635C5B;
					color: #fff;
					padding: 20rpx 20rpx;
					border-radius: 40rpx;
					border-top-right-radius: 0;
					max-width: 400rpx;
					margin-right: 140rpx;
					position: relative;
					min-height: 100rpx;
					align-items: center;
				}

				.expression_img {
					width: 40rpx;
					height: auto;
					vertical-align: middle;
				}

				.myselfImageLoad {
					position: absolute;
					left: -50rpx;
					top: 50%;
					transform: translateY(-50%);
				}

				.myselfLoad {
					position: absolute;
					left: -50rpx;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}

		.chat-botton {
			width: 100%;
			height: 100rpx;
			background-color: #f2f2f2;
			display: flex;
			position: fixed;
			z-index: 20;
			bottom: -2rpx;
			transition: all .15s linear;
			border-bottom: solid 1rpx #ddd;

			.textbox {
				width: 100%;
				min-height: 70rpx;
				margin-top: 15rpx;

				.text-mode {
					width: 100%;
					min-height: 70rpx;
					display: flex;
					background-color: #fff;
					border-radius: 40rpx;
				}
			}

			// .popup-layer {
			// 	transition: all .15s linear;
			// 	width: 100%;
			// 	height: 50vw;
			// 	padding-bottom: 15px;
			// 	background-color: #fff;
			// 	border-top: solid 0.5px #ddd;
			// 	position: fixed;
			// 	z-index: 20;
			// 	top: 100%;
			// 	padding-top: 40rpx;

				.toolUl {
					width: 100%;
					display: flex;
					margin: 0;
					padding: 0;

					.FileImage {
						margin-top: 5px;
						z-index: 1;
						position: absolute;
						opacity: 0;
						bottom: 0px;
						left: -0.1rem;
						height: 60rpx;
						width: 100rpx;
					}
				}

				.toolUl>li {
					display: inline-block;
					text-align: center;
					font-size: 12px;
					position: relative;
					width: 25%;
				}

				.item {
					width: 50px;
					height: 50px;
					background-color: #F2F5F7;
					border-radius: 50%;
					display: inline-block;
				}

				.toolIcon {
					display: -webkit-flex;
					display: flex;
					-webkit-justify-content: center;
					justify-content: center;
					-webkit-align-items: center;
					align-items: center;
					width: 100%;
					height: 100%;
					position: relative;
				}

				.toolImage {
					height: 60rpx;
					width: auto;
				}

				.totalName {
					margin-top: 5px;
					display: block;
					color: #515A7C;
				}

				.face {
					width: 101%;
				}

				.face ul {
					width: 100%;
					height: 100%;
					display: flex;
					flex-wrap: wrap;
					padding: 8px;
					box-sizing: border-box;
				}

				.face ul li {
					width: 60rpx;
					height: 60rpx;
					list-style-type: none;
					cursor: pointer;
					display: flex;
					justify-content: center;
					align-items: center;
					box-sizing: content-box;
					padding: 10rpx;
				}

				.face ul li>image {
					width: 60rpx;
					height: auto;
				}
			}
		}
	}
</style>
