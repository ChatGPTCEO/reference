<template>
    <view class="cu-custom" :style="'height:' + CustomBar * 2 + 'rpx'">
        <view
            :class="'cu-bar fixed ' + (bgImage != '' ? 'none-bg text-white bg-img' : '') + ' ' + bgColor"
            :style="style + ';height:' + CustomBar*2 + 'rpx;padding-top:' + StatusBar + 'px;' + (bgImage ? 'background-image:url(' + bgImage + ')' : '')"
        >
            <view class="action" @tap="BackPage" v-if="isBack">
                <text class="cuIcon-back"></text>
                <slot name="backText"></slot>
            </view>
            <view
                class="action border-custom"
                v-if="isCustom"
                :style="'width:' + Custom.width + 'px;height:' + Custom.height + 'px;margin-left:calc(750rpx - ' + Custom.right + 'px)'"
            >
                <text class="cuIcon-back" @tap="BackPage"></text>
                <text class="cuIcon-homefill" @tap="toHome"></text>
            </view>
            <view class="content" :style="'top:' + StatusBar + 'px'">
                <slot name="content"></slot>
            </view>
            <slot name="right"></slot>
        </view>
    </view>
</template>

<script>
const app = getApp();
export default {
    data() {
        return {
            StatusBar: uni.getStorageSync('StatusBar') ? uni.getStorageSync('StatusBar') : 64,
            CustomBar: uni.getStorageSync('CustomBar') ? uni.getStorageSync('CustomBar') : 20,
            Custom: app.globalData.Custom,
            style: ''
        };
    },
    /**
     * 组件的一些选项
     */
    options: {
        addGlobalClass: true,
        multipleSlots: true
    },
    /**
     * 组件的对外属性
     */
    props: {
        bgColor: {
            type: String,
            default: ''
        },
        isCustom: {
            type: [Boolean, String],
            default: false
        },
        isBack: {
            type: [Boolean, String],
            default: false
        },
        bgImage: {
            type: String,
            default: ''
        }
    },
    mounted() {
        // var that = this;
        // if(!wx.getStorageSync('color')){
        //     app.util.request({
        //         url: 'entry/wxapp/Sysparment',
        //         data: {},
        //         success(res){
        //             console.log("sys返回值",res.data.data.sys.color)
        //             wx.setStorageSync('color', res.data.data.sys.color)
        //             var style = "background-color: "+wx.getStorageSync('color')+";color: white;"
        //             that.setData({
        //                 style:style
        //             })
        //         }
        //     })
        // }
        // else{
        //     var style = "background-color: "+wx.getStorageSync('color')+";color: white;"
        //     this.setData({
        //         style:style
        //     })
        // }
        // console.log("create方法")
        // var style = "background-color: "+wx.getStorageSync('color')+";color: white;"
        // this.setData({
        //     style:style
        // })
        // console.log("忌口",this.data.style)
    },
    /**
     * 组件的方法列表
     */
    methods: {
        BackPage() {
            uni.navigateBack({
                delta: 1,

                success() {
                    uni.removeStorage({
                        key: 'json'
                    });
                },

                fail() {
                    uni.redirectTo({
                        url: '/gc_school/pages/home/index'
                    });
                }
            });
        },

        toHome() {
            uni.reLaunch({
                url: '/pages/index/index'
            });
        }
    }
};
</script>
<style>
/* colorui/components/cu-custom.wxss */
</style>
