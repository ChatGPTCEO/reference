<template>
  <view class="content">
    <uni-forms ref="form" label-position="right" :modelValue="formData" :rules="rules">
      <uni-forms-item label="账号" name="username">
        <uni-easyinput type="text" v-model="formData.username" placeholder="请输入账号"/>
      </uni-forms-item>
      <uni-forms-item label="密码" name="password">
        <uni-easyinput type="password" v-model="formData.password" placeholder="请输入密码"/>
      </uni-forms-item>
      <uni-forms-item label="昵称" name="nickName">
        <uni-easyinput type="text" v-model="formData.nickName" placeholder="请输入昵称"/>
      </uni-forms-item>
      <uni-forms-item label="性别" name="sex">
        <uni-data-checkbox v-model="formData.sex" :localdata="sexs"/>
      </uni-forms-item>
    </uni-forms>
    <view class="btn">
      <button size="mini" type="primary" @click="submitForm">注册</button>
      <button size="mini" @click="toLogin">登录</button>
    </view>

  </view>
</template>


<script setup lang="ts">
import {ref} from "vue";
import {IUserInfo} from "../../types/store/user";
import {userLogin, userRegister} from "../../api/login";
import IImage from "../../components/i-image/i-image.vue";
import {uploadImage} from "../../api/common";
import {sendChatMessage} from "../../store/chat/utils";

const formData = ref<IUserInfo>({
  username: '',
  password: '',
  nickName: '',
  sex: '保密'
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
  nickName: {
    rules: [{
      required: true,
      errorMessage: '请输入昵称',
    },
      {
        minLength: 2,
        maxLength: 20,
        errorMessage: '昵称长度在 {minLength} 到 {maxLength} 个字符',
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
    userRegister(formData.value, () => {
      uni.showToast({
        title: '注册成功',
        icon: 'success',
        duration: 2000
      });
      //立马去登录
      userLogin(formData.value.username, formData.value.password!, (flag: number) => {
        if (flag === 1) {
          //跳转首页
          uni.reLaunch({
            url: '/pages/friendList/friendList'
          });
        }
      })
    })
  }).catch((err: any) => {
    console.log('表单错误信息：', err);
  })
}

const toLogin = () => {
  //去注册
  uni.navigateTo({
    url: '/pages/index/login'
  })
}

const sexs = [{
  text: '男',
  value: '男'
}, {
  text: '女',
  value: '女'
}, {
  text: '保密',
  value: '保密'
}]
</script>


<style lang="scss" scoped>
.content {
  width: 100%;
  background: #f3f2f2;

  uni-forms {
    margin: 50 rpx;
  }

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
</style>
