<template>
    <block>
        <scroll-view scroll-y class="scrollPage">
            <cu-custom bgColor="bgmains" class="bgmains" :isBack="false" style="">
            <view slot="content">我的</view>
        </cu-custom>
        <view class="header"  :style="{'padding-top':CustomBar+'px'}">
            <view class="user_info row margin-lr-lg" >
                <image :src="loginuserinfo.avatarUrl ? loginuserinfo.avatarUrl : logo" class="avatar"></image>
                <view class="info">
                    <view class="nickname">
                        {{userInfo.nickname||""}}

                    <view v-if="!islogin"  @tap="bindgetuserinfo" class="m_btn" >点击登录</view>

                    </view>
                    <!-- <view class="phone margin-top-xs"  v-if="islogin && userInfo.phone" >
                       手机号： {{userInfo.phone}}
                    </view> -->
                    

                </view>

            </view>
            <view class="other row margin-top">
                <view class="item" @click="go('/gc_school/pages/user/balance',1)">
                    <view class="val">{{userInfo.balance}}</view>
                    <view class="key">余额</view>
                </view>
                <view class="item" @click="go('/gc_school/pages/user/follow',1)">
                    <view class="val">{{userInfo.follow_num||0}}</view>
                    <view class="key">关注</view>
                </view>
                <view class="item"  @click="go('/gc_school/pages/user/fans',1)">
                    <view class="val">{{userInfo.fans_num||0}}</view>
                    <view class="key">粉丝</view>
                </view>
                <view class="item" @click="go('/gc_school/pages/article/my',1)">
                    <view class="val">{{userInfo.articles_num||0}}</view>
                    <view class="key">圈子</view>
                </view>
            </view>
        
        </view>

        <view class="isrun" v-if="!islogin && sysparment.runner_auth_switch == 1" @tap="bindgetuserinfo">
            <image src="https://test.fkynet.net/wximage/auth.png" mode="widthFix"></image>
        </view>
		
        <view class="isrun" @tap="link" data-url="/gc_school/pages/register/index" v-if="sysparment.runner_auth_switch == 1">
            <image v-if="islogin && userInfo.run_status == '0'" src="https://test.fkynet.net/wximage/auth.png" mode="widthFix"></image>
            <image v-if="islogin && userInfo.run_status == '1'" src="https://test.fkynet.net/wximage/auth_ing.png" mode="widthFix"></image>
            <image v-if="islogin && userInfo.run_status == '2'" src="https://test.fkynet.net/wximage/auth_already.png" mode="widthFix"></image>
            <image v-if="islogin && userInfo.run_status == '-1'" src="https://test.fkynet.net/wximage/auth_fail.png" mode="widthFix"></image>
        </view>
		
        <view class="box padding margin-lr margin-bottom margin-top">
            <view class="tit">
                常用工具
            </view>
            <view class="row flex-wrap">
                <block v-for="(item,index) in navList" :key="index">
                    <view class="nav row margin-tb" @click="go(item.path,item.is_login)" v-if="index<4">
                        <image
                            class="icon margin-bottom"
                            :src="item.icon"
                            mode="scaleToFill"
                        />
                        {{item.name}}
                        <view class="other" @click.stop v-if="item.func">
                            <button class="other" open-type="contact" v-if="item.func=='cell'">
                            </button>
                            <view class="other" v-if="item.func=='msg'"  @tap="msg">

                            </view>
                            <view class="other" v-if="item.func=='dian'"  @tap="dian" :data-url="'/gc_school/pages/shop/my?id=' + userInfo.store_id"></view>
                        </view>
                    </view>
                </block>
            </view>
        </view>
         <view class="box padding margin-lr margin-bottom">
            <view class="tit">
                常用工具
            </view>
            <view class="row flex-wrap">
				<view class="nav row margin-tb" @click="go('/gc_school/pages/vip/index',1)" v-if="sysparment.user_vip_switch==1">
				    <image class="icon margin-bottom" src="/static/icon/me/icon14.png" mode="scaleToFill" />
				    VIP会员
				</view>
				<view class="nav row margin-tb" @tap="dian" :data-url="'/gc_school/pages/shop/my?id=' + userInfo.store_id" v-if="userInfo.has_store==1">
				    <image class="icon margin-bottom" src="/static/icon/me/icon9.png" mode="scaleToFill" />
				    我的小店
				</view>
				<view class="nav row margin-tb" @click="go('/gc_school/pages/mygrab/index',1)" v-if="userInfo.run_status==2">
				    <image class="icon margin-bottom" src="/static/icon/me/icon8.png" mode="scaleToFill" />
				    我的接单
				</view>
                <block v-for="(item,index) in navList" :key="index">
                    <view class="nav row margin-tb" @click="go(item.path,item.is_login)"  v-if="index>3">
                        <image
                            class="icon margin-bottom"
                            :src="item.icon"
                            mode="scaleToFill"
                        />
                        {{item.name}}
                        <view class="other" @click.stop v-if="item.func">
                            <button class="other" open-type="contact" v-if="item.func=='cell'">
                            </button>
                            <view class="other" v-if="item.func=='msg'"  @tap="msg">

                            </view>
                            <view class="other" v-if="item.func=='dian'"  @tap="dian" :data-url="'/gc_school/pages/shop/my?id=' + userInfo.store_id"></view>
                        </view>
                    </view>
                </block>
            </view>
        </view>


        </scroll-view>

     
<view style="height:100rpx;"></view>
<pt-footer flg="3"></pt-footer>
    </block>
</template>

<script>
var app = getApp();
export default {
    data() {
        return {
            ...this.configInfo,
            navList:[
                { name:"我的发布",icon:"/static/icon/me/icon1.png",path:"/gc_school/pages/article/my" ,role:"1" ,is_login:'1'},
                { name:"我的喜欢",icon:"/static/icon/me/icon2.png",path:"/gc_school/pages/article/favorite" ,role:"1",is_login:'1' },
                { name:"我的打赏",icon:"/static/icon/me/icon3.png",path:"/gc_school/pages/user/reward" ,role:"1",is_login:'1' },
                { name:"我的地址",icon:"/static/icon/me/icon4.png",path:"/gc_school/pages/address/index" ,role:"1",is_login:'1' },
                // { name:"意见反馈",icon:"/static/icon/me/icon5.png",path:"" ,role:"1" },
                // { name:"VIP会员",icon:"/static/icon/me/icon14.png",path:"/gc_school/pages/vip/index" ,role:"1",is_login:'1' },
                { name:"联系客服",icon:"/static/icon/me/icon6.png",func:"cell" ,role:"1",is_login:'0' },
                { name:"接单大厅",icon:"/static/icon/me/icon7.png",path:"/gc_school/pages/grab/index" ,role:"2",is_login:'0' },
                // { name:"我的接单",icon:"/static/icon/me/icon8.png",path:"/gc_school/pages/mygrab/index" ,role:"1",is_login:'1' },
                // { name:"公众号授权",icon:"/static/images/auth1.png",path:"" ,role:"2" },
               
                // { name:"我的小店",icon:"/static/icon/me/icon9.png",func:"dian" ,role:"1",is_login:'1' },
                { name:"我的礼券",icon:"/static/icon/me/icon12.png",path:"/gc_school/pages/cupon/index" ,role:"1",is_login:'1' },
                { name:"消息订阅",icon:"/static/icon/me/icon11.png",func:"msg" ,role:"1",is_login:'0' },
                { name:"设置管理",icon:"/static/icon/me/icon13.png",path:"/gc_school/pages/user/setting" ,role:"1",is_login:'0' },
                
            ],
            userInfo: {
                coupon: 0,
                balance: 0,
                run_status: '',
                has_store: 0,
                store_id: ''
            },

            islogin: false,
            loginuserinfo: [],

            // color:wx.getStorageSync('color')
            // color: '#FF6444',

            logo: '',
            getUseInfo: false,

            sysparment: {
                runner_auth_switch: 0,
                vip: 0
            }
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        // if (uni.getStorageSync('token')) {
        //     // console.log('用户信息', uni.getStorageSync('userinfo'));
        //     this.setData({
        //         loginuserinfo: uni.getStorageSync('userinfo'),
        //         islogin: true
        //     });
        // } // this.getconfig();
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        if (uni.getStorageSync('token')) {
            this.getUser();
			this.loginuserinfo = uni.getStorageSync('userinfo'),
			this.islogin = true
        } // else{

        this.getconfig(); // }

        console.log('1221221', uni.getStorageSync('userinfo'));
        this.setData({
            // userInfo: uni.getStorageSync('userinfo')
        });
    },
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
		async go(url,isLogin)
		{
			console.log(isLogin)
			if(isLogin==1)
			{
				await this.login().then((res)=>{
				    console.log("您已登陆！");
				})
				uni.navigateTo({
					url:url
				})
			}
			else{
				uni.navigateTo({
					url:url
				})
			}
		},
        link(e) {
            // console.log("跑腿状态",this.data.userInfo.run_status.status)
            console.log(this.userInfo.run_status);

            if (this.userInfo.run_status == 0 || this.userInfo.run_status == -1) {
                uni.navigateTo({
                    url: e.currentTarget.dataset.url
                });
            }
        },

        yue() {
            console.log(this.sysparment.is_pay_open); // return ;

            uni.navigateTo({
				url:'/gc_school/pages/user/balance'
                // url: '/gc_school/pages/replay/index?type=' + this.sysparment.is_pay_open
            });
        },

        link2(e) {
            uni.navigateTo({
                url: e.currentTarget.dataset.url
            });
        },

        //获取列表
        getUser() {
            const self = this;
            app.globalData.util.request({
                url: 'WechatUser/view',
                data: {
                    s_id: uni.getStorageSync('schoolId')
                },
                success(res) {
					console.log(res.data.data)
                    self.setData({
						userInfo: res.data.data
                        // userInfo: {
                        //     ...self.userInfo,
                        //     money: res.data.data.balance,
                        //     coupon: res.data.data.coupon,
                        //     run_status: res.data.data.run_status,
                        //     has_store: res.data.data.has_store,
                        //     store_id: res.data.data.store_id
                        // } // logo:res.data.data.data.logo
                    });

                    if (res.data.data.logo == '') {
                        self.setData({
                            logo: '/static/images/code/c17.png'
                        });
                    } else {
                        self.setData({
                            logo: res.data.data.logo
                        });
                    } 
                }
            },true);
        },


        //获取认证
        getUseRunerStatus() {
            const self = this;
            app.globalData.util.request({
                url: 'entry/wxapp/RunerStatus',
                data: {
                    openid: uni.getStorageSync('openid')
                },

                success(res) {
                    console.log('65897879987', res);
                    self.setData({
                        userInfo: { ...self.userInfo, run_status: res.data.data }
                    });
                }
            });
        },

        wxlogin() {
            uni.getUserProfile({
                desc: '用于获取用户信息',

                success(res) {
                    console.log(res);
                }
            });
        },

        //用户授权登录
        bindgetuserinfo(data) {
            console.log('打印', data);
            var that = this;
			uni.getUserProfile({
			    desc: '用于获取用户信息',
			    success(res) {
					console.log(res)
					uni.login({
						success(code)
						{
							console.log(code)
							app.globalData.util.request({
							    url: 'Login/miniLogin',
							    data: {
							        code: code.code,
									nickName:res.userInfo.nickName,
									avatar:res.userInfo.avatarUrl,
							    },
								success(user)
								{
									uni.setStorageSync('userinfo',res.userInfo)
									that.loginuserinfo = res.userInfo
									that.setData({
										islogin: true
									})
									console.log(user.data.token)
									uni.setStorageSync('token',user.data.token)
									that.getUser()
								}
							})
						}
					})
				
				}
			});
			
			// uni.getUserProfile({
			//     desc: '用于获取用户信息',
			//     success(res) {
			// 		console.log(res)
			// 	// app.globalData.util.request({
			// 	//     url: 'entry/wxapp/GetUid',
			// 	//     data: {
			// 	//         code: data.code
			// 	//     },
			// 	}
			// });
            
        },

        //获取用户openid
        getGetUid: function (a) {
            var that = this;
            uni.login({
                success: function (data) {
                    if (data.code) {
                        app.globalData.util.request({
                            url: 'entry/wxapp/GetUid',
                            data: {
                                code: data.code
                            },
                            success: function (data) {
                                that.setData({
                                    getUseInfo: false
                                });
                                console.log(data);
                                console.log('这里的');
                                uni.aldPushSendOpenid(data.data.data.openid); // setTimeout(function(){
                                // 	wx.aldPushSubscribeMessage({
                                // 		eventId: '6010dad790fcd68beee4d642',
                                // 		success(res) {
                                // 		// 成功后的回调函数
                                // 		console.log(res)
                                // 	},
                                // 		fail(res, e) {
                                // 		// 失败后的回调函数
                                // 		console.log(res)
                                // 		console.log(e)
                                // 	}
                                // });
                                // },3000)

                                uni.setStorageSync('openid', data.data.data.openid); // wx.getUserProfile({
                                // 	desc:"用户获取用户信息",
                                //   success: function (params) {
                                // console.log("扣扣",params)
                                // var userInfo = params.userInfo

                                uni.setStorageSync('userinfo', a);
                                that.setData({
                                    loginuserinfo: a,
                                    islogin: true
                                });
                                that.toUserInfo(data.data.data.openid, a);
                                that.getUser(); // },
                                // fail(err)
                                // {
                                // 	console.log(err)
                                // }
                                // })

                                return false;
                            }
                        });
                    }
                }
            });
        },

        toUserInfo: function (openid, userInfo) {
            console.log(userInfo);
            var that = this;
            app.globalData.util.request({
                url: 'entry/wxapp/UserInfoUpdate',
                data: {
                    openid: openid,
                    nickname: userInfo.nickName,
                    avatar: userInfo.avatarUrl
                },
                success: function (data) {
                    console.log(data.data);
                }
            });
        },

        getconfig() {
            var that = this;
			console.log("配置接口")
            app.globalData.util.request({
                url: 'Setting/view',
				data:{},
                success(res) {
					console.log("配置信息",res.data.data.sys)
                    console.log(res.data.data.sys.logo);
                    that.setData({
                        sysparment: res.data.data.sys
                    });

                    if (res.data.data.sys.xcx_logo == '') {
                        that.setData({
                            logo: '/static/images/code/c17.png'
                        });
                    } else {
                        that.setData({
                            logo: res.data.data.sys.xcx_logo
                        });
                    }

                    that.msg();
                }
            });
        },

        msg() {
            console.log('弹出框');
            var self = this; // wx.showModal({
            // 	title:"提示",
            // 	content:'允许接收订阅消息',
            // 	success(res){
            // 		if(res.confirm){

            uni.getSetting({
                withSubscriptions: true,

                success(res) {
                    console.log('设置', res);
                    console.log(res.subscriptionsSetting);
                }
            });
            uni.requestSubscribeMessage({
                tmplIds: [self.sysparment.template_new, self.sysparment.template_grab,self.sysparment.template_comment],

                // 此处可填写多个模板 ID，但低版本微信不兼容只能授权一个
                success(res) {
                    console.log('已授权接收订阅消息'); // app.util.request({
                    // 	url: 'entry/wxapp/sendSubscribeMessage',
                    // 	data: {
                    // 			ordersn:'3583202103171811593073'
                    // 	},
                    // })
                    // wx.navigateTo({
                    // url: '/schoolrun/pages/shop/index?id='+id+'&openid='+openid+'&name='+name+'&status='+status,
                    // })
                }
            }); // 		}
            // 		else{
            // 		}
            // 	}
            // })
        },

        dian(e) {
            var self = this;
            uni.requestSubscribeMessage({
                tmplIds: [self.sysparment.template_store],

                // 此处可填写多个模板 ID，但低版本微信不兼容只能授权一个
                success(res) {},

                complete() {
                    uni.navigateTo({
                        url: e.currentTarget.dataset.url
                    });
                }
            });
            console.log(e.currentTarget.dataset);
        }
    }
};
</script>
<style>
page {
    background: white;
}
.UCenter-bg {
    background: white;
    /* background-image: url("http://gc-paotui.mync.xyz/web/resource/images/index.jpg"); */
    background-size: cover;
    /* height: 550rpx; */
    display: flex;
    /* justify-content: center; */
    padding-top: 40rpx;
    overflow: hidden;
    position: relative;
    flex-direction: row;
    align-items: center;
    color: black;
    font-weight: 300;
    /* text-shadow: 0 0 3px rgba(0, 0, 0, 0.3); */
    /* line-height: 550rpx; */
    padding: 50rpx 60rpx;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
}
.contents {
    padding: 70rpx 0 30rpx 0;
    color: white;
    font-size: 30rpx;
    text-align: center;
    background: #ff6444;
    /* background-image: linear-gradient(to right, #0396FF, #23AFE4, #ABDCFF) !important; */
}
.two_flex image {
    width: 2em !important;
    height: 2em !important;
    margin-right: 20rpx !important;
}
.flex-direction {
    text-align: left;
}
.middle {
    padding-left: 60rpx;
}
.isrun {
    padding: 0 20rpx;
}
.content image {
    width: 1.3em !important;
    height: 1.3em !important;
    margin-right: 20rpx !important;
}
.UCenter-bg text {
    opacity: 0.8;
}

.UCenter-bg image {
    width: 140rpx;
    height: 140rpx;
    margin-right: 30rpx;
    /* margin: 135rpx 30rpx 0 50rpx; */
    flex-shrink: 0;
}

.UCenter-bg .gif-wave {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    z-index: 99;
    mix-blend-mode: screen;
    height: 100rpx;
}

map,
.mapBox {
    left: 0;
    z-index: 99;
    mix-blend-mode: screen;
    height: 100rpx;
}

map,
.mapBox {
    width: 750rpx;
    height: 300rpx;
}
#cuIcon-homefills {
    width: 48rpx !important;
    position: relative !important;
    display: block !important;
    height: 48rpx !important;
    margin: 0 auto 10rpx !important;
    text-align: center !important;
    font-size: 40rpx !important;
}
#cuIcon-homefillt {
    width: 72rpx !important;
    position: absolute !important;
    display: block !important;
    height: 72rpx !important;
    margin: 0 auto 10rpx !important;
    text-align: center !important;
    font-size: 40rpx !important;
    top: 0;
    left: 0;
}
.indedx {
    color: #010101;
    font-size: 22rpx;
    padding: 10rpx 0 10rpx 0;
}
.indedxs {
    color: #010101;
    font-size: 22rpx;
    margin-top: 10rpx;
    padding: 10rpx 0 10rpx 0;
    /* padding: -1rpx 0 10rpx 0; */
    box-sizing: border-box;
}
.indedxt {
    color: #ff6444;
    font-size: 22rpx;
    padding: 10rpx 0 10rpx 0;
}
.bgmains {
    background-color: #fff !important;
}
.menu {
    margin: 0 !important;
}
</style>

<style lang="scss">
    @import "./main.scss";
</style>