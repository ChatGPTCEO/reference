<template>
  <view>

    <customtop top_title="群发布"></customtop>

    <view class="container">

      <form class="luckform" @submit="formSubmit" v-if="!result">

        <view class="items">
          <view class="item weui-cell">
            <view class="weui-cell__hd">
              <view class="weui-label">群名字</view>
            </view>
            <view class="weui-cell__bd">
              <input name="name" class="weui-input" type="text" placeholder="请输入群名字" value="" />
            </view>
          </view>
          <view class="item weui-cell">
            <view class="weui-cell__hd">
              <view class="weui-label">群人数</view>
            </view>
            <view class="weui-cell__bd">
              <input name="number" class="weui-input" type="text" placeholder="请输入群人数" value="" />
            </view>
          </view>
        </view>

        <view class="items">
          <view class="top">
            <span class="title">群二维码</span><span class="span_remark">请上传群二维码</span>
          </view>
          <view class="weui-cell">
            <view class="weui-cell__bd">
              <view>
                <u-upload
                  :fileList="fileList_images"
                  @afterRead="afterRead_images"
                  @delete="delete_images"
                  name="_images"
                  :maxCount="1"
                />
              </view>
            </view>
          </view>
        </view>

        <view class="items custom_checkbox">
          <view class="top">
            <span class="title">群类型</span><span class="span_remark">请选择群类型</span>
          </view>
          <view class="item weui-cell" v-if="config.qun != undefined">
            <view class="box">
              <span
                v-for="(item, index) in config.qun.types"
                @click="set_form_checkbox(item)"
                :class="types.indexOf(item) > -1 ? 'on' : ''"
              >
                {{item}}
              </span>
            </view>
          </view>
        </view>

        <view class="btnbox">
          <button class="luckbtn luckbtn-default" formType="submit">提交信息</button>
        </view>
      </form>

      <view class="result" v-if="result">
        <view class="txt"><u-icon class="u_icon" name="checkmark-circle" color="" size=""></u-icon>发布成功，审核后即可显示~</view>
        <view class="btns">
          <button class="luckbtn luckbtn-default" @click="createAfterReturn">返回上一页</button>
        </view>
      </view>

    </view>

  </view>
</template>

<script>
import { request, upload } from "@/utils/http.js"
import customtop from "@/components/customtop.vue"

export default {
  components: { customtop },

  data() {
    return {
      config: {},
      types: [],
      fileList_images: [],
      qrcode: '',
      result: false
    }
  },

  onLoad(options) {
    uni.showLoading();
    request.post('/common/getConfig').then(res => {
      uni.hideLoading();
      this.config = res.data;
    })
  },

  methods: {
    formSubmit: function(e) {
      uni.showLoading();
      let params = e.detail.value;
      params.qrcode = this.qrcode;
      params.types = JSON.stringify(this.types);
      request.post('/qun/store', params).then(res => {
        uni.hideLoading();
        if (res.code == 200) {
          this.result = true;
        } else if (res.code == 400) {
          uni.showToast({ title: res.message, icon: 'none' });
        }
      })
    },

    // 自定义多选数据处理
    set_form_checkbox: function(value) {
      let index = this.types.indexOf(value);
      if (index < 0) {
        if (this.types.length > 2) {
          uni.showToast({title: '最多只能选择三个', icon: 'none'});
          return false;
        }
        this.types.push(value);
      } else {
        this.types.splice(index, 1);
      }
    },

    afterRead_images: function(event) {
      let lists = [].concat(event.file);
      let fileListLen = this[`fileList${event.name}`].length;
      lists.map((item) => {
        this[`fileList${event.name}`].push({
          ...item,
          status: 'uploading',
          message: '上传中'
        })
      })

      for (let i = 0; i < lists.length; i++) {
        upload(lists[i].url).then(res => {
          let item = this[`fileList${event.name}`][fileListLen];
          this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
            status: 'success',
            message: '',
            id: 0,
            url: res.data.url
          }))
          this.qrcode = res.data.url
          fileListLen++
        });
      }
    },

    delete_images: function(event) {
      this[`fileList${event.name}`].splice(event.index, 1);
      this.qrcode = '';
    },

    createAfterReturn: function() {
      uni.navigateBack({ delta: 1 });
    },

    switchTab: function(url) {
      uni.switchTab({ url: url });
    },

    jumpPage: function(url) {
      uni.navigateTo({ url: url });
    }
  }
}
</script>

<style>
@import url("@/static/weui.min.css");
page {
  padding-bottom: 60rpx;
}
.luckform .items {
  margin-top: 30rpx;
}
.luckform .btnbox {
  margin-top: 50rpx;
}

.result {
	text-align: center;
	padding: 60rpx;
}
.result .txt {
	letter-spacing: 2px;
}
.result .txt .icon {
	margin-right: 8rpx;
}
.result .description {
	margin-top: 20rpx;
	color: #999;
	font-size: 24rpx;
}
.result .btns {
	margin-top: 30rpx;
}
.result .btns .btn {
	margin-left: 10rpx;
}
.result .btns .btn:first-child {
	margin-left: 0;
}
</style>
