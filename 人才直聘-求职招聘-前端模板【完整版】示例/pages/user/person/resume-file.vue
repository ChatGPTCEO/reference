<template>
	<view class="content">
		<view class="top">
			<text class="title">已上传{{ count }}份附件简历</text>
			<text class="note">最多上传5份，点击可预览简历，预览页面可进行转发和下载等！</text>
		</view>
		<uni-list v-if="list.length > 0">
			<uni-list-item
				:title="item.fileName + '.' + item.fileExt"
				:note="formatNote(item)"
				v-for="(item, index) in list"
				:key="index"
				@click.native="toDetail(item)"
				@longtap.native="longTimeClick(item)"
			>
				<template v-slot:footer>
					<text class="unbind yzb yzb-shanchu" :class="'a' + item.id" @click.stop="doRemove(item)"></text>
				</template>
			</uni-list-item>
		</uni-list>
		<m-empty-data v-else :coverUrl="no_order_1" noTxt="暂无记录"></m-empty-data>
		<view class="bottom" v-if="count < 5">
			<lsj-upload
				ref="lsjUpload"
				childId="upload"
				:option="option"
				:size="size"
				:debug="debug"
				:instantly="instantly"
				:formats="formats"
				@progress="onprogress"
				@change="onChange"
			>
				<button class="btn-upload">上传简历</button>
			</lsj-upload>

			<button class="btn-create" @click="createFile">制作简历</button>
		</view>
	</view>
</template>

<script>
import mEmptyData from '@/components/m-empty-data/m-empty-data.vue';
import config from '@/config/index.config.js';
export default {
	components: {},
	data() {
		return {
			no_order_1: this.$mAssetsPath.no_order_1,
			list: [],
			status: '暂无数据',
			query: {
				page: 1,
				limit: 10
			},
			count: 0,

			option: {},
			// height: '180rpx',
			size: 10,
			debug: true,
			// 选择文件后是否立即自动上传
			instantly: true,
			files: new Map(),
			formats: 'txt,png,jpg',
			accept: 'pdf,doc,docx'
		};
	},

	onReady() {
		const Token = uni.getStorageSync('token');
		this.option = {
			// 上传服务器地址，此地址需要替换为你的接口地址
			url: config.baseUrl + '/file/uploadResumeFile',
			// 上传附件的key
			name: 'file',
			// 根据你接口需求自定义请求头
			header: {
				token: Token
			},
			// 根据你接口需求自定义body参数
			formData: {
				// 'orderId': 1000
			}
		};
	},

	onLoad(options) {
		console.log(options);
	},

	onShow() {
		this.getList();
	},

	methods: {
		formatNote(item) {
			return item.fileSize + '  ' + item.createTime + '上传';
		},

		async getList() {
			this.status = '请求中';
			let res = await this.$apis.getResumeFileList();
			this.count = res.length;
			this.list = res;
		},

		addShield() {
			this.$mRouter.push({
				route: this.$mRoutesConfig.addShield,
				query: {
					type: this.query.type
				}
			});
		},

		toDetail(item) {
			console.log(item);
			wx.downloadFile({
				url: item.fileUrl,
				// url:'https://qingkonglan.oss-cn-hangzhou.aliyuncs.com/wp/20220528/05fa11c511d74c78a5e31addd18fdfd3.pdf',
				success: function(res) {
					console.log(res);
					const filePath = res.tempFilePath;
					console.log(filePath);
					wx.openDocument({
						filePath: filePath,
						showMenu:true,
						success: function(res) {
							console.log('打开文档成功');
						}
					});
				}
			});
		},

		longTimeClick(item) {
			uni.setClipboardData({
				data: item.fileUrl, //要被复制的内容
				success: () => {
					console.log("已复制");
					uni.showModal({
						title: '提示',
						content: '附件路径已复制，可浏览器下载？',
						success: res => {
							if (res.confirm) {
							}
						}
					});
				}
			});
		},

		doRemove(item) {
			uni.showModal({
				title: '提示',
				content: '确定要删除该附件吗？',
				success: res => {
					if (res.confirm) {
						this.$apis
							.deleteResumeFileById({
								id: item.id
							})
							.then(() => {
								uni.showToast({
									icon: 'none',
									title: '操作成功'
								});
								this.getList();
							});
					}
				}
			});
		},

		createFile() {
			this.$mRouter.push({
				route: this.$mRoutesConfig.personReume
			});
		},

		// 上传进度回调
		onprogress(item) {
			uni.showLoading();
			this.files.set(item.name, item);
			this.$forceUpdate();
			console.log(item.fileSize);
			console.log('打印对象', JSON.stringify(this.files.get(item.name)));
			// 微信小程序Map对象for循环不显示，所以转成普通数组，不要问为什么，我也不知道
			// #ifdef MP-WEIXIN
			this.wxFiles = [...this.files.values()];
			// #endif
			// 演示判断是否所有文件均已上传成功
			let isAll = [...this.files.values()].find(item => item.type !== 'success');
			if (!isAll) {
				console.log('已全部上传完毕');
			} else {
				console.log(isAll.name + '待上传');
			}
			if (item.progress == 100) {
				uni.hideLoading();
				this.getList();
			}
		},
		// 文件选择回调
		onChange(files) {
			this.files = files;
			this.$forceUpdate();
			// 微信小程序Map对象for循环不显示，所以转成普通数组，不要问为什么，我也不知道
			// #ifdef MP-WEIXIN
			this.wxFiles = [...this.files.values()];
			// #endif
		},
		// 手动上传
		upload() {
			// name=指定文件名，不指定则上传所有type等于waiting和fail的文件
			this.$refs.lsjUpload.upload();
		},
		// 移除某个文件
		clear(name) {
			// name=指定文件名，不传name默认移除所有文件
			// this.$refs.lsjUpload.clear(name);
		}
	}
};
</script>

<style lang="scss">

.top {
	padding: 20upx 30upx;
	background-color: $uni-bg-color-grey;
	display: flex;
	flex-direction: column;
	.title {
		font-size: $uni-font-size-lg;
		font-weight: bold;
	}
	.note {
		font-size: $uni-font-size-sm;
		color: #666;
	}
}
.unbind {
	color: $font-color-red;
	font-size: 34upx;
	padding: 10upx 10upx 10upx 30upx;
}
.bottom {
	position: fixed;
	bottom: 30upx;
	width: 100%;
	.btn-upload {
		width: 90%;
		background-color: $main-color;
		color: $font-color-white;
	}
	.btn-create {
		margin-top: 30upx;
		width: 90%;
	}
}
</style>
