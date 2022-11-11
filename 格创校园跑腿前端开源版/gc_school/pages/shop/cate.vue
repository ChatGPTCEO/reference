<template>
    <block>
        <!-- gc_school/pages/shop/cate.wxml -->
        <cu-custom bgColor="bgmain" :isBack="true">
            <view slot="content">分类管理</view>
        </cu-custom>

        <view class="box">
            <block v-if="cate.length > 0">
                <block v-for="(item, index) in cate" :key="index">
                    <view class="item flex justify-between">
                        <view class="name text-df">{{ item.goods_type_name }}</view>
                        <view>
                            <image @tap="edit" data-type="1" :data-id="item.goods_type_id" class="edit_icon" src="/static/images/store/edit.png"></image>
                            <image @tap="del" :data-id="item.goods_type_id" class="del_icon" src="/static/images/store/del3.png"></image>
                        </view>
                    </view>
                </block>
            </block>
            <block v-else>
                <view class="empty">
                    <image class="" src="/static/images/store/empty.png" mode="widthFix"></image>
                    <view>暂无分类~</view>
                </view>
            </block>
        </view>

        <view class="cover" v-if="modal_show">
            <view class="cate_content padding">
                <view class="text-right">
                    <image @tap="close" class="close" src="/static/images/store/close.png"></image>
                </view>
                <view class="text-bold text-lg flex">
                    <text class="text-red text-bold text-xxl">*</text>
                    {{ type == 1 ? '编辑分类' : '添加分类' }}
                </view>
                <input :value="name" @input="getName" placeholder="请输入分类名称" />
                <view class="submit_btn" @tap="submit">确认</view>
            </view>
        </view>

        <view class="bottom_fixed">
            <view class="create" @tap="add" data-type="2">创建分类</view>
        </view>
    </block>
</template>

<script>
// gc_school/pages/shop/cate.js
var app = getApp();
export default {
    data() {
        return {
            cate: [],
            modal_show: false,
            id: 0,
            type: 0,
            name: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        this.getCate();
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
        getCate() {
            var that = this;
            app.globalData.util.request({
                url: 'ZhGoodsType/index',
				method: 'GET',
                data: {
                    s_id: uni.getStorageSync('schoolId')
                },

                success(res) {
                    that.setData({
                        cate: res.data.data.list
                    });
                }
            },true);
        },

        add(e) {
            this.setData({
                type: e.currentTarget.dataset.type,
                modal_show: true
            });
        },

        edit(e) {
            var that = this;
            console.log(e.currentTarget.dataset);
            this.setData({
                id: e.currentTarget.dataset.id,
                type: e.currentTarget.dataset.type
            });
            app.globalData.util.request({
                url: 'ZhGoodsType/view',
				method: 'GET',
                data: {
                    goods_type_id: e.currentTarget.dataset.id,
					s_id:uni.getStorageSync('schoolId')
                },

                success(res) {
                    that.setData({
                        modal_show: true,
                        name: res.data.data.goods_type_name
                    });
                }
            },true);
        },

        del(e) {
            var that = this;
            uni.showModal({
                title: '温馨提示',
                content: '确认删除该分类吗？',

                success(res) {
                    if (res.confirm) {
                        app.globalData.util.request({
                            url: 'ZhGoodsType/delete',
                            data: {
                                goods_type_id	: e.currentTarget.dataset.id,
								s_id:uni.getStorageSync('schoolId')
                            },

                            success(resu) {
                                uni.showToast({
                                    title: '删除成功'
                                });
                                setTimeout(function () {
                                    that.getCate();
                                }, 1000);
                            }
                        },true);
                    }
                }
            });
        },

        submit() {
            var that = this;
            if (!that.name) {
                app.globalData.util.message('请输入名称', '', 'error');
                return false;
            }
			if(that.type == 2){
				app.globalData.util.request({
				    url: 'ZhGoodsType/add',
				    data: {
				        goods_type_name: that.name,
				        s_id: uni.getStorageSync('schoolId')
				    },
				
				    success(res) {
				        if (res.data.status == 200) {
				            uni.showToast({
				                title: '操作成功'
				            });
				            that.setData({
				                modal_show: false,
				                name: ''
				            });
				            that.getCate();
				        }
				    }
				},true);
			}else if(that.type == 1){
				app.globalData.util.request({
				    url: 'ZhGoodsType/update',
				    data: {
				        goods_type_name: that.name,
				        s_id: uni.getStorageSync('schoolId'),
						goods_type_id: that.id
				    },
				
				    success(res) {
				        if (res.data.status == 200) {
				            uni.showToast({
				                title: '操作成功'
				            });
				            that.setData({
				                modal_show: false,
				                name: ''
				            });
				            that.getCate();
				        }
				    }
				},true);
			}
            
        },

        close() {
            this.setData({
                modal_show: false,
                id: 0
            });
        },

        getName(e) {
            this.setData({
                name: e.detail.value.replace(/\s+/g, '')
            });
        }
    }
};
</script>
<style>
/* gc_school/pages/shop/cate.wxss */
page {
    background: white;
}
.empty {
    margin: 100rpx auto;
    text-align: center;
    font-size: 30rpx;
    color: gray;
}
.empty image {
    width: 300rpx;
    /* height: 200rpx; */
}
.box {
    padding-bottom: 170rpx;
}
.item {
    line-height: 70rpx;
    border-bottom: 1rpx solid #f9f9f9;
    padding: 10rpx 40rpx;
}
.edit_icon {
    width: 31rpx;
    height: 31rpx;
    margin-right: 20rpx;
}
.del_icon {
    width: 45rpx;
    height: 45rpx;
}
.name {
    max-width: 80%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.cover {
    background: rgba(0, 0, 0, 0.4);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    z-index: 999;
}
.cate_content {
    width: 90%;
    margin-left: 5%;
    padding-bottom: 50rpx;
    /* height: 200rpx; */
    margin-top: 50%;
    border-radius: 10rpx;
    background-color: white;
}
.close {
    width: 40rpx;
    height: 40rpx;
    /* float: right; */
}
input {
    background-color: #f9f9f9;
    line-height: 80rpx;
    height: 80rpx;
    border-radius: 10rpx;
    margin-top: 20rpx;
    padding-left: 10rpx;
    /* text-indent: 1rem; */
    font-size: 28rpx;
}
.submit_btn {
    background-color: #ff6344;
    color: white;
    text-align: center;
    border-radius: 10rpx;
    margin: 100rpx auto 0;
    line-height: 70rpx;
    width: 250rpx;
}
.create {
    background-color: #ff6344;
    color: white;
    position: fixed;
    bottom: 40rpx;
    line-height: 80rpx;
    width: 90%;
    left: 5%;
    border-radius: 10rpx;
    text-align: center;
    font-size: 30rpx;
}
.bottom_fixed {
    width: 100%;
    height: 170rpx;
    background: white;
    z-index: 9;
    position: fixed;
    bottom: 0;
}
</style>
