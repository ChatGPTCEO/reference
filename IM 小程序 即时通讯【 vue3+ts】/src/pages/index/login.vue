<template>
  <view class="content">
    <uni-forms ref="form" label-position="right" :modelValue="formData" :rules="rules">
      <uni-forms-item label="账号" name="username">
        <uni-easyinput type="text" v-model="formData.username" placeholder="请输入账号"/>
      </uni-forms-item>
      <uni-forms-item label="密码" name="password">
        <uni-easyinput type="password" v-model="formData.password" placeholder="请输入密码"/>
      </uni-forms-item>
    </uni-forms>
    <view class="btn">
      <button size="mini" type="primary" @click="submitForm">登录</button>
      <button size="mini" type="default" @click="goRegister">注册</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {IUserInfo} from "../../types/store/user";
import {userLogin} from "../../api/login";

const formData = ref<IUserInfo>({
  username: '',
  password: ''
})

//参数规则
const rules = {
  username: {
    rules: [{
      required: true,
      errorMessage: '请输入账号',
    },
      {
        minLength: 3,
        maxLength: 20,
        errorMessage: '账号长度在 {minLength} 到 {maxLength} 个字符',
      }
    ]
  },
  password: {
    rules: [{
      required: true,
      errorMessage: '请输入密码',
    }]
  }
}

const form = ref() //表单对象
const submitForm = (bytes: BufferSource) => {
  form.value.validate(bytes).then((res: any) => {
    console.log('表单数据信息：', res);
    userLogin(formData.value.username, formData.value.password!, (flag:number) => {
      if(flag===1){
        //跳转首页
        uni.reLaunch({
          url: '/pages/friendList/friendList'
        });
      }
    })
  }).catch((err: any) => {
    console.log('表单错误信息：', err);
  })
}

//去注册
const goRegister=()=>{
  uni.navigateTo({
    url: '/pages/index/register'
  });
}

</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  background: #ffffff;
  uni-forms {
    margin: 50rpx;
  }

  .btn{
    display: block;
    text-align: center;
    &>button{
      &:nth-child(2){
        margin-left: 30rpx;
      }
    }
  }
}
</style>
