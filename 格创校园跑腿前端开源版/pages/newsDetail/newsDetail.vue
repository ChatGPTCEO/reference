<template>
    <view class="page_gap page_news">
        <text class="h1" id="newsTitle">{{ newsData.sTitle }}</text>
        <view class="news_info">
            <text class="span" id="newsAuthor">{{ newsData.sFrom }}</text>
            <text class="span" id="newsDate">{{ newsData.time }}</text>
        </view>
        <view id="font-adjust">
            <view id="newsRelative" class="news_relative"></view>
            <view id="summary" class="summary_block">{{ newsData.sDescription }}</view>

            <view class="news_txt" id="newsContent">
                <!-- parse <template is="newsDetail" :data="...newsData"/> -->
                <block name="newsDetail">
                    <block v-for="(cellData, idy) in content" :key="idy">
                        <block v-if="cellData.type == 'view'">
                            <view class="p">
                                <block v-for="(item, index) in cellData.child" :key="item.text">
                                    <block v-if="item.type == 'a'">
                                        <text class="a" :data-seccode="item.attr['data-seccode']" :data-secname="item.attr['data-secname']" @tap="stockClick">{{ item.text }}</text>
                                    </block>

                                    <block v-else>
                                        <text>{{ item.text }}</text>
                                    </block>
                                </block>
                            </view>
                        </block>

                        <block v-if="cellData.type == 'img'">
                            {{ wn_html_images }}
                            <image
                                class="img"
                                :data-index="idy"
                                mode="widthFix"
                                :src="cellData.attr.src"
                                @load="imageLoad"
                                :style="'width: ' + cellData['attr']['width'] + ';max-width: 100%;height: ' + (cellData['attr']['height'] ? cellData['attr']['height'] : auto)"
                            ></image>
                        </block>
                    </block>
                </block>
            </view>
        </view>
    </view>
</template>

<script>
var app = getApp(); //获取全局变量

var R_htmlToWxml = require('../../resource/js/htmlToWxml.js'); //引入公共方法

export default {
    data() {
        return {
            scrollHeight: 0,

            newsData: {
                sTitle: '',
                sFrom: '',
                time: '',
                sDescription: ''
            },

            content: [],
            idy: '',

            cellData: {
                type: '',
                child: [],

                attr: {
                    src: ''
                }
            },

            auto: ''
        };
    },
    onLoad: function (options) {
        this.getNewsDetail(); // 开始加载页面

        console.log('onLoad');
    },
    onShow: function () {
        // 页面显示
        console.log('onShow');
    },
    onReady: function () {
        // 页面渲染完成
        console.log('onReady');
    },
    onHide: function () {
        // 页面隐藏
        console.log('onHide');
    },
    onUnload: function () {
        // 页面关闭
        console.log('onUnload');
    },
    methods: {
        getNewsDetail: function () {
            var that = this;
            uni.request({
                url: 'https://wedengta.com/wxnews/getNews?action=DiscNewsContent&type=4&id=1478677877_1406730_1_9',
                headers: {
                    'Content-Type': 'application/json'
                },
                success: function (res) {
                    var data = res.data;

                    if (data.ret == 0) {
                        var newsDetail = JSON.parse(data.content);
                        newsDetail.content = R_htmlToWxml.html2json(newsDetail.sContent);
                        newsDetail.time = app.globalData.util.formatTime(newsDetail.iTime * 1000);
                        that.setData({
                            newsData: newsDetail
                        });
                    } else {
                        console.log('数据拉取失败');
                    }
                },
                fail: function (error) {
                    console.log('数据拉取失败');
                }
            });
        },

        stockClick: function (e) {
            var secCode = e.currentTarget.dataset.seccode;
            var secName = e.currentTarget.dataset.secname;
            console.log('stockClick:' + secCode + ';secName:' + secName);
        },

        imageLoad() {
            console.log('占位：函数 imageLoad 未声明');
        }
    }
};
</script>
<style>
.page_gap {
    padding: 16px 15px;
}

.page_news {
    background-color: #fff;
}

.page_news a {
    color: #106fbc;
}

.page_news .h1 {
    font-size: 21px;
    margin-bottom: 11px;
    line-height: 1.3;
    color: #373737;
    font-weight: bold;
    letter-spacing: 0.5px;
    display: block;
}

.news_info {
    float: left;
    font-size: 12px;
    margin-bottom: 15px;
    color: rgba(89, 89, 89, 0.6);
}

.news_info .span {
    margin-right: 8px;
    display: inline-block;
}

.summary_block {
    background-color: #ececec;
    font-size: 14px;
    line-height: 1.8;
    text-indent: 30px;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    padding: 10px;
    position: relative;
    margin-bottom: 20px;
    -ms-word-break: break-all;
    word-break: break-all;
    border-radius: 0 3px 3px 3px;
    text-align: justify;
}

.summary_block:before {
    content: '摘要';
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 0 3px 3px 0;
    background-color: #f79464;
    color: #fff;
    z-index: 10;
    text-indent: 0;
    font-size: 12px;
    padding: 0 4px;
    line-height: 1.6;
}

.news_relative {
    font-size: 12px;
    margin-bottom: 13px;
    clear: both;
}

.news_relative p {
    line-height: 1.7;
}

.news_relative p span {
    color: rgba(89, 89, 89, 0.6);
}

.news_relative p a {
    margin-right: 10px;
}

.news_txt {
    font-size: 16px;
    line-height: 1.8;
    -ms-word-break: break-all;
    word-break: break-all;
    padding-bottom: 30px;
    color: rgb(37, 37, 37);
}

.news_txt .div {
    margin-bottom: 12px;
    text-align: justify;
}

.news_txt .a {
    color: #106fbc;
    position: relative;
}

.news_txt .b {
    font-weight: bold;
}

.news_txt .img {
    width: 100%;
    display: block;
    padding: 5px;
}
</style>
