<template>
    <block>
        <cu-custom bgColor="bgmain" :isBack="true">
            <view slot="content">发布</view>
        </cu-custom>

        <form @submit.stop.prevent="formSubmit" @reset.stop.prevent="formReset">
			
			<view class="margin box padding">
				<view class="padding-bottom flex align-center">
					<image class="icon margin-right-sm" src="/static/icon/fabu/content.png" mode="" />
					<view class="text-lg text-bold">物品信息</view>
				</view>
				<input placeholder="请输入物品名称" :value="goods" @input="goodsFun" name="goods" class="name_input" placeholder-style="color:#999999;" />
				<view class="margin-top">
				    <view v-if="type == 'video'">
				        <image v-if="video == ''" @tap="choose" class="add" src="/static/images/article/add.png"></image>
				        <view class="preview" v-else>
				            <video class="add margin-right" :src="video"></video>
				            <text @tap="delvideo" class="cuIcon-close close"></text>
				        </view>
				    </view>
				    <view class="flex" v-else-if="type == 'image'">
				        <block key="index" v-for="(item, index) in picList" :key="index">
				            <view class="preview">
				                <image class="add margin-right" :src="item"></image>
				                <text @tap="delimg" :data-index="index" class="cuIcon-close close"></text>
				            </view>
				        </block>
				        <image v-if="picList.length < 3" @tap="choose" class="add" src="/static/images/article/add.png"></image>
				    </view>
				    <image v-else @tap="choose" class="add" src="/static/images/article/add.png"></image>
				</view>
				<view class="margin-top" style="color: #999999;">添加图片/视频</view>
			</view>
			
            <view class="padding box margin">
                <view class="flex justify-between padding-bottom" style="border-bottom: 1rpx solid #f5f5f5;">
                    <view class="text-lg text-bold">所属分类</view>
                    <picker @change="bindPickerChange" :value="cate" :range="cateList">
                        {{ cateList[cate] }}
                        <text class="cuIcon-right"></text>
                    </picker>
                </view>
               <!-- <view class="input_item flex margin-top">
                    <view class="item_name text-bold text-lg">丢失/拾取物品</view>
                    <input name="goods" maxlength="40" :value="goods" @input="goodsFun" placeholder="请输入丢失/拾取的物品" />
                </view> -->
                <view class="input_item flex margin-top">
                    <view class="item_name text-bold text-lg">丢失/拾取地点</view>
                    <input name="place" maxlength="40" placeholder="请输入丢失/拾取地点" />
                </view>
                <view class="input_item flex justify-between">
                    <view class="item_name text-bold text-lg">丢失/拾取时间</view>
                    <input name="date" maxlength="40" placeholder="请输入丢失/拾取时间" />
                </view>
                <view class="input_item flex">
                    <view class="item_name text-bold text-lg">认领方式</view>
                    <input name="method" placeholder="失物招领可填写在哪里认领" type="" />
                </view>
				<view class="input_item flex">
				    <view class="item_name text-bold text-lg">联系电话</view>
				    <input name="phone" placeholder="请输入联系电话" type="number" />
				</view>
				<textarea class="margin-top-sm" name="remark" placeholder="请输入备注" placeholder-style="color:#999999;"></textarea>
                <!-- <view class="btn" bindtap="submit">发布</view> -->
            </view>
			
            <!-- <view class="agreement margin-top-xl align-center flex margin-left">
                <checkbox class="checkbox" :checked="check" @tap="checkagree"></checkbox>
                <view @tap="agreelink">
                    我已阅读并同意
                    <text class="text-red">《发帖须知》</text>
                </view>
            </view> -->
			<button class="btns" type="primary" formType="submit">发布</button>
        </form>
    </block>
</template>

<script>
// gc_school/pages/article/post.js
import siteInfo from '@/siteinfo.js';
var app = getApp();
export default {
    data() {
        return {
            type: '',
            video: '',
            addedCount: 0,
            picList: [],
            images: [],
            content: '',
            cateList: ['请选择', '失物招领', '寻物启事'],
            cate: 0,
            date: '请选择',
            is_click: true,
            goods: '',
			check:false
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {},
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
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {
		//协议勾选
		checkagree() {
		    this.setData({
		        check: !this.check
		    });
		},
        bindPickerChange(e) {
            this.setData({
                cate: e.detail.value
            });
        },

        bindPickerDate(e) {
            this.setData({
                date: e.detail.value
            });
        },

        choose() {
            var that = this;
            uni.chooseMedia({
                count: 3 - that.addedCount,

                success(res) {
                    console.log(res);
                    console.log(res.type);
                    that.setData({
                        type: res.type
                    });

                    if (res.type == 'image') {
                        that.uploadimg(res.tempFiles, 'ImgPost'); // wx.hideLoading({})
                    } else {
                        that.uploadvideo(res.tempFiles);
                    }
                }
            });
        },

        uploadvideo(data) {
            uni.showLoading({
                title: '上传中...',
                mask: true
            });
            var that = this;
            console.log(data[0]);
            uni.uploadFile({
                // url: app.globalData.util.url() + 'c=entry&a=wxapp&do=VideoPost&m=gc_school',
                // filePath: data[0]['tempFilePath'],
                // name: 'file',
                // formData: null,
				
				url: siteInfo.url+'Base/upload',
				filePath: data[0]['tempFilePath'],
				header:{
					'Authorization':uni.getStorageSync('token')
				},
				name: 'file',
				formData: {
					'wxapp_id':siteInfo.uniacid
				},
                success: (resp) => {
                    console.log(JSON.parse(resp.data));
                    that.setData({
                        video: JSON.parse(resp.data).data
                    });
                    uni.hideLoading({});
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
						// console.log("上传返回",resp.data)
                        var pic = JSON.parse(resp.data);
						console.log("打印",pic)
                        if (pic.status == 200) {
                            count++;
                            var picList = that.picList;
                            picList.push(pic.data);
                            var images = that.images.concat(pic.data);
                            that.setData({
                                images: images,
                                addedCount: count,
                                picList: picList
                            });
                            console.log(count);
                            console.log('值', that.picList.length);

                            if (count == that.picList.length) {
                                uni.hideLoading({});
                            }
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

        //删除视频
        delvideo() {
            this.setData({
                video: ''
            });
            console.log(this.video);
        },

        //删除图片
        delimg(e) {
            var index = e.currentTarget.dataset.index;
            var addcount = this.addedCount - 1;
            this.picList.splice(index, 1);
            this.setData({
                picList: this.picList,
                addedCount: addcount
            });
        },

        goodsFun(e) {
            this.setData({
                goods: e.detail.value.replace(/\s+/g, '')
            });
        },

        //发布
        formSubmit(e) {
			var self = this;
            var place = e.detail.value.place.replace(/\s+/g, '');
            var phone = e.detail.value.phone.replace(/\s+/g, ''); // var goods = e.detail.value.goods.replace(/\s+/g, '')
            var remark = e.detail.value.remark.replace(/\s+/g, '');
            var date = e.detail.value.date.replace(/\s+/g, '');
            var method = e.detail.value.method.replace(/\s+/g, '');
            var myreg = /^1[3456789]\d{9}$/;

            if (this.cate == 0) {
                app.globalData.util.message('请选择分类', '', 'error');
                return;
            }

            if (this.goods == '') {
                app.globalData.util.message('请输入物品', '', 'error');
                return;
            }

            if (place == '') {
                app.globalData.util.message('请输入地点', '', 'error');
                return;
            }

            if (phone) {
                if (!myreg.test(phone)) {
                    app.globalData.util.message('请输入正确的手机号', '', 'error');
                    return;
                }
            }
			// if(!this.check)
			// {
			// 	app.globalData.util.message('请先勾选发帖须知', '', 'error');
			// 	return;
			// }

            if (this.is_click) {
                this.setData({
                    is_click: false
                });
                if(self.picList.length>0)
				{
					var image = self.picList.join(',')
					// var image = JSON.stringify(self.picList)
				}
				else{
					var image = self.picList
				}
                app.globalData.util.request({
                    url: 'ZhInfo/add',
                    method: 'POST',
                    data: {
                        pick_date: date,
                        address: place,
                        claim_method: method,
                        title: self.goods,
                        phone: phone,
                        type: self.cate,
                        remarks: remark,
                        // media_type: self.type,
                        video: self.video,
                        image: image,
                        s_id: uni.getStorageSync('schoolId')
                    },

                    success(res) {
                        console.log(res.data);
                        self.setData({
                            goods: ''
                        }); // self.setData({
                        //   is_click:true
                        // })

                        if (res.data.status == 200) {
                            uni.showToast({
                                title: '提交成功',
                                icon: 'success'
                            });
                            setTimeout(function () {
                                // app.globalData.isload = true;
								console.log("跳转啊")
                                uni.redirectTo({
                                    url: '/gc_school/pages/lost/my'
                                });
                            }, 1000);
                        }
                    },

                    complete() {
                        self.setData({
                            is_click: true
                        });
                    }
                },true);
            } else {
                uni.showToast({
                    title: '请勿重复点击',
                    icon: 'none'
                });
            }
        },

        formReset() {
            console.log('占位：函数 formReset 未声明');
        }
    }
};
</script>
<style>
page {
    background: #F0F0F0;
}
.icon{
	width: 32rpx;
	height: 32rpx;
}
.box{
	border-radius: 20rpx;
	background-color: white;
}
.name_input{
	border-bottom: 1rpx solid #EEEEEE;
	/* border: 1rpx solid #EEEEEE; */
	width: 100%;
	text-align: left;
	padding-left: 0;
	font-size: 30rpx;
	height: 80rpx;
	/* padding-bottom: 20rpx; */
}
/* .bgmain {
    background-color: #ff6444;
    color: white;
} */
textarea {
    background: #F9F9F9;
    width: 100%;
    padding: 10rpx;
    font-size: 30rpx;
	border-radius: 20rpx;
}
.add {
    width: 200rpx;
    height: 200rpx;
}
.btn {
    display: block;
    background: #ff6344;
    color: white;
    width: 90%;
    margin: 100rpx auto;
    border-radius: 50rpx;
    padding: 25rpx 0;
    font-size: 28rpx;
}
.btns {
    display: block;
    color: white;
    width: 90%;
    margin: 70rpx auto 40rpx;
    border-radius: 50rpx;
    padding: 8rpx 0;
    font-size: 32rpx;
	border: none;
	background: linear-gradient(90deg, #FF484A 0%, #FF716C 100%);
}
.preview {
    position: relative;
    width: 230rpx;
}
.close {
    position: absolute;
    right: 30rpx;
    font-size: 40rpx;
}
.input_item {
    margin: 30rpx 0;
    border-bottom: 1rpx solid #f5f5f5;
    padding-bottom: 25rpx;
    font-size: 28rpx;
    align-items: center;
}
.item_name {
    flex-shrink: 0;
}
input {
    /* border:1rpx solid black; */
    width: 100%;
    text-align: right;
    padding-left: 20rpx;
}
.checkbox {
    transform: scale(0.8, 0.8);
    /* width: 100%; */
    /* text-align: center; */
}
</style>
