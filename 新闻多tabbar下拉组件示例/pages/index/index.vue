<template>
	<view>
		<uni-tablist :Refresh="Refresh" :tablist="tablist" :tabindex="tabindex" :loading="loading" @refresh="refresh"
			@lower="lower" @changetab="changetab">
			<template slot="tablist">
				<view class="tabbox">
					<scroll-view scroll-x="true" style="height: 118upx;position: relative;">
						<view style="display: flex;justify-content: space-between; position: absolute;left: 0upx; top: 0upx;min-width: 100%;"
							:style="{width: tablist.length*80+'px'}">
							<view v-for="(tab,i) in tablist" :key="tab.classifyId" class="tabtext"
								:class="{'actvtab': tabindex == i}" @tap="tabindex = i">
								{{tab.classifyName}}
							</view>
						</view>
					</scroll-view>
				</view>
			</template>
			<template slot="list">
				<view v-for="(item,idx) in arrlist" :key="idx" style="display: flex;justify-content: space-between;padding-bottom: 40upx"
					@tap="godetail(item)">
					<image :src="item.coverImage||'../../static/img/index/list.png'" mode="aspectFill"
						style="width: 270upx;height: 206upx;border-radius: 10upx; margin-right: 26upx;"></image>
					<view class="flex-sp-ct flex1" style="flex-direction: column;">
						<view class="textsize-16">
							{{item.courseName}}
						</view>
						<view class="flex1"></view>
						<view style="display: flex;justify-content: space-between;margin-bottom: 10upx;">
							<view class="textsize-12" style="color: #98999A;">{{item.lecturer}}</view>
							<view class="textsize-12 cl-999999 marginl-25">
								播放量{{cknumber(item.learnedAmount||0)}}
							</view>
						</view>
					</view>
				</view>
			</template>
		</uni-tablist>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				loadlist: true,
				loading: true,
				pageNum: 1,
				tabindex: 0,
				status: '',
				Refresh: false,
				tablist: [{
					"classifyId": 1,
					"classifyName": "亲子关系"
				}, {
					"classifyId": 2,
					"classifyName": "亲密关系",
				}, {
					"classifyId": 3,
					"classifyName": "养老",
				}],
				list: [],
				pageload: [],
				arrlist: [
					{
						"courseName": "王小骞亲子教育系列",
						"lecturer": "王小骞",
						"coverImage": "https://huameihome.oss-cn-beijing.aliyuncs.com/course/2106/1b3105d9-6757-49f2-a96a-46e86d56feb6.jpg",
						"classifyId": null,
						"learnedAmount": 1392
					}, {
						"courseName": "大嘴老师亲子教育序列",
						"lecturer": "大嘴老师",
						"coverImage": "https://huameihome.oss-cn-beijing.aliyuncs.com/course/2106/1ba72866-062c-4d9c-a3d2-22dfaecdcecb.jpg",
						"classifyId": null,
						"learnedAmount": 1603
					}, {
						"courseName": "让我们轻松做父母8堂必修课",
						"lecturer": "张健",
						"coverImage": "https://huameihome.oss-cn-beijing.aliyuncs.com/course/2106/768d9087-3c52-4c8f-b39c-689ecb11b60f.jpg",
						"classifyId": null,
						"learnedAmount": 34
					}, {
						"courseName": "少儿直播课",
						"lecturer": "张文、赵腾、潘笑楠",
						"coverImage": "https://huameihome.oss-cn-beijing.aliyuncs.com/course/2106/4869339d-47d0-4680-9a2e-746c6f430ce6.jpg",
						"classifyId": null,
						"learnedAmount": 227
					}, {
						"courseName": "家长应该这样跟孩子沟通最有效",
						"lecturer": "毛樾漫",
						"coverImage": "https://huameihome.oss-cn-beijing.aliyuncs.com/course/2106/26efb353-b298-41ce-8384-f9cbafc7990c.jpg",
						"classifyId": null,
						"learnedAmount": 52
					}, {
						"courseName": "针对青少年心理问题的家庭治疗技巧",
						"lecturer": "龙迪教授",
						"coverImage": "https://huameihome.oss-cn-beijing.aliyuncs.com/course/2106/152db2b1-b8df-4907-bc4f-f00097824f0a.jpg",
						"classifyId": null,
						"learnedAmount": 1701
					}, {
						"courseName": "抗挫折训练课",
						"lecturer": "张怡筠",
						"coverImage": "https://huameihome.oss-cn-beijing.aliyuncs.com/course/2106/358d9eb3-2fcc-4c5c-8afe-8d2590c30faf.jpg",
						"classifyId": null,
						"learnedAmount": 671,
					}, {
						"courseName": "常见的少儿心理异常",
						"lecturer": "邵春红",
						"coverImage": "https://huameihome.oss-cn-beijing.aliyuncs.com/course/2106/632ed788-20bc-452f-a38a-8f2e0d292a93.jpg",
						"classifyId": null,
						"learnedAmount": 458
					}, {
						"courseName": "如何帮助孩子走出游戏成瘾",
						"lecturer": "赵晓佳",
						"coverImage": "https://huameihome.oss-cn-beijing.aliyuncs.com/course/2106/bd56acb2-67bf-407f-b9fb-96546d7a83c3.jpg",
						"classifyId": null,
						"learnedAmount": 391
					}, {
						"courseName": "儿童注意力训练",
						"lecturer": "宋世灵",
						"coverImage": "https://huameihome.oss-cn-beijing.aliyuncs.com/course/2106/3d58f16d-42c5-4d46-8001-f04ab4eaf98f.jpg",
						"classifyId": null,
						"learnedAmount": 322
					}
				]
			}
		},
		created() {
			
		},

		methods: {
			cknumber(num) {
				if (num > 9999) {
					return (num / 10000).toFixed(2) + '万'
				} else {
					return num;
				}
			},
			refresh() {
				this.Refresh = true;
				this.getlist();
				console.log('刷新')
			},
			lower() {
				if (this.pageload[this.tabindex].loading) {
					this.pageload[this.tabindex].pageNum++;
					this.getlist();
				} else {
					uni.showToast({
						icon: 'none',
						title: '没有更多了...'
					})
				}
			},

			changetab(e) {
				console.log(e)
				this.tabindex = e;
				// this.getlist();
			}
		}
	}
</script>

<style>
	page {
		box-sizing: border-box;
	}

	.tabbox {
		padding: 0rpx 32rpx;
		position: relative;
		z-index: 99;
		width: 100%;
		z-index: 10;
		background-color: #FFFFFF;
		line-height: 118upx;
		border-top: 2upx solid #EBEBEB;
	}

	.tabtext {
		padding: 0upx 20upx;
		text-align: center;
		font-size: 32rpx;
		color: #98999A;
	}

	.actvtab {
		font-weight: bold;
		color: #353735;
		position: relative;
	}

	.actvtab::before {
		content: '';
		position: absolute;
		z-index: 1;
		bottom: 30upx;
		left: 50%;
		transform: translateX(-50%);
		width: 40upx;
		height: 6upx;
		border-radius: 4upx;
		background: #4E4E4E;
	}

	.list {
		width: 100%;
		height: 100%;
	}
</style>
