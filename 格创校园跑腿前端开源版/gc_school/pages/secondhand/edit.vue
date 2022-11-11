<template>
	<block>
		<cu-custom bgColor="bgmain" :isBack="true">
			<view slot="content">编辑</view>
		</cu-custom>
		<form @submit.stop.prevent="formSubmit" @reset.stop.prevent="formReset">
			<view class="weui-cells weui-cells_after-title page">
				<view class="beijing">
					<view class="box">
						<view class="cu-bar bg-white">
							<view class="info">
								<!-- <text class="cuIcon-titles text-green"></text> -->
								<image src="../../../static/images/jibens.png" style="width: 32rpx;height: 32rpx;"></image>
								<text class="jiben">商品基本信息</text>
							</view>
						</view>
					</view>
					<view class="cu-form-group">
						<!-- <view class="title">商品名称</view> -->
						<input @input="bookNameInput" name="name"  placeholder="请输入商品的名称" :value="data.title" />
					</view>
					<view class="cu-form-group margin-bottom">
						<!-- <view class="title">具体描述</view> -->
				
						<textarea :autoHeight="true" @input="descInput" name="content"   :value="data.details" maxlength="-1" placeholder="在此输入商品描述"></textarea>
				
						<!-- <textarea :autoHeight="true" @input="descInput" maxlength="-1" placeholder="请输入描述"></textarea> -->
				
					</view>
					<!-- <view class="weui-cell weui-cell_input">
				    <view class="weui-cell__hd">
				        <view class="weui-label">添加图片</view>
				    </view>
				</view> -->
				
					<view style="" class="margin-left">
						<addImage :count="count" :images="images" :addedCount="addedCount" @chooseImage="chooseImages"
							@deleteImage="deleteImage"></addImage>
					</view>
					<view class="imagess">添加商品图片</view>
					<!-- <view class="del_remark text-sm margin-left margin-bottom">*长按图片可进行删除</view> -->
				</view>
				<view class="beijing">
					<view class="cu-form-group">
						<view>
							<view class="title">新旧程度</view>
						</view>
						<view>
							<picker @change="bindPickerChange" :value="index" :range="array">
								<view class="picker">
									{{ array[index] }}
								</view>
							</picker>
						</view>
					</view>
					<view class="cu-form-group">
						<view>
							<view class="title">分类</view>
						</view>
						<view>
							<picker @change="bindPickerChanges" :value="cateList[indexs].id" :range="cateList"
								:range-key="'title'">
								<view class="picker">
									{{ cateList[indexs].title }}
								</view>
							</picker>
						</view>
					</view>
					<!-- <view class="cu-form-group">
						<view class="title">所属分类</view>
						<picker @change="bindPickerChanges" :value="cateList[indexs].id" :range="cateList"
							:range-key="'title'">
							<view class="picker">
								{{ cateList[indexs].title }}
							</view>
						</picker>
					</view> -->
					<view class="cu-form-group">
						<view class="title">原价</view>
						
						<input @input="oldpriceInput" name="oldprice" :value="data.price"  style="text-align: right;" placeholder="最多保留两位小数"
							type="digit" />
					</view>
					<view class="cu-form-group">
						<view class="title">现价</view>
						<input @input="newpriceInput" name="price" :value="data.pay" style="text-align: right;"  placeholder="最多保留两位小数"
							type="digit" />
					</view>
					<view class="cu-form-group">
						<view class="title">库存</view>
						<input@input="phoneFun" :value="data.stock" name="stock" style="text-align: right;"  placeholder="请输入库存"
							type="number" />
					</view>
				</view>
				<view class="beijing">
					<!-- <view class="cu-form-group">
				      <view class="title">联系人</view>
				      <input @input="nameFun" name="names" placeholder="请输入人" type="names" />
				  </view> -->
					<view class="cu-form-group">
						<view class="title">联系电话</view>
						<input @input="phoneFun" :value="data.phone" name="phone" style="text-align: right;"    placeholder="请输入电话"
							type="number" />
					</view>
				</view>
				<!-- <view class="cu-form-group">
					<view class="title">商品名称</view>
					<input @input="bookNameInput" name="name" :value="data.title" placeholder="请输入商品的名称" />
				</view> -->
				<!-- <view class="cu-form-group">
					<view class="title">原价</view>
					<input @input="oldpriceInput" name="oldprice" :value="data.price" placeholder="最多保留两位小数"
						type="digit" />
				</view> -->
				<!-- <view class="cu-form-group">
					<view class="title">现价</view>
					<input @input="newpriceInput" name="price" :value="data.pay" placeholder="最多保留两位小数" type="digit" />
				</view> -->
				<!-- <view class="cu-form-group">
					<view class="title">联系电话</view>
					<input @input="phoneFun" :value="data.phone" name="phone" placeholder="请输入电话" type="number" />
				</view> -->
				<!-- <view class="cu-form-group">
					<view class="title">库存</view>
					<input @input="phoneFun" :value="data.stock" name="stock" placeholder="请输入库存" type="number" />
				</view> -->
				<!-- <view class="cu-form-group">
					<view class="title">新旧程度</view>
					<picker @change="bindPickerChange" :value="index" :range="array">
						<view class="picker">
							{{ array[index] }}
						</view>
					</picker>
				</view> -->
				<!-- <view class="cu-form-group">
					<view class="title">所属分类</view>
					<picker @change="bindPickerChanges" :value="cateList[indexs].id" :range="cateList"
						:range-key="'title'">
						<view class="picker">
							{{ cateList[indexs].title }}
						</view>
					</picker>
				</view> -->
				<!-- <view class="cu-form-group margin-bottom">
					<view class="title">具体描述</view>
					<textarea :autoHeight="true" name="content" :value="data.details" @input="descInput" maxlength="-1"
						placeholder="请输入描述"></textarea>
				</view> -->

				<!-- <view class="weui-cell weui-cell_input">
					<view class="weui-cell__hd">
						<view class="weui-label">添加图片</view>
					</view>
				</view> -->

				<!-- <view style="" class="margin-left">
					<addImage :count="count" :images="images" :addedCount="addedCount" @chooseImage="chooseImages"
						@deleteImage="deleteImage"></addImage>
				</view> -->
				<!-- <view class="del_remark text-sm margin-left margin-bottom">*长按图片可进行删除</view> -->
				<!-- <button @tap="save" class="my_button" type="primary">发布</button> -->
				<button type="primary" formType="submit" class="my_button">提交</button>
			</view>
			<!-- <view bindtap="gorequirement" class="add">
    <image class="add_icon" src="../../images/require_requirement.png"></image>
</view> -->
		</form>
	</block>
</template>

<script>
	import addImage from '@/colorui/components/upload/upload';
	// gc_market/pages/addsecond/index.js
	import siteInfo from '@/siteinfo.js';
	var app = getApp();
	export default {
		components: {
			addImage
		},
		data() {
			return {
				img_url: [],
				count: 4,
				canphoto: 4,
				imgurl: [],
				name: '',
				newprice: '',
				oldprice: '',
				desc: '',
				phone: '',
				array: ['全新', '9成新', '8成新', '7成新', '6成新', '5成新以下'],
				index: 0,
				cateList: [],
				indexs: 0,
				images: [],
				count: 3,
				addedCount: 0,
				picList: [],
				stock: '',
				sys: {},
				id: '',

				data: {
					name: '',
					oldprice: '',
					price: '',
					phone: '',
					stock: '',
					content: ''
				},

				hideAdd: 0,
				modalName: ''
			};
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			console.log(options);
			this.getCate();
			this.getDetail(options.id);
			this.setData({
				id: options.id
			});

			if (uni.getStorageSync('phone')) {
				this.setData({
					phone: uni.getStorageSync('phone')
				});
			}

			var that = this;
			app.globalData.util.request({
				url: 'entry/wxapp/Sysparment',

				success(res) {
					console.log('获取配置', res.data.data);
					that.setData({
						sys: res.data.data.sys
					});
				}
			});
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
		// onShareAppMessage: function () {
		// }
		onReachBottom: function() {},
		/**
		 * 用户点击右上角分享
		 */
		methods: {
			getCate() {
				var self = this;
				app.globalData.util.request({
					url: "Dmhmarketcategory/index",
					data: {
						s_id: uni.getStorageSync("schoolId")
					},

					success(res) {
						console.log(res.data.data);
						self.setData({
							cateList: res.data.data.list
						});
					}

				});
			},

			getDetail(id) {
				var self = this;
				app.globalData.util.request({
					url: 'Dmhmarketgoods/view',
					data: {
						m_id: id
					},

					success(res) {
						console.log(res.data.data, '---111---');
						// console.log(res.data.data.degree);

						for (var i = 0; i < self.array.length; i++) {
							if (self.array[i] == res.data.data.degree) {
								self.setData({
									index: i
								});
							}
						}

						for (var i = 0; i < self.cateList.length; i++) {
							if (self.cateList[i].id == res.data.data.cid) {
								self.setData({
									indexs: i
								});
							}
						}

						self.setData({
							data: res.data.data,
							images: res.data.data.rotation,
							picList: res.data.data.rotation,
							addedCount: res.data.data.rotation.length
						});
					}
				});
			},

			bindPickerChange: function(e) {
				this.setData({
					index: e.detail.value
				});
			},

			bindPickerChanges: function(e) {
				this.setData({
					indexs: e.detail.value
				});
			},

			//图片上传
			chooseImages() {
				console.log('执行几级');
				var that = this;
				uni.chooseImage({
					count: 3 - that.addedCount,
					sizeType: ['compressed'],
					// 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'],
					// 可以指定来源是相册还是相机，默认二者都有
					success: function(res) {
						that.uploadimg({
							path: res.tempFilePaths //这里是选取的图片的地址数组
						});
					}
				});
			},

			uploadimg: function(data) {
				uni.showLoading({
					title: '上传中...',
					mask: true
				});
				console.log('上传中');
				var that = this;
				var count = that.addedCount + data.path.length;
				console.log(that.images);

				for (var i = 0; i < data.path.length; i++) {
					uni.uploadFile({
						// url: app.globalData.util.url() + 'c=entry&a=wxapp&do=ImgPost&m=gc_school',
						// filePath: data.path[i],
						// name: 'file',
						// formData: null,
						url: siteInfo.url + 'Base/upload',
						filePath: data.path[i],
						header: {
							'Authorization': uni.getStorageSync('token')
						},
						name: 'file',
						formData: {
							'wxapp_id': siteInfo.uniacid
						},
						success: resp => {


							var pic = JSON.parse(resp.data);
							console.log('111')
							console.log(pic.status, '---11---')
							if (pic.status == 200) {
								count++; // console.log(pic)
								console.log('222')
								var picList = that.picList;
								picList.push(pic.data); // console.log(data.path[i])

								var images = that.images.concat(pic.data);
								console.log('333')
								that.setData({
									images: images,
									addedCount: count,
									picList: picList
								});
								console.log(that.addedCount);
								console.log('444')
								if (count == that.picList.length) {
									console.log('555')
									uni.hideLoading({});
								}
							} else {
								uni.showToast({
									title: pic.message,
									icon: 'none'
								});
							}
						}
					});
				}
			},

			// 删除图片
			deleteImage(e) {
				this.images.splice(e.detail, 1);
				this.picList.splice(e.detail, 1);
				this.setData({
					images: this.images,
					picList: this.picList,
					addedCount: this.addedCount - 1
				});
				console.log('删除后的', this.picList);
			},

			upload() {
				var res = this.img_url;
				console.log(res);
				uni.showLoading();

				for (var i = 0; i < res.length; i++) {
					uni.uploadFile({
						url: app.globalData.util.url() + 'c=entry&a=wxapp&do=ImgPost&m=gc_market',
						// 仅为示例，非真实的接口地址
						filePath: res[i],
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						name: 'file',
						success: (result) => {
							var data = result.data;
							data = JSON.parse(data).data;
							this.imgurl.push(data);
							console.log(this.imgurl);
							uni.hideLoading();
						}
					});
				}
			},

			formSubmit(e) {
				console.log(e);
				var self = this;
				console.log('长度', self.picList.length);
				var name = e.detail.value.name.replace(/\s+/g, '');
				var oldprice = e.detail.value.oldprice.replace(/\s+/g, '');
				var price = e.detail.value.price.replace(/\s+/g, '');
				var phone = e.detail.value.phone.replace(/\s+/g, '');
				var content = e.detail.value.content.replace(/\s+/g, '');
				var stock = e.detail.value.stock.replace(/\s+/g, '');

				if (price <= 0) {
					app.globalData.util.message('现价必须大于0', '', 'error');
					return false;
				}

				if (stock <= 0) {
					app.globalData.util.message('请填写库存', '', 'error');
					return false;
				}

				if (self.cateList.length <= 0) {
					app.globalData.util.message('请选择分类', '', 'error');
					return false;
				}

				if (name == '' || oldprice == '' || price == '' || content == '' || phone == '') {
					app.globalData.util.message('不能有空值', '', 'error');
					return false;
				}

				if (self.picList.length == 0) {
					app.globalData.util.message('请上传图片', '', 'error');
					return false;
				}

				var myreg = /^1[3456789]\d{9}$/;

				if (!myreg.test(phone)) {
					app.globalData.util.message('手机号码格式有误', '', 'error');
					return false;
				} // this.upload()
				// setTimeout(function(){

				uni.showModal({
					title: '提示',
					content: '允许接收订阅消息',

					success(con) {
						if (con.confirm) {
							uni.requestSubscribeMessage({
								tmplIds: [self.sys.second_template_id],

								// 此处可填写多个模板 ID，但低版本微信不兼容只能授权一个
								success(resu) {
									console.log('已授权接收订阅消息');
								},

								complete(e) {
									app.globalData.util.request({
										url: 'Dmhmarketgoods/update',
										method: 'POST',
										data: {
											m_id: self.id,
											name: name,
											phone: phone,
											oldprice: oldprice,
											newprice: price,
											stock: stock,
											content: content,
											degree: self.array[self.index],
											cate_id: self.cateList[self.indexs].id,
											img: self.picList.join(","),
											image: self.picList[0],
											s_id: uni.getStorageSync('schoolId')
										},

										success(res) {
											console.log(res.data.data);
											uni.redirectTo({
												url: '/gc_school/pages/secondhand/my'
											});
										}
									}, true);
								}
							});
						}
					}
				}); // },3000)
			},

			bookNameInput: function(e) {
				this.setData({
					name: e.detail.value
				});
			},

			oldpriceInput: function(e) {
				this.setData({
					oldprice: e.detail.value
				});
			},

			newpriceInput: function(e) {
				this.setData({
					newprice: e.detail.value
				});
			},

			phoneFun: function(e) {
				this.setData({
					phone: e.detail.value
				});
			},

			stockFun: function(e) {
				this.setData({
					stock: e.detail.value
				});
			},

			descInput: function(e) {
				this.setData({
					desc: e.detail.value
				});
			},

			chooseimage: function() {
				var that = this;
				this.setData({
					imgurl: []
				});
				uni.chooseImage({
					count: that.canphoto,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success: function(t) {
						t.tempFilePaths;

						if (t.tempFilePaths.length > 0) {
							var a = that.img_url;
							a = a.concat(t.tempFilePaths);
							that.setData({
								img_url: a,
								canphoto: that.canphoto - t.tempFilePaths.length
							});

							if (that.img_url.length >= that.count) {
								that.setData({
									hideAdd: 1
								});
								uni.showToast({
									title: '最多上传4张照片',
									icon: 'none'
								});
							} else {
								that.setData({
									hideAdd: 0
								});
							}

							that.upload(that.img_url);
						}
					}
				});
			},

			deleteImg: function(e) {
				var t = this.img_url;
				var a = e.target.dataset.index;
				t.splice(a, 1);
				this.setData({
					img_url: t,
					hideAdd: !(this.img_url.length < this.count)
				});
			},

			formReset() {
				console.log('占位：函数 formReset 未声明');
			}
		}
	};
</script>
<!-- <style>
	page {
		line-height: 1.6;
		font-family: -apple-system-font, Helvetica Neue, sans-serif;
	}

	.cu-bar .action:first-child {
		/* background-color: #ff6444;
    color: white; */
	}

	.info {
		background: white;
		color: black;
	}

	bgmain {
		background-color: #0000;
		color: #000000;
	}

	icon {
		vertical-align: middle;
	}

	.weui-cells {
		position: relative;
		margin-top: 1.17647059em;
		background-color: #fff;
		line-height: 1.41176471;
		font-size: 17px;
	}

	.weui-cells:before {
		top: 0;
		border-top: 1rpx solid #d9d9d9;
	}

	.weui-cells:after,
	.weui-cells:before {
		content: ' ';
		position: absolute;
		left: 0;
		right: 0;
		height: 1px;
		color: #d9d9d9;
	}

	.weui-cells:after {
		bottom: 0;
		border-bottom: 1rpx solid #d9d9d9;
	}

	.weui-cells__title {
		margin-top: 0.77em;
		margin-bottom: 0.3em;
		padding-left: 15px;
		padding-right: 15px;
		color: #999;
		font-size: 14px;
	}

	.weui-cells_after-title {
		margin-top: 0;
	}

	.weui-cells__tips {
		margin-top: 0.3em;
		color: #999;
		padding-left: 15px;
		padding-right: 15px;
		font-size: 14px;
	}

	.weui-cell {
		padding: 10px 15px;
		position: relative;
		display: flex;
		-webkit-box-align: center;
		align-items: center;
	}

	.weui-cell:before {
		content: ' ';
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		height: 1px;
		border-top: 1rpx solid #d9d9d9;
		color: #d9d9d9;
		left: 15px;
	}

	.weui-cell:first-child:before {
		display: none;
	}

	.weui-cell_active {
		background-color: #ececec;
	}

	.weui-cell_primary {
		-webkit-box-align: start;
		align-items: flex-start;
	}

	.weui-cell__bd {
		-webkit-box-flex: 1;
		flex: 1;
	}

	.weui-cell__ft {
		text-align: right;
		color: #999;
	}

	.weui-cell_access {
		color: inherit;
	}

	.weui-cell__ft_in-access {
		padding-right: 13px;
		position: relative;
	}

	.weui-cell__ft_in-access:after {
		content: ' ';
		display: inline-block;
		height: 6px;
		width: 6px;
		border-width: 2px 2px 0 0;
		border-color: #c8c8cd;
		border-style: solid;
		transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
		position: relative;
		top: -2px;
		position: absolute;
		top: 50%;
		margin-top: -4px;
		right: 2px;
	}

	.weui-cell_link {
		color: #586c94;
		font-size: 14px;
	}

	.weui-cell_link:active {
		background-color: #ececec;
	}

	.weui-cell_link:first-child:before {
		display: block;
	}

	.weui-icon-radio {
		margin-left: 3.2px;
		margin-right: 3.2px;
	}

	.weui-icon-checkbox_circle,
	.weui-icon-checkbox_success {
		margin-left: 4.6px;
		margin-right: 4.6px;
	}

	.weui-check__label:active {
		background-color: #ececec;
	}

	.weui-check {
		position: absolute;
		left: -9999px;
	}

	.weui-check__hd_in-checkbox {
		padding-right: 0.35em;
	}

	.weui-cell__ft_in-radio {
		padding-left: 0.35em;
	}

	.weui-cell_input {
		padding-top: 0;
		padding-bottom: 0;
	}

	.weui-label {
		width: 105px;
		word-wrap: break-word;
		word-break: break-all;
	}

	.weui-input {
		height: 2.58823529em;
		min-height: 2.58823529em;
		line-height: 2.58823529em;
	}

	.weui-toptips {
		position: fixed;
		transform: translateZ(0);
		top: 0;
		left: 0;
		right: 0;
		padding: 5px;
		font-size: 14px;
		text-align: center;
		color: #fff;
		z-index: 5000;
		word-wrap: break-word;
		word-break: break-all;
	}

	.weui-toptips_warn {
		background-color: #e64340;
	}

	.weui-textarea {
		display: block;
		width: 100%;
	}

	.weui-textarea-counter {
		color: #b2b2b2;
		text-align: right;
	}

	.weui-cell_warn,
	.weui-textarea-counter_warn {
		color: #e64340;
	}

	.weui-form-preview {
		position: relative;
		background-color: #fff;
	}

	.weui-form-preview:before {
		top: 0;
		border-top: 1rpx solid #d9d9d9;
	}

	.weui-form-preview:after,
	.weui-form-preview:before {
		content: ' ';
		position: absolute;
		left: 0;
		right: 0;
		height: 1px;
		color: #d9d9d9;
	}

	.weui-form-preview:after {
		bottom: 0;
		border-bottom: 1rpx solid #d9d9d9;
	}

	.weui-form-preview__value {
		font-size: 14px;
	}

	.weui-form-preview__value_in-hd {
		font-size: 26px;
	}

	.weui-form-preview__hd {
		position: relative;
		padding: 10px 15px;
		text-align: right;
		line-height: 2.5em;
	}

	.weui-form-preview__hd:after {
		content: ' ';
		position: absolute;
		left: 0;
		bottom: 0;
		right: 0;
		height: 1px;
		border-bottom: 1rpx solid #d9d9d9;
		color: #d9d9d9;
		left: 15px;
	}

	.weui-form-preview__bd {
		padding: 10px 15px;
		font-size: 0.9em;
		text-align: right;
		color: #999;
		line-height: 2;
	}

	.weui-form-preview__ft {
		position: relative;
		line-height: 50px;
		display: flex;
	}

	.weui-form-preview__ft:after {
		content: ' ';
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		height: 1px;
		border-top: 1rpx solid #d5d5d6;
		color: #d5d5d6;
	}

	.weui-form-preview__item {
		overflow: hidden;
	}

	.weui-form-preview__label {
		float: left;
		margin-right: 1em;
		min-width: 4em;
		color: #999;
		text-align: justify;
		text-align-last: justify;
	}

	.weui-form-preview__value {
		display: block;
		overflow: hidden;
		word-break: normal;
		word-wrap: break-word;
	}

	.weui-form-preview__btn {
		position: relative;
		display: block;
		-webkit-box-flex: 1;
		flex: 1;
		color: #3cc51f;
		text-align: center;
	}

	.weui-form-preview__btn:after {
		content: ' ';
		position: absolute;
		left: 0;
		top: 0;
		width: 1px;
		bottom: 0;
		border-left: 1rpx solid #d5d5d6;
		color: #d5d5d6;
	}

	.weui-form-preview__btn:first-child:after {
		display: none;
	}

	.weui-form-preview__btn_active {
		background-color: #eee;
	}

	.weui-form-preview__btn_default {
		color: #999;
	}

	.weui-form-preview__btn_primary {
		color: #0bb20c;
	}

	.weui-cell_select {
		padding: 0;
	}

	.weui-select {
		position: relative;
		padding-left: 15px;
		padding-right: 30px;
		height: 2.58823529em;
		min-height: 2.58823529em;
		line-height: 2.58823529em;
		border-right: 1rpx solid #d9d9d9;
	}

	.weui-select:before {
		content: ' ';
		display: inline-block;
		height: 6px;
		width: 6px;
		border-width: 2px 2px 0 0;
		border-color: #c8c8cd;
		border-style: solid;
		transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
		position: relative;
		top: -2px;
		position: absolute;
		top: 50%;
		right: 15px;
		margin-top: -4px;
	}

	.weui-select_in-select-after {
		padding-left: 0;
	}

	.weui-cell__bd_in-select-before,
	.weui-cell__hd_in-select-after {
		padding-left: 15px;
	}

	.weui-cell_vcode {
		padding-right: 0;
	}

	.weui-vcode-btn,
	.weui-vcode-img {
		margin-left: 5px;
		height: 2.58823529em;
		vertical-align: middle;
	}

	.weui-vcode-btn {
		display: inline-block;
		padding: 0 0.6em 0 0.7em;
		border-left: 1px solid #e5e5e5;
		line-height: 2.58823529em;
		font-size: 17px;
		color: #3cc51f;
		white-space: nowrap;
	}

	.weui-vcode-btn:active {
		color: #52a341;
	}

	.weui-cell_switch {
		padding-top: 6px;
		padding-bottom: 6px;
	}

	.weui-uploader__hd {
		display: flex;
		padding-bottom: 10px;
		-webkit-box-align: center;
		align-items: center;
	}

	.weui-uploader__title {
		-webkit-box-flex: 1;
		flex: 1;
	}

	.weui-uploader__info {
		color: #b2b2b2;
	}

	.weui-uploader__bd {
		margin-bottom: -4px;
		margin-right: -9px;
		overflow: hidden;
	}

	.weui-uploader__file {
		float: left;
		margin-right: 9px;
		margin-bottom: 9px;
	}

	.weui-uploader__img {
		display: block;
		width: 79px;
		height: 79px;
	}

	.weui-uploader__file_status {
		position: relative;
	}

	.weui-uploader__file_status:before {
		content: ' ';
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.5);
	}

	.weui-uploader__file-content {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: #fff;
	}

	.weui-uploader__input-box {
		float: left;
		position: relative;
		margin-right: 9px;
		margin-bottom: 9px;
		width: 77px;
		height: 77px;
		border: 1px solid #d9d9d9;
	}

	.weui-uploader__input-box:after,
	.weui-uploader__input-box:before {
		content: ' ';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #d9d9d9;
	}

	.weui-uploader__input-box:before {
		width: 2px;
		height: 39.5px;
	}

	.weui-uploader__input-box:after {
		width: 39.5px;
		height: 2px;
	}

	.weui-uploader__input-box:active {
		border-color: #999;
	}

	.weui-uploader__input-box:active:after,
	.weui-uploader__input-box:active:before {
		background-color: #999;
	}

	.weui-uploader__input {
		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}

	.weui-article {
		padding: 20px 15px;
		font-size: 15px;
	}

	.weui-article__section {
		margin-bottom: 1.5em;
	}

	.weui-article__h1 {
		font-size: 18px;
		font-weight: 400;
		margin-bottom: 0.9em;
	}

	.weui-article__h2 {
		font-size: 16px;
		font-weight: 400;
		margin-bottom: 0.34em;
	}

	.weui-article__h3 {
		font-weight: 400;
		font-size: 15px;
		margin-bottom: 0.34em;
	}

	.weui-article__p {
		margin: 0 0 0.8em;
	}

	.weui-msg {
		padding-top: 36px;
		text-align: center;
	}

	.weui-msg__link {
		display: inline;
		color: #586c94;
	}

	.weui-msg__icon-area {
		margin-bottom: 30px;
	}

	.weui-msg__text-area {
		margin-bottom: 25px;
		padding: 0 20px;
	}

	.weui-msg__title {
		margin-bottom: 5px;
		font-weight: 400;
		font-size: 20px;
	}

	.weui-msg__desc {
		font-size: 14px;
		color: #999;
	}

	.weui-msg__opr-area {
		margin-bottom: 25px;
	}

	.weui-msg__extra-area {
		margin-bottom: 15px;
		font-size: 14px;
		color: #999;
	}

	@media screen and (min-height: 438px) {
		.weui-msg__extra-area {
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			text-align: center;
		}
	}

	.weui-flex {
		display: flex;
	}

	.weui-flex__item {
		-webkit-box-flex: 1;
		flex: 1;
	}

	.weui-btn {
		margin-top: 15px;
	}

	.weui-btn:first-child {
		margin-top: 0;
	}

	.weui-btn-area {
		margin: 1.17647059em 15px 0.3em;
	}

	.weui-agree {
		display: block;
		padding: 0.5em 15px;
		font-size: 13px;
	}

	.weui-agree__text {
		color: #999;
	}

	.weui-agree__link {
		display: inline;
		color: #586c94;
	}

	.weui-agree__checkbox {
		position: absolute;
		left: -9999px;
	}

	.weui-agree__checkbox-icon {
		position: relative;
		top: 2px;
		display: inline-block;
		border: 1px solid #d1d1d1;
		background-color: #fff;
		border-radius: 3px;
		width: 11px;
		height: 11px;
	}

	.weui-agree__checkbox-icon-check {
		position: absolute;
		top: 1px;
		left: 1px;
	}

	.weui-footer {
		color: #999;
		font-size: 14px;
		text-align: center;
	}

	.weui-footer_fixed-bottom {
		position: fixed;
		bottom: 0.52em;
		left: 0;
		right: 0;
	}

	.weui-footer__links {
		font-size: 0;
	}

	.weui-footer__link {
		display: inline-block;
		vertical-align: top;
		margin: 0 0.62em;
		position: relative;
		font-size: 14px;
		color: #586c94;
	}

	.weui-footer__link:before {
		content: ' ';
		position: absolute;
		left: 0;
		top: 0;
		width: 1px;
		bottom: 0;
		border-left: 1rpx solid #c7c7c7;
		color: #c7c7c7;
		left: -0.65em;
		top: 0.36em;
		bottom: 0.36em;
	}

	.weui-footer__link:first-child:before {
		display: none;
	}

	.weui-footer__text {
		padding: 0 0.34em;
		font-size: 12px;
	}

	.weui-grids {
		border-top: 1rpx solid #d9d9d9;
		border-left: 1rpx solid #d9d9d9;
		overflow: hidden;
	}

	.weui-grid {
		position: relative;
		float: left;
		padding: 20px 10px;
		width: 33.33333333%;
		box-sizing: border-box;
		border-right: 1rpx solid #d9d9d9;
		border-bottom: 1rpx solid #d9d9d9;
	}

	.weui-grid_active {
		background-color: #ececec;
	}

	.weui-grid__icon {
		display: block;
		width: 28px;
		height: 28px;
		margin: 0 auto;
	}

	.weui-grid__label {
		margin-top: 5px;
		display: block;
		text-align: center;
		color: #000;
		font-size: 14px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.weui-loading {
		margin: 0 5px;
		width: 20px;
		height: 20px;
		display: inline-block;
		vertical-align: middle;
		animation: a 1s steps(12) infinite;
		background: transparent url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=) no-repeat;
		background-size: 100%;
	}

	.weui-loading.weui-loading_transparent {
		background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 100 100'%3E%3Cpath fill='none' d='M0 0h100v100H0z'/%3E%3Crect xmlns='http://www.w3.org/2000/svg' width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.56)' rx='5' ry='5' transform='translate(0 -30)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.5)' rx='5' ry='5' transform='rotate(30 105.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.43)' rx='5' ry='5' transform='rotate(60 75.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.38)' rx='5' ry='5' transform='rotate(90 65 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.32)' rx='5' ry='5' transform='rotate(120 58.66 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.28)' rx='5' ry='5' transform='rotate(150 54.02 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.25)' rx='5' ry='5' transform='rotate(180 50 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.2)' rx='5' ry='5' transform='rotate(-150 45.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.17)' rx='5' ry='5' transform='rotate(-120 41.34 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.14)' rx='5' ry='5' transform='rotate(-90 35 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.1)' rx='5' ry='5' transform='rotate(-60 24.02 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.03)' rx='5' ry='5' transform='rotate(-30 -5.98 65)'/%3E%3C/svg%3E");
	}

	@-webkit-keyframes a {
		0% {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(1turn);
		}
	}

	@keyframes a {
		0% {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(1turn);
		}
	}

	.weui-badge {
		display: inline-block;
		padding: 0.15em 0.4em;
		min-width: 8px;
		border-radius: 18px;
		background-color: #e64340;
		color: #fff;
		line-height: 1.2;
		text-align: center;
		font-size: 12px;
		vertical-align: middle;
	}

	.weui-badge_dot {
		padding: 0.4em;
		min-width: 0;
	}

	.weui-loadmore {
		width: 65%;
		margin: 1.5em auto;
		line-height: 1.6em;
		font-size: 14px;
		text-align: center;
	}

	.weui-loadmore__tips {
		display: inline-block;
		vertical-align: middle;
	}

	.weui-loadmore_line {
		border-top: 1px solid #e5e5e5;
		margin-top: 2.4em;
	}

	.weui-loadmore__tips_in-line {
		position: relative;
		top: -0.9em;
		padding: 0 0.55em;
		background-color: #fff;
		color: #999;
	}

	.weui-loadmore__tips_in-dot {
		position: relative;
		padding: 0 0.16em;
		width: 4px;
		height: 1.6em;
	}

	.weui-loadmore__tips_in-dot:before {
		content: ' ';
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -1px;
		margin-left: -2px;
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background-color: #e5e5e5;
	}

	.weui-panel {
		background-color: #fff;
		margin-top: 10px;
		position: relative;
		overflow: hidden;
	}

	.weui-panel:first-child {
		margin-top: 0;
	}

	.weui-panel:before {
		top: 0;
		border-top: 1rpx solid #e5e5e5;
	}

	.weui-panel:after,
	.weui-panel:before {
		content: ' ';
		position: absolute;
		left: 0;
		right: 0;
		height: 1px;
		color: #e5e5e5;
	}

	.weui-panel:after {
		bottom: 0;
		border-bottom: 1rpx solid #e5e5e5;
	}

	.weui-panel__hd {
		padding: 14px 15px 10px;
		color: #999;
		font-size: 13px;
		position: relative;
	}

	.weui-panel__hd:after {
		content: ' ';
		position: absolute;
		left: 0;
		bottom: 0;
		right: 0;
		height: 1px;
		border-bottom: 1rpx solid #e5e5e5;
		color: #e5e5e5;
		left: 15px;
	}

	.weui-media-box {
		padding: 15px;
		position: relative;
	}

	.weui-media-box:before {
		content: ' ';
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		height: 1px;
		border-top: 1rpx solid #e5e5e5;
		color: #e5e5e5;
		left: 15px;
	}

	.weui-media-box:first-child:before {
		display: none;
	}

	.weui-media-box__title {
		font-weight: 400;
		font-size: 17px;
		width: auto;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		word-wrap: normal;
		word-wrap: break-word;
		word-break: break-all;
	}

	.weui-media-box__desc {
		color: #999;
		font-size: 13px;
		line-height: 1.2;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.weui-media-box__info {
		margin-top: 15px;
		padding-bottom: 5px;
		font-size: 13px;
		color: #cecece;
		line-height: 1em;
		list-style: none;
		overflow: hidden;
	}

	.weui-media-box__info__meta {
		float: left;
		padding-right: 1em;
	}

	.weui-media-box__info__meta_extra {
		padding-left: 1em;
		border-left: 1px solid #cecece;
	}

	.weui-media-box__title_in-text {
		margin-bottom: 8px;
	}

	.weui-media-box_appmsg {
		display: flex;
		-webkit-box-align: center;
		align-items: center;
	}

	.weui-media-box__thumb {
		width: 100%;
		height: 100%;
		vertical-align: top;
	}

	.weui-media-box__hd_in-appmsg {
		margin-right: 0.8em;
		width: 60px;
		height: 60px;
		line-height: 60px;
		text-align: center;
	}

	.weui-media-box__bd_in-appmsg {
		-webkit-box-flex: 1;
		flex: 1;
		min-width: 0;
	}

	.weui-media-box_small-appmsg {
		padding: 0;
	}

	.weui-cells_in-small-appmsg {
		margin-top: 0;
	}

	.weui-cells_in-small-appmsg:before {
		display: none;
	}

	.weui-progress {
		display: flex;
		-webkit-box-align: center;
		align-items: center;
	}

	.weui-progress__bar {
		-webkit-box-flex: 1;
		flex: 1;
	}

	.weui-progress__opr {
		margin-left: 15px;
		font-size: 0;
	}

	.weui-navbar {
		display: flex;
		position: absolute;
		z-index: 500;
		top: 0;
		width: 100%;
		border-bottom: 1rpx solid #ccc;
	}

	.weui-navbar__item {
		position: relative;
		display: block;
		-webkit-box-flex: 1;
		flex: 1;
		padding: 13px 0;
		text-align: center;
		font-size: 0;
	}

	.weui-navbar__item.weui-bar__item_on {
		color: #1aad19;
	}

	.weui-navbar__slider {
		position: absolute;
		content: ' ';
		left: 0;
		bottom: 0;
		width: 6em;
		height: 3px;
		background-color: #1aad19;
		transition: transform 0.3s;
		transition: transform 0.3s, -webkit-transform 0.3s;
		transition: transform 0.3s, -webkit-transform 0.3s;
	}

	.weui-navbar__title {
		display: inline-block;
		font-size: 15px;
		max-width: 8em;
		width: auto;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		word-wrap: normal;
	}

	.weui-tab {
		position: relative;
		height: 100%;
	}

	.weui-tab__panel {
		box-sizing: border-box;
		height: 100%;
		padding-top: 50px;
		overflow: auto;
		-webkit-overflow-scrolling: touch;
	}

	.weui-search-bar {
		position: relative;
		padding: 8px 10px;
		display: flex;
		box-sizing: border-box;
		background-color: #efeff4;
		border-top: 1rpx solid #d7d6dc;
		border-bottom: 1rpx solid #d7d6dc;
	}

	.weui-icon-search {
		margin-right: 8px;
		font-size: inherit;
	}

	.weui-icon-search_in-box {
		position: absolute;
		left: 10px;
		top: 7px;
	}

	.weui-search-bar__text {
		display: inline-block;
		font-size: 14px;
		vertical-align: middle;
	}

	.weui-search-bar__form {
		position: relative;
		-webkit-box-flex: 1;
		flex: auto;
		border-radius: 5px;
		background: #fff;
		border: 1rpx solid #e6e6ea;
	}

	.weui-search-bar__box {
		position: relative;
		padding-left: 30px;
		padding-right: 30px;
		width: 100%;
		box-sizing: border-box;
		z-index: 1;
	}

	.weui-search-bar__input {
		height: 28px;
		line-height: 28px;
		font-size: 14px;
	}

	.weui-icon-clear {
		position: absolute;
		top: 0;
		right: 0;
		padding: 7px 8px;
		font-size: 0;
	}

	.weui-search-bar__label {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 2;
		border-radius: 3px;
		text-align: center;
		color: #9b9b9b;
		background: #fff;
		line-height: 28px;
	}

	.weui-search-bar__cancel-btn {
		margin-left: 10px;
		line-height: 28px;
		color: #09bb07;
		white-space: nowrap;
	}

	.cu-form-group .title {
		min-width: calc(4em + 30rpx);
	}

	.box {
		width: 100%;
	}

	.page {
		padding: 7px;
	}

	.right {
		flex: 1;
		margin-left: 50px;
	}

	.weui-cells:before {
		top: 0;
		border-top: 1rpx solid white;
	}

	.weui-cell {
		line-height: 3.5rem;
	}

	.weui-cells:after {
		bottom: 0;
		border-bottom: 1rpx solid white;
	}

	.detailText {
		width: 100%;
		line-height: 1;
		text-overflow: ellipsis;
		word-break: break-all;
	}

	.my_button {
		width: 80%;
		background-color: #7acfa6 !important;
	}

	.icontent {
		display: flex;
		flex-direction: column;
	}

	.image_content {
		width: 100%;
		height: 100%;
	}

	.image {
		float: left;
		margin-left: 14px;
		margin-bottom: 12px;
		width: 100px;
		height: 100px;
		border: 2px rgb(223, 220, 220) dashed;
		text-align: center;
		position: relative;
	}

	.deleteImg {
		position: absolute;
		top: 0rpx;
		right: 0rpx;
		width: 50rpx;
		height: 50rpx;
		z-index: 1;
	}

	.moment_img {
		width: 90px;
		height: 90px;
	}

	.toppic {
		font-size: 12px;
		color: grey;
	}

	.add {
		position: fixed;
		width: 42px;
		height: 42px;
		bottom: 20px;
		right: 20px;
	}

	.add_icon {
		position: fixed;
		width: 42px;
		height: 42px;
		bottom: 20px;
		right: 20px;
	}

	/* .picker {
    text-align: left !important;
} */
	.picker {
		text-align: left !important;
		text-align: right;
		/* color: #666666; */
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 114rpx;
	}

	.jiben {
		font-size: 34rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #141414;
		margin-left: 15rpx;
	}

	.imagess {
		display: flex;
		align-items: center;
		margin-left: 30rpx;
		/* justify-content: center; */
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #999999;
	}

	.beijing {
		background: #FFFFFF;
		border-radius: 20px;
		padding: 30rpx 30rpx;
		margin-top: 30rpx;
	}
</style>
 -->
<style>
	page {
		background-color: rgb(247, 245, 246);
		line-height: 1.6;
		font-family: -apple-system-font, Helvetica Neue, sans-serif;
	}

	.cu-bar .action:first-child {
		/* background-color: #FF6444; */
		/* color: white; */

	}

	.info {
		background: white;
		color: black;
	}

	.bgmain {
		background-color: #0000;
		color: #000000;
	}

	icon {
		vertical-align: middle;
	}

	.weui-cells {
		position: relative;
		margin-top: 1.17647059em;
		/* background-color: #fff; */
		line-height: 1.41176471;
		font-size: 17px;
	}

	.weui-cells:before {
		top: 0;
		border-top: 1rpx solid #d9d9d9;
	}

	.weui-cells:after,
	.weui-cells:before {
		content: ' ';
		position: absolute;
		left: 0;
		right: 0;
		height: 1px;
		color: #d9d9d9;
	}

	.weui-cells:after {
		bottom: 0;
		border-bottom: 1rpx solid #d9d9d9;
	}

	.weui-cells__title {
		margin-top: 0.77em;
		margin-bottom: 0.3em;
		padding-left: 15px;
		padding-right: 15px;
		color: #999;
		font-size: 14px;
	}

	.weui-cells_after-title {
		margin-top: 0;
	}

	.weui-cells__tips {
		margin-top: 0.3em;
		color: #999;
		padding-left: 15px;
		padding-right: 15px;
		font-size: 14px;
	}

	.weui-cell {
		padding: 10px 15px;
		position: relative;
		display: flex;
		-webkit-box-align: center;
		align-items: center;
	}

	.weui-cell:before {
		content: ' ';
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		height: 1px;
		border-top: 1rpx solid #d9d9d9;
		color: #d9d9d9;
		left: 15px;
	}

	.weui-cell:first-child:before {
		display: none;
	}

	.weui-cell_active {
		background-color: #ececec;
	}

	.weui-cell_primary {
		-webkit-box-align: start;
		align-items: flex-start;
	}

	.weui-cell__bd {
		-webkit-box-flex: 1;
		flex: 1;
	}

	.weui-cell__ft {
		text-align: right;
		color: #999;
	}

	.weui-cell_access {
		color: inherit;
	}

	.weui-cell__ft_in-access {
		padding-right: 13px;
		position: relative;
	}

	.weui-cell__ft_in-access:after {
		content: ' ';
		display: inline-block;
		height: 6px;
		width: 6px;
		border-width: 2px 2px 0 0;
		border-color: #c8c8cd;
		border-style: solid;
		transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
		position: relative;
		top: -2px;
		position: absolute;
		top: 50%;
		margin-top: -4px;
		right: 2px;
	}

	.weui-cell_link {
		color: #586c94;
		font-size: 14px;
	}

	.weui-cell_link:active {
		background-color: #ececec;
	}

	.weui-cell_link:first-child:before {
		display: block;
	}

	.weui-icon-radio {
		margin-left: 3.2px;
		margin-right: 3.2px;
	}

	.weui-icon-checkbox_circle,
	.weui-icon-checkbox_success {
		margin-left: 4.6px;
		margin-right: 4.6px;
	}

	.weui-check__label:active {
		background-color: #ececec;
	}

	.weui-check {
		position: absolute;
		left: -9999px;
	}

	.weui-check__hd_in-checkbox {
		padding-right: 0.35em;
	}

	.weui-cell__ft_in-radio {
		padding-left: 0.35em;
	}

	.weui-cell_input {
		padding-top: 0;
		padding-bottom: 0;
	}

	.weui-label {
		width: 105px;
		word-wrap: break-word;
		word-break: break-all;
	}

	.weui-input {
		height: 2.58823529em;
		min-height: 2.58823529em;
		line-height: 2.58823529em;
	}

	.weui-toptips {
		position: fixed;
		transform: translateZ(0);
		top: 0;
		left: 0;
		right: 0;
		padding: 5px;
		font-size: 14px;
		text-align: center;
		color: #fff;
		z-index: 5000;
		word-wrap: break-word;
		word-break: break-all;
	}

	.weui-toptips_warn {
		background-color: #e64340;
	}

	.weui-textarea {
		display: block;
		width: 100%;
	}

	.weui-textarea-counter {
		color: #b2b2b2;
		text-align: right;
	}

	.weui-cell_warn,
	.weui-textarea-counter_warn {
		color: #e64340;
	}

	.weui-form-preview {
		position: relative;
		background-color: #fff;
	}

	.weui-form-preview:before {
		top: 0;
		border-top: 1rpx solid #d9d9d9;
	}

	.weui-form-preview:after,
	.weui-form-preview:before {
		content: ' ';
		position: absolute;
		left: 0;
		right: 0;
		height: 1px;
		color: #d9d9d9;
	}

	.weui-form-preview:after {
		bottom: 0;
		border-bottom: 1rpx solid #d9d9d9;
	}

	.weui-form-preview__value {
		font-size: 14px;
	}

	.weui-form-preview__value_in-hd {
		font-size: 26px;
	}

	.weui-form-preview__hd {
		position: relative;
		padding: 10px 15px;
		text-align: right;
		line-height: 2.5em;
	}

	.weui-form-preview__hd:after {
		content: ' ';
		position: absolute;
		left: 0;
		bottom: 0;
		right: 0;
		height: 1px;
		border-bottom: 1rpx solid #d9d9d9;
		color: #d9d9d9;
		left: 15px;
	}

	.weui-form-preview__bd {
		padding: 10px 15px;
		font-size: 0.9em;
		text-align: right;
		color: #999;
		line-height: 2;
	}

	.weui-form-preview__ft {
		position: relative;
		line-height: 50px;
		display: flex;
	}

	.weui-form-preview__ft:after {
		content: ' ';
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		height: 1px;
		border-top: 1rpx solid #d5d5d6;
		color: #d5d5d6;
	}

	.weui-form-preview__item {
		overflow: hidden;
	}

	.weui-form-preview__label {
		float: left;
		margin-right: 1em;
		min-width: 4em;
		color: #999;
		text-align: justify;
		text-align-last: justify;
	}

	.weui-form-preview__value {
		display: block;
		overflow: hidden;
		word-break: normal;
		word-wrap: break-word;
	}

	.weui-form-preview__btn {
		position: relative;
		display: block;
		-webkit-box-flex: 1;
		flex: 1;
		color: #3cc51f;
		text-align: center;
	}

	.weui-form-preview__btn:after {
		content: ' ';
		position: absolute;
		left: 0;
		top: 0;
		width: 1px;
		bottom: 0;
		border-left: 1rpx solid #d5d5d6;
		color: #d5d5d6;
	}

	.weui-form-preview__btn:first-child:after {
		display: none;
	}

	.weui-form-preview__btn_active {
		background-color: #eee;
	}

	.weui-form-preview__btn_default {
		color: #999;
	}

	.weui-form-preview__btn_primary {
		color: #0bb20c;
	}

	.weui-cell_select {
		padding: 0;
	}

	.weui-select {
		position: relative;
		padding-left: 15px;
		padding-right: 30px;
		height: 2.58823529em;
		min-height: 2.58823529em;
		line-height: 2.58823529em;
		border-right: 1rpx solid #d9d9d9;
	}

	.weui-select:before {
		content: ' ';
		display: inline-block;
		height: 6px;
		width: 6px;
		border-width: 2px 2px 0 0;
		border-color: #c8c8cd;
		border-style: solid;
		transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
		position: relative;
		top: -2px;
		position: absolute;
		top: 50%;
		right: 15px;
		margin-top: -4px;
	}

	.weui-select_in-select-after {
		padding-left: 0;
	}

	.weui-cell__bd_in-select-before,
	.weui-cell__hd_in-select-after {
		padding-left: 15px;
	}

	.weui-cell_vcode {
		padding-right: 0;
	}

	.weui-vcode-btn,
	.weui-vcode-img {
		margin-left: 5px;
		height: 2.58823529em;
		vertical-align: middle;
	}

	.weui-vcode-btn {
		display: inline-block;
		padding: 0 0.6em 0 0.7em;
		border-left: 1px solid #e5e5e5;
		line-height: 2.58823529em;
		font-size: 17px;
		color: #3cc51f;
		white-space: nowrap;
	}

	.weui-vcode-btn:active {
		color: #52a341;
	}

	.weui-cell_switch {
		padding-top: 6px;
		padding-bottom: 6px;
	}

	.weui-uploader__hd {
		display: flex;
		padding-bottom: 10px;
		-webkit-box-align: center;
		align-items: center;
	}

	.weui-uploader__title {
		-webkit-box-flex: 1;
		flex: 1;
	}

	.weui-uploader__info {
		color: #b2b2b2;
	}

	.weui-uploader__bd {
		margin-bottom: -4px;
		margin-right: -9px;
		overflow: hidden;
	}

	.weui-uploader__file {
		float: left;
		margin-right: 9px;
		margin-bottom: 9px;
	}

	.weui-uploader__img {
		display: block;
		width: 79px;
		height: 79px;
	}

	.weui-uploader__file_status {
		position: relative;
	}

	.weui-uploader__file_status:before {
		content: ' ';
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.5);
	}

	.weui-uploader__file-content {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: #fff;
	}

	.weui-uploader__input-box {
		float: left;
		position: relative;
		margin-right: 9px;
		margin-bottom: 9px;
		width: 77px;
		height: 77px;
		border: 1px solid #d9d9d9;
	}

	.weui-uploader__input-box:after,
	.weui-uploader__input-box:before {
		content: ' ';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #d9d9d9;
	}

	.weui-uploader__input-box:before {
		width: 2px;
		height: 39.5px;
	}

	.weui-uploader__input-box:after {
		width: 39.5px;
		height: 2px;
	}

	.weui-uploader__input-box:active {
		border-color: #999;
	}

	.weui-uploader__input-box:active:after,
	.weui-uploader__input-box:active:before {
		background-color: #999;
	}

	.weui-uploader__input {
		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}

	.weui-article {
		padding: 20px 15px;
		font-size: 15px;
	}

	.weui-article__section {
		margin-bottom: 1.5em;
	}

	.weui-article__h1 {
		font-size: 18px;
		font-weight: 400;
		margin-bottom: 0.9em;
	}

	.weui-article__h2 {
		font-size: 16px;
		font-weight: 400;
		margin-bottom: 0.34em;
	}

	.weui-article__h3 {
		font-weight: 400;
		font-size: 15px;
		margin-bottom: 0.34em;
	}

	.weui-article__p {
		margin: 0 0 0.8em;
	}

	.weui-msg {
		padding-top: 36px;
		text-align: center;
	}

	.weui-msg__link {
		display: inline;
		color: #586c94;
	}

	.weui-msg__icon-area {
		margin-bottom: 30px;
	}

	.weui-msg__text-area {
		margin-bottom: 25px;
		padding: 0 20px;
	}

	.weui-msg__title {
		margin-bottom: 5px;
		font-weight: 400;
		font-size: 20px;
	}

	.weui-msg__desc {
		font-size: 14px;
		color: #999;
	}

	.weui-msg__opr-area {
		margin-bottom: 25px;
	}

	.weui-msg__extra-area {
		margin-bottom: 15px;
		font-size: 14px;
		color: #999;
	}

	@media screen and (min-height: 438px) {
		.weui-msg__extra-area {
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			text-align: center;
		}
	}

	.weui-flex {
		display: flex;
	}

	.weui-flex__item {
		-webkit-box-flex: 1;
		flex: 1;
	}

	.weui-btn {
		margin-top: 15px;
	}

	.weui-btn:first-child {
		margin-top: 0;
	}

	.weui-btn-area {
		margin: 1.17647059em 15px 0.3em;
	}

	.weui-agree {
		display: block;
		padding: 0.5em 15px;
		font-size: 13px;
	}

	.weui-agree__text {
		color: #999;
	}

	.weui-agree__link {
		display: inline;
		color: #586c94;
	}

	.weui-agree__checkbox {
		position: absolute;
		left: -9999px;
	}

	.weui-agree__checkbox-icon {
		position: relative;
		top: 2px;
		display: inline-block;
		border: 1px solid #d1d1d1;
		background-color: #fff;
		border-radius: 3px;
		width: 11px;
		height: 11px;
	}

	.weui-agree__checkbox-icon-check {
		position: absolute;
		top: 1px;
		left: 1px;
	}

	.weui-footer {
		color: #999;
		font-size: 14px;
		text-align: center;
	}

	.weui-footer_fixed-bottom {
		position: fixed;
		bottom: 0.52em;
		left: 0;
		right: 0;
	}

	.weui-footer__links {
		font-size: 0;
	}

	.weui-footer__link {
		display: inline-block;
		vertical-align: top;
		margin: 0 0.62em;
		position: relative;
		font-size: 14px;
		color: #586c94;
	}

	.weui-footer__link:before {
		content: ' ';
		position: absolute;
		left: 0;
		top: 0;
		width: 1px;
		bottom: 0;
		border-left: 1rpx solid #c7c7c7;
		color: #c7c7c7;
		left: -0.65em;
		top: 0.36em;
		bottom: 0.36em;
	}

	.weui-footer__link:first-child:before {
		display: none;
	}

	.weui-footer__text {
		padding: 0 0.34em;
		font-size: 12px;
	}

	.weui-grids {
		border-top: 1rpx solid #d9d9d9;
		border-left: 1rpx solid #d9d9d9;
		overflow: hidden;
	}

	.weui-grid {
		position: relative;
		float: left;
		padding: 20px 10px;
		width: 33.33333333%;
		box-sizing: border-box;
		border-right: 1rpx solid #d9d9d9;
		border-bottom: 1rpx solid #d9d9d9;
	}

	.weui-grid_active {
		background-color: #ececec;
	}

	.weui-grid__icon {
		display: block;
		width: 28px;
		height: 28px;
		margin: 0 auto;
	}

	.weui-grid__label {
		margin-top: 5px;
		display: block;
		text-align: center;
		color: #000;
		font-size: 14px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.weui-loading {
		margin: 0 5px;
		width: 20px;
		height: 20px;
		display: inline-block;
		vertical-align: middle;
		animation: a 1s steps(12) infinite;
		background: transparent url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=) no-repeat;
		background-size: 100%;
	}

	.weui-loading.weui-loading_transparent {
		background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 100 100'%3E%3Cpath fill='none' d='M0 0h100v100H0z'/%3E%3Crect xmlns='http://www.w3.org/2000/svg' width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.56)' rx='5' ry='5' transform='translate(0 -30)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.5)' rx='5' ry='5' transform='rotate(30 105.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.43)' rx='5' ry='5' transform='rotate(60 75.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.38)' rx='5' ry='5' transform='rotate(90 65 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.32)' rx='5' ry='5' transform='rotate(120 58.66 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.28)' rx='5' ry='5' transform='rotate(150 54.02 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.25)' rx='5' ry='5' transform='rotate(180 50 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.2)' rx='5' ry='5' transform='rotate(-150 45.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.17)' rx='5' ry='5' transform='rotate(-120 41.34 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.14)' rx='5' ry='5' transform='rotate(-90 35 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.1)' rx='5' ry='5' transform='rotate(-60 24.02 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.03)' rx='5' ry='5' transform='rotate(-30 -5.98 65)'/%3E%3C/svg%3E");
	}

	@-webkit-keyframes a {
		0% {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(1turn);
		}
	}

	@keyframes a {
		0% {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(1turn);
		}
	}

	.weui-badge {
		display: inline-block;
		padding: 0.15em 0.4em;
		min-width: 8px;
		border-radius: 18px;
		background-color: #e64340;
		color: #fff;
		line-height: 1.2;
		text-align: center;
		font-size: 12px;
		vertical-align: middle;
	}

	.weui-badge_dot {
		padding: 0.4em;
		min-width: 0;
	}

	.weui-loadmore {
		width: 65%;
		margin: 1.5em auto;
		line-height: 1.6em;
		font-size: 14px;
		text-align: center;
	}

	.weui-loadmore__tips {
		display: inline-block;
		vertical-align: middle;
	}

	.weui-loadmore_line {
		border-top: 1px solid #e5e5e5;
		margin-top: 2.4em;
	}

	.weui-loadmore__tips_in-line {
		position: relative;
		top: -0.9em;
		padding: 0 0.55em;
		background-color: #fff;
		color: #999;
	}

	.weui-loadmore__tips_in-dot {
		position: relative;
		padding: 0 0.16em;
		width: 4px;
		height: 1.6em;
	}

	.weui-loadmore__tips_in-dot:before {
		content: ' ';
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -1px;
		margin-left: -2px;
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background-color: #e5e5e5;
	}

	.weui-panel {
		background-color: #fff;
		margin-top: 10px;
		position: relative;
		overflow: hidden;
	}

	.weui-panel:first-child {
		margin-top: 0;
	}

	.weui-panel:before {
		top: 0;
		border-top: 1rpx solid #e5e5e5;
	}

	.weui-panel:after,
	.weui-panel:before {
		content: ' ';
		position: absolute;
		left: 0;
		right: 0;
		height: 1px;
		color: #e5e5e5;
	}

	.weui-panel:after {
		bottom: 0;
		border-bottom: 1rpx solid #e5e5e5;
	}

	.weui-panel__hd {
		padding: 14px 15px 10px;
		color: #999;
		font-size: 13px;
		position: relative;
	}

	.weui-panel__hd:after {
		content: ' ';
		position: absolute;
		left: 0;
		bottom: 0;
		right: 0;
		height: 1px;
		border-bottom: 1rpx solid #e5e5e5;
		color: #e5e5e5;
		left: 15px;
	}

	.weui-media-box {
		padding: 15px;
		position: relative;
	}

	.weui-media-box:before {
		content: ' ';
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		height: 1px;
		border-top: 1rpx solid #e5e5e5;
		color: #e5e5e5;
		left: 15px;
	}

	.weui-media-box:first-child:before {
		display: none;
	}

	.weui-media-box__title {
		font-weight: 400;
		font-size: 17px;
		width: auto;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		word-wrap: normal;
		word-wrap: break-word;
		word-break: break-all;
	}

	.weui-media-box__desc {
		color: #999;
		font-size: 13px;
		line-height: 1.2;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.weui-media-box__info {
		margin-top: 15px;
		padding-bottom: 5px;
		font-size: 13px;
		color: #cecece;
		line-height: 1em;
		list-style: none;
		overflow: hidden;
	}

	.weui-media-box__info__meta {
		float: left;
		padding-right: 1em;
	}

	.weui-media-box__info__meta_extra {
		padding-left: 1em;
		border-left: 1px solid #cecece;
	}

	.weui-media-box__title_in-text {
		margin-bottom: 8px;
	}

	.weui-media-box_appmsg {
		display: flex;
		-webkit-box-align: center;
		align-items: center;
	}

	.weui-media-box__thumb {
		width: 100%;
		height: 100%;
		vertical-align: top;
	}

	.weui-media-box__hd_in-appmsg {
		margin-right: 0.8em;
		width: 60px;
		height: 60px;
		line-height: 60px;
		text-align: center;
	}

	.weui-media-box__bd_in-appmsg {
		-webkit-box-flex: 1;
		flex: 1;
		min-width: 0;
	}

	.weui-media-box_small-appmsg {
		padding: 0;
	}

	.weui-cells_in-small-appmsg {
		margin-top: 0;
	}

	.weui-cells_in-small-appmsg:before {
		display: none;
	}

	.weui-progress {
		display: flex;
		-webkit-box-align: center;
		align-items: center;
	}

	.weui-progress__bar {
		-webkit-box-flex: 1;
		flex: 1;
	}

	.weui-progress__opr {
		margin-left: 15px;
		font-size: 0;
	}

	.weui-navbar {
		display: flex;
		position: absolute;
		z-index: 500;
		top: 0;
		width: 100%;
		border-bottom: 1rpx solid #ccc;
	}

	.weui-navbar__item {
		position: relative;
		display: block;
		-webkit-box-flex: 1;
		flex: 1;
		padding: 13px 0;
		text-align: center;
		font-size: 0;
	}

	.weui-navbar__item.weui-bar__item_on {
		color: #1aad19;
	}

	.weui-navbar__slider {
		position: absolute;
		content: ' ';
		left: 0;
		bottom: 0;
		width: 6em;
		height: 3px;
		background-color: #1aad19;
		transition: transform 0.3s;
		transition: transform 0.3s, -webkit-transform 0.3s;
		transition: transform 0.3s, -webkit-transform 0.3s;
	}

	.weui-navbar__title {
		display: inline-block;
		font-size: 15px;
		max-width: 8em;
		width: auto;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		word-wrap: normal;
	}

	.weui-tab {
		position: relative;
		height: 100%;
	}

	.weui-tab__panel {
		box-sizing: border-box;
		height: 100%;
		padding-top: 50px;
		overflow: auto;
		-webkit-overflow-scrolling: touch;
	}

	.weui-search-bar {
		position: relative;
		padding: 8px 10px;
		display: flex;
		box-sizing: border-box;
		background-color: #efeff4;
		border-top: 1rpx solid #d7d6dc;
		border-bottom: 1rpx solid #d7d6dc;
	}

	.weui-icon-search {
		margin-right: 8px;
		font-size: inherit;
	}

	.weui-icon-search_in-box {
		position: absolute;
		left: 10px;
		top: 7px;
	}

	.weui-search-bar__text {
		display: inline-block;
		font-size: 14px;
		vertical-align: middle;
	}

	.weui-search-bar__form {
		position: relative;
		-webkit-box-flex: 1;
		flex: auto;
		border-radius: 5px;
		background: #fff;
		border: 1rpx solid #e6e6ea;
	}

	.weui-search-bar__box {
		position: relative;
		padding-left: 30px;
		padding-right: 30px;
		width: 100%;
		box-sizing: border-box;
		z-index: 1;
	}

	.weui-search-bar__input {
		height: 28px;
		line-height: 28px;
		font-size: 14px;
	}

	.weui-icon-clear {
		position: absolute;
		top: 0;
		right: 0;
		padding: 7px 8px;
		font-size: 0;
	}

	.weui-search-bar__label {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 2;
		border-radius: 3px;
		text-align: center;
		color: #9b9b9b;
		background: #fff;
		line-height: 28px;
	}

	.weui-search-bar__cancel-btn {
		margin-left: 10px;
		line-height: 28px;
		color: #09bb07;
		white-space: nowrap;
	}

	.cu-form-group {
		min-height: 85rpx;
	}

	.cu-form-group .title {
		min-width: calc(4em + 30rpx);
	}

	.box {
		width: 100%;
	}

	.page {
		padding: 7px;
	}

	.right {
		flex: 1;
		margin-left: 50px;
	}

	.weui-cells:before {
		top: 0;
		border-top: 1rpx solid white;
	}

	.weui-cell {
		line-height: 3.5rem;
	}

	.weui-cells:after {
		bottom: 0;
		border-bottom: 1rpx solid white;
	}

	.detailText {
		width: 100%;
		line-height: 1;
		text-overflow: ellipsis;
		word-break: break-all;
	}

	.my_button {
		width: 80%;
		background: linear-gradient(90deg, #FF484A 0%, #FF716C 100%) !important;
		box-shadow: 0px 6px 30px 0px #FF4B4C;
		border-radius: 44px;
		margin-top: 145rpx;
		/* background-color: #7acfa6 !important; */
	}

	.icontent {
		display: flex;
		flex-direction: column;
	}

	.image_content {
		width: 100%;
		height: 100%;
	}

	.image {
		float: left;
		/* margin-left: 14px; */
		margin-bottom: 12px;
		width: 100px;
		height: 100px;
		border: 2px rgb(223, 220, 220) dashed;
		text-align: center;
		position: relative;
	}

	.deleteImg {
		position: absolute;
		top: 0rpx;
		right: 0rpx;
		width: 50rpx;
		height: 50rpx;
		z-index: 1;
	}

	.moment_img {
		width: 90px;
		height: 90px;
	}

	.toppic {
		font-size: 12px;
		color: grey;
	}

	.add {
		position: fixed;
		width: 42px;
		height: 42px;
		bottom: 20px;
		right: 20px;
	}

	.add_icon {
		position: fixed;
		width: 42px;
		height: 42px;
		bottom: 20px;
		right: 20px;
	}

	.picker {
		text-align: left !important;
		text-align: right;
		/* color: #666666; */
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 114rpx;
	}

	.jiben {
		font-size: 34rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #141414;
		margin-left: 15rpx;
	}

	.imagess {
		display: flex;
		align-items: center;
		margin-left: 30rpx;
		/* justify-content: center; */
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #999999;
	}

	.beijing {
		background: #FFFFFF;
		border-radius: 20px;
		padding: 30rpx 30rpx;
		margin-top: 30rpx;
	}
</style>
