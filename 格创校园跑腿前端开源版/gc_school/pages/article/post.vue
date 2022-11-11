<template>
    <block>
        <cu-custom bgColor="bgmain" :isBack="true">
            <view slot="content">发布</view>
        </cu-custom>
        <view class="box margin padding">
            <view class="tit padding-bottom">
                <image class="icon margin-right-sm" src="/static/icon/fabu/content.png" mode="" />
                内容
            </view>

            <textarea maxlength="-1" v-model="content" class="margin-top" placeholder="请输入此刻的想法"></textarea>
             <!-- @input="getCon" -->
            <view class="flex" style="font-size:32rpx;" v-if="content.length>0">
                <view style="margin-left:auto;">
                     {{content.length}}个字
                     <!-- /不限制 -->
                </view>
            </view>
            <view>
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
        </view>
        <view class="box margin padding" v-if="!classId">
            <view class="tit padding-bottom">
                <image class="icon margin-right-sm" src="/static/icon/fabu/quan.png" mode="" />
                圈子类型
            </view>
            <view class="types row">
                <block v-for="(item,i) in cateList" :key="i">
                    <view class="type margin-right margin-top" :class="index==i?'cur':''" @click="index=i">{{item.class_name}}</view>
                </block>
            </view>
        </view>
        <view class="box margin padding" v-if="sysparment.is_anonymous_switch">
            <view class="title">
                <view class="tit  row"  style="border-width:0px;">
                是否匿名
                <!-- <checkbox class="checkbox" @tap="checkagree" /> -->
                <switch
                    class="is_agree"
                    :checked="is_agree"
                    color="#ff6344"
                    @change="checkagree"
                    :class="is_agree?'checked':''"
                >
                </switch>

				
                
            </view>
            </view>
        </view>
        <view class="box margin padding">
             <view class="tit padding-bottom row">
               置顶圈子
                <!-- <view class="changes" @click="is_top=is_top==1?0:1" :class="is_top==1?'cur':''">
                    <image
                        class="dui"
                        src="/static/icon/fabu/dui.png"
                        mode="scaleToFill"
                   />
                 </view> -->
                  <switch
                    class="is_agree"
                    :checked="is_top"
                    color="#ff6344"
                    @change="is_top=is_top==1?0:1"
                    :class="is_top?'checked':''"
                >
                </switch>
             
            </view>
                <scroll-view scroll-x class="padding-top">
            <view class="pay_list flex" v-if="is_top==1">

                    <block v-for="(item,index) in payList" :key="index">
                        <view class="pay padding-top" :class="payIndex==index?'cur':''" @click="payIndex=index">
                            <view class="price flex">
                                <view class="num">{{item.price}}</view>
                                元
                            </view>
                            <view class="day">置顶{{item.day}}天</view>
                        </view>
                    </block>
            </view>

                </scroll-view>


        </view>

        <view class="padding" v-if="1==2">
            <view class="flex justify-between">
                <view>所属分类</view>
                <picker @change="bindPickerChange" :value="index" :range="cateList" range-key="class_name">
                    {{ cateList[index]['class_name'] }}
                    <text class="cuIcon-right"></text>
                </picker>
            </view>
            <view class="margin-top margin-bottom">上传图片/视频</view>
           
            <view class="margin-bottom-sm text-df margin-top flex align-center" v-if="sysparment.is_anonymous_switch">
                <checkbox class="checkbox" @tap="checkagree" />
                是否匿名
            </view>
            <view class="btn" @tap="submit">发布</view>
        </view>
        <view class="btn" @tap="submit">发布</view>
    </block>
</template>

<script>
// gc_school/pages/article/post.js
import siteInfo from '@/siteinfo.js';
var app = getApp();
export default {
    data() {
        return {
            ...this.configInfo,
            type: '',
            video: '',
            addedCount: 0,
            picList: [],
            images: [],
            content: '',
            cateList: [],
            index: 0,
            is_agree: 0,
            sysparment: {
                is_anonymous: 0
            },
            is_click: true,
            payList:[],
            payIndex:0,
            is_top:0,
            classId:0
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    async onLoad(options) {
        this.classId=options.cid||0
		await this.login().then((res)=>{
		    console.log("您已登陆！");
		})
        this.getCate();
		this.top()
        this.getSysparment();
		// this.reward()
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
        //获取列表
        getSysparment() {
            const self = this;
            app.globalData.util.request({
                url: 'Setting/view',

                success(res) {
                    self.setData({
						// sysparment: res.data.data.list[0].is_anonymous_switch
                        sysparment: res.data.data.sys
                    });
                }
            });
        },

        checkagree() {
			this.is_agree = this.is_agree==1?0:1
            // this.setData({
            //     is_agree: !this.is_agree
            // });
            // console.log(this.is_agree);
        },

        bindPickerChange(e) {
            this.setData({
                index: e.detail.value
            });
        },

		top()
		{
			var that = this;
			app.globalData.util.request({
			    url: 'TopSetting/index',
			    method: 'POST',
			    data: {
			        s_id: uni.getStorageSync('schoolId')
			    },
			
			    success(res) {
			        console.log(res.data.data);
			        that.setData({
			           payList: res.data.data.list
			        });
			    }
			});
		},
		
        //获取分类
        getCate() {
            var that = this;
            app.globalData.util.request({
                url: 'ZhForumClass/index',
                method: 'GET',
                data: {
                    s_id: uni.getStorageSync('schoolId'),
					type:1
                },

                success(res) {
                    console.log(res.data.data);
                    that.setData({
                        cateList: res.data.data.list
                    });
                }
            });
        },
        // getTopSetting(){
        //     api/TopSetting/index
        //     var that = this;
		// 	app.globalData.util.request({
		// 	    url: 'TopSetting/index',
		// 	    method: 'POST',
		// 	    data: {
		// 	        s_id: uni.getStorageSync('schoolId')
		// 	    },
			
		// 	    success(res) {
		// 	        console.log(res.data.data);
		// 	        that.setData({
		// 	            // cateList: res.data.data.list
		// 	        });
		// 	    }
		// 	});

        // },

        getCon(e) {
            if (e.detail.value) {
                this.setData({
                    content: e.detail.value.replace(/\s+/g, '')
                });
            }
        },

        choose() {
            var that = this;
            uni.chooseMedia({
                count: 3 - that.addedCount,

                success(res) {
                    // console.log(res)
                    // console.log(res.type)
                    that.setData({
                        type: res.type
                    });

                    if (res.type == 'image') {
                        that.uploadimg(res.tempFiles, 'ImgPost');
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
                            uni.hideLoading();
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


		reward()
		{
			app.globalData.util.request({
			    url: 'ZhArticles/reward',
			    method: 'POST',
			    data: {
					price:0.02,
					a_id:48,
			        s_id: uni.getStorageSync('schoolId'),
			    },
				success(res)
				{
					uni.requestPayment({
						timeStamp: res.data.data.paydata.timestamp.toString(),
						nonceStr: res.data.data.paydata.nonceStr,
						package: res.data.data.paydata.package,
						signType: 'MD5',
						paySign: res.data.data.paydata.paySign,
						success: function (resu) {
							console.log('success');
							console.log(res.data.data);
						},
						fail: function (res) {
							console.log('fail');
						}
					});
				}
			},true)
				
				
		},

        //发布
        submit() {
            var self = this;

            if (self.content == '') {
                app.globalData.util.message('请输入内容', '', 'error');
                return false;
            }

            if (self.is_click) {
                self.setData({
                    is_click: false
                });
				if(self.picList.length>0)
				{
					var image = self.picList.join(',')
				}
				else{
					var image = self.picList
				}
                app.globalData.util.request({
                    url: 'ZhArticles/add',
                    method: 'POST',
                    data: {
                        class_id:this.classId||self.cateList[self.index].class_id,
                        content: self.content,
						type:1,
						price:this.payList.length>0?this.payList[this.payIndex].price:0,
						is_top:this.is_top,
						day:this.payList.length>0?this.payList[this.payIndex].day:0,
                        // type: self.type,
                        video: self.video,
                        image: image,
                        s_id: uni.getStorageSync('schoolId'),
                        is_anonymous: self.is_agree
                    },

                    success(res) {
                        console.log(res.data.data);
                        self.setData({
                            content: ''
                        });
						
						if(res.data.status==200)
						{
							if(res.data.msg=='操作成功')
							{
								uni.showToast({
									title: '提交成功',
									icon: 'success'
								});
								setTimeout(function () {
									uni.redirectTo({
										url: '/gc_school/pages/article/my'
									});
								}, 1000);
							}
							else{
								uni.requestPayment({
								    timeStamp: res.data.data.paydata.timestamp.toString(),
								    nonceStr: res.data.data.paydata.nonceStr,
								    package: res.data.data.paydata.package,
								    signType: 'MD5',
								    paySign: res.data.data.paydata.paySign,
								    success: function (resu) {
								        console.log('success');
								        console.log(res.data.data);
								        
								        setTimeout(function () {
								        	uni.redirectTo({
								        		url: '/gc_school/pages/article/my'
								        	});
								        }, 1000);
								    },
								    fail: function (res) {
								        console.log('fail');
								    }
								});
							}
						}
						else{
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
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
        }
    }
};
</script>
<style>
page {
    background: white;
}
.bgmain {
    background-color: #ff6444;
    background: #f7f6f5;
    color: white;
    color: #000;
}
textarea {
    background: #f9f9f9;
    width: 100%;
    padding: 20rpx 0;
    font-size: 28rpx;
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
.preview {
    position: relative;
    width: 230rpx;
}
.close {
    position: absolute;
    right: 30rpx;
    font-size: 40rpx;
}
.checkbox {
    transform: scale(0.8, 0.8);
}
.checkbox .wx-checkbox-input {
    /* border-radius: 50%; */
    width: 40rpx; /* 选中后对勾大小，不要超过背景的尺寸 */
    height: 40rpx;
}
</style>

<style lang="scss">
    @import "./main.scss";
</style>