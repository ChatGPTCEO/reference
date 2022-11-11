<template>
    <block>
        <scroll-view scroll-y class="scrollPage">
            <cu-custom bgColor="bgmain" :isBack="true">
                <!-- <view slot="backText">返回</view> -->
                <view slot="content">骑手认证</view>
            </cu-custom>

            <form @submit="formSubmit">

                <block v-if="num == 0">
					<view class="white_box margin padding-sm">
						<view class="cu-form-group">
							<view class="title text-bold">姓名</view>
							<input class="text-right" placeholder="请输入姓名" name="t_name" :value="t_name" @input="change" data-type="t_name" />
						</view>
						<view class="cu-form-group">
							<view class="title text-bold">手机</view>
							<input placeholder="请输入手机" :disabled="true" name="phone" :value="phone" data-type="phone" />
							<button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" class="getPhone">获取手机号</button>
						</view>
						<view class="cu-form-group">
							<view class="title text-bold">所属区域</view>
							<picker @change="PickerChange" :value="sindex" :range="school" range-key="s_name">
								<view class="picker">
									{{ school[sindex].s_name ? school[sindex].s_name : '选择区域' }}
								</view>
							</picker>
						</view>
						<view class="cu-form-group">
							<view class="title text-bold">性别选择</view>
							<picker :range="gender" :value="index" range-key="name" @change="bindSexChange" class="picker_name" style="text-align: right;padding-right: 0;">
								{{ gender[gender_index].name }}
								<text class="cuIcon-right"></text>
							</picker>
						</view>
					</view>
                    
                </block>

                <view style="margin-top: 200rpx">
                    <view v-if="num == 0" class="agreement margin-top-xl align-center">
                        <checkbox class="checkbox" :checked="check" @tap="checkagree"></checkbox>
                        <view @tap="agreelink">
                            我已阅读并同意
                            <text style="color: #FF4C4D;">《平台协议》</text>
                        </view>
                    </view>
                    <view class="submit margin-top">
                        <view class="padding flex flex-direction">
                            <button class="cu-btn lg round" form-type="submit">提交申请</button>
                            <!-- <button class="cu-btn bg-yellow lg round" wx:if="{{num<=2}}"  bindtap="numSteps">下一步</button> -->
                        </view>
                    </view>
                </view>
            </form>
        </scroll-view>
    </block>
</template>

<script>
// natatorium/regsiter/index.js
var app = getApp();
import common from '../../../we7/resource/js/common.js';
export default {
    data() {
        return {
            numList: [
                {
                    name: '第一步',
                    id: '1'
                },
                {
                    name: '第二步',
                    id: '2'
                },
                {
                    name: '第三步',
                    id: '3'
                },
                {
                    name: '完成',
                    id: '4'
                }
            ],

            num: 0,
            err: '',
            card_pic: [],
            sindex: 0,
            t_pic: [],
            student_pic: [],
            // cg_getcard_start: '2005-01-01',
            imgList: [],

            imgList1: [],
			phone:'',

            gender: [
                {
                    name: '男',
                    id: '1'
                },
                {
                    name: '女',
                    id: '2'
                }
            ],

            gender_index: 0,
            check: false,
            is_show: 0,
            code: '',
            changeSexs: '',
            t_sex: '',

            school: {
                s_name: false
            },

            sysparment: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        // this.getData()
        this.getSchool();
        uni.login({
            success: (res) => {
                this.setData({
                    code: res.code
                });
            }
        });
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
        change(e) {
            this.setData({
                t_name:e.detail.value
            });
        },

        agreelink() {
            uni.navigateTo({
                url: '/gc_school/pages/privacy/index'
            });
        },

        //同意协议
        agree() {
            var changeSex = this.changeSexs;
            this.setData({
                changeSexs: changeSex == false ? true : false
            });
        },

        getPhoneNumber(e) {
            var that = this;
            uni.login({
                success: (res) => {
                    app.globalData.util.request({
                        url: 'RenIndex/getPhone',
                        data: {
                            code: res.code,
                            iv: e.detail.iv,
                            encryptedData: e.detail.encryptedData
                        },

                        success(resu) {
                            console.log(resu.data.data.phoneNumber); 
							that.phone = resu.data.data.phoneNumber
                        }
                    });
                }
            });
        },

        //性别选择
        bindSexChange(e) {
            console.log(e);
            this.setData({
                gender_index: e.detail.value,
                t_sex: this.gender[e.detail.value].id
            });
        },

        formSubmit: function (e) {
            console.log(e);
			if (!e.detail.value.t_name) {
			    app.globalData.util.message('请输入姓名', '', 'error');
			    return false;
			} 
			if(!this.school[this.sindex].s_id)
			{
				app.globalData.util.message('请选择区域', '', 'error');
				return false;
			}
            if (!this.check) {
                app.globalData.util.message('请先勾选协议', '', 'error');
                return false;
            }

            app.globalData.util.request({
                url: 'WechatUser/update',
                data: {
                    t_name:this.t_name,
                    t_sex: this.t_sex,
                    auth_sid: this.school[this.sindex].s_id,
					phone:this.phone,
					run_status:1
                },

                success(res) {
                   
                    uni.navigateBack({});
                }
            },true);
        },

        sexChange(e) {
            this.setData({
                t_sex: e.detail.value
            });
        },

        //协议勾选
        checkagree() {
            this.setData({
                check: !this.check
            });
        },

        PickerChange(e) {
            console.log(e);
            this.setData({
                sindex: e.detail.value
            });
        },

        getData() {
            var self = this;
            app.globalData.util.request({
                url: 'WechatUser/view',
                data: {},
                success(res) {
					self.gender_index = res.data.data.t_sex?res.data.data.t_sex-1:0,
					self.t_sex = res.data.data.t_sex?res.data.data.t_sex:1,
                    self.setData({
                        t_name:res.data.data.t_name,
						phone: res.data.data.phone,
                    });

                    for (var i = 0; i < self.school.length; i++) {
                        if (self.school[i].s_id == res.data.data.auth_sid) {
                            self.setData({
                                sindex: i
                            });
                        }
                    }
                }
            },true);
        },

        //获取学校列表
        getSchool() {
            var self = this;
            app.globalData.util.request({
                url: 'School/index',
                data: {},

                success(res) {
                    self.setData({
                        school: res.data.data.list,
                        index: 0
                    });
                    self.getData();
                }
            });
        }

    }
};
</script>
<style>
page {
    background-color: #F7F5F6 !important;
}
.student {
    padding: 30rpx 30rpx 0;
}
.cu-form-group+.cu-form-group {
    border-top: 1rpx solid #F5F3F4;
}
.white_box{
	background-color: white;
	border-radius: 20rpx;
}
.agreement {
    text-align: center;
    margin: 30rpx 0;
    font-size: 30rpx;
    display: flex;
    justify-content: center;
}
.agreement view {
    margin-left: 20rpx;
}
.agreement text {
    font-weight: bold;
}
.checkbox {
    transform: scale(0.8, 0.8);
    /* width: 100%; */
    /* text-align: center; */
}
checkbox .wx-checkbox-input.wx-checkbox-input-checked{
	background-color: #e54d42 !important;
	border-color: #e54d42 !important;
	color: #ffffff !important;
}
.rule {
    margin-left: 20rpx;
}
.getPhone {
    background: #FF4C49;
    color: white;
    line-height: 70rpx;
    font-size: 30rpx;
}
.cu-btn{
	color: white;
	background: linear-gradient(90deg, #FF484A 0%, #FF716C 100%) !important;
}
</style>
