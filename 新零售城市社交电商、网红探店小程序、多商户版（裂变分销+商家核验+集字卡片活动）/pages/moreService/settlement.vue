<template>
	<view class="settlement">
		<view class="formbox">
		  <u-form :model="form" ref="uForm" label-width='150' :error-type="['message']">
        <u-form-item label="商家名称" prop="storeName">
          <u-input v-model="form.storeName" placeholder="请输入商家名称" />
        </u-form-item>
        <!-- <u-form-item label="行业类目" prop="type">
          <u-input v-model="form.type.label" type="select" placeholder="请选择行业类目" @click="showType = true" />
        </u-form-item> -->
        <u-form-item label="联系人" prop="name">
          <u-input v-model="form.name" placeholder="请输入联系人姓名" />
        </u-form-item>
        <u-form-item label="联系方式" prop="mobile">
          <u-input v-model="form.mobile" placeholder="请输入联系方式" />
        </u-form-item>
        <u-form-item label="验证码" prop="code">
          <u-input v-model="form.code" placeholder="请输入联系方式" />
          <u-button slot="right" size="mini" type="warning" 
            :disabled="isSend"
            :custom-style="{color: '#333 !important'}"
            @click="getCode">
            {{ codeText }}
          </u-button>
        </u-form-item>
        <u-form-item label="地址" :border-bottom="false" prop="address">
          <u-input v-model="form.address" placeholder="请输入您的地址" />
        </u-form-item>
      </u-form>
		</view>
    <view class="u-margin-top-30">
      <u-button type="warning" :custom-style="{color: '#333'}" @click="submit">提交申请</u-button>
    </view>
    <!-- type list -->
    <u-select v-model="showType" :list="typeList" @confirm="onSelectType"></u-select>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        showType: false,
        typeList: [
          {
            value: 0,
            label: '美食'
          },
        ],
				form: {
          storeName: '',
          name: '',
          type: {
            label: '',
            value: ''
          },
          mobile: '',
          address: '',
          code: ''
        },
        rules: {
          storeName: { 
            required: true, 
            message: '请输入商家名称'
          },
          name: { 
            required: true, 
            message: '请输入联系人姓名'
          },
          mobile: { 
            required: true, 
            message: '请输入联系方式'
          },
          code: {
            required: true, 
            message: '请输入验证码'
          },
          address: { 
            required: true, 
            message: '请输入地址'
          },
        },
        codeText: '获取验证码',
        count: 60,
        isSend: false
			};
		},
    onReady() {
      this.$refs.uForm.setRules(this.rules);
    },
    methods: {
      onSelectType (e) {
        this.form.type = e[0]
      },
      getCode () {
        if (!this.isSend) {
          if (this.form.mobile) {
            this.isSend = true
            this.$u.post('/api/auth/verify', {
              phone: this.form.mobile,
              key: 1,
              code: 1
            }).then((res) => {
              this.startCount().then(() => {
                this.isSend = false
              })
            }).catch(() => {
              this.isSend = false
            })
          } else {
            uni.showToast({
              title: '请输入联系方式',
              icon: 'none'
            })
          }
        }
      },
      startCount () {
        return new Promise((resolve) => {
          this.timer = setInterval(() => {
            if (this.count > 1) {
              this.count --
              this.codeText = this.count + 's'
            } else {
              this.count = 60
              this.codeText = '获取验证码'
              clearInterval(this.timer)
              resolve(true)
            }
          }, 1000)
        })
      },
      submit () {
        this.$refs.uForm.validate(valid => {
          if (valid) {
            console.log('验证通过');
            this.$u.post('/api/intention/create', {
              mer_name: this.form.storeName,
              phone: this.form.mobile,
              name: this.form.name,
              code: this.form.code
            }).then((res) => {
              uni.showToast({
                title: res.message
              })
              setTimeout(() => {
                uni.redirectTo({
                  url: './success'
                })
              }, 1500)
            })
          } else {
            console.log('验证失败');
          }
        });
      }
    }
	}
</script>

<style lang="scss">
page {
  background-color: $bg;
}
.settlement {
  padding: $gutter;
}
.formbox {
  padding: $gutter;
  background-color: #fff;
  box-shadow: 0 5rpx 10rpx rgba($color: #000000, $alpha: 0.1);
  border-radius: $uni-border-radius-lg;
  overflow: hidden;
}
</style>
