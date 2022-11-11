<template>
  <view>
    
    <customtop :top_title="top_title"></customtop>
    
    <view class="container">
    
      <form class="luckform" @submit="formSubmit" v-if="!result">
        <input hidden="true" name="id" :value="post.id" />
    
        <view class="items">
          <view class="item weui-cell">
            <view class="weui-cell__hd">
              <view class="weui-label">合作标题<span class="span_required">*</span></view>
            </view>
            <view class="weui-cell__bd">
              <input name="title" class="weui-input" type="text" placeholder="请输入标题" :value="post.title" />
            </view>
          </view>
        </view>
    
        <!-- 数据属性 start -->
        <view v-for="(item, index) in category.attributes">
          <view class="items custom_checkbox" v-if="item.type == 'checkbox'">
            <view class="top">
              <span class="title">{{item.name}}</span><span class="span_required" v-if="item.required == 1">*</span>
            </view>
            <view class="item weui-cell">
              <view class="box">
                <span
                  v-for="(item_option, index_option) in item.options"
                  @click="set_form_checkbox(item.id, item_option.id)"
                  :class="(attributes[item.id] != undefined && attributes[item.id].indexOf(item_option.id) > -1) ? 'on' : ''"
                >
                  {{item_option.value}}
                </span>
              </view>
            </view>
          </view>
          <view class="items" v-if="item.type == 'radio'">
          	<view class="top">
          		<span class="title">{{item.name}}</span><span class="span_required" v:if="item.required == 1">*</span>
          	</view>
          	<view class="item weui-cell">
          		<view class="box">
          			<radio-group class="radio-group">
          				<label
                    class="radio"
                    v-for="(item_option, index_option) in item.options"
                    @click="set_form_radio(item.id + '[luck]' + item_option.id);"
                  >
          					<view>
                      <radio color="#00B38A" v-if="attributes[item.id] == undefined || attributes[item.id].indexOf(item_option.id) == -1" />
                      <radio color="#00B38A" checked v-if="attributes[item.id] != undefined && attributes[item.id].indexOf(item_option.id) > -1" />
                      {{item_option.value}}
                    </view>
          				</label>
          			</radio-group>
          		</view>
          	</view>
          </view>
        </view>
        <!-- 数据属性 end -->
    
        <view class="items">
          <view class="top">
            <span class="title">详细介绍</span><span class="span_required">*</span><span class="span_remark">尽可能详细</span>
          </view>
          <view class="item weui-cell">
            <view class="weui-cell__bd">
              <textarea maxlength="-1" name="content" class="weui-textarea" placeholder="请输入详细介绍" :value="post.content"></textarea>
            </view>
          </view>
        </view>
    
        <view class="items">
          <view class="top">
            <span class="title">图片介绍</span><span class="span_remark">会在详细介绍下方显示</span>
          </view>
          <view class="weui-cell">
            <view class="weui-cell__bd">
              <view>
                <u-upload
                  :fileList="fileList_images"
                  @afterRead="afterRead_images"
                  @delete="delete_images"
                  multiple
                  name="_images"
                  :maxCount="9"
                />
              </view>
            </view>
          </view>
        </view>
    
        <view class="items">
          <view class="top">
            <span class="title">联系方式</span><span class="span_remark">最少需填写一项</span>
          </view>
          <view class="item weui-cell">
            <view class="weui-cell__hd">
              <view class="weui-label">微信</view>
            </view>
            <view class="weui-cell__bd">
              <input name="weixin" class="weui-input" type="text" placeholder="请输入微信" :value="post.contact ? post.contact.weixin : ''" />
            </view>
          </view>
          <view class="item weui-cell">
            <view class="weui-cell__hd">
              <view class="weui-label">手机</view>
            </view>
            <view class="weui-cell__bd">
              <input name="phone" class="weui-input" type="text" placeholder="请输入手机" :value="post.contact ? post.contact.phone : ''" />
            </view>
          </view>
          <view class="item weui-cell">
            <view class="weui-cell__hd">
              <view class="weui-label">Q Q</view>
            </view>
            <view class="weui-cell__bd">
              <input name="qq" class="weui-input" type="text" placeholder="请输入QQ" :value="post.contact ? post.contact.qq : ''" />
            </view>
          </view>
          <view class="item weui-cell">
            <view class="weui-cell__hd">
              <view class="weui-label">电话</view>
            </view>
            <view class="weui-cell__bd">
              <input name="telphone" class="weui-input" type="text" placeholder="请输入电话" :value="post.contact ? post.contact.telphone : ''" />
            </view>
          </view>
        </view>
    
        <view class="btnbox">
          <button class="luckbtn luckbtn-default" formType="submit">提交信息</button>
        </view>
      </form>
    
      <view class="result" v-if="result">
        <view class="txt"><u-icon class="u_icon" name="checkmark-circle" color="" size=""></u-icon>修改成功~</view>
        <view class="btns">
          <button class="luckbtn luckbtn-default" @click="formSubmitAfterReturn">返回列表</button>
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
      top_title: '',
      post: {},
      category: {},
      params: {},
      result: false,
      attributes: {},
      fileList_images: [],
    }
  },

  onLoad: function (options) {
    uni.showLoading();
    this.id = options.id;
    this.getPost();
  },

  methods: {
    getPost: function() {
      request.post('/post/getPost_edit', {id: this.id}).then(res => {
        uni.hideLoading();
        if (!res.data.post.id) {
          uni.showToast({
            icon: 'none',
            title: '内容不存在',
            mask: true,
            success: function() {
              setTimeout(function() {
                uni.navigateBack();
              }, 1500);
            }
          })
          return false;
        }

        uni.setNavigationBarTitle({ title: res.data.category.name + ' 编辑页' });
        this.top_title = res.data.category.name + ' 编辑页';

        this.post = res.data.post;
        this.category = res.data.category;
        this.getDataAfterFunction(res.data.post);
      })
    },

    getDataAfterFunction: function(post) {
      this.attributes = post.attributes_edit_data;

      let fileList_images = [];
      if (post.images && post.images.length > 0) {
        post.images.forEach((item, index) => {
          let file = {
            thumb: item.image,
            type: "image",
            url: item.image,
            id: item.id
          };
          fileList_images.push(file);
        })
      }
      this.fileList_images = fileList_images;
    },

    formSubmit: function(e) {
      uni.showLoading();
      this.formBeforeSetParams();
      let form_params = e.detail.value;
      let params = this.params;
      params = Object.assign(params, form_params);
      request.post('/post/update', params).then(res => {
        uni.hideLoading();
        if (res.code == 200) {
          this.result = true;
          // 通知来源页
          var pages = getCurrentPages(); var prevPage = pages[pages.length - 2];
          if (prevPage.updateAfter != undefined) prevPage.updateAfter(params.id, params);
        } else if (res.code == 400) {
          uni.showToast({ title: res.message, icon: 'none' });
        }
      })
    },

    formBeforeSetParams: function() {
      // 数据属性
      if (this.attributes) this.params.attributes = JSON.stringify(this.attributes);
      // 图片介绍
      this.params.images = [];
      if (this.fileList_images != undefined && this.fileList_images.length > 0) {
        this.fileList_images.forEach((item, index) => {
          let image = {
            id: item.id,
            image: item.url
          };
          this.params.images.push(image);
        })
        this.params.images = JSON.stringify(this.params.images);
      }
    },

    // 自定义多选数据处理
    set_form_checkbox: function(key, value) {
      if (this.attributes == undefined) this.attributes = {};
      if (this.attributes[key] == undefined) this.attributes[key] = [];

      let index = this.attributes[key].indexOf(value);
      if (index < 0) {
        if (this.attributes[key].length > 2) {
          uni.showToast({title: '最多只能选择三个', icon: 'none'});
          return false;
        }
        this.attributes[key].push(value);
      } else {
        this.attributes[key].splice(index, 1);
      }
      this.$forceUpdate();
    },

    // 自定义单选数据处理
    set_form_radio: function(value) {
      let array = value.split("[luck]");
      let array_key = array[0];
      let array_value = array[1];

      if (this.attributes == undefined) this.attributes = {};
      if (this.attributes[array_key] == undefined) this.attributes[array_key] = [];

      this.attributes[array_key] = [];
      this.attributes[array_key].push(array_value);
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
          fileListLen++
        });
      }
    },

    delete_images: function(event) {
      this[`fileList${event.name}`].splice(event.index, 1);
    },

    formSubmitAfterReturn: function() {
      uni.navigateBack({ delta: 1 });
    },
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
