<template>
    <block>
        <cu-custom bgColor="bgmain" :isBack="true">
            <!-- <view slot="backText">返回</view> -->
            <view slot="content">骑手认证</view>
        </cu-custom>

        <view class="cu-form-group">
            <view class="title">所属校区</view>
            <picker @change="PickerChange" :value="sindex" :range="school" range-key="s_name">
                <view class="picker">
                    {{ school[sindex].s_name ? school[sindex].s_name : '选择学校' }}
                </view>
            </picker>
        </view>
        <view class="cu-form-group">
            <view class="title">真实姓名</view>
            <input class="text-right" placeholder="请输入真实姓名" name="t_name" :value="form.t_name" @input="change" data-type="t_name" />
        </view>
        <view class="cu-form-group">
            <view class="title">手机</view>
            <input class="text-right" placeholder="请输入手机" name="phone" :value="form.phone" @input="change" data-type="phone" />
        </view>
        <view class="cu-form-group">
            <view class="title">性别选择</view>
            <picker :range="gender" :value="index" range-key="name" @change="bindSexChange" class="picker_name text-right">
                <view class="picker">
                    {{ gender[gender_index].name }}
                </view>
            </picker>
        </view>
        <view class="agreement">
            <checkbox class="checkbox" :checked="check" @tap="checkagree"></checkbox>
            <view @tap="agreelink">我已阅读并同意跑腿认证</view>
        </view>

        <button class="cu-btn bg-yellow lg round" form-type="submit">保存</button>
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
                    name: '实名认证',
                    id: '1'
                },
                {
                    name: '学生认证',
                    id: '2'
                },
                {
                    name: '绑定手机',
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
            sindex: '',
            t_pic: [],
            student_pic: [],
            ischeck: true,

            // cg_getcard_start: '2005-01-01',
            imgList: [],

            imgList1: [],

            form: {
                t_name: '',
                phone: ''
            },

            showsfzupload: true,

            gender: [
                {
                    name: '男',
                    id: '0'
                },
                {
                    name: '女',
                    id: '1'
                }
            ],

            gender_index: 0,
            check: true,
            is_show: 0,
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
        this.getconfig();
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
            console.log(e);
            var type = e.currentTarget.dataset.type;
            var form = this.form;
            form[type] = e.detail.value;
            this.setData({
                form: { ...form }
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

        openview(e) {
            console.log(e);
            uni.previewImage({
                current: e.currentTarget.dataset.url,
                urls: [e.currentTarget.dataset.url]
            });
        },

        //性别选择
        bindSexChange(e) {
            console.log(e);
            this.setData({
                gender_index: e.detail.value,
                t_sex: e.detail.value
            });
        },

        numSteps() {
            this.setData({
                err: ''
            });

            if (this.num == 0) {
                if (!this.check) {
                    app.globalData.util.message('请勾选协议', '', 'error');
                    return false;
                }

                if (!this.form.t_name || this.form.t_name.replace(/\s+/g, '') == '') {
                    app.globalData.util.message('请输入真实姓名', '', 'error');
                    this.setData({
                        err: 0
                    });
                    return false;
                }

                if (!this.form.card_num || this.form.card_num.replace(/\s+/g, '') == '') {
                    app.globalData.util.message('请输入身份证号', '', 'error');
                    this.setData({
                        err: 0
                    });
                    return false;
                }

                if (!common.IdentityIDCard(this.form.card_num).isPass) {
                    app.globalData.util.message('身份证号有误', '', 'error');
                    this.setData({
                        err: 0
                    });
                    return false;
                }
                /* 			 if (this.data.card_pic.length==0) {
                      app.util.message('请上传身份证照片', '', 'error')
                      this.setData({
                          err: 0
                      })
                      return false;
                   } */

                console.log('打印', this.t_pic);

                if ((this.t_pic == null || this.t_pic.length == 0) && this.is_show == 1) {
                    app.globalData.util.message('请上传本人照片', '', 'error');
                    this.setData({
                        err: 0
                    });
                    return false;
                }
            }

            if (this.num == 1) {
                if (!this.form.college || this.form.college.replace(/\s+/g, '') == '') {
                    app.globalData.util.message('请输入院系', '', 'error');
                    this.setData({
                        err: 1
                    });
                    return false;
                }

                if (!this.form.major || this.form.major.replace(/\s+/g, '') == '') {
                    app.globalData.util.message('请输入专业', '', 'error');
                    this.setData({
                        err: 1
                    });
                    return false;
                }

                if (!this.form.student_num || this.form.student_num.replace(/\s+/g, '') == '') {
                    app.globalData.util.message('请输入学号', '', 'error');
                    this.setData({
                        err: 1
                    });
                    return false;
                }

                console.log('学生证长度', this.student_pic);

                if (this.student_pic == null) {
                    app.globalData.util.message('请上传学生证照片', '', 'error');
                    this.setData({
                        err: 1
                    });
                    return false;
                }
            } // var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;

            var myreg = /^1[3456789]\d{9}$/;

            if (this.num == 2) {
                // if ((!this.data.form.phone) || (this.data.form.phone.replace(/\s+/g, '')=='')) {
                if (!myreg.test(this.form.phone)) {
                    app.globalData.util.message('手机格式有误', '', 'error');
                    this.setData({
                        err: 2
                    });
                    return false;
                }
            }

            this.setData({
                num: this.num == this.numList.length - 1 ? 0 : this.num + 1
            });
        },

        formSubmit: function (e) {
            console.log(e);
            /* 	if (!e.detail.value.t_name) {
              app.util.message('请输入真实姓名', '', 'error')
              return false;
          }
          if (!e.detail.value.card_num) {
              app.util.message('请输入身份证号', '', 'error')
              return false;
          }
          if (!e.detail.value.phone) {
              app.util.message('请输入手机', '', 'error')
              return false;
          }
          if (!e.detail.value.student_num) {
              app.util.message('请输人学号', '', 'error')
              return false;
          }
          if (!e.detail.value.college) {
              app.util.message('请输人院系', '', 'error')
              return false;
          }
          if (!e.detail.value.major) {
              app.util.message('请输人专业', '', 'error')
              return false;
          }
          if (this.data.card_pic.length == 0) {
              app.util.message('请上传身份证', '', 'error')
              return false;
          }
          if (this.data.t_pic.length == 0) {
              app.util.message('请上传本人照片', '', 'error')
              return false;
          }
      */
            // if (this.data.student_pic.length == 0) {
            // 	app.util.message('请上传学生证照片', '', 'error')
            // 	return false;
            // }

            console.log('表单', this.form);
            app.globalData.util.request({
                url: 'entry/wxapp/RegisterRuner',
                data: {
                    // ...e.detail.value,
                    ...this.form,
                    // t_sex:this.data.ischeck?0:1,
                    t_sex: this.t_sex,
                    s_id: this.school[this.sindex].s_id,
                    // student_card:'',
                    // admissiontime: this.data.cg_getcard_start,
                    cg_getcard_end: this.cg_getcard_end,
                    card_pic: JSON.stringify(this.card_pic),
                    t_pic: JSON.stringify(this.t_pic),
                    student_pic: JSON.stringify(this.student_pic),
                    openid: uni.getStorageSync('openid')
                },

                success(res) {
                    // self.getUserStatus()
                    // wx.navigateTo({
                    // 	url: '/natatorium/index/index',
                    // })
                    uni.navigateBack({});
                }
            });
        },

        sexChange(e) {
            this.setData({
                form: { ...this.form, t_sex: e.detail.value }
            });
        },

        //协议勾选
        checkagree() {
            this.setData({
                check: !this.check
            });
        },

        checked(e) {
            this.setData({
                ischeck: e.detail.value
            });
        },

        PickerChange(e) {
            console.log(e);
            this.setData({
                sindex: e.detail.value
            });
        },

        DateChange(e) {
            this.setData({
                [e.currentTarget.dataset.type]: e.detail.value
            });
        },

        upload(res, type) {
            uni.showLoading();
            uni.uploadFile({
                url: app.globalData.util.url() + 'c=entry&a=wxapp&do=ImgPost&m=gc_school',
                // 仅为示例，非真实的接口地址
                filePath: res.tempFilePaths[0],
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                name: 'file',
                success: (result) => {
                    console.log(res);
                    var data = result.data;
                    data = JSON.parse(data).data;
                    console.log(data);
                    uni.hideLoading();
                    this.type = [data];

                    if (type == 't_pic') {
                        this.setData({
                            showsfzupload: false
                        });
                    }
                }
            });
        },

        ChooseImage(e) {
            console.log('1121212', e.currentTarget.dataset.type);
            uni.chooseImage({
                count: 1,
                //默认9
                sizeType: ['original', 'compressed'],
                //可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album'],
                //从相册选择
                success: (res) => {
                    console.log('path', res);
                    this.upload(res, e.currentTarget.dataset.type);
                }
            });
        },

        ViewImage(e) {
            uni.previewImage({
                urls: [e.currentTarget.dataset.url],
                current: e.currentTarget.dataset.url
            });
        },

        DelImg(e) {
            uni.showModal({
                title: '删除图片',
                content: '确定要删除？',
                cancelText: '取消',
                confirmText: '确定',
                success: (res) => {
                    if (res.confirm) {
                        this[e.currentTarget.dataset.type].splice(e.currentTarget.dataset.index, 1);
                        this.setData({
                            [e.currentTarget.dataset.type]: this.imgList,
                            showsfzupload: true
                        });
                    }
                }
            });
        },

        getData() {
            var self = this;
            app.globalData.util.request({
                url: 'entry/wxapp/UserInfo',
                data: {
                    openid: uni.getStorageSync('openid')
                },

                success(res) {
                    self.setData({
                        form: { ...res.data.data.info },
                        card_pic: JSON.parse(res.data.data.info.card_pic),
                        student_pic: JSON.parse(res.data.data.info.student_pic),
                        t_pic: res.data.data.info.t_pic != 'null' ? JSON.parse(res.data.data.info.t_pic) : [],
                        gender_index: res.data.data.info.t_sex
                    });

                    for (var i = 0; i < self.school.length; i++) {
                        if (self.school[i].s_id == res.data.data.info.regschool_id) {
                            self.setData({
                                sindex: i
                            });
                        }
                    }

                    console.log('打印', self); // if (self.data.card_pic.length > 0) {

                    if (self.card_pic != null) {
                        console.log('不为空');
                        self.setData({
                            showsfzupload: false
                        });
                    }
                }
            });
        },

        //获取学校列表
        getSchool() {
            var self = this;
            app.globalData.util.request({
                url: 'entry/wxapp/SchoolList',
                data: {
                    openid: uni.getStorageSync('openid'),
                    lon: uni.getStorageSync('city').location.lng,
                    lat: uni.getStorageSync('city').location.lat
                },

                success(res) {
                    self.setData({
                        school: res.data.data.list,
                        index: 0
                    });
                    self.getData();
                }
            });
        },

        getconfig() {
            var that = this;
            app.globalData.util.request({
                url: 'entry/wxapp/Sysparment',

                success(res) {
                    console.log(res.data.data.sys);
                    that.setData({
                        is_show: res.data.data.sys.is_run_show,
                        sysparment: res.data.data.sys
                    });
                }
            });
        }
    }
};
</script>
<style>
page {
    background-color: white !important;
}
.bgmain {
    background-color: #ff6444;
    color: white;
}
.cuIcon-back {
    color: white;
}
.student {
    padding: 30rpx 30rpx 0;
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

.rule {
    margin-left: 20rpx;
}
.round {
    width: 84%;
    margin-left: 8%;
}
</style>
