<template>
  <view class="">
    <form>
      <view class="bg-button w-100" style="height: 10rpx;"></view>
      <view class="row-ac border-bottom">
        <view class="ml-3">联系人</view>
        <input type="text" v-model="editAddressForm.contact_name" class="p-4 border flex-1 border-none"
               placeholder="收货人姓名"/>
      </view>
      <view class="row-ac border-bottom">
        <view class="ml-3">手机号</view>
        <input type="text" v-model="editAddressForm.contact_phone" class="p-4 flex-1 border-none"
               placeholder="收货人手机号码"/>
      </view>
      <view class="row-ac border-bottom">
        <view class="ml-3">选择地址</view>
        <pickerAddress @change="changeAddress" class="p-4 flex-1">{{ selectaddress }}</pickerAddress>
      </view>
      <view class="row-ac border-bottom">
        <view class="ml-3">详细地址</view>
        <input type="text" v-model="editAddressForm.address" class="p-4 flex-1 border-none" placeholder="详细地址"/>
      </view>
      <view class="row-ac-sb border-bottom">
        <view class="ml-3 pt-3 pb-3">设置默认</view>
        <view class="bg-color mr-3 row-ac" style="width: 110rpx;height: 60rpx;border-radius: 30rpx;"
              @click="tapDefault">
          <!-- 点击后用v-if判断显示开或者关 -->
          <view style="margin-left: 18rpx; margin-right: 6rpx;" v-if="openAddress == true">关</view>
          <view class="rounded-50 bg-white" style="width: 57rpx;height: 57rpx;"></view>
          <view style="margin-left: 6rpx;" v-if="openAddress == false">开</view>
        </view>
      </view>
      <view class="mt-5 row" style="width: 750rpx;height: 90rpx;">
        <view @tap="editAddressFormSubmit" class="row bg-color font-s-6 rounded" style="width: 320rpx;height: 90rpx;">
          保存
        </view>
      </view>
    </form>
  </view>
</template>

<script>
import pickerAddress from '@/components/common/Address/pickerAddress.vue'
import { editUserReceivingAddressUrl } from '@/api/index'

export default {
  components: {
    pickerAddress
  },
  data () {
    return {
      editAddressForm: {
        // 省的id
        province_id: '',
        // 市的id
        city_id: '',
        // 区县的id
        district_id: '',
        // 详细地址
        address: '',
        // 用户名称
        contact_name: '',
        // 用户手机号
        contact_phone: '',
        // 是否是默认地址，0为否，1为是
        is_default: 1,
      },
      selectaddress: '点击选择',
      openAddress: false,
      loadingStatus: true
    }
  },
  onLoad (option) {
    this.initData(option)
  },
  methods: {
    initData (option) {
      if (JSON.stringify(option) != '{}') {
        let urlData = ''
        try {
          // 防止地址参数异常问题
          this.editAddressForm = JSON.parse(option.addressData)
          this.editAddressForm.address_id = this.editAddressForm.id
          console.log(this.editAddressForm)
          this.selectaddress = this.editAddressForm.province + this.editAddressForm.city + this.editAddressForm.district
          console.log(this.editAddressForm.is_default == 0)
          if (this.editAddressForm.is_default == 0) {
            this.openAddress = true
          }
        } catch (e) {
          console.log(e)
          uni.showToast({
            title: '参数异常，将跳转到新增地址页面',
            icon: 'none',
            duration: 2000
          })
          /*setTimeout(() => {
            uni.redirectTo({
              url: '/pages/user/configure/editaddress',
            })
          }, 2000)*/

        }
      }
    },
    changeAddress (data) {
      this.selectaddress = data.data.join('')
      console.log(data.selcecId)
      // 把选择地址传的id赋值到form里面
      this.editAddressForm.city_id = data.selcecId.city_id
      this.editAddressForm.district_id = data.selcecId.district_id
      this.editAddressForm.province_id = data.selcecId.province_id
      console.log(this.editAddressForm)
    },
    tapDefault () {
      console.log(this.openAddress)
      if (this.openAddress) {
        this.openAddress = false
        this.editAddressForm.is_default = 1
      } else {
        this.openAddress = true
        this.editAddressForm.is_default = 0
      }
    },
    editAddressFormSubmit () {
      console.log(this.editAddressForm)
      if(this.editAddressForm.province_id == '' || this.editAddressForm.city_id == '' ||
        this.editAddressForm.district_id == '' || this.editAddressForm.address ==''){
        return uni.showToast({
          title: '请填写完成地址信息',
          icon: 'none',
          duration: 2000
        })
      }
      if(this.editAddressForm.contact_name == '' || this.editAddressForm.contact_phone == ''){
        return uni.showToast({
          title: '收件人姓名、手机号不能为空',
          icon: 'none',
          duration: 2000
        })
      }
      let tipText = ''
      if(this.editAddressForm.address_id == undefined){
        tipText = '添加地址成功，2秒后返回上个页面'
      }else {
        tipText = '修改地址成功，2秒后返回上个页面'
      }
      this.$R.post(editUserReceivingAddressUrl, this.editAddressForm)
        .then(async res => {
          console.log(res)
          if(res.code == 200){
            console.log(tipText)
            uni.showToast({
              title: tipText,
              icon: 'none',
              duration: 2000
            })
            setTimeout(()=>{
              uni.navigateBack({
                delta: 1
              });
            },2000)
          }
        })
    },
  }
}

</script>

<style lang="scss">
  page {
    background-color: $uni-bg-color;
  }
</style>
