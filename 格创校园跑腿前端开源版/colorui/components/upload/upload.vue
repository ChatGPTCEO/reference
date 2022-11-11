<template>
    <view class="images-box">
        <!-- <view class="imageCount">
    <text>上传图片：</text>
    <text style="color:#909399">{{addedCount}}/{{count}}</text>
  </view> -->
        <view class="images">
            <block v-for="(item, index) in images" :key="index">
                <image class="image" mode="aspectFill" :src="item" @tap="previewImage" :data-index="index" @longpress="deleteImage"></image>
            </block>
            <view v-if="addedCount < 3" class="image addImageIcon" hover-class="" hover-stay-time="200" @tap="chooseImage">+</view>
        </view>
    </view>
</template>

<script>
export default {
    // 组件对外属性
    data() {
        return {};
    },
    props: {
        // 图片总数量
        count: {
            type: Number,
            default: 3,
            observers: function (newVal, oldVal) {}
        },
        // 图片临时访问路径集合
        images: {
            type: Array,
            default: () => []
        },
        // 已经添加的图片数量
        addedCount: {
            type: Number,
            default: 0,
            observers: function (newVal, oldVal) {
                console.log('--new--'.newVal, '--old--', oldVal);
            }
        },
        // 当前图片的位置下标
        currentIndex: {
            type: Number,
            default: 0
        }
    },
    // 方法
    methods: {
        // 选择图片
        chooseImage() {
            this.$emit('chooseImage');
        },

        // 预览图片
        previewImage(e) {
            uni.previewImage({
                urls: this.images,
                current: this.images[e.currentTarget.dataset.index]
            });
        },

        // 删除图片
        deleteImage(e) {
            this.$emit('deleteImage', {
                detail: e.currentTarget.dataset.index
            });
        }
    }
};
</script>
<style>
.images-box {
    border-radius: 10rpx;
    width: 100%;
}

.imageCount {
    height: 80rpx;
    line-height: 80rpx;
}

.images {
    height: 240rpx;
    display: flex;
    align-items: center;
    /* justify-content: space-between; */
}
.addImageIcon {
    text-align: center;
    line-height: 200rpx;
    background-color: #f7f7f7;
}
.addImageIconHover {
    background-color: #c0c4cc;
}
.image {
    width: 30%;
    border-radius: 10rpx;
    height: 200rpx;
    margin-right: 20rpx;
    font-size: 80rpx;
    color: #ff6344;
}
.del {
    width: 60rpx;
    height: 60rpx;
}
</style>
