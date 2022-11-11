<template>
    <view class="container">
        <view class="search-box">
            <view class="search-item">
                <input @input="searchName" placeholder="搜一搜自己的学校" type="text" :value="schoolName" />
            </view>
        </view>
        <view class="school-list">
            <block v-if="schoolList.length !== 0">
                <view
                    @tap="handleSchool"
                    class="school-item ptp_exposure"
                    :data-id="item.schoolId"
                    :data-index="index"
                    :data-name="item.name"
                    data-ptpid="b8b0-15de-a3b7-ebcf"
                    :data-type="item.schoolType.key"
                    v-for="(item, index) in schoolList"
                    :key="item.schoolId"
                >
                    {{ item.name }}
                </view>
            </block>
            <view @tap="handleSchool" class="school-item ptp_exposure" :data-id="0" :data-name="schoolName" data-ptpid="9105-112e-b405-e761" data-type="COLLEGE" v-else>
                {{ schoolName }}
            </view>
        </view>
    </view>
</template>

<script>

var app = getApp();
export default {
    data() {
        return {
            schoolName: '',
            schoolList: [],
            major: ''
        };
    },
    onLoad: function () {
        this.initData();
    },
    methods: {
        initData: function () {},

        searchName: function (o) {},

        handleSchool: function (a) {},

        getMajor: function (a) {
			this.major = a.detail.value;
        }
    }
};
</script>
<style>
	@import './schoolsearch.scss';
</style>
