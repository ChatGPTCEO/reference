<template>
	<view class="main-container">
		<indexHeader backgroundColor="#5af" boderBottom="none" :logoImg="logoImg"></indexHeader>
		<loading v-if="loading"></loading>
		<view v-if="!loading">
			<carousel v-if="bannerList.length > 0" :img-list="bannerList" url-key="url"
				@selected="selectedBanner"></carousel>
			<divisionLine></divisionLine>
			<u-grid :border="false" col="4">
				<u-grid-item v-for="(baseListItem,baseListIndex) in baseList" :key="baseListIndex"
					@click="areaCLick(baseListItem)">
					<view class="grid-item">
						<image :src="baseListItem.imgUrl" lazy-load></image>
						<text class="grid-text">{{baseListItem.title}}</text>
					</view>
				</u-grid-item>
			</u-grid>
			<divisionLine></divisionLine>
			<anchorLine leftText="热门专题" rightText="查看全部" @moreClick="articleMore" leftEnglish="subject"></anchorLine>
			<swiper :display-multiple-items="2" :autoplay="true">
				<swiper-item v-for="(item,index) in subjectList" :key="index">
					<view class="topic grid" @click="toSubjectList(item)">
						<view class="topic-box">
							<view class="topic-main">
								<image :src="item.imgUrl"></image>
								<view class="topic-text">{{item.name}}</view>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
			<divisionLine></divisionLine>
			<anchorLine leftText="推荐文章" rightText="阅读更多" @moreClick="articleMore" leftEnglish="article"></anchorLine>
			<blogArticle v-for="(item,index) in blogs" :key="index" :blogItem="item"></blogArticle>
			<divisionLine></divisionLine>
			<anchorLine leftText="优质项目" rightText="查看全部" @moreClick="sysMore" leftEnglish="project"></anchorLine>
			<view style="margin-top: 15rpx;"></view>
			<sysItem v-for="(item,index) in projects" :key="index" :projectItem="item"></sysItem>
		</view>
	</view>
</template>

<script>
	import indexApi from '@/api/indexApi.js'
	import sysConfigApi from "@/api/sysConfigApi.js"
	import sysConstant from '@/utils/sys-constant.js'
	export default {
		data() {
			return {
				loading: false,
				keyword: "",
				bannerList: [],
				baseList: [{
						type: 1,
						title: '软件中心',
						imgUrl: 'https://code-grade-server-prd.oss-cn-shenzhen.aliyuncs.com/smart-config-img/software.png'
					}, {
						type: 2,
						title: '编码帮助',
						imgUrl: 'https://code-grade-server-prd.oss-cn-shenzhen.aliyuncs.com/smart-config-img/dingzhi.png'
					}, {
						type: 3,
						title: '联系我们',
						imgUrl: 'https://code-grade-server-prd.oss-cn-shenzhen.aliyuncs.com/smart-config-img/tel.png'
					},
					{
						type: 4,
						title: '我要留言',
						imgUrl: 'https://code-grade-server-prd.oss-cn-shenzhen.aliyuncs.com/smart-config-img/message.png'
					}
				],
				blogs: [],
				projects: [],
				subjectList: [],
				logoImg: []
			}
		},
		onLoad() {
			this.getLogo()
			this.initData()
		},
		methods: {
			async getLogo() {
				let res = await sysConfigApi.getConfigByName(sysConstant.CONFIG_NAME.LOGO_IMG)
				this.logoImg = res.data
			},
			toSubjectList(item) {
				uni.setStorageSync("subjectName", item.name);
				uni.navigateTo({
					url: '/packageA/pages/subjectBlogList/subjectBlogList?type=0&subjectId=' + item.mid
				})
			},
			articleMore() {
				uni.navigateTo({
					url: '/pages/blogList/blogList'
				})
			},
			sysMore() {
				uni.navigateTo({
					url: '/pages/sysList/sysList'
				})
			},
			areaCLick(item) {
				let url;
				if (item.type == 2) {
					url = '/pages/addDemand/addDemand'
				}
				if (item.type == 1) {
					url = '/packageA/pages/software/software'
				}
				if (item.type == 3) {
					url = '/packageA/pages/aboutMe/aboutMe'
				}
				if (item.type == 4) {
					url = '/packageA/pages/message/message'
				}
				uni.navigateTo({
					url: url
				})
			},
			selectedBanner(item, index) {
				uni.navigateTo({
					url: '/pages/blogDetail/blogDetail?blogId=' + item.id
				})
			},
			async initData() {
				this.loading = true
				let bannerRes = await indexApi.getBanner()
				if (bannerRes.data && bannerRes.data.length > 0) {
					let banner = bannerRes.data
					let arr = []
					for (let i in banner) {
						let obj = {
							url: banner[i].blogImg,
							title: banner[i].blogName,
							id: banner[i].blogId
						}
						arr.push(obj)
					}
					this.bannerList = arr
				}
				let subjectRes = await indexApi.getSubject()
				if (subjectRes.data && subjectRes.data.length > 0) {
					let subject = subjectRes.data
					let arr = []
					for (let i in subject) {
						let obj = {
							"mid": subject[i].subjectId,
							"name": "#" + subject[i].subjectName + "#",
							"imgUrl": subject[i].subjectImg
						}
						arr.push(obj)
					}
					this.subjectList = arr
				}
				let blogsRes = await indexApi.getBlogs()
				if (blogsRes.data && blogsRes.data.length > 0) {
					this.blogs = blogsRes.data
				}
				let projectRes = await indexApi.getProject()
				if (projectRes.data && projectRes.data.length > 0) {
					this.projects = projectRes.data
				}
				this.loading = false
			}
		}
	}
</script>

<style>
	.main-container {
		position: relative;
	}


	.topic {
		height: 280rpx;
		padding: 0rpx 15rpx;
		width: 1400rpx;
	}

	.grid {
		display: flex;
		flex-wrap: wrap;
	}


	.topic-box {
		width: 330rpx;
		padding: 30rpx 10rpx;
	}

	.topic-main {
		border-radius: 15rpx;
		overflow: hidden;
		height: 220rpx;
		position: relative;
	}

	.topic-main image {
		width: 100%;
		height: 220rpx;
		transition: 0.3s all;
		-webkit-transition: 0.3s all;
		-moz-transition: 0.3s all;
		-o-transition: 0.3s all;
		-ms-transition: 0.3s all;
	}

	.topic-text {
		position: absolute;
		width: 100%;
		height: 220rpx;
		text-align: center;
		line-height: 220rpx;
		top: 0px;
		font-size: 30rpx;
		left: 0px;
		font-weight: bold;
		z-index: 10;
		background-color: rgba(0, 0, 0, 0.3);
		color: #fff;
	}

	.grid-item {
		display: flex;
		flex-direction: column;
		align-items: center;

		padding: 30rpx 0rpx;
	}

	.grid-item image {
		height: 80rpx;
		width: 80rpx;
	}

	.grid-text {
		color: #333;
		font-size: 26rpx;
	}
</style>z
