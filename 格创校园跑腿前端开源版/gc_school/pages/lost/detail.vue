<template>
    <block>
        <!-- gc_school/pages/article/detail.wxml -->
        <cu-custom bgColor="bgmain" :isBack="true">
            <view slot="content">详情</view>
        </cu-custom>
        <view class="padding top_box">
            <view class="flex article_box align-center">
                <image class="avatar" :src="detail.avatar ? detail.avatar : '/images/code/c17.png'"></image>
				<view class="nickname">{{ detail.nickname }}</view>
				<view class="date">{{ detail.createtime }}</view>
            </view>
            <view class="item text-lg text-bold">{{ detail.title }}</view>
            <view v-if="detail.media_type == '1'" class="margin-top">
                <video style="width: 100%" :src="detail.video"></video>
            </view>
            <view v-else-if="detail.media_type == '2'" class="margin-top">
                <block v-for="(img, index) in detail.image" :key="index">
                    <image mode="aspectFill" @tap="preview" :data-img="img" :data-list="detail.image" class="item_img" :src="img"></image>
                </block>
            </view>
            <view class="item flex align-center text-bold" v-if="detail.address">
            	<image class="icon" src="../../../static/icon/lost/location.png"></image>
            	{{detail.type==1?'拾物地点':'丢失地点'}}：<text class="val">{{ detail.address }}</text>
            </view>
            <view class="item flex align-center text-bold" v-if="detail.pick_date">
            	<image class="icon" src="../../../static/icon/lost/date.png"></image>
            	{{detail.type==1?'拾物时间':'丢失时间'}}：<text class="val">{{ detail.pick_date }}</text>
            </view>
            <view class="item flex align-center text-bold" v-if="detail.phone">
            	<image class="icon" src="../../../static/icon/lost/phone.png"></image>
            	联系电话：<text class="val">{{ detail.phone }}</text>
            </view>
			<view class="item flex align-center text-bold" v-if="detail.claim_method">
				<image class="icon" src="../../../static/icon/lost/get.png"></image>
				认领方式：<text class="val">{{ detail.claim_method }}</text>
			</view>
			<view class="item flex align-center text-bold" v-if="detail.remarks">
				<image class="icon" src="../../../static/icon/lost/remark.png"></image>
				备注信息：<text class="val">{{ detail.remarks }}</text>
			</view>
        </view>
		
		<!-- <view class="padding"> -->
            <view class="comment_box padding">
                <view class="name" style="padding-left: 0" v-if="comment_list.length>0">共{{comment_list.length}}条留言</view>
                <block v-for="(item, index) in comment_list" :key="index">
                    <view class="comment_item_first">
                        <view class="top">
                            <image :src="item.avatar"></image>
                            <view class="nickname">{{ item.nickname }}</view>
							<view  style="flex-grow: 2" class="time" @tap="comment" :data-groupindex="index" data-index="-1">{{ item.createtime }}</view>
                            <text @tap="del" :data-id="item.id" v-if="u_id == item.u_id" class="cuIcon-delete"></text>
                            <!-- <text class="cuIcon-appreciate"></text> -->
                        </view>
                        <view class="content" @tap="comment" :data-groupindex="index" data-index="-1">{{ item.content }}</view>
                    </view>

                    <!-- 子评论 -->

                    <block v-if="index1 < 1" v-for="(child, index1) in item.child" :key="index1">
                        <view class="comment_item_child">
                            <view class="top justify-between">
                                <image :src="child.avatar"></image>
                                <view class="nickname">{{ child.nickname }}</view>
								<view class="time" style="flex-grow: 2" @tap="comment" :data-groupindex="index" :data-index="index1">{{ child.createtime }}</view>
                                <text @tap="del" :data-id="child.id" v-if="u_id == child.u_id" class="cuIcon-delete"></text>
                            </view>
                            <view class="content" @tap="comment" :data-groupindex="index" :data-index="index1">{{ child.content }}</view>
                        </view>
                    </block>

                    <block v-if="index1 >= 1 && item.block == true" v-for="(child, index1) in item.child" :key="index1">
                        <view class="comment_item_child">
                            <view class="top justify-between">
                                <image :src="child.avatar"></image>
                                <view class="nickname">{{ child.nickname }}</view>
								<view style="flex-grow: 2" class="time" @tap="comment" :data-groupindex="index" :data-index="index1">{{ child.createtime }}</view>
                                <text @tap="del" :data-id="child.id" v-if="u_id == child.u_id" class="cuIcon-delete"></text>
                            </view>
                            <view class="content" @tap="comment" :data-groupindex="index" :data-index="index1">{{ child.content }}</view>
                        </view>
                    </block>

                    <view class="more" @tap="showmore" :data-index="index" v-if="item.child.length > 1 && item.block == false">
                        展开
                        <text class="cuIcon-unfold"></text>
                    </view>

                    <view class="more" @tap="showmore" :data-index="index" v-else-if="item.child.length > 1 && item.block == true">
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
            <view class="comment_input" :style="'bottom:' + bottom + 'px'">
				<button open-type="share" class="row padding-xs" style="width: 150rpx;flex-shrink: 0;">
					<image class="share_icon" src="/static/images/article/shares.png"></image>
					<text class="text-df margin-left-sm">分享</text>
				</button>
                <input @focus="inputFocus" @blur="inputBlur" :adjust-position="false" @input="inputFun" :value="input" :placeholder="placeholder" />
                <view class="submit" @tap="submit">
					<image style="width: 60rpx;height: 60rpx;" src="../../../static/icon/lost/send.png"></image>
				</view>
            </view>
        <!-- </view> -->
    </block>
</template>

<script>
// gc_school/pages/article/detail.js
var app = getApp();
export default {
    data() {
        return {
            detail: {
                avatar: false,
                nickname: '',
                time: '',
                cate: 0,
                place: '',
                goods: '',
                dates: '',
                phone: '',
                method: '',
                remark: '',
                media_type: '',
                video: '',
                img: [],

                user: {
                    u_id: ''
                }
            },

            input: '',
            id: '',
            pid: 0,
            comment_list: [],
            placeholder: '请输入内容',
            bottom: 0,
            is_click: true,
            is_hide: '',
            img: '',
			u_id:'',
            child: {
                nickimg: '',
                nickname: '',
                id: '',
                uid: '',
                content: '',
                time: ''
            }
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        this.setData({
            id: options.id
        });
		var t = this;
		if(uni.getStorageSync('token')){
			app.globalData.util.request({
				url: 'Wechatuser/view',
				success(res)
				{
					t.u_id = res.data.data.u_id
					console.log(res.data.data)
				}
			},true)
		}
		
        this.getDetail(options.id);
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
    onShareAppMessage: function () {
        console.log(111);
        
		var self = this;
		if (self.detail.media_type == 2) {
			return {
				title: self.detail.title,
				query: '/gc_school/pages/lost/detail?id=' + self.id,
				imageUrl: self.detail.image[0]
			};
		} else {
			return {
				title: self.detail.title,
				query: '/gc_school/pages/lost/detail?id=' + self.id
			};
		}
    },
    onShareTimeline() {
        console.log(this);
        return {
            title: '失物招领',
            query: 'id=' + this.id
        };
    },
    methods: {
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

        getDetail(id) {
            var that = this;
            app.globalData.util.request({
                url: 'ZhInfo/detail',
                method: 'GET',
                data: {
                    info_id: id,
					s_id: uni.getStorageSync('schoolId')
                },

                success(res) {
                    console.log(res.data.data);
                    that.setData({
                        detail: res.data.data,
                        comment_list: res.data.data.comment
                    });
                }
            });
        },

        makecall() {
            uni.makePhoneCall({
                phoneNumber: this.detail.phone
            });
        },

        //文本框输入的值
        inputFun(e) {
            this.setData({
                input: e.detail.value.replace(/\s*/g, '')
            });
        },

        //给父级留言
        comment(e) {
            var groupindex = e.currentTarget.dataset.groupindex;
            var index = e.currentTarget.dataset.index;
            this.setData({
                input: ''
            });

            if (groupindex != '-1' && index != '-1') {
                this.setData({
                    placeholder: '回复@' + this.comment_list[groupindex].child[index].nickname,
                    pid: this.comment_list[groupindex].child[index].id
                });
            } else {
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

        //提交留言
        async submit() {
            await this.login().then((res)=>{
                console.log("您已登陆！");
            })

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
                    url: 'ZhCommentList/add',
                    data: {
                        info_id: self.id,
                        s_id: uni.getStorageSync('schoolId'),
                        content: self.input,
                        p_id: self.pid
                    },

                    success(res) {
                        setTimeout(function(){
							self.getDetail(self.id);
						},1000)
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
                },true);
            } else {
                uni.showToast({
                    title: '请勿重复点击',
                    icon: 'none'
                });
            }
        },

        //删除评论
        del(e) {
            var self = this;
            console.log(e.currentTarget.dataset.id);
            uni.showModal({
                content: '确认删除该评论吗？',

                success(res) {
                    if (res.confirm) {
                        app.globalData.util.request({
                            url: 'ZhCommentList/delete',
                            data: {
                                id: e.currentTarget.dataset.id,
                                s_id: uni.getStorageSync('schoolId'),
                            },

                            success(result) {
                                if (result.data.status == 200) {
                                    uni.showToast({
                                        title: result.data.message
                                    });
                                    setTimeout(function () {
                                        self.getDetail(self.id);
                                    }, 1000);
                                }
                            }
                        },true);
                    } else {
                        console.log('取消删除');
                    }
                }
            });
        },

        //收藏/取消收藏
        fav(e) {
            console.log(e);

            if (uni.getStorageSync('openid') == '') {
                uni.showToast({
                    title: '请先登录',
                    icon: 'none'
                });
                setTimeout(function () {
                    uni.navigateTo({
                        url: '/gc_school/pages/user/index'
                    });
                }, 1000);
                return;
            } else {
                var self = this;
                app.globalData.util.request({
                    url: 'entry/wxapp/goodsFav',
                    data: {
                        id: e.currentTarget.dataset.id,
                        openid: uni.getStorageSync('openid'),
                        type: 3
                    },

                    success(res) {
                        if (res.data.errno == 0) {
                            self.getDetail(self.id);
                        }
                    }
                });
            }
        },

        showmore(e) {
            console.log(e.currentTarget.dataset.index);
            var data = this.comment_list;
            data[e.currentTarget.dataset.index].block = !data[e.currentTarget.dataset.index].block;
            this.setData({
                comment_list: data
            });
        },

        //图片预览
        preview(e) {
            uni.previewImage({
                current: e.currentTarget.dataset.img,
                urls: e.currentTarget.dataset.list
            });
        }
    }
};
</script>
<style>
/* gc_school/pages/article/detail.wxss */
page {
    background: #F7F5F6;
}
/* .bgmain {
    background-color: #ff6444;
    color: white;
} */
.top_box{
	background-color: white;
	border-bottom-right-radius: 40rpx;
	border-bottom-left-radius: 40rpx;
}

.article_box .avatar {
    width: 85rpx;
    height: 85rpx;
    border-radius: 50%;
    margin-right: 20rpx;
}
.article_box .nickname {
    font-size: 28rpx;
    font-weight: bold;
}
.article_box .date {
    font-size: 28rpx;
    color: #888888;
	margin-left: auto;
}
.icon_item image {
    width: 35rpx;
    height: 35rpx;
}
.icon_item text {
    margin-left: 10rpx;
    color: #999999;
}
.item_img {
    width: 180rpx;
    height: 180rpx;
    margin-right: 20rpx;
}
/* 留言 */
.comment_box {
    margin-top: 20px;
    background: #fff;
    margin-bottom: 150rpx;
	border-radius: 40rpx;
	/* border-top-left-radius: 40rpx; */
	/* border-top-right-radius: 40rpx; */
}
.comment_box .name {
    padding: 20rpx 30rpx 0;
}
.comment_item_first {
    /* border-top: 1px solid rgba(201, 201, 201, 0.6); */
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
    font-size: 26rpx;
}
.time {
    color: #b7b7b7;
    font-size: 24rpx;
    margin-left: 10rpx;
    /* margin-top: 10rpx; */
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
    padding: 10rpx 20rpx;
    /* background-color: #ff6666; */
    color: white;
    margin-left: 20rpx;
    flex-shrink: 0;
    border-radius: 10rpx;
    /* #FED948 */
}
.top {
    display: flex;
    align-items: center;
}
.more {
    font-size: 28rpx;
    text-align: center;
    margin-bottom: 10rpx;
}
.item {
    font-size: 28rpx;
    /* line-height: 50rpx; */
	margin: 20rpx 0;
}
.icon{
	width: 30rpx;
	height: 30rpx;
	margin-right: 10rpx;
}
.val{
	color: #666666;
	font-size: 28rpx;
	font-weight: 200;
}
button {
	background: white;
	line-height: 30rpx;
}

button::after {
	outline: none;
	border: 0;
}

.button-hover {
	background: white;
}
.share_icon {
    width: 44rpx;
    height: 44rpx;
}
</style>
