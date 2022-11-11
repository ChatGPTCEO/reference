<template>
	<view>
		<view 
		id="voiceID"
		class="voice center" 
		:class="longPress == '1' ? '' : 'record-btn-2'" 
		@longpress="longpressBtn()"
		@touchmove.stop.prevent="longpressMove"
		@touchend="touchendBtn()">按住 说话</view>
		
		<!-- 语音音阶动画 -->
		<view class="prompt-layer prompt-layer-1" v-if="longPress == '2'">
			<view class="prompt-loader">
				<view class="em" v-for="(item,index) in 15" :key="index"></view>
			</view>
		</view>
	</view>
</template>

<script>
	const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();
	var init; // 录制时长计时器
	
	export default {
		data() {
			return {
				time: 0, //录音时长
				duration: 60000, //录音最大值ms 60000/1分钟
				tempFilePath_voice: '', //音频路径
				longPress: '1', // 1显示 按住说话 2显示 说话中
				clientX: '',
				clientY: '',
				recordAuth: false,
			}
		},
		created() {
			recorderManager.onStop((res) => {
				console.log('监听到录音结束')
				this.longPress = '1';
				clearInterval(init);
				
				if (this.time < 1) {
					this.$base.toast('说话时间太短！');
					return false;
				}
				this.tempFilePath_voice = res.tempFilePath;
				console.log('seconds', this.time)
				console.log('tempFilePathtempFilePath', this.tempFilePath_voice)
				this.$emit('sendVoice', {voiceUrl: this.tempFilePath_voice, seconds: this.time, msgtype: 'RC:HQVCMsg'})
				this.time = 0;
			});
			
			// 减查是否授权过
			this.getSetting();
		},
		methods: {
			// 长按录音事件
			longpressBtn() {
				if (this.recordAuth == undefined) {
					this.Authorize();
					return;
				} else if (this.recordAuth == false) {
					this.OpenSetting();
					return;
				}
				const options = {
					duration: this.duration, // 指定录音的时长，单位 ms
					sampleRate: 16000, // 采样率
					numberOfChannels: 1, // 录音通道数
					encodeBitRate: 96000, // 编码码率
					format: 'mp3', // 音频格式，有效值 aac/mp3
					frameSize: 10, // 指定帧大小，单位 KB
				}
				recorderManager.start(options);
				recorderManager.onError((err) => {
					console.log('err', err);
					this.getSetting();
				})
				
				// 监听音频开始事件
				this.longPress = '2';
				recorderManager.onStart((res) => {
					this.recordingTimer();
				})
			},
			// 长按松开录音事件
			touchendBtn() {
				if (this.longPress == '2') {
					recorderManager.stop();
				}
			},
			longpressMove(e) {
				console.log('手指移动', e)
				if (this.clientX == '' && this.clientY == '') {   // 如果没有就赋值
					this.clientX = e.touches[0].clientX;
					this.clientY = e.touches[0].clientY
				} else {    // 有值就判断移动距离
					if (Math.abs(e.touches[0].clientX - this.clientX) > 20 || Math.abs(e.touches[0].clientY - this.clientY) > 20) {
						recorderManager.stop();
					}
				}
				// recorderManager.stop();
			},
			recordingTimer() {
				// 将计时器赋值给init
				init = setInterval(() => {
					this.time++
					if (this.time > 59) {   // 录音超过六十秒 停止录制直接发送
						clearInterval(init);
					}
				}, 1000);
			},
			
			OpenSetting() {
				uni.showModal({
					title: '请求授权录音权限',
					content: '发送语音需要您的麦克风授权，请确认授权',
					success: (modalRes) => {
						if (modalRes.confirm) {
							uni.openSetting({
								success: (settingRes) => {
									if (settingRes.authSetting['scope.record']) {
										this.recordAuth = true;
										this.$base.toast('麦克风授权成功')
									} else {
										this.$base.toast('授权失败')
									}
								}
							})
						}
					}
				})
			},
			Authorize() {
				uni.authorize({
					scope: 'scope.record',
					success: () => {
						// 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
						this.recordAuth = true;
					},
					fail: (err) => {
						this.recordAuth = false;
					}
				})
			},
			
			getSetting() {
				uni.getSetting({
					success: (res) => {
						console.log('检查授权状态', res)
						this.recordAuth = res.authSetting['scope.record'];
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.voice {
		width: 510rpx;
		min-height: 80rpx;
		background: #F4F4F4;
		border-radius: 20rpx;
		color: #333333;
		font-size: 28rpx;
		animation: slide .3s linear;
		overflow: hidden;
		white-space: nowrap;
	}
	
	@keyframes slide {
		from {
			width: 0;
			transform: translateX(-255rpx);
		}
		to {
			width: 510rpx;
			transform: translateX(0);
		}
	}
	
	/* 语音录制开始--------------------------------------------------------------------- */
	.record-btn-2{
		background: #e1e5e5;
	}
	/* 提示小弹窗 */
	.prompt-layer{
		border-radius: 8px;
		background: #FFD300;
		padding: 30px 16px;
		box-sizing: border-box;
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
	.prompt-layer::after{
		content: '';
		display: block;
		border: 6px solid rgba(0,0,0,0);
		border-top-color: rgba(255, 211, 0, 1);
		position: absolute;
		bottom: -10px;
		left: 50%;
		transform: translateX(-50%);
	}
	.prompt-layer-1{
		font-size: 12px;
		width: 128px;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.prompt-layer-1 .p{
		color: #000000;
	}
	.prompt-layer-1 .span{
		color: rgba(0,0,0,.6);
	}
	.prompt-loader .em{
		
	}
	/* 语音音阶------------- */
	.prompt-loader {
		width: 96px;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 6px;
	}
	.prompt-loader .em {
		display: block;
		background: #333333;
		width: 1px;
		height: 10%;
		margin-right: 2.5px;
		float: left;
	}
	.prompt-loader .em:last-child {
		margin-right: 0px;
	}
	.prompt-loader .em:nth-child(1) {
	 animation: load 2.5s 1.4s infinite linear;
	}
	.prompt-loader .em:nth-child(2) {
	 animation: load 2.5s 1.2s infinite linear;
	}
	.prompt-loader .em:nth-child(3) {
	 animation: load 2.5s 1s infinite linear;
	}
	.prompt-loader .em:nth-child(4) {
	 animation: load 2.5s 0.8s infinite linear;
	}
	.prompt-loader .em:nth-child(5) {
	 animation: load 2.5s 0.6s infinite linear;
	}
	.prompt-loader .em:nth-child(6) {
	 animation: load 2.5s 0.4s infinite linear;
	}
	.prompt-loader .em:nth-child(7) {
	 animation: load 2.5s 0.2s infinite linear;
	}
	.prompt-loader .em:nth-child(8) {
	 animation: load 2.5s 0s infinite linear;
	}
	.prompt-loader .em:nth-child(9) {
	 animation: load 2.5s 0.2s infinite linear;
	}
	.prompt-loader .em:nth-child(10) {
	 animation: load 2.5s 0.4s infinite linear;
	}
	.prompt-loader .em:nth-child(11) {
	 animation: load 2.5s 0.6s infinite linear;
	}
	.prompt-loader .em:nth-child(12) {
	 animation: load 2.5s 0.8s infinite linear;
	}
	.prompt-loader .em:nth-child(13) {
	 animation: load 2.5s 1s infinite linear;
	}
	.prompt-loader .em:nth-child(14) {
	 animation: load 2.5s 1.2s infinite linear;
	}
	.prompt-loader .em:nth-child(15) {
	 animation: load 2.5s 1.4s infinite linear;
	}
	@keyframes load {
		0% {
			height: 10%;
		}
		50% {
			height: 100%;
		}
		100% {
			height: 10%;
		}
	}
	/* 语音音阶-------------------- */
	.prompt-layer-2{
		top: -40px;
	}
	.prompt-layer-2 .text{
		color: rgba(0, 0, 0, 1);
		font-size: 12px;
	}
	/* 语音录制结束---------------------------------------------------------------- */
</style>