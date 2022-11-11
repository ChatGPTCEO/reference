<template>
	<block>
		<!-- gc_school/pages/article/detail.wxml -->
		<cu-custom bgColor="bgmains" :isBack="true">
			<view slot="content">详情</view>
		</cu-custom>

		<view class="header">
			<view class="article margin-lr">
				<view class="flex row">
					<image class="avatar" v-if="detail.is_anonymous==0"
						:src="detail.avatar ? detail.avatar : 'https://test.fkynet.net/wximage/avatar.jpg'"></image>
					<image class="avatar" v-else src="https://test.fkynet.net/wximage/avatar.jpg"></image>
					<view>
						<view class="nickname">
							{{ detail.is_anonymous==1?"匿名用户":detail.nickname }}
						</view>
						<view class="date ">{{ detail.createtime}}</view>
					</view>
					<block v-if="detail.is_anonymous==0 && detail.is_my==0">
						<view class="focus" @click="guanzhu(0)" v-if="detail.is_follow== 0">关注</view>
						<view class="focus" @click="guanzhu(1)" v-else>取关</view>
					</block>
					<image class="top" src="/static/icon/top.png" v-if="item.is_top==1" />
				</view>

				<view class="content margin-tb">
					<!-- <rich-text :nodes="detail.content" space=""></rich-text> -->
					<text space="nbsp" style="word-break: break-word;" :decode="true">{{detail.content}}</text>

					<!-- {{detail.content}} -->
				</view>
				<view class="imgs row  margin-bottom " v-if="detail.image.length>0">
					<block v-for="(image,index) in detail.image" :key="index">
						<image class="img" :class="'num'+ (detail.image.length<3?detail.image.length:3)" :src="image"
							mode="aspectFill" @tap="preview" :data-img="img" :data-list="detail.image" />
					</block>
				</view>
				<view v-if="detail.video" @click.stop="">
					<video :src="detail.video" style="width: 100%;" class="margin-bottom"></video>
				</view>
				<view class="footer row">
					<view class="class_name" v-if="detail.class_name">
						{{detail.class_name}}
					</view>
					<view class="view">
						<image style="height: 45rpx;" class="icon" src="/static/icon/views.png" mode="scaleToFill" />
						{{detail.views_num||0}}
					</view>
					<view class="comment">
						<image class="icon" src="/static/icon/comment.png" mode="scaleToFill" />
						{{detail.comments_num}}
					</view>
					<view class="love" :class="detail.is_fav?'cur':''" @tap="fav" :data-id="detail.article_id">
						<image class="icon" src="/static/icon/love.png" mode="scaleToFill" />
						{{detail.likes_num}}
					</view>
				</view>
			</view>
			<view class="row padding-lr margin-top" v-if="sysparment.is_open_reward">
				<view class="userList row justify-between" style="width: 100%;">

					<view class="" v-if="detail.reward_user_list.length>0">
						<view class="cu-avatar-group" v-if="detail.reward_user_list.length > 0">
							<block v-for="(item,index) in detail.reward_user_list" :key="index">
								<view class="cu-avatar round" v-if="index<5"
									:style="[{ backgroundImage:'url(' +item.avatar + ')' }]"></view>
							</block>
						</view>
						{{ detail.reward_user_list.length}}人已打赏
					</view>
					<view class="shang row" @click="show()">
						<image class="icon margin-right-sm" src="/static/icon/shang.png" mode="scaleToFill" />
						打赏
					</view>
				</view>

			</view>
		</view>

		<view class="cu-modal" :class="modalName?'show':''" @click="close">
			<view class="cu-dialog  padding-bottom" @click.stop>
				<view class="bg-img">
					<view class="cu-bar justify-end text-block">
						<view class="action">
							<text class="cuIcon-close " @click="close()"></text>
						</view>
					</view>
				</view>
				<view class="user_info">
					<image class="avatar" v-if="detail.is_anonymous==0"
					:src="detail.avatar ? detail.avatar : 'https://test.fkynet.net/wximage/avatar.jpg'"></image>
					<image class="avatar" v-else src="https://test.fkynet.net/wximage/avatar.jpg"></image>
					<view class="nickname">
						{{ detail.is_anonymous==1?"匿名用户":detail.nickname }}
					</view>
				</view>
				<view class="price_list row">
					<block v-for="(item,index) in detail.reward_list" :key="index">
						<view class="price" :class="price==item?'cur':''" v-if="item" @click="change(item)">￥{{item}}
						</view>
					</block>
				</view>
				<view class="pay margin-top" @click="shang()">打赏</view>
				<!-- <view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub  solid-left" @tap="hideModal">我知道了</view>
				</view> -->
			</view>
		</view>
		<view class="padding-lr" style="margin-bottom:100rpx;">
			<view class="comment_box">
				<view class="name margin-bottom" style="padding-left: 0">共有{{detail.comment.length}}条评论</view>
				<block v-for="(item, index) in comment_list" :key="index">
					<view class="comment_item_first">
						<view class="flex">
							<image :src="item.avatar"></image>
							<view style="flex-grow: 2" class="nickname">{{ item.nickname }}</view>
							<text @tap="del" :data-id="item.id" v-if="detail.user.u_id == item.u_id"
								class="cuIcon-delete"></text>
							<!-- <text class="cuIcon-appreciate"></text> -->
						</view>
						<view class="content" @tap="comment" :data-groupindex="index" data-index="-1">
							{{ item.contents }}
						</view>
						<view class="time" @tap="comment" :data-groupindex="index" data-index="-1">{{ item.createtime }}
						</view>
					</view>

					<!-- 子评论 -->
					<view class="">

						<block v-if="index1 < 1" v-for="(child, index1) in item.child" :key="index1">
							<view class="comment_item_child bg-write">
								<view class="flex justify-between">
									<image :src="child.avatar"></image>
									<view class="nickname" style="flex-grow: 2">{{ child.nickname }}</view>
									<text @tap="del" :data-id="child.id" v-if="detail.user.u_id == child.u_id"
										class="cuIcon-delete"></text>
								</view>
								<view class="content" @tap="comment" :data-groupindex="index" :data-index="index1">
									{{ child.contents }}
								</view>
								<view class="time" @tap="comment" :data-groupindex="index" :data-index="index1">
									{{ child.createtime }}
								</view>
							</view>
						</block>

						<block v-if="index1 >= 1 && item.block == true" v-for="(child, index1) in item.child"
							:key="index1">
							<view class="comment_item_child bg-write">
								<view class="flex justify-between">
									<image :src="child.avatar"></image>
									<view class="nickname" style="flex-grow: 2">{{ child.nickname }}</view>
									<text @tap="del" :data-id="child.id" v-if="detail.user.u_id == child.u_id"
										class="cuIcon-delete"></text>
								</view>
								<view class="content" @tap="comment" :data-groupindex="index" :data-index="index1">
									{{ child.contents }}
								</view>
								<view class="time" @tap="comment" :data-groupindex="index" :data-index="index1">
									{{ child.createtime }}
								</view>
							</view>
						</block>

						<view class="more bg-write" @tap="showmore" :data-index="index"
							v-if="item.child.length > 1 && item.block == false">
							查看全部
							<!-- <text class="cuIcon-unfold"></text> -->
						</view>
						<view class="more bg-write" @tap="showmore" :data-index="index"
							v-else-if="item.child.length > 1 && item.block == true">
							收起
							<!-- <text class="cuIcon-fold"></text> -->
						</view>
					</view>

					<!-- <view v-else></view> -->
				</block>

				<view class="nocontent" v-if="comment_list == 0">
					<image lazyLoad mode="aspectFit" src="/static/images/empty.png"></image>
					<view class="blank_text" style="text-align: center;">暂无留言哦~</view>
				</view>
			</view>

			<!-- 留言框 -->
			<view class="comment_input" :style="'bottom:' + bottom + 'px'">
				<button open-type="share" class="row padding-xs" style="width: 150rpx;flex-shrink: 0;">
					<image class="share_icon" src="/static/images/article/shares.png"></image>
					<text class="text-df margin-left-sm">分享</text>
				</button>
				<input @focus="inputFocus" @blur="inputBlur" :adjust-position="false" @input="inputFun" :value="input"
					:placeholder="placeholder" />
				<view class="submit" @tap="submit">发送</view>
			</view>
		</view>
	</block>
</template>

<script>
	// gc_school/pages/article/detail.js
	var app = getApp();
	export default {
		data() {
			return {
				detail: {
					is_anonymous: 0,
					avatar: false,
					nickname: '',
					time: '',
					content: '',
					media_type: '',
					video: '',
					img: [],
					share_num: '',
					id: '',
					is_fav: false,
					fav_num: '',

					user: {
						u_id: ''
					}
				},

				input: '',
				id: '',
				pid: 0,
				comment_list: [],
				placeholder: '请输入内容',
				bottom: 0,
				is_click: true,
				is_hide: '',
				img: '',

				child: {
					nickimg: '',
					nickname: '',
					id: '',
					uid: '',
					content: '',
					time: ''
				},
				modalName: false,
				price: 0,
				sysparment:{}
			};
		}
		/**
		 * 生命周期函数--监听页面加载
		 */
		,
		onLoad: function(options) {
			this.setData({
				id: options.id
			});
			this.getDetail(options.id);
			this.getSysparment()
		},
		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {},
		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {},
		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {},
		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {
			console.log(111);
			var self = this;
			if (self.detail.media_type == 2) {
				return {
					title: self.detail.content,
					query: '/gc_school/pages/article/detail?id=' + self.id,
					imageUrl: self.detail.image[0]
				};
			} else {
				return {
					title: self.detail.content,
					query: '/gc_school/pages/article/detail?id=' + self.id
				};
			}
				
		},
		onShareTimeline() {
			console.log(this);
			console.log(this.detail);

			if (this.detail.media_type == 'image') {
				return {
					title: this.detail.content,
					query: 'id=' + this.id,
					imageUrl: this.detail.img[0]
				};
			} else {
				return {
					title: this.detail.content,
					query: 'id=' + this.id
				};
			}
		},
		methods: {
			getSysparment() {
				const self = this;
				app.globalData.util.request({
					url: 'Setting/view',
					data: {},
					success(res) {
						self.sysparment = res.data.data.sys;
						console.log(res.data.data.sys);
					}
				})
			},
			async guanzhu(type) {
				await this.login().then((res)=>{
				    console.log("您已登陆！");
				})
				var self = this;
				app.globalData.util.request({
					url: 'UserFollow/follow',
					data: {
						u_id: this.detail.u_id
					},


					success(res) {
						if (res.data.status == 200) {
							if (type == 1) {
								self.tips.success("取关成功！");
							} else {
								self.tips.success("关注成功！");
							}
							self.getDetail(self.id);
						}
					}
				}, true);

			},
			show() {
				this.modalName = true;
			},
			close() {
				this.modalName = false
			},
			change(item) {
				this.price = item
			},
			inputFocus(e) {
				this.setData({
					bottom: e.detail.height
				});
			},

			inputBlur() {
				this.setData({
					bottom: 0
				});
			},

			getDetail(id) {
				var that = this;
				app.globalData.util.request({
					url: 'ZhArticles/view',
					method: 'GET',
					data: {
						s_id: uni.getStorageSync('schoolId'),
						article_id: id
					},

					success(res) {
						console.log(res.data.data);
						that.setData({
							detail: res.data.data,
							comment_list: res.data.data.comment
						});
					}
				}, true);
			},
			async shang() {
				var that = this;
				await this.login().then((res)=>{
				    console.log("您已登陆！");
				})
				app.globalData.util.request({
					url: 'ZhArticles/reward',
					method: 'POST',
					data: {
						s_id: uni.getStorageSync('schoolId'),
						price: this.price,
						a_id: this.id
					},
					success(res) {
						console.log(res.data.data);
						uni.requestPayment({
							timeStamp: res.data.data.paydata.timestamp.toString(),
							nonceStr: res.data.data.paydata.nonceStr,
							package: res.data.data.paydata.package,
							signType: 'MD5',
							paySign: res.data.data.paydata.paySign,
							success: function(resu) {
								that.tips.success("打赏成功！");
								that.modalName = false
								that.getDetail(that.id);
							},
							fail: function(res) {
								that.modalName = false

								console.log('fail');
							}
						});
					}
				}, true);
			},
			//文本框输入的值
			inputFun(e) {
				this.setData({
					input: e.detail.value.replace(/\s*/g, '')
				});
			},

			//给父级留言
			comment(e) {
				var groupindex = e.currentTarget.dataset.groupindex;
				var index = e.currentTarget.dataset.index;
				this.setData({
					input: ''
				});

				if (groupindex != '-1' && index != '-1') {
					this.setData({
						placeholder: '回复@' + this.comment_list[groupindex].child[index].nickname,
						pid: this.comment_list[groupindex].child[index].id
					});
				} else {
					if (groupindex != '-1' && index == '-1') {
						this.setData({
							placeholder: '回复@' + this.comment_list[groupindex].nickname,
							pid: this.comment_list[groupindex].id
						});
					}
				}

				this.setData({
					is_hide: !this.is_hide
				});
			},

			//提交留言
			async submit() {
				await this.login().then((res)=>{
				    console.log("您已登陆！");
				})

				if (this.input == '') {
					uni.showToast({
						title: '发布内容不能为空',
						icon: 'none'
					});
					return;
				}

				var self = this;

				if (self.is_click) {
					self.setData({
						is_click: false
					});
					app.globalData.util.request({
						url: 'ZhCommenes/add',
						data: {
							article_id: self.id,
							s_id: uni.getStorageSync('schoolId'),
							contents: self.input,
							p_id: self.pid
						},

						success(res) {
							setTimeout(function(){
								self.getDetail(self.id);
							},1000)
							console.log(res.data.data);
							self.setData({
								input: ''
							}); // self.setData({
							//   data:res.data.data,
							//   is_fav:res.data.data.is_fav,
							//   user_is_fav:res.data.data.user_is_fav,
							//   comment_list:res.data.data.comment
							// })
						},

						complete() {
							self.setData({
								is_click: true
							});
						}
					}, true);
				} else {
					uni.showToast({
						title: '请勿重复点击',
						icon: 'none'
					});
				}
			},

			//删除评论
			del(e) {
				var self = this;
				console.log(e.currentTarget.dataset.id);
				uni.showModal({
					content: '确认删除该评论吗？',

					success(res) {
						if (res.confirm) {
							app.globalData.util.request({
								url: 'ZhCommenes/delete',
								data: {
									type: 3,
									id: e.currentTarget.dataset.id,
									s_id: uni.getStorageSync('schoolId')
								},

								success(result) {
									if (result.data.status == 200) {
										uni.showToast({
											title: result.data.message
										});
										setTimeout(function() {
											self.getDetail(self.id);
										}, 1000);
									}
								}
							}, true);
						} else {
							console.log('取消删除');
						}
					}
				});
			},

			//收藏/取消收藏
			async fav(e) {
				console.log(e);
				var self = this;
				await this.login().then((res)=>{
				    console.log("您已登陆！");
				})
				app.globalData.util.request({
					url: 'ZhGiveThumbsUp/giveUp',
					data: {
						article_id: e.currentTarget.dataset.id,
						s_id: uni.getStorageSync('schoolId'),
					},

					success(res) {
						if (res.data.status == 200) {
							self.getDetail(self.id);
						}
					}
				}, true);
			},

			showmore(e) {
				console.log(e.currentTarget.dataset.index);
				var data = this.comment_list;
				data[e.currentTarget.dataset.index].block = !data[e.currentTarget.dataset.index].block;
				this.setData({
					comment_list: data
				});
			},

			//图片预览
			preview(e) {
				uni.previewImage({
					current: e.currentTarget.dataset.img,
					urls: e.currentTarget.dataset.list
				});
			}
		}
	};
</script>
<style>
	/* gc_school/pages/article/detail.wxss */
	page {
		background: white;
	}

	.bgmains {
		background: #fff;
	}

	.article_box .avatar {
		width: 85rpx;
		height: 85rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}

	.article_box .nickname {
		font-size: 28rpx;
		font-weight: bold;
	}

	.article_box .date {
		font-size: 24rpx;
		color: #999999;
	}

	.icon_item image {
		width: 35rpx;
		height: 35rpx;
	}

	.icon_item text {
		margin-left: 10rpx;
		color: #999999;
	}

	.item_img {
		width: 180rpx;
		height: 180rpx;
		margin-right: 20rpx;
	}

	/* 留言 */
	.comment_box {
		margin-top: 10px;
		/* background: #fff; */
		padding-bottom: 200rpx;
	}

	.comment_box .name {
		padding: 20rpx 30rpx 0;
	}

	.comment_item_first {
		/* border-top: 1px solid rgba(201, 201, 201, 0.6); */
		padding: 20rpx 30rpx 20rpx;
	}

	/* .comment_item_first  */
	.comment_item_first image {
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}

	.content {
		margin-left: 70rpx;
		font-size: 26rpx;
	}

	.time {
		color: #b7b7b7;
		font-size: 24rpx;
		margin-left: 70rpx;
		margin-top: 10rpx;
	}

	/* 子评论 */
	.comment_item_child {
		margin-left: 80rpx;
		/* border-top: 1px solid rgba(201, 201, 201, 0.6); */
		padding: 20rpx 30rpx 20rpx 0;
		background: #fff;
		border-radius: 20rpx;
	}

	.comment_item_child image {
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}

	/* 留言框 */
	.comment_input {
		height: 120rpx;
		position: fixed;
		left: 0rpx;
		bottom: 0rpx;
		background-color: white;
		z-index: 99;
		width: 100%;
		padding: 20rpx;
		border-top: 1rpx solid #eee;
		display: flex;
	}

	.comment_input input {
		background-color: #f2f2f2;
		width: 85%;
		height: 80rpx;
		border-radius: 10rpx;
		padding-left: 10rpx;
		font-size: 30rpx;
	}

	.comment_input .submit {
		padding: 20rpx 20rpx;
		background-color: #ff6666;
		color: white;
		margin-left: 20rpx;
		flex-shrink: 0;
		border-radius: 10rpx;
		/* #FED948 */
	}

	.top {
		display: flex;
		align-items: center;
	}

	.more {
		font-size: 28rpx;
		text-align: center;
		margin-bottom: 10rpx;
	}

	button {
		background: white;
		line-height: 30rpx;
	}

	button::after {
		outline: none;
		border: 0;
	}

	.button-hover {
		background: white;
	}
</style>

<style lang="scss">
	@import "./main.scss";

	.article {
		margin-top: 0px;

		.date {
			margin-left: 20rpx;
		}

		.content {
			margin-left: 0px;
		}

		.image {
			width: 100%;
		}
	}
	.cu-avatar{
		width: 60rpx;
		height: 60rpx;
	}
</style>
