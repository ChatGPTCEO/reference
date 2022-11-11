<template>
    <view class="tab-box">
        <scroll-view scrollX class="tabs-list">
            <view class="tabs-list">
                <view
                    @tap="handleTapTab"
                    :class="'ignoreT2 ptp_exposure tab-item ' + (item.key === '4' ? 'anchor' : '') + ' ' + (index === active ? 'active' : '')"
                    :data-index="index"
                    data-ptpid="f6a7-18cd-9f87-3c05"
                    v-for="(item, index) in tabList"
                    :key="index"
                >
                    {{ item.value }}
                </view>
            </view>
        </scroll-view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            active: 0
        };
    },
    props: {
        tabList: {
            type: Array,
            default: () => []
        }
    },
    methods: {
		// 修改tab下标
        handleTapTab: function (t) {
            var a = t.currentTarget.dataset.index;
            if (this.active !== a) {
				this.active = a;
				// 执行父组件方法
                this.$emit('tabChange', {detail: {index: a}});
            }
        }
    }
};
</script>
<style lang="scss" scoped>
	@import './index.scss';
</style>
