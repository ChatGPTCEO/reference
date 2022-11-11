<template>
	<view class="content" v-if="isShow" @click.stop="isShow=false">
		<canvas @click.stop="" :style="{ width: canvasW + 'px', height: canvasH + 'px' }" canvas-id="my-canvas"></canvas>
		<view class="save-btn" @click.stop="saveImage">保存海报</view>
	</view>
</template>

<script>
	export default {
		props: {
			headerImg: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: '草莓千层蛋糕'
			},
			subTitle: {
				type: String,
				default: '鲜嫩多汁的草莓融合香甜奶油'
			},
			price: {
				type: Number,
				default: 0
			},
			vipprice: {
				type: Number,
				default: 0
			},
			userImg: {
				type: String,
				default: ''
			},
			userNmae: {
				type: String,
				default: '昵称'
			}
		},
		data() {
			return {
				canvasW: 0,
				canvasH: 0,
				ctx: null,
				isShow: false,
				qrcode: '',
				biaoqian: '/static/biao.png',
				vip: '/static/vip_bq.png'
			}
		},
		methods: {
			//显示
			showCanvas(qrcode) {
				this.isShow = true
				this.qrcode = qrcode
				this.__init()
			},
			//初始化画布
			async __init() {
				uni.showLoading({
					title: '生成中...',
					mask: true
				})
				this.ctx = uni.createCanvasContext('my-canvas', this)
				this.canvasW = uni.upx2px(550);
				this.canvasH = uni.upx2px(800);
				//设置画布背景透明
				this.ctx.setFillStyle('rgba(255, 255, 255, 0)')
				//设置画布大小
				this.ctx.fillRect(0, 0, this.canvasW, this.canvasH)
				//绘制圆角背景
				this.drawRoundRect(this.ctx, 0, 0, this.canvasW, this.canvasH, uni.upx2px(18), '#FFFFFF')
				//获取标题图片
				let headerImg = await this.getImageInfo(this.headerImg)
				let hW = uni.upx2px(500);
				let hH = uni.upx2px(320);
				//绘制标题图
				this.drawRoundImg(this.ctx, headerImg.path, ((this.canvasW - hW) / 2), ((this.canvasW - hW) / 2), hW, hH, uni.upx2px(
					16))
				//绘制标题
				this.ctx.setFontSize(16); //设置标题字体大小
				this.ctx.setFillStyle('#333'); //设置标题文本颜色
				this.ctx.fillText(this.title.slice(0, 15), ((this.canvasW - hW) / 2), (
					((this.canvasW - hW) / 2) + hH + uni.upx2px(50)))
				this.ctx.fillText(this.title.slice(15, 28) + '...', ((this.canvasW - hW) / 2), (
					((this.canvasW - hW) / 2) + hH + uni.upx2px(90)))
				//绘制副标题
				this.ctx.setFontSize(12);
				this.ctx.setFillStyle('#858585');
				let sWidth = this.ctx.measureText(this.subTitle).width
				if (sWidth > hW) {
					this.ctx.fillText(this.subTitle.slice(0, 17) + '...', ((this.canvasW - hW) / 2), (
						((this.canvasW - hW) / 2) + hH + uni.upx2px(135)))
				} else {
					this.ctx.fillText(this.subTitle, ((this.canvasW - hW) / 2), (
						((this.canvasW - hW) / 2) + hH + uni.upx2px(135)))
				}
				//绘制虚线
				this.drawDashLine(this.ctx, uni.upx2px(20), (((this.canvasW - hW) / 2) + hH + uni.upx2px(180)), (this.canvasW -
					uni.upx2px(20)), (((this.canvasW - hW) / 2) + hH + uni.upx2px(180)), 5)
				//左边实心圆
				this.drawEmptyRound(this.ctx, 0, (((this.canvasW - hW) / 2) + hH + uni.upx2px(180)), uni.upx2px(20))
				//右边实心圆
				this.drawEmptyRound(this.ctx, this.canvasW, (((this.canvasW - hW) / 2) + hH + uni.upx2px(180)), uni.upx2px(20))
				//提示文案
				this.ctx.setFontSize(9);
				this.ctx.setFillStyle('#b9b9b9');
				this.ctx.fillText('长按识别图“柘吃这喝”小程序', (((this.canvasW - hW) / 2) + uni.upx2px(135)), (((this.canvasW - hW) / 2) + hH +
					uni.upx2px(430)))
				//底部头像
				let BottomAdImg = await this.getImageInfo(this.userImg)
				//this.ctx.drawImage(BottomAdImg.path,(((this.canvasW-hW) / 2))+60,(((this.canvasW-hW) / 2) + hH + uni.upx2px(310)),uni.upx2px(120),uni.upx2px(120))
				let x = ((this.canvasW - hW) / 2) + 10;
				let y = (((this.canvasW - hW) / 2) + hH + uni.upx2px(200))
				this.yuanImg(this.ctx, BottomAdImg.path, x, y, 18) //微信头像
				this.ctx.setFontSize(14);
				this.ctx.fillText(this.userNmae, x + 40, y + 22) //微信昵称
				//绘制价格
				this.ctx.setFontSize(18);
				this.ctx.setFillStyle('#fd3f31');
				//抢购价格标签
				this.ctx.drawImage(this.biaoqian, x, y + 50, 45, 18)
				this.ctx.fillText('￥', x + 45, y + 65)
				this.ctx.setFontSize(18);
				this.ctx.fillText(this.price.toFixed(2), x + 60, y + 65)
				//多人喜欢
				this.ctx.setFillStyle('#fd3f31');
				this.ctx.setFontSize(12);
				this.ctx.fillText('多人喜欢', x, y + 92)
				//vip价格
				this.ctx.drawImage(this.vip, x + 55, y + 80, 26, 15)
				this.ctx.setFontSize(12);
				this.ctx.setFillStyle('#858585');
				let money = this.price - this.vipprice
				this.ctx.fillText('优惠' + money.toFixed(2) + '元', x + 85, y + 92)
				//this.vipprice.toFixed(2)
				//小程序码
				let qrcodeImg = await this.getImageInfo(this.qrcode)
				this.ctx.drawImage(qrcodeImg.path, uni.upx2px(380), (((this.canvasW - hW) / 2) + hH + uni.upx2px(210)), uni.upx2px(
					156), uni.upx2px(156))
				//延迟渲染
				setTimeout(() => {
					this.ctx.draw(true, () => {
						uni.hideLoading()
					})
				}, 500)
			},
			//绘制实心圆
			drawEmptyRound(ctx, x, y, radius) {
				ctx.save()
				ctx.beginPath();
				ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
				ctx.setFillStyle('rgba(0, 0, 0, .4)')
				ctx.fill();
				ctx.restore()
				ctx.closePath()
			},
			//绘制虚线
			drawDashLine(ctx, x1, y1, x2, y2, dashLength) {
				ctx.setStrokeStyle("#cccccc") //设置线条的颜色
				ctx.setLineWidth(1) //设置线条宽度
				var dashLen = dashLength,
					xpos = x2 - x1, //得到横向的宽度;
					ypos = y2 - y1, //得到纵向的高度;
					numDashes = Math.floor(Math.sqrt(xpos * xpos + ypos * ypos) / dashLen);
				//利用正切获取斜边的长度除以虚线长度，得到要分为多少段;
				for (var i = 0; i < numDashes; i++) {
					if (i % 2 === 0) {
						ctx.moveTo(x1 + (xpos / numDashes) * i, y1 + (ypos / numDashes) * i);
						//有了横向宽度和多少段，得出每一段是多长，起点 + 每段长度 * i = 要绘制的起点；
					} else {
						ctx.lineTo(x1 + (xpos / numDashes) * i, y1 + (ypos / numDashes) * i);
					}
				}
				ctx.stroke();
			},
			//圆形头像
			yuanImg(ctx, img, x, y, r) {
				// 通过arc来绘制一个圆形区域
				var d = 2 * r;
				ctx.save()
				//ctx.globalCompositeOperation = 'destination-in'
				ctx.fillStyle = '#fff'
				ctx.arc(x + r, y + r, r, 0, 2 * Math.PI)
				ctx.clip()
				ctx.drawImage(img, x, y, d, d)
				//ctx.fillRect(0, 0, 50, 50)
				ctx.restore()
			},
			//带圆角图片
			drawRoundImg(ctx, img, x, y, width, height, radius) {
				ctx.beginPath()
				ctx.save()
				// 左上角
				ctx.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 1.5)
				// 右上角
				ctx.arc(x + width - radius, y + radius, radius, Math.PI * 1.5, Math.PI * 2)
				// 右下角
				ctx.arc(x + width - radius, y + height - radius, radius, 0, Math.PI * 0.5)
				// 左下角
				ctx.arc(x + radius, y + height - radius, radius, Math.PI * 0.5, Math.PI)
				ctx.stroke()
				ctx.clip()
				ctx.drawImage(img, x, y, width, height);
				ctx.restore()
				ctx.closePath()
			},
			//圆角矩形
			drawRoundRect(ctx, x, y, width, height, radius, color) {
				ctx.save();
				ctx.beginPath();
				ctx.setFillStyle(color);
				ctx.setStrokeStyle(color)
				ctx.setLineJoin('round'); //交点设置成圆角
				ctx.setLineWidth(radius);
				ctx.strokeRect(x + radius / 2, y + radius / 2, width - radius, height - radius);
				ctx.fillRect(x + radius, y + radius, width - radius * 2, height - radius * 2);
				ctx.stroke();
				ctx.closePath();
			},
			//获取图片
			getImageInfo(imgSrc) {
				return new Promise((resolve, reject) => {
					uni.getImageInfo({
						src: imgSrc,
						success: (image) => {
							resolve(image);
							console.log('获取图片成功', image)
						},
						fail: (err) => {
							reject(err);
							console.log('获取图片失败', err)
						}
					});
				});
			},
			//保存图片到相册
			saveImage() {
				uni.getSetting({ //获取用户的当前设置
					success: (res) => {
						if (res.authSetting['scope.writePhotosAlbum']) { //验证用户是否授权可以访问相册
							this.saveImageToPhotosAlbum();
						} else {
							uni.authorize({ //如果没有授权，向用户发起请求
								scope: 'scope.writePhotosAlbum',
								success: () => {
									this.saveImageToPhotosAlbum();
								},
								fail: () => {
									uni.showToast({
										title: "请打开保存相册权限，再点击保存相册分享",
										icon: "none",
										duration: 3000
									});
									setTimeout(() => {
										uni.openSetting({ //调起客户端小程序设置界面,让用户开启访问相册
											success: (res2) => {
												// console.log(res2.authSetting)
											}
										});
									}, 3000);
								}
							})
						}
					}
				})
			},
			saveImageToPhotosAlbum() {
				var that = this
				uni.canvasToTempFilePath({
					canvasId: 'my-canvas',
					quality: 1,
					complete: (res) => {
						console.log('保存到相册', res);
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success(res) {
								//wx.hideLoading()
								uni.showToast({
									title: '已保存到相册',
									icon: 'success',
									duration: 2000
								})
								setTimeout(() => {
									that.isShow = false
								}, 2000)
							},
							fail(res) {
								uni.showToast({
									title: '取消保存',
									icon: 'success',
									duration: 2000
								})
							}
						})
					}
				}, this);
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .4);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.save-btn {
			margin-top: 35rpx;
			color: #FFFFFF;
			background: linear-gradient(to right, #F2C31C, #FFDD00);
			padding: 15rpx 40rpx;
			border-radius: 50rpx;
		}
	}
</style>
