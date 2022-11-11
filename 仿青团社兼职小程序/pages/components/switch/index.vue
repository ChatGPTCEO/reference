<template>
    <view @tap="toggle" :class="'i-class i-switch ' + parse.setSize(size) + ' ' + parse.setCurrent(value, disabled) + ' ptp_exposure'" data-ptpid="c6bb-1f44-b256-0f18">
        <input :name="name" class="i-switch-hide-input" type="text" />
        <view class="i-switch-inner" v-if="value === true">
            <slot name="open"></slot>
        </view>
        <view class="i-switch-inner" v-else>
            <slot name="close"></slot>
        </view>
    </view>
</template>
<script module="parse" lang="wxs">
var sizes = ['large', 'default'];
var prefixCls = 'i-switch';
module.exports = ({
    setSize: (function(size) {
        var index = sizes.indexOf(size);
        return (prefixCls + (index > -1 ? ('-' + size) : 'default'))
    }),
    setCurrent: (function(value, disabled) {
        var className = value && !disabled ? prefixCls + '-checked' : '';
        if (disabled) {
            className += ' ' + prefixCls + '-disabled'
        };
        return (className)
    }),
});
</script>
<script>
export default {
    data() {
        return {};
    },
    externalClasses: ['i-class'],
    props: {
        value: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: 'default'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        name: {
            type: String,
            default: ''
        }
    },
    options: {
        multipleSlots: true
    },
    methods: {
        toggle: function () {
            if (!this.disabled) {
                var e = !this.value;
                this.$emit('change', {
                    detail: {
                        value: e
                    }
                });
            }
        }
    }
};
</script>
<style>
@import './index.css';
</style>
