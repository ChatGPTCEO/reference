<template>
    <view class="inner-slide-box">
        <scroll-view scrollX class="slide-list">
            <view
                @tap="_universalJump"
                class="slide-list-item ptp_exposure"
                :data-businessId="item.businessId"
                :data-businessType="item.businessType"
                :data-contentid="item.contentId"
                :data-index="index"
                :data-ptpid="ptpId || 'innerSlider'"
                :data-remark="item.title"
                :data-sourceId="item.sourceId"
                :data-title="item.title"
                v-for="(item, index) in list"
                :key="item.contentId"
            >
                <image lazyLoad class="slide-list-img" :src="item.image"></image>
            </view>
        </scroll-view>
    </view>
</template>

<script>

export default {
    data() {
        return {};
    },
    props: {
        ptpId: {
            type: String,
            default: ''
        },
        list: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        _universalJump: function (e) {
            var r = parseInt(e.currentTarget.dataset.index);
            t.universalJump(this.list[r]);
        }
    }
};
</script>
<style>
@import './index.css';
</style>
