<template>
    <view>
        <view class="container">
            <view class="resume-tips">个人简介</view>
            <view class="user-info">
                <view @tap="handleClick" :class="'info-item ' + (introduction ? 'change' : '') + ' ptp_exposure'" data-ptpid="ad47-189b-8b50-1e1f">
                    <view :class="'info-title ' + (introduction ? 'active' : '')">自我描述</view>
                    <input disabled placeholder="请输入自我描述" type="text" v-if="!introduction" />
                    <view class="info-text" v-if="introduction">{{ introduction }}</view>
                </view>
                <view @tap="skipToLabelList" :class="'info-item ' + (userTags.length !== 0 ? 'change' : '') + ' ptp_exposure'" data-ptpid="c363-190d-8549-e99f">
                    <view :class="'info-title ' + (userTags.length !== 0 ? 'active' : '')">个人标签</view>
                    <input disabled placeholder="请选择个人标签" type="text" v-if="userTags.length === 0" />
                    <view class="label-list" style="line-height: normal" v-if="userTags.length !== 0">
                        <view class="label-item" v-for="(item, index) in userTags" :key="item.name">{{ item.name }}</view>
                    </view>
                </view>
                <view class="info-item change active">
                    <view class="info-title active">个人风采</view>
                    <qts-upload @initData="initData" :imageList="userImages"></qts-upload>
                </view>
            </view>
            <view @tap="upDataUserInfo" class="save-btn ptp_exposure" data-ptpid="e47c-1a3c-aabc-ffda">下一步</view>
        </view>
        <view class="desc-box" v-if="isShow">
            <view class="close-image">
                <image lazyLoad @tap="handleClick" class="ptp_exposure" data-ptpid="f407-124b-b8ff-a577" src="https://qiniu-image.qtshe.com/20190605close.png"></image>
            </view>
            <view class="close-tips">自我描述</view>
            <view class="textarea-box">
                <textarea
                    fixed
                    focus
                    :adjustPosition="false"
                    @input="getPushdesc"
                    class="description"
                    maxlength="140"
                    placeholder="请输入自我描述内容"
                    :value="introduction"
                ></textarea>
                <view class="count">
                    <text>{{ count }}</text>
                    /140
                </view>
            </view>
            <view @tap="handleClick" class="save-btn active ptp_exposure" data-ptpid="9823-14af-8fb4-946e">确定</view>
        </view>
    </view>
</template>

<script>
import qtsUpload from './components/upload/index';

var app = getApp();
export default {
    components: {
        qtsUpload
    },
    data() {
        return {
            introduction: '',
            userTags: [],
            isShow: false,
            userImages: [],
            qqContact: '',
            wechatContact: '',
            openResume: '',
            count: 0
        };
    },
    onShow: function () {
        this.initData();
        this.getSimple();
    },
    methods: {
        getSimple: function () {
            uni.setNavigationBarTitle({
                title: '简历完善度' +50 + '%'
            });
        },
        initData: function () {
            this.count = 0;
        },
		// 下一步
        upDataUserInfo: function () {
			uni.navigateTo({
			    url: '/mine/practice/practice'
			});
		},

        getPushdesc: function (t) {
			this.introduction = t.detail.value;
			this.count = t.detail.cursor;
        },
        handleClick: function () {
			this.isShow = !this.isShow;
        },
        skipToLabelList: function () {
            uni.navigateTo({
                url: '/mine/labeldata/labeldata'
            });
        }
    }
};
</script>
<style lang="scss">
	@import './person.scss';
</style>
