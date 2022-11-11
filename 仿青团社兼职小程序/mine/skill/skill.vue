<template>
    <view>
        <view class="container">
            <block v-if="skillList.length !== 0">
                <view class="info-list" v-for="(item, index) in skillList" :key="item.userCertificateId">
                    <text>{{ item.name }}</text>

                    <image
                        lazyLoad
                        @tap="handleDelete"
                        class="ptp_exposure"
                        :data-id="item.userCertificateId"
                        :data-index="index"
                        data-ptpid="c0a4-1683-b238-91e0"
                        src="https://qiniu-image.qtshe.com/20170315delete@3x.png"
                    ></image>
                </view>
            </block>
            <view @tap="handleClick" class="info-item ptp_exposure" data-ptpid="17fd-1d62-a9a1-9b21">添加技能或证书 例：英语四级</view>
        </view>
        <view :class="'add-box ' + (isShow ? 'show' : 'hide')">
            <view @tap="handleClick" class="add-back ptp_exposure" data-ptpid="4b18-1d37-b990-6288"></view>
            <view :class="'add-content ' + (isShow ? 'active' : '')">
                <view class="confirm-title">添加技能</view>
                <input
                    @input="getSkillName"
                    cursorSpacing="120"
                    :focus="isShow"
                    placeholder="添加技能或证书，例：英语"
                    placeholderStyle="color: #ccc;"
                    type="text"
                    :value="skillName"/>
                <view @tap="addSkillName" class="confirm-btn ptp_exposure" data-ptpid="d8ae-153e-a2b0-1afb">确定</view>
            </view>
        </view>
    </view>
</template>

<script>

var app = getApp();
export default {
    data() {
        return {
            skillList: [],
            isClick: true,
            isShow: false,
            skillName: ''
        };
    },
    onLoad: function () {},
    onShow: function () {
        this.initData();
    },
    methods: {
        handleClick: function () {
			this.isShow = !this.isShow;
        },

        getSkillName: function (t) {
			this. skillName = t.detail.value;
        },

        initData: function () {
            this.skillList = '';
        },

        addSkillName: function () {},

        handleDelete: function (i) {}
    }
};
</script>
<style lang="scss">
	@import './skill.scss';
</style>
