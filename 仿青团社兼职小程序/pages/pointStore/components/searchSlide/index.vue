<template>
    <view>
        <view class="search-box">
            <view class="search-left">
                <view
                    @tap="slideChange"
                    :class="'item ' + (item.checked && item.name !== '默认排序' ? 'select' : '') + ' ptp_exposure'"
                    :data-index="index"
                    data-ptpid="4f04-171b-af08-337d"
                    :data-sorttype="item.sortType"
                    :data-type="item.sort"
                    v-for="(item, index) in title"
                    :key="item.sortType"
                >
                    {{ item.name }}

                    <text class="iconfont icondropdown"></text>
                </view>
            </view>
            <view @tap="selectOnlyBean" class="search-right ptp_exposure" data-ptpid="0a12-128a-9290-2a66">
                <view :class="'checkbox iconfont ' + (onlybean ? 'checked iconselect' : '') + ' '"></view>
                仅看青豆兑换
            </view>
            <view class="slide-box" v-if="isShow">
                <view
                    @tap="selectChange"
                    :class="'item ' + (item.checked ? 'select' : '') + ' ptp_exposure'"
                    :data-index="index"
                    data-ptpid="5238-1afc-806a-e43b"
                    data-type=""
                    v-for="(item, index) in showList"
                    :key="item.key"
                >
                    {{ item.val }}

                    <text class="iconfont iconselect" v-if="item.checked"></text>
                </view>
            </view>
        </view>
        <view @tap="close" @touchmove.stop.prevent="nomove" class="mask ptp_exposure" data-ptpid="e895-1768-9222-c51f" v-if="isShow"></view>
    </view>
</template>

<script>

export default {
    data() {
        return {
            searchData: {
                default: [
                    {
                        val: '默认排序',
                        key: 1,
                        checked: false
                    },
                    {
                        val: '按销量',
                        key: 2,
                        checked: false
                    },
                    {
                        val: '按人气',
                        key: 3,
                        checked: false
                    }
                ],
                bean: [
                    {
                        val: '青豆从低到高',
                        key: 0,
                        checked: false
                    },
                    {
                        val: '青豆从高到低',
                        key: 1,
                        checked: false
                    }
                ],
                price: [
                    {
                        val: '价格从低到高',
                        key: 0,
                        checked: false
                    },
                    {
                        val: '价格从高到低',
                        key: 1,
                        checked: false
                    }
                ]
            },
            title: [
                {
                    sort: 'default',
                    name: '默认排序',
                    sortType: 1,
                    checked: false
                },
                {
                    sort: 'bean',
                    name: '青豆',
                    sortType: 4,
                    checked: false
                },
                {
                    sort: 'price',
                    name: '现金',
                    sortType: 5,
                    checked: false
                }
            ],
            showList: [],
            isShow: false,
            onlybean: false,
            titleClickIndex: 0,
            type: '',
            slideData: {
                sortType: 1,
                sortMethod: 0,
                payType: ''
            }
        };
    },
    props: {},
    methods: {
        slideChange: function (e) {},
        selectChange: function (a) {},
        selectOnlyBean: function () {},
        nomove: function () {
            return false;
        },
        close: function () {
			this.isShow = false;
        },
        clearChecked: function (t) {}
    }
};
</script>
<style lang="scss" scoped>
	@import './index.scss';
</style>
