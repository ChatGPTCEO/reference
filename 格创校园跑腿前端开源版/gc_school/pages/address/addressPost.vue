<template>
    <block>
        <cu-custom bgColor="bgmain" :isBack="true">
            <view slot="content">我的地址</view>
        </cu-custom>
        <view class="container">
            <form @submit="formSubmit">
				<view class="margin addr_box">
					<view class="cu-form-group">
						<view class="title text-bold">选择学校</view>
						<picker @change="PickerChange" :value="index" :range="school" range-key="s_name">
							<view class="picker">
								{{ index ? school[index].s_name : '选择学校' }}
							</view>
						</picker>
					</view>

					<view class="cu-form-group">
						<view class="title text-bold">楼号-门牌号</view>
						<input placeholder="楼号-门牌号" name="addres" @input="change" data-type="addres" :value="form.addres" />
					</view>

					<view class="cu-form-group">
						<view class="title text-bold">联系人</view>
						<input placeholder="联系人" name="name" @input="change" data-type="name" :value="form.name" />
					</view>

					<view class="cu-form-group">
						<view class="title text-bold">性别</view>
						<!-- <switch class="switch-sex" bindchange="SexChange" checked></switch> -->
						<radio-group class="radio" @change="ycf">
							<label class="radio">
								<radio value="0" color="#fff" :checked="form.sex == 0 ? true : false" />
								男
								<radio value="1" color="#fff" style="margin-left: 10rpx" :checked="form.sex == 1 ? true : false" />
								女
							</label>
						</radio-group>
					</view>
					<view class="cu-form-group">
						<view class="title text-bold">手机号</view>
						<input placeholder="手机号" name="phone" :value="form.phone" />
					</view>
				</view>

                <view class="submit margin-top">
                    <view class="padding flex flex-direction">
                        <button class="cu-btn bg-yellow lg round" form-type="submit">保存</button>
                    </view>
                </view>
            </form>
        </view>
    </block>
</template>

<script>
var app = getApp();
export default {
    data() {
        return {
            options: {},
            school: [],
            form: {
                id: '',
                sex: 0,
                addres: '',
                name: '',
                phone: ''
            },
            index: '',
            address: {
                location_y: '',
                location_x: '',
                address: ''
            }
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        this.getSchool();
        this.setData({
            options: options
        });

        if (options.id>0) {
            this.getMyAddresInfo();
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
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {
        PickerChange(e) {
            console.log(e);
            this.setData({
                index: e.detail.value
            });
        },

        change(e) {
            console.log(e);
            var type = e.currentTarget.dataset.type;
            var form = this.form;
            form[type] = e.detail.value;
            this.setData({
                form: { ...form }
            });
        },

        formSubmit(e) {
            var self = this;
            console.log('表单值', self.form);
            console.log('联系人', self.form.name);
            console.log('联系人', self.form.name.replace(/\s+/g, ''));

            if (!this.index) {
                app.globalData.util.message('请选择学校', '', 'error');
                return false;
            }

            if (!e.detail.value.addres || self.form.addres.replace(/\s+/g, '') == '') {
                app.globalData.util.message('请输入具体地址', '', 'error');
                return false;
            }

            if (!e.detail.value.name || self.form.name.replace(/\s+/g, '') == '') {
                app.globalData.util.message('请输入联系人', '', 'error');
                return false;
            }

            var myreg = /^1[3456789]\d{9}$/; // var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;

            if (!myreg.test(e.detail.value.phone)) {
                app.globalData.util.message('手机号有误', '', 'error');
                return false;
            }

            app.globalData.util.request({
                url: !self.form.a_id ? 'Address/add' : 'Address/update',
                data: {
                    // name:self.data.form.name.replace(/\s+/g, ''),
                    // phone:self.data.form.phone.replace(/\s+/g, ''),
                    // addres:self.data.form.addres.replace(/\s+/g, ''),
                    // sex:self.data.form.sex,
                    // a_id:self.data.form.a_id,
                    ...self.form,
                    ...e.detail.value,
                    s_id: self.school[self.index].s_id,
                    openid: uni.getStorageSync('openid'),
                },

                success(res) {
                    // self.getUserStatus()
                    uni.navigateBack({});
                }
            },true);
        },

        SexChange(e) {
            this.setData({
                form: { ...this.form, sex: e.detail.value ? 0 : 1 }
            });
        },

        ycf: function (e) {
            console.log(e.detail.value);
            this.setData({
                form: { ...this.form, sex: e.detail.value }
            });
            console.log('form值', this.form);
        },

        //获取学校列表
        getSchool() {
            var self = this;
            app.globalData.util.request({
                url: 'School/index',
                data: {},
                success(res) {
                    self.setData({
                        school: res.data.data.list
                    });
                    self.school = res.data.data.list; // if (self.data.options) {
                    // 	self.getMyAddresInfo()
                    // }
                }
            });
        },

        getMyAddresInfo() {
            var self = this;
            app.globalData.util.request({
                url: 'Address/view',
                data: {
                    a_id: this.options.id,
                },
                success(res) {
                    console.log(res);
                    var index = 0;

                    for (var i = 0; i < self.school.length; i++) {
                        if (self.school[i].s_id == res.data.data.s_id) {
                            self.setData({
                                index: String(i)
                            });
                        }
                    }

                    self.setData({
                        form: res.data.data
                    });
                }
            },true);
        }
    }
};
</script>
<style>
/* radio未选中时样式 */
page {
    background-color: #F7F5F6;
}
.addr_box{
	background-color: white;
	padding: 20rpx;
	border-radius: 20rpx;
}
.cu-form-group{
	padding: 1rpx 10rpx;
}
radio .wx-radio-input {
    /* 自定义样式.... */

    height: 26rpx;

    width: 26rpx;

    margin-top: -4rpx;

    left: -8rpx;
}

/* radio选中时样式 */

radio .wx-radio-input .wx-radio-input-checked::before {
    /* 自定义样式.... */

    background-color: #e02e24;

    border: 1rpx solid #e02e24;

    left: -8rpx;
}
.bg-yellow {
	background: linear-gradient(90deg, #FF484A 0%, #FF716C 100%);
    /* background-color: #ff6344; */
}
.bgmain {
    /* background-color: #ff6344;
    color: white; */
}
/* .cuIcon-back {
    color: white;
} */
input {
    text-align: right;
}
</style>
