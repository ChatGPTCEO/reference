<template>
    <block>
        <!-- gc_school/pages/shop/addgoods.wxml -->
        <cu-custom bgColor="bgmain" :isBack="true">
            <view slot="content">商品管理</view>
        </cu-custom>

        <view class="box">
            <view class="flex align-center text-bold">
                <!-- <text class="cuIcon-more"></text> -->
                <view class="text-red text-xxl">*</view>
                <view class="text-lg">商品信息</view>
            </view>
            <view class="name text-lg margin-top">名称</view>
            <view style="position: relative">
                <textarea class="textarea" :maxlength="maxTextLen" :value="name" @input="textarea" placeholder-style="color:#D1D1D1;" placeholder="请输入名称"></textarea>
                <view class="left_num">{{ word_num }}/{{ maxTextLen }}</view>
            </view>

            <view class="flex justify-between size30 margin-top align-center">
                <view>商品分类</view>
                <picker @change="PickerChange" :value="cate_index" :range="cate" range-key="goods_type_name">
                    <view class="picker text-gray">
                        {{ cate[cate_index].goods_type_name ? cate[cate_index].goods_type_name : '选择分类' }}
                        <text class="cuIcon-right"></text>
                    </view>
                </picker>
            </view>

            <view class="flex justify-between size30 margin-top align-center">
                <view>商品价格</view>
                <input class="name_input text-right" :value="price" @input="priceFun" placeholder-style="color:#D1D1D1;" placeholder="请输入价格" type="digit" />
            </view>

            <view class="size30 margin-top">商品图片</view>
            <image @tap="choose" class="img" :src="img ? img : '/static/images/article/add.png'"></image>
        </view>

        <view class="flex btn_row justify-between">
            <view @tap="submit" data-status="2" class="btn_">存为草稿</view>
            <view @tap="submit" data-status="1" class="btn_">发布上架</view>
        </view>
    </block>
</template>

<script>
// gc_school/pages/shop/addgoods.js
import siteInfo from '@/siteinfo.js';
var app = getApp();
export default {
    data() {
        return {
            word_num: 0,
            maxTextLen: 20,
            cate: [],
            cate_index: 0,
            img: '',
            name: '',
            price: '',
            cate_id: 0,
            id: 0,
            word_left: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        this.getCate();

        if (options.id) {
            this.setData({
                id: options.id
            });
            this.getInfo();
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {},
    /**
     * 页面上拉触底事件的处理函数
     */
    // onShareAppMessage: function () {
    // }
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */ methods: {
        getInfo() {
            var that = this;
            app.globalData.util.request({
                url: 'ZhGoods/view',
				method: 'GET',
                data: {
                    id: that.id,
					s_id: uni.getStorageSync('schoolId')
                },

                success(res) {
                    console.log(res.data.data);
                    that.setData({
                        name: res.data.data.goods_name,
                        price: res.data.data.price,
                        img: res.data.data.goods_img,
                        cate_id: res.data.data.goods_type_id,
                        word_num: res.data.data.goods_name.length
                    });

                    for (var i = 0; i < that.cate.length; i++) {
                        if (that.cate[i].id == res.data.data.goods_type_id) {
                            that.setData({
                                cate_index: i
                            });
                        }
                    }
                }
            },true);
        },

        getCate() {
            var that = this;
            app.globalData.util.request({
                url: 'ZhGoodsType/index',
				method: 'GET',
                data: {
                    s_id: uni.getStorageSync('schoolId')
                },

                success(res) {
                    that.cate = res.data.data.list
                    that.cate_id = res.data.data.list[0].goods_type_id
                }
            },true);
        },

        //分类选择
        PickerChange(e) {
            this.setData({
                cate_index: e.detail.value,
                cate_id: this.cate[e.detail.value].goods_type_id
            });
        },

        //图片上传
        choose() {
           var that = this;
           uni.chooseMedia({
               count: 3 - that.addedCount,
               success(res) {
                   that.uploadimg(res.tempFiles, 'ImgPost'); // wx.hideLoading({})
               }
           });
        },
        
        
        uploadimg: function (data, method, type) {
            uni.showLoading({
                title: '上传中...',
                mask: true
            });
            var that = this; // var count = that.data.addedCount + data.length;
            var count = that.addedCount;
            for (var i = 0; i < data.length; i++) {
                uni.uploadFile({
                    url: siteInfo.url+'Base/upload',
                    filePath: data[i]['tempFilePath'],
                    header:{
                    	'Authorization':uni.getStorageSync('token')
                    },
                    name: 'file',
                    formData: {
                    	'wxapp_id':siteInfo.uniacid
                    },
                    success: (resp) => {
                        var pic = JSON.parse(resp.data);
        				console.log("打印",pic)
                        if (pic.status == 200) {
                            that.setData({
                                addedCount: count,
                                img: pic.data
                            });
                            uni.hideLoading({});
                        } else {
                            uni.showToast({
                                title: pic.msg,
                                icon: 'none'
                            });
                        }
                    }
                });
            }
        },

        priceFun(e) {
            this.setData({
                price: e.detail.value
            });
        },

        textarea(e) {
            var value = e.detail.value.replace(/\s+/g, '');
            this.setData({
                word_num: value.length,
                word_left: 20 - value.length,
                name: value
            });
        },

        submit(e) {
            if (!this.name) {
                app.globalData.util.message('请输入名称', '', 'error');
                return false;
            }

            if (this.price <= 0) {
                app.globalData.util.message('请输入价格', '', 'error');
                return false;
            }

            if (!this.cate_id) {
                app.globalData.util.message('请选择分类', '', 'error');
                return false;
            }

            if (!this.img) {
                app.globalData.util.message('请上传图片', '', 'error');
                return false;
            }
			if(!this.id){
				app.globalData.util.request({
				    url: 'ZhGoods/add',
				    data: {
				        goods_img: this.img,
				        goods_name: this.name,
				        price: this.price,
				        goods_type_id: this.cate_id,
				        s_id: uni.getStorageSync('schoolId'),
				        status: e.currentTarget.dataset.status
				    },
				
				    success(res) {
				        if (res.data.status == 200) {
				            uni.showToast({
				                title: res.data.message
				            });
				            setTimeout(function () {
				                uni.redirectTo({
				                    url: '/gc_school/pages/shop/goods'
				                });
				            }, 1000);
				        }
				    }
				},true);
			}else {
				app.globalData.util.request({
				    url: 'ZhGoods/update',
				    data: {
				        goods_img: this.img,
				        goods_name: this.name,
				        price: this.price,
				        goods_type_id: this.cate_id,
				        s_id: uni.getStorageSync('schoolId'),
				        status: e.currentTarget.dataset.status,
						id: this.id
				    },
				
				    success(res) {
				        if (res.data.status == 200) {
				            uni.showToast({
				                title: res.data.message
				            });
				            setTimeout(function () {
				                uni.redirectTo({
				                    url: '/gc_school/pages/shop/goods'
				                });
				            }, 1000);
				        }
				    }
				},true);
			}

            
        }
    }
};
</script>
<style>
/* gc_school/pages/shop/addgoods.wxss */
page {
    background: #f9f9f9;
}
.box {
    background: white;
    border-radius: 10rpx;
    margin: 30rpx;
    padding: 30rpx;
}
.textarea {
    background: #f9f9f9;
    border-radius: 10rpx;
    width: 100%;
    height: 150rpx;
    margin-top: 20rpx;
    padding: 20rpx;
}
.left_num {
    position: absolute;
    right: 20rpx;
    bottom: 20rpx;
    color: #d1d1d1;
}
.size30 {
    font-size: 30rpx;
}
.name_input {
    width: 50%;
}
.img {
    margin-top: 30rpx;
    width: 200rpx;
    height: 200rpx;
}
.btn_row {
    margin: 70rpx 50rpx 30rpx;
}
.btn_:first-child {
    background: #00bb69 !important;
}
.btn_ {
    width: 300rpx;
    height: 80rpx;
    line-height: 80rpx;
    background: #ff6344;
    color: white;
    text-align: center;
    border-radius: 10rpx;
    font-size: 30rpx;
}
</style>
