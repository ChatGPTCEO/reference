<template>
    <view class="move-box" :disableScroll="list.length <= 4" v-if="list.length > 0 || showEmpty">
        <view :class="'content-move-box ' + (page === 'newLabel' && list.length !== 0 ? 'gray' : '')" :style="'transform: translateY(' + top + 'px)'">
            <view @touchend.stop.prevent="moveEnd" @touchmove.stop.prevent="moveChange" @touchstart.stop.prevent="moveStart">
                <view class="content-dot"></view>
                <view class="content-title" v-if="page !== 'newLabel'">
                    <image class="content-icon" :src="icon" v-if="icon"></image>
                    {{ title }}
                </view>
                <slot name="filter"></slot>
            </view>
            <scroll-view
                @scrollToLower="loadmore"
                :class="'content-box ' + (page === 'newLabel' && list.length === 0 ? '' : 'gray')"
                :lowerThreshold="100"
                :scrollY="true"
                :style="'height: ' + (compensateHeight + height) + 'px'"
                :trapScroll="true"
            >
                <paging :isEnd="isEnd" :isLoading="isLoading" v-if="list.length > 0">
                    <regular-item
                        :data="item"
                        :index="index"
                        :lazyload="index >= 5"
                        :noMarginBottom="true"
                        :page="page"
                        :ptpId="ptpId"
                        v-for="(item, index) in list"
                        :key="item.partJobId"
                    ></regular-item>
                </paging>
                <block v-if="list.length === 0 && !isLoading">
                    <image :class="'blank-pic ' + (page === 'newLabel' ? 'small' : '')" mode="scaleToFill" src="https://qiniu-image.qtshe.com/719default-page1.png"></image>
                    <view class="content-main-title" v-if="mainTitle">{{ mainTitle }}</view>
                    <view class="blank-text">{{ blankText }}</view>
                    <slot name="entranceList"></slot>
                </block>
            </scroll-view>
        </view>
    </view>
</template>

<script>
import paging from '../paging/index';
import regularItem from '../regularItem/index';

export default {
    components: {
        paging,
        regularItem
    },
    data() {
        return {
            top: 0,
            dirction: true,
            endTop: 0,
            boxTop: 0,
            compensateHeight: 0,
            mainTitle: ''
        };
    },
    props: {
        isEnd: {
            type: Boolean,
            default: false
        },
        isLoading: {
            type: Boolean,
            default: false
        },
        ptpId: {
            type: String,
            default: 'di2n-1ndl-vm2r-2fl1'
        },
        list: {
            type: Array,
            default: () => []
        },
        title: {
            type: String,
            default: ''
        },
        limit: {
            type: Number,
            default: 400
        },
        start: {
            type: Number,
            default: 0
        },
        startDirction: {
            type: Boolean,
            default: true
        },
        showEmpty: {
            type: Boolean,
            default: false
        },
        icon: {
            type: String,
            default: ''
        },
        blankText: {
            type: String,
            default: ''
        },
        page: {
            type: String,
            default: ''
        },
        height: {
            type: Number,
            default: 455
        }
    },
    beforeMount: function () {
		let ch = 0;
		try {
		    let e = my.getSystemInfoSync();
		    if (e.windowHeight > 667) {
		        ch = e.windowHeight - 667;
		    } else {
		        ch = 0;
		    }
		} catch (e) {
		    ch = 0;
		}
		this.top = -this.start;
		this.compensateHeight = ch;
	},
    methods: {
        moveStart: function (t) {
			let e = t.touches[0];
			this.boxTop = e.clientY - this.endTop;
			this.$emit('disable', {detail: true});
		},
        moveChange: function (t) {
			let e = t.touches[0].clientY - this.boxTop;
			let i = 0;
			if (this.startDirction) {
			    if (e <= (i = -(this.limit + this.start + this.compensateHeight))) {
			        e = i;
			    } else {
			        e = e;
			    }
			} else {
			    if (e >= (i = -(this.start - this.limit - this.compensateHeight))) {
			        e = i;
			    } else {
			        e = e;
			    }
			}
			if (this.top !== e) {
				if (!(Math.abs(this.top - e) < 20)) {
					this.dirction = e <= this.top;
					this.top = e;
				}
			}
		},
        moveEnd: function () {
			let t = 0;
			
			if (this.dirction) {
			    if (this.startDirction) {
			        this.endTop = -(this.limit + this.start + this.compensateHeight);
			        t = -(this.limit + this.start + this.compensateHeight);
			    } else {
			        this.endTop = -this.start;
			        t = -this.start;
			    }
			} else {
			    if (this.startDirction) {
			        this.endTop = -this.start;
			        t = -this.start;
			    } else {
			        this.endTop = -(this.start - this.limit - this.compensateHeight);
			        t = -(this.start - this.limit - this.compensateHeight);
			    }
			}
			this.top = t;

			this.$emit('disable', { detail: false});
		},
        loadmore: function () {},
        prevent: function () {}
    }
};
</script>
<style>
	@import './index.scss';
</style>
