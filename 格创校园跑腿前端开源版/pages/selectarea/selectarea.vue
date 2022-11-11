<template>
    <view :class="'shade ' + (isShow ? 'show' : '')">
        <view class="selector-area box box-tb">
            <view class="handle-bar box box-lr box-align-center">
                <text class="btn cancel flex" @tap="cancel">取消</text>
                <text class="btn confirm flex" @tap="confirm">确定</text>
            </view>
            <view class="area-selector box box-lr">
                <!-- <view class="white-shade"></view> -->
                <scroll-view class="selector province flex" data-type="province" :scroll-y="true">
                    <view
                        @tap="tapProvince"
                        :data-full-name="item.fullName"
                        :data-index="index"
                        :data-code="item.code"
                        :class="'picker ' + (selectedProvince.index == index ? 'actived' : '')"
                        v-for="(item, index) in proviceData"
                        :key="index"
                    >
                        {{ item.fullNameDot }}
                    </view>
                </scroll-view>
                <scroll-view class="selector city flex" data-type="city" :scroll-y="true">
                    <view
                        @tap="tapCity"
                        :data-full-name="item.fullName"
                        :data-index="index"
                        :data-code="item.code"
                        :class="'picker ' + (selectedCity.index == index ? 'actived' : '')"
                        v-for="(item, index) in cityData"
                        :key="index"
                    >
                        {{ item.fullNameDot }}
                    </view>
                </scroll-view>
                <scroll-view class="selector district flex" data-type="district" :scroll-y="true">
                    <view
                        @tap="tapDistrict"
                        :data-full-name="item.fullName"
                        :data-index="index"
                        :data-code="item.code"
                        :class="'picker ' + (selectedDistrict.index == index ? 'actived' : '')"
                        v-for="(item, index) in districtData"
                        :key="index"
                    >
                        {{ item.fullNameDot }}
                    </view>
                </scroll-view>
            </view>
        </view>
    </view>
</template>

<script>
import { Promise } from '../utils/util';
const API = 'http://japi.zto.cn/zto/api_utf8/baseArea?msg_type=GET_AREA&data=';
const selectArea = {
    addDot: function (arr) {
        if (arr instanceof Array) {
            arr.map((val) => {
                if (val.fullName.length > 4) {
                    val.fullNameDot = val.fullName.slice(0, 4) + '...';
                    return val;
                } else {
                    val.fullNameDot = val.fullName;
                    return val;
                }
            });
        }
    },
    load: function (_this) {
        _this.setData({
            isShow: false
        });

        Promise(uni.request, {
            url: API + '0',
            method: 'GET'
        })
            .then((province) => {
                const firstProvince = province.data.result[0];
                selectArea.addDot(province.data.result);

                _this.setData({
                    proviceData: province.data.result,
                    'selectedProvince.index': 0,
                    'selectedProvince.code': firstProvince.code,
                    'selectedProvince.fullName': firstProvince.fullName
                });

                return Promise(uni.request, {
                    url: API + firstProvince.code,
                    method: 'GET'
                });
            })
            .then((city) => {
                const firstCity = city.data.result[0];
                selectArea.addDot(city.data.result);

                _this.setData({
                    cityData: city.data.result,
                    'selectedCity.index': 0,
                    'selectedCity.code': firstCity.code,
                    'selectedCity.fullName': firstCity.fullName
                });

                return Promise(uni.request, {
                    url: API + firstCity.code,
                    method: 'GET'
                });
            })
            .then((district) => {
                const firstDistrict = district.data.result[0];
                selectArea.addDot(district.data.result);

                _this.setData({
                    districtData: district.data.result,
                    'selectedDistrict.index': 0,
                    'selectedDistrict.code': firstDistrict.code,
                    'selectedDistrict.fullName': firstDistrict.fullName
                });
            })
            .catch((e) => {
                console.log(e);
            });
    },
    tapProvince: function (e, _this) {
        const dataset = e.currentTarget.dataset;
        Promise(uni.request, {
            url: API + dataset.code,
            method: 'GET'
        })
            .then((city) => {
                selectArea.addDot(city.data.result);

                _this.setData({
                    cityData: city.data.result,
                    'selectedProvince.code': dataset.code,
                    'selectedProvince.fullName': dataset.fullName,
                    'selectedCity.code': city.data.result[0].code,
                    'selectedCity.fullName': city.data.result[0].fullName
                });

                return Promise(uni.request, {
                    url: API + city.data.result[0].code,
                    method: 'GET'
                });
            })
            .then((district) => {
                selectArea.addDot(district.data.result);

                _this.setData({
                    districtData: district.data.result,
                    'selectedProvince.index': e.currentTarget.dataset.index,
                    'selectedCity.index': 0,
                    'selectedDistrict.index': 0,
                    'selectedDistrict.code': district.data.result[0].code,
                    'selectedDistrict.fullName': district.data.result[0].fullName
                });
            })
            .catch((error) => {
                console.log(error);
            });
    },
    tapCity: function (e, _this) {
        const dataset = e.currentTarget.dataset;
        Promise(uni.request, {
            url: API + dataset.code,
            method: 'GET'
        })
            .then((district) => {
                selectArea.addDot(district.data.result);

                _this.setData({
                    districtData: district.data.result,
                    'selectedCity.index': e.currentTarget.dataset.index,
                    'selectedCity.code': dataset.code,
                    'selectedCity.fullName': dataset.fullName,
                    'selectedDistrict.index': 0,
                    'selectedDistrict.code': district.data.result[0].code,
                    'selectedDistrict.fullName': district.data.result[0].fullName
                });
            })
            .catch((error) => {
                console.log(error);
            });
    },
    tapDistrict: function (e, _this) {
        const dataset = e.currentTarget.dataset;

        _this.setData({
            'selectedDistrict.index': e.currentTarget.dataset.index,
            'selectedDistrict.code': dataset.code,
            'selectedDistrict.fullName': dataset.fullName
        });
    },
    confirm: function (e, _this) {
        _this.setData({
            address: _this.data.selectedProvince.fullName + ' ' + _this.data.selectedCity.fullName + ' ' + _this.data.selectedDistrict.fullName,
            isShow: false
        });
    },
    cancel: function (_this) {
        _this.setData({
            isShow: false
        });
    },
    choosearea: function (_this) {
        _this.setData({
            isShow: true
        });
    }
};
module.exports = {
    SA: selectArea
};
</script>
<style>
.shade {
    background-color: #ccc;
    opacity: 0.6;
    position: absolute;
    display: none;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}
.show {
    display: block;
}
.handle-bar {
    padding: 0 15px;
    height: 80rpx;
    background-color: #eee;
}
.confirm {
    text-align: right;
}
.selector-area {
    height: 600rpx;
    width: 100%;
    background-color: #e6ebf3;
    position: absolute;
    bottom: 0;
}
.selector {
    text-align: center;
}
.picker {
    font-size: 32rpx;
    height: 60rpx;
    line-height: 60rpx;
}
.actived {
    color: blue;
}
.area-selector {
    height: 520rpx;
}
.white-shade {
    position: absolute;
    width: 100%;
    height: 60rpx;
    background-color: #fff;
    left: 0;
    margin-top: 240rpx;
}
</style>
