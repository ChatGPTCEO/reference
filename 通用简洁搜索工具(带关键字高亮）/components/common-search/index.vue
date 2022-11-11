//搜索
<template lang='pug'>
  view.item-out-view
    view.search-view
      view.search-item
        image(src='./icon_search.png')
        input(
          v-model="inputValue"
          @input='onInputListen'
          :placeholder='placeholder'
          :placeholder-class='placeholderClass')
      view.search-content(
          v-if="historyDatas&&historyDatas.length>0&&inputValue.length<=0")
        view.title-view
          text 搜索历史
          image(src='./icon_delete.png' @tap.stop='onDelete(ALL)')
        view.item-view(v-for="(item,index) in historyDatas" :key="index" @tap.stop='onItemClick(item,index)')
          text {{item.key}}
          image(src='./icon_close.png' @tap.stop='onDelete(index)')
      view.search-content(v-if="keyworkDatas&&keyworkDatas.length>0")
        view.item-view(v-for="(item,index) in keyworkDatas" :key="index" @tap.stop='onItemClick(item,index)')
          text(v-for="textContent in item.keyword" 
            :key="item.id" 
            :class="textContent===inputValue?'__vital':''") {{textContent}}
          image.next-ico(src='./mine_icon_next.png')
</template>
<script>
    export default {
        data() {
            return {
                inputValue: '',
                ALL: 'ALL',
                SEARCH_DATA: 'SEARCH_DATA'
            }
        },
        props: {
            //搜索历史内容
            historyDatas: {
                type: Array,
                default: () => {
                    return [];
                }
            },
            //搜索关键内容
            keyworkDatas: {
                type: Array,
                default: () => {
                    return [];
                }
            },
            placeholder: {
                type: String,
                default: '请输入搜索内容'
            },
        },
        methods: {
            //监听输入框内容变化
            onInputListen(event) {
                let detail = event.detail;
                let value = detail.value;
                this.inputValue = value;
                this.$emit('onInputListen', value);
            },
            //清除搜索历史
            onDelete(event) {
                this.$emit('onDelete', event);
            },
            //列表点击事件
            onItemClick(item, index) {
                this.$emit('onItemClick', {
                    item,
                    index
                });
            }
        },
    }
</script>
<style scoped lang='scss'>
    .item-out-view {
        flex-direction: column;
        .search-view {
            flex-direction: column;
            padding: 10rpx 32rpx;
            background: rgba(255, 255, 255, 1);
            .search-item {
                padding: 0 24rpx;
                background: rgba(249, 249, 249, 1);
                border-radius: 4px;
                align-items: center;
                input {
                    padding: 0 24rpx;
                    height: 80rpx;
                    font-weight: 400;
                    flex: 1;
                    text-align: start;
                    font-size: 28rpx;
                    font-family: PingFang-SC-Bold, PingFang-SC;
                    color: rgba(51, 51, 51, 1);
                }
                .placeholderClass {
                    color: rgba(216, 216, 216, 1);
                }
                image {
                    height: 32rpx;
                    width: 32rpx;
                }
            }
            .search-content {
                padding: 40rpx 0;
                flex-direction: column;
                .title-view {
                    text {
                        color: rgba(51, 51, 51, 1);
                    }
                }
                .item-view {
                    align-items: center;
                    width: 100%;
                    padding: 32rpx 0;
                    border-bottom: 1px solid rgba(245, 245, 245, 1);
                    text {
                        color: rgba(102, 102, 102, 1);
                    }
                    .next-ico {
                        width: 24rpx;
                        height: 24rpx;
                    }
                    .__vital {
                        color: rgba(51, 130, 255, 1);
                    }
                }
                image {
                    margin-left: auto;
                    width: 44rpx;
                    height: 44rpx;
                }
            }
            text {
                font-size: 28rpx;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
            }
            view {
                flex-direction: row;
                display: flex;
            }
        }
    }
</style>
