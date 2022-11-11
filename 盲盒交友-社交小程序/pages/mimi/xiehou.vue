<template>
	<view style="overflow: hidden;height: 100vh;">

		<view class="my-box">
			<vastwu-imgbox :list="list" :offsetX="16" :offsetY="-16" @slideclick="slideclick" :dur="5000">
			</vastwu-imgbox>
		</view>
		<view class="content">
		    <ad-rewarded-video adpid="1260510717" :loadnext="true" v-slot:default="{loading, error}" @load="onadload" @close="onadclose" @error="onaderror">
		      <button :disabled="loading" :loading="loading" class="tongx">看视频更新邂逅数据~</button>
		      <view v-if="error">{{error}}</view>
		    </ad-rewarded-video>
		  </view>
	</view>

</template>

<script>
	import vastwuImgbox from '@/components/vastwu-imgbox.vue'
	export default {
		data() {
			return {
				list: [{},{},{},{},{},{},{},{},{},{}]
			}
		},
		components: {
			vastwuImgbox
		},
		onLoad() {
			const xielist = uni.getStorageSync('xielist');
			if (xielist) {
				this.list=xielist;
			}else{
				this.getlist()
			}
			
		},
		methods: {
			getlist() {
				uni.$u.http.post('Encounter/xcxlist', {})
					.then(res => {
						this.list = res.data
						uni.setStorageSync('xielist', res.data);
						// console.log(res.data)
					})
			},
			slideclick(id) {
				console.log(id)
				uni.$u.route({
					url:'/pages/user/userData?id='+id
				})
			},
			onadload(e) {
			      console.log('广告数据加载成功');
			    },
			    onadclose(e) {
			      const detail = e.detail
			      // 用户点击了【关闭广告】按钮
			      if (detail && detail.isEnded) {
			        // 正常播放结束
			        console.log("onadclose " + detail.isEnded);
					this.getlist()
			      } else {
			        // 播放中途退出
			        console.log("onadclose " + detail.isEnded);
			      }
			    },
			    onaderror(e) {
			      // 广告加载失败
			      console.log("onaderror: ", e.detail);
			    }
		}
	}
</script>

<style lang="scss" scoped>
	.my-box {
		position: relative;
		margin: 0 auto;
		margin-top: 20vw;
		width: 80%;
	}

	.lookmore {
		position: absolute;
		width: 136rpx;
		height: 53rpx;
		bottom: 95rpx;
		left: 38%;
		z-index: 110;
	}

	.ys {
		box-sizing: border-box;
		border-radius: 10rpx;
		box-sizing: border-box;
		margin-bottom: 20rpx;
		box-shadow: 0px 0px 28rpx 1rpx rgba(78, 101, 153, 0.14);
		padding: 20rpx;
	}

	.zhuxs {
		font-size: 28rpx;
		color: #3e3e3e;

		text {
			font-size: 34rpx;
			color: #F56c6c !important;
		}
	}
	button{
		position: fixed;
		bottom: 5vh;
		right:10vw;
		left: 10vw;
		text-align: center;
		background-color: #0087ca; 
		 // padding: 20rpx;
		 // box-shadow: 3rpx 8rpx 5rpx #0087ca;
		 color: #fff;
		 border-radius: 10rpx;
		/* padding-bottom: 40rpx; */
		
	}
</style>
