<template>
	<block>
		<!-- <scroll-view class="container" > -->
		<cu-custom bgColor="bgmain" :isBack="true">
			<view slot="content" style="color: #000000;">商品详情</view>
		</cu-custom>
		<view class="first clear">
			<view class="left">
				<image class="avatar" :src="data.user.avatar"></image>
				<view class="nickname">{{data.user.nickname}}</view>
				<!--   <view class="name">{{ data.name }}</view>
		        <view class="price">￥{{ data.pay }}</view>
		        <text class="oldprice">￥{{ data.price }}</text> -->
			</view>
			<view class="right">
				<view class="create_time">{{data.create_time}}</view>
				<!-- <text class="cuIcon-likefill"></text> -->
				<!-- <text class="cuIcon-forwardfill"></text> -->
				<!-- <image bindtap="fav" data-type="2" data-id="{{data.uid}}" src="{{user_is_fav==true?'/images/follow2_active.png':'/images/follow2.png'}}"></image> -->
				<!-- <image src="/images/share.png"></image> -->
				<!-- <button class="share" open-type="share"><image src="/static/images/share.png"></image></button> -->
			</view>
		</view>
		<view>
			<swiper :autoplay="autoplay" class="picture" :duration="duration" :indicatorDots="indicatorDots"
				:interval="interval">
				<swiper-item v-for="(item, index) in rotation" :key="index">
					<image class="slide-image" :data-index="index" mode="aspectFill" :src="item"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="first clear">
			<view class="price">{{data.title}}</view>
		</view>
		<view class="first clear">
			<view class="left" style="width: 80%;">
				<view class="name">{{ data.name }}</view>
				<view class="price">￥{{ data.pay }}</view>
				<text class="oldprice">原价￥{{ data.price }}</text>
			</view>
			<view class="right" style="width: 20%;">
				<!-- <text class="cuIcon-likefill"></text> -->
				<!-- <text class="cuIcon-forwardfill"></text> -->
				<!-- <image bindtap="fav" data-type="2" data-id="{{data.uid}}" src="{{user_is_fav==true?'/images/follow2_active.png':'/images/follow2.png'}}"></image> -->
				<!-- <image src="/images/share.png"></image> -->
				<!-- <button class="share" open-type="share"><image src="/static/images/share.png"></image></button> -->
				<view class="share xin">{{data.degree}}</view>
			</view>

		</view>
		<view class="first clear" style="border-bottom-right-radius: 45rpx;border-bottom-left-radius:45rpx">
			<view class="details">{{data.details}}</view>
		</view>
		<!-- <view class="pj_box">
            <view class="detail_card detail_border">
                <view class="detail_title">发布时间</view>
                <view class="detail_content">{{ data.create_time  }}</view>
            </view>
            <view class="detail_card detail_border">
                <view class="detail_title">新旧程度</view>
                <view class="detail_content">{{ data.degree }}</view>
            </view>
            <view class="detail_card detail_border">
                <view class="detail_title">详细描述</view>
                <view class="detail_content_d">{{ data.details }}</view>
            </view>
        </view> -->

		<!-- 留言 -->
		<view class="comment_box" style="border-top-left-radius:45rpx;border-top-right-radius:45rpx;">
			<view class="name">全部留言</view>
			<block v-for="(item, index) in comment_list" :key="index">
				<view class="comment_item_first">
					<view class="top">
						<image :src="item.avatar"></image>
						<view class="nickname">{{ item.nickname }}
							<view class="minute">{{ item.create_time }}</view>
						</view>
						<text @tap="del" :data-id="item.id" v-if="item.u_id == uids" class="cuIcon-delete"></text>
						<!-- <text class="cuIcon-appreciate"></text> -->
					</view>
					<view class="content" @tap="comment" :data-groupindex="index" data-index="-1">{{ item.details }}
					</view>
					<!-- <view class="time" @tap="comment" :data-groupindex="index" data-index="-1">{{ item.create_time }}</view> -->
				</view>

				<!-- 子评论 -->

				<block v-if="index1 < 1" v-for="(child, index1) in item.child" :key="index1">
					<view class="comment_item_child">
						<view class="top">
							<image :src="child.avatar"></image>
							<view class="nickname">{{ child.nickname }}
								<view class="minute">{{ child.create_time }}</view>
							</view>
							<text @tap="del" :data-id="child.id" v-if="child.u_id == uids" class="cuIcon-delete"></text>
						</view>

						<view class="content" @tap="comment" :data-groupindex="index" :data-index="index1">
							回复@{{ item.nickname }} ：{{ child.details }} </view>
						<!-- <view class="time" @tap="comment" :data-groupindex="index" :data-index="index1">{{ child.create_time }}</view> -->
					</view>
				</block>

				<block v-if="index1 >= 1 && item.block == true" v-for="(child, index1) in item.child" :key="index1">
					<view class="comment_item_child">
						<view class="top">
							<image :src="child.avatar"></image>
							<view class="nickname">{{ child.nickname }}
								<view class="minute">{{ child.create_time }}</view>
							</view>
							<text @tap="del" :data-id="child.id" v-if="child.u_id == uids" class="cuIcon-delete"></text>
						</view>
						<view class="content" @tap="comment" :data-groupindex="index" :data-index="index1">
							回复@{{ item.nickname }} ：{{ child.details }} </view>
						<!-- <view class="time" @tap="comment" :data-groupindex="index" :data-index="index1">{{ child.create_time }}</view> -->
					</view>
				</block>

				<view class="more" @tap="showmore" :data-index="index"
					v-if="item.child.length > 1 && item.block == false">
					展开
					<text class="cuIcon-unfold"></text>
				</view>

				<view class="more" @tap="showmore" :data-index="index"
					v-else-if="item.child.length > 1 && item.block == true">
					收起
					<text class="cuIcon-fold"></text>
				</view>

				<view v-else></view>
			</block>

			<view class="nocontent" v-if="comment_list == 0">
				<image lazyLoad mode="aspectFit" src="/static/images/empty.png"></image>
				<view class="blank_text">暂无留言哦~</view>
			</view>
		</view>

		<!-- 留言框 -->
		<view class="comment_input" v-if="!is_hide" :style="'bottom:' + bottom + 'px'">
			<input @input="inputFun" @focus="inputFocus" @blur="inputBlur" :adjust-position="false" :value="input"
				:placeholder="placeholder" />
			<view class="submit" @click="submit(data)">发送</view>
		</view>

		<!-- </scroll-view> -->
		<view class="bottom">
			<view class="bottom_left">
				<view class="t_card" @tap="comment" data-groupindex="-1" data-index="-1">
					<!-- <text class="cuIcon-message cuIcon"></text> -->
					<image class="di-image" src="../../../static/images/pinglun.png"
						style="margin-top: 16rpx;width: 45rpx;height: 45rpx;"></image>
					<text>留言</text>
				</view>
				<view class="t_card" @click="fav(data.m_id)" data-type="1" :data-id="data.m_id">
					<!-- <text :class="'cuIcon-like cuIcon ' + (is_fav == true ? 'fav_active' : '')"></text> -->
					<image class="di-image" v-if="is_fav == 0" src="../../../static/images/xihuan.png"
						style="margin-top: 16rpx;width: 45rpx;height: 45rpx;"></image>
					<image class="di-image" v-else src="../../../static/images/xihuans.png"
						style="margin-top: 16rpx;width: 45rpx;height: 45rpx;"></image>
					<text>喜欢</text>
				</view>
				<view class="t_card" data-groupindex="-1" data-index="-1">
					<!-- <text class="cuIcon-message cuIcon"></text> -->
					<button open-type="share" style="background-color: white;height: 70rpx;">
						<image class="di-image" src="../../../static/images/fenxiang.png"
							style="margin-top: -28rpx;width: 45rpx;height: 40rpx;padding: 0;"></image>

					</button>
					<text style="margin-left: 20rpx;">分享</text>
				</view>
			</view>
			<view class="add-cart sub f16" v-if="data.u_id != uids">
				<view @tap="makecall" class="add-cart-btn contact" :data-phone="data.phone" :disabled="selfflag">联系卖家
				</view>
				<view @tap="toBuy" style="background: #FF4C4D ;" class="add-cart-btn buy" :data-phone="data.phone"
					:disabled="selfflag">立即购买</view>
			</view>
		</view>
	</block>
</template>

<script>
	// gc_school/pages/seconddetail/index.js
	var app = getApp();
	export default {
		data() {
			return {
				data: {
					img: [],
					name: '',
					price: '',
					oldprice: '',
					addtime: '',
					degree: '',
					content: '',

					user: {
						u_id: ''
					},

					id: '',
					is_watch: false,
					phone: ''
				},

				indicatorDots: true,
				is_fav: false,
				user_is_fav: false,
				comment_list: [],
				comment_show: false,
				is_hide: true,
				placeholder: '想说点什么',
				input: '',
				pid: 0,
				data: 0,
				is_click: true,
				bottom: '',
				uids: 0,
				autoplay: 0,
				duration: '',
				interval: '',

				child: {
					nickimg: '',
					nickname: '',
					id: '',
					uid: '',
					content: '',
					time: ''
				},

				selfflag: '',
				rotation: ''
			};
		}
		/**
		 * 生命周期函数--监听页面加载
		 */
		,
		onLoad: function(options) {
			console.log(options.id, '---111---');
			this.getDetail(options.id);
			this.stay(options.id);
			if (uni.getStorageSync('token')) {
				this.getUids();
				this.footprints(options.id);
				this.views(options.id);
			}

		},
		onPageScroll() {
			if (this.is_hide == false) {
				console.log('楚平路');
				this.setData({
					is_hide: true
				});
			}
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
			return {
				title: this.data.name,
				query: '/gc_school/pages/secondhand/detail?id=' + this.data.id,
				imageUrl: this.data.img[0]
			};
		},
		onShareTimeline() {
			console.log(this.data);
			return {
				title: this.data.name,
				query: 'id=' + this.data.id,
				imageUrl: this.data.img[0]
			};
		},
		methods: {
			views(id) {
				var self = this;
				// if(self.is_fav == false){
				app.globalData.util.request({
					url: 'Dmhgoodsstay/view',
					data: {
						m_id: id,
						s_id: uni.getStorageSync('schoolId'),
					},
					success(res) {
						console.log(res, '---222---')
						if (res.data.status == 200) {
							if (res.data.data.is_fav == 1) {
								self.is_fav = true;
							}
					 }
				 }
				}, true);
				// }else{
				// 	app.globalData.util.request({
				// 	    url: 'Dmhgoodsstay/delete',
				// 	    data: {
				// 	        ids: id,
				// 			s_id: uni.getStorageSync('schoolId'),
				// 			wxapp_id: self.data.wxapp_id
				// 	    },

				// 	    success(res) {
				// 	       if(res.data.status == 200){
				// 			   self.is_fav = false;
				// 		   }
				// 	    }
				// 	},true);
				// }

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
			stay(id) {
				var self = this;
				app.globalData.util.request({
					url: 'Dmhmarketcategorystay/index',
					data: {
						m_id: id,
						s_id: uni.getStorageSync('schoolId'),
						wxapp_id: self.data.wxapp_id
					},

					success(res) {
						console.log(res.data.data);
						self.setData({
							comment_list: res.data.data.list,
						});
						self.footprint(id);
					}
				}, true);
			},
			footprints(id) {
		 	var self = this;
				app.globalData.util.request({
		 		url: 'Dmhfootprint/add',
					data: {
						m_id: id,
						s_id: uni.getStorageSync('schoolId')
					},

					success(res) {

					}
				}, true);
			},
			getUids() {
				var self = this;
				app.globalData.util.request({
			  url: 'Dmhmarketgoods/uids',
					data: {},

					success(res) {
			 		console.log(res.data.data);
			  	self.setData({
							uids: res.data.data.uids,
							// rotation:JSON.parse(res.data.data.rotation),
						});
					}
				}, true);
			},
			getDetail(id) {
				var self = this;
				app.globalData.util.request({
					url: 'Dmhmarketgoods/view',
					data: {
						m_id: id,
					},

					success(res) {
						console.log(res.data.data);
						self.setData({
							data: res.data.data,
							is_fav: res.data.data.is_fav,
							user_is_fav: res.data.data.user_is_fav,
							comment_list: res.data.data.comment,
							rotation: res.data.data.rotation,
							// rotation:JSON.parse(res.data.data.rotation),
						});
						self.footprint(id);
					}
				});
			},

			//留言按钮
			comment(e) {
				var groupindex = e.currentTarget.dataset.groupindex;
				var index = e.currentTarget.dataset.index;
				this.setData({
					input: ''
				});

				if (groupindex != '-1' && index != '-1') {
					console.log(111111)
					this.setData({
						placeholder: '回复@' + this.comment_list[groupindex].child[index].nickname,
						pid: this.comment_list[groupindex].child[index].id
					});
				} else {
					console.log(222222)
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

			del(e) {
				var self = this;
				console.log(e.currentTarget.dataset.id);
				uni.showModal({
					content: '确认删除该评论吗？',

					success(res) {
						if (res.confirm) {
							app.globalData.util.request({
								url: 'Dmhmarketcategorystay/delete',
								data: {
									ids: e.currentTarget.dataset.id,
								},

								success(result) {
									if (result.data.status == 200) {
										uni.showToast({
											title: result.data.message
										});
										setTimeout(function() {
											self.stay(self.data.m_id)
										}, 500);
									}
								}
							});
						} else {
							console.log('取消删除');
						}
					}
				});
			},

			//文本框输入的值
			inputFun(e) {
				this.setData({
					input: e.detail.value.replace(/\s*/g, '')
				});
			},

			//提交留言
			submit(e) {
				if (!uni.getStorageSync('userinfo')) {
					uni.showToast({
						title: '请登录后发布',
						icon: 'none'
					});
					setTimeout(function() {
						uni.navigateTo({
							url: '/gc_school/pages/user/index'
						});
					}, 1000);
					return;
				}

				if (this.input == '') {
					uni.showToast({
						title: '发布内容不能为空',
						icon: 'none'
					});
					return;
				}

				if (this.is_click) {
					var self = this;
					self.setData({
						is_click: false
					});
					app.globalData.util.request({
						url: 'Dmhmarketcategorystay/add',
						data: {
							m_id: self.data.m_id,
							s_id: self.data.s_id,
							wxapp_id: self.wxapp_id,
							content: self.input,
							pid: self.pid,
							details: self.input
						},

						success(res) {
							// self.getDetail(self.data.id);
							setTimeout(function() {
								self.stay(self.data.m_id);
							}, 1000)
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

			//立即购买
			toBuy() {
				console.log('立即购买');

				if (uni.getStorageSync('token') == '') {
					uni.showToast({
						title: '请先登录',
						icon: 'none'
					});
					setTimeout(function() {
						uni.navigateTo({
							url: '/gc_school/pages/user/index'
						});
					}, 1000);
					return;
				}

				uni.navigateTo({
					url: '/gc_school/pages/secondhand/buy?id=' + this.data.m_id
				});
			},

			showmore(e) {
				console.log(e.currentTarget.dataset.index);
				var data = this.comment_list;
				data[e.currentTarget.dataset.index].block = !data[e.currentTarget.dataset.index].block;
				this.setData({
					comment_list: data
				});
			},

			footprint(id) {
				var self = this;

				if (uni.getStorageSync('openid') != '') {
					app.globalData.util.request({
						url: 'entry/wxapp/footprint',
						data: {
							id: id,
							openid: uni.getStorageSync('openid')
						},

						success(res) {
							console.log(res.data.data);
						}
					});
				}
			},

			//图片预览
			previewImage: function(t) {
				var e = this.data.img;
				var n = t.target.dataset.index;
				uni.previewImage({
					urls: e,
					current: e[n],
					fail: function(t) {
						uni.showToast({
							title: '出错啦，请重试！',
							icon: 'none',
							duration: 2000
						});
					}
				});
			},

			//收藏/取消收藏
			fav(e) {
				console.log(e, '---');

				if (uni.getStorageSync('token') == '') {
					uni.showToast({
						title: '请先登录',
						icon: 'none'
					});
					setTimeout(function() {
						uni.navigateTo({
							url: '/gc_school/pages/user/index'
						});
					}, 1000);
					return;
				} else {
					var self = this;
					if (!self.is_fav) {
						app.globalData.util.request({
							url: 'Dmhgoodsstay/add',
							data: {
								m_id: e,
								s_id: uni.getStorageSync('schoolId'),
							},

							success(res) {
								if (res.data.status == 200) {
									self.is_fav = true;
									// if (e.currentTarget.dataset.type == 1) {
									//     self.setData({
									//         is_fav: !self.is_fav
									//     });
									// } else {
									//     self.setData({
									//         user_is_fav: !self.user_is_fav
									//     });
									// }
								}
							}
						}, true);
					} else {
						app.globalData.util.request({
							url: 'Dmhgoodsstay/delete',
							data: {
					   m_id: e,
								s_id: uni.getStorageSync('schoolId'),
								type: 1
							},

							success(res) {
								if (res.data.status == 200) {
									self.is_fav = false;
									// if (e.currentTarget.dataset.type == 1) {
									//     self.setData({
									//         is_fav: !self.is_fav
									//     });
									// } else {
									//     self.setData({
									//         user_is_fav: !self.user_is_fav
									//     });
									// }
								}
							}
						}, true);
					}
				}
			},

			makecall(e) {
				console.log(e, '---');

				if (uni.getStorageSync('token') == '') {
					uni.showToast({
						title: '请先登录',
						icon: 'none'
					});
					setTimeout(function() {
						uni.navigateTo({
							url: '/gc_school/pages/user/index'
						});
					}, 1000);
					return;
				} else {
					uni.makePhoneCall({
						phoneNumber: e.currentTarget.dataset.phone,
						success: function() {
							console.log('成功拨打电话');
						}
					});
				}
			}
		}
	};
</script>
<style>
	page {
		background-color: #f2f2f2;
	}

	/* .cu-bar .action:first-child{
  background-color: #FF6444;
  color: white;
} */
	.bgmain {
		background-color: #FFFFFF;
		color: #000000;
	}

	.picture {
		width: 100%;
		height: 300px;
	}

	.container {
		height: 100%;
	}

	.bottom {
		width: 100%;
		background: #fff;
		opacity: 1;
		position: fixed;
		left: 0rpx;
		bottom: 0rpx;
		display: flex;
		/* padding: 10rpx; */
		border-top: 1rpx solid #eee;
		align-items: center;
		box-sizing: border-box;
		z-index: 8;
		height: 100rpx;
		justify-content: space-between;
		box-sizing: content-box;
		padding-bottom: constant(safe-area-inset-bottom);  
		padding-bottom: env(safe-area-inset-bottom); 
	}

	.bottom_left {
		display: flex;
		width: 50%;
	}

	.clear {
		clear: both;
		overflow: hidden;
	}

	.slide-image {
		width: 100%;
		height: 100%;
	}

	.fav_active {
		color: #ff6444 !important;
	}

	.flex {
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		width: 100%;
	}

	.flex>.sub {
		-webkit-box-flex: 1;
		flex: 1;
		overflow: hidden;
	}

	.pj_box {
		margin-top: 10px;
		padding: 20rpx 30rpx 0;
		background: #fff;
	}

	.detail_card {
		display: flex;
		width: 100%;
		box-sizing: border-box;
		padding: 10rpx 0;
		justify-content: space-between;
	}

	/* .detail_border {
  border-bottom: 1rpx solid #eee;
} */

	.detail_title {
		width: 20%;
		font-size: 28rpx;
		letter-spacing: 2rpx;
		line-height: 45rpx;
		color: #919191;
	}

	.detail_content {
		width: 78%;
		font-size: 28rpx;
		letter-spacing: 2rpx;
		line-height: 44rpx;
		color: #616161;
		word-break: break-all;
	}

	.detail_content_d {
		width: 78%;
		font-size: 27rpx;
		letter-spacing: 2rpx;
		line-height: 44rpx;
		color: #616161;
		word-break: break-all;
		/* padding-bottom: 40px; */
	}

	.first {
		/* border-bottom: 1px solid #f6f6f6; */
		background: #fff;
		padding: 13rpx 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		/* height: 80rpx; */
	}

	.left {
		width: 55%;
		height: 80rpx;
	}

	.price {
		float: left;
		/* height: 15px; */
		/* line-height: 30px; */
		/* color: #ff6666; */
		/* font-size: 34rpx; */
		/* margin: 0 5px; */
		/* font-weight: bold; */
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #121212;
		line-height: 60rpx;
	}

	.oldprice {
		/* color: #cccccc; */
		/* text-decoration: line-through; */
		/* font-size: 24rpx; */
		float: left;
		margin-left: 29rpx;
		margin-top: 10rpx;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		text-decoration: line-through;
		color: #999999;
		/* line-height:75rpx; */
	}

	.right {
		display: flex;
		align-items: center;
	}

	.share {
		width: 100rpx;
		padding: 0;
		background-color: white;
	}

	button::after {
		border: none;
	}

	.right image {
		width: 80rpx;
		height: 75rpx;
		padding: 20rpx;
		border-radius: 50%;
		box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.07);
		margin-right: 10rpx;
	}

	.name {
		font-size: 30rpx;
		font-weight: bold;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		line-height: 70rpx;
	}

	.price em {
		/* font-size: 12px; */
		margin-left: 20px;
		font-size: 62rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #121212;
		line-height: 60rpx;
	}

	.add-cart {
		width: 55%;
		height: 100%;
		display: flex;
		/* padding-left: 30px;
  justify-content: center;
  align-items: center;
  box-sizing: border-box; */
	}

	.add-cart-btn {
		width: 100%;
		height: 84rpx;
		margin-top: 8rpx;
		background: #222222;
		/* background: #FF6444; */
		color: white;
		letter-spacing: 4rpx;
		font-size: 30rpx;
		/* border-radius: 35rpx; */
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.cuIcon {
		font-size: 46rpx !important;
	}

	.t_card {
		position: relative;
		width: 20%;
		height: 100rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		margin-left: 30rpx;
	}

	.t_card image {
		width: 60rpx;
		height: 80rpx;
		/* padding-top: 10rpx; */
	}

	.t_card text {
		display: flex;
		align-items: flex-start;
		justify-content: center;
		height: calc(100% - 45rpx);
		width: 100%;
		font-size: 24rpx;
		text-align: center;
		white-space: nowrap;
		padding-top: 5rpx;
		color: DimGray;
	}

	/* 留言 */
	.comment_box {
		margin-top: 10px;
		background: #fff;
		padding-bottom: 250rpx;
	}

	.comment_box .name {
		padding: 20rpx 30rpx 0;
	}

	.comment_item_first {
		border-top: 1px solid rgba(201, 201, 201, 0.6);
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
		/* font-size: 26rpx; */
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 42rpx;
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
		border-top: 1px solid rgba(201, 201, 201, 0.6);
		padding: 20rpx 30rpx 20rpx 0;
	}

	.comment_item_child image {
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}

	.top {
		display: flex;
		align-items: center;
	}

	.nickname {
		font-size: 24rpx;
		font-weight: bold;
		flex-grow: 1;
	}

	.cuIcon-appreciate {
		font-size: 34rpx;
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

	.nocontent {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		box-sizing: border-box;
		padding-bottom: 20rpx;
	}

	.nocontent image {
		width: 150rpx;
		height: 150rpx;
	}

	.blank_text {
		padding-top: 10rpx;
		font-size: 32rpx;
		letter-spacing: 2rpx;
		color: #c6c6c8;
	}

	.more {
		font-size: 28rpx;
		text-align: center;
		margin-bottom: 10rpx;
	}

	.contact {
		border-top-left-radius: 40rpx;
		border-bottom-left-radius: 40rpx;
	}

	.buy {
		border-top-right-radius: 40rpx;
		border-bottom-right-radius: 40rpx;
	}

	.avatar {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}

	.nickname {
		display: contents;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #141414;
		line-height: 36rpx;
	}

	.create_time {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #888888;
	}

	.xin {
		font-size: 28rpx;
		font-family: DIN;
		font-weight: bold;
		color: #121212;
		line-height: 60rpx;
	}

	.details {
		font-size: 34rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #232323;
	}

	.minute {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #999999;
		line-height: 70rpx;
		margin-left: 10rpx;
	}

	.di-image {
		height: 41rpx;
		width: 41rpx;
	}
</style>
