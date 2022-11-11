<template>
    <view>
        <view class="common-tab" v-if="isTabList">
            <view class="common-tab-header">
                <view @tap="onTabChange" :class="'common-tab-header-item ' + (tabCurrent === 0 ? 'active' : '')" :data-i="0" data-ptpid="10e4-1302-bf52-5bd6">相关推荐</view>
                <view @tap="onTabChange" :class="'common-tab-header-item ' + (tabCurrent === 1 ? 'active' : '')" :data-i="1" data-ptpid="a595-16aa-8066-b092">周围的人都在看</view>
            </view>
            <block v-if="recommendList.length > 0">
                <regular-item
                    :data="item"
                    :hiddenClassImage="true"
                    :index="index"
                    :listIndex="tabCurrent"
                    :ptpId="tabCurrent ? 'fjfg-2jff-2fhg-2jfg' : 'dkef-lfm3-pfk2-c82m'"
                    v-for="(item, index) in recommendList"
                    :key="index"
                ></regular-item>
            </block>
            <view class="recommond-blank" v-else>
                <image lazyLoad class="recommond-blank-pic" mode="scaleToFill" src="https://qiniu-image.qtshe.com/20200623_blank.png"></image>
                <view>这里暂时空空如也</view>
            </view>
        </view>
        <block v-else>
            <block v-if="recommendList.length > 0">
                <view class="jobList-common-title">{{ title }}</view>
                <regular-item :data="item" :hiddenClassImage="true" :index="index" ptpId="dkef-lfm3-pfk2-c82m" v-for="(item, index) in recommendList" :key="index"></regular-item>
            </block>
        </block>
    </view>
</template>

<script>
import regularItem from '@/components/regularItem/index';
export default {
    data() {
        return {};
    },
    components: {
        regularItem
    },
    props: {
        isTabList: {
            type: Boolean,
            default: false
        },
        tabCurrent: {
            type: Number,
            default: 0
        },
        recommendList: {
            type: Array,
            default: () => []
        },
        title: {
            type: String,
            default: '大家都在看'
        }
    },
    methods: {
        onTabChange: function (e) {
            this.$emit('tabChange', {
                detail: e
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
