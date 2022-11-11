<template>
    <block>
        <!-- gc_school/pages/shop/addgoods.wxml -->
        <cu-custom bgColor="bgmain" :isBack="true">
            <view slot="content">店铺信息</view>
        </cu-custom>

        <view class="box">
            <view class="flex align-center text-bold">
                <!-- <text class="cuIcon-more"></text> -->
                <view class="text-red text-xxl">*</view>
                <view class="text-lg">店铺信息</view>
            </view>
            <!-- <view class="name text-lg margin-top">商家名称</view> -->
            <!-- <view style=" position: relative;">
    <textarea class="textarea" maxlength="{{maxTextLen}}" value="{{name}}" bindinput="textarea" placeholder-style="color:#D1D1D1;" placeholder="请输入名称"></textarea>
    <view class="left_num">{{word_num}}/{{maxTextLen}}</view>
  </view> -->

            <view class="flex justify-between size30 margin-top align-center">
                <view>商家名称</view>
                <input @input="textarea" :value="name" placeholder-style="color:lightgray" placeholder="请输入商家名称" />
            </view>

            <view class="flex justify-between size30 margin-top align-center">
                <view>商家地址</view>
                <input @input="addressFun" :value="address" placeholder-style="color:lightgray" placeholder="请输入商家地址" />
            </view>
            <view class="flex justify-between size30 margin-top align-center">
                <view>商家电话</view>
                <input @input="phoneFun" :value="phone" placeholder-style="color:lightgray" placeholder="请输入商家电话" type="numebr" />
            </view>

            <view class="flex justify-between size30 margin-top align-center">
                <view>营业状态</view>
                <picker @change="bindStatusChange" :value="status_index" :range="statusArray">
                    {{ statusArray[status_index] }}
                    <text class="cuIcon-right"></text>
                </picker>
            </view>

            <view class="flex justify-between size30 margin-top align-center">
                <view>营业时间</view>
                <picker @change="bindTimeChange" :value="time" mode="time" start="00:00" end="23:59">
                    {{ time }}
                    <text class="cuIcon-right"></text>
                </picker>
            </view>

            <view class="flex justify-between size30 margin-top align-center">
                <view>打烊时间</view>
                <picker @change="bindTimeChange1" :value="time_end" mode="time" start="00:00" end="23:59">
                    {{ time_end }}
                    <text class="cuIcon-right"></text>
                </picker>
            </view>

            <view class="size30 margin-top">店铺图片</view>
            <image @tap="choose" class="img" :src="img ? img : '../../../images/article/add.png'"></image>

            <!-- <view class="flex justify-between size30 margin-top align-center">
    <view>商品分类</view>
    <picker bindchange="PickerChange" value="{{cate_index}}" range="{{cate}}" range-key='name'>
      <view class="picker text-gray">
        {{cate[cate_index].name?cate[cate_index].name:'选择分类'}}
        <text class="cuIcon-right"></text>
      </view>
    </picker>
  </view> -->

            <!-- <view class="size30 margin-top">店铺图片</view>
  <image bindtap="choose" class="img" src="{{img?img:'../../../images/article/add.png'}}"></image> -->
        </view>

        <view class="flex btn_row justify-between">
            <view @tap="submit" class="btn_">提交</view>
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
            time: '',
            time_end: '',
            statusArray: ['正常营业','暂停营业'],
            status_index: 0,
            address: '',
            phone: '',
            word_left: '',
			addedCount: 0,
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        this.getInfo();
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
        bindTimeChange: function (e) {
            console.log('picker发送选择改变，携带值为', e.detail.value);
            this.setData({
                time: e.detail.value
            });
        },

        bindStatusChange(e) {
            this.setData({
                status_index: e.detail.value
            });
        },

        addressFun(e) {
            var value = e.detail.value.replace(/\s+/g, '');
            this.setData({
                address: value
            });
        },

        phoneFun(e) {
            var value = e.detail.value.replace(/\s+/g, '');
            this.setData({
                phone: value
            });
        },

        bindTimeChange1: function (e) {
            this.setData({
                time_end: e.detail.value
            });
        },

        getInfo() {
            var that = this;
            app.globalData.util.request({
                url: 'ZhBusiness/view',
				method: 'GET',
                data: {
                    s_id: uni.getStorageSync('schoolId')
                },

                success(res) {
                    console.log(res.data.data);
                    that.setData({
                        name: res.data.data.business_name,
                        id: res.data.data.business_id,
                        address: res.data.data.business_address,
                        phone: res.data.data.phone,
                        img: res.data.data.business_image,
                        time: res.data.data.start_time,
                        time_end: res.data.data.end_time,
                        // word_num: res.data.data.name.length,
                        status_index: parseInt(res.data.data.status) - 1
                    });
                }
            },true);
        },

        //分类选择
        PickerChange(e) {
            this.setData({
                cate_index: e.detail.value,
                cate_id: this.cate[e.detail.value].id
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
                                title: pic.message,
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
            console.log(this.cate_id);
            var that = this;

            if (!this.name) {
                app.globalData.util.message('请输入名称', '', 'error');
                return false;
            }

            if (!this.address) {
                app.globalData.util.message('请输入商家地址', '', 'error');
                return false;
            }

            var myreg = /^1[3456789]\d{9}$/;

            if (!this.phone) {
                app.globalData.util.message('请输入手机号', '', 'error');
                return false;
            }

            if (!myreg.test(this.phone)) {
                app.globalData.util.message('手机号码格式有误', '', 'error');
                return false;
            }

            if (!this.img) {
                app.globalData.util.message('请上传图片', '', 'error');
                return false;
            }

            app.globalData.util.request({
                url: 'ZhBusiness/update',
				method: 'GET',
                data: {
                    // img:this.data.img,
                    business_name: this.name,
                    business_address: this.address,
                    phone: this.phone,
                    business_image: this.img,
                    start_time: this.time,
                    end_time: this.time_end,
                    s_id: uni.getStorageSync('schoolId'),
                    business_id: this.id,
                    status: parseInt(this.status_index) + 1
                },

                success(res) {
                    if (res.data.status == 200) {
                        uni.showToast({
                            title: res.data.msg
                        });
						this.getInfo()
                    }
                }
            },true);
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
    width: 90%;
    margin-left: 5%;
    height: 80rpx;
    line-height: 80rpx;
    background: #ff6344;
    color: white;
    text-align: center;
    border-radius: 10rpx;
    font-size: 30rpx;
}
input {
    /* border: 1rpx solid black; */
    text-align: right;
    font-size: 28rpx;
    width: 200rpx;
}
.img {
    margin-top: 30rpx;
    width: 200rpx;
    height: 200rpx;
}
</style>
