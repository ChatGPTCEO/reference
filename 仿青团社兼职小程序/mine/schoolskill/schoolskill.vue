<template>
    <view class="container">
        <view class="user-info">
            <view class="info-item active">
                组织/活动名称
                <input @input="getCompanyName" placeholder="请输入" type="text" :value="enterpriseName" />
            </view>
            <view class="info-item active">
                职位或奖项
                <input @input="getPositionName" placeholder="请输入" type="text" :value="positionName" />
            </view>
            <picker @change="chooseWorkData" :data-id="1" :end="endTime" fields="month" mode="date">
                <view class="info-item">
                    开始时间
                    <input disabled placeholder="请选择" type="text" :value="startTime" />
                </view>
            </picker>
            <picker @change="chooseWorkData" :data-id="2" :end="nowData" fields="month" mode="date">
                <view class="info-item">
                    结束时间
                    <input disabled placeholder="请选择" type="text" :value="endTime" />
                </view>
            </picker>
            <view class="info-item active change">经历描述</view>
            <textarea
                autoHeight
                @input="getWorkDesc"
                maxlength="200"
                placeholder="请描述您的校园活动经历，比如您担任了什么样的角色，做了哪些事情，这次收获是什么"
                placeholderClass="pl-textarea"
                :value="practiceDesc"
            ></textarea>
        </view>
        <view @tap="handleAddWorks" class="save-btn ptp_exposure" data-ptpid="b775-17b6-b967-a0e9">保存</view>
        <view @tap="handleDeleteWorks" class="save-btn active ptp_exposure" data-ptpid="5e25-1ea3-83c4-0b23" v-if="userSchoolPracticeId">删除校园实践经历</view>
    </view>
</template>

<script>

var app = getApp();
var a = true;
export default {
    data() {
        return {
            nowData: '',
            enterpriseName: '',
            positionName: '',
            startTime: '',
            endTime: '',
            practiceDesc: '',
            userSchoolPracticeId: ''
        };
    },
    onLoad: function (e) {
        
		this.nowData = ';'
    },
    methods: {
        handleAddWorks: function () {},

        handleDeleteWorks: function () {},

        chooseWorkData: function (e) {},

        getCompanyName: function (e) {
			this.enterpriseName = e.detail.value;
        },

        getPositionName: function (e) {
			this.positionName = e.detail.value;
        },
        getWorkDesc: function (e) {
			this.practiceDesc = e.detail.value;
        }
    }
};
</script>
<style lang="scss">
	@import './schoolskill.scss';
</style>
