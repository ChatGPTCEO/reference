 // 在页面中定义激励视频广告
var videoAd = null;
let rewarded = {
	//id就是传入的广告位id
	load(id,e) {
		if (uni.createRewardedVideoAd) {
			videoAd = uni.createRewardedVideoAd({
				adUnitId: id
			})
			videoAd.onLoad(() => {
				 console.log('激励视频 广告加载成功')
			})
			videoAd.onError((err) => {
				console.log('onError event emit')
			})
			videoAd.onClose((res) => {
				// 用户点击了【关闭广告】按钮
				if (res && res.isEnded) {
					// 正常播放结束，可以下发游戏奖励
					e()
					console.log('正常播放结束，可以下发游戏奖励')
                    videoAd.offClose()
				} else {
					uni.showToast({
						icon:'none',
						title:'看完才能获取奖励'
					})
					// 播放中途退出，不下发游戏奖励
					console.log('播放中途退出，不下发游戏奖励')
				}
			})
		}
	},
	show() {
		if (videoAd) {
			videoAd.show().catch(() => {
				// 失败重试
				videoAd.load()
					.then(() => videoAd.show())
					.catch(err => {
						console.log('激励视频 广告显示失败')
					})
			})
		}
	}
}
 
module.exports = {
	rewarded
};