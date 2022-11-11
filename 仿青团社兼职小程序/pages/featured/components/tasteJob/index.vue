<template>
    <view class="quality-box jobListBox">
        <view class="gridList">
            <view class="leftColumn">
                <view
                    @tap="universalJump"
                    :class="'quality-itemLeft ptp_exposure_recommends_' + item.contentId"
                    :data-businessId="item.businessId"
                    :data-businessType="item.businessType"
                    :data-contentid="item.contentId"
                    :data-index="index"
                    :data-path="item.jumpPath"
                    data-ptpid="recommends-l"
                    :data-sourceid="item.sourceId"
                    v-if="index % 2 === 0"
                    v-for="(item, index) in resourseFrom"
                    :key="item.contentId"
                >
                    <view :class="index === 0 ? 'experenceBtnFirst' : 'experenceBtn'">
                        <view :class="item.jumpKey === 'USER_PART_JOB_TAG_PAGE_QTZP' || item.jumpKey === 'USER_REPORT_STATIC_PAGE' ? '' : 'quality-modal'"></view>
                        <image lazyLoad class="img" mode="aspectFill" :src="item.image + '?imageView2/0/w/501'"></image>
                    </view>

                    <view
                        :class="index === 0 ? 'quality-infoFirst' : 'quality-info'"
                        v-if="item.jumpKey !== 'USER_PART_JOB_TAG_PAGE_QTZP' && item.jumpKey !== 'USER_REPORT_STATIC_PAGE'"
                    >
                        <view class="jobListTitle fontIndex ellipsis">{{ item.title }}</view>
                        <view class="diviDing textMg fontIndex"></view>
                        <view class="jobListDes textMg fontIndex ellipsis">{{ item.subTitle }}</view>
                    </view>
                </view>
            </view>
            <view class="rightColumn">
                <view
                    @tap="universalJump"
                    :class="'quality-item ptp_exposure_recommends_' + item.contentId"
                    :data-businessId="item.businessId"
                    :data-businessType="item.businessType"
                    :data-contentid="item.contentId"
                    :data-index="index"
                    :data-path="item.jumpPath"
                    data-ptpid="recommends-r"
                    :data-sourceid="item.sourceId"
                    v-if="index % 2 !== 0"
                    v-for="(item, index) in resourseFrom"
                    :key="item.contentId"
                >
                    <view :class="index === 0 ? 'experenceBtnFirst' : 'experenceBtn'">
                        <view :class="item.jumpKey === 'USER_PART_JOB_TAG_PAGE_QTZP' || item.jumpKey === 'USER_REPORT_STATIC_PAGE' ? '' : 'quality-modal'"></view>
                        <image lazyLoad class="img" mode="aspectFill" :src="item.image + '?imageView2/0/w/501'"></image>
                    </view>

                    <view
                        :class="index === 0 ? 'quality-infoFirst' : 'quality-info'"
                        v-if="item.jumpKey !== 'USER_PART_JOB_TAG_PAGE_QTZP' && item.jumpKey !== 'USER_REPORT_STATIC_PAGE'"
                    >
                        <view class="jobListTitle fontIndex ellipsis">{{ item.title }}</view>
                        <view class="diviDing textMg fontIndex"></view>
                        <view class="jobListDes textMg fontIndex ellipsis">{{ item.subTitle }}</view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>

export default {
    data() {
        return {};
    },
    props: {
        resourseFrom: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        addFormId: function (e) {
            t.addFormId({
                formId: e.detail.formId,
                sourceId: e.target.dataset.ptpid
            });
        },
        jumpToPath: function (e) {
            console.log(e.currentTarget.dataset.path);

            if (3 === e.currentTarget.dataset.jumptype) {
                var t = encodeURIComponent(e.currentTarget.dataset.path);
                uni.navigateTo({
                    url: '/pages/webview/webview?targetUrl=' + t
                });
            } else {
                uni.navigateTo({
                    url: e.currentTarget.dataset.path
                });
            }
        },
        universalJump: function (e) {
            var r = parseInt(e.currentTarget.dataset.index);
            t.universalJump(this.resourseFrom[r]);
        }
    },
    watch: {
        resourseFrom: {
            handler: function (t) {},
            immediate: true,
            deep: true
        }
    }
};
</script>
<style lang="scss" scoped>
	@import './index.scss';
</style>
