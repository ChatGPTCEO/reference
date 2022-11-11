<!--
 * @name: 
 * @version: 1.1.1
 * @Author: 刘大可
 * @Date: 2022-03-24 15:25:33
 * @LastEditors: 刘大可
 * @LastEditTime: 2022-04-14 14:59:36
-->
<template>
<view class="pages">
    <cu-custom bgColor="bgmains" :isBack="true">
			<view slot="content">{{class_name||"分类"}}</view>
		</cu-custom>
    <view class="padding-lr" style="padding-bottom: 100rpx">
        <block v-if="dataList.length == 0">
            <view class="text-center margin-top text-df">暂无数据~</view>
        </block>
            <block v-for="(item,index) in dataList" :key="index">
                <view class="article padding"  @tap="go('/gc_school/pages/article/detail?id='+item.article_id)" :data-id="item.article_id">
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
					    <text space="nbsp" style="word-break: break-word;" :decode="true">{{item.content}}</text>

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


      <view class="right_fixed">
                <image  src="/static/images/article/i_fabu.png" @click="go('/gc_school/pages/article/post?cid='+class_id)"></image>
                <!-- <image v-if="isTop" class="top_icon" src="/static/images/article/tops2.png" @tap="top"></image> -->
                <!-- <image class="my" src="/static/images/article/i_my.png" @tap="jump" data-url="/gc_school/pages/article/my"></image> -->
            </view>
</view>

</template>
<script>
var app = getApp();
export default {
    data() {
        return {
            cid:1,
            dataList:[],
            class_name:"",
            class_id:"",
            is_loadmore: true,
			page:1
        }
    },
     onLoad: function (options) {
         this.class_name=options.class_name
         this.class_id=options.class_id
        if (!uni.getStorageSync('schoolId')) {
            if (options.s_id) {
                uni.setStorageSync('schoolId', options.s_id);
            }
        }
        this.getLst(options.class_id)
    },
    onReachBottom: function () {
        if (this.is_loadmore) {
            this.setData({
                page: this.page + 1
            });
            this.getLst(this.class_id);
        } else {
            uni.showToast({
                title: '没有更多数据了~',
                icon: 'none'
            });
        }
    },
    methods: {
       
         //获取文章列表
        getLst(cid) {
            var that = this;
            app.globalData.util.request({
                url: 'ZhArticles/index',
                method: 'GET',
                data: {
                    s_id: uni.getStorageSync('schoolId'),
                    class_id: cid,
                    type: that.type,
                    page: that.page,
					limit:10
                },
				header:{
					'Authorization' : uni.getStorageSync('token')
				},
                success(res) {
                    console.log(res.data.data.list);

                    if (res.data.data.list.length < 10) {
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
        
    },
}
</script>

<style lang="scss">
    @import "./main.scss";
    .bgmains{
        background-color:#fff;
    }
    .right_fixed {
    position: fixed;
    right: 0rpx;
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