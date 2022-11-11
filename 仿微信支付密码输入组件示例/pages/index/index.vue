<template>
    <view>
        <button @tap="$refs.passInput.open()">提现</button>
        <lyy-pass-input ref="passInput" title="提现" :money="1000" @confirm="confirm" @close="close">
            <template slot="extend">
                <view class="extend">
                    <view class="extend-title">
                        服务费
                    </view>
                    <view class="">
                        ￥1.00
                    </view>
                </view>
                <view class="extend">
                    <view class="extend-title">
                        费率
                    </view>
                    <view class="">
                        0.10%
                    </view>
                </view>
            </template>
        </lyy-pass-input>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                
            };
        },
        onLoad() {
        },
        methods:{
            confirm(e){
                console.log(e)
            },
            close(){
                console.log('close')
            }
        }
    }
</script>

<style lang="scss">
    .extend{
        display: flex;
        justify-content: space-between;
        font-size: 24rpx;
        margin: 20rpx 0;
        &-title{
            color:#555
        }
    }
</style>
