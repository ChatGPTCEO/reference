<template>
    <block >
        <cu-custom bgColor="bgmain" >
            <view slot="content">校园圈子</view>
        </cu-custom>
        <view class="header padding-lr">
             <view class="slide_box">
                <swiper circular :autoplay="autoplay" class="swiper-box" @change="index_swiperChange" :duration="duration">
                    <block v-if="slideList.length > 0">
                        <swiper-item v-for="(item, index) in slideList" :key="index">
                            <image
                            class="banner"
                                @tap="slideJump"
                                :data-url="item.url"
                                :data-type="item.url_type"
                                :class="index_swiperCurrent == index ? 'on slide-image' : ' slide-image'"
                                :data-index="index"
                                :lazyLoad="true"
                                :src="item.img"
                            ></image>
                        </swiper-item>
                    </block>
                    <block v-else>
                        <swiper-item>
                            <image
                                :lazyLoad="true"
                                :class="index_swiperCurrent == index ? 'on slide-image' : ' slide-image'"
                                src="https://image.mync.xyz/subschool/202203/202203161109260285787.png"
                            ></image>
                        </swiper-item>
                    </block>
                </swiper>
                <view class="indicator-dots">
                    <block v-for="(item, index) in slideList" :key="index">
                        <view :class="index_swiperCurrent == index ? 'dots_on' : ''"></view>
                    </block>
                </view>
            </view>
            <view class="classify_list flex" v-if="cateList.length>0">
                <block v-for="(item,index) in cateList" :key="index">
                    <view class="classify flex" @click="go(item.url?item.url:('/gc_school/pages/article/list?class_id='+item.class_id+'&class_name='+item.class_name))">
                        <image
                            class="icon margin-tb-xs"
                            :src="item.icon"
                            mode="scaleToFill"
                        />
                        {{item.class_name}}
                    </view>
                </block>
            </view>
			<view class="classify_list flex" v-else>
			    <block v-for="(item,index) in cateList_default" :key="index">
			        <view class="classify flex">
			            <image
			                class="icon margin-tb-xs"
			                :src="item.icon"
			                mode="scaleToFill"
			            />
			            {{item.class_name}}
			        </view>
			    </block>
			</view>
			
        </view>
        <view class="margin">
           <view class="tab_bar flex">
               <view class="tab" :class="type == 0?'cur':''" @tap="changetype" data-type="0">全部</view>
               <view class="tab" :class="type == 2?'cur':''" @tap="changetype" data-type="2">最新</view>
               <view class="tab" :class="type == 1?'cur':''" @tap="changetype" data-type="1">最热</view>
           </view>
            <!-- 分类 -->
            <view class="cate_box flex margin-top justify-between" v-if="1==2">
                <view class="cate_item_box flex">
                    <block key="index" v-for="(item, index) in cateList" :key="index">
                        <view @tap="cateChange" :data-index="index" :class="'cate_item ' + (cate_index == index ? 'cate_active' : '')">{{ item.class_name }}</view>
                    </block>
                </view>
                <view class="flex label_box" v-if="cateList.length > 0">
                    <view @tap="changetype" data-type="2" :class="'label_item ' + (type == 2 ? 'label_item_active' : '')">最新</view>
                    <view @tap="changetype" data-type="1" :class="'label_item ' + (type == 1 ? 'label_item_active' : '')">最热</view>
                </view>
            </view>

            <!-- 文章列表 -->
            <view class="padding-bottom" style="padding-bottom: 100rpx">
                <block v-if="dataList.length == 0">
                    <view class="text-center margin-top text-df">暂无数据~</view>
                </block>
                    <block v-for="(item,index) in dataList" :key="index">
                        <view class="article padding"  @tap="toDetail" :data-id="item.article_id">
                            <view class="flex row">
                                <image v-if="item.is_anonymous==0"
                                    class="avatar" 
                                    :src="item.avatar ? item.avatar : 'https://test.fkynet.net/wximage/avatar.jpg'"
                                    mode="scaleToFill"
                                />
								<image v-else
								    class="avatar" 
								    src="https://test.fkynet.net/wximage/avatar.jpg"
								    mode="scaleToFill"
								/>
                                <view class="nickname">{{ item.is_anonymous==1?"匿名用户":item.nickname }}</view>
                                <view class="date">{{ item.createtime }}</view>
                                <image
                                    class="top"
                                    src="/static/icon/top.png"
                                    v-if="item.is_expired==1"
                                />
                            </view>
                            <view class="content margin-tb">
                                <!-- {{item.content}} -->
                                <rich-text :nodes="item.content"></rich-text>
                            </view>
                            <view class="imgs row  margin-bottom" v-if="item.image.length>0">
                                <block v-for="(image,index) in item.image" :key="index">
                                    <image
                                        class="img"
                                        :src="image"
                                        mode="aspectFill"
                                    />
                                </block>
                            </view>
							<view v-if="item.video" @click.stop="">
								<video :src="item.video" style="width: 100%;" class="margin-bottom"></video>
							</view>
                            <view class="footer row">
                                <view class="class_name" v-if="item.class_name">
                                    {{item.class_name}}
                                </view>
                                <view class="view">
                                    <image
										style="height: 45rpx;"
                                        class="icon"
                                        src="/static/icon/views.png"
                                        mode="scaleToFill"
                                    />
                                        {{item.views_num}}
                                </view>
                                <view class="comment">
                                     <image
                                        class="icon"
                                        src="/static/icon/comment.png"
                                        mode="scaleToFill"
                                    />
                                    {{item.comments_num}}
                                </view>
                                <view class="love" :class="item.is_fav==1?'cur':''">
                                     <image
                                        class="icon"
                                        src="/static/icon/love.png"
                                        mode="scaleToFill"
                                    />
                                    {{item.likes_num}}
                                </view>
                            </view>
                            
                        </view>
                    </block>
                    <block key="index" v-for="(item, index) in dataList" :key="index" v-if="1==2">
                        <view class="article_box padding" @tap="toDetail" :data-id="item.article_id">
                            <view class="flex">
                                <block v-if="item.is_anonymous == 0">
                                    <image class="avatar" :src="item.avatar ? item.avatar : 'https://gcwe7.link1024.com/web/img/avatar.png'"></image>
                                    <view class="">
                                        <view class="nickname">{{ item.nickname }}</view>
                                        <view class="date">{{ item.createtime }}</view>
                                    </view>
                                </block>
                                <block v-else>
                                    <image class="avatar" src="https://gcwe7.link1024.com/web/img/avatar.png"></image>
                                    <view class="">
                                        <view class="nickname">匿名用户</view>
                                        <view class="date">{{ item.createtime }}</view>
                                    </view>
                                </block>
                            </view>
                            <view class="content margin-top">{{ item.content }}</view>
                            <view v-if="item.media_type == '1'" class="margin-top">
                                <video @tap.stop.prevent="play" style="width: 100%" :src="item.video"></video>
                            </view>
                            <view v-else-if="item.media_type == '2'" class="margin-top">
                                <block v-for="(img, index1) in item.image" :key="index1">
                                    <image mode="aspectFill" @tap.stop.prevent="preview" :data-img="img" :data-list="item.image" class="item_img" :src="img"></image>
                                </block>
                            </view>
                            <view class="flex justify-between margin-top">
                                <view class="flex icon_item">
                                    <image src="/static/images/article/share.png"></image>
                                    <text>{{ item.collections_num }}</text>
                                </view>
                                <view class="flex icon_item">
                                    <image src="/static/images/article/comment.png"></image>
                                    <text>{{ item.comments_num }}</text>
                                </view>
                                <view class="flex icon_item">
                                    <image src="/static/images/article/fav.png"></image>
                                    <text>{{ item.likes_num }}</text>
                                </view>
                            </view>
                        </view>
                    </block>
            </view>
        </view>


            <!-- <view class="btn">立即发布</view> -->

            <!-- <image bindtap="jump" wx:if="{{cateList.length>0}}" data-url="/gc_school/pages/article/post" class="post_img" src="/images/article/submit.png"></image> -->
            <!-- <view bindtap="jump" data-url="/gc_school/pages/article/my" class="my_fixed">我的</view> -->

            <view class="right_fixed">
                <image v-if="cateList.length > 0" src="/static/images/article/i_fabu.png" @tap="jump" data-url="/gc_school/pages/article/post"></image>
                <image v-if="isTop" class="top_icon" src="/static/images/article/tops2.png" @tap="top"></image>
                <!-- <image class="my" src="/static/images/article/i_my.png" @tap="jump" data-url="/gc_school/pages/article/my"></image> -->
            </view>

            <!-- <view class="publish flex justify-between text-center">
    <view class="publish_item flex"  bindtap="jump" data-url="/gc_school/pages/article/post">
      <image src="/images/article/fabu1.png"></image>
      <view class="text-white text-df">一键发布</view>
    </view>
    <view class="publish_item flex" bindtap="jump" data-url="/gc_school/pages/article/my" style="background:#08BC6C;">
      <image class="my" src="/images/article/my1.png"></image>
      <view class="text-white text-df">我的发布</view>
    </view>
  </view> -->
  <view style="height:100rpx;"></view>
         <pt-footer flg="1"></pt-footer>
    </block>
</template>

<script>
// gc_school/pages/article/index.js
var app = getApp();
export default {
    data() {
        return {
            url: '',
            info: [1, 2, 3],
            index_swiperCurrent: 0,
            cateList: [],
            cate_index: 0,
            dataList: [],
            type: 0,
            is_loadmore: true,
            page: 1,
            slideList: [],
            freshen: true,
            autoplay: 0,
            duration: '',
            img: '',
			isTop:false,
			cateList_default:[
				{'class_name':'校园表白','icon':'https://test.fkynet.net/wximage/biaobai.png'},
				{'class_name':'游戏代练','icon':'https://test.fkynet.net/wximage/dailian.png'},
				{'class_name':'影视摄影','icon':'https://test.fkynet.net/wximage/sheying.png'},
				{'class_name':'运动健身','icon':'https://test.fkynet.net/wximage/jianshen.png'},
			]
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        if (!uni.getStorageSync('schoolId')) {
            if (options.s_id) {
                uni.setStorageSync('schoolId', options.s_id);
            }
        }
		
        this.getCate();
        this.getSlide();
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        console.log('返回');
        console.log('是否需要重新加载', app.globalData.isload); // if(this.data.freshen)
        // {
        //列表是否需要重新加载，首页切换学校的话列表需要重新加载
        // if(app.globalData.isload)
        // {
        // this.getCate()
        // this.getSlide()
        // this.setData({
        //   dataList:[],
        //   page:1,
        //   cate_index:0
        // })
        // }

        app.globalData.isload = false; // }
        // else{
        //   this.setData({
        //     freshen:true
        //   })
        // }
        // console.log("赋值",this.data.freshen)
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
    onReachBottom: function () {
        if (this.is_loadmore) {
            this.setData({
                page: this.page + 1
            });
            this.getLst(this.cateList[this.cate_index]['id']);
        } else {
            uni.showToast({
                title: '没有更多数据了~',
                icon: 'none'
            });
        }
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        // console.log("打印的",'gc_school/pages/article/index?s_id='+wx.getStorageSync('schoolId'))
        return {
            path: '/gc_school/pages/article/index?s_id=' + uni.getStorageSync('schoolId')
        };
    },
    onShareTimeline() {
        return {
            title: '校园圈子',
            query: 's_id=' + uni.getStorageSync('schoolId')
        };
    },
    methods: {
		onPageScroll(e) { //根据距离顶部距离是否显示回到顶部按钮
			if (e.scrollTop > 200) { //距离大于200时显示
				this.isTop = true
			} else { //距离小于200时隐藏
				this.isTop = false
			}
		},
		top() { //回到顶部
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 300
			})
		},
        //获取轮播图
        getSlide() {
            var that = this;
            app.globalData.util.request({
                url: 'Slide/index',
                method: 'POST',
                data: {
                    s_id: uni.getStorageSync('schoolId'),
					show_type:3
                },

                success(res) {
                    console.log(res.data.data);
                    that.setData({
                        slideList: res.data.data.list
                    });
                }
            });
        },

        play() {},

        //进入详情页面
        toDetail(e) {
            console.log(e.currentTarget.dataset.id);
            uni.navigateTo({
                url: '/gc_school/pages/article/detail?id=' + e.currentTarget.dataset.id
            });
        },

        //轮播图跳转
        slideJump(e) {
            console.log(e);

            if (e.currentTarget.dataset.type == 1) {
                uni.navigateTo({
                    url: e.currentTarget.dataset.url
                });
            } else {
                if (e.currentTarget.dataset.type == 2) {
                    console.log('appid是', e.currentTarget.dataset.url);
                    uni.navigateToMiniProgram({
                        appId: e.currentTarget.dataset.url,
                        path: '',
                        extraData: {
                            foo: 'bar'
                        },
                        envVersion: 'release',

                        success(res) {
                            console.log('打开成功');
                        }
                    });
                } else if (e.currentTarget.dataset.type == 3) {
                    uni.navigateTo({
                        url: '/gc_school/pages/webview/index?url=' + e.currentTarget.dataset.url
                    });
                }
            }
        },

        //获取分类
        getCate() {
            var that = this;
            app.globalData.util.request({
                url: 'ZhForumClass/index',
                method: 'GET',
                data: {
                    s_id: uni.getStorageSync('schoolId')
                },

                success(res) {
                    console.log(res.data.data.list);
                    that.cateList=[
                        ...res.data.data.list,
                        // {
                        //     class_name: "二手交易",
                        //     icon: "https://image.mync.xyz/subschool/202203/202203241501490288105.png",
                        //     link:"/gc_school/pages/secondhand/index"
                        // },
                        // {
                        //     class_name: "失物招领",
                        //     icon: "https://image.mync.xyz/subschool/202203/202203241502410248362.png",
                        //     link:"/gc_school/pages/lost/index"
                        // }
                    ]
                    // that.setData({
                       
                    // });
					if(res.data.data.list.length>0)
					{
						that.getLst(res.data.data.list[0]['class_id']);
					}
                }
            });
        },

        //图片预览
        preview(e) {
            this.setData({
                freshen: false
            });
            uni.previewImage({
                current: e.currentTarget.dataset.img,
                urls: e.currentTarget.dataset.list
            });
        },

        //获取文章列表
        getLst(cid) {
            var that = this;
            app.globalData.util.request({
                url: 'ZhArticles/index',
                method: 'GET',
                data: {
                    s_id: uni.getStorageSync('schoolId'),
                    // class_id: cid,
                    type: that.type,
                    page: that.page
                },
				header:{
					'Authorization' : uni.getStorageSync('token')
				},
                success(res) {
                    console.log(res.data.data.list);

                    if (res.data.data.list.length < 5) {
                        that.setData({
                            is_loadmore: false
                        });
                    }

                    for (var i = 0; i < res.data.data.list.length; i++) {
                        that.dataList.push(res.data.data.list[i]);
                        that.setData({
                            dataList: that.dataList
                        });
                    }
                }
            });
        },

        changetype(e) {
            this.setData({
                type: e.currentTarget.dataset.type,
                page: 1,
                is_loadmore: true,
                dataList: []
            });
            this.getLst(this.cateList[this.cate_index]['class_id']);
        },

        cateChange(e) {
            this.setData({
                cate_index: e.currentTarget.dataset.index,
                page: 1,
                is_loadmore: true,
                dataList: []
            });
            this.getLst(this.cateList[e.currentTarget.dataset.index]['class_id']);
        },

        upload() {
            var that = this;
            uni.chooseMedia({
                success(res) {
                    console.log(res);
                    console.log(res.type);
                    console.log(res.tempFiles[0]['tempFilePath']);
                    that.setData({
                        url: res.tempFiles[0]['tempFilePath']
                    }); // console.log(res)
                    // console.log(res.tempFilePaths[0])
                }
            });
        },

        index_swiperChange: function (e) {
            this.setData({
                index_swiperCurrent: e.detail.current
            });
        },

        async jump(e) {
            console.log(e);

            await this.login().then((res)=>{
                console.log("您已登陆！");
            })
			uni.navigateTo({
				url: e.currentTarget.dataset.url
			});
        }
    }
};
</script>
<style>
page {
    background: white;
}
.bgmain {
    /* background-color: #ff6444;
    color: white; */
}
.contents {
    padding: 70rpx 0 30rpx 0;
    color: white;
    font-size: 30rpx;
    text-align: center;
    background: #ff6444;
    /* background: white; */
    /* background-image: linear-gradient(to right, #0396FF, #23AFE4, #ABDCFF) !important; */
}
.slide_box {
    position: relative;
    /* padding:20rpx 0; */
    background-color: white;
   
}
 .banner{
    border-radius: 40rpx;
    overflow: hidden;
}
.swiper-box {
    /* padding: 10rpx 20rpx 10rpx 20rpx; */
    width: 690rpx;
    height: 320rpx;
}
.indicator-dots {
    width: 100%;
    position: absolute;
    bottom: 30rpx;
    left: 0;
    display: flex;
    justify-content: center;
}

.indicator-dots view {
    width: 12rpx;
    height: 12rpx;
    background: #d1d1d1;
    margin: 0 5rpx;
    border-radius: 50%;
}
.indicator-dots view.dots_on {
    background: white;
}
/* 分类 */
.cate_box {
}
.cate_item_box {
    margin-right: 20rpx;
    /* width: 75%; */
    overflow: scroll;
}
.cate_item {
    margin: 0 30rpx;
    font-size: 28rpx;
    color: #999999;
    position: relative;
    flex-shrink: 0;
    height: 40rpx;
}
.cate_active {
    color: black;
    font-weight: bold;
    font-size: 34rpx;
}
.cate_active::after {
    position: absolute;
    content: '';
    width: 40rpx;
    height: 2rpx;
    background: #ff6344;
    bottom: -6rpx;
    left: 0;
    right: 0;
    margin: 0 auto;
}
.label_box {
    /* width: 25%; */
    flex-shrink: 0;
}
.label_item {
    border: 2rpx solid #ff6344;
    padding: 5rpx 15rpx;
    color: #ff6344;
}
.label_item_active {
    background: #ff6344;
    color: white;
}

/* 文章列表 */
.article_box {
    margin-top: 40rpx;
    box-shadow: 0px 4px 20px 0px rgba(153, 153, 153, 0.1);
    border-radius: 10rpx;
}
.article_box .avatar {
    width: 75rpx;
    height: 75rpx;
    border-radius: 50%;
    margin-right: 20rpx;
}
.article_box .nickname {
    font-size: 30rpx;
    font-weight: bold;
}
.article_box .date {
    font-size: 24rpx;
    color: #999999;
}
.icon_item image {
    width: 35rpx;
    height: 35rpx;
}
.icon_item text {
    margin-left: 10rpx;
    color: #999999;
}
.btn {
    background: #ff6344;
    color: white;
    width: 70%;
    margin-left: 15%;
    padding: 30rpx;
    border-radius: 50rpx;
    position: fixed;
    bottom: 20rpx;
}
.post_img {
    width: 90rpx;
    height: 90rpx;
    position: fixed;
    right: 0;
    bottom: 32%;
    background: white;
    border-radius: 50%;
}
.item_img {
    width: 180rpx;
    height: 180rpx;
    margin-right: 20rpx;
}
.my_fixed {
    width: 90rpx;
    height: 90rpx;
    position: fixed;
    right: 0;
    bottom: 20%;
    background: #ff6344;
    border-radius: 50%;
    line-height: 90rpx;
    text-align: center;
    color: white;
}
.publish {
    position: fixed;
    bottom: 20rpx;
    left: 10%;
    width: 80%;
    /* left: 50%; */
    /* transform: translateX(-50%); */
}
.publish_item {
    background: #ff6444;
    width: 280rpx;
    height: 90rpx;
    line-height: 90rpx;
    border-radius: 50rpx;
    align-items: center;
    justify-content: center;
    /* border-radius: 50%; */
}
.publish image {
    width: 45rpx;
    height: 42rpx;
    margin-right: 10rpx;
}
.my {
    /* width: 50rpx !important; */
    /* height: 50rpx !important; */
    margin: 10rpx 0 5rpx;
}
.right_fixed {
    position: fixed;
    right: 10rpx;
    top: 50%;
    display: flex;
    flex-direction: column;
}
.top_icon{
	background-color: white;
	border-radius: 50%;
	width: 95rpx !important;
	height: 95rpx !important;
	margin: auto;
}
.right_fixed image {
    width: 150rpx;
    height: 150rpx;
    margin-top: 40rpx;
}
</style>

<style lang="scss">
    @import "./main.scss";
</style>