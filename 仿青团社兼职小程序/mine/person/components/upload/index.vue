<template>
    <view class="upload-container">
        <view class="upload-list">
            <block v-if="imageListClone.length !== 0">
                <view :class="'image-item ' + ((index + 1) % 4 === 0 ? 'active' : '') + ' '" v-for="(item, index) in imageListClone" :key="item.userImageId">
                    <image
                        lazyLoad
                        @tap="previewImage"
                        class="ptp_exposure"
                        :data-id="item.userImageId"
                        :data-index="index"
                        data-ptpid="5345-1c31-b24d-0e38"
                        :data-url="item.imageMax"
                        :src="item.imageMin"
                    ></image>

                    <view @tap="deleteImage" class="icon-delete ptp_exposure" :data-id="item.userImageId" :data-index="index" data-ptpid="a88a-10bc-a804-e6f3">
                        <image lazyLoad src="https://qiniu-image.qtshe.com/20200305clear.png"></image>
                    </view>
                </view>
            </block>
            <image
                lazyLoad
                @tap="handleChoose"
                class="ptp_exposure"
                data-ptpid="8c9a-1d6d-8a05-66cc"
                src="https://qiniu-image.qtshe.com/20190605upload.png"
                v-if="imageListClone.length < 9"
            ></image>
        </view>
    </view>
</template>

<script>

var app = getApp();
export default {
    data() {
        return {
            imageListClone: [],
            imageUrls: '',
            complaintPhotos: []
        };
    },
    props: {
        imageList: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        handleChoose: function () {},
        getImage: function (t) {
            let a = this.complaintPhotos;
			this.complaintPhotos = a;
        },
        deleteImage: function (e) {},
        previewImage: function (t) {}
    },
    watch: {
        imageList: {
            handler: function (newVal, oldVal) {
                this.imageListClone = newVal;
            },
            immediate: true,
            deep: true
        }
    }
};
</script>
<style>
	@import './index.scss';
</style>
