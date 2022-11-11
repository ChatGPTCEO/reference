<template>
    <view class="apply-sure-modal">
        <view class="modal-container">
            <view class="modal-head">确认报名</view>
            <view class="modal-content">
                该岗位工作地点在
                <text class="modal-foucus-text">{{ nowTownName }}</text>
                ，您当前定位为
                <text class="modal-foucus-text">{{ locationTownName }}</text>
                ，请确认报名？报名后因距离原因无法到岗可能降低您的信用分哦
            </view>
            <view class="modal-footer">
                <view @tap="_onCancelBtn" class="modal-cancel-btn ptp_exposure" data-ptpid="c2f4-1321-964b-fc3b">取消</view>
                <view @tap="_onSureBtn" class="modal-sure-btn ptp_exposure" data-ptpid="b1a1-1c9f-aff2-dd57">确定</view>
            </view>
        </view>
    </view>
</template>

<script>
getApp();
export default {
    data() {
        return {};
    },
    props: {
        locationTownName: {
            type: String,
            default: '上海'
        },
        nowTownName: {
            type: String,
            default: '南京'
        }
    },
    methods: {
        _onCancelBtn: function () {
            this.$emit('onCancelBtn');
        },
        _onSureBtn: function () {
            this.$emit('onSureBtn');
        }
    }
};
</script>
<style>
@import './index.css';
</style>
